import imagemVazia from '../assets/img/logotipo4.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/estoqueInforItem.css'
import { useEffect, useRef, useState } from 'react'

function EstoqueInforItem({ dadosItemLifting }) {
    const formFiltro = useRef(null)
    const bntClose = useRef(null)

    const [dataInputEntr, setDataInputEntr] = useState('dataInput')
    const [dataInputVal, setDataInputVal] = useState('dataInput')
    const [dataInputSaid, setDataInputSaid] = useState('dataInput')

    const [isEditable, setIsEditable] = useState(true)

    const item = dadosItemLifting
    const [nome, setNome] = useState('')
    const [marca, setMarca] = useState('')
    const [emEstoque, setEmEstoque] = useState('')
    const [descricao, setDescricao] = useState('')
    const [categoria, setCategoria] = useState('')
    const [dataEntr, setDataEntr] = useState('')
    const [validade, setValidade] = useState('')
    const [preco, setPreco] = useState('')
    const [quant, setQuant] = useState('')
    const [valorTotal, setValorTotal] = useState('')
    const [volume, setVolume] = useState('')
    const [medida, setMedida] = useState('')
    const [lote, setLote] = useState('')
    const [armazenamento, setArmazenamento] = useState('')
    const [dataSaida, setDataSaida] = useState('')
    const [motivoSaida, setMotivoSaida] = useState('')

    useEffect(() => {
        setNome(item?.nomeItem)
        setMarca(item?.marca)
        setEmEstoque(item?.emEstoque ? 'Em Estoque' : 'Item Retirado')
        setDescricao(item?.descricaoItem)
        setCategoria(item?.categoria || 'sem categoria')
        setDataEntr(item?.dataEntr?.slice(0, 16) || '')
        setValidade(item?.dataValidade?.slice(0, 10) || '')
        setPreco(item?.precoUni.toFixed(2))
        setQuant(item?.quant)
        setValorTotal((item?.precoUni * item?.quant).toFixed(2))
        setVolume(item?.volumeUni)
        setMedida(item?.unidMedida || 'nao determinada')
        setLote(item?.lote)
        setArmazenamento(item?.enderecoArmazen)
        setDataSaida(item?.dataSaid?.slice(0, 16) || '')
        setMotivoSaida(item?.motivoSaida || 'nao retirado')

        console.log(item?.imagemItem)
    }, [item])


    function dadosFormulario(e) {
        e.preventDefault()
        const formData = new FormData(formFiltro.current)
        bntClose.current.click()
    }

    return (
        <>
            <div id="inforItemOffcanvas" className="offcanvas offcanvas-start bg-primary-subtle" tabIndex="-1">
                <form ref={formFiltro} onSubmit={dadosFormulario} className='row overflow-auto'>
                    <div id='divClose' className="d-flex justify-content-end align-items-center">
                        <button ref={bntClose} type="button" className="btn-close pe-3 pe-xl-5" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="col-xl-4 d-flex align-items-center justify-content-center justify-content-lx-end">
                        <div className="card shadow">
                            <div className='container-img bg-info rounded d-flex align-items-center justify-content-center'>
                                <img src={item?.imagemItem != '' ? `data:image;base64,${item?.imagemItem}` : imagemVazia} className="card-img-top bg-white rounded p-3" alt="..." />{/*<!--Imagem-->*/}
                            </div>
                            <div className="card-body p-5">
                                <h3 className="card-title">ID: {item?.idItem}</h3>
                                <div className="form-floating mb-3">{/*<!--Nome-->*/}
                                    <input type="text" className="form-control" id='inforNome' name="inforNome" value={nome} onChange={(e) => setNome(e.target.value)} disabled={!isEditable} />
                                    <label className="form-label" htmlFor="inforNome">Nome</label>
                                </div>
                                <div className="form-floating mb-3">{/*<!--Marca-->*/}
                                    <input type="text" className="form-control" id="inforMarca" name="inforMarca" value={marca} onChange={(e) => setMarca(e.target.value)} disabled={!isEditable} />
                                    <label className="form-label" htmlFor="inforMarca">Marca</label>
                                </div>
                                <input className="form-control" type="file" id="imagemItem" name="imagemItem" disabled={!isEditable} />
                            </div>
                        </div>

                    </div>
                    <div className="col-8 ">
                        <div className='row ps-5'>
                            <div className="col-12 col-xl-6">
                                <div className="d-flex flex-column">
                                    <div className="form-floating mb-3">{/*<!--Em Estoque-->*/}
                                        <select className="form-select" id="inforEstoque" name="inforEstoque" value={emEstoque} onChange={(e) => setEmEstoque(e.target.value)} disabled={!isEditable} >
                                            <option value="Em Estoque">Em Estoque</option>
                                            <option value="Item Retirado">Item Retirado</option>
                                        </select>
                                        <label className="form-label" htmlFor="inforEstoque">Em Estoque</label>
                                    </div>

                                    <div className="form-floating mb-3">{/*<!--Descrição-->*/}
                                        <input type="text" className="form-control" id="inforDescricao" name="inforDescricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} disabled={!isEditable} />
                                        <label className="form-label" htmlFor="inforDescricao">Descrição</label>
                                    </div>

                                    <div className="form-floating mb-3">{/*<!--Categoria-->*/}
                                        <select className="form-select" id="inforCategoria" name="inforCategoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} disabled={!isEditable} >
                                            <option value="sem categoria">Sem Categoria</option>
                                            <option value="frutas">Frutas</option>
                                            <option value="bases/massas">Bases/Massas</option>
                                            <option value="complementos">Complementos</option>
                                        </select>
                                        <label className="form-label" htmlFor="inforCategotia">Categoria</label>
                                    </div>

                                    <fieldset>{/*<!--Data de entrada-->*/}
                                        <div className="form-floating mb-3">
                                            <input className={"form-control text-dark "} type="datetime-local" id="inforDataEntr" name="inforDataEntr" value={dataEntr} onChange={(e) => setDataEntr(e.target.value)} disabled={!isEditable} />
                                            <label htmlFor="inforDataEntr" className="form-label">Data de entrada</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mb-3">{/*<!--Data de validade-->*/}
                                        <div className="form-floating">
                                            <input className={"form-control text-dark"} type="date" id="inforDataValidade" name="inforDataValidade" value={validade} onChange={(e) => setValidade(e.target.value)} disabled={!isEditable} />
                                            <label htmlFor="inforDataValidade" className="form-label">Data de validade</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mb-3">{/*<!--Preço por unidade-->*/}
                                        <div className="form-floating">
                                            <input className="form-control" type="number" step="any" id="inforPrecoUni" name="inforPrecoUni" value={preco} onChange={(e) => setPreco(e.target.value)} disabled={!isEditable} />
                                            <label htmlFor="inforPrecoUni" className="form-label">Preço por unidade</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mb-3">{/*<!--Quantidade-->*/}
                                        <div className="form-floating">
                                            <input className="form-control" type="number" step="any" id="inforQuant" name="inforQuant" value={quant} onChange={(e) => setQuant(e.target.value)} disabled={!isEditable} />
                                            <label htmlFor="inforQuant" className="form-label">Quantidade</label>
                                        </div>
                                    </fieldset>


                                </div>
                            </div>



                            <div className="col-12 col-xl-6">
                                <div className="row pe-5">

                                    <fieldset className="mb-3">{/*<!--Valor Total-->*/}
                                        <div className="form-floating">
                                            <input className="form-control" type="number" step="any" id="inforValorTotal" name="inforValorTotal" value={valorTotal} onChange={(e) => setValorTotal(e.target.value)} disabled={!isEditable} />
                                            <label htmlFor="inforValorTotal" className="form-label">Valor Total</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mb-3">{/*<!--Volume e Unidade de medida-->*/}
                                        <div className="input-group form-floating">
                                            <div className="form-floating">
                                                <input className="form-control" type="number" step="any" id="inforVol" style={{ textAlign: 'end' }} name="inforVol" value={volume} onChange={(e) => setVolume(e.target.value)} disabled={!isEditable} />
                                                <label htmlFor="inforVol" className="form-label">Volume por unidade</label>
                                            </div>
                                            <div className="form-floating">
                                                <select className="form-select" id="inforUnidMedida" name="inforUnidMedida" value={medida} onChange={(e) => setMedida(e.target.value)} disabled={!isEditable}>
                                                    <option value="nao determinada">Não Determinada</option>
                                                    <option value="kilogramas">Kilogramas(Kg)</option>
                                                    <option value="gramas">Gramas(g)</option>
                                                    <option value="litros">Litros(l)</option>
                                                    <option value="mililitros">Mililitros(ml)</option>
                                                    <option value="unidade">Unidades(und)</option>
                                                </select>
                                                <label className="form-label" htmlFor="inforUnidMedida">Unidade de medida</label>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div className="form-floating mb-3">{/*<!--Lote-->*/}
                                        <input type="text" className="form-control" id="inforLote" name="inforLote" value={lote} onChange={(e) => setLote(e.target.value)} disabled={!isEditable} />
                                        <label className="form-label" htmlFor="inforLote">Lote</label>
                                    </div>

                                    <div className="form-floating mb-3">{/*<!--Endereço de Armazenamento-->*/}
                                        <input type="text" className="form-control" id="inforEnderecoArmazen" name="inforEnderecoArmazen" value={armazenamento} onChange={(e) => setArmazenamento(e.target.value)} disabled={!isEditable} />
                                        <label className="form-label" htmlFor="inforEnderecoArmazen">Endereço de armazenamento</label>
                                    </div>

                                    <fieldset className="mb-3">{/*<!--Data de Saída-->*/}
                                        <div className="form-floating">
                                            <input className={"form-control text-dark "} type="datetime-local" id="inforDataSaid" name="inforDataSaid" value={dataSaida} onChange={(e) => setDataSaida(e.target.value)} disabled={!isEditable} />
                                            <label htmlFor="inforDataSaid" className="form-label">Data de saída</label>
                                        </div>
                                    </fieldset>

                                    <div className="form-floating mb-3">{/*<!--Motivo de Saída-->*/}
                                        <select className="form-select" id="inforMotivoSaida" name="inforMotivoSaida" value={motivoSaida} onChange={(e) => setMotivoSaida(e.target.value)} disabled={!isEditable}>
                                            <option value="nao retirado">Item Não Retirado</option>
                                            <option value="perda">Perda</option>
                                            <option value="produção">Produção</option>
                                            <option value="devolução">Devolução</option>
                                            <option value="vencido">Vencido</option>
                                        </select>
                                        <label className="form-label" htmlFor="inforMotivoSaida">Motivo de Saída</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div id='divBtns' className="col-12 p-5">
                                <button type="submit" className="btn btn-outline-primary col-12 fw-bold">Editar</button>
                            </div>
                        </div>
                    </div>
                </form >
            </div>
        </>
    )
}

export default EstoqueInforItem;