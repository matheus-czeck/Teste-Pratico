import { Request, Response } from "express";
import prisma from "../config/db";

class ProdutoPedidoController {
  static async deletarProdutoPedido(req: Request, res: Response) {
    const pedidoId = Number(req.params.id);
    const { produtoId } = req.body;

    if (isNaN(pedidoId)) {
      return res.status(404).send("Id invalido");
    }
    try {
      await prisma.pedidoProduto.deleteMany({
        where: {
          pedidoId,
          produtoId,
        },
      });

      res.status(200).send("Produto removido com sucesso!");
    } catch (erro) {
      res.status(500).send("Ocorreu um erro interno");
    }
  }

  static async adicionarProdutoPedido(req: Request, res: Response) {
    const pedidoId = Number(req.params.id);
    const { produtoId } = req.body;

    await prisma.pedidoProduto.createMany({
        data: {
            pedidoId,
            produtoId
        }
    })
    res.status(201).send("Produto adicionado com sucesso!")
  }
}

export default ProdutoPedidoController;
