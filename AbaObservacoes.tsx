import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  CheckCircle2,
  Clock,
  Pencil,
  Trash2,
  User,
  Users,
  Calendar,
  X,
  DollarSign,
} from 'lucide-react';
import {
  type ObservacaoMes,
  formatarMoeda,
  formatarDataBR,
  nomeMesAno,
  obterDataHojeLocal,
} from '../types';

interface AbaObservacoesProps {
  mesSelecionado: string;
  observacoes: ObservacaoMes[];
  pessoa1: string;
  pessoa2: string;
  onSalvarObservacao: (obs: ObservacaoMes) => Promise<void>;
  onAlternarResolvido: (obs: ObservacaoMes) => Promise<void>;
  onExcluirObservacao: (id: string) => Promise<void>;
}

export function AbaObservacoes({
  mesSelecionado,
  observacoes,
  pessoa1,
  pessoa2,
  onSalvarObservacao,
  onAlternarResolvido,
  onExcluirObservacao,
}: AbaObservacoesProps) {
  const [modalAberto, setModalAberto] = useState(false);
  const [obsEditando, setObsEditando] = useState<ObservacaoMes | null>(null);
  const [idConfirmandoExclusao, setIdConfirmandoExclusao] = useState<string | null>(null);

  const [autorForm, setAutorForm] = useState<string>(pessoa1);
  const [tituloForm, setTituloForm] = useState('');
  const [textoForm, setTextoForm] = useState('');
  const [valorForm, setValorForm] = useState('');
  const [resolvidoForm, setResolvidoForm] = useState(false);

  useEffect(() => {
    if (!idConfirmandoExclusao) return;
    const timer = setTimeout(() => setIdConfirmandoExclusao(null), 3000);
    return () => clearTimeout(timer);
  }, [idConfirmandoExclusao]);

  const obsDoMes = observacoes.filter((o) => o.mes === mesSelecionado);

  const abrirModalNova = () => {
    setObsEditando(null);
    setAutorForm(pessoa1);
    setTituloForm('');
    setTextoForm('');
    setValorForm('');
    setResolvidoForm(false);
    setModalAberto(true);
  };

  const abrirModalEditar = (obs: ObservacaoMes) => {
    setObsEditando(obs);
    setAutorForm(obs.autor);
    setTituloForm(obs.titulo);
    setTextoForm(obs.texto);
    setValorForm(obs.valor ? String(obs.valor).replace('.', ',') : '');
    setResolvidoForm(obs.resolvido);
    setModalAberto(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tituloForm.trim() || !textoForm.trim()) return;

    const valorLimpo = valorForm.includes(',')
      ? valorForm.replace(/\./g, '').replace(',', '.')
      : valorForm;
    const valorNum = parseFloat(valorLimpo) || 0;

    const novaObs: ObservacaoMes = {
      id: obsEditando ? obsEditando.id : `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      mes: mesSelecionado,
      autor: autorForm,
      titulo: tituloForm.trim(),
      texto: textoForm.trim(),
      valor: valorNum > 0 ? valorNum : undefined,
      resolvido: resolvidoForm,
      dataCriacao: obsEditando ? obsEditando.dataCriacao : obterDataHojeLocal(),
    };

    await onSalvarObservacao(novaObs);
    setModalAberto(false);
  };

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <FileText className="text-emerald-400" size={22} />
            Observações de {nomeMesAno(mesSelecionado)}
          </h2>
          <p className="text-xs text-zinc-400">
            Anote acontecimentos atípicos do mês: cartão emprestado, Pix recebidos, acordos ou lembretes
          </p>
        </div>

        <button
          onClick={abrirModalNova}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition cursor-pointer shrink-0"
        >
          <Plus size={17} strokeWidth={2.5} />
          Nova Observação
        </button>
      </div>

      {/* RESUMO RÁPIDO DAS NOTAS DO MÊS */}
      {obsDoMes.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3.5">
            <span className="text-[11px] text-zinc-400 block">Notas no Mês</span>
            <strong className="text-base text-white">{obsDoMes.length} registro(s)</strong>
          </div>
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3.5">
            <span className="text-[11px] text-amber-400 block">Pendentes / A cobrar</span>
            <strong className="text-base text-amber-300">
              {obsDoMes.filter((o) => !o.resolvido).length} pendente(s)
            </strong>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-zinc-900/70 border border-zinc-800 rounded-xl p-3.5">
            <span className="text-[11px] text-emerald-400 block">Valor Envolvido (Pendentes)</span>
            <strong className="text-base text-white">
              {formatarMoeda(
                obsDoMes
                  .filter((o) => !o.resolvido)
                  .reduce((acc, o) => acc + (o.valor || 0), 0)
              )}
            </strong>
          </div>
        </div>
      )}

      {/* LISTA DE OBSERVAÇÕES */}
      {obsDoMes.length === 0 ? (
        <div className="text-center py-14 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6">
          <FileText size={34} className="mx-auto text-zinc-600 mb-2.5" />
          <p className="text-sm text-zinc-300 font-medium">
            Nenhuma observação registrada em {nomeMesAno(mesSelecionado)}.
          </p>
          <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
            Emprestou o cartão para alguém? Recebeu um Pix diferente ou teve algum gasto fora do comum? Clique em "+ Nova Observação" para deixar registrado!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {obsDoMes.map((obs) => {
            const corAutor =
              obs.autor === pessoa1
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                : obs.autor === 'Casal'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-pink-500/20 text-pink-300 border-pink-500/30';

            return (
              <div
                key={obs.id}
                className={`border rounded-2xl p-4 md:p-5 flex flex-col justify-between gap-3 transition ${
                  obs.resolvido
                    ? 'bg-emerald-950/10 border-emerald-900/40 opacity-85'
                    : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${corAutor}`}
                      >
                        {obs.autor}
                      </span>
                      <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                        <Calendar size={11} /> {formatarDataBR(obs.dataCriacao)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => abrirModalEditar(obs)}
                        className="text-zinc-500 hover:text-emerald-400 p-1.5 rounded-lg hover:bg-zinc-800/60 transition cursor-pointer"
                        title="Editar observação"
                      >
                        <Pencil size={14} />
                      </button>
                      {idConfirmandoExclusao === obs.id ? (
                        <button
                          onClick={() => onExcluirObservacao(obs.id)}
                          className="text-[10px] font-bold bg-rose-500 text-white px-2 py-1 rounded-lg hover:bg-rose-400 transition cursor-pointer"
                        >
                          Apagar?
                        </button>
                      ) : (
                        <button
                          onClick={() => setIdConfirmandoExclusao(obs.id)}
                          className="text-zinc-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-zinc-800/60 transition cursor-pointer"
                          title="Excluir observação"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  <h3
                    className={`font-bold text-base ${
                      obs.resolvido ? 'line-through text-zinc-400' : 'text-white'
                    }`}
                  >
                    {obs.titulo}
                  </h3>

                  <p className="text-xs md:text-sm text-zinc-300 whitespace-pre-line leading-relaxed bg-zinc-950/60 border border-zinc-800/70 rounded-xl p-3">
                    {obs.texto}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                  {obs.valor && obs.valor > 0 ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <DollarSign size={13} /> Valor: {formatarMoeda(obs.valor)}
                    </span>
                  ) : (
                    <span className="text-[11px] text-zinc-500">Anotação geral</span>
                  )}

                  <button
                    onClick={() => onAlternarResolvido(obs)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      obs.resolvido
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                    }`}
                  >
                    {obs.resolvido ? (
                      <>
                        <CheckCircle2 size={14} /> Resolvido / Pago
                      </>
                    ) : (
                      <>
                        <Clock size={14} /> Pendente (Marcar resolvido)
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL PARA CRIAR / EDITAR OBSERVAÇÃO DO MÊS */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 md:p-6 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base md:text-lg text-white">
                {obsEditando ? 'Editar Observação' : `Nova Observação (${nomeMesAno(mesSelecionado)})`}
              </h3>
              <button
                onClick={() => setModalAberto(false)}
                className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs text-zinc-400 font-medium">Quem está anotando?</label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {[pessoa1, pessoa2, 'Casal'].map((resp) => (
                    <button
                      type="button"
                      key={resp}
                      onClick={() => setAutorForm(resp)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        autorForm === resp
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

              <div>
                <label className="text-xs text-zinc-400 font-medium">Título / Resumo curto</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Emprestei cartão pro meu irmão / Pix extra..."
                  value={tituloForm}
                  onChange={(e) => setTituloForm(e.target.value)}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium">
                  Detalhes da Observação
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Escreva todos os detalhes aqui para vocês lembrarem depois..."
                  value={textoForm}
                  onChange={(e) => setTextoForm(e.target.value)}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium">
                  Valor envolvido em R$ (opcional - ex: valor a receber)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex: 120,00 (deixe em branco se não houver)"
                  value={valorForm}
                  onChange={(e) => setValorForm(e.target.value)}
                  className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <label className="flex items-center gap-2.5 bg-zinc-950 border border-zinc-800 rounded-xl p-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={resolvidoForm}
                  onChange={(e) => setResolvidoForm(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500"
                />
                <span className="text-xs md:text-sm font-semibold text-zinc-200">
                  Já está resolvido / já foi pago
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-xl text-sm transition cursor-pointer"
              >
                {obsEditando ? 'Salvar Alterações' : 'Postar Observação no Mês'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
