import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalConfigCasalProps {
  aberto: boolean;
  onFechar: () => void;
  pessoa1: string;
  pessoa2: string;
  onSalvarNomes: (novoP1: string, novoP2: string) => void;
}

export function ModalConfigCasal({
  aberto,
  onFechar,
  pessoa1,
  pessoa2,
  onSalvarNomes,
}: ModalConfigCasalProps) {
  const [nome1, setNome1] = useState(pessoa1);
  const [nome2, setNome2] = useState(pessoa2);

  useEffect(() => {
    setNome1(pessoa1);
    setNome2(pessoa2);
  }, [pessoa1, pessoa2, aberto]);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-2xl p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm md:text-base">Personalizar Nomes do Casal</h3>
          <button onClick={onFechar} className="text-zinc-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-zinc-400">Seu Nome</label>
            <input
              type="text"
              value={nome1}
              onChange={(e) => setNome1(e.target.value)}
              className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Nome da sua Noiva</label>
            <input
              type="text"
              value={nome2}
              onChange={(e) => setNome2(e.target.value)}
              className="w-full mt-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-white"
            />
          </div>
          <button
            onClick={() => {
              onSalvarNomes(nome1, nome2);
              onFechar();
            }}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2.5 rounded-xl text-xs md:text-sm transition"
          >
            Salvar e Atualizar Registros
          </button>
        </div>
      </div>
    </div>
  );
}