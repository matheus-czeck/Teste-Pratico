import PedidoType from "../Types/PedidoType";
import ProdutoType from "../Types/ProdutoType";
import ProdutoPedidoType from "../Types/ProdutoPedidoType";
import prisma from "../config/db";
import { RequisicaoInvalida } from "../Erros/RequisicaoInvalida";
import { NaoEncontrado } from "../Erros/NaoEncontrado";

class PedidoService {
  static async listar() {
    const listaPedidos: ProdutoPedidoType[] = await prisma.pedido.findMany({
      include: {
        produtos: {
          include: {
            produto: true,
          },
        },
      },
    });
    if (listaPedidos.length === 0) {
      return [];
    }
    return listaPedidos;
  }

  static async criar(data: PedidoType) {
    const { nome, produtos } = data;

    if (!nome || !Array.isArray(produtos)) {
      throw new RequisicaoInvalida("Dados invalidos!");
    } else if (produtos.length > 5 || produtos.length < 1) {
      throw new RequisicaoInvalida("Quantidade de itens invalido");
    }

    const produtosEncontrados = await prisma.produto.findMany({
      where: {
        id: {
          in: produtos,
        },
      },
    });

    if (produtosEncontrados.length === 0) {
      throw new NaoEncontrado("Os produtos nao foram encontrados");
    }

    const valorProdutos = produtosEncontrados.reduce(
      (total: number, produto: ProdutoType) => total + produto.preco,
      0,
    );

    if (valorProdutos > 1000) {
      throw new RequisicaoInvalida(
        `A soma dos itens nao podem ultrapassar R$:1000,00. Total: ${valorProdutos}`,
      );
    }

    const pedidoCriado = await prisma.pedido.create({
      data: {
        nome,
        produtos: {
          create: produtos.map((id) => ({
            produto: {
              connect: { id },
            },
          })),
        },
      },
    });

    return pedidoCriado;
  }

  static async deletar(id: number) {
    if (isNaN(id)) {
      throw new RequisicaoInvalida("Id invalido!");
    }
    await prisma.pedidoProduto.deleteMany({
      where: { pedidoId: id },
    });
    await prisma.pedido.delete({
      where: { id },
    });
    
    return "Pedido deletado com sucesso";
  }
}

export default PedidoService;
