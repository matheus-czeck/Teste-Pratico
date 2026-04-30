import express from "express";
import PedidosController from "../controllers/PedidosController";

const routes = express.Router();

routes
  .get("/pedidos", PedidosController.listarPedidos)
  .post("/criarPedido", PedidosController.criarPedido)
  .put("/alterarPedido", PedidosController.alterarPedido)
  .delete("/deletarPedido", PedidosController.deletarPedido);


  export default routes;
