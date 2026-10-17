import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import {
  Package,
  Plus,
  Upload,
  Search,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
  Home as HomeIcon,
  AlertCircle,
  X,
  Sparkles,
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
  onImportarEmLote: (novosItens: EnxovalItem[]) => Promise<void>;
  onAlternarComprado: (item: EnxovalItem) => Promise<void>;
  onExcluirItem: (id: string) => Promise<void>;
}

export function AbaEnxoval({
  itens,
  onSalvarItem,
  onImportarEmLote,
  onAlternarComprado,
  onExcluirItem,
}: AbaEnxovalProps) {
  const [comodoFiltro, setComodoFiltro] = useState<string>('Todos');
  const [statusFiltro, setStatusFiltro] = useState<'todos' | 'comprados' | 'pendentes'>('todos');
  const [busca, setBusca] = useState('');

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

  const [importando, setImportando] = useState(false);
  const [msgImportacao, setMsgImportacao] = useState<string | null>(null);

  // Lista dinâmica de cômodos (une os padrões com qualquer cômodo novo vindo da planilha)
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

  // ============================================================================
  // ALGORITMO INTELIGENTE DE LEITURA DE PLANILHA (.XLSX, .XLS, .CSV)
  // ============================================================================
  const normalizarTexto = (txt: any) =>
    String(txt ?? '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const extrairNumero = (val: any): number => {
    if (typeof val === 'number') return val;
    const str = String(val ?? '')
      .replace(/R\$/gi, '')
      .replace(/\s/g, '')
      .trim();
    if (!str) return 0;
    const limpo = str.includes(',') ? str.replace(/\./g, '').replace(',', '.') : str;
    const num = parseFloat(limpo);
    return isNaN(num) ? 0 : num;
  };

  const interpretarPrioridade = (val: any): PrioridadeItem => {
    const t = normalizarTexto(val);
    if (t.includes('alt') || t.includes('urgent') || t === '1' || t.includes('essencial')) {
      return 'Alta';
    }
    if (t.includes('baix') || t === '3' || t.includes('depois')) {
      return 'Baixa';
    }
    return 'Média';
  };

  const interpretarComprado = (val: any): boolean => {
    if (typeof val === 'boolean') return val;
    const t = normalizarTexto(val);
    return (
      t === 'sim' ||
      t === 's' ||
      t === 'ok' ||
      t === 'x' ||
      t === 'comprado' ||
      t === 'ja temos' ||
      t === 'tenho' ||
      t === 'true' ||
      t === '1' ||
      t === 'feito' ||
      t.includes('comprad')
    );
  };

  const handleUploadPlanilha = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportando(true);
    setMsgImportacao(null);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const itensExtraidos: EnxovalItem[] = [];

      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const linhas: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

        // Define o cômodo inicial pelo nome da aba (se não for genérico como "Planilha1" ou "Página1")
        let comodoAtual =
          /^(planilha|sheet|pagina|aba)\s*\d*$/i.test(sheetName.trim())
            ? 'Cozinha'
            : sheetName.trim();

        // Índices das colunas detectadas
        let colItem = -1;
        let colQtd = -1;
        let colValor = -1;
        let colPrio = -1;
        let colObs = -1;
        let colComprado = -1;
        let colComodo = -1;

        for (let r = 0; r < linhas.length; r++) {
          const linha = linhas[r];
          const celulasPreenchidas = linha.filter((c) => String(c).trim() !== '');
          if (celulasPreenchidas.length === 0) continue;

          const textosNorm = linha.map(normalizarTexto);

          // 1. Verifica se esta linha é um cabeçalho de tabela (contém "item"/"produto" e "qtd"/"valor"/"comprado")
          const idxItem = textosNorm.findIndex(
            (t) => t === 'item' || t === 'itens' || t === 'produto' || t === 'nome' || t === 'descricao'
          );
          const temOutrasColunas = textosNorm.some(
            (t) =>
              t.includes('quant') ||
              t.includes('qtd') ||
              t.includes('valor') ||
              t.includes('preco') ||
              t.includes('prioridade') ||
              t.includes('comprado') ||
              t.includes('status')
          );

          if (idxItem !== -1 && temOutrasColunas) {
            colItem = idxItem;
            colQtd = textosNorm.findIndex((t) => t.includes('quant') || t.includes('qtd') || t === 'un');
            colValor = textosNorm.findIndex(
              (t) => t.includes('valor') || t.includes('preco') || t.includes('custo') || t.includes('total')
            );
            colPrio = textosNorm.findIndex((t) => t.includes('prioridade') || t.includes('urgencia'));
            colObs = textosNorm.findIndex((t) => t.includes('obs') || t.includes('nota') || t.includes('detalhe'));
            colComprado = textosNorm.findIndex(
              (t) => t.includes('comprado') || t.includes('status') || t.includes('ja tem') || t.includes('ok')
            );
            colComodo = textosNorm.findIndex((t) => t.includes('comodo') || t.includes('ambiente'));

            // Olha a linha imediatamente acima para ver se tinha o título do Cômodo (Ex: "COZINHA")
            if (r > 0) {
              const linhaAnterior = linhas[r - 1].filter((c) => String(c).trim() !== '');
              if (linhaAnterior.length === 1) {
                const possivelComodo = String(linhaAnterior[0]).trim();
                if (possivelComodo.length > 2 && possivelComodo.length < 35) {
                  comodoAtual = possivelComodo;
                }
              }
            }
            continue;
          }

          // 2. Se a linha tem apenas 1 célula preenchida, pode ser um divisor de cômodo (ex: "SALA", "QUARTO")
          if (celulasPreenchidas.length === 1) {
            const textoUnico = String(celulasPreenchidas[0]).trim();
            if (
              textoUnico.length >= 3 &&
              textoUnico.length <= 30 &&
              !/total|subtotal|resumo/i.test(textoUnico)
            ) {
              comodoAtual =
                textoUnico.charAt(0).toUpperCase() + textoUnico.slice(1).toLowerCase();
            }
            continue;
          }

          // 3. Se já encontramos um cabeçalho válido, lemos a linha como um item do enxoval!
          if (colItem !== -1) {
            const nomeDoItem = String(linha[colItem] ?? '').trim();
            if (
              !nomeDoItem ||
              /^(total|subtotal|soma|item|produto)$/i.test(nomeDoItem)
            ) {
              continue;
            }

            const qtd = colQtd !== -1 ? Math.max(1, Math.round(extrairNumero(linha[colQtd]) || 1)) : 1;
            const valor = colValor !== -1 ? extrairNumero(linha[colValor]) : 0;
            const prioridade = colPrio !== -1 ? interpretarPrioridade(linha[colPrio]) : 'Média';
            const observacao = colObs !== -1 ? String(linha[colObs] ?? '').trim() : '';
            const comprado = colComprado !== -1 ? interpretarComprado(linha[colComprado]) : false;
            const comodoLinha =
              colComodo !== -1 && String(linha[colComodo]).trim()
                ? String(linha[colComodo]).trim()
                : comodoAtual;

            itensExtraidos.push({
              id: `${Date.now()}-${itensExtraidos.length}-${Math.random().toString(36).slice(2, 6)}`,
              comodo: comodoLinha,
              item: nomeDoItem,
              quantidade: qtd,
              valor,
              prioridade,
              observacao,
              comprado,
            });
          }
        }
      });

      if (itensExtraidos.length === 0) {
        alert(
          'Não encontramos itens com as colunas esperadas (Item, Quantidade, Valor, Prioridade, Observação, Comprado). Verifique se a primeira linha da tabela tem esses títulos!'
        );
      } else {
        await onImportarEmLote(itensExtraidos);
        setMsgImportacao(`🎉 ${itensExtraidos.length} itens importados da planilha com sucesso!`);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao ler o arquivo da planilha. Tente salvar como .xlsx ou .csv.');
    } finally {
      setImportando(false);
      e.target.value = '';
    }
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
      {/* CABEÇALHO E BOTÕES DE AÇÃO (NOVO ITEM + IMPORTAR PLANILHA) */}
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
          <label className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition">
            <Upload size={15} className="text-sky-400" />
            <span>{importando ? 'Lendo planilha...' : 'Importar Planilha'}</span>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleUploadPlanilha}
              disabled={importando}
              className="hidden"
            />
          </label>

          <button
            onClick={abrirModalNovo}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            Novo Item
          </button>
        </div>
      </div>

      {msgImportacao && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            <Sparkles size={15} /> {msgImportacao}
          </span>
          <button onClick={() => setMsgImportacao(null)} className="text-emerald-400">
            <X size={15} />
          </button>
        </div>
      )}

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
            Clique em "Importar Planilha" no topo para carregar sua tabela do Excel/Sheets ou em "+ Novo Item".
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
                  <button
                    onClick={() => onExcluirItem(item.id)}
                    className="text-zinc-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-zinc-800/60 transition cursor-pointer"
                    title="Excluir item"
                  >
                    <Trash2 size={14} />
                  </button>
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