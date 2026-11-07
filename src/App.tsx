import { useState, useEffect, useMemo } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowDownLeft,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  PieChart as PieChartIcon,
  List,
  Home,
  Target,
  Package,
  FileText,
  Users,
  RefreshCw,
  Settings,
  Check,
  AlertCircle,
  Pencil,
  LogOut,
  CheckSquare,
  Trash2,
  Repeat,
  Sun,
  Moon,
  Landmark,
} from 'lucide-react';
import { supabase } from './supabaseClient';
import {
  type AccountId,
  type Transaction,
  type TransactionType,
  type PaymentMethod,
  type ActiveTab,
  type CategoryBudget,
  type EnxovalItem,
  type ObservacaoMes,
  CATEGORIAS_DESPESA,
  CATEGORIAS_RECEITA,
  CATEGORIAS_POUPANCA,
  CATEGORIAS_RESGATE,
  CATEGORIAS_TRANSFERENCIA,
  ORCAMENTOS_INICIAIS,
  obterMesAtualLocal,
  formatarMoeda,
  nomeMesAno,
  normalizarTextoBusca,
} from './types';
import { CardTransacao } from './components/CardTransacao';
import { ModalTransacao } from './components/ModalTransacao';
import { ModalConfigCasal } from './components/ModalConfigCasal';
import { AbaEnxoval } from './components/AbaEnxoval';
import { AbaObservacoes } from './components/AbaObservacoes';
import { AbaAnalise } from './components/AbaAnalise';
import { ExportadorRelatorio } from './components/ExportadorRelatorio';
import {
  ImportadorExtratoBancario,
  type SaldoFinalBancoMes,
} from './components/ImportadorExtratoBancario';
import { TelaLogin } from './components/TelaLogin';

const TODAS_CATEGORIAS = Array.from(
  new Set([
    ...CATEGORIAS_DESPESA,
    ...CATEGORIAS_RECEITA,
    ...CATEGORIAS_POUPANCA,
    ...CATEGORIAS_RESGATE,
    ...CATEGORIAS_TRANSFERENCIA,
  ])
);

export default function App() {
  // --- TEMA POR NAVEGADOR / DISPOSITIVO ('escuro' | 'claro') ---
  const [tema, setTema] = useState<'escuro' | 'claro'>(() => {
    const salvo = localStorage.getItem('@financas:tema');
    if (salvo === 'claro' || salvo === 'escuro') return salvo;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'claro' : 'escuro';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('tema-claro', tema === 'claro');
    localStorage.setItem('@financas:tema', tema);
  }, [tema]);

  const alternarTema = () => setTema((prev) => (prev === 'claro' ? 'escuro' : 'claro'));

  // --- USUÁRIO LOGADO ('casal' ou 'vitoria') ---
  const [contaAtiva, setContaAtiva] = useState<AccountId | null>(() => {
    const salvo = localStorage.getItem('@financas:conta_ativa');
    return salvo === 'casal' || salvo === 'vitoria' ? salvo : null;
  });

  const prefixoStorage = contaAtiva ? `@financas:${contaAtiva}` : '@financas:casal';
  const idConfigBanco = contaAtiva === 'vitoria' ? 2 : 1;

  // --- NOMES DO PERFIL ---
  const [pessoa1, setPessoa1] = useState('Juan');
  const [pessoa2, setPessoa2] = useState('Noiva');
  const [modalConfigAberto, setModalConfigAberto] = useState(false);

  // --- NAVEGAÇÃO E FILTROS ---
  const [abaAtiva, setAbaAtiva] = useState<ActiveTab>('home');
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoInicialModal, setTipoInicialModal] = useState<TransactionType>('despesa');
  const [transacaoEditando, setTransacaoEditando] = useState<Transaction | null>(null);
  const [filtroPessoaGlobal, setFiltroPessoaGlobal] = useState<string>('Todos');
  const [mesSelecionado, setMesSelecionado] = useState(() => obterMesAtualLocal());
  const [sincronizando, setSincronizando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erroNuvem, setErroNuvem] = useState<string | null>(null);

  // --- DADOS ---
  const [transacoes, setTransacoes] = useState<Transaction[]>([]);
  const [itensEnxoval, setItensEnxoval] = useState<EnxovalItem[]>([]);
  const [observacoesMes, setObservacoesMes] = useState<ObservacaoMes[]>([]);
  const [saldosFimMes, setSaldosFimMes] = useState<SaldoFinalBancoMes[]>([]);
  const [metaPoupanca, setMetaPoupanca] = useState<number>(10000);
  const [orcamentos, setOrcamentos] = useState<CategoryBudget[]>(ORCAMENTOS_INICIAIS);

  // --- FILTROS DO EXTRATO & SELEÇÃO EM LOTE ---
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | TransactionType>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroMetodo, setFiltroMetodo] = useState<'todos' | PaymentMethod>('todos');
  const [modoSelecao, setModoSelecao] = useState(false);
  const [idsSelecionados, setIdsSelecionados] = useState<string[]>([]);
  const [confirmandoExclusaoLote, setConfirmandoExclusaoLote] = useState(false);

  // --- EDIÇÃO DE METAS (POUPANÇA E TETO DE GASTOS DO MÊS) ---
  const [editandoMeta, setEditandoMeta] = useState(false);
  const [novaMetaInput, setNovaMetaInput] = useState('10000');
  const [editandoOrcamentos, setEditandoOrcamentos] = useState(false);
  const [orcamentosTemp, setOrcamentosTemp] = useState<Record<string, string>>({});

  // Carrega dados locais do usuário sempre que trocar de conta
  useEffect(() => {
    if (!contaAtiva) return;
    localStorage.setItem('@financas:conta_ativa', contaAtiva);

    const p1Padrao = contaAtiva === 'vitoria' ? 'Vitória' : 'Juan';
    const p2Padrao = contaAtiva === 'vitoria' ? 'Parceiro(a)' : 'Noiva';

    setPessoa1(localStorage.getItem(`${prefixoStorage}:pessoa1`) || p1Padrao);
    setPessoa2(localStorage.getItem(`${prefixoStorage}:pessoa2`) || p2Padrao);
    setFiltroPessoaGlobal('Todos');
    setModoSelecao(false);
    setIdsSelecionados([]);

    try {
      const trSalvas = localStorage.getItem(`${prefixoStorage}:transacoes`);
      setTransacoes(trSalvas ? JSON.parse(trSalvas) : []);

      const enxSalvo = localStorage.getItem(`${prefixoStorage}:enxoval`);
      setItensEnxoval(enxSalvo ? JSON.parse(enxSalvo) : []);

      const obsSalvas = localStorage.getItem(`${prefixoStorage}:observacoes`);
      setObservacoesMes(obsSalvas ? JSON.parse(obsSalvas) : []);

      const orcSalvos = localStorage.getItem(`${prefixoStorage}:orcamentos`);
      setOrcamentos(orcSalvos ? JSON.parse(orcSalvos) : ORCAMENTOS_INICIAIS);

      const saldosSalvos = localStorage.getItem(`financas_saldos_fim_mes_v2_${contaAtiva}`);
      setSaldosFimMes(saldosSalvos ? JSON.parse(saldosSalvos) : []);
    } catch {
      setTransacoes([]);
    }
  }, [contaAtiva, prefixoStorage]);

  // --- SINCRONIZAÇÃO COM SUPABASE POR CONTA ---
  const carregarDadosNuvem = async () => {
    if (!supabase || !contaAtiva) return;
    setSincronizando(true);

    try {
      const filtroConta =
        contaAtiva === 'casal'
          ? 'conta_id.eq.casal,conta_id.is.null'
          : 'conta_id.eq.vitoria';

      const { data: transData, error: transError } = await supabase
        .from('transacoes')
        .select('*')
        .or(filtroConta)
        .order('data', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(3000);

      if (transError) {
        setErroNuvem(`Aviso de sincronização: ${transError.message}`);
        setSincronizando(false);
        return;
      }

      setErroNuvem(null);

      if (transData) {
        const daNuvem: Transaction[] = transData.map((row: any) => ({
          id: String(row.id),
          tipo: row.tipo,
          valor: Number(row.valor),
          data: row.data,
          local: row.local,
          categoria: row.categoria,
          tags: Array.isArray(row.tags) ? row.tags : [],
          metodoPagamento: row.metodo_pagamento,
          parcelaInfo: row.parcela_info || undefined,
          responsavel: row.responsavel,
          pendenteSync: false,
        }));
        setTransacoes(daNuvem);
      }

      const { data: enxovalData } = await supabase
        .from('enxoval')
        .select('*')
        .or(filtroConta)
        .order('comodo', { ascending: true })
        .limit(3000);

      if (enxovalData) {
        setItensEnxoval(
          enxovalData.map((row: any) => ({
            id: String(row.id),
            comodo: row.comodo || 'Outros',
            item: row.item,
            quantidade: Number(row.quantidade) || 1,
            valor: Number(row.valor) || 0,
            prioridade: row.prioridade || 'Média',
            observacao: row.observacao || '',
            comprado: Boolean(row.comprado),
          }))
        );
      }

      const { data: obsData } = await supabase
        .from('observacoes_mes')
        .select('*')
        .or(filtroConta)
        .order('created_at', { ascending: false })
        .limit(1000);

      if (obsData) {
        setObservacoesMes(
          obsData.map((row: any) => ({
            id: String(row.id),
            mes: row.mes,
            autor: row.autor,
            titulo: row.titulo,
            texto: row.texto,
            valor: row.valor ? Number(row.valor) : undefined,
            resolvido: Boolean(row.resolvido),
            dataCriacao: row.data_criacao,
          }))
        );
      }

      const { data: configData } = await supabase
        .from('config_casal')
        .select('*')
        .eq('id', idConfigBanco)
        .single();

      if (configData) {
        if (configData.meta_poupanca) setMetaPoupanca(Number(configData.meta_poupanca));
        if (configData.pessoa1) setPessoa1(configData.pessoa1);
        if (configData.pessoa2) setPessoa2(configData.pessoa2);
        if (Array.isArray(configData.orcamentos) && configData.orcamentos.length > 0) {
          setOrcamentos(configData.orcamentos);
        }
      }

      const { data: saldosData } = await supabase
        .from('saldos_fim_mes')
        .select('*')
        .eq('conta_id', contaAtiva);

      if (saldosData) {
        const saldosFormatados: SaldoFinalBancoMes[] = saldosData.map((row: any) => ({
          id: String(row.id),
          conta_id: String(row.conta_id),
          mes: String(row.mes),
          banco: String(row.banco),
          responsavel: String(row.responsavel),
          dataUltimoDia: String(row.data_ultimo_dia),
          saldoFinal: Number(row.saldo_final),
        }));
        setSaldosFimMes(saldosFormatados);
        localStorage.setItem(
          `financas_saldos_fim_mes_v2_${contaAtiva}`,
          JSON.stringify(saldosFormatados)
        );
      }
    } catch {
      setErroNuvem('Sem conexão no momento. Seus dados estão salvos no aparelho.');
    } finally {
      setSincronizando(false);
    }
  };

  useEffect(() => {
    if (!supabase || !contaAtiva) return;
    carregarDadosNuvem();

    const canal = supabase
      .channel(`realtime-${contaAtiva}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transacoes' }, () => {
        carregarDadosNuvem();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enxoval' }, () => {
        carregarDadosNuvem();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'observacoes_mes' }, () => {
        carregarDadosNuvem();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'config_casal' }, () => {
        carregarDadosNuvem();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'saldos_fim_mes' }, () => {
        carregarDadosNuvem();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, [contaAtiva]);

  useEffect(() => {
    if (!contaAtiva) return;
    localStorage.setItem(`${prefixoStorage}:transacoes`, JSON.stringify(transacoes));
  }, [transacoes, contaAtiva, prefixoStorage]);

  useEffect(() => {
    if (!contaAtiva) return;
    localStorage.setItem(`${prefixoStorage}:enxoval`, JSON.stringify(itensEnxoval));
  }, [itensEnxoval, contaAtiva, prefixoStorage]);

  useEffect(() => {
    if (!contaAtiva) return;
    localStorage.setItem(`${prefixoStorage}:observacoes`, JSON.stringify(observacoesMes));
  }, [observacoesMes, contaAtiva, prefixoStorage]);

  useEffect(() => {
    if (!contaAtiva) return;
    localStorage.setItem(`${prefixoStorage}:orcamentos`, JSON.stringify(orcamentos));
  }, [orcamentos, contaAtiva, prefixoStorage]);

  useEffect(() => {
    if (!contaAtiva) return;
    localStorage.setItem(`${prefixoStorage}:pessoa1`, pessoa1);
    localStorage.setItem(`${prefixoStorage}:pessoa2`, pessoa2);
  }, [pessoa1, pessoa2, contaAtiva, prefixoStorage]);

  const mudarMes = (direcao: number) => {
    const [ano, mes] = mesSelecionado.split('-').map(Number);
    const novaData = new Date(ano, mes - 1 + direcao, 1);
    setMesSelecionado(
      `${novaData.getFullYear()}-${String(novaData.getMonth() + 1).padStart(2, '0')}`
    );
    setIdsSelecionados([]);
  };

  // --- CÁLCULOS FINANCEIROS (IGNORA MOVIMENTAÇÕES INTERNAS NO SALDO) ---
  const transacoesDoMes = useMemo(() => {
    return transacoes
      .filter((t) => t.data.startsWith(mesSelecionado))
      .filter((t) => filtroPessoaGlobal === 'Todos' || t.responsavel === filtroPessoaGlobal)
      .sort((a, b) => b.data.localeCompare(a.data));
  }, [transacoes, mesSelecionado, filtroPessoaGlobal]);

  const saldosFimMesAtual = useMemo(() => {
    return saldosFimMes
      .filter((s) => s.mes === mesSelecionado)
      .filter((s) => filtroPessoaGlobal === 'Todos' || s.responsavel === filtroPessoaGlobal);
  }, [saldosFimMes, mesSelecionado, filtroPessoaGlobal]);

  const resumoMes = useMemo(() => {
    let receitas = 0;
    let despesas = 0;
    let poupadoMes = 0;
    let resgatadoMes = 0;

    transacoesDoMes.forEach((t) => {
      if (t.tipo === 'receita') receitas += t.valor;
      if (t.tipo === 'despesa') despesas += t.valor;
      if (t.tipo === 'poupanca') poupadoMes += t.valor;
      if (t.tipo === 'resgate_poupanca') resgatadoMes += t.valor;
      // Nota: 'transferencia_interna' não soma nem subtrai do saldo!
    });

    return {
      receitas,
      despesas,
      poupadoMes,
      resgatadoMes,
      saldoLivre: receitas + resgatadoMes - despesas - poupadoMes,
    };
  }, [transacoesDoMes]);

  const resumoPorPessoa = useMemo(() => {
    const todasDoMes = transacoes.filter((t) => t.data.startsWith(mesSelecionado));
    const calc = (nome: string, tipo: TransactionType) =>
      todasDoMes
        .filter((t) => t.responsavel === nome && t.tipo === tipo)
        .reduce((acc, t) => acc + t.valor, 0);

    return {
      p1Gastos: calc(pessoa1, 'despesa'),
      p2Gastos: calc(pessoa2, 'despesa'),
      casalGastos: calc('Casal', 'despesa'),
      p1Poupanca: calc(pessoa1, 'poupanca') - calc(pessoa1, 'resgate_poupanca'),
      p2Poupanca: calc(pessoa2, 'poupanca') - calc(pessoa2, 'resgate_poupanca'),
      casalPoupanca: calc('Casal', 'poupanca') - calc('Casal', 'resgate_poupanca'),
    };
  }, [transacoes, mesSelecionado, pessoa1, pessoa2]);

  const dadosPoupancaGlobal = useMemo(() => {
    const filtradas = transacoes.filter(
      (t) => filtroPessoaGlobal === 'Todos' || t.responsavel === filtroPessoaGlobal
    );

    const totalGuardado = filtradas
      .filter((t) => t.tipo === 'poupanca')
      .reduce((acc, t) => acc + t.valor, 0);

    const totalRetirado = filtradas
      .filter((t) => t.tipo === 'resgate_poupanca')
      .reduce((acc, t) => acc + t.valor, 0);

    const historicoMovimentacoes = filtradas
      .filter((t) => t.tipo === 'poupanca' || t.tipo === 'resgate_poupanca')
      .sort((a, b) => b.data.localeCompare(a.data));

    return {
      saldoAtual: totalGuardado - totalRetirado,
      totalGuardado,
      totalRetirado,
      historicoMovimentacoes,
    };
  }, [transacoes, filtroPessoaGlobal]);

  // --- BÔNUS: DETECTOR DE CONTAS FIXAS DO MÊS PASSADO AINDA NÃO LANÇADAS ---
  const contasFixasMesAnteriorPendentes = useMemo(() => {
    const [ano, mes] = mesSelecionado.split('-').map(Number);
    const dAnt = new Date(ano, mes - 2, 1);
    const mesAntStr = `${dAnt.getFullYear()}-${String(dAnt.getMonth() + 1).padStart(2, '0')}`;

    const fixasAnterior = transacoes.filter(
      (t) =>
        t.data.startsWith(mesAntStr) &&
        t.tipo === 'despesa' &&
        t.categoria === 'Contas Fixas' &&
        !t.parcelaInfo
    );

    const nomesJaNoMesAtual = new Set(
      transacoes
        .filter((t) => t.data.startsWith(mesSelecionado) && t.tipo === 'despesa')
        .map((t) => normalizarTextoBusca(t.local))
    );

    return fixasAnterior.filter((t) => !nomesJaNoMesAtual.has(normalizarTextoBusca(t.local)));
  }, [transacoes, mesSelecionado]);

  const handleRepetirContasFixas = async () => {
    if (contasFixasMesAnteriorPendentes.length === 0) return;

    const [ano, mes] = mesSelecionado.split('-').map(Number);
    const ultimoDiaMes = new Date(ano, mes, 0).getDate();

    const novas: Transaction[] = contasFixasMesAnteriorPendentes.map((t, idx) => {
      const diaOrig = Math.min(ultimoDiaMes, parseInt(t.data.slice(8, 10), 10) || 5);
      const novaData = `${mesSelecionado}-${String(diaOrig).padStart(2, '0')}`;
      return {
        ...t,
        id: `${contaAtiva}-fixa-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        data: novaData,
        pendenteSync: false,
      };
    });

    setTransacoes((prev) => [...novas, ...prev]);

    if (supabase) {
      const payload = novas.map((t) => ({
        id: t.id,
        tipo: t.tipo,
        valor: t.valor,
        data: t.data,
        local: t.local,
        categoria: t.categoria,
        tags: t.tags,
        metodo_pagamento: t.metodoPagamento,
        parcela_info: null,
        responsavel: t.responsavel,
        conta_id: contaAtiva,
      }));
      await supabase.from('transacoes').upsert(payload);
    }
  };

  // --- SALVAR METAS DE GASTOS DO MÊS (ORÇAMENTOS) ---
  const abrirEdicaoOrcamentos = () => {
    const mapa: Record<string, string> = {};
    orcamentos.forEach((o) => {
      mapa[o.categoria] = String(o.limite);
    });
    setOrcamentosTemp(mapa);
    setEditandoOrcamentos(true);
  };

  const salvarOrcamentos = async () => {
    const novosOrcamentos: CategoryBudget[] = orcamentos.map((o) => {
      const digitado = orcamentosTemp[o.categoria] ?? String(o.limite);
      const valLimpo = digitado.replace(',', '.');
      const num = parseFloat(valLimpo);
      return {
        categoria: o.categoria,
        limite: !isNaN(num) && num >= 0 ? num : o.limite,
      };
    });

    setOrcamentos(novosOrcamentos);
    setEditandoOrcamentos(false);

    if (supabase) {
      await supabase.from('config_casal').upsert({
        id: idConfigBanco,
        meta_poupanca: metaPoupanca,
        pessoa1,
        pessoa2,
        orcamentos: novosOrcamentos,
      });
    }
  };

  // --- IMPORTAÇÃO DE EXTRATOS BANCÁRIOS (.CSV, .OFX, .TXT, .PDF) ---
  const handleImportarExtratoBancario = async (novosLancamentos: Transaction[]) => {
    const comConta = novosLancamentos.map((t) => ({
      ...t,
      id: t.id.startsWith(`${contaAtiva}-`) ? t.id : `${contaAtiva}-${t.id}`,
    }));

    setTransacoes((prev) => [...comConta, ...prev]);

    if (comConta.length > 0) {
      setMesSelecionado(comConta[0].data.slice(0, 7));
    }

    if (supabase) {
      const payload = comConta.map((t) => ({
        id: t.id,
        tipo: t.tipo,
        valor: t.valor,
        data: t.data,
        local: t.local,
        categoria: t.categoria,
        tags: t.tags,
        metodo_pagamento: t.metodoPagamento,
        parcela_info: t.parcelaInfo || null,
        responsavel: t.responsavel,
        conta_id: contaAtiva,
      }));
      await supabase.from('transacoes').upsert(payload);
    }
  };

  // --- AÇÕES DE TRANSAÇÃO ---
  const handleSalvarTransacao = async (dados: {
    id?: string;
    tipo: TransactionType;
    responsavel: string;
    valor: number;
    data: string;
    local: string;
    categoria: string;
    tags: string[];
    metodoPagamento: PaymentMethod;
    parcelas: number;
  }) => {
    setSalvando(true);

    if (dados.id) {
      const atualizada: Transaction = {
        id: dados.id,
        tipo: dados.tipo,
        valor: dados.valor,
        data: dados.data,
        local: dados.local,
        categoria: dados.categoria,
        tags: dados.tags,
        metodoPagamento: dados.metodoPagamento,
        responsavel: dados.responsavel,
        parcelaInfo: transacaoEditando?.parcelaInfo,
        pendenteSync: false,
      };

      setTransacoes((prev) => prev.map((t) => (t.id === dados.id ? atualizada : t)));

      if (supabase) {
        await supabase.from('transacoes').upsert({
          id: atualizada.id,
          tipo: atualizada.tipo,
          valor: atualizada.valor,
          data: atualizada.data,
          local: atualizada.local,
          categoria: atualizada.categoria,
          tags: atualizada.tags,
          metodo_pagamento: atualizada.metodoPagamento,
          parcela_info: atualizada.parcelaInfo || null,
          responsavel: atualizada.responsavel,
          conta_id: contaAtiva,
        });
      }

      setSalvando(false);
      setTransacaoEditando(null);
      setModalAberto(false);
      return;
    }

    const novasTransacoes: Transaction[] = [];
    const numParcelas =
      dados.tipo === 'despesa' && dados.metodoPagamento === 'Cartão de Crédito'
        ? Math.max(1, dados.parcelas)
        : 1;
    const valorParcela = Number((dados.valor / numParcelas).toFixed(2));
    const [anoBase, mesBase, diaBase] = dados.data.split('-').map(Number);
    const sufixoAleatorio = Math.random().toString(36).substring(2, 7);

    for (let i = 0; i < numParcelas; i++) {
      const dataParcela = new Date(anoBase, mesBase - 1 + i, diaBase);
      const dataStr = `${dataParcela.getFullYear()}-${String(dataParcela.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(dataParcela.getDate()).padStart(2, '0')}`;

      novasTransacoes.push({
        id: `${contaAtiva}-${Date.now()}-${sufixoAleatorio}-${i}`,
        tipo: dados.tipo,
        valor: valorParcela,
        data: dataStr,
        local: dados.local,
        categoria: dados.categoria,
        tags: dados.tags,
        metodoPagamento: dados.metodoPagamento,
        parcelaInfo: numParcelas > 1 ? `${i + 1}/${numParcelas}` : undefined,
        responsavel: dados.responsavel,
        pendenteSync: false,
      });
    }

    setTransacoes((prev) => [...novasTransacoes, ...prev]);

    const mesDoLancamento = dados.data.slice(0, 7);
    if (mesDoLancamento !== mesSelecionado) {
      setMesSelecionado(mesDoLancamento);
    }

    if (supabase) {
      const payload = novasTransacoes.map((t) => ({
        id: t.id,
        tipo: t.tipo,
        valor: t.valor,
        data: t.data,
        local: t.local,
        categoria: t.categoria,
        tags: t.tags,
        metodo_pagamento: t.metodoPagamento,
        parcela_info: t.parcelaInfo || null,
        responsavel: t.responsavel,
        conta_id: contaAtiva,
      }));

      const { error } = await supabase.from('transacoes').upsert(payload);
      if (error) {
        setErroNuvem(`Salvo no aparelho, mas falhou na nuvem (${error.message}).`);
      }
    }

    setSalvando(false);
    setModalAberto(false);
  };

  const handleExcluir = async (id: string) => {
    setTransacoes((prev) => prev.filter((t) => t.id !== id));
    setIdsSelecionados((prev) => prev.filter((item) => item !== id));
    if (supabase) {
      await supabase.from('transacoes').delete().eq('id', id);
    }
  };

  // --- AÇÕES EM LOTE NO EXTRATO ---
  const alternarSelecaoItem = (id: string) => {
    setIdsSelecionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleExcluirSelecionados = async () => {
    if (idsSelecionados.length === 0) return;
    const paraRemover = new Set(idsSelecionados);
    setTransacoes((prev) => prev.filter((t) => !paraRemover.has(t.id)));
    if (supabase) {
      await supabase.from('transacoes').delete().in('id', idsSelecionados);
    }
    setIdsSelecionados([]);
    setConfirmandoExclusaoLote(false);
    setModoSelecao(false);
  };

  const handleAlterarLote = async (campos: Partial<Pick<Transaction, 'categoria' | 'responsavel'>>) => {
    if (idsSelecionados.length === 0) return;
    const conjunto = new Set(idsSelecionados);
    const atualizadas: Transaction[] = [];

    setTransacoes((prev) =>
      prev.map((t) => {
        if (!conjunto.has(t.id)) return t;
        const mod = { ...t, ...campos };
        atualizadas.push(mod);
        return mod;
      })
    );

    if (supabase && atualizadas.length > 0) {
      const payload = atualizadas.map((t) => ({
        id: t.id,
        tipo: t.tipo,
        valor: t.valor,
        data: t.data,
        local: t.local,
        categoria: t.categoria,
        tags: t.tags,
        metodo_pagamento: t.metodoPagamento,
        parcela_info: t.parcelaInfo || null,
        responsavel: t.responsavel,
        conta_id: contaAtiva,
      }));
      await supabase.from('transacoes').upsert(payload);
    }

    setIdsSelecionados([]);
    setModoSelecao(false);
  };

  const handleAbrirEditarTransacao = (t: Transaction) => {
    setTransacaoEditando(t);
    setModalAberto(true);
  };

  // --- AÇÕES DO ENXOVAL ---
  const handleSalvarItemEnxoval = async (item: EnxovalItem) => {
    const jaExiste = itensEnxoval.some((i) => i.id === item.id);
    const idSeguro =
      !jaExiste && contaAtiva && !item.id.startsWith(`${contaAtiva}-`)
        ? `${contaAtiva}-${item.id}`
        : item.id;
    const itemFinal = { ...item, id: idSeguro };

    setItensEnxoval((prev) => {
      const existe = prev.some((i) => i.id === itemFinal.id);
      return existe ? prev.map((i) => (i.id === itemFinal.id ? itemFinal : i)) : [itemFinal, ...prev];
    });

    if (supabase) {
      const { error } = await supabase.from('enxoval').upsert({
        id: itemFinal.id,
        comodo: itemFinal.comodo,
        item: itemFinal.item,
        quantidade: itemFinal.quantidade,
        valor: itemFinal.valor,
        prioridade: itemFinal.prioridade,
        observacao: itemFinal.observacao,
        comprado: itemFinal.comprado,
        conta_id: contaAtiva,
      });
      if (error) {
        // Caso a coluna id no banco não aceite prefixo texto ou ocorra conflito, tenta atualizar pelo id original
        await supabase
          .from('enxoval')
          .update({
            comodo: itemFinal.comodo,
            item: itemFinal.item,
            quantidade: itemFinal.quantidade,
            valor: itemFinal.valor,
            prioridade: itemFinal.prioridade,
            observacao: itemFinal.observacao,
            comprado: itemFinal.comprado,
          })
          .eq('id', item.id);
      }
    }
  };

  const handleAlternarCompradoEnxoval = async (item: EnxovalItem) => {
    const atualizado = { ...item, comprado: !item.comprado };
    await handleSalvarItemEnxoval(atualizado);
  };

  const handleExcluirItemEnxoval = async (id: string) => {
    setItensEnxoval((prev) => prev.filter((i) => i.id !== id));
    if (supabase) {
      await supabase.from('enxoval').delete().eq('id', id);
    }
  };

  // --- AÇÕES DAS OBSERVAÇÕES DO MÊS ---
  const handleSalvarObservacao = async (obs: ObservacaoMes) => {
    const jaExiste = observacoesMes.some((o) => o.id === obs.id);
    const idSeguro =
      !jaExiste && contaAtiva && !obs.id.startsWith(`${contaAtiva}-`)
        ? `${contaAtiva}-${obs.id}`
        : obs.id;
    const obsFinal = { ...obs, id: idSeguro };

    setObservacoesMes((prev) => {
      const existe = prev.some((o) => o.id === obsFinal.id);
      return existe ? prev.map((o) => (o.id === obsFinal.id ? obsFinal : o)) : [obsFinal, ...prev];
    });

    if (supabase) {
      await supabase.from('observacoes_mes').upsert({
        id: obsFinal.id,
        mes: obsFinal.mes,
        autor: obsFinal.autor,
        titulo: obsFinal.titulo,
        texto: obsFinal.texto,
        valor: obsFinal.valor || 0,
        resolvido: obsFinal.resolvido,
        data_criacao: obsFinal.dataCriacao,
        conta_id: contaAtiva,
      });
    }
  };

  const handleAlternarResolvidoObs = async (obs: ObservacaoMes) => {
    const atualizada = { ...obs, resolvido: !obs.resolvido };
    await handleSalvarObservacao(atualizada);
  };

  const handleExcluirObservacao = async (id: string) => {
    setObservacoesMes((prev) => prev.filter((o) => o.id !== id));
    if (supabase) {
      await supabase.from('observacoes_mes').delete().eq('id', id);
    }
  };

  const salvarConfigCasal = async (
    novaMeta?: number,
    nP1?: string,
    nP2?: string,
    novaSenha?: string
  ) => {
    const metaFinal = novaMeta ?? metaPoupanca;
    const p1Final = (nP1 ?? pessoa1).trim() || 'Juan';
    const p2Final = (nP2 ?? pessoa2).trim() || 'Noiva';

    setPessoa1(p1Final);
    setPessoa2(p2Final);
    setFiltroPessoaGlobal('Todos');

    if (novaSenha && contaAtiva) {
      localStorage.setItem(`@financas:senha_${contaAtiva}`, novaSenha);
    }

    if (supabase) {
      const payload: any = {
        id: idConfigBanco,
        meta_poupanca: metaFinal,
        pessoa1: p1Final,
        pessoa2: p2Final,
        orcamentos,
      };
      if (novaSenha) {
        payload.senha = novaSenha;
      }
      await supabase.from('config_casal').upsert(payload);
    }
  };

  const handleTrocarUsuario = () => {
    localStorage.removeItem('@financas:conta_ativa');
    setContaAtiva(null);
  };

  const transacoesFiltradas = useMemo(() => {
    return transacoesDoMes.filter((t) => {
      const bateTipo = filtroTipo === 'todos' || t.tipo === filtroTipo;
      const bateCat = filtroCategoria === 'todas' || t.categoria === filtroCategoria;
      const bateMetodo = filtroMetodo === 'todos' || t.metodoPagamento === filtroMetodo;
      const termo = busca.toLowerCase();
      const bateBusca =
        t.local.toLowerCase().includes(termo) ||
        t.categoria.toLowerCase().includes(termo) ||
        t.responsavel.toLowerCase().includes(termo) ||
        t.tags.some((tag) => tag.toLowerCase().includes(termo));
      return bateTipo && bateCat && bateMetodo && bateBusca;
    });
  }, [transacoesDoMes, filtroTipo, filtroCategoria, filtroMetodo, busca]);

  const resumoFiltradoExtrato = useMemo(() => {
    let entradas = 0;
    let gastos = 0;
    let poupanca = 0;
    transacoesFiltradas.forEach((t) => {
      if (t.tipo === 'receita') entradas += t.valor;
      if (t.tipo === 'despesa') gastos += t.valor;
      if (t.tipo === 'poupanca') poupanca += t.valor;
    });
    return { entradas, gastos, poupanca, saldo: entradas - gastos - poupanca };
  }, [transacoesFiltradas]);

  // SE NÃO ESTIVER LOGADO, EXIBE A TELA DE VERIFICAÇÃO DE USUÁRIO
  if (!contaAtiva) {
    return (
      <TelaLogin
        onEntrar={(conta) => setContaAtiva(conta)}
        tema={tema}
        onAlternarTema={alternarTema}
      />
    );
  }

  const qtdObsDoMes = observacoesMes.filter((o) => o.mes === mesSelecionado).length;
  const mesAtual = obterMesAtualLocal();

  const itensMenu = [
    { id: 'home' as ActiveTab, label: 'Início', shortLabel: 'Início', icone: Home },
    { id: 'extrato' as ActiveTab, label: 'Extrato', shortLabel: 'Extrato', icone: List },
    {
      id: 'observacoes' as ActiveTab,
      label: 'Notas do Mês',
      shortLabel: 'Notas',
      icone: FileText,
      badge: qtdObsDoMes,
    },
    { id: 'enxoval' as ActiveTab, label: 'Enxoval Casa', shortLabel: 'Enxoval', icone: Package },
    { id: 'metas' as ActiveTab, label: 'Poupança & Metas', shortLabel: 'Poupança', icone: Target },
    { id: 'graficos' as ActiveTab, label: 'Análise', shortLabel: 'Análise', icone: PieChartIcon },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row font-sans selection:bg-emerald-500 selection:text-zinc-950 overflow-x-hidden w-full">
      {/* ==================== SIDEBAR DESKTOP (PC) ==================== */}
      <aside className="hidden md:flex md:w-64 lg:w-72 md:flex-col md:fixed md:inset-y-0 bg-zinc-900/60 border-r border-zinc-800/80 p-5 justify-between z-30">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Wallet size={20} />
              </div>
              <div>
                <span className="font-bold tracking-tight text-base text-white block leading-none">
                  NossoFinanceiro
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">
                  Conta: {contaAtiva === 'vitoria' ? 'Vitória' : `${pessoa1} & ${pessoa2}`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={alternarTema}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 transition cursor-pointer"
                title={tema === 'claro' ? 'Ativar Tema Escuro' : 'Ativar Tema Claro'}
              >
                {tema === 'claro' ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              <button
                onClick={() => setModalConfigAberto(true)}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
                title="Configurar nomes"
              >
                <Settings size={16} />
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setTransacaoEditando(null);
              setTipoInicialModal('despesa');
              setModalAberto(true);
            }}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 px-4 rounded-xl text-sm shadow-lg shadow-emerald-500/15 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Plus size={18} strokeWidth={2.5} />
            Novo Lançamento
          </button>

          <nav className="space-y-1.5">
            {itensMenu.map((item) => {
              const Icone = item.icone;
              const ativo = abaAtiva === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAbaAtiva(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    ativo
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icone size={18} />
                    <span>{item.label}</span>
                  </span>
                  {item.badge ? (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-zinc-800/80 space-y-2">
          <button
            onClick={carregarDadosNuvem}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 hover:border-zinc-700 transition cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <RefreshCw
                size={13}
                className={sincronizando ? 'animate-spin text-emerald-400' : 'text-emerald-400'}
              />
              {sincronizando ? 'Sincronizando...' : 'Sincronizado na Nuvem'}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </button>

          <button
            onClick={handleTrocarUsuario}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-rose-950/40 border border-zinc-800 hover:border-rose-800/50 text-xs text-zinc-400 hover:text-rose-300 transition cursor-pointer"
          >
            <LogOut size={13} />
            Trocar Usuário ({contaAtiva === 'vitoria' ? 'Vitória' : 'Casal'})
          </button>
        </div>
      </aside>

      {/* ==================== ÁREA PRINCIPAL ==================== */}
      <div className="flex-1 md:pl-64 lg:pl-72 flex flex-col min-h-screen pb-28 md:pb-10 w-full overflow-x-hidden">
        {/* HEADER RESPONSIVO */}
        <header className="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-8 py-3 w-full">
          <div className="max-w-6xl mx-auto flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:hidden">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Wallet size={17} />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold tracking-tight text-sm text-zinc-100">
                    {contaAtiva === 'vitoria' ? 'Finanças Vitória' : 'NossoFinanceiro'}
                  </span>
                  <button
                    onClick={carregarDadosNuvem}
                    className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400"
                  >
                    <RefreshCw size={10} className={sincronizando ? 'animate-spin' : ''} />
                    {sincronizando ? 'Sync...' : 'Online'}
                  </button>
                </div>
              </div>

              <div className="hidden md:block">
                <h1 className="text-lg font-bold text-white">
                  {itensMenu.find((i) => i.id === abaAtiva)?.label}
                </h1>
              </div>

              <div className="flex items-center gap-1.5 ml-auto shrink-0">
                {abaAtiva !== 'enxoval' && (
                  <div className="flex items-center gap-1.5">
                    {mesSelecionado !== mesAtual && (
                      <button
                        onClick={() => setMesSelecionado(mesAtual)}
                        className="text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full hover:bg-emerald-500/25 transition cursor-pointer"
                        title="Voltar para o mês atual"
                      >
                        Mês Atual
                      </button>
                    )}
                    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-1.5 py-1">
                      <button
                        onClick={() => mudarMes(-1)}
                        className="p-1 text-zinc-400 hover:text-white transition cursor-pointer"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <span className="text-xs md:text-sm font-medium px-1.5 min-w-[100px] md:min-w-[140px] text-center truncate">
                        {nomeMesAno(mesSelecionado)}
                      </span>
                      <button
                        onClick={() => mudarMes(1)}
                        className="p-1 text-zinc-400 hover:text-white transition cursor-pointer"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={alternarTema}
                  className="md:hidden p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 shrink-0 cursor-pointer"
                  title={tema === 'claro' ? 'Ativar Tema Escuro' : 'Ativar Tema Claro'}
                >
                  {tema === 'claro' ? <Moon size={15} /> : <Sun size={15} />}
                </button>

                <button
                  onClick={() => setModalConfigAberto(true)}
                  className="md:hidden p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white shrink-0 cursor-pointer"
                  title="Configurar Nomes"
                >
                  <Settings size={15} />
                </button>

                <button
                  onClick={handleTrocarUsuario}
                  className="md:hidden p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 shrink-0 cursor-pointer"
                  title="Trocar Usuário"
                >
                  <LogOut size={15} />
                </button>
              </div>
            </div>

            {erroNuvem && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-1.5 text-xs text-amber-300 flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <AlertCircle size={14} className="shrink-0" /> {erroNuvem}
                </span>
                <button
                  onClick={carregarDadosNuvem}
                  className="underline font-semibold shrink-0 text-amber-200 cursor-pointer"
                >
                  Reenviar
                </button>
              </div>
            )}

            {abaAtiva !== 'enxoval' && abaAtiva !== 'observacoes' && (
              <div className="grid grid-cols-4 gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800/80 w-full">
                {(['Todos', pessoa1, pessoa2, 'Casal'] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFiltroPessoaGlobal(item)}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition truncate px-1 text-center cursor-pointer ${
                      filtroPessoaGlobal === item
                        ? 'bg-emerald-500 text-zinc-950 shadow'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {item === 'Todos' ? 'Visão Geral' : item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* CONTEÚDO CENTRAL */}
        <main className="flex-1 px-4 md:px-8 py-5 max-w-6xl w-full mx-auto space-y-6">
          {/* ABA 1: HOME */}
          {abaAtiva === 'home' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-7 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/40 border border-zinc-800 rounded-2xl p-5 md:p-6 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                        Saldo Livre ({filtroPessoaGlobal === 'Todos' ? 'Total' : filtroPessoaGlobal})
                      </p>
                      <Users size={16} className="text-emerald-400" />
                    </div>
                    <h2
                      className={`text-3xl md:text-4xl font-extrabold mt-1 ${
                        resumoMes.saldoLivre >= 0 ? 'text-white' : 'text-rose-400'
                      }`}
                    >
                      {formatarMoeda(resumoMes.saldoLivre)}
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-zinc-800/80">
                    <div className="bg-zinc-950/60 p-2.5 md:p-3 rounded-xl border border-zinc-800/60">
                      <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                        <TrendingUp size={13} />
                        <span>Entradas</span>
                      </div>
                      <p className="text-xs md:text-base font-bold mt-1 text-zinc-100 truncate">
                        {formatarMoeda(resumoMes.receitas)}
                      </p>
                    </div>

                    <div className="bg-zinc-950/60 p-2.5 md:p-3 rounded-xl border border-zinc-800/60">
                      <div className="flex items-center gap-1 text-rose-400 text-xs font-medium">
                        <TrendingDown size={13} />
                        <span>Gastos</span>
                      </div>
                      <p className="text-xs md:text-base font-bold mt-1 text-zinc-100 truncate">
                        {formatarMoeda(resumoMes.despesas)}
                      </p>
                    </div>

                    <div className="bg-zinc-950/60 p-2.5 md:p-3 rounded-xl border border-zinc-800/60">
                      <div className="flex items-center gap-1 text-sky-400 text-xs font-medium">
                        <PiggyBank size={13} />
                        <span>Guardado</span>
                      </div>
                      <p className="text-xs md:text-base font-bold mt-1 text-zinc-100 truncate">
                        {formatarMoeda(resumoMes.poupadoMes)}
                      </p>
                    </div>
                  </div>

                  {saldosFimMesAtual.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-zinc-800/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
                        <Landmark size={14} className="text-emerald-400 shrink-0" />
                        Saldo real nos bancos (fim do mês):
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {saldosFimMesAtual.map((s) => (
                          <span
                            key={s.id}
                            className="bg-zinc-950/80 border border-zinc-800 px-2.5 py-1 rounded-lg text-[11px]"
                          >
                            {s.banco} ({s.dataUltimoDia.slice(8, 10)}/{s.dataUltimoDia.slice(5, 7)}):{' '}
                            <strong
                              className={s.saldoFinal >= 0 ? 'text-emerald-400' : 'text-rose-400'}
                            >
                              {formatarMoeda(s.saldoFinal)}
                            </strong>
                          </span>
                        ))}
                        {saldosFimMesAtual.length > 1 && (
                          <span className="text-[11px] text-zinc-300 font-bold pl-1">
                            Total:{' '}
                            <span className="text-white">
                              {formatarMoeda(
                                saldosFimMesAtual.reduce((acc, s) => acc + s.saldoFinal, 0)
                              )}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Divisão de Gastos no Mês
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Comparativo de saídas por responsável
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-zinc-950/70 border border-zinc-800/70 rounded-xl p-2.5">
                      <span className="text-[11px] text-indigo-400 font-semibold block truncate">
                        {pessoa1}
                      </span>
                      <span className="text-xs md:text-sm font-bold text-zinc-100 mt-1 block truncate">
                        {formatarMoeda(resumoPorPessoa.p1Gastos)}
                      </span>
                    </div>
                    <div className="bg-zinc-950/70 border border-zinc-800/70 rounded-xl p-2.5">
                      <span className="text-[11px] text-pink-400 font-semibold block truncate">
                        {pessoa2}
                      </span>
                      <span className="text-xs md:text-sm font-bold text-zinc-100 mt-1 block truncate">
                        {formatarMoeda(resumoPorPessoa.p2Gastos)}
                      </span>
                    </div>
                    <div className="bg-zinc-950/70 border border-zinc-800/70 rounded-xl p-2.5">
                      <span className="text-[11px] text-amber-400 font-semibold block truncate">
                        Casal
                      </span>
                      <span className="text-xs md:text-sm font-bold text-zinc-100 mt-1 block truncate">
                        {formatarMoeda(resumoPorPessoa.casalGastos)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div
                      onClick={() => setAbaAtiva('metas')}
                      className="bg-sky-950/25 border border-sky-900/40 rounded-xl p-2.5 flex flex-col justify-between cursor-pointer hover:bg-sky-950/40 transition"
                    >
                      <span className="text-[11px] text-sky-300 flex items-center gap-1 font-medium">
                        <PiggyBank size={14} /> Poupança Atual
                      </span>
                      <strong className="text-xs md:text-sm text-white mt-1">
                        {formatarMoeda(dadosPoupancaGlobal.saldoAtual)}
                      </strong>
                    </div>

                    <div
                      onClick={() => setAbaAtiva('observacoes')}
                      className="bg-emerald-950/25 border border-emerald-900/40 rounded-xl p-2.5 flex flex-col justify-between cursor-pointer hover:bg-emerald-950/40 transition"
                    >
                      <span className="text-[11px] text-emerald-300 flex items-center gap-1 font-medium">
                        <FileText size={14} /> Notas do Mês
                      </span>
                      <strong className="text-xs md:text-sm text-white mt-1">
                        {qtdObsDoMes} anotação(ões)
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* BANNER BÔNUS: REPETIR CONTAS FIXAS DO MÊS ANTERIOR */}
              {contasFixasMesAnteriorPendentes.length > 0 && (
                <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs md:text-sm font-bold text-indigo-300 flex items-center gap-2">
                      <Repeat size={16} className="text-indigo-400 shrink-0" />
                      Encontramos {contasFixasMesAnteriorPendentes.length} Conta(s) Fixa(s) do mês passado ainda não lançada(s) em {nomeMesAno(mesSelecionado)}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-0.5 truncate max-w-2xl">
                      {contasFixasMesAnteriorPendentes.map((c) => c.local).join(', ')}
                    </p>
                  </div>
                  <button
                    onClick={handleRepetirContasFixas}
                    className="bg-indigo-500 hover:bg-indigo-400 text-zinc-950 font-bold px-3.5 py-2 rounded-xl text-xs shrink-0 transition cursor-pointer"
                  >
                    Repetir Contas Fixas ({contasFixasMesAnteriorPendentes.length})
                  </button>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm md:text-base font-semibold text-zinc-200">
                    Lançamentos do Mês ({transacoesDoMes.length})
                  </h2>
                  <button
                    onClick={() => setAbaAtiva('extrato')}
                    className="text-xs md:text-sm text-emerald-400 hover:underline cursor-pointer"
                  >
                    Pesquisar / Filtrar
                  </button>
                </div>

                {transacoesDoMes.length === 0 ? (
                  <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl">
                    <p className="text-sm text-zinc-400">Nenhum lançamento neste mês.</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Use o botão "+" para registrar ou importe extratos na aba Extrato.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {transacoesDoMes.map((t) => (
                      <CardTransacao
                        key={t.id}
                        transacao={t}
                        pessoa1={pessoa1}
                        onEditar={handleAbrirEditarTransacao}
                        onExcluir={handleExcluir}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ABA 2: EXTRATO */}
          {abaAtiva === 'extrato' && (
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">Extrato Compartilhado</h2>
                  <p className="text-xs text-zinc-400">
                    {transacoesFiltradas.length} registro(s) encontrado(s) em{' '}
                    {nomeMesAno(mesSelecionado)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <ExportadorRelatorio
                    mesSelecionado={mesSelecionado}
                    pessoa1={pessoa1}
                    pessoa2={pessoa2}
                    filtroPessoaGlobal={filtroPessoaGlobal}
                    transacoesMes={transacoesFiltradas}
                    orcamentos={orcamentos}
                    observacoesMes={observacoesMes}
                    saldosFimMes={saldosFimMesAtual}
                  />

                  <button
                    onClick={() => {
                      setModoSelecao(!modoSelecao);
                      setIdsSelecionados([]);
                      setConfirmandoExclusaoLote(false);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      modoSelecao
                        ? 'bg-zinc-100 text-zinc-950 border-white'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <CheckSquare size={14} />
                    {modoSelecao ? 'Sair da Seleção' : 'Selecionar Vários'}
                  </button>

                  <ImportadorExtratoBancario
                    mesSelecionado={mesSelecionado}
                    pessoa1={pessoa1}
                    pessoa2={pessoa2}
                    contaAtiva={contaAtiva}
                    transacoesExistentes={transacoes}
                    onImportarLancamentos={handleImportarExtratoBancario}
                    onSaldosAtualizados={carregarDadosNuvem}
                  />
                </div>
              </div>

              {/* BARRA DE AÇÕES EM LOTE QUANDO MODO SELEÇÃO ESTÁ ATIVO */}
              {modoSelecao && (
                <div className="bg-zinc-900 border border-emerald-500/40 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const todosIds = transacoesFiltradas.map((t) => t.id);
                        const todosMarcados =
                          todosIds.length > 0 &&
                          todosIds.every((id) => idsSelecionados.includes(id));
                        setIdsSelecionados(todosMarcados ? [] : todosIds);
                      }}
                      className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer"
                    >
                      {transacoesFiltradas.length > 0 &&
                      transacoesFiltradas.every((t) => idsSelecionados.includes(t.id))
                        ? 'Desmarcar todos'
                        : 'Selecionar todos visíveis'}
                    </button>
                    <span className="text-xs text-zinc-400">
                      <strong>{idsSelecionados.length}</strong> selecionado(s)
                    </span>
                  </div>

                  {idsSelecionados.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAlterarLote({ responsavel: e.target.value });
                            e.target.value = '';
                          }
                        }}
                        className="bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200"
                      >
                        <option value="" disabled>
                          Mudar pessoa...
                        </option>
                        {[pessoa1, pessoa2, 'Casal'].map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>

                      <select
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAlterarLote({ categoria: e.target.value });
                            e.target.value = '';
                          }
                        }}
                        className="bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200"
                      >
                        <option value="" disabled>
                          Mudar categoria...
                        </option>
                        {TODAS_CATEGORIAS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>

                      {confirmandoExclusaoLote ? (
                        <button
                          onClick={handleExcluirSelecionados}
                          className="bg-rose-500 hover:bg-rose-400 text-white px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                        >
                          Confirmar Exclusão ({idsSelecionados.length})
                        </button>
                      ) : (
                        <button
                          onClick={() => setConfirmandoExclusaoLote(true)}
                          className="bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={13} /> Excluir ({idsSelecionados.length})
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* FILTROS POR TIPO */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {(
                  [
                    { id: 'todos', label: 'Todos' },
                    { id: 'despesa', label: 'Despesas' },
                    { id: 'receita', label: 'Receitas' },
                    { id: 'transferencia_interna', label: 'Movimentações (⇄)' },
                    { id: 'poupanca', label: 'Guardado' },
                    { id: 'resgate_poupanca', label: 'Retiradas Poupança' },
                  ] as const
                ).map((tipo) => (
                  <button
                    key={tipo.id}
                    onClick={() => setFiltroTipo(tipo.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer shrink-0 ${
                      filtroTipo === tipo.id
                        ? 'bg-emerald-500 text-zinc-950 font-semibold'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    {tipo.label}
                  </button>
                ))}
              </div>

              {/* BUSCA + FILTROS RÁPIDOS DE CATEGORIA E MÉTODO */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                <div className="relative sm:col-span-6">
                  <Search size={16} className="absolute left-3.5 top-3 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Buscar local, pessoa, categoria ou #tag..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs md:text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="todas">Todas as Categorias</option>
                    {TODAS_CATEGORIAS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={filtroMetodo}
                    onChange={(e) => setFiltroMetodo(e.target.value as 'todos' | PaymentMethod)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs md:text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="todos">Todos os Métodos</option>
                    <option value="Pix/Débito">Pix / Débito</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Dinheiro">Dinheiro</option>
                  </select>
                </div>
              </div>

              {/* TOTALIZADOR DINÂMICO DO FILTRO ATUAL */}
              {transacoesFiltradas.length > 0 && (
                <div className="grid grid-cols-3 gap-2.5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Gastos no filtro</span>
                    <strong className="text-rose-400 text-xs md:text-sm">
                      {formatarMoeda(resumoFiltradoExtrato.gastos)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Entradas no filtro</span>
                    <strong className="text-emerald-400 text-xs md:text-sm">
                      {formatarMoeda(resumoFiltradoExtrato.entradas)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Balanço do filtro</span>
                    <strong
                      className={`text-xs md:text-sm ${
                        resumoFiltradoExtrato.saldo >= 0 ? 'text-zinc-100' : 'text-rose-400'
                      }`}
                    >
                      {formatarMoeda(resumoFiltradoExtrato.saldo)}
                    </strong>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {transacoesFiltradas.map((t) => (
                  <CardTransacao
                    key={t.id}
                    transacao={t}
                    pessoa1={pessoa1}
                    onEditar={handleAbrirEditarTransacao}
                    onExcluir={handleExcluir}
                    modoSelecao={modoSelecao}
                    selecionado={idsSelecionados.includes(t.id)}
                    onAlternarSelecao={alternarSelecaoItem}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ABA: OBSERVAÇÕES DO MÊS */}
          {abaAtiva === 'observacoes' && (
            <AbaObservacoes
              mesSelecionado={mesSelecionado}
              observacoes={observacoesMes}
              pessoa1={pessoa1}
              pessoa2={pessoa2}
              onSalvarObservacao={handleSalvarObservacao}
              onAlternarResolvido={handleAlternarResolvidoObs}
              onExcluirObservacao={handleExcluirObservacao}
            />
          )}

          {/* ABA: ENXOVAL DA CASA NOVA */}
          {abaAtiva === 'enxoval' && (
            <AbaEnxoval
              itens={itensEnxoval}
              onSalvarItem={handleSalvarItemEnxoval}
              onAlternarComprado={handleAlternarCompradoEnxoval}
              onExcluirItem={handleExcluirItemEnxoval}
            />
          )}

          {/* ABA 3: POUPANÇA & METAS DE GASTOS DO MÊS */}
          {abaAtiva === 'metas' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-gradient-to-br from-sky-950/50 to-zinc-900 border border-sky-900/50 rounded-2xl p-5 h-fit space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sky-400">
                      <PiggyBank size={20} />
                      <h2 className="font-bold text-sm uppercase tracking-wider">
                        Saldo Atual na Poupança
                      </h2>
                    </div>
                    <button
                      onClick={() => {
                        setNovaMetaInput(metaPoupanca.toString());
                        setEditandoMeta(!editandoMeta);
                      }}
                      className="text-xs text-sky-400 hover:underline cursor-pointer"
                    >
                      {editandoMeta ? 'Cancelar' : 'Editar Meta'}
                    </button>
                  </div>

                  <div>
                    <p className="text-3xl font-extrabold text-white">
                      {formatarMoeda(dadosPoupancaGlobal.saldoAtual)}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Meta: {formatarMoeda(metaPoupanca)} (
                      {Math.max(
                        0,
                        Math.min(
                          100,
                          Math.round((dadosPoupancaGlobal.saldoAtual / metaPoupanca) * 100)
                        )
                      )}
                      %)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => {
                        setTransacaoEditando(null);
                        setTipoInicialModal('poupanca');
                        setModalAberto(true);
                      }}
                      className="bg-sky-500 hover:bg-sky-400 text-zinc-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Plus size={15} strokeWidth={2.5} /> Guardar Valor
                    </button>

                    <button
                      onClick={() => {
                        setTransacaoEditando(null);
                        setTipoInicialModal('resgate_poupanca');
                        setModalAberto(true);
                      }}
                      className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <ArrowDownLeft size={15} /> Retirar Valor
                    </button>
                  </div>

                  {editandoMeta && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={novaMetaInput}
                        onChange={(e) => setNovaMetaInput(e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white"
                      />
                      <button
                        onClick={() => {
                          const val = Number(novaMetaInput);
                          if (val > 0) {
                            setMetaPoupanca(val);
                            salvarConfigCasal(val);
                          }
                          setEditandoMeta(false);
                        }}
                        className="bg-sky-500 text-zinc-950 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Check size={14} /> Salvar
                      </button>
                    </div>
                  )}

                  <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div
                      className="h-full bg-sky-400 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(100, (dadosPoupancaGlobal.saldoAtual / metaPoupanca) * 100)
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2.5">
                      <span className="text-zinc-400 block">Total Já Guardado</span>
                      <strong className="text-sky-300">
                        {formatarMoeda(dadosPoupancaGlobal.totalGuardado)}
                      </strong>
                    </div>
                    <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2.5">
                      <span className="text-zinc-400 block">Total Já Retirado</span>
                      <strong className="text-amber-400">
                        - {formatarMoeda(dadosPoupancaGlobal.totalRetirado)}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* TETO DE GASTOS MENSAL */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm md:text-base font-semibold text-zinc-200">
                          Meta / Teto de Gastos do Mês
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Defina quanto pretendem gastar em cada categoria por mês
                        </p>
                      </div>

                      {!editandoOrcamentos ? (
                        <button
                          onClick={abrirEdicaoOrcamentos}
                          className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                        >
                          <Pencil size={13} />
                          Alterar Metas do Mês
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditandoOrcamentos(false)}
                            className="text-xs text-zinc-400 hover:text-white px-2 py-1 cursor-pointer"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={salvarOrcamentos}
                            className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            <Check size={14} /> Salvar Metas
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {orcamentos.map((orc) => {
                        const gastoAtual = transacoesDoMes
                          .filter((t) => t.tipo === 'despesa' && t.categoria === orc.categoria)
                          .reduce((acc, t) => acc + t.valor, 0);
                        const pct =
                          orc.limite > 0
                            ? Math.min(100, Math.round((gastoAtual / orc.limite) * 100))
                            : 0;
                        const estourou = orc.limite > 0 && gastoAtual > orc.limite;

                        return (
                          <div
                            key={orc.categoria}
                            className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-4 space-y-2"
                          >
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-semibold text-zinc-200">{orc.categoria}</span>
                              {!editandoOrcamentos ? (
                                <span
                                  className={estourou ? 'text-rose-400 font-bold' : 'text-zinc-400'}
                                >
                                  {formatarMoeda(gastoAtual)} / {formatarMoeda(orc.limite)}
                                </span>
                              ) : (
                                <div className="flex items-center gap-1">
                                  <span className="text-zinc-400 text-[11px]">R$</span>
                                  <input
                                    type="number"
                                    value={orcamentosTemp[orc.categoria] ?? orc.limite}
                                    onChange={(e) =>
                                      setOrcamentosTemp((prev) => ({
                                        ...prev,
                                        [orc.categoria]: e.target.value,
                                      }))
                                    }
                                    className="w-24 bg-zinc-950 border border-emerald-500/60 rounded-lg px-2 py-1 text-xs font-bold text-white text-right focus:outline-none"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  estourou
                                    ? 'bg-rose-500'
                                    : pct > 80
                                    ? 'bg-amber-400'
                                    : 'bg-emerald-400'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-zinc-200 mb-3">
                      Histórico da Poupança (Depósitos e Retiradas)
                    </h3>
                    {dadosPoupancaGlobal.historicoMovimentacoes.length === 0 ? (
                      <p className="text-xs text-zinc-500 bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-4">
                        Nenhuma movimentação na poupança ainda.
                      </p>
                    ) : (
                      <div className="space-y-2.5">
                        {dadosPoupancaGlobal.historicoMovimentacoes.slice(0, 10).map((t) => (
                          <CardTransacao
                            key={t.id}
                            transacao={t}
                            pessoa1={pessoa1}
                            onEditar={handleAbrirEditarTransacao}
                            onExcluir={handleExcluir}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 4: PAINEL ANALÍTICO COMPLETO (GRÁFICOS + PREVISÃO + EXPORTAÇÃO) */}
          {abaAtiva === 'graficos' && (
            <AbaAnalise
              mesSelecionado={mesSelecionado}
              pessoa1={pessoa1}
              pessoa2={pessoa2}
              filtroPessoaGlobal={filtroPessoaGlobal}
              todasTransacoes={transacoes}
              transacoesDoMes={transacoesDoMes}
              orcamentos={orcamentos}
              observacoesMes={observacoesMes}
            />
          )}
        </main>

        {/* BOTÃO FLUTUANTE (+) MOBILE */}
        <button
          onClick={() => {
            setTransacaoEditando(null);
            setTipoInicialModal('despesa');
            setModalAberto(true);
          }}
          className="md:hidden fixed bottom-20 right-4 z-40 w-13 h-13 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-xl shadow-emerald-500/30 flex items-center justify-center transition transform active:scale-95 cursor-pointer"
          title="Novo Lançamento"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>

        {/* ==================== BOTTOM NAVIGATION MOBILE (TODAS AS 6 ABAS) ==================== */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800/80">
          <div className="w-full px-1 h-16 grid grid-cols-6 items-center relative">
            {itensMenu.map((item) => {
              const Icone = item.icone;
              const ativo = abaAtiva === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAbaAtiva(item.id)}
                  className={`flex flex-col items-center justify-center h-full gap-1 text-[10px] transition cursor-pointer ${
                    ativo ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
                  }`}
                >
                  <Icone size={18} />
                  <span className="truncate max-w-full px-0.5">{item.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* MODAIS */}
        <ModalTransacao
          aberto={modalAberto}
          onFechar={() => {
            setModalAberto(false);
            setTransacaoEditando(null);
          }}
          pessoa1={pessoa1}
          pessoa2={pessoa2}
          salvando={salvando}
          transacaoEditando={transacaoEditando}
          tipoInicial={tipoInicialModal}
          mesSelecionado={mesSelecionado}
          responsavelPadrao={filtroPessoaGlobal}
          onSalvar={handleSalvarTransacao}
        />

        <ModalConfigCasal
          aberto={modalConfigAberto}
          onFechar={() => setModalConfigAberto(false)}
          pessoa1={pessoa1}
          pessoa2={pessoa2}
          onSalvarNomes={(n1, n2, novaSenha) => salvarConfigCasal(undefined, n1, n2, novaSenha)}
        />
      </div>
    </div>
  );
}
