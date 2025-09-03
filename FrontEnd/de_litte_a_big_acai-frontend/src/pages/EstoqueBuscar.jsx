import React, { useEffect, useState, useRef } from 'react';
import { BuscaAutomatica } from '../services/BuscaAutomatica';
import { BuscaNavBar } from '../services/BuscaNavBar';
import { BuscaComFiltro } from '../services/BuscaComFiltro';
import { FormatarData } from '../utils/FormatarData';
import LoadModal from '../components/LoadModal'
import AbrirLoadModal from '../utils/AbrirLoadModal';
import FecharLoadModal from '../utils/FecharLoadModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/estoqueBuscar.css';
import imagemVazia from '../assets/img/logotipo4.png'


function EstoqueBuscar({ liftingNomeOuID, formFilter, onDadosItemLifting }) {
    const [divVisivel, setDivVisivel] = useState(false)
    const [itens, setItens] = useState([])
    const [notFound, setNotFound] = useState([])

    const mainOverFlow_x = useRef(null)
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
            AbrirLoadModal()
            BuscaAutomatica().then((data) => {
                MostrarBusca(data)
            })
        }
    }, [])

    //Busca pela Barra de Navegação
    useEffect(() => {
        if (liftingNomeOuID != null) {
            AbrirLoadModal()
            BuscaNavBar(liftingNomeOuID).then((data) => {
                MostrarBusca(data)
            })
        }
    }, [liftingNomeOuID])

    //Busca Com Filtro
    useEffect(() => {
        if (formFilter != null) {
            AbrirLoadModal()
            BuscaComFiltro(formFilter).then((data) => {
                MostrarBusca(data)
            })

            overFlowDiv-y.current.scrollTo({ left: 0, behavior: 'smooth' });

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
                FecharLoadModal()
            } else {
                setDivVisivel(false)
                setItens(result)
                FecharLoadModal()
            }
        }, 150);
    }

    function mostrarItem(item) {
        onDadosItemLifting(item)
        btnInforItem.current.click()
    }

    return <>
        <LoadModal />
        <main ref={mainOverFlow_x} id='mainOverFlow_x'>
                <table className="table align-middle table-hover">
                    <thead className='sticky-top table-head'>
                        <tr>
                            <th className='ps-5 text-center pt-4'>Imagem</th>
                            <th className="text-nowrap pt-4">Em Estoque</th>
                            <th className="text-nowrap pt-4">ID</th>
                            <th className="text-nowrap pt-4">Nome</th>
                            <th className="text-nowrap pt-4">Marca</th>
                            <th className="text-nowrap pt-4">Descrição</th>
                            <th className="text-nowrap pt-4">Categoria</th>
                            <th className="text-nowrap pt-4">Data de Entrada</th>
                            <th className="text-nowrap pt-4">Preço por unidade</th>
                            <th className="text-nowrap pt-4">Quantidade</th>
                            <th className="text-nowrap pt-4">Valor Total</th>
                            <th className="text-nowrap pt-4">Volume por unidade</th>
                            <th className="text-nowrap pt-4">Data de Validade</th>
                            <th className="text-nowrap pt-4">Lote</th>
                            <th className="text-nowrap pt-4">Endereço de Armazenamento</th>
                            <th className="text-nowrap pt-4">Motivo da Saída</th>
                            <th className="text-nowrap pt-4">Data de Saída</th>
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
                                <tr onDoubleClick={() => { mostrarItem(i) }} className={emEstoqueClass + 'overflow-y-scroll'} key={i.idItem} style={{ cursor: 'pointer' }}>
                                    <td>
                                        <div className='d-flex justify-content-center'>
                                            <img className='miniImagem ps-5' src={i.imagemItem != '' ? `data:image;base64,${i.imagemItem}` : imagemVazia} />
                                        </div>
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
        </main>
    </>
}

export default EstoqueBuscar;