import React, { useState, useEffect } from 'react';
import {
  Wallet,
  Lock,
  UserCheck,
  Users,
  Sparkles,
  KeyRound,
  CheckCircle2,
  ArrowLeft,
  Sun,
  Moon,
} from 'lucide-react';
import { type AccountId } from '../types';
import { supabase } from '../supabaseClient';

interface TelaLoginProps {
  onEntrar: (conta: AccountId) => void;
  tema: 'escuro' | 'claro';
  onAlternarTema: () => void;
}

const INFO_CONTAS: Record<AccountId, { idBanco: number; titulo: string; subtitulo: string }> = {
  casal: {
    idBanco: 1,
    titulo: 'Juan & Esposa',
    subtitulo: 'Acesso Principal do Casal',
  },
  vitoria: {
    idBanco: 2,
    titulo: 'Vitória',
    subtitulo: 'Ambiente Financeiro Individual',
  },
};

// Código mestre caso alguém esqueça a própria senha
const CODIGO_MESTRE_RECUPERACAO = 'admin2026';

export function TelaLogin({ onEntrar, tema, onAlternarTema }: TelaLoginProps) {
  const [contaSelecionada, setContaSelecionada] = useState<AccountId>('casal');
  const [modoRedefinir, setModoRedefinir] = useState(false);

  // Estados de Login
  const [senhaInput, setSenhaInput] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [msgSucesso, setMsgSucesso] = useState('');

  // Estados de Redefinir Senha
  const [senhaAtualInput, setSenhaAtualInput] = useState('');
  const [novaSenhaInput, setNovaSenhaInput] = useState('');
  const [confirmarSenhaInput, setConfirmarSenhaInput] = useState('');

  // Senhas carregadas do banco (padrão '123' caso ainda não exista)
  const [senhasBanco, setSenhasBanco] = useState<Record<AccountId, string>>({
    casal: localStorage.getItem('@financas:senha_casal') || '123',
    vitoria: localStorage.getItem('@financas:senha_vitoria') || '123',
  });

  const buscarSenhasAtuais = async () => {
    if (!supabase) return;
    try {
      const { data } = await supabase.from('config_casal').select('id, senha');
      if (data) {
        const novas: Record<AccountId, string> = { ...senhasBanco };
        data.forEach((row: any) => {
          if (row.id === 1 && row.senha) {
            novas.casal = String(row.senha);
            localStorage.setItem('@financas:senha_casal', String(row.senha));
          }
          if (row.id === 2 && row.senha) {
            novas.vitoria = String(row.senha);
            localStorage.setItem('@financas:senha_vitoria', String(row.senha));
          }
        });
        setSenhasBanco(novas);
      }
    } catch {
      // Usa o cache local se estiver offline
    }
  };

  useEffect(() => {
    buscarSenhasAtuais();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMsgSucesso('');
    setCarregando(true);

    // Garante que pegou a senha mais recente da nuvem
    let senhaCorreta = senhasBanco[contaSelecionada];
    if (supabase) {
      const { data } = await supabase
        .from('config_casal')
        .select('senha')
        .eq('id', INFO_CONTAS[contaSelecionada].idBanco)
        .single();
      if (data?.senha) {
        senhaCorreta = String(data.senha);
      }
    }

    setCarregando(false);

    if (senhaInput.trim() === senhaCorreta) {
      onEntrar(contaSelecionada);
    } else {
      setErro('Senha incorreta. Tente novamente!');
    }
  };

  const handleRedefinirSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMsgSucesso('');

    const novaLimpa = novaSenhaInput.trim();
    if (novaLimpa.length < 3) {
      setErro('A nova senha deve ter pelo menos 3 caracteres.');
      return;
    }

    if (novaLimpa !== confirmarSenhaInput.trim()) {
      setErro('A confirmação da nova senha não confere.');
      return;
    }

    setCarregando(true);

    let senhaAtualReal = senhasBanco[contaSelecionada];
    if (supabase) {
      const { data } = await supabase
        .from('config_casal')
        .select('senha')
        .eq('id', INFO_CONTAS[contaSelecionada].idBanco)
        .single();
      if (data?.senha) {
        senhaAtualReal = String(data.senha);
      }
    }

    const digitada = senhaAtualInput.trim();
    if (digitada !== senhaAtualReal && digitada !== CODIGO_MESTRE_RECUPERACAO) {
      setCarregando(false);
      setErro('A senha atual digitada está incorreta.');
      return;
    }

    // Salva a nova senha no Supabase e no LocalStorage
    if (supabase) {
      const idBanco = INFO_CONTAS[contaSelecionada].idBanco;
      const { error } = await supabase
        .from('config_casal')
        .upsert({ id: idBanco, senha: novaLimpa }, { onConflict: 'id' });

      if (error) {
        setCarregando(false);
        setErro(`Erro ao salvar na nuvem: ${error.message}`);
        return;
      }
    }

    localStorage.setItem(`@financas:senha_${contaSelecionada}`, novaLimpa);
    setSenhasBanco((prev) => ({ ...prev, [contaSelecionada]: novaLimpa }));

    setCarregando(false);
    setSenhaAtualInput('');
    setNovaSenhaInput('');
    setConfirmarSenhaInput('');
    setModoRedefinir(false);
    setSenhaInput(novaLimpa);
    setMsgSucesso('Senha redefinida com sucesso! Agora é só clicar em Entrar.');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative">
        <button
          type="button"
          onClick={onAlternarTema}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-emerald-400 transition cursor-pointer flex items-center gap-1.5 text-xs font-medium"
          title={tema === 'claro' ? 'Mudar para Tema Escuro' : 'Mudar para Tema Claro'}
        >
          {tema === 'claro' ? <Moon size={15} /> : <Sun size={15} />}
          <span>{tema === 'claro' ? 'Escuro' : 'Claro'}</span>
        </button>

        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
            <Wallet size={28} />
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            NossoFinanceiro
          </h1>
          <p className="text-xs text-zinc-400">
            {modoRedefinir
              ? `Redefinir senha da conta ${INFO_CONTAS[contaSelecionada].titulo}`
              : 'Selecione quem está acessando para carregar suas informações'}
          </p>
        </div>

        {/* SELETOR DE PERFIL */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setContaSelecionada('casal');
              setErro('');
              setMsgSucesso('');
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
              setMsgSucesso('');
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

        {msgSucesso && (
          <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-300 flex items-center gap-2 font-medium">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
            <span>{msgSucesso}</span>
          </div>
        )}

        {!modoRedefinir ? (
          /* ==================== FORMULÁRIO DE LOGIN ==================== */
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                <Lock size={13} className="text-emerald-400" />
                Senha de acesso para <strong>{INFO_CONTAS[contaSelecionada].titulo}</strong>
              </label>
              <input
                type="password"
                required
                placeholder="Digite sua senha"
                value={senhaInput}
                onChange={(e) => setSenhaInput(e.target.value)}
                className="w-full mt-1.5 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
              {erro && <p className="text-xs text-rose-400 mt-1.5 font-medium">{erro}</p>}
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <UserCheck size={18} />
              {carregando ? 'Verificando...' : `Entrar como ${INFO_CONTAS[contaSelecionada].titulo}`}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setModoRedefinir(true);
                  setErro('');
                  setMsgSucesso('');
                }}
                className="text-xs text-zinc-400 hover:text-emerald-400 inline-flex items-center gap-1.5 transition cursor-pointer"
              >
                <KeyRound size={13} />
                Alterar / Redefinir senha desta conta
              </button>
            </div>
          </form>
        ) : (
          /* ==================== FORMULÁRIO DE REDEFINIR SENHA ==================== */
          <form onSubmit={handleRedefinirSenha} className="space-y-3.5">
            <div>
              <label className="text-xs text-zinc-400 font-medium">
                Senha Atual ({INFO_CONTAS[contaSelecionada].titulo})
              </label>
              <input
                type="password"
                required
                placeholder="Digite a senha atual (padrão inicial: 123)"
                value={senhaAtualInput}
                onChange={(e) => setSenhaAtualInput(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium">Nova Senha</label>
              <input
                type="password"
                required
                placeholder="Digite a nova senha"
                value={novaSenhaInput}
                onChange={(e) => setNovaSenhaInput(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 font-medium">Confirmar Nova Senha</label>
              <input
                type="password"
                required
                placeholder="Repita a nova senha"
                value={confirmarSenhaInput}
                onChange={(e) => setConfirmarSenhaInput(e.target.value)}
                className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {erro && <p className="text-xs text-rose-400 font-medium">{erro}</p>}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setModoRedefinir(false);
                  setErro('');
                }}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <ArrowLeft size={14} /> Voltar
              </button>

              <button
                type="submit"
                disabled={carregando}
                className="flex-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-zinc-950 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <KeyRound size={14} />
                {carregando ? 'Salvando...' : 'Salvar Nova Senha'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
