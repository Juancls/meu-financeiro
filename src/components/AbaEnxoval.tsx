import React, { useState, useMemo, useEffect } from 'react';
import {
  Package,
  Plus,
  Search,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
  Home as HomeIcon,
  AlertCircle,
  X,
} from 'lucide-react';
import {
  type EnxovalItem,
  type PrioridadeItem,
  COMODOS_PADRAO,
  formatarMoeda,
} from '../types';

interface AbaEnxovalProps {
  itens: EnxovalItem[];
  onSalvarItem: (item: EnxovalItem) => Promise<void>;
  onAlternarComprado: (item: EnxovalItem) => Promise<void>;
  onExcluirItem: (id: string) => Promise<void>;
}

export function AbaEnxoval({
  itens,
  onSalvarItem,
  onAlternarComprado,
  onExcluirItem,
}: AbaEnxovalProps) {
  const [comodoFiltro, setComodoFiltro] = useState<string>('Todos');
  const [statusFiltro, setStatusFiltro] = useState<'todos' | 'comprados' | 'pendentes'>('todos');
  const [busca, setBusca] = useState('');
  const [idConfirmandoExclusao, setIdConfirmandoExclusao] = useState<string | null>(null);

  // Modal de Criar / Editar Item
  const [modalItemAberto, setModalItemAberto] = useState(false);
  const [itemEditando, setItemEditando] = useState<EnxovalItem | null>(null);

  const [comodoForm, setComodoForm] = useState('Cozinha');
  const [nomeItemForm, setNomeItemForm] = useState('');
  const [qtdForm, setQtdForm] = useState('1');
  const [valorForm, setValorForm] = useState('');
  const [prioridadeForm, setPrioridadeForm] = useState<PrioridadeItem>('Média');
  const [obsForm, setObsForm] = useState('');
  const [compradoForm, setCompradoForm] = useState(false);

  useEffect(() => {
    if (!idConfirmandoExclusao) return;
    const timer = setTimeout(() => setIdConfirmandoExclusao(null), 3000);
    return () => clearTimeout(timer);
  }, [idConfirmandoExclusao]);

  // Lista dinâmica de cômodos
  const listaComodos = useMemo(() => {
    const conjunto = new Set<string>(COMODOS_PADRAO);
    itens.forEach((i) => {
      if (i.comodo) conjunto.add(i.comodo);
    });
    return Array.from(conjunto);
  }, [itens]);

  // Estatísticas do Enxoval
  const estatisticas = useMemo(() => {
    const totalItens = itens.length;
    const comprados = itens.filter((i) => i.comprado).length;
    const pendentes = totalItens - comprados;
    const progresso = totalItens > 0 ? Math.round((comprados / totalItens) * 100) : 0;

    const valorJaComprado = itens
      .filter((i) => i.comprado)
      .reduce((acc, i) => acc + i.valor * (i.quantidade || 1), 0);

    const valorFaltaComprar = itens
      .filter((i) => !i.comprado)
      .reduce((acc, i) => acc + i.valor * (i.quantidade || 1), 0);

    return { totalItens, comprados, pendentes, progresso, valorJaComprado, valorFaltaComprar };
  }, [itens]);

  const abrirModalNovo = () => {
    setItemEditando(null);
    setComodoForm(comodoFiltro !== 'Todos' ? comodoFiltro : 'Cozinha');
    setNomeItemForm('');
    setQtdForm('1');
    setValorForm('');
    setPrioridadeForm('Média');
    setObsForm('');
    setCompradoForm(false);
    setModalItemAberto(true);
  };

  const abrirModalEditar = (item: EnxovalItem) => {
    setItemEditando(item);
    setComodoForm(item.comodo);
    setNomeItemForm(item.item);
    setQtdForm(String(item.quantidade));
    setValorForm(item.valor ? String(item.valor).replace('.', ',') : '');
    setPrioridadeForm(item.prioridade);
    setObsForm(item.observacao || '');
    setCompradoForm(item.comprado);
    setModalItemAberto(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeItemForm.trim()) return;

    const valorLimpo = valorForm.includes(',')
      ? valorForm.replace(/\./g, '').replace(',', '.')
      : valorForm;
    const valorNum = parseFloat(valorLimpo) || 0;
    const qtdNum = Math.max(1, parseInt(qtdForm, 10) || 1);

    const novoItem: EnxovalItem = {
      id: itemEditando ? itemEditando.id : `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      comodo: comodoForm.trim() || 'Outros',
      item: nomeItemForm.trim(),
      quantidade: qtdNum,
      valor: valorNum,
      prioridade: prioridadeForm,
      observacao: obsForm.trim(),
      comprado: compradoForm,
    };

    await onSalvarItem(novoItem);
    setModalItemAberto(false);
  };

  // Filtragem dos itens na tela
  const itensFiltrados = useMemo(() => {
    return itens.filter((i) => {
      const bateComodo = comodoFiltro === 'Todos' || i.comodo.toLowerCase() === comodoFiltro.toLowerCase();
      const bateStatus =
        statusFiltro === 'todos' ||
        (statusFiltro === 'comprados' && i.comprado) ||
        (statusFiltro === 'pendentes' && !i.comprado);
      const termo = busca.toLowerCase();
      const bateBusca =
        i.item.toLowerCase().includes(termo) ||
        i.comodo.toLowerCase().includes(termo) ||
        (i.observacao && i.observacao.toLowerCase().includes(termo));

      return bateComodo && bateStatus && bateBusca;
    });
  }, [itens, comodoFiltro, statusFiltro, busca]);

  const corPrioridade = (prio: PrioridadeItem) => {
    if (prio === 'Alta') return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    if (prio === 'Baixa') return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
  };

  return (
    <div className="space-y-6">
      {/* CABEÇALHO E BOTÃO DE AÇÃO (NOVO ITEM) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <Package className="text-emerald-400" size={22} />
            Enxoval da Casa Nova
          </h2>
          <p className="text-xs text-zinc-400">
            Controle de tudo o que já temos e o que falta comprar por cômodo
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={abrirModalNovo}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            Novo Item
          </button>
        </div>
      </div>

      {/* PAINEL DE PROGRESSO DO ENXOVAL */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/30 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
              Progresso do Enxoval
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                {estatisticas.progresso}% Concluído
              </h3>
              <span className="text-xs text-emerald-400 font-medium">
                ({estatisticas.comprados} de {estatisticas.totalItens} itens comprados)
              </span>
            </div>
          </div>
        </div>

        <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${estatisticas.progresso}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-zinc-950/60 border border-zinc-800/70 rounded-xl p-3">
            <span className="text-[11px] text-emerald-400 font-medium block">Já Temos / Comprado</span>
            <strong className="text-sm md:text-base text-white mt-0.5 block">
              {formatarMoeda(estatisticas.valorJaComprado)}
            </strong>
          </div>
          <div className="bg-zinc-950/60 border border-zinc-800/70 rounded-xl p-3">
            <span className="text-[11px] text-amber-400 font-medium block">Falta Comprar (Estimado)</span>
            <strong className="text-sm md:text-base text-white mt-0.5 block">
              {formatarMoeda(estatisticas.valorFaltaComprar)}
            </strong>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-zinc-950/60 border border-zinc-800/70 rounded-xl p-3">
            <span className="text-[11px] text-sky-400 font-medium block">Itens Pendentes</span>
            <strong className="text-sm md:text-base text-white mt-0.5 block">
              {estatisticas.pendentes} item(ns)
            </strong>
          </div>
        </div>
      </div>

      {/* FILTRO DE CÔMODOS E BUSCA */}
      <div className="space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {['Todos', ...listaComodos].map((comodo) => (
            <button
              key={comodo}
              onClick={() => setComodoFiltro(comodo)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition shrink-0 cursor-pointer ${
                comodoFiltro === comodo
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {comodo}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar utensílio, roupa de cama, observação..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 shrink-0">
            {(
              [
                { id: 'todos', label: 'Todos' },
                { id: 'comprados', label: 'Já Temos' },
                { id: 'pendentes', label: 'Falta Comprar' },
              ] as const
            ).map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFiltro(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  statusFiltro === st.id ? 'bg-zinc-800 text-white' : 'text-zinc-400'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LISTAGEM DOS ITENS DO ENXOVAL */}
      {itensFiltrados.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6">
          <Package size={32} className="mx-auto text-zinc-600 mb-2" />
          <p className="text-sm text-zinc-300 font-medium">Nenhum item encontrado neste filtro.</p>
          <p className="text-xs text-zinc-500 mt-1">
            Clique em "+ Novo Item" no topo para cadastrar um item no enxoval.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {itensFiltrados.map((item) => (
            <div
              key={item.id}
              className={`border rounded-xl p-3.5 md:p-4 flex items-start justify-between gap-3 transition ${
                item.comprado
                  ? 'bg-emerald-950/15 border-emerald-900/40'
                  : 'bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <button
                  onClick={() => onAlternarComprado(item)}
                  className={`mt-0.5 shrink-0 transition cursor-pointer ${
                    item.comprado ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                  title={item.comprado ? 'Marcar como pendente' : 'Marcar como já comprado'}
                >
                  {item.comprado ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      className={`font-semibold text-sm md:text-base truncate ${
                        item.comprado ? 'line-through text-zinc-400' : 'text-zinc-100'
                      }`}
                    >
                      {item.quantidade > 1 ? `${item.quantidade}x ` : ''}
                      {item.item}
                    </p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${corPrioridade(
                        item.prioridade
                      )}`}
                    >
                      {item.prioridade}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 mt-1">
                    <span className="flex items-center gap-1 text-zinc-300 font-medium">
                      <HomeIcon size={12} className="text-emerald-400" /> {item.comodo}
                    </span>
                    <span>Qtd: {item.quantidade}</span>
                    {item.valor > 0 && (
                      <span>
                        Valor un.: <strong className="text-zinc-200">{formatarMoeda(item.valor)}</strong>
                      </span>
                    )}
                  </div>

                  {item.observacao && (
                    <p className="text-xs text-zinc-400 bg-zinc-950/60 border border-zinc-800/60 rounded-lg px-2.5 py-1.5 mt-2 flex items-start gap-1.5">
                      <AlertCircle size={12} className="text-sky-400 shrink-0 mt-0.5" />
                      <span>{item.observacao}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    item.comprado
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {item.comprado ? 'Comprado' : 'Falta'}
                </span>

                <div className="flex items-center gap-1 mt-2">
                  <button
                    onClick={() => abrirModalEditar(item)}
                    className="text-zinc-500 hover:text-emerald-400 p-1.5 rounded-lg hover:bg-zinc-800/60 transition cursor-pointer"
                    title="Editar item"
                  >
                    <Pencil size={14} />
                  </button>
                  {idConfirmandoExclusao === item.id ? (
                    <button
                      onClick={() => onExcluirItem(item.id)}
                      className="text-[10px] font-bold bg-rose-500 text-white px-2 py-1 rounded-lg hover:bg-rose-400 transition cursor-pointer"
                    >
                      Apagar?
                    </button>
                  ) : (
                    <button
                      onClick={() => setIdConfirmandoExclusao(item.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-zinc-800/60 transition cursor-pointer"
                      title="Excluir item"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DE ADICIONAR / EDITAR ITEM DO ENXOVAL */}
      {modalItemAberto && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 md:p-6 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base md:text-lg text-white">
                {itemEditando ? 'Editar Item do Enxoval' : 'Novo Item do Enxoval'}
              </h3>
              <button
                onClick={() => setModalItemAberto(false)}
                className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-medium">Cômodo</label>
                  <input
                    type="text"
                    list="lista-comodos"
                    required
                    value={comodoForm}
                    onChange={(e) => setComodoForm(e.target.value)}
                    placeholder="Ex: Cozinha, Quarto..."
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <datalist id="lista-comodos">
                    {listaComodos.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 font-medium">Prioridade</label>
                  <select
                    value={prioridadeForm}
                    onChange={(e) => setPrioridadeForm(e.target.value as PrioridadeItem)}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium">Nome do Item</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Jogo de Panelas, Jogo de Lençol Casal..."
                  value={nomeItemForm}
                  onChange={(e) => setNomeItemForm(e.target.value)}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-medium">Quantidade</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={qtdForm}
                    onChange={(e) => setQtdForm(e.target.value)}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-medium">Valor Estimado/Pago (R$)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0,00 (opcional)"
                    value={valorForm}
                    onChange={(e) => setValorForm(e.target.value)}
                    className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium">Observação (opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Cor inox, ganhamos de presente, link da loja..."
                  value={obsForm}
                  onChange={(e) => setObsForm(e.target.value)}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white"
                />
              </div>

              <label className="flex items-center gap-2.5 bg-zinc-950 border border-zinc-800 rounded-xl p-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={compradoForm}
                  onChange={(e) => setCompradoForm(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500"
                />
                <span className="text-xs md:text-sm font-semibold text-zinc-200">
                  Já temos / Já está comprado!
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-xl text-sm transition cursor-pointer"
              >
                {itemEditando ? 'Salvar Alterações' : 'Cadastrar no Enxoval'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
