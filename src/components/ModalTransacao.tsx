import React, { useState, useEffect } from 'react';

import { X, Users, User } from 'lucide-react';
import {
  type Transaction,
  type TransactionType,
  type PaymentMethod,
  CATEGORIAS_DESPESA,
  CATEGORIAS_RECEITA,
  CATEGORIAS_POUPANCA,
  CATEGORIAS_RESGATE,
  obterDataHojeLocal,
} from '../types';


interface ModalTransacaoProps {
  aberto: boolean;
  onFechar: () => void;
  pessoa1: string;
  pessoa2: string;
  salvando: boolean;
  transacaoEditando: Transaction | null;
  tipoInicial?: TransactionType;
  onSalvar: (dados: {
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
  }) => Promise<void>;
}

export function ModalTransacao({
  aberto,
  onFechar,
  pessoa1,
  pessoa2,
  salvando,
  transacaoEditando,
  tipoInicial = 'despesa',
  onSalvar,
}: ModalTransacaoProps) {
  const [tipo, setTipo] = useState<TransactionType>('despesa');
  const [responsavel, setResponsavel] = useState<string>(pessoa1);
  const [valor, setValor] = useState('');
  const [local, setLocal] = useState('');
  const [data, setData] = useState(() => obterDataHojeLocal());
  const [categoria, setCategoria] = useState(CATEGORIAS_DESPESA[0]);
  const [tags, setTags] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState<PaymentMethod>('Pix/Débito');
  const [parcelas, setParcelas] = useState(1);

  const obterCategoriaPadrao = (t: TransactionType) => {
    if (t === 'despesa') return CATEGORIAS_DESPESA[0];
    if (t === 'receita') return CATEGORIAS_RECEITA[0];
    if (t === 'poupanca') return CATEGORIAS_POUPANCA[0];
    return CATEGORIAS_RESGATE[0];
  };

  useEffect(() => {
    if (aberto && transacaoEditando) {
      setTipo(transacaoEditando.tipo);
      setResponsavel(transacaoEditando.responsavel);
      setValor(transacaoEditando.valor.toString().replace('.', ','));
      setLocal(transacaoEditando.local);
      setData(transacaoEditando.data);
      setCategoria(transacaoEditando.categoria);
      setTags(transacaoEditando.tags.map((t) => t.replace(/^#/, '')).join(', '));
      setMetodoPagamento(transacaoEditando.metodoPagamento);
      setParcelas(1);
    } else if (aberto && !transacaoEditando) {
      setTipo(tipoInicial);
      setValor('');
      setLocal('');
      setData(obterDataHojeLocal());
      setCategoria(obterCategoriaPadrao(tipoInicial));
      setTags('');
      setMetodoPagamento('Pix/Débito');
      setParcelas(1);
    }
  }, [aberto, transacaoEditando, tipoInicial]);

  const handleTrocarTipo = (novoTipo: TransactionType) => {
    setTipo(novoTipo);
    setCategoria(obterCategoriaPadrao(novoTipo));
  };

  if (!aberto) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (salvando) return;

    const valorLimpo = valor.includes(',')
      ? valor.replace(/\./g, '').replace(',', '.')
      : valor;
    const valorNumerico = parseFloat(valorLimpo);

    if (isNaN(valorNumerico) || valorNumerico <= 0 || !local.trim()) {
      alert('Preencha um valor válido e a descrição do lançamento.');
      return;
    }

    const listaTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .map((tag) => (tag.startsWith('#') ? tag : `#${tag}`));

    await onSalvar({
      id: transacaoEditando?.id,
      tipo,
      responsavel,
      valor: valorNumerico,
      data,
      local: local.trim(),
      categoria,
      tags: listaTags,
      metodoPagamento,
      parcelas,
    });
  };

  const listaCategoriasAtuais =
    tipo === 'despesa'
      ? CATEGORIAS_DESPESA
      : tipo === 'receita'
      ? CATEGORIAS_RECEITA
      : tipo === 'poupanca'
      ? CATEGORIAS_POUPANCA
      : CATEGORIAS_RESGATE;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 md:p-6 space-y-4 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base md:text-lg text-white">
            {transacaoEditando ? 'Editar Lançamento' : 'Novo Lançamento'}
          </h3>
          <button
            onClick={onFechar}
            className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* TIPO (AGORA COM 4 OPÇÕES INCLUINDO RETIRAR DA POUPANÇA) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
          <button
            type="button"
            onClick={() => handleTrocarTipo('despesa')}
            className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              tipo === 'despesa' ? 'bg-rose-500 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Gastei
          </button>
          <button
            type="button"
            onClick={() => handleTrocarTipo('receita')}
            className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              tipo === 'receita'
                ? 'bg-emerald-500 text-zinc-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Recebi
          </button>
          <button
            type="button"
            onClick={() => handleTrocarTipo('poupanca')}
            className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              tipo === 'poupanca'
                ? 'bg-sky-500 text-zinc-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Guardei
          </button>
          <button
            type="button"
            onClick={() => handleTrocarTipo('resgate_poupanca')}
            className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              tipo === 'resgate_poupanca'
                ? 'bg-amber-500 text-zinc-950'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Tirei Poupança
          </button>
        </div>

        {/* RESPONSÁVEL */}
        <div>
          <label className="text-xs text-zinc-400 font-medium">
            {tipo === 'resgate_poupanca'
              ? 'Quem retirou da poupança?'
              : 'De quem é esse registro?'}
          </label>
          <div className="grid grid-cols-3 gap-2 mt-1.5">
            {[pessoa1, pessoa2, 'Casal'].map((resp) => (
              <button
                type="button"
                key={resp}
                onClick={() => setResponsavel(resp)}
                className={`py-2 px-3 rounded-xl text-xs md:text-sm font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  responsavel === resp
                    ? 'bg-zinc-100 text-zinc-950 border-white'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {resp === 'Casal' ? <Users size={14} /> : <User size={14} />}
                <span className="truncate">{resp}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 font-medium">Valor (R$)</label>
              <input
                type="text"
                inputMode="decimal"
                required
                placeholder="Ex: 150,00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 font-medium">Data</label>
              <input
                type="date"
                required
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-medium">
              {tipo === 'resgate_poupanca'
                ? 'Motivo da Retirada / Onde foi usado'
                : 'Onde foi / Descrição'}
            </label>
            <input
              type="text"
              required
              placeholder={
                tipo === 'resgate_poupanca'
                  ? 'Ex: Compra da geladeira à vista, Imprevisto...'
                  : 'Ex: Supermercado, iFood, Salário...'
              }
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 font-medium">Categoria</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
              >
                {listaCategoriasAtuais.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium">Método</label>
              <select
                value={metodoPagamento}
                onChange={(e) => setMetodoPagamento(e.target.value as PaymentMethod)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Pix/Débito">Pix / Débito</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>
            </div>
          </div>

          {!transacaoEditando && tipo === 'despesa' && metodoPagamento === 'Cartão de Crédito' && (
            <div>
              <label className="text-xs text-zinc-400 font-medium">Parcelas</label>
              <input
                type="number"
                min={1}
                max={24}
                value={parcelas}
                onChange={(e) => setParcelas(Number(e.target.value))}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-white"
              />
            </div>
          )}

          <div>
            <label className="text-xs text-zinc-400 font-medium">Tags (opcional)</label>
            <input
              type="text"
              placeholder="Ex: ifood, casamento, fds"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={salvando}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-bold py-3 rounded-xl text-sm transition cursor-pointer"
          >
            {salvando
              ? 'Salvando...'
              : transacaoEditando
              ? 'Salvar Alterações'
              : 'Salvar Lançamento'}
          </button>
        </form>
      </div>
    </div>
  );
}