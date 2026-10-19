export type AccountId = 'casal' | 'vitoria';
export type TransactionType = 'despesa' | 'receita' | 'poupanca' | 'resgate_poupanca';
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

export const CATEGORIAS_RECEITA = ['Salário', 'Freelance', 'Rendimentos', 'Reembolso/Pix', 'Outros'];

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