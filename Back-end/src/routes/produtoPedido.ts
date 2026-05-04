import express from "express";
import ProdutoPedidoController from "../controllers/ProdutoPedidoController";

const routes = express.Router();

routes
  .delete(
    "/deletarProdutoPedido/:id",
    ProdutoPedidoController.deletarProdutoPedido,
  )
  .post(
    "/adicionarProdutoPedido/:id",
    ProdutoPedidoController.adicionarProdutoPedido,
  );

export default routes;
