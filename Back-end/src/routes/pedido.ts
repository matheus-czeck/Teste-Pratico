import express from "express";
import PedidosController from "../controllers/PedidosController";

const routes = express.Router();

routes
  .get("/pedidos", PedidosController.listarPedidos)
  .delete("/deletarPedido/:id", PedidosController.deletarPedido)
  .post("/criarPedido", PedidosController.criarPedido);

export default routes;
