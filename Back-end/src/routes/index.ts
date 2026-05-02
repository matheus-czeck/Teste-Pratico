import { Request, Response } from "express";
import express from "express";
import pedidos from "./pedido";
import produtos from "./produto";
import produtoPedido from "./produtoPedido";

const routes = (app: any) => {
  app
    .route("/")
    .get((req: Request, res: Response) => res.status(200).send("Tela inicial"));

    app.use(express.json(), produtos, pedidos, produtoPedido);
    
  };

export default routes;
