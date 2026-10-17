import { useState, useEffect, useMemo } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  PieChart as PieChartIcon,
  List,
  Home,
  Target,
  Package,
  Users,
  RefreshCw,
  Settings,
  Check,
  AlertCircle,
} from 'lucide-react';
import { supabase } from './supabaseClient';
import {
  type Transaction,
  type TransactionType,
  type PaymentMethod,
  type ActiveTab,
  type CategoryBudget,
  type EnxovalItem,
  ORCAMENTOS_INICIAIS,
  obterMesAtualLocal,
  formatarMoeda,
  nomeMesAno,
} from './types';
import { CardTransacao } from './components/CardTransacao';
import { ModalTransacao } from './components/ModalTransacao';
import { ModalConfigCasal } from './components/ModalConfigCasal';
import { AbaEnxoval } from './components/AbaEnxoval';

export default function App() {
  // --- NOMES DO CASAL ---
  const [pessoa1, setPessoa1] = useState(() => localStorage.getItem('@financas:pessoa1') || 'Juan');
  const [pessoa2, setPessoa2] = useState(() => localStorage.getItem('@financas:pessoa2') || 'Noiva');
  const [modalConfigAberto, setModalConfigAberto] = useState(false);

  // --- NAVEGAÇÃO E FILTROS ---
  const [abaAtiva, setAbaAtiva] = useState<ActiveTab>('home');
  const [modalAberto, setModalAberto] = useState(false);
  const [transacaoEditando, setTransacaoEditando] = useState<Transaction | null>(null);
  const [filtroPessoaGlobal, setFiltroPessoaGlobal] = useState<string>('Todos');
  const [mesSelecionado, setMesSelecionado] = useState(() => obterMesAtualLocal());
  const [sincronizando, setSincronizando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erroNuvem, setErroNuvem] = useState<string | null>(null);

  // --- DADOS DE TRANSAÇÕES ---
  const [transacoes, setTransacoes] = useState<Transaction[]>(() => {
    const salvo = localStorage.getItem('@financas:transacoes_casal');
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch {
        return [];
      }
    }
    return [];
  });

  // --- DADOS DO ENXOVAL ---
  const [itensEnxoval, setItensEnxoval] = useState<EnxovalItem[]>(() => {
    const salvo = localStorage.getItem('@financas:enxoval_casal');
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [metaPoupanca, setMetaPoupanca] = useState<number>(() => {
    const salvo = localStorage.getItem('@financas:metaPoupanca');
    return salvo ? Number(salvo) : 10000;
  });

  const [orcamentos] = useState<CategoryBudget[]>(ORCAMENTOS_INICIAIS);

  // --- BUSCA E META ---
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | TransactionType>('todos');
  const [editandoMeta, setEditandoMeta] = useState(false);
  const [novaMetaInput, setNovaMetaInput] = useState(metaPoupanca.toString());

  // --- SINCRONIZAÇÃO COM SUPABASE ---
  const carregarDadosNuvem = async () => {
    if (!supabase) return;
    setSincronizando(true);

    try {
      const localSalvo = localStorage.getItem('@financas:transacoes_casal');
      const listaLocal: Transaction[] = localSalvo ? JSON.parse(localSalvo) : [];
      const pendentes = listaLocal.filter((t) => t.pendenteSync);

      if (pendentes.length > 0) {
        const payloadPendentes = pendentes.map((t) => ({
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
        await supabase.from('transacoes').upsert(payloadPendentes);
      }

      const { data: transData, error: transError } = await supabase
        .from('transacoes')
        .select('*')
        .order('data', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(2000);

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

        const idsNuvem = new Set(daNuvem.map((t) => t.id));
        const aindaPendentes = pendentes.filter((t) => !idsNuvem.has(t.id));
        setTransacoes([...aindaPendentes, ...daNuvem]);
      }

      // Carrega Itens do Enxoval
      const { data: enxovalData } = await supabase
        .from('enxoval')
        .select('*')
        .order('comodo', { ascending: true })
        .limit(3000);

      if (enxovalData) {
        const formatadosEnxoval: EnxovalItem[] = enxovalData.map((row: any) => ({
          id: String(row.id),
          comodo: row.comodo || 'Outros',
          item: row.item,
          quantidade: Number(row.quantidade) || 1,
          valor: Number(row.valor) || 0,
          prioridade: row.prioridade || 'Média',
          observacao: row.observacao || '',
          comprado: Boolean(row.comprado),
        }));
        setItensEnxoval(formatadosEnxoval);
      }

      const { data: configData } = await supabase
        .from('config_casal')
        .select('*')
        .eq('id', 1)
        .single();

      if (configData) {
        setMetaPoupanca(Number(configData.meta_poupanca));
        if (configData.pessoa1) setPessoa1(configData.pessoa1);
        if (configData.pessoa2) setPessoa2(configData.pessoa2);
      }
    } catch {
      setErroNuvem('Sem conexão no momento. Seus dados estão salvos no aparelho.');
    } finally {
      setSincronizando(false);
    }
  };

  useEffect(() => {
    if (!supabase) return;
    carregarDadosNuvem();

    const canal = supabase
      .channel('realtime-casal')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transacoes' }, () => {
        carregarDadosNuvem();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'enxoval' }, () => {
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

  useEffect(() => {
    localStorage.setItem('@financas:transacoes_casal', JSON.stringify(transacoes));
  }, [transacoes]);

  useEffect(() => {
    localStorage.setItem('@financas:enxoval_casal', JSON.stringify(itensEnxoval));
  }, [itensEnxoval]);

  useEffect(() => {
    localStorage.setItem('@financas:pessoa1', pessoa1);
    localStorage.setItem('@financas:pessoa2', pessoa2);
  }, [pessoa1, pessoa2]);

  const mudarMes = (direcao: number) => {
    const [ano, mes] = mesSelecionado.split('-').map(Number);
    const novaData = new Date(ano, mes - 1 + direcao, 1);
    setMesSelecionado(
      `${novaData.getFullYear()}-${String(novaData.getMonth() + 1).padStart(2, '0')}`
    );
  };

  // --- CÁLCULOS FINANCEIROS ---
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

  // --- AÇÕES DE TRANSAÇÃO (CRIAR E EDITAR) ---
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

    // MODO EDIÇÃO DE LANÇAMENTO EXISTENTE
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
        pendenteSync: true,
      };

      setTransacoes((prev) => prev.map((t) => (t.id === dados.id ? atualizada : t)));

      if (supabase) {
        const { error } = await supabase.from('transacoes').upsert({
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
        });

        if (!error) {
          setTransacoes((prev) =>
            prev.map((t) => (t.id === atualizada.id ? { ...t, pendenteSync: false } : t))
          );
        }
      }

      setSalvando(false);
      setTransacaoEditando(null);
      setModalAberto(false);
      return;
    }

    // MODO NOVO LANÇAMENTO
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
        id: `${Date.now()}-${sufixoAleatorio}-${i}`,
        tipo: dados.tipo,
        valor: valorParcela,
        data: dataStr,
        local: dados.local,
        categoria: dados.categoria,
        tags: dados.tags,
        metodoPagamento: dados.metodoPagamento,
        parcelaInfo: numParcelas > 1 ? `${i + 1}/${numParcelas}` : undefined,
        responsavel: dados.responsavel,
        pendenteSync: true,
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
      }));

      const { error } = await supabase.from('transacoes').upsert(payload);

      if (!error) {
        const idsSalvos = new Set(novasTransacoes.map((t) => t.id));
        setTransacoes((prev) =>
          prev.map((t) => (idsSalvos.has(t.id) ? { ...t, pendenteSync: false } : t))
        );
        setErroNuvem(null);
      } else {
        setErroNuvem(`Salvo no aparelho, mas falhou na nuvem (${error.message}).`);
      }
    }

    setSalvando(false);
    setModalAberto(false);
  };

  const handleExcluir = async (id: string) => {
    setTransacoes((prev) => prev.filter((t) => t.id !== id));
    if (supabase) {
      await supabase.from('transacoes').delete().eq('id', id);
    }
  };

  const handleAbrirEditarTransacao = (t: Transaction) => {
    setTransacaoEditando(t);
    setModalAberto(true);
  };

  // --- AÇÕES DO ENXOVAL ---
  const handleSalvarItemEnxoval = async (item: EnxovalItem) => {
    setItensEnxoval((prev) => {
      const existe = prev.some((i) => i.id === item.id);
      return existe ? prev.map((i) => (i.id === item.id ? item : i)) : [item, ...prev];
    });

    if (supabase) {
      await supabase.from('enxoval').upsert({
        id: item.id,
        comodo: item.comodo,
        item: item.item,
        quantidade: item.quantidade,
        valor: item.valor,
        prioridade: item.prioridade,
        observacao: item.observacao,
        comprado: item.comprado,
      });
    }
  };

  const handleImportarEnxovalEmLote = async (novosItens: EnxovalItem[]) => {
    setItensEnxoval((prev) => [...novosItens, ...prev]);

    if (supabase) {
      const payload = novosItens.map((item) => ({
        id: item.id,
        comodo: item.comodo,
        item: item.item,
        quantidade: item.quantidade,
        valor: item.valor,
        prioridade: item.prioridade,
        observacao: item.observacao,
        comprado: item.comprado,
      }));
      await supabase.from('enxoval').upsert(payload);
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

  const salvarConfigCasal = async (novaMeta?: number, nP1?: string, nP2?: string) => {
    const metaFinal = novaMeta ?? metaPoupanca;
    const p1Final = (nP1 ?? pessoa1).trim() || 'Juan';
    const p2Final = (nP2 ?? pessoa2).trim() || 'Noiva';

    const nomeAntigoP1 = localStorage.getItem('@financas:pessoa1') || 'Juan';
    const nomeAntigoP2 = localStorage.getItem('@financas:pessoa2') || 'Noiva';

    if (nomeAntigoP1 !== p1Final || nomeAntigoP2 !== p2Final) {
      setTransacoes((prev) =>
        prev.map((t) => {
          if (t.responsavel === nomeAntigoP1) return { ...t, responsavel: p1Final };
          if (t.responsavel === nomeAntigoP2) return { ...t, responsavel: p2Final };
          return t;
        })
      );

      if (supabase) {
        if (nomeAntigoP1 !== p1Final) {
          await supabase
            .from('transacoes')
            .update({ responsavel: p1Final })
            .eq('responsavel', nomeAntigoP1);
        }
        if (nomeAntigoP2 !== p2Final) {
          await supabase
            .from('transacoes')
            .update({ responsavel: p2Final })
            .eq('responsavel', nomeAntigoP2);
        }
      }
    }

    setPessoa1(p1Final);
    setPessoa2(p2Final);
    setFiltroPessoaGlobal('Todos');

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

  const qtdPendentes = transacoes.filter((t) => t.pendenteSync).length;

  const itensMenu = [
    { id: 'home' as ActiveTab, label: 'Início', icone: Home },
    { id: 'extrato' as ActiveTab, label: 'Extrato', icone: List },
    { id: 'enxoval' as ActiveTab, label: 'Enxoval Casa', icone: Package },
    { id: 'metas' as ActiveTab, label: 'Poupança', icone: Target },
    { id: 'graficos' as ActiveTab, label: 'Análise', icone: PieChartIcon },
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
                <span className="text-[11px] text-zinc-400">Gestão do Casal</span>
              </div>
            </div>
            <button
              onClick={() => setModalConfigAberto(true)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
              title="Configurar nomes do casal"
            >
              <Settings size={16} />
            </button>
          </div>

          <button
            onClick={() => {
              setTransacaoEditando(null);
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
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    ativo
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                  }`}
                >
                  <Icone size={18} />
                  <span>{item.label}</span>
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
              <RefreshCw size={13} className={sincronizando ? 'animate-spin text-emerald-400' : 'text-emerald-400'} />
              {sincronizando
                ? 'Sincronizando...'
                : qtdPendentes > 0
                ? `${qtdPendentes} pendente(s)`
                : 'Sincronizado na Nuvem'}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
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
                    NossoFinanceiro
                  </span>
                  <button
                    onClick={carregarDadosNuvem}
                    className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${
                      supabase && !erroNuvem && qtdPendentes === 0
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    <RefreshCw size={10} className={sincronizando ? 'animate-spin' : ''} />
                    {sincronizando ? 'Sync...' : qtdPendentes > 0 ? `${qtdPendentes}` : 'Online'}
                  </button>
                </div>
              </div>

              <div className="hidden md:block">
                <h1 className="text-lg font-bold text-white">
                  {itensMenu.find((i) => i.id === abaAtiva)?.label}
                </h1>
              </div>

              <div className="flex items-center gap-2 ml-auto shrink-0">
                {abaAtiva !== 'enxoval' && (
                  <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-1.5 py-1">
                    <button
                      onClick={() => mudarMes(-1)}
                      className="p-1 text-zinc-400 hover:text-white transition cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs md:text-sm font-medium px-1.5 min-w-[105px] md:min-w-[140px] text-center truncate">
                      {nomeMesAno(mesSelecionado)}
                    </span>
                    <button
                      onClick={() => mudarMes(1)}
                      className="p-1 text-zinc-400 hover:text-white transition cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setModalConfigAberto(true)}
                  className="md:hidden p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white shrink-0 cursor-pointer"
                >
                  <Settings size={15} />
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

            {abaAtiva !== 'enxoval' && (
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
                        Saldo Livre ({filtroPessoaGlobal === 'Todos' ? 'Nosso Total' : filtroPessoaGlobal})
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

                  <div
                    onClick={() => setAbaAtiva('metas')}
                    className="bg-sky-950/25 border border-sky-900/40 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-sky-950/40 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <PiggyBank size={18} className="text-sky-400 shrink-0" />
                      <span className="text-xs text-sky-200 font-medium truncate">
                        Poupança Total:
                      </span>
                    </div>
                    <strong className="text-xs md:text-sm text-sky-300 shrink-0">
                      {formatarMoeda(totalPoupancaAcumulada)}
                    </strong>
                  </div>
                </div>
              </div>

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
                      Use o botão "+" para registrar.
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">Extrato Compartilhado</h2>
                  <p className="text-xs text-zinc-400">
                    {transacoesFiltradas.length} registro(s) encontrado(s)
                  </p>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {(['todos', 'despesa', 'receita', 'poupanca'] as const).map((tipo) => (
                    <button
                      key={tipo}
                      onClick={() => setFiltroTipo(tipo)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition cursor-pointer shrink-0 ${
                        filtroTipo === tipo
                          ? 'bg-emerald-500 text-zinc-950 font-semibold'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      {tipo === 'poupanca' ? 'Poupança' : tipo}
                    </button>
                  ))}
                </div>
              </div>

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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {transacoesFiltradas.map((t) => (
                  <CardTransacao
                    key={t.id}
                    transacao={t}
                    pessoa1={pessoa1}
                    onEditar={handleAbrirEditarTransacao}
                    onExcluir={handleExcluir}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ABA NOVA: ENXOVAL DA CASA NOVA */}
          {abaAtiva === 'enxoval' && (
            <AbaEnxoval
              itens={itensEnxoval}
              onSalvarItem={handleSalvarItemEnxoval}
              onImportarEmLote={handleImportarEnxovalEmLote}
              onAlternarComprado={handleAlternarCompradoEnxoval}
              onExcluirItem={handleExcluirItemEnxoval}
            />
          )}

          {/* ABA 3: POUPANÇA & METAS */}
          {abaAtiva === 'metas' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-gradient-to-br from-sky-950/50 to-zinc-900 border border-sky-900/50 rounded-2xl p-5 h-fit">
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
                    className="text-xs text-sky-400 hover:underline cursor-pointer"
                  >
                    {editandoMeta ? 'Cancelar' : 'Editar Meta'}
                  </button>
                </div>

                <p className="text-3xl font-extrabold text-white mt-3">
                  {formatarMoeda(totalPoupancaAcumulada)}
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  Meta: {formatarMoeda(metaPoupanca)} (
                  {Math.min(100, Math.round((totalPoupancaAcumulada / metaPoupanca) * 100))}%)
                </p>

                {editandoMeta && (
                  <div className="mt-3 flex gap-2">
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

                <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden mt-4 border border-zinc-800">
                  <div
                    className="h-full bg-sky-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (totalPoupancaAcumulada / metaPoupanca) * 100)}%`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-sky-900/40 text-center text-xs">
                  <div>
                    <span className="text-zinc-400 block truncate">{pessoa1}</span>
                    <strong className="text-sky-300 block truncate">{formatarMoeda(resumoPorPessoa.p1Poupanca)}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block truncate">{pessoa2}</span>
                    <strong className="text-sky-300 block truncate">{formatarMoeda(resumoPorPessoa.p2Poupanca)}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block truncate">Juntos</span>
                    <strong className="text-sky-300 block truncate">{formatarMoeda(resumoPorPessoa.casalPoupanca)}</strong>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="text-sm md:text-base font-semibold text-zinc-200 mb-3">
                  Teto de Gastos Mensal
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {orcamentos.map((orc) => {
                    const gastoAtual = transacoesDoMes
                      .filter((t) => t.tipo === 'despesa' && t.categoria === orc.categoria)
                      .reduce((acc, t) => acc + t.valor, 0);
                    const pct = Math.min(100, Math.round((gastoAtual / orc.limite) * 100));
                    const estourou = gastoAtual > orc.limite;

                    return (
                      <div
                        key={orc.categoria}
                        className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-4"
                      >
                        <div className="flex justify-between text-xs mb-2">
                          <span className="font-semibold text-zinc-200">{orc.categoria}</span>
                          <span className={estourou ? 'text-rose-400 font-bold' : 'text-zinc-400'}>
                            {formatarMoeda(gastoAtual)} / {formatarMoeda(orc.limite)}
                          </span>
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
            </div>
          )}

          {/* ABA 4: ANÁLISE */}
          {abaAtiva === 'graficos' && (
            <div className="space-y-5 max-w-3xl">
              <h2 className="text-lg font-bold">Análise de Gastos por Categoria</h2>
              {gastosPorCategoria.length === 0 ? (
                <p className="text-sm text-zinc-500 py-8 text-center">Sem despesas neste mês.</p>
              ) : (
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                  {gastosPorCategoria.map((item) => {
                    const pct = Math.round((item.total / resumoMes.despesas) * 100) || 0;
                    return (
                      <div key={item.categoria} className="space-y-1.5">
                        <div className="flex justify-between text-xs md:text-sm">
                          <span className="font-medium text-zinc-200">{item.categoria}</span>
                          <span className="text-zinc-400">
                            <strong className="text-zinc-100">{formatarMoeda(item.total)}</strong> ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>

        {/* ==================== BOTTOM NAVIGATION MOBILE ==================== */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800/80">
          <div className="w-full px-1 h-16 grid grid-cols-5 items-center relative">
            <button
              onClick={() => setAbaAtiva('home')}
              className={`flex flex-col items-center justify-center h-full gap-1 text-[10px] transition cursor-pointer ${
                abaAtiva === 'home' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <Home size={19} />
              <span>Início</span>
            </button>

            <button
              onClick={() => setAbaAtiva('extrato')}
              className={`flex flex-col items-center justify-center h-full gap-1 text-[10px] transition cursor-pointer ${
                abaAtiva === 'extrato' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <List size={19} />
              <span>Extrato</span>
            </button>

            {/* BOTÃO CENTRAL DE NOVO LANÇAMENTO */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => {
                  setTransacaoEditando(null);
                  setModalAberto(true);
                }}
                className="-top-4 relative w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/25 flex items-center justify-center transition transform active:scale-95 cursor-pointer"
              >
                <Plus size={26} strokeWidth={2.5} />
              </button>
            </div>

            <button
              onClick={() => setAbaAtiva('enxoval')}
              className={`flex flex-col items-center justify-center h-full gap-1 text-[10px] transition cursor-pointer ${
                abaAtiva === 'enxoval' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <Package size={19} />
              <span>Enxoval</span>
            </button>

            <button
              onClick={() => setAbaAtiva('metas')}
              className={`flex flex-col items-center justify-center h-full gap-1 text-[10px] transition cursor-pointer ${
                abaAtiva === 'metas' ? 'text-emerald-400 font-semibold' : 'text-zinc-500'
              }`}
            >
              <Target size={19} />
              <span>Poupança</span>
            </button>
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
          onSalvar={handleSalvarTransacao}
        />

        <ModalConfigCasal
          aberto={modalConfigAberto}
          onFechar={() => setModalConfigAberto(false)}
          pessoa1={pessoa1}
          pessoa2={pessoa2}
          onSalvarNomes={(novoP1, novoP2) => salvarConfigCasal(metaPoupanca, novoP1, novoP2)}
        />
      </div>
    </div>
  );
}