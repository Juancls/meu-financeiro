import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowDownLeft,
  ArrowLeftRight,
  MapPin,
  Calendar,
  CreditCard,
  Tag,
  Trash2,
  Pencil,
  CheckSquare,
  Square,
} from 'lucide-react';
import { type Transaction, formatarMoeda, formatarDataBR } from '../types';

interface CardTransacaoProps {
  transacao: Transaction;
  pessoa1: string;
  onEditar: (transacao: Transaction) => void;
  onExcluir: (id: string) => void;
  modoSelecao?: boolean;
  selecionado?: boolean;
  onAlternarSelecao?: (id: string) => void;
}

export function CardTransacao({
  transacao,
  pessoa1,
  onEditar,
  onExcluir,
  modoSelecao = false,
  selecionado = false,
  onAlternarSelecao,
}: CardTransacaoProps) {
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);

  useEffect(() => {
    if (!confirmandoExclusao) return;
    const timer = setTimeout(() => setConfirmandoExclusao(false), 3000);
    return () => clearTimeout(timer);
  }, [confirmandoExclusao]);

  const isReceita = transacao.tipo === 'receita';
  const isPoupanca = transacao.tipo === 'poupanca';
  const isResgate = transacao.tipo === 'resgate_poupanca';
  const isTransferencia = transacao.tipo === 'transferencia_interna';

  const corBadgePessoa =
    transacao.responsavel === pessoa1
      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
      : transacao.responsavel === 'Casal'
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      : 'bg-pink-500/20 text-pink-300 border-pink-500/30';

  return (
    <div
      onClick={() => {
        if (modoSelecao && onAlternarSelecao) {
          onAlternarSelecao(transacao.id);
        }
      }}
      className={`border rounded-xl p-3.5 md:p-4 flex items-center justify-between gap-3 transition ${
        modoSelecao ? 'cursor-pointer' : ''
      } ${
        selecionado
          ? 'bg-emerald-950/25 border-emerald-500/60'
          : isTransferencia
          ? 'bg-zinc-900/40 border-zinc-800/60 opacity-85'
          : 'bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700/80'
      }`}
    >
      <div className="flex items-start gap-3 min-w-0">
        {modoSelecao && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAlternarSelecao?.(transacao.id);
            }}
            className="mt-2 shrink-0 text-emerald-400 cursor-pointer"
          >
            {selecionado ? <CheckSquare size={18} /> : <Square size={18} className="text-zinc-500" />}
          </button>
        )}

        <div
          className={`p-2.5 rounded-xl mt-0.5 shrink-0 ${
            isReceita
              ? 'bg-emerald-500/15 text-emerald-400'
              : isPoupanca
              ? 'bg-sky-500/15 text-sky-400'
              : isResgate
              ? 'bg-amber-500/15 text-amber-400'
              : isTransferencia
              ? 'bg-zinc-800 text-zinc-300'
              : 'bg-rose-500/15 text-rose-400'
          }`}
        >
          {isReceita ? (
            <TrendingUp size={18} />
          ) : isPoupanca ? (
            <PiggyBank size={18} />
          ) : isResgate ? (
            <ArrowDownLeft size={18} />
          ) : isTransferencia ? (
            <ArrowLeftRight size={18} />
          ) : (
            <TrendingDown size={18} />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="font-semibold text-sm md:text-base text-zinc-100 truncate">
              {transacao.local}
            </p>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold border ${corBadgePessoa}`}
            >
              {transacao.responsavel}
            </span>
            {isResgate && (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-semibold">
                Retirada Poupança
              </span>
            )}
            {isTransferencia && (
              <span className="text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700 px-1.5 py-0.5 rounded font-semibold">
                Movimentação (Neutro)
              </span>
            )}
            {transacao.parcelaInfo && (
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded font-semibold">
                {transacao.parcelaInfo}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 mt-1">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {transacao.categoria}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {formatarDataBR(transacao.data)}
            </span>
            <span className="flex items-center gap-1">
              <CreditCard size={12} /> {transacao.metodoPagamento}
            </span>
          </div>

          {transacao.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
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

      <div className="flex flex-col items-end shrink-0" onClick={(e) => e.stopPropagation()}>
        <span
          className={`font-bold text-sm md:text-base ${
            isReceita
              ? 'text-emerald-400'
              : isPoupanca
              ? 'text-sky-400'
              : isResgate
              ? 'text-amber-400'
              : isTransferencia
              ? 'text-zinc-300'
              : 'text-rose-400'
          }`}
        >
          {isTransferencia ? '⇄ ' : isReceita || isPoupanca ? '+ ' : '- '}
          {formatarMoeda(transacao.valor)}
        </span>

        {!modoSelecao && (
          <div className="flex items-center gap-1 mt-1">
            <button
              onClick={() => onEditar(transacao)}
              className="text-zinc-500 hover:text-emerald-400 p-1.5 transition rounded-lg hover:bg-zinc-800/60 cursor-pointer"
              title="Editar lançamento"
            >
              <Pencil size={14} />
            </button>
            {confirmandoExclusao ? (
              <button
                onClick={() => onExcluir(transacao.id)}
                className="text-[10px] font-bold bg-rose-500 text-white px-2 py-1 rounded-lg hover:bg-rose-400 transition cursor-pointer"
                title="Confirmar exclusão"
              >
                Apagar?
              </button>
            ) : (
              <button
                onClick={() => setConfirmandoExclusao(true)}
                className="text-zinc-500 hover:text-rose-400 p-1.5 transition rounded-lg hover:bg-zinc-800/60 cursor-pointer"
                title="Excluir lançamento"
              >
                <Trash2 size={15} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
