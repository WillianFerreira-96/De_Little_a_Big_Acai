import React, { useEffect, useState } from 'react';
import { BuscaAutomatica } from '../services/BuscaAutomatica';
//import { FormatarData } from '../utils/FormatarData';
import MostrarBusca from '../utils/MostrarBusca';

function PageBuscarEstoque() {
    useEffect(() => {
        const activeBuscar = document.getElementById('activeBuscar')
        activeBuscar.className = 'nav-link activated'
    })

    const [itens, setItens] = useState([])
    useEffect(() => {
        BuscaAutomatica().then((res) => {
            console.log(res)
            setItens(res)
        })
    }, [])

    return (
        <>
            <main>
                <div id="overFlowDiv" style={{
                    overflow: "auto",
                    height: "calc(100vh - 56px)",
                    width: "100vw"
                }}>
                    <table className="table table-light table-striped">
                        <thead>
                            <tr>
                                <th>Imagem</th>
                                <th className="text-nowrap">ID</th>
                                <th className="text-nowrap">Nome</th>
                                <th className="text-nowrap">Marca</th>
                                <th className="text-nowrap">Descrição</th>
                                <th className="text-nowrap">Categoria</th>
                                <th className="text-nowrap">Data de Entrada</th>
                                <th className="text-nowrap">Preço por unidade</th>
                                <th className="text-nowrap">Quantidade</th>
                                <th className="text-nowrap">Valor Total</th>
                                <th className="text-nowrap">Volume por unidade</th>
                                <th className="text-nowrap">Data de Validade</th>
                                <th className="text-nowrap">Lote</th>
                                <th className="text-nowrap">Endereço de Armazenamento</th>
                                <th className="text-nowrap">Em Estoque</th>
                                <th className="text-nowrap">Motivo da Saída</th>
                                <th className="text-nowrap">Data de Saída</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MostrarBusca(itens)}
                        </tbody>
                    </table>                    
                        <div id="empty"></div>
                </div>
            </main>
        </>
    )
}

export default PageBuscarEstoque;