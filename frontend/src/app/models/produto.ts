export interface Produto {
  id: number;

  codigo: string;
  codigoBarras: string;

  nome: string;
  marca: string;
  colecao: string;
  descricao: string;

  custo: number;
  preco: number;
  precoPromocional: number;

  estoque: number;
  estoqueMinimo: number;

  ativo: boolean;
  dataCadastro: string;

  categoriaId: number;
  categoriaNome: string;

  fornecedorId: number;
  fornecedorNome: string;

  corId: number;
  corNome: string;

  tamanhoId: number;
  tamanhoDescricao: string;
}

export type ProdutoRequest = Omit<
  Produto,
  | 'id'
  | 'categoriaNome'
  | 'fornecedorNome'
  | 'corNome'
  | 'tamanhoDescricao'
>;