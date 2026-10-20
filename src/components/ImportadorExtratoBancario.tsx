import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import {
  Upload,
  FileText,
  CheckCircle2,
  ArrowLeftRight,
  Trash2,
  X,
  User,
  Users,
  Calendar,
  Sparkles,
  AlertCircle,
  Check,
} from 'lucide-react';
import {
  type Transaction,
  type TransactionType,
  type PaymentMethod,
  CATEGORIAS_DESPESA,
  CATEGORIAS_RECEITA,
  CATEGORIAS_POUPANCA,
  CATEGORIAS_TRANSFERENCIA,
  formatarMoeda,
  nomeMesAno,
} from '../types';

interface ImportadorExtratoBancarioProps {
  mesSelecionado: string; // Ex: "2026-09"
  pessoa1: string;
  pessoa2: string;
  onImportarLancamentos: (novos: Transaction[]) => Promise<void>;
}

interface ItemPreview {
  idTemp: string;
  selecionado: boolean;
  data: string; // YYYY-MM-DD
  horario?: string; // HH:MM
  local: string;
  valor: number;
  sinalOriginal: 'entrada' | 'saida';
  tipo: TransactionType;
  categoria: string;
  responsavel: string;
  metodoPagamento: PaymentMethod;
  origemArquivo: string;
  motivoAuto?: string; // Ex: "Par de transferência detectado"
}

export function ImportadorExtratoBancario({
  mesSelecionado,
  pessoa1,
  pessoa2,
  onImportarLancamentos,
}: ImportadorExtratoBancarioProps) {
  const [modalAberto, setModalAberto] = useState(false);

  // 1. CONFIGURAÇÕES ANTES DO UPLOAD
  const [responsavelPadrao, setResponsavelPadrao] = useState<string>(pessoa1);
  const [mesAlvo, setMesAlvo] = useState<string>(mesSelecionado);
  const [metodoPadrao, setMetodoPadrao] = useState<PaymentMethod>('Pix/Débito');

  // 2. ENTRADA DE TEXTO E ITENS LIDOS
  const [abaEntrada, setAbaEntrada] = useState<'arquivos' | 'texto'>('arquivos');
  const [textoColado, setTextoColado] = useState('');
  const [itensPreview, setItensPreview] = useState<ItemPreview[]>([]);
  const [ignoradosOutroMes, setIgnoradosOutroMes] = useState<number>(0);
  const [salvando, setSalvando] = useState(false);

  const abrirModal = () => {
    setMesAlvo(mesSelecionado);
    setResponsavelPadrao(pessoa1);
    setModalAberto(true);
  };

  const normalizar = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  // Classificador automático de categoria e método
  const classificarDescricao = (
    desc: string,
    sinal: 'entrada' | 'saida'
  ): { tipo: TransactionType; categoria: string; metodo: PaymentMethod; motivo?: string } => {
    const t = normalizar(desc);

    // 1. Verifica se o próprio texto já denuncia uma transferência entre contas próprias ou aplicação
    const nomesProprios = [
      normalizar(pessoa1),
      normalizar(pessoa2),
      'juan cecilio',
      'mesma titularidade',
      'entre contas',
      'transf entre contas',
      'transferencia propria',
    ].filter((n) => n.length >= 3);

    if (
      nomesProprios.some((nome) => t.includes(nome)) &&
      (t.includes('pix') || t.includes('ted') || t.includes('transf') || t.includes('receb') || t.includes('enviad'))
    ) {
      return {
        tipo: 'transferencia_interna',
        categoria: 'Transferência entre Contas',
        metodo: 'Pix/Débito',
        motivo: 'Mesma titularidade / Entre contas',
      };
    }

    // Verifica se guardou em poupança/caixinha/CDB
    if (
      t.includes('aplicacao') ||
      t.includes('poupanca') ||
      t.includes('guardar dinheiro') ||
      t.includes('rdb') ||
      t.includes('cdb')
    ) {
      if (sinal === 'saida') {
        return {
          tipo: 'poupanca',
          categoria: 'Reserva do Casal',
          metodo: 'Pix/Débito',
          motivo: 'Aplicação Poupança',
        };
      }
    }

    if (sinal === 'entrada') {
      if (t.includes('salario') || t.includes('pagamento') || t.includes('remuneracao')) {
        return { tipo: 'receita', categoria: 'Salário', metodo: 'Pix/Débito' };
      }
      if (t.includes('rendimento') || t.includes('dividendo')) {
        return { tipo: 'receita', categoria: 'Rendimentos', metodo: 'Pix/Débito' };
      }
      return { tipo: 'receita', categoria: 'Reembolso/Pix', metodo: 'Pix/Débito' };
    }

    // Despesas (Saídas)
    let categoria = 'Outros';
    if (
      t.includes('uber') ||
      t.includes('99') ||
      t.includes('onibus') ||
      t.includes('van') ||
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
      t.includes('supermercado') ||
      t.includes('padaria') ||
      t.includes('lanche') ||
      t.includes('restaurante') ||
      t.includes('burger') ||
      t.includes('mc donalds') ||
      t.includes('mcdonalds') ||
      t.includes('bk') ||
      t.includes('sushi') ||
      t.includes('esfiha') ||
      t.includes('pizza') ||
      t.includes('acai') ||
      t.includes('sorvete') ||
      t.includes('doceria') ||
      t.includes('cantina') ||
      t.includes('atacadao') ||
      t.includes('assai')
    ) {
      categoria = 'Comida';
    } else if (
      t.includes('faculdade') ||
      t.includes('claro') ||
      t.includes('vivo') ||
      t.includes('tim') ||
      t.includes('internet') ||
      t.includes('energia') ||
      t.includes('elektro') ||
      t.includes('sabesp') ||
      t.includes('agua') ||
      t.includes('aluguel') ||
      t.includes('condominio') ||
      t.includes('fatura') ||
      t.includes('cartao') ||
      t.includes('boleto')
    ) {
      categoria = 'Contas Fixas';
    } else if (
      t.includes('farmacia') ||
      t.includes('drogaria') ||
      t.includes('droga') ||
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

  // ============================================================================
  // ALGORITMO DE CRUZAMENTO DE PARES (DETECTA TRANSFERÊNCIAS ENTRE SUAS CONTAS)
  // ============================================================================
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

      for (let j = 0; j < resultado.length; j++) {
        if (i === j) continue;
        const itemB = resultado[j];
        if (itemB.sinalOriginal !== 'entrada') continue;

        // Mesmo valor exato (centavo por centavo)
        const mesmoValor = Math.abs(itemA.valor - itemB.valor) < 0.005;
        if (!mesmoValor) continue;

        // Mesmo dia (ou no máximo 1 dia de diferença se foi agendado à noite)
        const diasDistancia = diffDias(itemA.data, itemB.data);
        if (diasDistancia <= 1) {
          // Marca ambos como Movimentação Interna para não duplicar ganho/gasto!
          const msgHorario =
            itemA.horario && itemB.horario && itemA.horario === itemB.horario
              ? `Mesmo dia e horário (${itemA.horario})`
              : 'Mesmo valor e data entre contas';

          resultado[i] = {
            ...itemA,
            tipo: 'transferencia_interna',
            categoria: 'Transferência entre Contas',
            motivoAuto: `Movimentação detectada (${msgHorario})`,
          };
          resultado[j] = {
            ...itemB,
            tipo: 'transferencia_interna',
            categoria: 'Transferência entre Contas',
            motivoAuto: `Movimentação detectada (${msgHorario})`,
          };
          break;
        }
      }
    }

    return resultado;
  };

  // ============================================================================
  // CONVERSORES DE DATA E VALOR (SUPORTA ITAÚ, NUBANK, INTER, OFX, CSV)
  // ============================================================================
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

    const str = String(textoData).trim();
    const matchHora = str.match(/(\d{2}:\d{2})/);
    const horario = matchHora ? matchHora[1] : undefined;

    // Formato DD/MM/YYYY
    const mBR = str.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (mBR) {
      return { dataISO: `${mBR[3]}-${mBR[2]}-${mBR[1]}`, horario };
    }

    // Formato YYYY-MM-DD
    const mISO = str.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (mISO) {
      return { dataISO: `${mISO[1]}-${mISO[2]}-${mISO[3]}`, horario };
    }

    // Formato curto DD/MM (assume o ano do mesAlvo selecionado)
    const mCurto = str.match(/^(\d{2})\/(\d{2})(?!\/)/);
    if (mCurto) {
      const anoAlvo = mesAlvo.split('-')[0];
      return { dataISO: `${anoAlvo}-${mCurto[2]}-${mCurto[1]}`, horario };
    }

    return { dataISO: null };
  };

  const extrairNumero = (val: any): number | null => {
    if (val === null || val === undefined || val === '') return null;
    if (typeof val === 'number') return isNaN(val) ? null : Number(val.toFixed(2));

    let s = String(val)
      .replace(/R\$/gi, '')
      .replace(/\s/g, '')
      .trim();
    if (!s) return null;

    // Trata formato "150,00-" ou "150,00D" (comum em extratos do Itaú)
    let multiplicador = 1;
    if (s.endsWith('-') || /d$/i.test(s)) {
      multiplicador = -1;
      s = s.replace(/[-dD]+$/, '');
    } else if (/c$/i.test(s)) {
      s = s.replace(/[cC]+$/, '');
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
  // LEITOR 1: ARQUIVOS OFX (PADRÃO ITAÚ, NUBANK, INTER, BRADESCO, SANTANDER)
  // ============================================================================
  const lerConteudoOFX = (conteudo: string, nomeArq: string): { validos: ItemPreview[]; ignorados: number } => {
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
      const horario = dtMatch[2] ? `${dtMatch[2].slice(0, 2)}:${dtMatch[2].slice(2, 4)}` : undefined;

      // VERIFICADOR DE MÊS (Ignora dias de outros meses do extrato de 60/90 dias!)
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
  // LEITOR 2: PLANILHAS / CSV (ITAÚ, NUBANK, INTER)
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

        // Procura qual célula tem formato de data
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

        // VERIFICADOR DE MÊS EXATO (Filtra apenas o mês desejado!)
        if (!dataEncontrada.startsWith(mesAlvo)) {
          ignorados++;
          return;
        }

        // Procura o valor monetário e a descrição nas outras colunas
        let valorEncontrado: number | null = null;
        const textosDescricao: string[] = [];

        for (let c = 0; c < linha.length; c++) {
          if (c === colData) continue;
          const valCelula = linha[c];
          if (valCelula === '' || valCelula === null || valCelula === undefined) continue;

          const num = extrairNumero(valCelula);
          const strCelula = String(valCelula).trim();

          // Verifica se é realmente uma coluna de valor (número puro ou formato monetário)
          const pareceMonetario =
            typeof valCelula === 'number' ||
            /^[-+]?\s*(R\$)?\s*\d{1,3}(\.\d{3})*([.,]\d{2})?[-dDcC]?$/.test(strCelula);

          if (num !== null && num !== 0 && pareceMonetario && valorEncontrado === null) {
            valorEncontrado = num;
          } else if (strCelula.length > 1 && !/^(saldo|total)/i.test(strCelula)) {
            textosDescricao.push(strCelula);
          }
        }

        if (valorEncontrado === null || valorEncontrado === 0) return;

        const descFinal = textosDescricao.join(' - ').trim() || 'Lançamento Extrato';
        if (/^saldo\s*(anterior|do dia|final|total)/i.test(normalizar(descFinal))) return;

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
  // LEITOR 3: TEXTO BRUTO COPIADO DO APP OU EXTRATO ITAÚ (.TXT)
  // ============================================================================
  const lerTextoBruto = (
    texto: string,
    origemLabel: string
  ): { validos: ItemPreview[]; ignorados: number } => {
    const validos: ItemPreview[] = [];
    let ignorados = 0;

    const linhas = texto.split(/\r?\n/);
    linhas.forEach((linha, idx) => {
      const limpa = linha.trim();
      if (!limpa || limpa.length < 6) return;

      // Procura uma data no início ou meio da linha (DD/MM/YYYY ou DD/MM)
      const matchData = limpa.match(/(\d{2}\/\d{2}(?:\/\d{4})?|\d{4}-\d{2}-\d{2})/);
      // Procura um valor monetário no final ou meio da linha (ex: -15,90 ou R$ 1.200,00 ou 45,00-)
      const matchValor = limpa.match(
        /([-+]?\s*(?:R\$\s*)?\d{1,3}(?:\.\d{3})*,\d{2}[-dDcC]?|[-+]?\d+\.\d{2})\s*$/i
      );

      if (!matchData || !matchValor) return;

      const { dataISO, horario } = extrairDataISO(limpa);
      if (!dataISO) return;

      // VERIFICADOR DE MÊS EXATO
      if (!dataISO.startsWith(mesAlvo)) {
        ignorados++;
        return;
      }

      const valorNum = extrairNumero(matchValor[1]);
      if (valorNum === null || valorNum === 0) return;

      // Remove a data e o valor para sobrar apenas o nome do estabelecimento/Pix
      const desc = limpa
        .replace(matchData[0], '')
        .replace(matchValor[0], '')
        .replace(/\d{2}:\d{2}/, '')
        .replace(/^[;\t|-]+|[;\t|-]+$/g, '')
        .trim();

      if (!desc || /^saldo/i.test(normalizar(desc))) return;

      const sinal: 'entrada' | 'saida' = valorNum > 0 ? 'entrada' : 'saida';
      const classif = classificarDescricao(desc, sinal);

      validos.push({
        idTemp: `${Date.now()}-${origemLabel}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        selecionado: true,
        data: dataISO,
        horario,
        local: desc,
        valor: Math.abs(valorNum),
        sinalOriginal: sinal,
        tipo: classif.tipo,
        categoria: classif.categoria,
        responsavel: responsavelPadrao,
        metodoPagamento: classif.metodo,
        origemArquivo: origemLabel,
        motivoAuto: classif.motivo,
      });
    });

    return { validos, ignorados };
  };

  // ============================================================================
  // PROCESSAMENTO DE MÚLTIPLOS ARQUIVOS JUNTOS
  // ============================================================================
  const handleUploadArquivos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let novosExtraidos: ItemPreview[] = [];
    let totalForaDoMes = 0;

    for (const file of Array.from(files)) {
      const nomeLower = file.name.toLowerCase();

      if (nomeLower.endsWith('.ofx') || nomeLower.endsWith('.ofc')) {
        const texto = await file.text();
        const { validos, ignorados } = lerConteudoOFX(texto, file.name);
        novosExtraidos.push(...validos);
        totalForaDoMes += ignorados;
      } else if (nomeLower.endsWith('.txt')) {
        const texto = await file.text();
        const { validos, ignorados } = lerTextoBruto(texto, file.name);
        novosExtraidos.push(...validos);
        totalForaDoMes += ignorados;
      } else {
        const buffer = await file.arrayBuffer();
        const { validos, ignorados } = lerPlanilhaOuCSV(buffer, file.name);
        novosExtraidos.push(...validos);
        totalForaDoMes += ignorados;
      }
    }

    setIgnoradosOutroMes((prev) => prev + totalForaDoMes);

    setItensPreview((prev) => {
      const combinados = [...prev, ...novosExtraidos];
      return cruzarTransferenciasInternas(combinados);
    });

    e.target.value = '';
  };

  const handleProcessarTextoColado = () => {
    if (!textoColado.trim()) return;
    const { validos, ignorados } = lerTextoBruto(textoColado, 'Texto Colado');
    setIgnoradosOutroMes((prev) => prev + ignorados);
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

  const resumoPreview = useMemo(() => {
    const selecionados = itensPreview.filter((i) => i.selecionado);
    const qtdDespesas = selecionados.filter((i) => i.tipo === 'despesa').length;
    const qtdReceitas = selecionados.filter((i) => i.tipo === 'receita').length;
    const qtdTransferencias = selecionados.filter((i) => i.tipo === 'transferencia_interna').length;
    return { total: selecionados.length, qtdDespesas, qtdReceitas, qtdTransferencias };
  }, [itensPreview]);

  const handleConfirmarImportacao = async () => {
    const selecionados = itensPreview.filter((i) => i.selecionado);
    if (selecionados.length === 0) return;

    setSalvando(true);
    const transacoesFinais: Transaction[] = selecionados.map((item, idx) => ({
      id: `extrato-${item.data}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
      tipo: item.tipo,
      valor: item.valor,
      data: item.data,
      local: item.local.trim() || 'Lançamento Bancário',
      categoria: item.categoria,
      tags: item.motivoAuto ? ['#MovimentaçãoInterna'] : ['#ExtratoBancário'],
      metodoPagamento: item.metodoPagamento,
      responsavel: item.responsavel,
      pendenteSync: false,
    }));

    await onImportarLancamentos(transacoesFinais);
    setSalvando(false);
    setItensPreview([]);
    setIgnoradosOutroMes(0);
    setModalAberto(false);
  };

  return (
    <>
      <button
        onClick={abrirModal}
        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition shadow-lg shadow-emerald-500/15"
      >
        <Upload size={15} strokeWidth={2.5} />
        <span>Importar Extratos Bancários</span>
      </button>

      {modalAberto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-4xl rounded-t-3xl sm:rounded-2xl p-5 md:p-6 space-y-5 shadow-2xl max-h-[94vh] flex flex-col">
            {/* CABEÇALHO DO MODAL */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 shrink-0">
              <div>
                <h3 className="font-bold text-base md:text-lg text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-emerald-400" />
                  Importador Inteligente de Extratos Bancários
                </h3>
                <p className="text-xs text-zinc-400">
                  Filtra apenas o mês escolhido, identifica quem enviou e detecta transferências entre suas contas
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
              {/* PASSO 1: SELECIONAR QUEM ESTÁ SUBINDO + QUAL O MÊS ALVO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl">
                {/* CHECKBOX DE RESPONSÁVEL */}
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

                {/* VERIFICADOR DO MÊS EXATO (EX: FILTRAR EXTRATO DE 60/90 DIAS DO ITAÚ) */}
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
                    Dias fora de <strong>{nomeMesAno(mesAlvo)}</strong> serão ignorados!
                  </span>
                </div>

                {/* MÉTODO PADRÃO */}
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

              {/* PASSO 2: ENVIAR MÚLTIPLOS ARQUIVOS OU COLAR TEXTO */}
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
                    Subir Arquivos (.CSV, .OFX, .TXT, .XLSX)
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
                    Colar Texto Copiado do Banco
                  </button>
                </div>

                {abaEntrada === 'arquivos' ? (
                  <label className="border-2 border-dashed border-zinc-700 hover:border-emerald-500/60 bg-zinc-950/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition">
                    <Upload size={28} className="text-emerald-400 mb-2" />
                    <p className="text-xs md:text-sm font-bold text-zinc-200">
                      Clique para selecionar 1 ou mais extratos juntos (Itaú, Nubank, Inter...)
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Você pode subir o extrato de 60/90 dias: o sistema vai pegar só{' '}
                      <strong className="text-emerald-400">{nomeMesAno(mesAlvo)}</strong> e marcar como{' '}
                      <strong className="text-emerald-400">{responsavelPadrao}</strong>!
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".csv,.ofx,.ofc,.txt,.xlsx,.xls"
                      onChange={handleUploadArquivos}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      rows={4}
                      placeholder="Cole aqui as linhas copiadas do extrato do Itaú, Nubank ou Inter (Ex: 15/09/2026 PIX TRANSF 50,00)..."
                      value={textoColado}
                      onChange={(e) => setTextoColado(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleProcessarTextoColado}
                      className="bg-zinc-800 hover:bg-zinc-700 text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                    >
                      Ler Linhas do Texto para {responsavelPadrao}
                    </button>
                  </div>
                )}
              </div>

              {/* AVISO DE QUANTOS ITENS FORAM FILTRADOS DE OUTROS MESES */}
              {ignoradosOutroMes > 0 && (
                <div className="bg-sky-500/10 border border-sky-500/30 rounded-xl px-3.5 py-2 text-xs text-sky-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0 text-sky-400" />
                    Filtro de Mês ativo: <strong>{ignoradosOutroMes} lançamento(s)</strong> de outros meses (60/90 dias) foram ignorados automaticamente.
                  </span>
                </div>
              )}

              {/* PASSO 3: TABELA DE REVISÃO E EDIÇÃO RÁPIDA ANTES DE SALVAR */}
              {itensPreview.length > 0 && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs md:text-sm font-bold text-white">
                        Revisão dos Lançamentos ({resumoPreview.total} selecionados)
                      </h4>
                      {resumoPreview.qtdTransferencias > 0 && (
                        <span className="text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                          <ArrowLeftRight size={12} />
                          {resumoPreview.qtdTransferencias} movimentação(ões) entre contas detectada(s)
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setItensPreview([]);
                        setIgnoradosOutroMes(0);
                      }}
                      className="text-xs text-rose-400 hover:underline cursor-pointer"
                    >
                      Limpar lista
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
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
                              placeholder="Descrição / Nome do gasto"
                              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-lg px-2.5 py-1 text-xs font-semibold text-white focus:outline-none"
                            />
                            {item.motivoAuto && (
                              <span className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5">
                                <ArrowLeftRight size={10} /> {item.motivoAuto} (Não altera saldo)
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          {/* SELETOR DE TIPO (PODE MUDAR PARA MOVIMENTAÇÃO A QUALQUER HORA) */}
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
                              Poupança
                            </option>
                          </select>

                          {/* CATEGORIA */}
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
                              : CATEGORIAS_TRANSFERENCIA
                            ).map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>

                          {/* RESPONSÁVEL INDIVIDUAL */}
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

                          <span className="text-xs font-extrabold text-white min-w-[78px] text-right">
                            {formatarMoeda(item.valor)}
                          </span>

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
                  ? `${resumoPreview.qtdDespesas} gasto(s), ${resumoPreview.qtdReceitas} entrada(s) e ${resumoPreview.qtdTransferencias} movimentação(ões)`
                  : 'Suba seus arquivos acima para revisar'}
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
                  disabled={resumoPreview.total === 0 || salvando}
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
    </>
  );
}