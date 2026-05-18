
import prisma from "../config/db";
import { NaoEncontrado } from "../Erros/NaoEncontrado";
import { RequisicaoInvalida } from "../Erros/RequisicaoInvalida";

class PedidoProdutoService {
  static async adicionarProduto(pedidoId: number, produtoId: number) {

    if (isNaN(pedidoId) || isNaN(produtoId)) {
      throw new RequisicaoInvalida(`Os dados fornecido estao invalidos`);
    }

    const produtosEncontrados = await prisma.pedidoProduto.findMany({
      where: {
        pedidoId,
      },
      include: {
        produto: true
      }
    });

    if (produtosEncontrados.length >= 5) {
      throw new RequisicaoInvalida(
        `Maximo de itens atingido: ${produtosEncontrados.length} itens`,
      );
    }

    const somaValorProdutosExistentes = produtosEncontrados.reduce(
      (total, p) => total + p.produto.preco,
      0,
    );

    const produtoAdicionar = await prisma.produto.findUnique({
      where: {
        id: produtoId
      },
    });

    if (!produtoAdicionar) {
      throw new NaoEncontrado(`Produto nao foi encontrado`);
    }

    const total = somaValorProdutosExistentes + (produtoAdicionar.preco);

    if (total > 1000) {
      throw new RequisicaoInvalida(`Valor total: R$:${total}, excede o limite R$:1000,00 `);
    }

    await prisma.pedidoProduto.create({
      data: {
        pedidoId,
        produtoId,
      },
    });
     

    return produtoAdicionar.nome;
  }

  static async deletarProduto(pedidoId: number, produtoId: number) {
    if (isNaN(produtoId) || isNaN(pedidoId)) {
      throw new RequisicaoInvalida("Dados fornecidos esta incorretos!");
    }

    const nomeDoProduto =  await prisma.produto.findUnique({
      where: {
        id: produtoId,
      },
    });
    if(!nomeDoProduto){
      throw new NaoEncontrado("Produto nao encontrado")
    }

    await prisma.pedidoProduto.deleteMany({
      where: {
        pedidoId,
        produtoId,
      },
    });

    return nomeDoProduto.nome;
  }


}

export default PedidoProdutoService;
