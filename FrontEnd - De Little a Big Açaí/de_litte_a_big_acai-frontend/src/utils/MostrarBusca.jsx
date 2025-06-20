
//import AbrirLoadModel from "./AbrirLoadModal"
//import {FecharLoadModel} from "../utils/FecharLoadModel"
import { useEffect } from 'react';
import { useState } from 'react';
import { FormatarData } from '../utils/FormatarData';

function MostrarBusca(i) {
    //AbrirLoadModel()
    if (Array.isArray(i.listaVazia) && i.listaVazia.length === 0) {
        return (
            <>
                <div className="h2. Bootstrap heading text-center mt-5">{i.mensagem}</div>
            </>
        )
    }

    {/*
    } else {
        return (
            <>
                {data.map((i) => {
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
                    var volume = intero + "," + decimal + " " + i.unidMedida

                    //Data de Validade
                    var dataValidadeString
                    if (i.dataValidade == null) {
                        dataValidadeString = "Sem Data de Validade"
                    } else {
                        dataValidadeString = FormatarData(i.dataValidade, false)
                    }

                    //Em Estoque
                    var emEstoqueValor
                    var emEstoqueClass
                    if (i.emEstoque) {
                        emEstoqueValor = "Em Estoque"
                        emEstoqueClass = "table-light table-hover"
                    } else {
                        emEstoqueValor = "Item Retirado"
                        emEstoqueClass = "table-danger table-hover"
                    }

                    //Data de Saída
                    var dataSaidString
                    if (i.dataSaid == null) {
                        dataSaidString = "Sem Data de Saída"
                    } else {
                        dataSaidString = FormatarData(i.dataSaid, true)
                    }

                    return <tr className={emEstoqueClass} key={i.idItem}>
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
                        <td className="text-nowrap">{dataValidadeString}</td>
                        <td className="text-nowrap">{i.lote}</td>
                        <td className="text-nowrap">{i.enderecoArmazen}</td>
                        <td className="text-nowrap">{emEstoqueValor}</td>
                        <td className="text-nowrap">{i.motivoSaida}</td>
                        <td className="text-nowrap">{dataSaidString}</td>
                    </tr>
                })}
            </>
        )
    }
    */}
}

export default MostrarBusca