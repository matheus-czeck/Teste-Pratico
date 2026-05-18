import ProdutoType from "../Types/ProdutoType";
import prisma from "../config/db";

class ProdutoService {
  static async encontrarProduto() {
    const todosProdutos: ProdutoType[] = await prisma.produto.findMany();

    if (todosProdutos.length === 0) {
      return [];
    }
    return todosProdutos
  } 
  
}

export default ProdutoService;
