// ==========================================
// JusCore - TypeScript Type Definitions
// ==========================================

export interface Cliente {
  id: string;
  nome: string;
  cpf?: string;
  rg?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  dataNascimento?: Date;
  profissao?: string;
  estadoCivil?: 'solteiro' | 'casado' | 'divorciado' | 'viuvo' | 'outro';
  naturalidade?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Processo {
  id: string;
  clienteId: string;
  numeroProcesso?: string;
  vara?: string;
  tribunal?: string;
  comarca?: string;
  tipo: 'civel' | 'criminal' | 'trabalhista' | 'tributario' | 'outro';
  status: 'em_andamento' | 'finalizado' | 'arquivado';
  dataDistribuicao?: Date;
  valorCausa?: number;
  objeto: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Peticao {
  id: string;
  processoId: string;
  clienteId: string;
  titulo: string;
  tipo: 'inicial' | 'contestacao' | 'replica' | 'manifestacao' | 'recurso' | 'outro';
  conteudo: string; // JSON do editor
  status: 'rascunho' | 'revisao' | 'finalizada' | 'protocolada';
  dataProtocolo?: Date;
  numeroProtocolo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prazo {
  id: string;
  processoId: string;
  descricao: string;
  dataLimite: Date;
  tipo: 'peticao' | 'audiencia' | 'recurso' | 'outro';
  status: 'pendente' | 'cumprido' | 'vencido';
  alertado: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Honorario {
  id: string;
  clienteId: string;
  processoId?: string;
  tipo: 'contratual' | 'sucumbencia' | 'outro';
  valor: number;
  parcelas?: number;
  parcelasPagas?: number;
  status: 'pendente' | 'parcial' | 'pago';
  dataVencimento?: Date;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Documento {
  id: string;
  clienteId?: string;
  processoId?: string;
  nome: string;
  tipo: 'rg' | 'cpf' | 'procuracao' | 'contrato' | 'peticao' | 'outro';
  url: string;
  tamanho: number;
  createdAt: Date;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  oab?: string;
  avatar?: string;
  role: 'admin' | 'advogado' | 'assistente';
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// Editor de Petições (TipTap)
// ==========================================

export interface EditorBlock {
  type: 'paragraph' | 'heading' | 'bulletList' | 'orderedList' | 'blockquote';
  content?: string;
  attrs?: Record<string, any>;
}

export interface PeticaoTemplate {
  id: string;
  nome: string;
  categoria: string;
  conteudo: string; // JSON do TipTap
  variaveis: string[]; // ['{{nome_cliente}}', '{{cpf}}', etc]
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// API Response Types
// ==========================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
