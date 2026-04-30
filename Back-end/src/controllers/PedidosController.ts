import { Request, Response } from "express";
import prisma from "../config/db";

class PedidosController {
  static async listarPedidos(req: Request, res: Response) {
    const listaPedidos = await prisma.pedido.findMany();

    if (listaPedidos !== null) {
      res.status(200).send(listaPedidos);
    } else {
      res.send({
        message: "Nenhum pedido foi encontrado",
        status: 404,
      });
    }
  }
  static async criarPedido(req: Request, res: Response) {
    const pedido = req.params;

    const criarPedido = await prisma.pedido.create();

    if (criarPedido) {
      res.send({
        message: "Pedido criado com sucesso!",
        status: 201,
      });
    } else {
      res.send({
        message: "Algo deu errado ao criar o pedido!",
        status: 400,
      });
    }
  }
  static async alterarPedido(req: Request, res: Response) {
    const alterarPedidoId = req.params;

    const pedidoId = await prisma.pedido.findById(alterarPedidoId.id);

    const pedidoAlterado = await pedidoId.replace(alterarPedidoId);

    if (pedidoAlterado) {
      res.send({
        message: "Pedido alterado com sucesso!",
        status: 200,
      });
    } else {
      res.send({
        message: "Algo deu errado ao criar o pedido!",
        status: 400,
      });
    }
  }
  static async deletarPedido(req: Request, res: Response) {
    const deletarPedido = req.params

    const pedidoDeletado =  await prisma.pedido.deleteById(deletarPedido.id);
  
    if(pedidoDeletado){
      res.send({message: })
    }
  }
}

export default PedidosController;
