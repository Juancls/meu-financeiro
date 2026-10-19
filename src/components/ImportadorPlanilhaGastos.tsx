import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FileSpreadsheet, CheckCircle2, X } from 'lucide-react';
import {
  type Transaction,
  type ObservacaoMes,
} from '../types';

interface ImportadorPlanilhaGastosProps {
  onImportarDados: (
    transacoes: Transaction[],
    observacoes: ObservacaoMes[]
  ) => Promise<void>;
}

const MAPA_ABAS_ATE_JULHO: Record<string, string> = {
  'janeiro.26': '2026-01',
  'fevereiro.26': '2026-02',
  'marco.26': '2026-03',
  'março.26': '2026-03',
  'abril.26': '2026-04',
  'maio.26': '2026-05',
  'junho.26': '2026-06',
  'julho.26': '2026-07',
};

export function ImportadorPlanilhaGastos({ onImportarDados }: ImportadorPlanilhaGastosProps) {
  const [importando, setImportando] = useState(false);
  const [resumoImportacao, setResumoImportacao] = useState<string | null>(null);

  const limparTexto = (val: any): string => String(val ?? '').trim();

  const extrairValorExato = (val: any): number | null => {
    if (val === null || val === undefined || val === '') return null;
    if (typeof val === 'number') return val;
    const str = String(val)
      .replace(/R\$/gi, '')
      .replace(/\s/g, '')
      .trim();
    if (!str) return null;
    if (str === '***') return 0; // Caso especial "Presente amor" em Maio.26

    const limpo = str.includes(',') ? str.replace(/\./g, '').replace(',', '.') : str;
    const num = parseFloat(limpo);
    return isNaN(num) ? null : num;
  };

  // Extrai o dia da célula de data (se existir) e fixa no Ano-Mês exato da aba
  const formatarDataDaAba = (valData: any, anoMesAba: string, diaPadrao = '01'): string => {
    if (!valData) return `${anoMesAba}-${diaPadrao}`;

    let dia = diaPadrao;

    if (valData instanceof Date && !isNaN(valData.getTime())) {
      dia = String(valData.getUTCDate()).padStart(2, '0');
      return `${anoMesAba}-${dia}`;
    }

    if (typeof valData === 'number') {
      // Número serial de data do Excel
      const dataExcel = XLSX.SSF.parse_date_code(valData);
      if (dataExcel && dataExcel.d) {
        dia = String(dataExcel.d).padStart(2, '0');
        return `${anoMesAba}-${dia}`;
      }
    }

    const str = String(valData).trim();
    // Formato YYYY-MM-DD
    const matchISO = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (matchISO) {
      dia = matchISO[3];
      return `${anoMesAba}-${dia}`;
    }

    // Formato DD/MM/YYYY
    const matchBR = str.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
    if (matchBR) {
      dia = matchBR[1];
      return `${anoMesAba}-${dia}`;
    }

    return `${anoMesAba}-${diaPadrao}`;
  };

  // Classifica a categoria para os gráficos mantendo o nome 100% original no campo "local"
  const classificarCategoriaGasto = (nomeItem: string): string => {
    const t = nomeItem
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (
      t.includes('uber') ||
      t.includes('99') ||
      t.includes('onibus') ||
      t.includes('van') ||
      t.includes('pedagio') ||
      t.includes('transporte') ||
      t.includes('viagem') ||
      t.includes('zona azul')
    ) {
      return 'Transporte';
    }
    if (
      t.includes('mercado') ||
      t.includes('supermercado') ||
      t.includes('alimentacao') ||
      t.includes('ifood') ||
      t.includes('padaria') ||
      t.includes('lanche') ||
      t.includes('comida') ||
      t.includes('coxinha') ||
      t.includes('nextburguer') ||
      t.includes('acai') ||
      t.includes('bk') ||
      t.includes('sushi') ||
      t.includes('esfiha') ||
      t.includes('espetinho') ||
      t.includes('almoco') ||
      t.includes('sorvete') ||
      t.includes('doce') ||
      t.includes('salgado') ||
      t.includes('mc donalds') ||
      t.includes('mcdonalds') ||
      t.includes('bolo') ||
      t.includes('mafalda') ||
      t.includes('pizza') ||
      t.includes('manga') ||
      t.includes('cantina')
    ) {
      return 'Comida';
    }
    if (
      t.includes('faculdade') ||
      t.includes('claro') ||
      t.includes('vivo') ||
      t.includes('telefonia') ||
      t.includes('serasa') ||
      t.includes('fatura') ||
      t.includes('cartao') ||
      t.includes('contas') ||
      t.includes('chuveiro') ||
      t.includes('google') ||
      t.includes('imposto') ||
      t.includes('loterica')
    ) {
      return 'Contas Fixas';
    }
    if (
      t.includes('farmacia') ||
      t.includes('drogaria') ||
      t.includes('dentista') ||
      t.includes('psicologa') ||
      t.includes('terapia') ||
      t.includes('vitamina') ||
      t.includes('otica')
    ) {
      return 'Saúde';
    }
    if (
      t.includes('wet') ||
      t.includes('spotify') ||
      t.includes('futebol') ||
      t.includes('cinema') ||
      t.includes('jogo') ||
      t.includes('hopihari') ||
      t.includes('ikigai') ||
      t.includes('velox') ||
      t.includes('lazer') ||
      t.includes('station')
    ) {
      return 'Lazer';
    }
    if (
      t.includes('montreal') ||
      t.includes('calcinha') ||
      t.includes('presente') ||
      t.includes('pichau') ||
      t.includes('shopee') ||
      t.includes('amazon') ||
      t.includes('mesa') ||
      t.includes('cadeira') ||
      t.includes('roupas') ||
      t.includes('compras') ||
      t.includes('livros') ||
      t.includes('relogio') ||
      t.includes('cabeleleiro') ||
      t.includes('barbeiro') ||
      t.includes('sobrancelha') ||
      t.includes('beleza')
    ) {
      return 'Compras';
    }
    return 'Outros';
  };

  const handleArquivoSelecionado = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportando(true);
    setResumoImportacao(null);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });

      const todasTransacoes: Transaction[] = [];
      const todasObservacoes: ObservacaoMes[] = [];

      workbook.SheetNames.forEach((nomeAbaOriginal) => {
        const chaveAba = nomeAbaOriginal.trim().toLowerCase();
        const anoMes = MAPA_ABAS_ATE_JULHO[chaveAba];

        // Ignora "Teste ", "Agosto.26", "Setembro.26" ou qualquer aba após Julho
        if (!anoMes) return;

        const sheet = workbook.Sheets[nomeAbaOriginal];
        const linhas: any[][] = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          defval: '',
          raw: true,
        });

        // --------------------------------------------------------------------
        // 1. RECEITAS JUAN (Linhas de índice 2, 3, 4 -> Colunas B(1), C(2), D(3), E(4))
        // --------------------------------------------------------------------
        for (const r of [2, 3, 4]) {
          const linha = linhas[r];
          if (!linha) continue;
          const nomeCat = limparTexto(linha[1]);
          const valor = extrairValorExato(linha[2]);
          const dataRaw = linha[3];
          const obs = limparTexto(linha[4]);

          if (
            nomeCat &&
            nomeCat.toLowerCase() !== 'total' &&
            nomeCat.toLowerCase() !== 'categoria' &&
            valor !== null &&
            valor > 0
          ) {
            const tags: string[] = ['#Juan'];
            if (obs) tags.push(`#${obs}`);

            todasTransacoes.push({
              id: `planilha-${anoMes}-rec-juan-${r}`,
              tipo: 'receita',
              valor,
              data: formatarDataDaAba(dataRaw, anoMes, '05'),
              local: `${nomeCat} (Juan)`,
              categoria: nomeCat.toLowerCase().includes('outros') ? 'Outros' : 'Salário',
              tags,
              metodoPagamento: 'Pix/Débito',
              responsavel: 'Casal',
              pendenteSync: true,
            });
          }
        }

        // --------------------------------------------------------------------
        // 2. RECEITAS ANA (Linhas de índice 9, 10, 11 -> Colunas B(1), C(2), D(3), E(4))
        // --------------------------------------------------------------------
        for (const r of [9, 10, 11]) {
          const linha = linhas[r];
          if (!linha) continue;
          const nomeCat = limparTexto(linha[1]);
          const valor = extrairValorExato(linha[2]);
          const qtdRaw = limparTexto(linha[3]);
          const obs = limparTexto(linha[4]);

          if (
            nomeCat &&
            nomeCat.toLowerCase() !== 'total' &&
            nomeCat.toLowerCase() !== 'categoria' &&
            valor !== null &&
            valor > 0
          ) {
            const tags: string[] = ['#Ana'];
            if (qtdRaw && qtdRaw !== 'Quantidade') tags.push(`#Qtd:${qtdRaw}`);
            if (obs) tags.push(`#${obs}`);

            todasTransacoes.push({
              id: `planilha-${anoMes}-rec-ana-${r}`,
              tipo: 'receita',
              valor,
              data: `${anoMes}-10`,
              local: `${nomeCat} (Ana)`,
              categoria: nomeCat.toLowerCase().includes('outros') ? 'Outros' : 'Salário',
              tags,
              metodoPagamento: 'Pix/Débito',
              responsavel: 'Casal',
              pendenteSync: true,
            });
          }
        }

        // --------------------------------------------------------------------
        // 3. POUPANÇAS GUARDADAS DO MÊS (Linhas 2, 3, 4 -> Colunas G(6), H(7), I(8))
        // --------------------------------------------------------------------
        for (const r of [2, 3, 4]) {
          const linha = linhas[r];
          if (!linha) continue;
          const nomePoup = limparTexto(linha[6]);
          const valor = extrairValorExato(linha[7]);
          const obs = limparTexto(linha[8]);

          if (
            nomePoup &&
            nomePoup.toLowerCase() !== 'total' &&
            valor !== null &&
            valor > 0
          ) {
            const tags: string[] = [];
            if (obs && obs.toLowerCase() !== 'observação') tags.push(`#${obs}`);

            todasTransacoes.push({
              id: `planilha-${anoMes}-poup-${r}`,
              tipo: 'poupanca',
              valor,
              data: `${anoMes}-15`,
              local: nomePoup,
              categoria: 'Reserva do Casal',
              tags,
              metodoPagamento: 'Pix/Débito',
              responsavel: 'Casal',
              pendenteSync: true,
            });
          }
        }

        // --------------------------------------------------------------------
        // 4. GASTOS DO MÊS (A partir da linha 2 -> Colunas K(10), L(11), M(12), N(13))
        // --------------------------------------------------------------------
        for (let r = 2; r < linhas.length; r++) {
          const linha = linhas[r];
          if (!linha) continue;

          const nomeGasto = limparTexto(linha[10]);
          if (!nomeGasto) continue;

          const nomeUpper = nomeGasto.toUpperCase();
          if (nomeUpper === 'CATEGORIA' || nomeUpper === 'GASTOS' || nomeUpper === 'TOTAL GASTO') {
            continue;
          }

          const valorRaw = linha[11];
          const valor = extrairValorExato(valorRaw);
          if (valor === null) continue;

          const dataRaw = linha[12];
          const obs = limparTexto(linha[13]);

          const tags: string[] = [];
          if (obs && obs.toLowerCase() !== 'observação') {
            tags.push(`#${obs}`);
          }
          if (String(valorRaw).trim() === '***') {
            tags.push('#Valor oculto: ***');
          }

          todasTransacoes.push({
            id: `planilha-${anoMes}-gasto-${r}`,
            tipo: 'despesa',
            valor,
            data: formatarDataDaAba(dataRaw, anoMes, '01'),
            local: nomeGasto, // Nome 100% idêntico ao da planilha
            categoria: classificarCategoriaGasto(nomeGasto),
            tags,
            metodoPagamento:
              nomeGasto.toLowerCase().includes('cartão') ||
              nomeGasto.toLowerCase().includes('fatura')
                ? 'Cartão de Crédito'
                : 'Pix/Débito',
            responsavel: 'Casal',
            pendenteSync: true,
          });
        }

        // --------------------------------------------------------------------
        // 5. OBSERVAÇÕES GERAIS DO MÊS (A partir da linha 23 -> Coluna B(1))
        // --------------------------------------------------------------------
        for (let r = 23; r < linhas.length; r++) {
          const linha = linhas[r];
          if (!linha) continue;
          const textoObs = limparTexto(linha[1]);
          if (!textoObs || textoObs.toUpperCase().includes('OBSERVAÇÕES GERAIS')) continue;

          const jaPago =
            textoObs.toUpperCase().includes('PAGO') &&
            !textoObs.toUpperCase().includes('NÃO PAGO');

          todasObservacoes.push({
            id: `planilha-${anoMes}-obs-${r}`,
            mes: anoMes,
            autor: 'Casal',
            titulo: textoObs.length > 48 ? `${textoObs.slice(0, 48)}...` : textoObs,
            texto: textoObs,
            resolvido: jaPago,
            dataCriacao: `${anoMes}-01`,
          });
        }
      });

      if (todasTransacoes.length === 0) {
        alert(
          'Nenhuma aba de Janeiro.26 até Julho.26 foi encontrada neste arquivo. Verifique se enviou a planilha Financeiro.xlsx correta!'
        );
      } else {
        await onImportarDados(todasTransacoes, todasObservacoes);
        setResumoImportacao(
          `Importação concluída à risca (Jan a Jul): ${todasTransacoes.length} lançamentos e ${todasObservacoes.length} observações gerais registrados como Casal!`
        );
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao processar a planilha Financeiro.xlsx.');
    } finally {
      setImportando(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-emerald-500/40 text-emerald-300 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition shadow-sm">
        <FileSpreadsheet size={16} className="text-emerald-400 shrink-0" />
        <span>
          {importando
            ? 'Importando Jan a Jul...'
            : 'Importar Planilha Antiga (Jan–Jul)'}
        </span>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleArquivoSelecionado}
          disabled={importando}
          className="hidden"
        />
      </label>

      {resumoImportacao && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle2 size={15} className="shrink-0" />
            {resumoImportacao}
          </span>
          <button
            onClick={() => setResumoImportacao(null)}
            className="text-emerald-400 hover:text-white cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}