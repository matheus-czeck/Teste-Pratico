import { Request, Response } from "express";
import prisma from "../config/db";

class PedidosController {
  static async listarPedidos(req: Request, res: Response) {
    try {
      const listaPedidos = await prisma.pedido.findMany({
        include: { produtos: true },
      });

      if (listaPedidos.length === 0) {
        return res
          .status(404)
          .json("Pedido nao encontrado");
      } else {
        res.status(200).json(listaPedidos);
      }
    } catch (error) {
      res.status(500).json(`Ocorreu um erro interno: ${error}`);
    }
  }

  static async criarPedido(req: Request, res: Response) {
    const { nome, produtos } = req.body;

    if (!nome || !Array.isArray(produtos)) {
      return res.status(400).json("Dados invalidos!");
    }

    try {
      if (produtos.length > 5 || produtos.length < 1) {
        return res.status(400).json("Quantidade de itens invalido");
      }

      let produtosEncontrados = await prisma.produto.findMany({
        where: {
          id: {
            in: produtos,
          },
        },
      });
      const valorProdutos = produtosEncontrados.reduce(
        (total, produto) => total + produto.preco,
        0,
      );

      if (valorProdutos > 1000) {
        return res
          .status(200)
          .json(
            `A soma de itens nao podem ultrapassar R$:1000,00. Total: ${valorProdutos}`,
          );
      }

      await prisma.pedido.create({
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
      res.status(201).json("Pedido criado com sucesso");
    } catch (error) {
      res.send({
        status: 500,
        message: `Ocorreu um erro interno: ${error}`,
      });
    }
  }

  static async deletarPedido(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json("Id invalido!");
    }

    try {
      await prisma.pedidoProduto.deleteMany({
        where: { pedidoId: id },
      });

      await prisma.pedido.delete({
        where: { id },
      });
      res.status(200).json("Pedido deletado com sucesso");
    } catch (error) {
      res.status(500).json(`Ocorreu um erro interno: ${error}`);
    }
  }
}

export default PedidosController;
