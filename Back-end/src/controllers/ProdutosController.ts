import prisma from "../config/db";
import { RequestHandler, Request, Response } from "express";

export class ProdutosController {
  static async listarProdutos(req: Request, res: Response) {
    try {
      const todosProdutos = await prisma.produto.findMany();

      if (todosProdutos.length !== 0) {
        res.status(200).json(todosProdutos);
      } else {
        return res.status(404).json("Nao ha produtos cadastrados!");
      }
    } catch (error) {
      res.status(500).json(`Ocorreu um erro interno: ${error}`);
    }
  }
}
