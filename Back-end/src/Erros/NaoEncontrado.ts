import { ErrorMain } from "./ErroMain";

export class NaoEncontrado extends ErrorMain {

    constructor(message: string = "Recurso nao encotrado" ){
        super(message, 404);     
    }

}