import { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';
import {
  CreditCard,
  Users,
  TrendingDown,
  CalendarClock,
  Award,
  Flame,
  BarChart3,
} from 'lucide-react';
import {
  type Transaction,
  type CategoryBudget,
  type ObservacaoMes,
  type PaymentMethod,
  formatarMoeda,
  formatarDataBR,
  nomeMesAno,
} from '../types';
import { ExportadorRelatorio } from './ExportadorRelatorio';

interface AbaAnaliseProps {
  mesSelecionado: string;
  pessoa1: string;
  pessoa2: string;
  filtroPessoaGlobal: string;
  todasTransacoes: Transaction[];
  transacoesDoMes: Transaction[];
  orcamentos: CategoryBudget[];
  observacoesMes: ObservacaoMes[];
}

const CORES_GRAFICO = [
  '#10b981', // emerald-500
  '#38bdf8', // sky-400
  '#f59e0b', // amber-500
  '#f43f5e', // rose-500
  '#818cf8', // indigo-400
  '#ec4899', // pink-500
  '#a855f7', // purple-500
  '#14b8a6', // teal-500
];

const MESES_CURTOS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

export function AbaAnalise({
  mesSelecionado,
  pessoa1,
  pessoa2,
  filtroPessoaGlobal,
  todasTransacoes,
  transacoesDoMes,
  orcamentos,
  observacoesMes,
}: AbaAnaliseProps) {
  // 1. Totais de Despesas do Mês
  const totalDespesasMes = useMemo(
    () =>
      transacoesDoMes
        .filter((t) => t.tipo === 'despesa')
        .reduce((acc, t) => acc + t.valor, 0),
    [transacoesDoMes]
  );

  // 2. Gastos por Categoria
  const gastosPorCategoria = useMemo(() => {
    const mapa: Record<string, number> = {};
    transacoesDoMes
      .filter((t) => t.tipo === 'despesa')
      .forEach((t) => {
        mapa[t.categoria] = (mapa[t.categoria] || 0) + t.valor;
      });
    return Object.entries(mapa)
      .map(([categoria, total], idx) => ({
        categoria,
        total: Number(total.toFixed(2)),
        cor: CORES_GRAFICO[idx % CORES_GRAFICO.length],
      }))
      .sort((a, b) => b.total - a.total);
  }, [transacoesDoMes]);

  // 3. Gastos por Método de Pagamento
  const gastosPorMetodo = useMemo(() => {
    const mapa: Record<PaymentMethod, number> = {
      'Cartão de Crédito': 0,
      'Pix/Débito': 0,
      Dinheiro: 0,
    };
    transacoesDoMes
      .filter((t) => t.tipo === 'despesa')
      .forEach((t) => {
        mapa[t.metodoPagamento] = (mapa[t.metodoPagamento] || 0) + t.valor;
      });
    return Object.entries(mapa)
      .map(([metodo, total]) => ({ metodo: metodo as PaymentMethod, total }))
      .filter((m) => m.total > 0)
      .sort((a, b) => b.total - a.total);
  }, [transacoesDoMes]);

  // 4. Evolução dos Últimos 6 Meses (Entradas vs Gastos vs Poupança)
  const evolucao6Meses = useMemo(() => {
    const [anoRef, mesRef] = mesSelecionado.split('-').map(Number);
    const listaMeses: { anoMes: string; label: string }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(anoRef, mesRef - 1 - i, 1);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      listaMeses.push({
        anoMes: `${y}-${m}`,
        label: `${MESES_CURTOS[d.getMonth()]}/${String(y).slice(2)}`,
      });
    }

    return listaMeses.map(({ anoMes, label }) => {
      const doMes = todasTransacoes.filter(
        (t) =>
          t.data.startsWith(anoMes) &&
          (filtroPessoaGlobal === 'Todos' || t.responsavel === filtroPessoaGlobal)
      );

      let Entradas = 0;
      let Gastos = 0;
      let Guardado = 0;

      doMes.forEach((t) => {
        if (t.tipo === 'receita') Entradas += t.valor;
        if (t.tipo === 'despesa') Gastos += t.valor;
        if (t.tipo === 'poupanca') Guardado += t.valor;
      });

      return {
        mes: label,
        Entradas: Number(Entradas.toFixed(2)),
        Gastos: Number(Gastos.toFixed(2)),
        Guardado: Number(Guardado.toFixed(2)),
      };
    });
  }, [todasTransacoes, mesSelecionado, filtroPessoaGlobal]);

  // 5. Ritmo de Gastos Diários no Mês Selecionado
  const gastosPorDia = useMemo(() => {
    const [ano, mes] = mesSelecionado.split('-').map(Number);
    const ultimoDia = new Date(ano, mes, 0).getDate();
    const mapaDias: Record<string, number> = {};

    for (let d = 1; d <= ultimoDia; d++) {
      const diaStr = String(d).padStart(2, '0');
      mapaDias[diaStr] = 0;
    }

    transacoesDoMes
      .filter((t) => t.tipo === 'despesa')
      .forEach((t) => {
        const dia = t.data.slice(8, 10);
        if (mapaDias[dia] !== undefined) {
          mapaDias[dia] += t.valor;
        }
      });

    return Object.entries(mapaDias).map(([dia, valor]) => ({
      dia: `${dia}/${String(mes).padStart(2, '0')}`,
      Valor: Number(valor.toFixed(2)),
    }));
  }, [transacoesDoMes, mesSelecionado]);

  // 6. Top 5 Maiores Gastos do Mês
  const top5Gastos = useMemo(() => {
    return transacoesDoMes
      .filter((t) => t.tipo === 'despesa')
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 5);
  }, [transacoesDoMes]);

  // 7. BÔNUS: Previsão de Faturas / Parcelamentos Futuros (Próximos 5 Meses)
  const previsaoFuturo = useMemo(() => {
    const [anoRef, mesRef] = mesSelecionado.split('-').map(Number);
    const proximosMeses: { anoMes: string; label: string; total: number; qtdParcelas: number }[] =
      [];

    for (let i = 1; i <= 5; i++) {
      const d = new Date(anoRef, mesRef - 1 + i, 1);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const anoMes = `${y}-${m}`;

      const lancamentosFuturos = todasTransacoes.filter(
        (t) =>
          t.data.startsWith(anoMes) &&
          t.tipo === 'despesa' &&
          (filtroPessoaGlobal === 'Todos' || t.responsavel === filtroPessoaGlobal)
      );

      const soma = lancamentosFuturos.reduce((acc, t) => acc + t.valor, 0);
      proximosMeses.push({
        anoMes,
        label: `${MESES_CURTOS[d.getMonth()]}/${String(y).slice(2)}`,
        total: Number(soma.toFixed(2)),
        qtdParcelas: lancamentosFuturos.length,
      });
    }

    const parcelasAtivasDoMes = transacoesDoMes.filter(
      (t) => t.tipo === 'despesa' && Boolean(t.parcelaInfo)
    );

    return { proximosMeses, parcelasAtivasDoMes };
  }, [todasTransacoes, transacoesDoMes, mesSelecionado, filtroPessoaGlobal]);

  // 8. Participação por Pessoa no Mês
  const resumoPorPessoa = useMemo(() => {
    const todasMes = todasTransacoes.filter(
      (t) => t.data.startsWith(mesSelecionado) && t.tipo === 'despesa'
    );
    const calc = (nome: string) =>
      todasMes.filter((t) => t.responsavel === nome).reduce((acc, t) => acc + t.valor, 0);

    return {
      p1: calc(pessoa1),
      p2: calc(pessoa2),
      casal: calc('Casal'),
    };
  }, [todasTransacoes, mesSelecionado, pessoa1, pessoa2]);

  const mediaDiaria = useMemo(() => {
    const [ano, mes] = mesSelecionado.split('-').map(Number);
    const diasNoMes = new Date(ano, mes, 0).getDate();
    return totalDespesasMes / diasNoMes;
  }, [totalDespesasMes, mesSelecionado]);

  const totalCartao =
    gastosPorMetodo.find((m) => m.metodo === 'Cartão de Crédito')?.total || 0;

  return (
    <div className="space-y-6">
      {/* CABEÇALHO + BOTÕES DE EXPORTAR PLANILHA E PDF */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <BarChart3 className="text-emerald-400" size={22} />
            Painel Analítico — {nomeMesAno(mesSelecionado)}
          </h2>
          <p className="text-xs text-zinc-400">
            Gráficos detalhados de evolução, ritmo diário, faturas futuras e exportação de relatórios
          </p>
        </div>

        <ExportadorRelatorio
          mesSelecionado={mesSelecionado}
          pessoa1={pessoa1}
          pessoa2={pessoa2}
          filtroPessoaGlobal={filtroPessoaGlobal}
          transacoesMes={transacoesDoMes}
          orcamentos={orcamentos}
          observacoesMes={observacoesMes}
        />
      </div>

      {/* KPI CARDS DE DESTAQUE */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4">
          <span className="text-[11px] text-zinc-400 flex items-center gap-1 font-medium">
            <Flame size={13} className="text-rose-400" /> Média de Gasto / Dia
          </span>
          <strong className="text-base md:text-lg text-white mt-1 block">
            {formatarMoeda(mediaDiaria)}
          </strong>
          <span className="text-[10px] text-zinc-500">Ao longo do mês</span>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4">
          <span className="text-[11px] text-zinc-400 flex items-center gap-1 font-medium">
            <Award size={13} className="text-amber-400" /> Maior Categoria
          </span>
          <strong className="text-base md:text-lg text-white mt-1 block truncate">
            {gastosPorCategoria[0]?.categoria || 'Sem gastos'}
          </strong>
          <span className="text-[10px] text-emerald-400 font-semibold">
            {gastosPorCategoria[0] ? formatarMoeda(gastosPorCategoria[0].total) : 'R$ 0,00'}
          </span>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4">
          <span className="text-[11px] text-zinc-400 flex items-center gap-1 font-medium">
            <CreditCard size={13} className="text-sky-400" /> No Cartão de Crédito
          </span>
          <strong className="text-base md:text-lg text-white mt-1 block">
            {formatarMoeda(totalCartao)}
          </strong>
          <span className="text-[10px] text-zinc-500">
            {totalDespesasMes > 0
              ? `${Math.round((totalCartao / totalDespesasMes) * 100)}% das despesas`
              : '0% das despesas'}
          </span>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4">
          <span className="text-[11px] text-zinc-400 flex items-center gap-1 font-medium">
            <CalendarClock size={13} className="text-indigo-400" /> Próximo Mês ({previsaoFuturo.proximosMeses[0]?.label})
          </span>
          <strong className="text-base md:text-lg text-white mt-1 block">
            {formatarMoeda(previsaoFuturo.proximosMeses[0]?.total || 0)}
          </strong>
          <span className="text-[10px] text-zinc-500">
            {previsaoFuturo.proximosMeses[0]?.qtdParcelas || 0} parcela(s) agendada(s)
          </span>
        </div>
      </div>

      {/* GRÁFICO 1: EVOLUÇÃO DOS ÚLTIMOS 6 MESES */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Evolução Mensal (Últimos 6 Meses)
            </h3>
            <p className="text-xs text-zinc-400">
              Comparativo histórico entre Entradas, Gastos e Poupança
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Entradas
            </span>
            <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Gastos
            </span>
            <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Guardado
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evolucao6Meses} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="mes" stroke="#a1a1aa" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#a1a1aa"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => `R$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  borderColor: '#3f3f46',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#fff',
                }}
                formatter={(val: any) => formatarMoeda(Number(val))}
              />
              <Bar dataKey="Entradas" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Gastos" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Guardado" fill="#38bdf8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GRÁFICO 2 (ROSCA CATEGORIAS) + DETALHAMENTO CATEGORIAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Distribuição por Categoria
            </h3>
            <p className="text-xs text-zinc-400">Proporção dos gastos de {nomeMesAno(mesSelecionado)}</p>
          </div>

          {gastosPorCategoria.length === 0 ? (
            <p className="text-xs text-zinc-500 py-16 text-center">Sem despesas neste mês.</p>
          ) : (
            <div className="h-60 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gastosPorCategoria}
                    dataKey="total"
                    nameKey="categoria"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={88}
                    paddingAngle={3}
                  >
                    {gastosPorCategoria.map((item) => (
                      <Cell key={item.categoria} fill={item.cor} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      borderColor: '#3f3f46',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#fff',
                    }}
                    formatter={(val: any) => formatarMoeda(Number(val))}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800/80">
            {gastosPorCategoria.map((item) => (
              <span
                key={item.categoria}
                className="text-[11px] text-zinc-300 flex items-center gap-1.5 bg-zinc-950/70 px-2 py-1 rounded-lg border border-zinc-800"
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.cor }} />
                {item.categoria}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Ranking de Categorias vs. Meta
          </h3>

          {gastosPorCategoria.length === 0 ? (
            <p className="text-xs text-zinc-500 py-12 text-center">
              Nenhuma despesa registrada neste mês.
            </p>
          ) : (
            <div className="space-y-3.5">
              {gastosPorCategoria.map((item) => {
                const pctTotal = Math.round((item.total / totalDespesasMes) * 100) || 0;
                const orc = orcamentos.find((o) => o.categoria === item.categoria);
                const estourou = orc && orc.limite > 0 && item.total > orc.limite;

                return (
                  <div key={item.categoria} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="font-medium text-zinc-200 flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.cor }}
                        />
                        {item.categoria}
                        {estourou && (
                          <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-semibold">
                            Acima da meta ({formatarMoeda(orc.limite)})
                          </span>
                        )}
                      </span>
                      <span className="text-zinc-400">
                        <strong className="text-zinc-100">{formatarMoeda(item.total)}</strong> (
                        {pctTotal}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pctTotal}%`,
                          backgroundColor: estourou ? '#f43f5e' : item.cor,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* GRÁFICO 3: RITMO DE GASTOS POR DIA DO MÊS */}
      {totalDespesasMes > 0 && (
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Ritmo de Gastos Diários no Mês
            </h3>
            <p className="text-xs text-zinc-400">
              Identifique em quais dias do mês acontecem os maiores picos de saída
            </p>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gastosPorDia} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="corGastoDia" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="dia" stroke="#a1a1aa" fontSize={10} tickLine={false} interval={2} />
                <YAxis stroke="#a1a1aa" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#3f3f46',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(val: any) => formatarMoeda(Number(val))}
                />
                <Area
                  type="monotone"
                  dataKey="Valor"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#corGastoDia)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* BÔNUS: PREVISÃO DE PARCELAMENTOS E FATURAS FUTURAS + TOP 5 MAIORES GASTOS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CalendarClock size={16} className="text-indigo-400" />
              Previsão de Parcelas nos Próximos Meses
            </h3>
            <p className="text-xs text-zinc-400">
              Quanto já está comprometido com compras parceladas nos meses seguintes
            </p>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {previsaoFuturo.proximosMeses.map((m) => (
              <div
                key={m.anoMes}
                className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-2.5 text-center"
              >
                <span className="text-[11px] font-bold text-indigo-300 block">{m.label}</span>
                <strong className="text-xs text-white mt-1 block truncate">
                  {formatarMoeda(m.total)}
                </strong>
                <span className="text-[10px] text-zinc-500 block">{m.qtdParcelas} item(ns)</span>
              </div>
            ))}
          </div>

          {previsaoFuturo.parcelasAtivasDoMes.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-zinc-800/80">
              <span className="text-xs font-semibold text-zinc-300 block">
                Compras parceladas cobradas neste mês ({previsaoFuturo.parcelasAtivasDoMes.length}):
              </span>
              {previsaoFuturo.parcelasAtivasDoMes.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between text-xs bg-zinc-950/60 border border-zinc-800/70 rounded-xl px-3 py-2"
                >
                  <div className="min-w-0">
                    <span className="font-semibold text-zinc-200 truncate block">{t.local}</span>
                    <span className="text-[10px] text-zinc-400">
                      {t.responsavel} • Parcela {t.parcelaInfo}
                    </span>
                  </div>
                  <strong className="text-amber-300 shrink-0">{formatarMoeda(t.valor)}</strong>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TOP 5 MAIORES DESPESAS DO MÊS + MÉTODO E PESSOA */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingDown size={16} className="text-rose-400" />
              Top 5 Maiores Gastos do Mês
            </h3>
            {top5Gastos.length === 0 ? (
              <p className="text-xs text-zinc-500">Sem despesas no mês.</p>
            ) : (
              <div className="space-y-2">
                {top5Gastos.map((t, idx) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between text-xs bg-zinc-950/60 border border-zinc-800/70 rounded-xl px-3 py-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}º
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-zinc-100 truncate">{t.local}</p>
                        <p className="text-[10px] text-zinc-400">
                          {formatarDataBR(t.data)} • {t.categoria} • {t.responsavel}
                        </p>
                      </div>
                    </div>
                    <strong className="text-rose-400 shrink-0 ml-2">
                      {formatarMoeda(t.valor)}
                    </strong>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users size={16} className="text-emerald-400" />
              Participação por Responsável e Método
            </h3>
            {[
              { nome: pessoa1, valor: resumoPorPessoa.p1, cor: 'bg-indigo-400' },
              { nome: pessoa2, valor: resumoPorPessoa.p2, cor: 'bg-pink-400' },
              { nome: 'Casal', valor: resumoPorPessoa.casal, cor: 'bg-amber-400' },
            ].map((p) => {
              const somaGeral =
                resumoPorPessoa.p1 + resumoPorPessoa.p2 + resumoPorPessoa.casal;
              const pct = somaGeral > 0 ? Math.round((p.valor / somaGeral) * 100) : 0;
              return (
                <div key={p.nome} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-200">{p.nome}</span>
                    <span className="text-zinc-400">
                      <strong className="text-white">{formatarMoeda(p.valor)}</strong> ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${p.cor}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

