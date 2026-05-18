import ProdutoType from "./ProdutoType"

type ProdutoPedidoType = {  
    id: number,
    nome: string,
    produtos: {
        pedidoId: number,
        produtoId: number,
        produto: ProdutoType
    }[]
}

export default ProdutoPedidoType