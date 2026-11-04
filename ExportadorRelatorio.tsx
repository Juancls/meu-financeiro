import * as XLSX from 'xlsx';
import { FileSpreadsheet, Printer } from 'lucide-react';
import {
  type Transaction,
  type CategoryBudget,
  type ObservacaoMes,
  formatarMoeda,
  formatarDataBR,
  nomeMesAno,
} from '../types';

interface ExportadorRelatorioProps {
  mesSelecionado: string;
  pessoa1: string;
  pessoa2: string;
  filtroPessoaGlobal: string;
  transacoesMes: Transaction[];
  orcamentos: CategoryBudget[];
  observacoesMes: ObservacaoMes[];
}

const traduzirTipo = (tipo: Transaction['tipo']) => {
  switch (tipo) {
    case 'despesa':
      return 'Despesa (-)';
    case 'receita':
      return 'Receita (+)';
    case 'poupanca':
      return 'Guardado Poupança';
    case 'resgate_poupanca':
      return 'Retirada Poupança';
    case 'transferencia_interna':
      return 'Movimentação Interna (⇄)';
  }
};

export function ExportadorRelatorio({
  mesSelecionado,
  pessoa1,
  pessoa2,
  filtroPessoaGlobal,
  transacoesMes,
  orcamentos,
  observacoesMes,
}: ExportadorRelatorioProps) {
  const calcularDadosResumo = () => {
    let receitas = 0;
    let despesas = 0;
    let poupado = 0;
    let resgatado = 0;

    const porCategoria: Record<string, number> = {};
    const porMetodo: Record<string, number> = {};
    const porPessoa: Record<string, number> = {
      [pessoa1]: 0,
      [pessoa2]: 0,
      Casal: 0,
    };

    transacoesMes.forEach((t) => {
      if (t.tipo === 'receita') receitas += t.valor;
      if (t.tipo === 'poupanca') poupado += t.valor;
      if (t.tipo === 'resgate_poupanca') resgatado += t.valor;
      if (t.tipo === 'despesa') {
        despesas += t.valor;
        porCategoria[t.categoria] = (porCategoria[t.categoria] || 0) + t.valor;
        porMetodo[t.metodoPagamento] = (porMetodo[t.metodoPagamento] || 0) + t.valor;
        porPessoa[t.responsavel] = (porPessoa[t.responsavel] || 0) + t.valor;
      }
    });

    const saldoLivre = receitas + resgatado - despesas - poupado;
    return { receitas, despesas, poupado, resgatado, saldoLivre, porCategoria, porMetodo, porPessoa };
  };

  // ==========================================================================
  // 1. GERADOR DE PLANILHA EXCEL (.XLSX) COM 3 ABAS
  // ==========================================================================
  const handleExportarExcel = () => {
    const { receitas, despesas, poupado, resgatado, saldoLivre, porCategoria, porMetodo, porPessoa } =
      calcularDadosResumo();

    const wb = XLSX.utils.book_new();

    // ABA 1: RESUMO DO MÊS
    const linhasResumo: (string | number)[][] = [
      [`RELATÓRIO FINANCEIRO - ${nomeMesAno(mesSelecionado).toUpperCase()}`],
      [`Filtro de Visão: ${filtroPessoaGlobal === 'Todos' ? 'Visão Geral (Casal)' : filtroPessoaGlobal}`],
      [],
      ['RESUMO GERAL DO MÊS', 'VALOR (R$)'],
      ['Total de Entradas (Receitas)', Number(receitas.toFixed(2))],
      ['Total de Gastos (Despesas)', Number(despesas.toFixed(2))],
      ['Total Guardado na Poupança', Number(poupado.toFixed(2))],
      ['Total Resgatado da Poupança', Number(resgatado.toFixed(2))],
      ['Saldo Livre do Mês', Number(saldoLivre.toFixed(2))],
      [],
      ['DIVISÃO DE GASTOS POR RESPONSÁVEL', 'GASTO (R$)', '% DO TOTAL'],
      ...Object.entries(porPessoa).map(([nome, val]) => [
        nome,
        Number(val.toFixed(2)),
        despesas > 0 ? `${Math.round((val / despesas) * 100)}%` : '0%',
      ]),
      [],
      ['GASTOS POR MÉTODO DE PAGAMENTO', 'GASTO (R$)', '% DO TOTAL'],
      ...Object.entries(porMetodo).map(([metodo, val]) => [
        metodo,
        Number(val.toFixed(2)),
        despesas > 0 ? `${Math.round((val / despesas) * 100)}%` : '0%',
      ]),
      [],
      ['GASTOS POR CATEGORIA VS. META', 'GASTO ATUAL (R$)', 'META MENSAL (R$)', 'STATUS'],
      ...orcamentos.map((orc) => {
        const gasto = porCategoria[orc.categoria] || 0;
        const status =
          orc.limite > 0 && gasto > orc.limite
            ? 'Acima da Meta'
            : gasto > 0
            ? 'Dentro da Meta'
            : 'Sem Gastos';
        return [
          orc.categoria,
          Number(gasto.toFixed(2)),
          Number(orc.limite.toFixed(2)),
          status,
        ];
      }),
    ];

    const wsResumo = XLSX.utils.aoa_to_sheet(linhasResumo);
    wsResumo['!cols'] = [{ wch: 36 }, { wch: 18 }, { wch: 18 }, { wch: 18 }];
    XLSX.utils.book_append_sheet(wb, wsResumo, 'Resumo do Mes');

    // ABA 2: LANÇAMENTOS DETALHADOS
    const linhasExtrato = transacoesMes.map((t) => ({
      Data: formatarDataBR(t.data),
      Tipo: traduzirTipo(t.tipo),
      'Descrição / Local': t.local,
      Categoria: t.categoria,
      Responsável: t.responsavel,
      'Método de Pagamento': t.metodoPagamento,
      Parcela: t.parcelaInfo || '-',
      Tags: t.tags.join(', '),
      'Valor (R$)':
        t.tipo === 'despesa' ? -Number(t.valor.toFixed(2)) : Number(t.valor.toFixed(2)),
    }));

    const wsExtrato = XLSX.utils.json_to_sheet(
      linhasExtrato.length > 0
        ? linhasExtrato
        : [{ Aviso: 'Nenhum lançamento registrado neste mês.' }]
    );
    wsExtrato['!cols'] = [
      { wch: 12 },
      { wch: 22 },
      { wch: 34 },
      { wch: 20 },
      { wch: 14 },
      { wch: 20 },
      { wch: 10 },
      { wch: 20 },
      { wch: 15 },
    ];
    XLSX.utils.book_append_sheet(wb, wsExtrato, 'Lancamentos');

    // ABA 3: NOTAS DO MÊS
    const obsDoMes = observacoesMes.filter((o) => o.mes === mesSelecionado);
    if (obsDoMes.length > 0) {
      const linhasObs = obsDoMes.map((o) => ({
        Data: formatarDataBR(o.dataCriacao),
        Autor: o.autor,
        Título: o.titulo,
        Detalhes: o.texto,
        'Valor Envolvido (R$)': o.valor ? Number(o.valor.toFixed(2)) : 0,
        Status: o.resolvido ? 'Resolvido / Pago' : 'Pendente',
      }));
      const wsObs = XLSX.utils.json_to_sheet(linhasObs);
      wsObs['!cols'] = [
        { wch: 12 },
        { wch: 14 },
        { wch: 28 },
        { wch: 45 },
        { wch: 18 },
        { wch: 16 },
      ];
      XLSX.utils.book_append_sheet(wb, wsObs, 'Notas do Mes');
    }

    XLSX.writeFile(wb, `Relatorio_Financeiro_${mesSelecionado}.xlsx`);
  };

  // ==========================================================================
  // 2. GERADOR DE RELATÓRIO EM PDF (JANELA DE IMPRESSÃO / SALVAR COMO PDF)
  // ==========================================================================
  const handleGerarPDF = () => {
    const { receitas, despesas, poupado, saldoLivre, porCategoria, porMetodo, porPessoa } =
      calcularDadosResumo();
    const obsDoMes = observacoesMes.filter((o) => o.mes === mesSelecionado);

    const categoriasOrdenadas = Object.entries(porCategoria).sort((a, b) => b[1] - a[1]);

    const janela = window.open('', '_blank', 'width=980,height=800');
    if (!janela) {
      alert('Permita pop-ups no navegador para gerar o PDF do relatório.');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Relatório Financeiro - ${nomeMesAno(mesSelecionado)}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #18181b;
            background: #ffffff;
            padding: 28px;
            font-size: 12px;
            line-height: 1.45;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #10b981;
            padding-bottom: 14px;
            margin-bottom: 20px;
          }
          .header h1 { font-size: 20px; font-weight: 800; color: #09090b; }
          .header p { color: #52525b; font-size: 12px; margin-top: 2px; }
          .badge-mes {
            background: #ecfdf5;
            color: #047857;
            border: 1px solid #a7f3d0;
            padding: 6px 12px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 13px;
          }
          .kpis {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 22px;
          }
          .kpi-card {
            border: 1px solid #e4e4e7;
            border-radius: 10px;
            padding: 12px;
            background: #fafafa;
          }
          .kpi-card span {
            display: block;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #71717a;
            font-weight: 600;
          }
          .kpi-card strong {
            display: block;
            font-size: 16px;
            margin-top: 4px;
          }
          .verde { color: #059669; }
          .vermelho { color: #e11d48; }
          .azul { color: #0284c7; }
          .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 22px;
          }
          .box {
            border: 1px solid #e4e4e7;
            border-radius: 10px;
            padding: 14px;
          }
          .box h3 {
            font-size: 12px;
            text-transform: uppercase;
            color: #3f3f46;
            margin-bottom: 10px;
            border-bottom: 1px solid #f4f4f5;
            padding-bottom: 6px;
          }
          .row-item {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            border-bottom: 1px dashed #f4f4f5;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
          }
          th, td {
            border-bottom: 1px solid #e4e4e7;
            padding: 7px 6px;
            text-align: left;
            font-size: 11px;
          }
          th {
            background: #f4f4f5;
            font-weight: 700;
            color: #27272a;
          }
          .right { text-align: right; }
          .section-title {
            font-size: 14px;
            font-weight: 800;
            margin: 18px 0 8px;
            color: #18181b;
          }
          @media print {
            body { padding: 10px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>NossoFinanceiro — Fechamento Mensal</h1>
            <p>Responsáveis: ${pessoa1} & ${pessoa2} | Filtro: ${
      filtroPessoaGlobal === 'Todos' ? 'Visão Geral' : filtroPessoaGlobal
    }</p>
          </div>
          <div class="badge-mes">${nomeMesAno(mesSelecionado)}</div>
        </div>

        <div class="kpis">
          <div class="kpi-card">
            <span>Entradas no Mês</span>
            <strong class="verde">${formatarMoeda(receitas)}</strong>
          </div>
          <div class="kpi-card">
            <span>Gastos no Mês</span>
            <strong class="vermelho">${formatarMoeda(despesas)}</strong>
          </div>
          <div class="kpi-card">
            <span>Guardado na Poupança</span>
            <strong class="azul">${formatarMoeda(poupado)}</strong>
          </div>
          <div class="kpi-card">
            <span>Saldo Livre</span>
            <strong class="${saldoLivre >= 0 ? 'verde' : 'vermelho'}">${formatarMoeda(
      saldoLivre
    )}</strong>
          </div>
        </div>

        <div class="grid-2">
          <div class="box">
            <h3>Gastos por Categoria</h3>
            ${
              categoriasOrdenadas.length === 0
                ? '<p style="color:#71717a">Sem despesas no mês.</p>'
                : categoriasOrdenadas
                    .map(([cat, val]) => {
                      const pct = despesas > 0 ? Math.round((val / despesas) * 100) : 0;
                      return `<div class="row-item"><span>${cat}</span><strong>${formatarMoeda(
                        val
                      )} (${pct}%)</strong></div>`;
                    })
                    .join('')
            }
          </div>

          <div class="box">
            <h3>Divisão por Pessoa & Método</h3>
            ${Object.entries(porPessoa)
              .map(
                ([nome, val]) =>
                  `<div class="row-item"><span>👤 ${nome}</span><strong>${formatarMoeda(
                    val
                  )}</strong></div>`
              )
              .join('')}
            <div style="margin-top: 10px; padding-top: 6px; border-top: 1px solid #e4e4e7;">
              ${Object.entries(porMetodo)
                .map(
                  ([met, val]) =>
                    `<div class="row-item"><span>💳 ${met}</span><strong>${formatarMoeda(
                      val
                    )}</strong></div>`
                )
                .join('')}
            </div>
          </div>
        </div>

        ${
          obsDoMes.length > 0
            ? `
          <h2 class="section-title">Notas e Observações do Mês (${obsDoMes.length})</h2>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Autor</th>
                <th>Título / Detalhes</th>
                <th>Status</th>
                <th class="right">Valor</th>
              </tr>
            </thead>
            <tbody>
              ${obsDoMes
                .map(
                  (o) => `
                <tr>
                  <td>${formatarDataBR(o.dataCriacao)}</td>
                  <td>${o.autor}</td>
                  <td><strong>${o.titulo}</strong>: ${o.texto}</td>
                  <td>${o.resolvido ? 'Resolvido' : 'Pendente'}</td>
                  <td class="right">${o.valor ? formatarMoeda(o.valor) : '-'}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        `
            : ''
        }

        <h2 class="section-title">Extrato Detalhado (${transacoesMes.length} lançamentos)</h2>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição / Local</th>
              <th>Categoria</th>
              <th>Responsável</th>
              <th>Método</th>
              <th class="right">Valor</th>
            </tr>
          </thead>
          <tbody>
            ${transacoesMes
              .map(
                (t) => `
              <tr>
                <td>${formatarDataBR(t.data)}</td>
                <td>${t.local} ${t.parcelaInfo ? `(${t.parcelaInfo})` : ''}</td>
                <td>${t.categoria}</td>
                <td>${t.responsavel}</td>
                <td>${t.metodoPagamento}</td>
                <td class="right" style="font-weight:700; color:${
                  t.tipo === 'despesa'
                    ? '#e11d48'
                    : t.tipo === 'receita'
                    ? '#059669'
                    : '#3f3f46'
                }">
                  ${t.tipo === 'despesa' ? '- ' : t.tipo === 'receita' ? '+ ' : ''}${formatarMoeda(
                  t.valor
                )}
                </td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 250);
          };
        </script>
      </body>
      </html>
    `;

    janela.document.open();
    janela.document.write(html);
    janela.document.close();
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={handleExportarExcel}
        className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-emerald-400 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
        title="Baixar planilha Excel (.xlsx) com Resumo, Extrato e Notas"
      >
        <FileSpreadsheet size={15} />
        <span>Planilha (.XLSX)</span>
      </button>

      <button
        type="button"
        onClick={handleGerarPDF}
        className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-sky-400 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
        title="Gerar relatório formatado para salvar em PDF ou imprimir"
      >
        <Printer size={15} />
        <span>Relatório PDF</span>
      </button>
    </div>
  );
}

