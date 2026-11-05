import React, { useState, useMemo, useEffect, useCallback } from 'react';
import * as XLSX from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist';
import {
  Upload,
  ArrowLeftRight,
  Trash2,
  X,
  User,
  Users,
  Calendar,
  Sparkles,
  AlertCircle,
  Check,
  FileText,
  Landmark,
} from 'lucide-react';
import {
  type Transaction,
  type TransactionType,
  type PaymentMethod,
  CATEGORIAS_DESPESA,
  CATEGORIAS_RECEITA,
  CATEGORIAS_POUPANCA,
  CATEGORIAS_RESGATE_POUPANCA,
  CATEGORIAS_TRANSFERENCIA,
  formatarMoeda,
  nomeMesAno,
} from '../types';
import { supabase, supabaseConfigurado } from '../supabaseClient';

// Configura o Worker do PDF.js via CDN para funcionar direto no Vite/Vercel
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface ImportadorExtratoBancarioProps {
  mesSelecionado: string; // Ex: "2026-10"
  pessoa1: string;
  pessoa2: string;
  contaAtiva?: string; // Opcional: detecta automaticamente se não for passado
  transacoesExistentes?: Transaction[];
  onImportarLancamentos: (novos: Transaction[]) => Promise<void>;
  onSaldosAtualizados?: () => void;
}

interface ItemPreview {
  idTemp: string;
  selecionado: boolean;
  data: string; // YYYY-MM-DD
  horario?: string;
  local: string;
  valor: number;
  sinalOriginal: 'entrada' | 'saida';
  tipo: TransactionType;
  categoria: string;
  responsavel: string;
  metodoPagamento: PaymentMethod;
  origemArquivo: string;
  motivoAuto?: string;
  jaImportado?: boolean;
}

export interface SaldoFinalBancoMes {
  id: string;
  conta_id: string;
  mes: string;
  banco: string;
  dataUltimoDia: string; // YYYY-MM-DD
  saldoFinal: number;
  responsavel: string;
}

const MESES_PT: Record<string, string> = {
  janeiro: '01',
  jan: '01',
  fevereiro: '02',
  fev: '02',
  marco: '03',
  mar: '03',
  abril: '04',
  abr: '04',
  maio: '05',
  mai: '05',
  junho: '06',
  jun: '06',
  julho: '07',
  jul: '07',
  agosto: '08',
  ago: '08',
  setembro: '09',
  set: '09',
  outubro: '10',
  out: '10',
  novembro: '11',
  nov: '11',
  dezembro: '12',
  dez: '12',
};

const STORAGE_KEY_SALDOS_FIM_MES = 'financas_saldos_fim_mes_v2';

export function ImportadorExtratoBancario({
  mesSelecionado,
  pessoa1,
  pessoa2,
  contaAtiva,
  transacoesExistentes = [],
  onImportarLancamentos,
  onSaldosAtualizados,
}: ImportadorExtratoBancarioProps) {
  const [modalAberto, setModalAberto] = useState(false);

  const normalizar = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  // Identifica a conta ativa ('casal' ou 'vitoria') sem exigir alteração no App.tsx
  const contaIdAtual = useMemo(() => {
    if (contaAtiva) return contaAtiva;
    return normalizar(pessoa1).includes('vitoria') ? 'vitoria' : 'casal';
  }, [contaAtiva, pessoa1]);

  // 1. CONFIGURAÇÕES ANTES DO UPLOAD
  const [responsavelPadrao, setResponsavelPadrao] = useState<string>(pessoa1);
  const [mesAlvo, setMesAlvo] = useState<string>(mesSelecionado);
  const [metodoPadrao, setMetodoPadrao] = useState<PaymentMethod>('Pix/Débito');

  // 2. ENTRADA DE ARQUIVOS / TEXTO E ITENS LIDOS
  const [abaEntrada, setAbaEntrada] = useState<'arquivos' | 'texto'>('arquivos');
  const [textoColado, setTextoColado] = useState('');
  const [itensPreview, setItensPreview] = useState<ItemPreview[]>([]);
  const [ignoradosOutroMes, setIgnoradosOutroMes] = useState<number>(0);
  const [lendoArquivos, setLendoArquivos] = useState(false);
  const [salvando, setSalvando] = useState(false);

  // 3. CONTROLE DE SALDO DO ÚLTIMO DIA REGISTRADO NO MÊS (SUPABASE + LOCALSTORAGE)
  const [saldosDetectadosPreview, setSaldosDetectadosPreview] = useState<SaldoFinalBancoMes[]>([]);
  const [saldosMesAtual, setSaldosMesAtual] = useState<SaldoFinalBancoMes[]>([]);

  const carregarSaldosLocal = useCallback((): SaldoFinalBancoMes[] => {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY_SALDOS_FIM_MES}_${contaIdAtual}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, [contaIdAtual]);

  const salvarSaldosLocal = useCallback(
    (lista: SaldoFinalBancoMes[]) => {
      try {
        localStorage.setItem(
          `${STORAGE_KEY_SALDOS_FIM_MES}_${contaIdAtual}`,
          JSON.stringify(lista)
        );
      } catch {
        // ignora erro de quota
      }
    },
    [contaIdAtual]
  );

  // Busca os saldos de fim de mês no Supabase sempre que mudar o mês ou a conta
  const carregarSaldosDoMes = useCallback(async () => {
    const locais = carregarSaldosLocal().filter((s) => s.mes === mesSelecionado);
    setSaldosMesAtual(locais);

    if (!supabaseConfigurado || !supabase) return;

    const { data, error } = await supabase
      .from('saldos_fim_mes')
      .select('*')
      .eq('conta_id', contaIdAtual)
      .eq('mes', mesSelecionado);

    if (!error && data) {
      const formatados: SaldoFinalBancoMes[] = data.map((row: any) => ({
        id: String(row.id),
        conta_id: String(row.conta_id),
        mes: String(row.mes),
        banco: String(row.banco),
        responsavel: String(row.responsavel),
        dataUltimoDia: String(row.data_ultimo_dia),
        saldoFinal: Number(row.saldo_final),
      }));
      setSaldosMesAtual(formatados);

      // Atualiza cache local mantendo outros meses
      const outrosMeses = carregarSaldosLocal().filter((s) => s.mes !== mesSelecionado);
      salvarSaldosLocal([...outrosMeses, ...formatados]);
    }
  }, [contaIdAtual, mesSelecionado, carregarSaldosLocal, salvarSaldosLocal]);

  useEffect(() => {
    carregarSaldosDoMes();
  }, [carregarSaldosDoMes]);

  const removerSaldoFimMes = async (idSaldo: string) => {
    setSaldosMesAtual((prev) => prev.filter((s) => s.id !== idSaldo));
    const atualizadosLocal = carregarSaldosLocal().filter((s) => s.id !== idSaldo);
    salvarSaldosLocal(atualizadosLocal);

    if (supabaseConfigurado && supabase) {
      await supabase.from('saldos_fim_mes').delete().eq('id', idSaldo);
    }
    onSaldosAtualizados?.();
  };

  const abrirModal = () => {
    setMesAlvo(mesSelecionado);
    setResponsavelPadrao(pessoa1);
    setModalAberto(true);
  };

  // Limpa prefixos repetitivos do PDF do Banco Inter mantendo o nome do estabelecimento/pessoa claro
  const limparDescricaoBancaria = (desc: string): string => {
    const d = desc
      .replace(/^Compra no debito:\s*"?No estabelecimento\s*/i, 'Compra Débito - ')
      .replace(/^SAQUE BANCO 24H:\s*"?No estabelecimento\s*/i, 'Saque - ')
      .replace(/^Pix (enviado|recebido):\s*"?Cp\s*:\s*\d+-/i, 'Pix $1 - ')
      .replace(/^(Aplicacao|Resgate|Pagamento efetuado):\s*"?/i, '$1 - ')
      .replace(/"/g, '')
      .trim();
    return d || desc.trim();
  };

  // Classificador inteligente calibrado para Itaú e Banco Inter
  const classificarDescricao = (
    desc: string,
    sinal: 'entrada' | 'saida'
  ): { tipo: TransactionType; categoria: string; metodo: PaymentMethod; motivo?: string } => {
    const t = normalizar(desc);

    const p1Norm = normalizar(pessoa1);
    const p2Norm = normalizar(pessoa2);

    // Inclui abreviações de 7 letras do Itaú (ex: "JUAN CE20/10" ou "Juan Ce09/10")
    const nomesProprios = [
      p1Norm,
      p2Norm,
      'juan cecilio',
      'juan ce',
      'mesma titularidade',
      'entre contas',
      'transf entre contas',
      'transferencia propria',
    ].filter((n) => n.length >= 3);

    if (
      nomesProprios.some((nome) => t.includes(nome)) &&
      (t.includes('pix') ||
        t.includes('ted') ||
        t.includes('transf') ||
        t.includes('receb') ||
        t.includes('enviad'))
    ) {
      return {
        tipo: 'transferencia_interna',
        categoria: 'Transferência entre Contas',
        metodo: 'Pix/Débito',
        motivo: 'Mesma titularidade / Entre contas',
      };
    }

    // Aplicações e Resgates de CDB / Poupança (Banco Inter e Itaú)
    if (
      t.includes('aplicacao') ||
      t.includes('poupanca') ||
      t.includes('guardar dinheiro') ||
      t.includes('rdb') ||
      t.includes('cdb')
    ) {
      if (t.includes('rend pago') || t.includes('rendimento')) {
        return { tipo: 'receita', categoria: 'Rendimentos', metodo: 'Pix/Débito' };
      }
      if (sinal === 'saida' && !t.includes('resgate')) {
        return {
          tipo: 'poupanca',
          categoria: 'Reserva do Casal',
          metodo: 'Pix/Débito',
          motivo: 'Aplicação CDB / Poupança',
        };
      }
      if (sinal === 'entrada' || t.includes('resgate')) {
        return {
          tipo: 'resgate_poupanca',
          categoria: CATEGORIAS_RESGATE_POUPANCA[0] || 'Resgate para Uso',
          metodo: 'Pix/Débito',
          motivo: 'Resgate CDB / Poupança',
        };
      }
    }

    if (sinal === 'entrada') {
      if (t.includes('salario') || t.includes('remuneracao') || t.includes('pagamento')) {
        return { tipo: 'receita', categoria: 'Salário', metodo: 'Pix/Débito' };
      }
      if (t.includes('rendimento') || t.includes('rend pago') || t.includes('dividendo')) {
        return { tipo: 'receita', categoria: 'Rendimentos', metodo: 'Pix/Débito' };
      }
      return { tipo: 'receita', categoria: 'Reembolso/Pix', metodo: 'Pix/Débito' };
    }

    let categoria = 'Outros';
    if (
      t.includes('uber') ||
      t.includes('99') ||
      t.includes('onibus') ||
      t.includes('van') ||
      t.includes('motta') ||
      t.includes('fretamento') ||
      t.includes('buson') ||
      t.includes('viagens') ||
      t.includes('pedagio') ||
      t.includes('combustivel') ||
      t.includes('posto') ||
      t.includes('estacionamento') ||
      t.includes('zona azul')
    ) {
      categoria = 'Transporte';
    } else if (
      t.includes('ifood') ||
      t.includes('mercado') ||
      t.includes('merca') ||
      t.includes('supermercado') ||
      t.includes('super ') ||
      t.includes('padaria') ||
      t.includes('lanche') ||
      t.includes('restaurante') ||
      t.includes('vale da costela') ||
      t.includes('burger') ||
      t.includes('mc donalds') ||
      t.includes('mcdonalds') ||
      t.includes('bk') ||
      t.includes('sushi') ||
      t.includes('hamasaki') ||
      t.includes('marukai') ||
      t.includes('esfiha') ||
      t.includes('pizza') ||
      t.includes('acai') ||
      t.includes('sorvete') ||
      t.includes('gelo') ||
      t.includes('doceria') ||
      t.includes('cafe') ||
      t.includes('cafeteria') ||
      t.includes('cantina') ||
      t.includes('canti') ||
      t.includes('ponto') ||
      t.includes('jupir') ||
      t.includes('atacadao') ||
      t.includes('assai')
    ) {
      categoria = 'Comida';
    } else if (
      t.includes('faculdade') ||
      t.includes('claro') ||
      t.includes('vivo') ||
      t.includes('tim') ||
      t.includes('telefonica') ||
      t.includes('impacto tel') ||
      t.includes('internet') ||
      t.includes('energia') ||
      t.includes('elektro') ||
      t.includes('sabesp') ||
      t.includes('agua') ||
      t.includes('aluguel') ||
      t.includes('condominio') ||
      t.includes('fatura') ||
      t.includes('cartao') ||
      t.includes('debito automatico') ||
      t.includes('juros limite') ||
      t.includes('iof')
    ) {
      categoria = 'Contas Fixas';
    } else if (
      t.includes('farmacia') ||
      t.includes('drogaria') ||
      t.includes('droga') ||
      t.includes('frogway') ||
      t.includes('medico') ||
      t.includes('consulta') ||
      t.includes('exame') ||
      t.includes('dentista') ||
      t.includes('psicolog') ||
      t.includes('terapia') ||
      t.includes('otica')
    ) {
      categoria = 'Saúde';
    } else if (
      t.includes('cinema') ||
      t.includes('spotify') ||
      t.includes('netflix') ||
      t.includes('steam') ||
      t.includes('nuuvem') ||
      t.includes('playstation') ||
      t.includes('jogo') ||
      t.includes('ingresso') ||
      t.includes('bar') ||
      t.includes('festa') ||
      t.includes('futebol')
    ) {
      categoria = 'Lazer';
    } else if (
      t.includes('shopee') ||
      t.includes('amazon') ||
      t.includes('mercado livre') ||
      t.includes('mercadolivre') ||
      t.includes('shein') ||
      t.includes('magalu') ||
      t.includes('mooz') ||
      t.includes('pay2all') ||
      t.includes('htn card') ||
      t.includes('cea') ||
      t.includes('renner') ||
      t.includes('riachuelo') ||
      t.includes('roupa') ||
      t.includes('presente') ||
      t.includes('barbeiro') ||
      t.includes('cabeleireiro') ||
      t.includes('salao')
    ) {
      categoria = 'Compras';
    }

    const metodo: PaymentMethod =
      t.includes('credito') || t.includes('parc ') ? 'Cartão de Crédito' : metodoPadrao;

    return { tipo: 'despesa', categoria, metodo };
  };

  // Cruzamento de pares de transferência entre contas no mesmo dia (ou 1 dia de diferença)
  const cruzarTransferenciasInternas = (lista: ItemPreview[]): ItemPreview[] => {
    const resultado = [...lista];

    const diffDias = (d1: string, d2: string) => {
      const t1 = new Date(`${d1}T12:00:00`).getTime();
      const t2 = new Date(`${d2}T12:00:00`).getTime();
      return Math.abs(Math.round((t1 - t2) / (1000 * 60 * 60 * 24)));
    };

    for (let i = 0; i < resultado.length; i++) {
      const itemA = resultado[i];
      if (itemA.sinalOriginal !== 'saida') continue;
      if (itemA.tipo === 'poupanca' || itemA.tipo === 'resgate_poupanca') continue;

      for (let j = 0; j < resultado.length; j++) {
        if (i === j) continue;
        const itemB = resultado[j];
        if (itemB.sinalOriginal !== 'entrada') continue;
        if (itemB.tipo === 'poupanca' || itemB.tipo === 'resgate_poupanca') continue;

        const mesmoValor = Math.abs(itemA.valor - itemB.valor) < 0.005;
        if (!mesmoValor) continue;

        const diasDistancia = diffDias(itemA.data, itemB.data);
        if (diasDistancia <= 1) {
          resultado[i] = {
            ...itemA,
            tipo: 'transferencia_interna',
            categoria: 'Transferência entre Contas',
            motivoAuto: 'Par de transferência entre contas detectado',
          };
          resultado[j] = {
            ...itemB,
            tipo: 'transferencia_interna',
            categoria: 'Transferência entre Contas',
            motivoAuto: 'Par de transferência entre contas detectado',
          };
          break;
        }
      }
    }

    // Verifica duplicatas já existentes no mês para desmarcar automaticamente
    return resultado.map((item) => {
      if (item.jaImportado !== undefined) return item;
      const descItem = normalizar(item.local);
      const duplicado = transacoesExistentes.some((t) => {
        if (t.data !== item.data) return false;
        if (Math.abs(t.valor - item.valor) >= 0.01) return false;
        const descExistente = normalizar(t.local);
        return (
          descExistente === descItem ||
          descExistente.includes(descItem) ||
          descItem.includes(descExistente)
        );
      });
      if (duplicado) {
        return {
          ...item,
          selecionado: false,
          jaImportado: true,
        };
      }
      return { ...item, jaImportado: false };
    });
  };

  const extrairDataISO = (textoData: any): { dataISO: string | null; horario?: string } => {
    if (!textoData) return { dataISO: null };

    if (textoData instanceof Date && !isNaN(textoData.getTime())) {
      const y = textoData.getUTCFullYear();
      const m = String(textoData.getUTCMonth() + 1).padStart(2, '0');
      const d = String(textoData.getUTCDate()).padStart(2, '0');
      return { dataISO: `${y}-${m}-${d}` };
    }

    if (typeof textoData === 'number' && textoData > 20000 && textoData < 80000) {
      const parsed = XLSX.SSF.parse_date_code(textoData);
      if (parsed && parsed.y && parsed.m && parsed.d) {
        return {
          dataISO: `${parsed.y}-${String(parsed.m).padStart(2, '0')}-${String(parsed.d).padStart(2, '0')}`,
        };
      }
    }

    const str = String(textoData).replace(/\u00a0/g, ' ').trim();
    const norm = normalizar(str);
    const matchHora = str.match(/(\d{2}:\d{2})/);
    const horario = matchHora ? matchHora[1] : undefined;

    // 1. Padrão Banco Inter por extenso: "5 de Outubro de 2026" ou "31 de Outubro de 2026"
    const mExtenso = norm.match(
      /(?:^|\s|\D)(\d{1,2})\s+de\s+(janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s+de\s+(\d{4})/
    );
    if (mExtenso) {
      const dia = mExtenso[1].padStart(2, '0');
      const mes = MESES_PT[mExtenso[2]];
      const ano = mExtenso[3];
      return { dataISO: `${ano}-${mes}-${dia}`, horario };
    }

    // 2. DD/MM/YYYY (Padrão Itaú: ex "29/10/2026")
    const mBR = str.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (mBR) {
      return { dataISO: `${mBR[3]}-${mBR[2]}-${mBR[1]}`, horario };
    }

    // 3. YYYY-MM-DD
    const mISO = str.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (mISO) {
      return { dataISO: `${mISO[1]}-${mISO[2]}-${mISO[3]}`, horario };
    }

    // 4. DD/MM/YY
    const mCurtoAno = str.match(/(\d{2})\/(\d{2})\/(\d{2})(?!\d)/);
    if (mCurtoAno) {
      return { dataISO: `20${mCurtoAno[3]}-${mCurtoAno[2]}-${mCurtoAno[1]}`, horario };
    }

    // 5. DD/mmm
    const mMesTexto = norm.match(
      /(?:^|\s)(\d{1,2})\s*[/\s-]\s*(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)(?:\b|\s|$)/
    );
    if (mMesTexto) {
      const anoAlvo = mesAlvo.split('-')[0];
      const mesNum = MESES_PT[mMesTexto[2]];
      if (mesNum) {
        return { dataISO: `${anoAlvo}-${mesNum}-${mMesTexto[1].padStart(2, '0')}`, horario };
      }
    }

    return { dataISO: null };
  };

  const extrairNumero = (val: any): number | null => {
    if (val === null || val === undefined || val === '') return null;
    if (typeof val === 'number') return isNaN(val) ? null : Number(val.toFixed(2));

    let s = String(val)
      .replace(/R\$/gi, '')
      .replace(/\u00a0/g, '')
      .replace(/\s/g, '')
      .trim();
    if (!s) return null;

    let multiplicador = 1;
    if (s.endsWith('-') || s.startsWith('-') || /d$/i.test(s)) {
      multiplicador = -1;
      s = s.replace(/[-+dD]+/g, '');
    } else if (s.startsWith('+') || /c$/i.test(s)) {
      s = s.replace(/[+cC]+/g, '');
    }

    if (s.includes(',') && s.includes('.')) {
      s = s.replace(/\./g, '').replace(',', '.');
    } else if (s.includes(',')) {
      s = s.replace(',', '.');
    }

    const num = parseFloat(s);
    if (isNaN(num)) return null;
    return Number((num * multiplicador).toFixed(2));
  };

  // ============================================================================
  // LEITOR DE PDF (RECONSTRÓI CADA LINHA HORIZONTAL DO EXTRATO DO INTER E ITAÚ)
  // ============================================================================
  const extrairTextoDePDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const linhasTotais: string[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      const gruposY: { y: number; itens: { x: number; str: string }[] }[] = [];

      for (const item of textContent.items as any[]) {
        const texto = String(item.str || '').replace(/\u00a0/g, ' ').trim();
        if (!texto) continue;
        const x = item.transform[4];
        const y = item.transform[5];

        let grupo = gruposY.find((g) => Math.abs(g.y - y) <= 3.5);
        if (!grupo) {
          grupo = { y, itens: [] };
          gruposY.push(grupo);
        }
        grupo.itens.push({ x, str: texto });
      }

      gruposY.sort((a, b) => b.y - a.y);

      for (const g of gruposY) {
        g.itens.sort((a, b) => a.x - b.x);
        const linhaMontada = g.itens.map((i) => i.str).join(' ');
        linhasTotais.push(linhaMontada);
      }
    }

    return linhasTotais.join('\n');
  };

  // ============================================================================
  // PARSER CALIBRADO PARA BANCO INTER + ITAÚ (FILTRA SALDO DO DIA E PEGA O ÚLTIMO DO MÊS)
  // ============================================================================
  const lerTextoBrutoOuPDF = (
    texto: string,
    origemLabel: string
  ): {
    validos: ItemPreview[];
    ignorados: number;
    ultimoSaldoMes: SaldoFinalBancoMes | null;
  } => {
    const validos: ItemPreview[] = [];
    let ignorados = 0;

    const textoNorm = normalizar(texto);
    const nomeBanco = textoNorm.includes('banco inter')
      ? 'Banco Inter'
      : textoNorm.includes('itau')
      ? 'Itaú'
      : origemLabel.replace(/\.(pdf|csv|ofx|txt|xlsx)$/i, '');

    const saldosDiariosDoMes: { data: string; saldo: number }[] = [];

    // Regex que captura "-R$ 2,29", "R$ 195,45", "-12,80" sem roubar o "-" da coluna seguinte
    const regexValores =
      /[-+]?\s*(?:R\$\s*)?[-+]?\s*\d{1,3}(?:\.\d{3})*[.,]\d{2}(?:-(?!\s*(?:R\$|\d)))?/gi;

    const linhas = texto.split(/\r?\n/);
    let ultimaDataDetectada: string | null = null;

    for (let idx = 0; idx < linhas.length; idx++) {
      const limpa = linhas[idx].replace(/\u00a0/g, ' ').trim();
      if (!limpa || limpa.length < 4) continue;

      const normLinha = normalizar(limpa);

      // 1. Ignora cabeçalhos de emissão/período/rodapé para NUNCA sujar a data dos lançamentos
      if (
        normLinha.includes('solicitado em') ||
        normLinha.includes('periodo:') ||
        normLinha.includes('periodo de visualizacao') ||
        normLinha.includes('emitido em') ||
        normLinha.includes('cpf/cnpj') ||
        normLinha.includes('fale com a gente') ||
        normLinha.includes('sac:') ||
        normLinha.includes('ouvidoria:') ||
        normLinha.includes('limite da conta') ||
        normLinha.includes('saldo total') ||
        normLinha.includes('saldo disponivel') ||
        normLinha.includes('saldo bloqueado') ||
        normLinha.includes('saldo em conta')
      ) {
        continue;
      }

      // 2. Verifica se a linha tem data explícita (DD/MM/YYYY do Itaú ou "5 de Outubro de 2026" do Inter)
      const { dataISO, horario } = extrairDataISO(limpa);
      if (dataISO) {
        ultimaDataDetectada = dataISO;
      }

      // 3. Se for uma linha de SALDO DO DIA (Inter ou Itaú), NUNCA adiciona como entrada/saída!
      if (
        normLinha.includes('saldo do dia') ||
        normLinha.includes('saldo anterior') ||
        normLinha.includes('saldo final') ||
        normLinha.includes('s a l d o')
      ) {
        const dataRefSaldo = dataISO || ultimaDataDetectada;
        if (dataRefSaldo && dataRefSaldo.startsWith(mesAlvo) && normLinha.includes('saldo do dia')) {
          const posSaldo = normLinha.indexOf('saldo do dia');
          const trechoAposSaldo = limpa.slice(posSaldo);
          const matchesSaldo = Array.from(trechoAposSaldo.matchAll(regexValores));
          if (matchesSaldo.length > 0) {
            const valorSaldo = extrairNumero(matchesSaldo[matchesSaldo.length - 1][0]);
            if (valorSaldo !== null) {
              saldosDiariosDoMes.push({ data: dataRefSaldo, saldo: valorSaldo });
            }
          }
        }
        continue;
      }

      const dataUsada = dataISO || ultimaDataDetectada;
      if (!dataUsada) continue;

      let restoLinha = limpa;
      const mDataInicio = restoLinha.match(/^(\d{2}\/\d{2}\/\d{2,4}|\d{4}-\d{2}-\d{2})\s+/);
      if (mDataInicio) {
        restoLinha = restoLinha.slice(mDataInicio[0].length).trim();
      }

      const matchesValores = Array.from(restoLinha.matchAll(regexValores));
      if (matchesValores.length === 0) continue;

      const primeiroMatch = matchesValores[0];
      let valorNum = extrairNumero(primeiroMatch[0]);
      if (valorNum === null || valorNum === 0) continue;

      const rawDesc = restoLinha.slice(0, primeiroMatch.index).trim();
      const desc = limparDescricaoBancaria(
        rawDesc.replace(/^[;\t|\s-]+|[;\t|\s-]+$/g, '').trim()
      );

      if (!desc || desc.length < 2) continue;

      if (!dataUsada.startsWith(mesAlvo)) {
        ignorados++;
        continue;
      }

      const descNorm = normalizar(desc);
      if (
        valorNum > 0 &&
        (descNorm.includes('pix enviado') ||
          descNorm.includes('compra') ||
          descNorm.includes('pagamento efetuado') ||
          descNorm.includes('pag boleto') ||
          descNorm.includes('fatura paga') ||
          descNorm.includes('aplicacao') ||
          descNorm.includes('saque')) &&
        !descNorm.includes('receb') &&
        !descNorm.includes('resgate') &&
        !descNorm.includes('estorno')
      ) {
        valorNum = -Math.abs(valorNum);
      }

      const sinal: 'entrada' | 'saida' = valorNum > 0 ? 'entrada' : 'saida';
      const classif = classificarDescricao(desc, sinal);

      validos.push({
        idTemp: `${Date.now()}-${origemLabel}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        selecionado: true,
        data: dataUsada,
        horario,
        local: desc,
        valor: Math.abs(valorNum),
        sinalOriginal: sinal,
        tipo: classif.tipo,
        categoria: classif.categoria,
        responsavel: responsavelPadrao,
        metodoPagamento: classif.metodo,
        origemArquivo: nomeBanco,
        motivoAuto: classif.motivo,
      });
    }

    // Seleciona SOMENTE o saldo do último dia registrado no mês daquele banco
    let ultimoSaldoMes: SaldoFinalBancoMes | null = null;
    if (saldosDiariosDoMes.length > 0) {
      saldosDiariosDoMes.sort((a, b) => a.data.localeCompare(b.data));
      const ultimo = saldosDiariosDoMes[saldosDiariosDoMes.length - 1];
      ultimoSaldoMes = {
        id: `${contaIdAtual}-${mesAlvo}-${normalizar(nomeBanco)}-${normalizar(responsavelPadrao)}`,
        conta_id: contaIdAtual,
        mes: mesAlvo,
        banco: nomeBanco,
        dataUltimoDia: ultimo.data,
        saldoFinal: ultimo.saldo,
        responsavel: responsavelPadrao,
      };
    }

    return { validos, ignorados, ultimoSaldoMes };
  };

  // ============================================================================
  // LEITOR DE ARQUIVOS OFX
  // ============================================================================
  const lerConteudoOFX = (
    conteudo: string,
    nomeArq: string
  ): { validos: ItemPreview[]; ignorados: number } => {
    const validos: ItemPreview[] = [];
    let ignorados = 0;

    const blocos = conteudo.split(/<STMTTRN>/i).slice(1);
    blocos.forEach((bloco, idx) => {
      const dtMatch = bloco.match(/<DTPOSTED>(\d{8})(\d{4,6})?/i);
      const valMatch = bloco.match(/<TRNAMT>([-+]?\d+[.,]?\d*)/i);
      const memoMatch = bloco.match(/<MEMO>([^<\r\n]+)/i);
      const nameMatch = bloco.match(/<NAME>([^<\r\n]+)/i);

      if (!dtMatch || !valMatch) return;

      const rawDate = dtMatch[1];
      const dataISO = `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`;
      const horario = dtMatch[2]
        ? `${dtMatch[2].slice(0, 2)}:${dtMatch[2].slice(2, 4)}`
        : undefined;

      if (!dataISO.startsWith(mesAlvo)) {
        ignorados++;
        return;
      }

      const valorBruto = extrairNumero(valMatch[1]);
      if (valorBruto === null || valorBruto === 0) return;

      const desc = (memoMatch?.[1] || nameMatch?.[1] || 'Lançamento Bancário').trim();
      const sinal: 'entrada' | 'saida' = valorBruto > 0 ? 'entrada' : 'saida';
      const valorAbs = Math.abs(valorBruto);
      const classif = classificarDescricao(desc, sinal);

      validos.push({
        idTemp: `${Date.now()}-${nomeArq}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        selecionado: true,
        data: dataISO,
        horario,
        local: desc,
        valor: valorAbs,
        sinalOriginal: sinal,
        tipo: classif.tipo,
        categoria: classif.categoria,
        responsavel: responsavelPadrao,
        metodoPagamento: classif.metodo,
        origemArquivo: nomeArq,
        motivoAuto: classif.motivo,
      });
    });

    return { validos, ignorados };
  };

  // ============================================================================
  // LEITOR DE PLANILHAS / CSV
  // ============================================================================
  const lerPlanilhaOuCSV = (
    buffer: ArrayBuffer,
    nomeArq: string
  ): { validos: ItemPreview[]; ignorados: number } => {
    const validos: ItemPreview[] = [];
    let ignorados = 0;

    const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const linhas: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

      linhas.forEach((linha, idx) => {
        const celulas = linha.map((c) => String(c ?? '').trim()).filter(Boolean);
        if (celulas.length < 2) return;

        let dataEncontrada: string | null = null;
        let horarioEncontrado: string | undefined;
        let colData = -1;

        for (let c = 0; c < linha.length; c++) {
          const { dataISO, horario } = extrairDataISO(linha[c]);
          if (dataISO) {
            dataEncontrada = dataISO;
            horarioEncontrado = horario;
            colData = c;
            break;
          }
        }

        if (!dataEncontrada) return;
        if (!dataEncontrada.startsWith(mesAlvo)) {
          ignorados++;
          return;
        }

        let valorEncontrado: number | null = null;
        const textosDescricao: string[] = [];

        for (let c = 0; c < linha.length; c++) {
          if (c === colData) continue;
          const valCelula = linha[c];
          if (valCelula === '' || valCelula === null || valCelula === undefined) continue;

          const num = extrairNumero(valCelula);
          const strCelula = String(valCelula).trim();

          const pareceMonetario =
            typeof valCelula === 'number' ||
            /^[-+]?\s*(R\$)?\s*[-+]?\s*\d{1,3}(\.\d{3})*([.,]\d{2})?[-dDcC]?$/.test(strCelula);

          if (num !== null && num !== 0 && pareceMonetario && valorEncontrado === null) {
            valorEncontrado = num;
          } else if (strCelula.length > 1 && !/^(saldo|total)/i.test(strCelula)) {
            textosDescricao.push(strCelula);
          }
        }

        if (valorEncontrado === null || valorEncontrado === 0) return;

        const descFinal = textosDescricao.join(' - ').trim() || 'Lançamento Extrato';
        if (normalizar(descFinal).includes('saldo do dia')) return;

        const sinal: 'entrada' | 'saida' = valorEncontrado > 0 ? 'entrada' : 'saida';
        const valorAbs = Math.abs(valorEncontrado);
        const classif = classificarDescricao(descFinal, sinal);

        validos.push({
          idTemp: `${Date.now()}-${nomeArq}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
          selecionado: true,
          data: dataEncontrada,
          horario: horarioEncontrado,
          local: descFinal,
          valor: valorAbs,
          sinalOriginal: sinal,
          tipo: classif.tipo,
          categoria: classif.categoria,
          responsavel: responsavelPadrao,
          metodoPagamento: classif.metodo,
          origemArquivo: nomeArq,
          motivoAuto: classif.motivo,
        });
      });
    });

    return { validos, ignorados };
  };

  // ============================================================================
  // UPLOAD DE ARQUIVOS (.PDF DO INTER E ITAÚ, .OFX, .CSV, .XLSX)
  // ============================================================================
  const handleUploadArquivos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLendoArquivos(true);
    const novosExtraidos: ItemPreview[] = [];
    let totalForaDoMes = 0;
    const novosSaldosFimMes: SaldoFinalBancoMes[] = [];

    try {
      for (const file of Array.from(files)) {
        const nomeLower = file.name.toLowerCase();

        if (nomeLower.endsWith('.pdf')) {
          const textoPDF = await extrairTextoDePDF(file);
          const { validos, ignorados, ultimoSaldoMes } = lerTextoBrutoOuPDF(textoPDF, file.name);
          novosExtraidos.push(...validos);
          totalForaDoMes += ignorados;
          if (ultimoSaldoMes) novosSaldosFimMes.push(ultimoSaldoMes);
        } else if (nomeLower.endsWith('.ofx') || nomeLower.endsWith('.ofc')) {
          const texto = await file.text();
          const { validos, ignorados } = lerConteudoOFX(texto, file.name);
          novosExtraidos.push(...validos);
          totalForaDoMes += ignorados;
        } else if (nomeLower.endsWith('.txt')) {
          const texto = await file.text();
          const { validos, ignorados, ultimoSaldoMes } = lerTextoBrutoOuPDF(texto, file.name);
          novosExtraidos.push(...validos);
          totalForaDoMes += ignorados;
          if (ultimoSaldoMes) novosSaldosFimMes.push(ultimoSaldoMes);
        } else {
          const buffer = await file.arrayBuffer();
          const { validos, ignorados } = lerPlanilhaOuCSV(buffer, file.name);
          novosExtraidos.push(...validos);
          totalForaDoMes += ignorados;
        }
      }

      setIgnoradosOutroMes((prev) => prev + totalForaDoMes);

      if (novosSaldosFimMes.length > 0) {
        setSaldosDetectadosPreview((prev) => {
          const mapa = new Map<string, SaldoFinalBancoMes>();
          [...prev, ...novosSaldosFimMes].forEach((s) => mapa.set(s.id, s));
          return Array.from(mapa.values());
        });
      }

      setItensPreview((prev) => {
        const combinados = [...prev, ...novosExtraidos];
        return cruzarTransferenciasInternas(combinados);
      });
    } catch (err) {
      console.error(err);
      alert('Não foi possível ler um dos arquivos. Verifique se o PDF não está protegido por senha.');
    } finally {
      setLendoArquivos(false);
      e.target.value = '';
    }
  };

  const handleProcessarTextoColado = () => {
    if (!textoColado.trim()) return;
    const { validos, ignorados, ultimoSaldoMes } = lerTextoBrutoOuPDF(textoColado, 'Texto Colado');
    setIgnoradosOutroMes((prev) => prev + ignorados);
    if (ultimoSaldoMes) {
      setSaldosDetectadosPreview((prev) => {
        const mapa = new Map<string, SaldoFinalBancoMes>();
        [...prev, ultimoSaldoMes].forEach((s) => mapa.set(s.id, s));
        return Array.from(mapa.values());
      });
    }
    setItensPreview((prev) => cruzarTransferenciasInternas([...prev, ...validos]));
    setTextoColado('');
  };

  const atualizarItemPreview = (idTemp: string, campos: Partial<ItemPreview>) => {
    setItensPreview((prev) =>
      prev.map((item) => (item.idTemp === idTemp ? { ...item, ...campos } : item))
    );
  };

  const removerItemPreview = (idTemp: string) => {
    setItensPreview((prev) => prev.filter((item) => item.idTemp !== idTemp));
  };

  const atualizarSaldoPreview = (idSaldo: string, novoValor: number) => {
    setSaldosDetectadosPreview((prev) =>
      prev.map((s) => (s.id === idSaldo ? { ...s, saldoFinal: novoValor } : s))
    );
  };

  const resumoPreview = useMemo(() => {
    const selecionados = itensPreview.filter((i) => i.selecionado);
    const qtdDespesas = selecionados.filter((i) => i.tipo === 'despesa').length;
    const qtdReceitas = selecionados.filter((i) => i.tipo === 'receita').length;
    const qtdTransferencias = selecionados.filter((i) => i.tipo === 'transferencia_interna').length;
    const qtdPoupanca = selecionados.filter(
      (i) => i.tipo === 'poupanca' || i.tipo === 'resgate_poupanca'
    ).length;
    return { total: selecionados.length, qtdDespesas, qtdReceitas, qtdTransferencias, qtdPoupanca };
  }, [itensPreview]);

  const handleConfirmarImportacao = async () => {
    const selecionados = itensPreview.filter((i) => i.selecionado);
    if (selecionados.length === 0 && saldosDetectadosPreview.length === 0) return;

    setSalvando(true);

    // 1. Salva o controle de saldo do último dia registrado no mês no Supabase + LocalStorage
    if (saldosDetectadosPreview.length > 0) {
      const todosLocais = carregarSaldosLocal();
      const mapaLocal = new Map<string, SaldoFinalBancoMes>();
      todosLocais.forEach((s) => mapaLocal.set(s.id, s));
      saldosDetectadosPreview.forEach((s) => mapaLocal.set(s.id, s));

      const listaAtualizada = Array.from(mapaLocal.values());
      salvarSaldosLocal(listaAtualizada);

      if (mesAlvo === mesSelecionado) {
        setSaldosMesAtual(listaAtualizada.filter((s) => s.mes === mesSelecionado));
      }

      if (supabaseConfigurado && supabase) {
        const payloadSupabase = saldosDetectadosPreview.map((s) => ({
          id: s.id,
          conta_id: s.conta_id,
          mes: s.mes,
          banco: s.banco,
          responsavel: s.responsavel,
          data_ultimo_dia: s.dataUltimoDia,
          saldo_final: s.saldoFinal,
          updated_at: new Date().toISOString(),
        }));
        await supabase.from('saldos_fim_mes').upsert(payloadSupabase);
      }
      onSaldosAtualizados?.();
    }

    // 2. Salva as transações (entradas, saídas, poupança e movimentações)
    if (selecionados.length > 0) {
      const transacoesFinais: Transaction[] = selecionados.map((item, idx) => ({
        id:
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `extrato-${item.data}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
        tipo: item.tipo,
        valor: item.valor,
        data: item.data,
        local: item.local.trim() || 'Lançamento Bancário',
        categoria: item.categoria,
        tags: item.motivoAuto ? ['#MovimentaçãoInterna'] : [`#${item.origemArquivo}`],
        metodoPagamento: item.metodoPagamento,
        responsavel: item.responsavel,
        pendenteSync: false,
      }));

      await onImportarLancamentos(transacoesFinais);
    }

    setSalvando(false);
    setItensPreview([]);
    setSaldosDetectadosPreview([]);
    setIgnoradosOutroMes(0);
    setModalAberto(false);
  };

  const somaSaldosFimMesAtual = saldosMesAtual.reduce((acc, s) => acc + s.saldoFinal, 0);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={abrirModal}
        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition shadow-lg shadow-emerald-500/15"
      >
        <Upload size={15} strokeWidth={2.5} />
        <span>Importar Extratos (Inter / Itaú PDF)</span>
      </button>

      {/* BADGE SINCRONIZADO COM SUPABASE DO QUE SOBROU NA CONTA NO FIM DO MÊS */}
      {saldosMesAtual.length > 0 && (
        <div className="inline-flex flex-wrap items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-xl text-[11px] text-zinc-300">
          <Landmark size={13} className="text-emerald-400 shrink-0" />
          <span className="text-zinc-400 font-medium">Sobrou no fim do mês:</span>
          {saldosMesAtual.map((s) => (
            <span
              key={s.id}
              className="inline-flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded-lg font-semibold"
              title={`Último dia registrado em ${s.banco} (${s.responsavel}): ${s.dataUltimoDia.split('-').reverse().join('/')}`}
            >
              <span>
                {s.banco} ({s.dataUltimoDia.slice(8, 10)}/{s.dataUltimoDia.slice(5, 7)}):
              </span>
              <strong className={s.saldoFinal >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {formatarMoeda(s.saldoFinal)}
              </strong>
              <button
                type="button"
                onClick={() => removerSaldoFimMes(s.id)}
                className="text-zinc-500 hover:text-rose-400 ml-0.5 cursor-pointer"
                title="Remover registro de saldo"
              >
                <X size={11} />
              </button>
            </span>
          ))}
          {saldosMesAtual.length > 1 && (
            <span className="text-zinc-400 pl-1 border-l border-zinc-800">
              Total:{' '}
              <strong className={somaSaldosFimMesAtual >= 0 ? 'text-white' : 'text-rose-400'}>
                {formatarMoeda(somaSaldosFimMesAtual)}
              </strong>
            </span>
          )}
        </div>
      )}

      {modalAberto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-4xl rounded-t-3xl sm:rounded-2xl p-5 md:p-6 space-y-5 shadow-2xl max-h-[94vh] flex flex-col">
            {/* CABEÇALHO DO MODAL */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 shrink-0">
              <div>
                <h3 className="font-bold text-base md:text-lg text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-emerald-400" />
                  Importador Calibrado (Banco Inter & Itaú PDF / OFX / CSV)
                </h3>
                <p className="text-xs text-zinc-400">
                  Ignora saldos diários nas transações e sincroniza no Supabase o saldo do último dia do mês
                </p>
              </div>
              <button
                onClick={() => setModalAberto(false)}
                className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* CORPO ROLÁVEL */}
            <div className="space-y-5 overflow-y-auto pr-1 flex-1">
              {/* PASSO 1: CONFIGURAÇÕES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1.5">
                    1. De quem são os extratos?
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[pessoa1, pessoa2, 'Casal'].map((resp) => (
                      <button
                        key={resp}
                        type="button"
                        onClick={() => setResponsavelPadrao(resp)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1 cursor-pointer ${
                          responsavelPadrao === resp
                            ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        {resp === 'Casal' ? <Users size={13} /> : <User size={13} />}
                        <span className="truncate">{resp}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold flex items-center gap-1 mb-1.5">
                    <Calendar size={13} className="text-emerald-400" />
                    2. Filtrar apenas o Mês:
                  </label>
                  <input
                    type="month"
                    value={mesAlvo}
                    onChange={(e) => setMesAlvo(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs md:text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-zinc-500 block mt-1">
                    Dias fora de <strong>{nomeMesAno(mesAlvo)}</strong> serão descartados!
                  </span>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-semibold block mb-1.5">
                    3. Tipo de Extrato:
                  </label>
                  <select
                    value={metodoPadrao}
                    onChange={(e) => setMetodoPadrao(e.target.value as PaymentMethod)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs md:text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Pix/Débito">Conta Corrente (Pix / Débito)</option>
                    <option value="Cartão de Crédito">Fatura de Cartão de Crédito</option>
                  </select>
                </div>
              </div>

              {/* PASSO 2: UPLOAD DE ARQUIVOS */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAbaEntrada('arquivos')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      abaEntrada === 'arquivos'
                        ? 'bg-zinc-800 text-white border border-zinc-700'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Subir Arquivos (.PDF, .OFX, .CSV)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAbaEntrada('texto')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      abaEntrada === 'texto'
                        ? 'bg-zinc-800 text-white border border-zinc-700'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Colar Texto Copiado do PDF
                  </button>
                </div>

                {abaEntrada === 'arquivos' ? (
                  <label className="border-2 border-dashed border-zinc-700 hover:border-emerald-500/60 bg-zinc-950/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition">
                    <FileText size={28} className="text-emerald-400 mb-2" />
                    <p className="text-xs md:text-sm font-bold text-zinc-200">
                      {lendoArquivos
                        ? 'Lendo PDFs do Inter / Itaú e cruzando transferências...'
                        : 'Clique para selecionar os PDFs do Banco Inter e do Itaú juntos'}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Filtra apenas <strong className="text-emerald-400">{nomeMesAno(mesAlvo)}</strong> e salva o saldo do último dia no Supabase!
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.csv,.ofx,.ofc,.txt,.xlsx,.xls"
                      onChange={handleUploadArquivos}
                      disabled={lendoArquivos}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      rows={4}
                      placeholder="Cole aqui o texto copiado do PDF do Banco Inter ou Itaú..."
                      value={textoColado}
                      onChange={(e) => setTextoColado(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleProcessarTextoColado}
                      className="bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                    >
                      Processar Texto
                    </button>
                  </div>
                )}
              </div>

              {/* CARD EDITÁVEL DE CONTROLE DO SALDO DO ÚLTIMO DIA REGISTRADO NO MÊS */}
              {saldosDetectadosPreview.length > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <Landmark size={15} />
                      Controle de Fim de Mês — Saldo do Último Dia Registrado (Sincronizado no Supabase, fora de entradas/saídas)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {saldosDetectadosPreview.map((s) => (
                      <div
                        key={s.id}
                        className="bg-zinc-950/90 border border-zinc-800 rounded-xl px-3 py-2 flex items-center justify-between gap-2"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">
                            {s.banco} <span className="text-zinc-400 font-normal">({s.responsavel})</span>
                          </p>
                          <p className="text-[10px] text-zinc-400">
                            Último dia: {s.dataUltimoDia.split('-').reverse().join('/')}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-zinc-400">R$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={s.saldoFinal}
                            onChange={(e) =>
                              atualizarSaldoPreview(s.id, parseFloat(e.target.value) || 0)
                            }
                            className={`w-24 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs font-extrabold text-right focus:outline-none focus:border-emerald-500 ${
                              s.saldoFinal >= 0 ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {ignoradosOutroMes > 0 && (
                <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl px-3.5 py-2 text-xs text-sky-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0 text-sky-400" />
                    Filtro de Mês: <strong>{ignoradosOutroMes} lançamento(s)</strong> de outros meses foram descartados automaticamente.
                  </span>
                </div>
              )}

              {/* PASSO 3: TABELA DE REVISÃO */}
              {itensPreview.length > 0 && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xs md:text-sm font-bold text-white">
                        Lançamentos do Mês ({resumoPreview.total} de {itensPreview.length} selecionados)
                      </h4>
                      {resumoPreview.qtdTransferencias > 0 && (
                        <span className="text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                          <ArrowLeftRight size={12} />
                          {resumoPreview.qtdTransferencias} movimentação(ões) interna(s)
                        </span>
                      )}
                      {itensPreview.some((i) => i.jaImportado) && (
                        <span className="text-[11px] bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded-full font-medium">
                          {itensPreview.filter((i) => i.jaImportado).length} já importado(s) desmarcado(s)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const todosMarcados = itensPreview.every((i) => i.selecionado);
                          setItensPreview((prev) =>
                            prev.map((i) => ({ ...i, selecionado: !todosMarcados }))
                          );
                        }}
                        className="text-xs font-semibold text-emerald-400 hover:underline cursor-pointer"
                      >
                        {itensPreview.every((i) => i.selecionado)
                          ? 'Desmarcar todos'
                          : 'Marcar todos'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setItensPreview([]);
                          setSaldosDetectadosPreview([]);
                          setIgnoradosOutroMes(0);
                        }}
                        className="text-xs text-rose-400 hover:underline cursor-pointer"
                      >
                        Limpar lista
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                    {itensPreview.map((item) => (
                      <div
                        key={item.idTemp}
                        className={`border rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-2.5 transition ${
                          !item.selecionado
                            ? 'bg-zinc-950/40 border-zinc-800/40 opacity-50'
                            : item.tipo === 'transferencia_interna'
                            ? 'bg-zinc-950/90 border-amber-500/40'
                            : 'bg-zinc-950/90 border-zinc-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <input
                            type="checkbox"
                            checked={item.selecionado}
                            onChange={(e) =>
                              atualizarItemPreview(item.idTemp, {
                                selecionado: e.target.checked,
                              })
                            }
                            className="w-4 h-4 accent-emerald-500 shrink-0 cursor-pointer"
                          />

                          <input
                            type="date"
                            value={item.data}
                            onChange={(e) =>
                              atualizarItemPreview(item.idTemp, { data: e.target.value })
                            }
                            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-300 w-[118px] shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <input
                              type="text"
                              value={item.local}
                              onChange={(e) =>
                                atualizarItemPreview(item.idTemp, { local: e.target.value })
                              }
                              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-lg px-2.5 py-1 text-xs font-semibold text-white focus:outline-none"
                            />
                            {item.motivoAuto && (
                              <span className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5">
                                <ArrowLeftRight size={10} /> {item.motivoAuto} ({item.origemArquivo})
                              </span>
                            )}
                            {item.jaImportado && (
                              <span className="text-[10px] text-sky-400 font-medium block mt-0.5">
                                Possível duplicata já cadastrada neste mês (desmarcado)
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <select
                            value={item.tipo}
                            onChange={(e) => {
                              const novoTipo = e.target.value as TransactionType;
                              const novaCat =
                                novoTipo === 'transferencia_interna'
                                  ? 'Transferência entre Contas'
                                  : novoTipo === 'receita'
                                  ? CATEGORIAS_RECEITA[0]
                                  : novoTipo === 'poupanca'
                                  ? CATEGORIAS_POUPANCA[0]
                                  : novoTipo === 'resgate_poupanca'
                                  ? CATEGORIAS_RESGATE_POUPANCA[0]
                                  : CATEGORIAS_DESPESA[0];
                              atualizarItemPreview(item.idTemp, {
                                tipo: novoTipo,
                                categoria: novaCat,
                              });
                            }}
                            className={`rounded-lg px-2 py-1 text-xs font-bold border ${
                              item.tipo === 'despesa'
                                ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                                : item.tipo === 'receita'
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                : item.tipo === 'transferencia_interna'
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                : 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                            }`}
                          >
                            <option value="despesa" className="bg-zinc-900 text-white">
                              Gasto (-)
                            </option>
                            <option value="receita" className="bg-zinc-900 text-white">
                              Entrada (+)
                            </option>
                            <option value="transferencia_interna" className="bg-zinc-900 text-white">
                              Movimentação (⇄)
                            </option>
                            <option value="poupanca" className="bg-zinc-900 text-white">
                              Guardei Poupança
                            </option>
                            <option value="resgate_poupanca" className="bg-zinc-900 text-white">
                              Resgate CDB/Poup.
                            </option>
                          </select>

                          <select
                            value={item.categoria}
                            onChange={(e) =>
                              atualizarItemPreview(item.idTemp, { categoria: e.target.value })
                            }
                            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-200 max-w-[130px]"
                          >
                            {(item.tipo === 'despesa'
                              ? CATEGORIAS_DESPESA
                              : item.tipo === 'receita'
                              ? CATEGORIAS_RECEITA
                              : item.tipo === 'poupanca'
                              ? CATEGORIAS_POUPANCA
                              : item.tipo === 'resgate_poupanca'
                              ? CATEGORIAS_RESGATE_POUPANCA
                              : CATEGORIAS_TRANSFERENCIA
                            ).map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>

                          <select
                            value={item.responsavel}
                            onChange={(e) =>
                              atualizarItemPreview(item.idTemp, { responsavel: e.target.value })
                            }
                            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-xs font-semibold text-emerald-400"
                          >
                            {[pessoa1, pessoa2, 'Casal'].map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>

                          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1">
                            <span className="text-[10px] text-zinc-400 font-semibold">R$</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={item.valor}
                              onChange={(e) =>
                                atualizarItemPreview(item.idTemp, {
                                  valor: Math.max(0, parseFloat(e.target.value) || 0),
                                })
                              }
                              className="w-[72px] bg-transparent text-xs font-extrabold text-white text-right focus:outline-none"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => removerItemPreview(item.idTemp)}
                            className="p-1 text-zinc-500 hover:text-rose-400 cursor-pointer"
                            title="Remover linha"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RODAPÉ DE CONFIRMAÇÃO */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-800 shrink-0">
              <span className="text-xs text-zinc-400">
                {resumoPreview.total > 0
                  ? `${resumoPreview.qtdDespesas} gasto(s), ${resumoPreview.qtdReceitas} entrada(s), ${resumoPreview.qtdPoupanca} poupança/CDB e ${resumoPreview.qtdTransferencias} movimentação(ões)`
                  : 'Suba os PDFs do Inter e Itaú acima'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={
                    (resumoPreview.total === 0 && saldosDetectadosPreview.length === 0) || salvando
                  }
                  onClick={handleConfirmarImportacao}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Check size={16} strokeWidth={2.5} />
                  {salvando
                    ? 'Salvando...'
                    : `Confirmar e Salvar (${resumoPreview.total})`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}