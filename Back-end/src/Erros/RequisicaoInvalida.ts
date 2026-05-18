import { ErrorMain } from "./ErroMain";

export class RequisicaoInvalida extends ErrorMain {
    constructor(message: string = "Requisicao invalida"){
        super(message, 400)
    }
}