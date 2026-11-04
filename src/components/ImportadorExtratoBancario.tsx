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

// Configuração segura do worker do PDF.js compatível com versões recentes
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

interface ImportadorExtratoBancarioProps {
  mesSelecionado: string;
  pessoa1: string;
  pessoa2: string;
  contaAtiva?: string;
  onImportarLancamentos: (novos: Transaction[]) => Promise<void>;
}

interface ItemPreview {
  idTemp: string;
  selecionado: boolean;
  data: string;
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
}

export interface SaldoFinalBancoMes {
  id: string;
  conta_id: string;
  mes: string;
  banco: string;
  dataUltimoDia: string;
  saldoFinal: number;
  responsavel: string;
}

const MESES_PT: Record<string, string> = {
  janeiro: '01', jan: '01', fevereiro: '02', fev: '02', marco: '03', mar: '03',
  abril: '04', abr: '04', maio: '05', mai: '05', junho: '06', jun: '06',
  julho: '07', jul: '07', agosto: '08', ago: '08', setembro: '09', set: '09',
  outubro: '10', out: '10', novembro: '11', nov: '11', dezembro: '12', dez: '12',
};

const STORAGE_KEY_SALDOS = 'financas_saldos_fim_mes_v2';

export function ImportadorExtratoBancario({
  mesSelecionado,
  pessoa1,
  pessoa2,
  contaAtiva,
  onImportarLancamentos,
}: ImportadorExtratoBancarioProps) {
  const [modalAberto, setModalAberto] = useState(false);

  const normalizar = (str: string) =>
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  const contaIdAtual = useMemo(() => {
    if (contaAtiva) return contaAtiva;
    return normalizar(pessoa1).includes('vitoria') ? 'vitoria' : 'casal';
  }, [contaAtiva, pessoa1]);

  const [responsavelPadrao, setResponsavelPadrao] = useState<string>(pessoa1);
  const [mesAlvo, setMesAlvo] = useState<string>(mesSelecionado);
  const [metodoPadrao, setMetodoPadrao] = useState<PaymentMethod>('Pix/Débito');

  const [abaEntrada, setAbaEntrada] = useState<'arquivos' | 'texto'>('arquivos');
  const [textoColado, setTextoColado] = useState('');
  const [itensPreview, setItensPreview] = useState<ItemPreview[]>([]);
  const [ignoradosOutroMes, setIgnoradosOutroMes] = useState<number>(0);
  const [lendoArquivos, setLendoArquivos] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [saldosDetectadosPreview, setSaldosDetectadosPreview] = useState<SaldoFinalBancoMes[]>([]);
  const [saldosMesAtual, setSaldosMesAtual] = useState<SaldoFinalBancoMes[]>([]);

  const carregarSaldosLocal = useCallback((): SaldoFinalBancoMes[] => {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY_SALDOS}_${contaIdAtual}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, [contaIdAtual]);

  const salvarSaldosLocal = useCallback(
    (lista: SaldoFinalBancoMes[]) => {
      try {
        localStorage.setItem(`${STORAGE_KEY_SALDOS}_${contaIdAtual}`, JSON.stringify(lista));
      } catch {}
    },
    [contaIdAtual]
  );

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
  };

  const abrirModal = () => {
    setMesAlvo(mesSelecionado);
    setResponsavelPadrao(pessoa1);
    setModalAberto(true);
  };

  const limparDescricaoBancaria = (desc: string): string => {
    return desc
      .replace(/^Compra no debito:\s*"?No estabelecimento\s*/i, 'Compra Débito - ')
      .replace(/^SAQUE BANCO 24H:\s*"?No estabelecimento\s*/i, 'Saque - ')
      .replace(/^Pix (enviado|recebido):\s*"?Cp\s*:\s*\d+-/i, 'Pix $1 - ')
      .replace(/^(Aplicacao|Resgate|Pagamento efetuado):\s*"?/i, '$1 - ')
      .replace(/"/g, '')
      .trim();
  };

  const classificarDescricao = (
    desc: string,
    sinal: 'entrada' | 'saida'
  ): { tipo: TransactionType; categoria: string; metodo: PaymentMethod; motivo?: string } => {
    const t = normalizar(desc);
    const p1Norm = normalizar(pessoa1);
    const p2Norm = normalizar(pessoa2);

    const nomesProprios = [p1Norm, p2Norm, 'juan cecilio', 'juan ce', 'entre contas'].filter(
      (n) => n.length >= 3
    );

    if (
      nomesProprios.some((nome) => t.includes(nome)) &&
      (t.includes('pix') || t.includes('ted') || t.includes('transf'))
    ) {
      return {
        tipo: 'transferencia_interna',
        categoria: 'Transferência entre Contas',
        metodo: 'Pix/Débito',
        motivo: 'Entre contas',
      };
    }

    if (t.includes('aplicacao') || t.includes('poupanca') || t.includes('cdb')) {
      if (t.includes('rendimento') || t.includes('rend pago')) {
        return { tipo: 'receita', categoria: 'Rendimentos', metodo: 'Pix/Débito' };
      }
      if (sinal === 'saida' && !t.includes('resgate')) {
        return { tipo: 'poupanca', categoria: 'Reserva do Casal', metodo: 'Pix/Débito', motivo: 'Aplicação' };
      }
      return { tipo: 'resgate_poupanca', categoria: 'Resgate para Uso', metodo: 'Pix/Débito', motivo: 'Resgate' };
    }

    if (sinal === 'entrada') {
      if (t.includes('salario') || t.includes('remuneracao')) {
        return { tipo: 'receita', categoria: 'Salário', metodo: 'Pix/Débito' };
      }
      return { tipo: 'receita', categoria: 'Reembolso/Pix', metodo: 'Pix/Débito' };
    }

    let categoria = 'Outros';
    if (t.includes('uber') || t.includes('99') || t.includes('onibus') || t.includes('van') || t.includes('motta')) {
      categoria = 'Transporte';
    } else if (t.includes('ifood') || t.includes('mercado') || t.includes('merca') || t.includes('padaria') || t.includes('lanche') || t.includes('restaurante')) {
      categoria = 'Comida';
    } else if (t.includes('faculdade') || t.includes('claro') || t.includes('vivo') || t.includes('telefonica') || t.includes('fatura') || t.includes('iof')) {
      categoria = 'Contas Fixas';
    } else if (t.includes('farmacia') || t.includes('drogaria') || t.includes('frogway')) {
      categoria = 'Saúde';
    } else if (t.includes('spotify') || t.includes('futebol')) {
      categoria = 'Lazer';
    } else if (t.includes('shopee') || t.includes('amazon') || t.includes('roupa')) {
      categoria = 'Compras';
    }

    return { tipo: 'despesa', categoria, metodo: metodoPadrao };
  };

  const extrairDataISO = (textoData: any): { dataISO: string | null; horario?: string } => {
    if (!textoData) return { dataISO: null };
    const str = String(textoData).replace(/\u00a0/g, ' ').trim();
    const norm = normalizar(str);
    const matchHora = str.match(/(\d{2}:\d{2})/);
    const horario = matchHora ? matchHora[1] : undefined;

    const mExtenso = norm.match(
      /(\d{1,2})\s+de\s+(janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\s+de\s+(\d{4})/
    );
    if (mExtenso) {
      return { dataISO: `${mExtenso[3]}-${MESES_PT[mExtenso[2]]}-${mExtenso[1].padStart(2, '0')}`, horario };
    }

    const mBR = str.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (mBR) {
      return { dataISO: `${mBR[3]}-${mBR[2]}-${mBR[1]}`, horario };
    }

    return { dataISO: null };
  };

  const extrairNumero = (val: any): number | null => {
    if (val === null || val === undefined || val === '') return null;
    if (typeof val === 'number') return isNaN(val) ? null : Number(val.toFixed(2));
    let s = String(val).replace(/R\$/gi, '').replace(/\u00a0/g, '').replace(/\s/g, '').trim();
    if (!s) return null;
    let mult = 1;
    if (s.endsWith('-') || s.startsWith('-') || /d$/i.test(s)) {
      mult = -1;
      s = s.replace(/[-+dD]+/g, '');
    }
    if (s.includes(',') && s.includes('.')) {
      s = s.replace(/\./g, '').replace(',', '.');
    } else if (s.includes(',')) {
      s = s.replace(',', '.');
    }
    const num = parseFloat(s);
    return isNaN(num) ? null : Number((num * mult).toFixed(2));
  };

  const extrairTextoDePDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
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
        linhasTotais.push(g.itens.map((i) => i.str).join(' '));
      }
    }
    return linhasTotais.join('\n');
  };

  const lerTextoBrutoOuPDF = (texto: string, origemLabel: string) => {
    const validos: ItemPreview[] = [];
    let ignorados = 0;
    const textoNorm = normalizar(texto);
    const nomeBanco = textoNorm.includes('banco inter') ? 'Banco Inter' : textoNorm.includes('itau') ? 'Itaú' : origemLabel;
    const saldosDiarios: { data: string; saldo: number }[] = [];
    const regexValores = /[-+]?\s*(?:R\$\s*)?[-+]?\s*\d{1,3}(?:\.\d{3})*[.,]\d{2}(?:-(?!\s*(?:R\$|\d)))?/gi;

    const linhas = texto.split(/\r?\n/);
    let ultimaData: string | null = null;

    for (let idx = 0; idx < linhas.length; idx++) {
      const limpa = linhas[idx].replace(/\u00a0/g, ' ').trim();
      if (!limpa || limpa.length < 4) continue;
      const norm = normalizar(limpa);

      if (
        norm.includes('solicitado em') || norm.includes('periodo:') || norm.includes('emitido em') ||
        norm.includes('cpf/cnpj') || norm.includes('sac:') || norm.includes('limite da conta') ||
        norm.includes('saldo total') || norm.includes('saldo disponivel') || norm.includes('saldo bloqueado')
      ) continue;

      const { dataISO, horario } = extrairDataISO(limpa);
      if (dataISO) ultimaData = dataISO;

      if (norm.includes('saldo do dia') || norm.includes('saldo anterior') || norm.includes('saldo final')) {
        const refData = dataISO || ultimaData;
        if (refData && refData.startsWith(mesAlvo) && norm.includes('saldo do dia')) {
          const trecho = limpa.slice(norm.indexOf('saldo do dia'));
          const ms = Array.from(trecho.matchAll(regexValores));
          if (ms.length > 0) {
            const val = extrairNumero(ms[ms.length - 1][0]);
            if (val !== null) saldosDiarios.push({ data: refData, saldo: val });
          }
        }
        continue;
      }

      const dataUsada = dataISO || ultimaData;
      if (!dataUsada) continue;

      let resto = limpa;
      const mInicio = resto.match(/^(\d{2}\/\d{2}\/\d{2,4}|\d{4}-\d{2}-\d{2})\s+/);
      if (mInicio) resto = resto.slice(mInicio[0].length).trim();

      const msVals = Array.from(resto.matchAll(regexValores));
      if (msVals.length === 0) continue;

      let valorNum = extrairNumero(msVals[0][0]);
      if (valorNum === null || valorNum === 0) continue;

      const desc = limparDescricaoBancaria(resto.slice(0, msVals[0].index).trim());
      if (!desc || desc.length < 2) continue;

      if (!dataUsada.startsWith(mesAlvo)) {
        ignorados++;
        continue;
      }

      const sinal = valorNum > 0 ? 'entrada' : 'saida';
      const classif = classificarDescricao(desc, sinal);

      validos.push({
        idTemp: `${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
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

    let ultimoSaldoMes: SaldoFinalBancoMes | null = null;
    if (saldosDiarios.length > 0) {
      saldosDiarios.sort((a, b) => a.data.localeCompare(b.data));
      const ultimo = saldosDiarios[saldosDiarios.length - 1];
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

  const handleUploadArquivos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLendoArquivos(true);
    const novosExtraidos: ItemPreview[] = [];
    let totalFora = 0;
    const novosSaldos: SaldoFinalBancoMes[] = [];

    try {
      for (const file of Array.from(files)) {
        if (file.name.toLowerCase().endsWith('.pdf')) {
          const texto = await extrairTextoDePDF(file);
          const res = lerTextoBrutoOuPDF(texto, file.name);
          novosExtraidos.push(...res.validos);
          totalFora += res.ignorados;
          if (res.ultimoSaldoMes) novosSaldos.push(res.ultimoSaldoMes);
        }
      }
      setIgnoradosOutroMes((prev) => prev + totalFora);
      if (novosSaldos.length > 0) {
        setSaldosDetectadosPreview((prev) => {
          const m = new Map<string, SaldoFinalBancoMes>();
          [...prev, ...novosSaldos].forEach((s) => m.set(s.id, s));
          return Array.from(m.values());
        });
      }
      setItensPreview((prev) => [...prev, ...novosExtraidos]);
    } catch (err) {
      console.error(err);
      alert('Erro ao processar PDF.');
    } finally {
      setLendoArquivos(false);
      e.target.value = '';
    }
  };

  const handleConfirmarImportacao = async () => {
    const selecionados = itensPreview.filter((i) => i.selecionado);
    if (selecionados.length === 0 && saldosDetectadosPreview.length === 0) return;

    setSalvando(true);

    if (saldosDetectadosPreview.length > 0) {
      const locais = carregarSaldosLocal();
      const m = new Map<string, SaldoFinalBancoMes>();
      locais.forEach((s) => m.set(s.id, s));
      saldosDetectadosPreview.forEach((s) => m.set(s.id, s));
      const atualizados = Array.from(m.values());
      salvarSaldosLocal(atualizados);
      if (mesAlvo === mesSelecionado) {
        setSaldosMesAtual(atualizados.filter((s) => s.mes === mesSelecionado));
      }
      if (supabaseConfigurado && supabase) {
        await supabase.from('saldos_fim_mes').upsert(
          saldosDetectadosPreview.map((s) => ({
            id: s.id,
            conta_id: s.conta_id,
            mes: s.mes,
            banco: s.banco,
            responsavel: s.responsavel,
            data_ultimo_dia: s.dataUltimoDia,
            saldo_final: s.saldoFinal,
          }))
        );
      }
    }

    if (selecionados.length > 0) {
      const transacoes: Transaction[] = selecionados.map((i, idx) => ({
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `ext-${Date.now()}-${idx}`,
        tipo: i.tipo,
        valor: i.valor,
        data: i.data,
        local: i.local,
        categoria: i.categoria,
        tags: [`#${i.origemArquivo}`],
        metodoPagamento: i.metodoPagamento,
        responsavel: i.responsavel,
        pendenteSync: false,
      }));
      await onImportarLancamentos(transacoes);
    }

    setSalvando(false);
    setItensPreview([]);
    setSaldosDetectadosPreview([]);
    setModalAberto(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={abrirModal}
        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition shadow-lg"
      >
        <Upload size={15} />
        <span>Importar Extratos (Inter / Itaú PDF)</span>
      </button>

      {saldosMesAtual.length > 0 && (
        <div className="inline-flex flex-wrap items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-xl text-[11px] text-zinc-300">
          <Landmark size={13} className="text-emerald-400 shrink-0" />
          <span className="text-zinc-400">Sobrou no fim do mês:</span>
          {saldosMesAtual.map((s) => (
            <span key={s.id} className="inline-flex items-center gap-1 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded-lg font-semibold">
              {s.banco}: <strong className={s.saldoFinal >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{formatarMoeda(s.saldoFinal)}</strong>
              <button onClick={() => removerSaldoFimMes(s.id)} className="text-zinc-500 hover:text-rose-400 ml-1 cursor-pointer">
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}

      {modalAberto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-3xl rounded-2xl p-5 space-y-4 shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-white text-base">Importador Automático (PDF Inter & Itaú)</h3>
              <button onClick={() => setModalAberto(false)} className="text-zinc-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1 flex-1">
              <div className="grid grid-cols-2 gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Responsável</label>
                  <select
                    value={responsavelPadrao}
                    onChange={(e) => setResponsavelPadrao(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    {[pessoa1, pessoa2, 'Casal'].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Mês Alvo</label>
                  <input
                    type="month"
                    value={mesAlvo}
                    onChange={(e) => setMesAlvo(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <label className="border-2 border-dashed border-zinc-700 hover:border-emerald-500 bg-zinc-950/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition">
                <FileText size={28} className="text-emerald-400 mb-2" />
                <p className="text-xs font-bold text-white">
                  {lendoArquivos ? 'Lendo PDFs...' : 'Clique para selecionar os PDFs do Inter e Itaú'}
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleUploadArquivos}
                  disabled={lendoArquivos}
                  className="hidden"
                />
              </label>

              {saldosDetectadosPreview.length > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-xs space-y-1">
                  <p className="font-bold text-emerald-300">Saldo Fim de Mês Detectado:</p>
                  {saldosDetectadosPreview.map((s) => (
                    <p key={s.id} className="text-zinc-200">
                      {s.banco}: <strong>{formatarMoeda(s.saldoFinal)}</strong> (Ref: {s.dataUltimoDia.split('-').reverse().join('/')})
                    </p>
                  ))}
                </div>
              )}

              {itensPreview.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-white">Lançamentos Encontrados ({itensPreview.length}):</p>
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {itensPreview.map((item) => (
                      <div key={item.idTemp} className="bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center justify-between text-xs">
                        <span className="text-zinc-300 truncate max-w-[240px]">{item.local}</span>
                        <span className="text-emerald-400 font-bold">{formatarMoeda(item.valor)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-end gap-2">
              <button
                onClick={() => setModalAberto(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                disabled={itensPreview.length === 0 && saldosDetectadosPreview.length === 0 || salvando}
                onClick={handleConfirmarImportacao}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 text-xs font-bold rounded-xl cursor-pointer"
              >
                {salvando ? 'Salvando...' : 'Confirmar e Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
