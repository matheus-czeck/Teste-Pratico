import { Request, Response } from "express";
import prisma from "../config/db";

class PedidosController {
  static async listarPedidos(req: Request, res: Response) {
    const listaPedidos = await prisma.pedido.findMany()
    res.status(200).send(listaPedidos)
  }
  static criarPedido(req: Request, res: Response) {}
  static alterarPedido(req: Request, res: Response) {}
  static deletarPedido(req: Request, res: Response) {}
}

export default PedidosController;
