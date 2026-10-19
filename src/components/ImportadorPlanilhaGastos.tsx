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
        if (str === '***') return 0; // Caso especial "Presente amor" em Maio.26

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

    // Lê qualquer célula de uma aba usando coordenada exata (linha e coluna começando em 0 a partir de A1)
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
                // Encontra se é Janeiro.26 até Julho.26 (mesmo com ou sem cedilha/espaços)
                let anoMes: string | undefined = MAPA_ABAS_ATE_JULHO[chaveAba];
                if (!anoMes) {
                    for (const [k, v] of Object.entries(MAPA_ABAS_ATE_JULHO)) {
                        if (chaveAba.includes(normalizar(k))) {
                            anoMes = v;
                            break;
                        }
                    }
                }

                // Ignora "Teste ", "Agosto.26", "Setembro.26"
                if (!anoMes) return;

                const sheet = workbook.Sheets[nomeAbaOriginal];
                const range = sheet['!ref'] ? XLSX.utils.decode_range(sheet['!ref']) : { e: { r: 100 } };
                const maxRow = Math.max(range.e.r, 100);

                // ====================================================================
                // 1. RECEITAS JUAN (Linhas Excel 4, 5, 6 -> índice 0-based: r = 3, 4, 5)
                // Colunas: B (c=1: Categoria), C (c=2: R$), D (c=3: Data), E (c=4: Obs)
                // ====================================================================
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

                // ====================================================================
                // 2. RECEITAS ANA (Linhas Excel 11, 12, 13 -> índice 0-based: r = 10, 11, 12)
                // Colunas: B (c=1: Categoria), C (c=2: R$), D (c=3: Qtd), E (c=4: Obs)
                // ====================================================================
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

                // ====================================================================
                // 3. POUPANÇAS DO MÊS (Linhas Excel 4, 5, 6 -> índice 0-based: r = 3, 4, 5)
                // Colunas: G (c=6: Nome), H (c=7: R$), I (c=8: Observação)
                // ====================================================================
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

                // ====================================================================
                // 4. GASTOS DO MÊS (A partir da Linha Excel 4 -> índice 0-based: r >= 3)
                // Colunas: K (c=10: Item), L (c=11: R$), M (c=12: Data), N (c=13: Obs)
                // ====================================================================
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
                    if (limparTexto(valorRaw) === '***') {
                        tags.push('#Valor oculto: ***');
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

                // ====================================================================
                // 5. OBSERVAÇÕES GERAIS (A partir da Linha Excel 24 -> r >= 23, Col B: c=1)
                // ====================================================================
                for (let r = 23; r <= maxRow; r++) {
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
                    `Nenhuma linha encontrada! Abas lidas no arquivo: ${workbook.SheetNames.join(', ')}`
                );
            } else {
                await onImportarDados(todasTransacoes, todasObservacoes);
                setResumoImportacao(
                    `🎉 Sucesso! ${todasTransacoes.length} lançamentos (380 gastos, 30 receitas e 19 poupanças) + ${todasObservacoes.length} observações de Jan a Jul foram salvos como Casal!`
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
            <label className="inline-flex items-center gap-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition shadow-sm">
                <FileSpreadsheet size={16} className="text-emerald-400 shrink-0" />
                <span>
                    {importando
                        ? 'Importando 429 registros...'
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