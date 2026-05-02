import { Request, Response } from "express";
import prisma from "../config/db";

class ProdutoPedidoController {
  static async deletarProdutoPedido(req: Request, res: Response) {
    const pedidoId = Number(req.params.id);
    const { produtoId } = req.body;

    if (isNaN(pedidoId)) {
      return res.status(400).json("Dados fornecidos esta incorretos!");
    }
    try {
      await prisma.pedidoProduto.deleteMany({
        where: {
          pedidoId,
          produtoId,
        },
      });

      res.status(200).send("Produto removido com sucesso!");
    } catch (error) {
      res.status(500).json(`Ocorreu um erro interno: ${error}`);
    }
  }

  static async adicionarProdutoPedido(req: Request, res: Response) {
    const pedidoId = Number(req.params.id);
    const { produtoId } = req.body;
    try {
      if (isNaN(pedidoId) || isNaN(produtoId)) {
        return res.status(400).json(`Os dados fornecido sao invalidos`);
      }

      const produtosEncontrados = await prisma.pedidoProduto.findMany({
        where: {
          pedidoId,
        },
      });

      const idsDeProdutos = produtosEncontrados.map((id) => id.produtoId);

      const produtosCompleto = await prisma.produto.findMany({
        where: {
          id: {
            in: idsDeProdutos,
          },
        },
      });
      if (produtosCompleto.length >= 5) {
        return res
          .status(400)
          .json(`Maximo de itens atingido: ${produtosCompleto.length} itens`);
      }

      const somaValorProdutosExistentes = produtosCompleto.reduce(
        (total, p) => total + p.preco,
        0,
      );

      const produtoAdicionar = await prisma.produto.findUnique({
        where: {
          id: produtoId,
        },
      });

      if (!produtoAdicionar) {
        return res.status(400).json(`Produto nao foi encontrado`);
      }

      const total =
        somaValorProdutosExistentes + (produtoAdicionar?.preco || 0);

      if (total > 1000) {
        return res
          .status(400)
          .json(`Valor total: R$:${total} nao pode exceder R$:1000,00`);
      }

      if (produtosEncontrados.length >= 5) {
        return res
          .status(400)
          .json("Nao e possivel adicionar mais de 5 produtos");
      }

      await prisma.pedidoProduto.create({
        data: {
          pedidoId,
          produtoId,
        },
      });
      res.status(201).send("Produto adicionado com sucesso!");
    } catch (error) {
      res.status(500).json(`Ocorreu um erro interno: ${error}`);
    }
  }
}

export default ProdutoPedidoController;
