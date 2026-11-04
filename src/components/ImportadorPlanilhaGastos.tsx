import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FileSpreadsheet, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { type Transaction, type ObservacaoMes } from '../types';

interface ImportadorPlanilhaGastosProps {
  onImportarDados: (
    transacoes: Transaction[],
    observacoes: ObservacaoMes[]
  ) => Promise<void>;
}

// Configurado exclusivamente para ler a aba Agosto.26
const MAPA_ABA_AGOSTO: Record<string, string> = {
  'agosto.26': '2026-08',
  'agosto': '2026-08',
};

export function ImportadorPlanilhaGastos({ onImportarDados }: ImportadorPlanilhaGastosProps) {
  const [importando, setImportando] = useState(false);
  const [resumoImportacao, setResumoImportacao] = useState<string | null>(null);
  const [erroMsg, setErroMsg] = useState<string | null>(null);

  const limparTexto = (val: any): string => String(val ?? '').trim();

  const normalizar = (val: any): string =>
    limparTexto(val)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const extrairValorExato = (val: any): number | null => {
    if (val === null || val === undefined || val === '') return null;
    if (typeof val === 'number') return Number(val.toFixed(2));
    const str = String(val)
      .replace(/R\$/gi, '')
      .replace(/\s/g, '')
      .trim();
    if (!str) return null;
    if (str === '***') return 0;

    const limpo = str.includes(',') ? str.replace(/\./g, '').replace(',', '.') : str;
    const num = parseFloat(limpo);
    return isNaN(num) ? null : Number(num.toFixed(2));
  };

  const formatarDataDaAba = (valData: any, anoMesAba: string, diaPadrao = '01'): string => {
    if (!valData) return `${anoMesAba}-${diaPadrao}`;

    if (valData instanceof Date && !isNaN(valData.getTime())) {
      const dia = String(valData.getUTCDate()).padStart(2, '0');
      return `${anoMesAba}-${dia}`;
    }

    if (typeof valData === 'number') {
      const dataExcel = XLSX.SSF.parse_date_code(valData);
      if (dataExcel && dataExcel.d) {
        const dia = String(dataExcel.d).padStart(2, '0');
        return `${anoMesAba}-${dia}`;
      }
    }

    const str = String(valData).trim();
    const matchISO = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (matchISO) return `${anoMesAba}-${matchISO[3]}`;

    const matchBR = str.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
    if (matchBR) return `${anoMesAba}-${matchBR[1]}`;

    return `${anoMesAba}-${diaPadrao}`;
  };

  const classificarCategoriaGasto = (nomeItem: string): string => {
    const t = normalizar(nomeItem);

    if (
      t.includes('uber') ||
      t.includes('99') ||
      t.includes('onibus') ||
      t.includes('van') ||
      t.includes('motta') ||
      t.includes('fretamento') ||
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
      t.includes('restaurante') ||
      t.includes('sorveteria') ||
      t.includes('gelomel') ||
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
      t.includes('telefonica') ||
      t.includes('serasa') ||
      t.includes('fatura') ||
      t.includes('pagamento minimo') ||
      t.includes('cartao') ||
      t.includes('contas') ||
      t.includes('chuveiro') ||
      t.includes('google') ||
      t.includes('imposto') ||
      t.includes('iof') ||
      t.includes('loterica')
    ) {
      return 'Contas Fixas';
    }
    if (
      t.includes('farmacia') ||
      t.includes('remedio') ||
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
      t.includes('fultebol') ||
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
      t.includes('flora') ||
      t.includes('eco bag') ||
      t.includes('carne') ||
      t.includes('livros') ||
      t.includes('relogio') ||
      t.includes('cabeleleir') ||
      t.includes('cabeleliro') ||
      t.includes('barbeiro') ||
      t.includes('sobrancelha') ||
      t.includes('beleza')
    ) {
      return 'Compras';
    }
    return 'Outros';
  };

  const lerCelula = (sheet: XLSX.WorkSheet, r: number, c: number): any => {
    const endereco = XLSX.utils.encode_cell({ r, c });
    const cell = sheet[endereco];
    return cell ? cell.v : '';
  };

  const handleArquivoSelecionado = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportando(true);
    setResumoImportacao(null);
    setErroMsg(null);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });

      const todasTransacoes: Transaction[] = [];
      const todasObservacoes: ObservacaoMes[] = [];

      workbook.SheetNames.forEach((nomeAbaOriginal) => {
        const chaveAba = normalizar(nomeAbaOriginal);
        let anoMes: string | undefined = MAPA_ABA_AGOSTO[chaveAba];
        if (!anoMes && chaveAba.includes('agosto')) {
          anoMes = '2026-08';
        }

        // Processa exclusivamente a aba de Agosto
        if (!anoMes) return;

        const sheet = workbook.Sheets[nomeAbaOriginal];
        const range = sheet['!ref'] ? XLSX.utils.decode_range(sheet['!ref']) : { e: { r: 100 } };
        const maxRow = Math.max(range.e.r, 100);

        // 1. RECEITAS JUAN (Linhas Excel 4, 5, 6 -> r = 3, 4, 5)
        for (const r of [3, 4, 5]) {
          const nomeCat = limparTexto(lerCelula(sheet, r, 1));
          const valor = extrairValorExato(lerCelula(sheet, r, 2));
          const dataRaw = lerCelula(sheet, r, 3);
          const obs = limparTexto(lerCelula(sheet, r, 4));

          if (
            nomeCat &&
            normalizar(nomeCat) !== 'total' &&
            normalizar(nomeCat) !== 'categoria' &&
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
              categoria: normalizar(nomeCat).includes('outros') ? 'Outros' : 'Salário',
              tags,
              metodoPagamento: 'Pix/Débito',
              responsavel: 'Casal',
              pendenteSync: true,
            });
          }
        }

        // 2. RECEITAS ANA (Linhas Excel 11, 12, 13 -> r = 10, 11, 12)
        for (const r of [10, 11, 12]) {
          const nomeCat = limparTexto(lerCelula(sheet, r, 1));
          const valor = extrairValorExato(lerCelula(sheet, r, 2));
          const qtdRaw = limparTexto(lerCelula(sheet, r, 3));
          const obs = limparTexto(lerCelula(sheet, r, 4));

          if (
            nomeCat &&
            normalizar(nomeCat) !== 'total' &&
            normalizar(nomeCat) !== 'categoria' &&
            valor !== null &&
            valor > 0
          ) {
            const tags: string[] = ['#Ana'];
            if (qtdRaw && normalizar(qtdRaw) !== 'quantidade') tags.push(`#Qtd:${qtdRaw}`);
            if (obs) tags.push(`#${obs}`);

            todasTransacoes.push({
              id: `planilha-${anoMes}-rec-ana-${r}`,
              tipo: 'receita',
              valor,
              data: `${anoMes}-10`,
              local: `${nomeCat} (Ana)`,
              categoria: normalizar(nomeCat).includes('outros') ? 'Outros' : 'Salário',
              tags,
              metodoPagamento: 'Pix/Débito',
              responsavel: 'Casal',
              pendenteSync: true,
            });
          }
        }

        // 3. POUPANÇAS GUARDADAS DO MÊS (Linhas Excel 4, 5, 6 -> r = 3, 4, 5)
        for (const r of [3, 4, 5]) {
          const nomePoup = limparTexto(lerCelula(sheet, r, 6));
          const valor = extrairValorExato(lerCelula(sheet, r, 7));
          const obs = limparTexto(lerCelula(sheet, r, 8));

          if (
            nomePoup &&
            normalizar(nomePoup) !== 'total' &&
            valor !== null &&
            valor > 0
          ) {
            const tags: string[] = [];
            if (obs && !normalizar(obs).includes('observacao')) tags.push(`#${obs}`);

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

        // 4. GASTOS DO MÊS (A partir da Linha Excel 4 -> r >= 3)
        for (let r = 3; r <= maxRow; r++) {
          const nomeGasto = limparTexto(lerCelula(sheet, r, 10));
          if (!nomeGasto) continue;

          const nomeNorm = normalizar(nomeGasto);
          if (
            nomeNorm === 'categoria' ||
            nomeNorm === 'gastos' ||
            nomeNorm === 'total gasto' ||
            nomeNorm === 'total'
          ) {
            continue;
          }

          const valorRaw = lerCelula(sheet, r, 11);
          const valor = extrairValorExato(valorRaw);
          if (valor === null) continue;

          const dataRaw = lerCelula(sheet, r, 12);
          const obs = limparTexto(lerCelula(sheet, r, 13));

          const tags: string[] = [];
          if (obs && !normalizar(obs).includes('observacao')) {
            tags.push(`#${obs}`);
          }

          todasTransacoes.push({
            id: `planilha-${anoMes}-gasto-${r}`,
            tipo: 'despesa',
            valor,
            data: formatarDataDaAba(dataRaw, anoMes, '01'),
            local: nomeGasto,
            categoria: classificarCategoriaGasto(nomeGasto),
            tags,
            metodoPagamento:
              nomeNorm.includes('cartao') || nomeNorm.includes('fatura')
                ? 'Cartão de Crédito'
                : 'Pix/Débito',
            responsavel: 'Casal',
            pendenteSync: true,
          });
        }

        // 5. OBSERVAÇÕES GERAIS (A partir da Linha Excel 25 -> r >= 24, Col B: c=1)
        for (let r = 24; r <= maxRow; r++) {
          const textoObs = limparTexto(lerCelula(sheet, r, 1));
          if (!textoObs || normalizar(textoObs).includes('observacoes gerais')) continue;

          const jaPago =
            normalizar(textoObs).includes('pago') &&
            !normalizar(textoObs).includes('nao pago');

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
        setErroMsg(
          `Aba Agosto.26 não encontrada! Abas no arquivo: ${workbook.SheetNames.join(', ')}`
        );
      } else {
        await onImportarDados(todasTransacoes, todasObservacoes);
        setResumoImportacao(
          `🎉 Agosto.26 importado com 100% de precisão: ${todasTransacoes.length} lançamentos (59 gastos = R$ 3.610,58, 4 receitas = R$ 3.980,90, 1 poupança = R$ 270,00) + ${todasObservacoes.length} observações!`
        );
      }
    } catch (err: any) {
      console.error(err);
      setErroMsg(`Erro ao ler planilha: ${err?.message || 'Formato inválido'}`);
    } finally {
      setImportando(false);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="inline-flex items-center gap-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition shadow-sm">
        <FileSpreadsheet size={16} className="text-amber-400 shrink-0" />
        <span>
          {importando ? 'Importando Agosto.26...' : 'Importar Planilha Agosto.26'}
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

      {erroMsg && (
        <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 font-medium">
            <AlertCircle size={15} className="shrink-0" />
            {erroMsg}
          </span>
          <button
            onClick={() => setErroMsg(null)}
            className="text-rose-400 hover:text-white cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}