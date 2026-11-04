export type AccountId = 'casal' | 'vitoria';
export type TransactionType =
  | 'despesa'
  | 'receita'
  | 'poupanca'
  | 'resgate_poupanca'
  | 'transferencia_interna';
export type PaymentMethod = 'Pix/Débito' | 'Cartão de Crédito' | 'Dinheiro';
export type ActiveTab = 'home' | 'extrato' | 'metas' | 'enxoval' | 'observacoes' | 'graficos';
export type PrioridadeItem = 'Alta' | 'Média' | 'Baixa';

export interface Transaction {
  id: string;
  tipo: TransactionType;
  valor: number;
  data: string; // YYYY-MM-DD
  local: string;
  categoria: string;
  tags: string[];
  metodoPagamento: PaymentMethod;
  parcelaInfo?: string;
  responsavel: string;
  pendenteSync?: boolean;
}

export interface EnxovalItem {
  id: string;
  comodo: string;
  item: string;
  quantidade: number;
  valor: number;
  prioridade: PrioridadeItem;
  observacao: string;
  comprado: boolean;
}

export interface ObservacaoMes {
  id: string;
  mes: string; // YYYY-MM
  autor: string;
  titulo: string;
  texto: string;
  valor?: number;
  resolvido: boolean;
  dataCriacao: string; // YYYY-MM-DD
}

export interface CategoryBudget {
  categoria: string;
  limite: number;
}

export const COMODOS_PADRAO = [
  'Cozinha',
  'Quarto',
  'Sala',
  'Banheiro',
  'Lavanderia / Área de Serviço',
  'Outros',
];

export const CATEGORIAS_DESPESA = [
  'Comida',
  'Lazer',
  'Transporte',
  'Contas Fixas',
  'Casa/Casamento',
  'Compras',
  'Saúde',
  'Outros',
];

export const CATEGORIAS_RECEITA = [
  'Salário',
  'Freelance',
  'Rendimentos',
  'Reembolso/Pix',
  'Outros',
];

export const CATEGORIAS_POUPANCA = [
  'Reserva do Casal',
  'Casamento / Casa',
  'Investimentos',
  'Meta Individual',
];

export const CATEGORIAS_RESGATE = [
  'Emergência / Imprevisto',
  'Compra para Casa / Enxoval',
  'Pagamento de Conta',
  'Uso Pessoal',
  'Outros',
];

export const CATEGORIAS_TRANSFERENCIA = [
  'Transferência entre Contas',
  'Movimentação Interna',
  'Pagamento de Fatura Própria',
];

export const ORCAMENTOS_INICIAIS: CategoryBudget[] = [
  { categoria: 'Comida', limite: 800 },
  { categoria: 'Lazer', limite: 450 },
  { categoria: 'Casa/Casamento', limite: 600 },
  { categoria: 'Transporte', limite: 300 },
  { categoria: 'Contas Fixas', limite: 700 },
  { categoria: 'Compras', limite: 400 },
  { categoria: 'Saúde', limite: 250 },
  { categoria: 'Outros', limite: 200 },
];

export const obterDataHojeLocal = () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

export const obterMesAtualLocal = () => obterDataHojeLocal().slice(0, 7);

export const formatarMoeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const formatarDataBR = (dataISO: string) => {
  const partes = dataISO.split('-');
  if (partes.length !== 3) return dataISO;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
};

export const nomeMesAno = (anoMes: string) => {
  const [ano, mes] = anoMes.split('-').map(Number);
  const data = new Date(ano, mes - 1, 1);
  const nome = data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  return nome.charAt(0).toUpperCase() + nome.slice(1);
};

export const normalizarTextoBusca = (str: string) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export const sugerirCategoriaPorDescricao = (
  desc: string,
  tipo: TransactionType
): string | null => {
  const t = normalizarTextoBusca(desc);
  if (!t || t.length < 2) return null;

  if (tipo === 'receita') {
    if (t.includes('salario') || t.includes('pagamento') || t.includes('remuneracao') || t.includes('adiantamento')) {
      return 'Salário';
    }
    if (t.includes('rendimento') || t.includes('dividendo') || t.includes('cdb') || t.includes('juros')) {
      return 'Rendimentos';
    }
    if (t.includes('freela') || t.includes('projeto') || t.includes('servico')) {
      return 'Freelance';
    }
    if (t.includes('pix') || t.includes('reembolso') || t.includes('estorno')) {
      return 'Reembolso/Pix';
    }
    return null;
  }

  if (tipo === 'poupanca') {
    if (t.includes('casamento') || t.includes('casa') || t.includes('apto') || t.includes('enxoval')) {
      return 'Casamento / Casa';
    }
    if (t.includes('cdb') || t.includes('acao') || t.includes('tesouro') || t.includes('invest')) {
      return 'Investimentos';
    }
    return null;
  }

  if (tipo === 'resgate_poupanca') {
    if (t.includes('casa') || t.includes('enxoval') || t.includes('geladeira') || t.includes('fogao') || t.includes('moveis')) {
      return 'Compra para Casa / Enxoval';
    }
    if (t.includes('fatura') || t.includes('conta') || t.includes('boleto')) {
      return 'Pagamento de Conta';
    }
    if (t.includes('emergencia') || t.includes('medico') || t.includes('imprevisto')) {
      return 'Emergência / Imprevisto';
    }
    return null;
  }

  if (tipo !== 'despesa') return null;

  if (
    t.includes('uber') ||
    t.includes('99') ||
    t.includes('onibus') ||
    t.includes('van') ||
    t.includes('pedagio') ||
    t.includes('combustivel') ||
    t.includes('gasolina') ||
    t.includes('etanol') ||
    t.includes('posto') ||
    t.includes('estacionamento') ||
    t.includes('zona azul') ||
    t.includes('metro')
  ) {
    return 'Transporte';
  }

  if (
    t.includes('ifood') ||
    t.includes('mercado') ||
    t.includes('supermercado') ||
    t.includes('padaria') ||
    t.includes('lanche') ||
    t.includes('restaurante') ||
    t.includes('burger') ||
    t.includes('mc donalds') ||
    t.includes('mcdonalds') ||
    t.includes('bk') ||
    t.includes('sushi') ||
    t.includes('esfiha') ||
    t.includes('pizza') ||
    t.includes('acai') ||
    t.includes('sorvete') ||
    t.includes('doceria') ||
    t.includes('cantina') ||
    t.includes('atacadao') ||
    t.includes('assai') ||
    t.includes('hortifruti') ||
    t.includes('acougue') ||
    t.includes('cafe') ||
    t.includes('almoço') ||
    t.includes('almoco') ||
    t.includes('jantar')
  ) {
    return 'Comida';
  }

  if (
    t.includes('enxoval') ||
    t.includes('casamento') ||
    t.includes('geladeira') ||
    t.includes('fogao') ||
    t.includes('microondas') ||
    t.includes('sofa') ||
    t.includes('colchao') ||
    t.includes('panela') ||
    t.includes('reforma') ||
    t.includes('obra') ||
    t.includes('leroy') ||
    t.includes('tokstok') ||
    t.includes('madeiramadeira') ||
    t.includes('camicado')
  ) {
    return 'Casa/Casamento';
  }

  if (
    t.includes('faculdade') ||
    t.includes('claro') ||
    t.includes('vivo') ||
    t.includes('tim') ||
    t.includes('internet') ||
    t.includes('energia') ||
    t.includes('elektro') ||
    t.includes('cpfl') ||
    t.includes('enel') ||
    t.includes('sabesp') ||
    t.includes('agua') ||
    t.includes('aluguel') ||
    t.includes('condominio') ||
    t.includes('fatura') ||
    t.includes('cartao') ||
    t.includes('boleto') ||
    t.includes('seguro')
  ) {
    return 'Contas Fixas';
  }

  if (
    t.includes('farmacia') ||
    t.includes('drogaria') ||
    t.includes('droga') ||
    t.includes('medico') ||
    t.includes('consulta') ||
    t.includes('exame') ||
    t.includes('dentista') ||
    t.includes('psicolog') ||
    t.includes('terapia') ||
    t.includes('otica') ||
    t.includes('remedio') ||
    t.includes('academia')
  ) {
    return 'Saúde';
  }

  if (
    t.includes('cinema') ||
    t.includes('spotify') ||
    t.includes('netflix') ||
    t.includes('steam') ||
    t.includes('playstation') ||
    t.includes('jogo') ||
    t.includes('ingresso') ||
    t.includes('bar') ||
    t.includes('festa') ||
    t.includes('futebol') ||
    t.includes('viagem') ||
    t.includes('passeio') ||
    t.includes('hotel')
  ) {
    return 'Lazer';
  }

  if (
    t.includes('shopee') ||
    t.includes('amazon') ||
    t.includes('mercado livre') ||
    t.includes('mercadolivre') ||
    t.includes('shein') ||
    t.includes('magalu') ||
    t.includes('cea') ||
    t.includes('renner') ||
    t.includes('riachuelo') ||
    t.includes('roupa') ||
    t.includes('presente') ||
    t.includes('barbeiro') ||
    t.includes('cabeleireiro') ||
    t.includes('salao') ||
    t.includes('perfume') ||
    t.includes('cosmetico')
  ) {
    return 'Compras';
  }

  return null;
};
