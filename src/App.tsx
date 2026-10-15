import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  Search,
  Trash2,
  Calendar,
  Tag,
  MapPin,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  PieChart as PieChartIcon,
  List,
  Home,
  Target,
  Users,
  User,
  Cloud,
  CloudOff,
  Settings,
  X,
  Check
} from 'lucide-react';

// ============================================================================
// CONFIGURAÇÃO DO SUPABASE (SUAS CHAVES JÁ CONFIGURADAS)
// ============================================================================
const SUPABASE_URL = 'https://lbnjohkoqqqbfiwgtfta.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_NvA1Efn5PmLID6MBOWq7wQ_kvPIJhaU';

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

// --- TIPAGENS ---
type TransactionType = 'despesa' | 'receita' | 'poupanca';
type PaymentMethod = 'Pix/Débito' | 'Cartão de Crédito' | 'Dinheiro';

interface Transaction {
  id: string;
  tipo: TransactionType;
  valor: number;
  data: string; // YYYY-MM-DD
  local: string;
  categoria: string;
  tags: string[];
  metodoPagamento: PaymentMethod;
  parcelaInfo?: string;
  responsavel: string; // Nome da pessoa 1, pessoa 2 ou 'Casal'
}

interface CategoryBudget {
  categoria: string;
  limite: number;
}

const CATEGORIAS_DESPESA = ['Comida', 'Lazer', 'Transporte', 'Contas Fixas', 'Casa/Casamento', 'Compras', 'Saúde', 'Outros'];
const CATEGORIAS_RECEITA = ['Salário', 'Freelance', 'Rendimentos', 'Outros'];
const CATEGORIAS_POUPANCA = ['Reserva do Casal', 'Casamento / Casa', 'Investimentos', 'Meta Individual'];

const ORCAMENTOS_INICIAIS: CategoryBudget[] = [
  { categoria: 'Comida', limite: 800 },
  { categoria: 'Lazer', limite: 450 },
  { categoria: 'Casa/Casamento', limite: 600 },
  { categoria: 'Transporte', limite: 300 },
  { categoria: 'Contas Fixas', limite: 700 },
];

export default function App() {
  // --- NOMES DO CASAL (EDITÁVEIS NO APP) ---
  const [pessoa1, setPessoa1] = useState(() => localStorage.getItem('@financas:pessoa1') || 'Juan');
  const [pessoa2, setPessoa2] = useState(() => localStorage.getItem('@financas:pessoa2') || 'Noiva');
  const [modalConfigAberto, setModalConfigAberto] = useState(false);

  // --- ESTADOS DE NAVEGAÇÃO E FILTRO DE PESSOA ---
  const [abaAtiva, setAbaAtiva] = useState<'home' | 'extrato' | 'metas' | 'graficos'>('home');
  const [modalAberto, setModalAberto] = useState(false);
  const [filtroPessoaGlobal, setFiltroPessoaGlobal] = useState<string>('Todos');
  const [mesSelecionado, setMesSelecionado] = useState(() => new Date().toISOString().slice(0, 7));
  const [sincronizando, setSincronizando] = useState(false);
  const [erroNuvem, setErroNuvem] = useState<string | null>(null);

  // --- DADOS ---
  const [transacoes, setTransacoes] = useState<Transaction[]>(() => {
    const salvo = localStorage.getItem('@financas:transacoes_casal');
    if (salvo) return JSON.parse(salvo);
    return [];
  });

  const [metaPoupanca, setMetaPoupanca] = useState<number>(() => {
    const salvo = localStorage.getItem('@financas:metaPoupanca');
    return salvo ? Number(salvo) : 10000;
  });

  const [orcamentos] = useState<CategoryBudget[]>(ORCAMENTOS_INICIAIS);

  // --- ESTADOS DO FORMULÁRIO ---
  const [tipoForm, setTipoForm] = useState<TransactionType>('despesa');
  const [responsavelForm, setResponsavelForm] = useState<string>(pessoa1);
  const [valorForm, setValorForm] = useState('');
  const [localForm, setLocalForm] = useState('');
  const [dataForm, setDataForm] = useState(() => new Date().toISOString().slice(0, 10));
  const [categoriaForm, setCategoriaForm] = useState('Comida');
  const [tagsForm, setTagsForm] = useState('');
  const [metodoForm, setMetodoForm] = useState<PaymentMethod>('Pix/Débito');
  const [parcelasForm, setParcelasForm] = useState(1);

  // --- BUSCA E EXTRATO ---
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | TransactionType>('todos');

  // --- EDIÇÃO DE META ---
  const [editandoMeta, setEditandoMeta] = useState(false);
  const [novaMetaInput, setNovaMetaInput] = useState(metaPoupanca.toString());

  // ============================================================================
  // SINCRONIZAÇÃO COM SUPABASE (TEMPO REAL ENTRE OS DOIS CELULARES)
  // ============================================================================
  const carregarDadosNuvem = async () => {
    if (!supabase) return;
    setSincronizando(true);

    const { data: transData, error: transError } = await supabase
      .from('transacoes')
      .select('*')
      .order('data', { ascending: false });

    if (transError) {
      console.error('Erro ao buscar transações:', transError.message);
      setErroNuvem('Tabelas ainda não criadas no SQL Editor do Supabase.');
      setSincronizando(false);
      return;
    }

    setErroNuvem(null);

    if (transData) {
      const formatadas: Transaction[] = transData.map((row: any) => ({
        id: row.id,
        tipo: row.tipo,
        valor: Number(row.valor),
        data: row.data,
        local: row.local,
        categoria: row.categoria,
        tags: row.tags || [],
        metodoPagamento: row.metodo_pagamento,
        parcelaInfo: row.parcela_info || undefined,
        responsavel: row.responsavel,
      }));
      setTransacoes(formatadas);
    }

    const { data: configData } = await supabase
      .from('config_casal')
      .select('*')
      .eq('id', 1)
      .single();

    if (configData) {
      setMetaPoupanca(Number(configData.meta_poupanca));
      setPessoa1(configData.pessoa1);
      setPessoa2(configData.pessoa2);
    }
    setSincronizando(false);
  };

  useEffect(() => {
    if (!supabase) return;
    carregarDadosNuvem();

    // Escuta alterações feitas pela noiva ou por você em tempo real
    const canal = supabase
      .channel('realtime-casal')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transacoes' }, () => {
        carregarDadosNuvem();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'config_casal' }, () => {
        carregarDadosNuvem();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []);

  // Backup sempre atualizado no LocalStorage também
  useEffect(() => {
    localStorage.setItem('@financas:transacoes_casal', JSON.stringify(transacoes));
  }, [transacoes]);

  useEffect(() => {
    localStorage.setItem('@financas:pessoa1', pessoa1);
    localStorage.setItem('@financas:pessoa2', pessoa2);
  }, [pessoa1, pessoa2]);

  useEffect(() => {
    if (tipoForm === 'despesa') setCategoriaForm(CATEGORIAS_DESPESA[0]);
    if (tipoForm === 'receita') setCategoriaForm(CATEGORIAS_RECEITA[0]);
    if (tipoForm === 'poupanca') setCategoriaForm(CATEGORIAS_POUPANCA[0]);
  }, [tipoForm]);

  // --- FUNÇÕES UTILITÁRIAS ---
  const formatarMoeda = (valor: number) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatarDataBR = (dataISO: string) => {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const nomeMesAno = (anoMes: string) => {
    const [ano, mes] = anoMes.split('-').map(Number);
    const data = new Date(ano, mes - 1, 1);
    const nome = data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    return nome.charAt(0).toUpperCase() + nome.slice(1);
  };

  const mudarMes = (direcao: number) => {
    const [ano, mes] = mesSelecionado.split('-').map(Number);
    const novaData = new Date(ano, mes - 1 + direcao, 1);
    setMesSelecionado(
      `${novaData.getFullYear()}-${String(novaData.getMonth() + 1).padStart(2, '0')}`
    );
  };

  // --- FILTROS E CÁLCULOS ---
  const transacoesDoMes = useMemo(() => {
    return transacoes
      .filter((t) => t.data.startsWith(mesSelecionado))
      .filter((t) => filtroPessoaGlobal === 'Todos' || t.responsavel === filtroPessoaGlobal)
      .sort((a, b) => b.data.localeCompare(a.data));
  }, [transacoes, mesSelecionado, filtroPessoaGlobal]);

  const resumoMes = useMemo(() => {
    let receitas = 0;
    let despesas = 0;
    let poupadoMes = 0;

    transacoesDoMes.forEach((t) => {
      if (t.tipo === 'receita') receitas += t.valor;
      if (t.tipo === 'despesa') despesas += t.valor;
      if (t.tipo === 'poupanca') poupadoMes += t.valor;
    });

    return { receitas, despesas, poupadoMes, saldoLivre: receitas - despesas - poupadoMes };
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
      p1Poupanca: calc(pessoa1, 'poupanca'),
      p2Poupanca: calc(pessoa2, 'poupanca'),
      casalPoupanca: calc('Casal', 'poupanca'),
    };
  }, [transacoes, mesSelecionado, pessoa1, pessoa2]);

  const totalPoupancaAcumulada = useMemo(() => {
    return transacoes
      .filter((t) => t.tipo === 'poupanca')
      .filter((t) => filtroPessoaGlobal === 'Todos' || t.responsavel === filtroPessoaGlobal)
      .reduce((acc, t) => acc + t.valor, 0);
  }, [transacoes, filtroPessoaGlobal]);

  // --- ADICIONAR TRANSAÇÃO ---
  const handleAdicionarTransacao = async (e: React.FormEvent) => {
    e.preventDefault();
    const valorNumerico = parseFloat(valorForm.replace(',', '.'));
    if (!valorNumerico || valorNumerico <= 0 || !localForm.trim()) return;

    const listaTags = tagsForm
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));

    const novasTransacoes: Transaction[] = [];
    const numParcelas =
      tipoForm === 'despesa' && metodoForm === 'Cartão de Crédito' ? Math.max(1, parcelasForm) : 1;
    const valorParcela = Number((valorNumerico / numParcelas).toFixed(2));
    const [anoBase, mesBase, diaBase] = dataForm.split('-').map(Number);

    for (let i = 0; i < numParcelas; i++) {
      const dataParcela = new Date(anoBase, mesBase - 1 + i, diaBase);
      const dataStr = `${dataParcela.getFullYear()}-${String(dataParcela.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(dataParcela.getDate()).padStart(2, '0')}`;

      novasTransacoes.push({
        id: `${Date.now()}-${i}`,
        tipo: tipoForm,
        valor: valorParcela,
        data: dataStr,
        local: localForm.trim(),
        categoria: categoriaForm,
        tags: listaTags,
        metodoPagamento: metodoForm,
        parcelaInfo: numParcelas > 1 ? `${i + 1}/${numParcelas}` : undefined,
        responsavel: responsavelForm,
      });
    }

    // Atualiza na hora na tela
    setTransacoes((prev) => [...novasTransacoes, ...prev]);

    // Salva no Supabase
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
      }));
      const { error } = await supabase.from('transacoes').insert(payload);
      if (error) {
        console.error('Erro ao salvar no Supabase:', error.message);
      }
    }

    setValorForm('');
    setLocalForm('');
    setTagsForm('');
    setParcelasForm(1);
    setModalAberto(false);
  };

  const handleExcluir = async (id: string) => {
    setTransacoes((prev) => prev.filter((t) => t.id !== id));
    if (supabase) {
      await supabase.from('transacoes').delete().eq('id', id);
    }
  };

  const salvarConfigCasal = async (novaMeta?: number, nP1?: string, nP2?: string) => {
    const metaFinal = novaMeta ?? metaPoupanca;
    const p1Final = nP1 ?? pessoa1;
    const p2Final = nP2 ?? pessoa2;

    if (supabase) {
      await supabase.from('config_casal').upsert({
        id: 1,
        meta_poupanca: metaFinal,
        pessoa1: p1Final,
        pessoa2: p2Final,
      });
    }
  };

  const transacoesFiltradas = useMemo(() => {
    return transacoesDoMes.filter((t) => {
      const bateTipo = filtroTipo === 'todos' || t.tipo === filtroTipo;
      const termo = busca.toLowerCase();
      const bateBusca =
        t.local.toLowerCase().includes(termo) ||
        t.categoria.toLowerCase().includes(termo) ||
        t.responsavel.toLowerCase().includes(termo) ||
        t.tags.some((tag) => tag.toLowerCase().includes(termo));
      return bateTipo && bateBusca;
    });
  }, [transacoesDoMes, filtroTipo, busca]);

  const gastosPorCategoria = useMemo(() => {
    const mapa: Record<string, number> = {};
    transacoesDoMes
      .filter((t) => t.tipo === 'despesa')
      .forEach((t) => {
        mapa[t.categoria] = (mapa[t.categoria] || 0) + t.valor;
      });
    return Object.entries(mapa)
      .map(([categoria, total]) => ({ categoria, total }))
      .sort((a, b) => b.total - a.total);
  }, [transacoesDoMes]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24 font-sans selection:bg-emerald-500 selection:text-zinc-950">
      <div className="max-w-md mx-auto min-h-screen bg-zinc-900/50 border-x border-zinc-800/60 flex flex-col">
        
        {/* HEADER */}
        <header className="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 pt-3 pb-2.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Wallet size={17} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold tracking-tight text-sm text-zinc-100">NossoFinanceiro</span>
                  {supabase && !erroNuvem ? (
                    <span className="flex items-center gap-1 text-[10px] bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded-full">
                      <Cloud size={10} /> {sincronizando ? 'Sync...' : 'Online'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded-full">
                      <CloudOff size={10} /> Local
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* SELETOR DE MÊS */}
              <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-1.5 py-1">
                <button onClick={() => mudarMes(-1)} className="p-1 text-zinc-400 hover:text-white">
                  <ChevronLeft size={15} />
                </button>
                <span className="text-[11px] font-medium px-1.5 min-w-[105px] text-center">
                  {nomeMesAno(mesSelecionado)}
                </span>
                <button onClick={() => mudarMes(1)} className="p-1 text-zinc-400 hover:text-white">
                  <ChevronRight size={15} />
                </button>
              </div>

              <button
                onClick={() => setModalConfigAberto(true)}
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                title="Configurar nomes do casal"
              >
                <Settings size={15} />
              </button>
            </div>
          </div>

          {erroNuvem && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-2.5 py-1.5 text-[11px] text-amber-300">
              ⚠️ {erroNuvem}
            </div>
          )}

          {/* FILTRO DE VISÃO DO CASAL (TODOS / VOCÊ / NOIVA / CASAL) */}
          <div className="grid grid-cols-4 gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800/80">
            {(['Todos', pessoa1, pessoa2, 'Casal'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setFiltroPessoaGlobal(item)}
                className={`py-1.5 rounded-lg text-xs font-semibold transition truncate px-1 ${
                  filtroPessoaGlobal === item
                    ? 'bg-emerald-500 text-zinc-950 shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item === 'Todos' ? 'Visão Geral' : item}
              </button>
            ))}
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 p-4 space-y-5">
          {abaAtiva === 'home' && (
            <>
              {/* CARD PRINCIPAL */}
              <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/40 border border-zinc-800 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                    Saldo Livre ({filtroPessoaGlobal === 'Todos' ? 'Nosso Total' : filtroPessoaGlobal})
                  </p>
                  <Users size={15} className="text-emerald-400" />
                </div>
                <h1
                  className={`text-3xl font-extrabold mt-1 ${
                    resumoMes.saldoLivre >= 0 ? 'text-white' : 'text-rose-400'
                  }`}
                >
                  {formatarMoeda(resumoMes.saldoLivre)}
                </h1>

                <div className="grid grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-zinc-800/80">
                  <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/60">
                    <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                      <TrendingUp size={13} />
                      <span>Entradas</span>
                    </div>
                    <p className="text-sm font-bold mt-1 text-zinc-100 truncate">
                      {formatarMoeda(resumoMes.receitas)}
                    </p>
                  </div>

                  <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/60">
                    <div className="flex items-center gap-1 text-rose-400 text-xs font-medium">
                      <TrendingDown size={13} />
                      <span>Gastos</span>
                    </div>
                    <p className="text-sm font-bold mt-1 text-zinc-100 truncate">
                      {formatarMoeda(resumoMes.despesas)}
                    </p>
                  </div>

                  <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/60">
                    <div className="flex items-center gap-1 text-sky-400 text-xs font-medium">
                      <PiggyBank size={13} />
                      <span>Guardado</span>
                    </div>
                    <p className="text-sm font-bold mt-1 text-zinc-100 truncate">
                      {formatarMoeda(resumoMes.poupadoMes)}
                    </p>
                  </div>
                </div>
              </div>

              {/* RESUMO RÁPIDO DE QUEM GASTOU QUANTO NO MÊS */}
              <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2.5">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Divisão de Gastos no Mês
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-zinc-950/70 border border-zinc-800/70 rounded-xl p-2.5">
                    <span className="text-[11px] text-indigo-400 font-semibold block truncate">
                      {pessoa1}
                    </span>
                    <span className="text-xs font-bold text-zinc-100 mt-0.5 block">
                      {formatarMoeda(resumoPorPessoa.p1Gastos)}
                    </span>
                  </div>
                  <div className="bg-zinc-950/70 border border-zinc-800/70 rounded-xl p-2.5">
                    <span className="text-[11px] text-pink-400 font-semibold block truncate">
                      {pessoa2}
                    </span>
                    <span className="text-xs font-bold text-zinc-100 mt-0.5 block">
                      {formatarMoeda(resumoPorPessoa.p2Gastos)}
                    </span>
                  </div>
                  <div className="bg-zinc-950/70 border border-zinc-800/70 rounded-xl p-2.5">
                    <span className="text-[11px] text-amber-400 font-semibold block truncate">
                      Ambos/Casal
                    </span>
                    <span className="text-xs font-bold text-zinc-100 mt-0.5 block">
                      {formatarMoeda(resumoPorPessoa.casalGastos)}
                    </span>
                  </div>
                </div>
              </div>

              {/* ÚLTIMAS TRANSAÇÕES */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-zinc-300">Últimos Lançamentos</h2>
                  <button
                    onClick={() => setAbaAtiva('extrato')}
                    className="text-xs text-emerald-400 hover:underline"
                  >
                    Ver extrato completo
                  </button>
                </div>

                {transacoesDoMes.length === 0 ? (
                  <div className="text-center py-8 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl">
                    <p className="text-sm text-zinc-400">Nenhum lançamento neste mês.</p>
                    <p className="text-xs text-zinc-500 mt-1">Clique no botão + abaixo para adicionar.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {transacoesDoMes.slice(0, 6).map((t) => (
                      <CardTransacao
                        key={t.id}
                        transacao={t}
                        pessoa1={pessoa1}
                        formatarMoeda={formatarMoeda}
                        formatarDataBR={formatarDataBR}
                        onExcluir={handleExcluir}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* ABA 2: EXTRATO */}
          {abaAtiva === 'extrato' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Extrato Compartilhado</h2>
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar local, pessoa, categoria ou #tag..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {(['todos', 'despesa', 'receita', 'poupanca'] as const).map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setFiltroTipo(tipo)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition ${
                      filtroTipo === tipo
                        ? 'bg-emerald-500 text-zinc-950 font-semibold'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    {tipo === 'poupanca' ? 'Poupança' : tipo}
                  </button>
                ))}
              </div>

              <div className="space-y-2.5">
                {transacoesFiltradas.map((t) => (
                  <CardTransacao
                    key={t.id}
                    transacao={t}
                    pessoa1={pessoa1}
                    formatarMoeda={formatarMoeda}
                    formatarDataBR={formatarDataBR}
                    onExcluir={handleExcluir}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ABA 3: POUPANÇA & METAS */}
          {abaAtiva === 'metas' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-sky-950/50 to-zinc-900 border border-sky-900/50 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sky-400">
                    <PiggyBank size={20} />
                    <h2 className="font-bold text-sm uppercase tracking-wider">Poupança do Casal</h2>
                  </div>
                  <button
                    onClick={() => {
                      setNovaMetaInput(metaPoupanca.toString());
                      setEditandoMeta(!editandoMeta);
                    }}
                    className="text-xs text-sky-400 hover:underline"
                  >
                    {editandoMeta ? 'Cancelar' : 'Editar Meta'}
                  </button>
                </div>

                <p className="text-2xl font-extrabold text-white mt-2">
                  {formatarMoeda(totalPoupancaAcumulada)}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Meta: {formatarMoeda(metaPoupanca)} (
                  {Math.min(100, Math.round((totalPoupancaAcumulada / metaPoupanca) * 100))}%)
                </p>

                {editandoMeta && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="number"
                      value={novaMetaInput}
                      onChange={(e) => setNovaMetaInput(e.target.value)}
                      className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm"
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
                      className="bg-sky-500 text-zinc-950 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Check size={14} /> Salvar
                    </button>
                  </div>
                )}

                <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden mt-4 border border-zinc-800">
                  <div
                    className="h-full bg-sky-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (totalPoupancaAcumulada / metaPoupanca) * 100)}%`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-sky-900/40 text-center text-xs">
                  <div>
                    <span className="text-zinc-400 block">{pessoa1} (Mês)</span>
                    <strong className="text-sky-300">{formatarMoeda(resumoPorPessoa.p1Poupanca)}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">{pessoa2} (Mês)</span>
                    <strong className="text-sky-300">{formatarMoeda(resumoPorPessoa.p2Poupanca)}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block">Juntos (Mês)</span>
                    <strong className="text-sky-300">{formatarMoeda(resumoPorPessoa.casalPoupanca)}</strong>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-300 mb-3">Teto de Gastos Mensal</h3>
                <div className="space-y-3">
                  {orcamentos.map((orc) => {
                    const gastoAtual = transacoesDoMes
                      .filter((t) => t.tipo === 'despesa' && t.categoria === orc.categoria)
                      .reduce((acc, t) => acc + t.valor, 0);
                    const pct = Math.min(100, Math.round((gastoAtual / orc.limite) * 100));
                    const estourou = gastoAtual > orc.limite;

                    return (
                      <div
                        key={orc.categoria}
                        className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-3.5"
                      >
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-semibold text-zinc-200">{orc.categoria}</span>
                          <span className={estourou ? 'text-rose-400 font-bold' : 'text-zinc-400'}>
                            {formatarMoeda(gastoAtual)} / {formatarMoeda(orc.limite)}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              estourou ? 'bg-rose-500' : pct > 80 ? 'bg-amber-400' : 'bg-emerald-400'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ABA 4: ANÁLISE */}
          {abaAtiva === 'graficos' && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold">Análise de Gastos por Categoria</h2>
              {gastosPorCategoria.length === 0 ? (
                <p className="text-sm text-zinc-500 py-8 text-center">Sem despesas neste mês.</p>
              ) : (
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 space-y-4">
                  {gastosPorCategoria.map((item) => {
                    const pct = Math.round((item.total / resumoMes.despesas) * 100) || 0;
                    return (
                      <div key={item.categoria} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-zinc-200">{item.categoria}</span>
                          <span className="text-zinc-400">
                            <strong className="text-zinc-100">{formatarMoeda(item.total)}</strong> ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>

        {/* BOTTOM NAVIGATION */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800/80">
          <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between relative">
            <button
              onClick={() => setAbaAtiva('home')}
              className={`flex flex-col items-center gap-1 text-[11px] ${
                abaAtiva === 'home' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <Home size={20} />
              <span>Início</span>
            </button>
            <button
              onClick={() => setAbaAtiva('extrato')}
              className={`flex flex-col items-center gap-1 text-[11px] mr-6 ${
                abaAtiva === 'extrato' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <List size={20} />
              <span>Extrato</span>
            </button>

            <button
              onClick={() => setModalAberto(true)}
              className="absolute left-1/2 -translate-x-1/2 -top-5 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/25 flex items-center justify-center transition transform active:scale-95"
            >
              <Plus size={28} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => setAbaAtiva('metas')}
              className={`flex flex-col items-center gap-1 text-[11px] ml-6 ${
                abaAtiva === 'metas' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <Target size={20} />
              <span>Poupança</span>
            </button>
            <button
              onClick={() => setAbaAtiva('graficos')}
              className={`flex flex-col items-center gap-1 text-[11px] ${
                abaAtiva === 'graficos' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <PieChartIcon size={20} />
              <span>Análise</span>
            </button>
          </div>
        </nav>

        {/* MODAL DE NOVO LANÇAMENTO */}
        {modalAberto && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">Novo Lançamento</h3>
                <button
                  onClick={() => setModalAberto(false)}
                  className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* TIPO */}
              <div className="grid grid-cols-3 gap-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setTipoForm('despesa')}
                  className={`py-2 rounded-lg text-xs font-bold ${
                    tipoForm === 'despesa' ? 'bg-rose-500 text-white' : 'text-zinc-400'
                  }`}
                >
                  Gastei
                </button>
                <button
                  type="button"
                  onClick={() => setTipoForm('receita')}
                  className={`py-2 rounded-lg text-xs font-bold ${
                    tipoForm === 'receita' ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-400'
                  }`}
                >
                  Recebi
                </button>
                <button
                  type="button"
                  onClick={() => setTipoForm('poupanca')}
                  className={`py-2 rounded-lg text-xs font-bold ${
                    tipoForm === 'poupanca' ? 'bg-sky-500 text-zinc-950' : 'text-zinc-400'
                  }`}
                >
                  Guardei
                </button>
              </div>

              {/* QUEM FEZ O LANÇAMENTO? */}
              <div>
                <label className="text-[11px] text-zinc-400 font-medium">
                  De quem é esse registro?
                </label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {[pessoa1, pessoa2, 'Casal'].map((resp) => (
                    <button
                      type="button"
                      key={resp}
                      onClick={() => setResponsavelForm(resp)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                        responsavelForm === resp
                          ? 'bg-zinc-100 text-zinc-950 border-white'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                      }`}
                    >
                      {resp === 'Casal' ? <Users size={13} /> : <User size={13} />}
                      <span className="truncate">{resp}</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleAdicionarTransacao} className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-zinc-400 font-medium">Valor (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="0,00"
                      value={valorForm}
                      onChange={(e) => setValorForm(e.target.value)}
                      className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm font-bold text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-zinc-400 font-medium">Data</label>
                    <input
                      type="date"
                      required
                      value={dataForm}
                      onChange={(e) => setDataForm(e.target.value)}
                      className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-zinc-400 font-medium">Onde foi / Descrição</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Supermercado, iFood, Salário..."
                    value={localForm}
                    onChange={(e) => setLocalForm(e.target.value)}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-zinc-400 font-medium">Categoria</label>
                    <select
                      value={categoriaForm}
                      onChange={(e) => setCategoriaForm(e.target.value)}
                      className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-200"
                    >
                      {(tipoForm === 'despesa'
                        ? CATEGORIAS_DESPESA
                        : tipoForm === 'receita'
                        ? CATEGORIAS_RECEITA
                        : CATEGORIAS_POUPANCA
                      ).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 font-medium">Método</label>
                    <select
                      value={metodoForm}
                      onChange={(e) => setMetodoForm(e.target.value as PaymentMethod)}
                      className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-200"
                    >
                      <option value="Pix/Débito">Pix / Débito</option>
                      <option value="Cartão de Crédito">Cartão de Crédito</option>
                      <option value="Dinheiro">Dinheiro</option>
                    </select>
                  </div>
                </div>

                {tipoForm === 'despesa' && metodoForm === 'Cartão de Crédito' && (
                  <div>
                    <label className="text-[11px] text-zinc-400 font-medium">Parcelas</label>
                    <input
                      type="number"
                      min={1}
                      max={24}
                      value={parcelasForm}
                      onChange={(e) => setParcelasForm(Number(e.target.value))}
                      className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[11px] text-zinc-400 font-medium">Tags (opcional)</label>
                  <input
                    type="text"
                    placeholder="Ex: ifood, casamento, fds"
                    value={tagsForm}
                    onChange={(e) => setTagsForm(e.target.value)}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-xl text-sm transition"
                >
                  Salvar Lançamento
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL DE CONFIGURAÇÃO DOS NOMES DO CASAL */}
        {modalConfigAberto && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm">Personalizar Nomes do Casal</h3>
                <button onClick={() => setModalConfigAberto(false)} className="text-zinc-400">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-zinc-400">Seu Nome</label>
                  <input
                    type="text"
                    value={pessoa1}
                    onChange={(e) => setPessoa1(e.target.value)}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400">Nome da sua Noiva</label>
                  <input
                    type="text"
                    value={pessoa2}
                    onChange={(e) => setPessoa2(e.target.value)}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <button
                  onClick={() => {
                    salvarConfigCasal(metaPoupanca, pessoa1, pessoa2);
                    setModalConfigAberto(false);
                  }}
                  className="w-full bg-emerald-500 text-zinc-950 font-bold py-2.5 rounded-xl text-xs"
                >
                  Salvar Nomes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUBCOMPONENTE DE CARD DE TRANSAÇÃO ---
function CardTransacao({
  transacao,
  pessoa1,
  formatarMoeda,
  formatarDataBR,
  onExcluir,
}: {
  transacao: Transaction;
  pessoa1: string;
  formatarMoeda: (v: number) => string;
  formatarDataBR: (d: string) => string;
  onExcluir: (id: string) => void;
}) {
  const isReceita = transacao.tipo === 'receita';
  const isPoupanca = transacao.tipo === 'poupanca';

  const corBadgePessoa =
    transacao.responsavel === pessoa1
      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
      : transacao.responsavel === 'Casal'
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      : 'bg-pink-500/20 text-pink-300 border-pink-500/30';

  return (
    <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-3.5 flex items-center justify-between gap-3">
      <div className="flex items-start gap-3 min-w-0">
        <div
          className={`p-2.5 rounded-xl mt-0.5 shrink-0 ${
            isReceita
              ? 'bg-emerald-500/15 text-emerald-400'
              : isPoupanca
              ? 'bg-sky-500/15 text-sky-400'
              : 'bg-rose-500/15 text-rose-400'
          }`}
        >
          {isReceita ? (
            <TrendingUp size={18} />
          ) : isPoupanca ? (
            <PiggyBank size={18} />
          ) : (
            <TrendingDown size={18} />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="font-semibold text-sm text-zinc-100 truncate">{transacao.local}</p>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold border ${corBadgePessoa}`}>
              {transacao.responsavel}
            </span>
            {transacao.parcelaInfo && (
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded font-semibold">
                {transacao.parcelaInfo}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] text-zinc-400 mt-1">
            <span className="flex items-center gap-1">
              <MapPin size={11} /> {transacao.categoria}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={11} /> {formatarDataBR(transacao.data)}
            </span>
            <span className="flex items-center gap-1">
              <CreditCard size={11} /> {transacao.metodoPagamento}
            </span>
          </div>

          {transacao.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {transacao.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded-md flex items-center gap-0.5"
                >
                  <Tag size={9} /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end shrink-0">
        <span
          className={`font-bold text-sm ${
            isReceita ? 'text-emerald-400' : isPoupanca ? 'text-sky-400' : 'text-rose-400'
          }`}
        >
          {isReceita ? '+' : '-'} {formatarMoeda(transacao.valor)}
        </span>
        <button
          onClick={() => onExcluir(transacao.id)}
          className="text-zinc-600 hover:text-rose-400 p-1 mt-1 transition"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}