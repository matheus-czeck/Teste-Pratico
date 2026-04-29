import { Request, Response } from "express";

class PedidosController {
  static listarPedidos(req: Request, res: Response) {
    res.send("Estou aqui");
  }

  static cadastarNovoPedido(req: Request, res: Response) {}
  static alterarPedido(req: Request, res: Response) {}
  static deletarPedido(req: Request, res: Response) {}
}

export default PedidosController;
