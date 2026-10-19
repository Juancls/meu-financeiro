import React, { useState } from 'react';
import { Wallet, Lock, UserCheck, Users, Sparkles } from 'lucide-react';
import { type AccountId } from '../types';

interface TelaLoginProps {
  onEntrar: (conta: AccountId) => void;
}

// ============================================================================
// CREDENCIAIS DOS 2 ACESSOS (Você pode alterar a senha aqui se quiser!)
// ============================================================================
const ACESSOS: Record<AccountId, { titulo: string; subtitulo: string; senha: string }> = {
  casal: {
    titulo: 'Juan & Esposa',
    subtitulo: 'Acesso Principal do Casal',
    senha: '123', // Senha para vocês dois
  },
  vitoria: {
    titulo: 'Vitória',
    subtitulo: 'Ambiente Financeiro Individual',
    senha: '123', // Senha para a Vitória
  },
};

export function TelaLogin({ onEntrar }: TelaLoginProps) {
  const [contaSelecionada, setContaSelecionada] = useState<AccountId>('casal');
  const [senhaInput, setSenhaInput] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (senhaInput.trim() === ACESSOS[contaSelecionada].senha) {
      setErro('');
      onEntrar(contaSelecionada);
    } else {
      setErro('Código de acesso incorreto. Tente novamente!');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
            <Wallet size={28} />
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            NossoFinanceiro
          </h1>
          <p className="text-xs text-zinc-400">
            Selecione quem está acessando para carregar suas informações
          </p>
        </div>

        {/* SELETOR DE PERFIL */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setContaSelecionada('casal');
              setErro('');
            }}
            className={`p-4 rounded-2xl border text-left transition flex flex-col gap-2 cursor-pointer ${
              contaSelecionada === 'casal'
                ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <Users
              size={22}
              className={contaSelecionada === 'casal' ? 'text-emerald-400' : 'text-zinc-500'}
            />
            <div>
              <p className="font-bold text-sm">Juan & Esposa</p>
              <p className="text-[11px] text-zinc-400">Conta do Casal</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setContaSelecionada('vitoria');
              setErro('');
            }}
            className={`p-4 rounded-2xl border text-left transition flex flex-col gap-2 cursor-pointer ${
              contaSelecionada === 'vitoria'
                ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <Sparkles
              size={22}
              className={contaSelecionada === 'vitoria' ? 'text-emerald-400' : 'text-zinc-500'}
            />
            <div>
              <p className="font-bold text-sm">Vitória</p>
              <p className="text-[11px] text-zinc-400">Conta Exclusiva</p>
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
              <Lock size={13} className="text-emerald-400" />
              Senha de acesso para <strong>{ACESSOS[contaSelecionada].titulo}</strong>
            </label>
            <input
              type="password"
              required
              placeholder="Digite a senha (padrão: 123)"
              value={senhaInput}
              onChange={(e) => setSenhaInput(e.target.value)}
              className="w-full mt-1.5 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            {erro && <p className="text-xs text-rose-400 mt-1.5 font-medium">{erro}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <UserCheck size={18} />
            Entrar como {ACESSOS[contaSelecionada].titulo}
          </button>
        </form>
      </div>
    </div>
  );
}