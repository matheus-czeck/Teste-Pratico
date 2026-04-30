import express from "express";
import { ProdutosController } from "../controllers/ProdutosController";

const routes = express.Router();

routes.get("/produtos", ProdutosController.listarProdutos);


export default routes;