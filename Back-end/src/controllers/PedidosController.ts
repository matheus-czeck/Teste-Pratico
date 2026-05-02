import { Request, Response } from "express";
import prisma from "../config/db";

class PedidosController {
  static async listarPedidos(req: Request, res: Response) {
    const listaPedidos = await prisma.pedido.findMany({
      include: { produtos: true },
    });

    if (listaPedidos !== null) {
      res.status(200).json(listaPedidos);
    } else {
      res.send({
        message: "Nenhum pedido foi encontrado",
        status: 404,
      });
    }
  }

  static async criarPedido(req: Request, res: Response) {
    const { nome, numero, produtos } = req.body;

    if (isNaN(numero) || !nome || !Array.isArray(produtos)) {
      return res.status(400).send("Dados enviado estao no formato errado.");
    }

    try {
      const novoPedido = await prisma.pedido.create({
        data: {
          nome,
          numero,
          produtos: {
            create: produtos.map((id) => ({
              produto: {
                connect: { id },
              },
            })),
          },
        },
      });
      res.send({
        status: 201,
        json: novoPedido,
        message: "Pedido criado com sucesso!",
      });
    } catch (erro) {
      res.status(500).send("Ocorreu um erro interno");
    }
  }

  static async deletarPedido(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).send("id invalido");
    }

    try {
      await prisma.pedidoProduto.deleteMany({
        where: { pedidoId: id },
      });

      await prisma.pedido.delete({
        where: { id },
      });

      res.send({
        message: "Pedido deletado com sucesso",
        status: 200,
      });
    } catch (error) {
      res.status(500).send("Ocorreu um erro interno");
    }
  }
}

export default PedidosController;
