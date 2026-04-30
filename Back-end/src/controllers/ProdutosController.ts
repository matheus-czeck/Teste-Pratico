import prisma from "../config/db";
import { RequestHandler, Request, Response } from "express";

export class ProdutosController {

  static async listarProdutos(req: Request, res: Response){
    try {
      const todosProdutos = await prisma.produto.findMany();
      res.send(todosProdutos);

    } catch (err) {
      res.send(err)
    }
  }

  
}
