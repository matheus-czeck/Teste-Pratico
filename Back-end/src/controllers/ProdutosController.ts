import prisma from "../config/db";
import { RequestHandler, Request, Response } from "express";

export class ProdutosController {
  static async listarProdutos(req: Request, res: Response) {
    try {
      const todosProdutos = await prisma.produto.findMany();

      if (todosProdutos !== null) {
        res.send({
          json: todosProdutos,
          status: 200,
        });
      } else {
        res.send({
          message: "Não há produtos cadastrados!",
          status: 400,
        });
      }
    } catch (err) {
      res.send(`Aconteceu um erro interno: ${err}`);
    }
  }
}
