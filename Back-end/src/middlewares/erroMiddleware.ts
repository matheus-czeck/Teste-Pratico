import { NextFunction, Request, Response } from "express";
import { ErrorMain } from "../Erros/ErroMain";


export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {

    if(err instanceof ErrorMain){
        res.status(err.status).json({
            status: err.status,
            message: err.message,
        })
        return
    }
    
    res.status(500).json({
        status: 500,
        message: "Ocorreu um erro interno!"
    })


}