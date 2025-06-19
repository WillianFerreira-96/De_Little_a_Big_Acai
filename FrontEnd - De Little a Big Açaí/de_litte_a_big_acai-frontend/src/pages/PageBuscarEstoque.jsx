import React, { useEffect, useState } from 'react';
import { BuscaAutomatica } from '../services/BuscaAutomatica';
import { FormatarData } from '../utils/FormatarData';

function PageBuscarEstoque() {
    useEffect(() => {
        const activeBuscar = document.getElementById('activeBuscar')
        activeBuscar.className = 'nav-link activated'
    })

    const [itens, setItens] = useState([])
    useEffect(() => {
        BuscaAutomatica().then((res) => { setItens(res) })
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
                            {itens.map((i) => {
                                //Data de Entrada
                                var dataEntrString
                                if (i.dataEntr == null) {
                                    dataEntrString = "Sem Data de Entrada"
                                } else {
                                    dataEntrString = FormatarData(i.dataEntr, true)
                                }

                                //Preço por Unidade
                                var [intero, decimal] = i.precoUni.toFixed(2).toString().split(".")
                                var preco = "R$ " + intero + "," + decimal

                                //Valor Total
                                var [intero, decimal] = (i.precoUni * i.quant).toFixed(2).toString().split(".")
                                var valorTotal = "R$ " + intero + "," + decimal

                                //Volume
                                var [intero, decimal] = i.volumeUni.toFixed(2).toString().split(".")
                                var volume = intero+","+decimal+" "+i.unidMedida


                                return <tr className="table-light table-hover" key={i.idItem}>
                                    <td>{i.imagemItem}</td>
                                    <td>000{i.idItem}</td>
                                    <td className="text-nowrap">{i.nomeItem}</td>
                                    <td className="text-nowrap">{i.marca}</td>
                                    <td className="text-nowrap">{i.descricaoItem}</td>
                                    <td className="text-nowrap">{i.categoria}</td>
                                    <td className="text-nowrap">{dataEntrString}</td>
                                    <td className="text-nowrap">{preco}</td>
                                    <td className="text-nowrap">{`${i.quant} unidade(s)`}</td>
                                    <td className="text-nowrap">{valorTotal}</td>
                                    <td className="text-nowrap">{volume}</td>
                                </tr>

                            })}
                        </tbody>
                    </table>
                    <div id="ifEmpty"></div>
                </div>
            </main>
        </>
    )
}

export default PageBuscarEstoque;