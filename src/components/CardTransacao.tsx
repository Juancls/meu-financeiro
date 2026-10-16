import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  MapPin,
  Calendar,
  CreditCard,
  Tag,
  Trash2,
} from 'lucide-react';
import { type Transaction, formatarMoeda, formatarDataBR } from '../types';

interface CardTransacaoProps {
  transacao: Transaction;
  pessoa1: string;
  onExcluir: (id: string) => void;
}

export function CardTransacao({ transacao, pessoa1, onExcluir }: CardTransacaoProps) {
  const isReceita = transacao.tipo === 'receita';
  const isPoupanca = transacao.tipo === 'poupanca';

  const corBadgePessoa =
    transacao.responsavel === pessoa1
      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
      : transacao.responsavel === 'Casal'
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      : 'bg-pink-500/20 text-pink-300 border-pink-500/30';

  return (
    <div className="bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl p-3.5 md:p-4 flex items-center justify-between gap-3 transition">
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
            <p className="font-semibold text-sm md:text-base text-zinc-100 truncate">
              {transacao.local}
            </p>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold border ${corBadgePessoa}`}
            >
              {transacao.responsavel}
            </span>
            {transacao.parcelaInfo && (
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded font-semibold">
                {transacao.parcelaInfo}
              </span>
            )}
            {transacao.pendenteSync && (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-semibold">
                Sincronizando...
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

      <div className="flex flex-col items-end shrink-0">
        <span
          className={`font-bold text-sm md:text-base ${
            isReceita ? 'text-emerald-400' : isPoupanca ? 'text-sky-400' : 'text-rose-400'
          }`}
        >
          {isReceita ? '+' : '-'} {formatarMoeda(transacao.valor)}
        </span>
        <button
          onClick={() => onExcluir(transacao.id)}
          className="text-zinc-500 hover:text-rose-400 p-1.5 mt-1 transition rounded-lg hover:bg-zinc-800/60"
          title="Excluir lançamento"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}