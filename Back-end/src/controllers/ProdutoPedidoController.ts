import { NextFunction, Request, Response } from "express";
import PedidoProdutoService from "../Service/ProdutoPedidoService";


class ProdutoPedidoController {
  static async deletarProdutoPedido(req: Request, res: Response, next: NextFunction ) {
    try {
      const pedidoId = Number(req.params.id);
      const produtoId = req.body.produtoId;

      const produtoDeletado = await PedidoProdutoService.deletarProduto(
        pedidoId,
        produtoId,
      );

      res.status(200).send(`Produto: "${produtoDeletado}" removido com sucesso!`);
    } catch (error) {
      next(error)
    }
  }

  static async adicionarProdutoPedido(req: Request, res: Response, next: NextFunction) {
    const pedidoId = Number(req.params.id);
    const produtoId = req.body.produtoId;
    try {
      const adicionarProduto = await PedidoProdutoService.adicionarProduto(
        pedidoId,
        produtoId,
      );
      res
        .status(201)
        .send(`Produto: "${adicionarProduto}" adicionado com sucesso!`);
    } catch (error) {
      next(error)
    }
  }
}

export default ProdutoPedidoController;
