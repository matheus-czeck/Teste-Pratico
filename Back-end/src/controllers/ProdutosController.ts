
import { NextFunction, Request, Response } from "express";
import ProdutoService from "../Service/ProdutoService";

export class ProdutosController {
  static async listarProdutos(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const produtos = await ProdutoService.encontrarProduto();
      res.status(200).json(produtos);
    } catch (error) {
      next(error);
    }
  }
}
