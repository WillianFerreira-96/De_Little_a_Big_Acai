import React, { useEffect, useState, useRef } from 'react';
import { BuscaAutomatica } from '../services/BuscaAutomatica';
import { BuscaNavBar } from '../services/BuscaNavBar';
import { BuscaComFiltro } from '../services/BuscaComFiltro';
import { FormatarData } from '../utils/FormatarData';
import LoadModel from '../components/LoadModel'
import AbrirLoadModel from '../utils/AbrirLoadModel';
import FecharLoadModel from '../utils/FecharLoadModel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/estoqueBuscar.css';
import imagemVazia from '../assets/img/logotipo4.png'


function EstoqueBuscar({ liftingNomeOuID, formFilter, onDadosItemLifting }) {
    const [divVisivel, setDivVisivel] = useState(false)
    const [itens, setItens] = useState([])
    const [notFound, setNotFound] = useState([])

    const overFlowDiv = useRef(null)
    const btnInforItem = useRef(null)

    //Ativar elemento 'Buscar' da NavBar
    useEffect(() => {
        const activeBuscar = document.getElementById('activeBuscar')
        const activeCadastrar = document.getElementById('activeCadastrar')
        activeBuscar.className = 'nav-link activated'
        activeCadastrar.className = 'nav-link'
    })

    //Busca Automática
    useEffect(() => {
        if (liftingNomeOuID === null) {
            AbrirLoadModel()
            BuscaAutomatica().then((data) => {
                MostrarBusca(data)
            })
        }
    }, [])

    //Busca pela Barra de Navegação
    useEffect(() => {
        if (liftingNomeOuID != null) {
            AbrirLoadModel()
            BuscaNavBar(liftingNomeOuID).then((data) => {
                MostrarBusca(data)
            })
        }
    }, [liftingNomeOuID])

    //Busca Com Filtro
    useEffect(() => {
        if (formFilter != null) {
            AbrirLoadModel()
            BuscaComFiltro(formFilter).then((data) => {
                MostrarBusca(data)
            })

            overFlowDiv.current.scrollTo({ left: 0, behavior: 'smooth' });

        }
    }, [formFilter])

    //Mostrar Resultados das Buscas
    function MostrarBusca(result) {        
        setTimeout(() => {
            setItens([])
            setNotFound([])
            if (Array.isArray(result.listaVazia) && result.listaVazia.length == 0) {
                setDivVisivel(true)
                setNotFound(result.mensagem)
                FecharLoadModel()
            } else {
                setDivVisivel(false)
                setItens(result)
                FecharLoadModel()
            }
        }, 150);
    }

    function mostrarItem(item) {
        onDadosItemLifting(item)
        btnInforItem.current.click()
    }

    return <>
        <LoadModel />
        <main>
            <div id="overFlowDiv" ref={overFlowDiv}>
                <table className="table align-middle table-head mt-1 table-hover">
                    <thead className='sticky-top'>
                        <tr>
                            <th className='ps-5'>Imagem</th>
                            <th className="text-nowrap">Em Estoque</th>
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
                            <th className="text-nowrap">Motivo da Saída</th>
                            <th className="text-nowrap">Data de Saída</th>
                        </tr>
                    </thead>
                    <tbody>                        
                        {itens.map((i) => {
                            //Em Estoque
                            var emEstoqueValor
                            var emEstoqueClass
                            if (i.emEstoque) {
                                emEstoqueValor = "Em Estoque"
                                emEstoqueClass = "table-light table-hover"
                            } else {
                                emEstoqueValor = "Item Retirado"
                                emEstoqueClass = "item-retirado table-light table-hover"
                            }

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
                            i.preco = preco

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

                            //Data de Saída
                            var dataSaidString
                            if (i.dataSaid == null) {
                                dataSaidString = "Sem Data de Saída"
                            } else {
                                dataSaidString = FormatarData(i.dataSaid, true)
                            }

                            return <>                                
                                <tr onDoubleClick={()=>{mostrarItem(i)}} className={emEstoqueClass} key={i.idItem} style={{cursor: 'pointer'}}>
                                    <td>
                                        <img className='miniImagem ps-5' src={i.imagemItem!=''?`data:image;base64,${i.imagemItem}` : imagemVazia} />
                                    </td>
                                    <td className="text-nowrap">{emEstoqueValor}</td>
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
                                    <td className="text-nowrap">{i.motivoSaida}</td>
                                    <td className="text-nowrap">{dataSaidString}</td>
                                </tr>
                            </>

                        })}
                    </tbody>
                </table>
                <button ref={btnInforItem} className='d-none' data-bs-toggle="offcanvas" data-bs-target="#inforItemOffcanvas" aria-controls="inforItemOffcanvas"></button>
                <div style={{ display: divVisivel ? 'block' : 'none' }} className="h2 text-center mt-5">{notFound}</div>
            </div>
        </main>
    </>
}

export default EstoqueBuscar;