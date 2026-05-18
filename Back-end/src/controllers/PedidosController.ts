import { NextFunction, Request, Response } from "express";
import PedidoService from "../Service/PedidoService";

class PedidosController {
  static async listarPedidos(_req: Request, res: Response, next: NextFunction) {
    try {
      const todosPedidos = await PedidoService.listar();
      res.status(200).json(todosPedidos);
    } catch (error) {
      next(error);
    }
  }

  static async criarPedido(req: Request, res: Response, next: NextFunction) {
    const novoPedido = await PedidoService.criar(req.body);
    try {
      res.status(201).json(novoPedido);
    } catch (error) {
      next(error);
    }
  }

  static async deletarPedido(req: Request, res: Response, next: NextFunction) {
    try {
      const deletar = await PedidoService.deletar(Number(req.params.id));
      res.status(200).json(deletar);
    } catch (error) {
      next(error);
    }
  }
}

export default PedidosController;
