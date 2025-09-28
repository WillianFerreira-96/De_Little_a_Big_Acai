import imagemVazia from '../assets/img/logotipo4.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/estoqueInforItem.css'
import { useEffect, useRef, useState } from 'react'
import { EditarItem } from '../services/EditarItem'
import ConfirmaEdicaoModal from './ConfirmaEdicaoModal'
import AbrirConfirmaEdicaoModal from '../utils/AbrirConfirmaEdicaoModal'

function EstoqueInforItem({ dadosItemLifting }) {

    const formFiltro = useRef(null)
    const bntClose = useRef(null)
    const switchEdicao = useRef(null)
    const fileInputRef = useRef(null)
    
    const [isEditable, setIsEditable] = useState(false)
    const [preview, setPreview] = useState(imagemVazia)

    const [border, setBorder] = useState(' border ')
    const [fileBtn, setFileBtn] = useState(' fileBtnDisable text-secondary ')
    const [btns_deEdicao, setBtns_deEdicao] = useState(' d-none ')
    const [itemEditado, setItemEditado] = useState(null)

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
    const [volume, setVolume] = useState('')
    const [medida, setMedida] = useState('')
    const [lote, setLote] = useState('')
    const [armazenamento, setArmazenamento] = useState('')
    const [dataSaida, setDataSaida] = useState('')
    const [motivoSaida, setMotivoSaida] = useState('')

    useEffect(() => {
        setPreview(item?.imagemItem != '' ? `data:image;base64,${item?.imagemItem}`: imagemVazia)
        setNome(item?.nomeItem)
        setMarca(item?.marca)
        setEmEstoque(item?.emEstoque ? 'Em Estoque' : 'Item Retirado')
        setDescricao(item?.descricaoItem)
        setCategoria(item?.categoria || 'sem categoria')
        setDataEntr(item?.dataEntr?.slice(0, 16) || '')
        setValidade(item?.dataValidade?.slice(0, 10) || '')
        setPreco(item?.precoUni.toFixed(2))
        setQuant(item?.quant)
        setVolume(item?.volumeUni)
        setMedida(item?.unidMedida || '')
        setLote(item?.lote)
        setArmazenamento(item?.enderecoArmazen)
        setDataSaida(item?.dataSaid?.slice(0, 16) || '')
        setMotivoSaida(item?.motivoSaida || 'nao retirado')
    }, [item])

    function btnEditar() {
        if (!isEditable) {
            setIsEditable(true)
            setBorder("border-2")
            setFileBtn("")
            setBtns_deEdicao('d-flex flex-column ms-5')
        } else {
            setIsEditable(false)
            setBorder(' border ')
            setFileBtn(' fileBtnDisable text-secondary ')
            setBtns_deEdicao('d-none')
        }
    }

    function cancelarEdicao() {
        setPreview(item?.imagemItem != '' ? `data:image;base64,${item?.imagemItem}`: imagemVazia)
        setNome(item?.nomeItem)
        setMarca(item?.marca)
        setDescricao(item?.descricaoItem)
        setCategoria(item?.categoria || 'sem categoria')
        setValidade(item?.dataValidade?.slice(0, 10) || '')
        setPreco(item?.precoUni.toFixed(2))
        setQuant(item?.quant)
        setVolume(item?.volumeUni)
        setMedida(item?.unidMedida || '')
        setLote(item?.lote)
        setArmazenamento(item?.enderecoArmazen)

        setIsEditable(false)
        setBorder(' border ')
        setFileBtn(' fileBtnDisable text-secondary ')
        setBtns_deEdicao('d-none')

        fileInputRef.current.value = null

        switchEdicao.current.click()
    }

    function confirmarEdicao(e){
        e.preventDefault()
        setItemEditado(new FormData(formFiltro.current))
        AbrirConfirmaEdicaoModal()
    }

    function previsualizar(e) {
        const file = e.target.files[0];
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    }

    return (
        <>  
            <ConfirmaEdicaoModal itemEditado={itemEditado} />
            <div id="inforItemOffcanvas" className="offcanvas offcanvas-start bg-primary" tabIndex="-1">
                <form ref={formFiltro} onSubmit={confirmarEdicao} className='row overflow-y-auto overflow-x-hidden'>
                    <div id='divClose' className="d-flex justify-content-end align-items-center">
                        <button ref={bntClose} type="button" className="btn-close pe-3 pe-xl-5" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="col-xl-4 p-0 d-flex align-items-center justify-content-center justify-content-lx-end">
                        <div className="card shadow">
                            <div className='container-img bg-card rounded d-flex align-items-center justify-content-center'>
                                <img src={preview} className="card-img-top bg-white rounded p-3" alt="..." />{/*<!--Imagem-->*/}
                            </div>
                            <div className="card-body bg-card-body p-5">
                                <h3 className="card-title">ID: {item?.idItem}</h3>
                                <input type="hidden" name="InforId" value={item?.idItem} />
                                <div className="form-floating mb-3">{/*<!--Nome-->*/}
                                    <input type="text" className={"form-control " + border} id='inforNome' name="inforNome" value={nome} onChange={(e) => setNome(e.target.value)} disabled={!isEditable} />
                                    <label className="form-label" htmlFor="inforNome">Nome</label>
                                </div>
                                <div className="form-floating mb-3">{/*<!--Marca-->*/}
                                    <input type="text" className={"form-control " + border} id="inforMarca" name="inforMarca" value={marca} onChange={(e) => setMarca(e.target.value)} disabled={!isEditable} />
                                    <label className="form-label" htmlFor="inforMarca">Marca</label>
                                </div>
                                <input ref={fileInputRef} className={"form-control " + border + fileBtn} type="file" id="imagemItem" name="imagemItem" onChange={previsualizar} disabled={!isEditable} />
                            </div>
                        </div>

                    </div>
                    <div className="col-12 col-xl-8 p-5 p-xl-0">
                        <div className='row'>
                            <div className="col-12 col-xl-6">
                                <div className="d-flex flex-column ps-0 pe-0 ps-md-5 pe-md-5 ps-xl-5 pe-xl-0">
                                    <div className="form-floating mb-3">{/*<!--Em Estoque-->*/}
                                        <input className="form-control border" id="inforEstoque" name="inforEstoque" value={emEstoque} disabled />
                                        <label className="form-label" htmlFor="inforEstoque">Em Estoque</label>
                                    </div>

                                    <div className="form-floating mb-3">{/*<!--Descrição-->*/}
                                        <input type="text" className={"form-control " + border} id="inforDescricao" name="inforDescricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} disabled={!isEditable} />
                                        <label className="form-label" htmlFor="inforDescricao">Descrição</label>
                                    </div>

                                    <div className="form-floating mb-3">{/*<!--Categoria-->*/}
                                        <select className={"form-select " + border} id="inforCategoria" name="inforCategoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} disabled={!isEditable} >
                                            <option value="sem categoria">Sem Categoria</option>
                                            <option value="frutas">Frutas</option>
                                            <option value="bases/massas">Bases/Massas</option>
                                            <option value="complementos">Complementos</option>
                                        </select>
                                        <label className="form-label" htmlFor="inforCategotia">Categoria</label>
                                    </div>

                                    <fieldset>{/*<!--Data de entrada-->*/}
                                        <div className="form-floating mb-3">
                                            <input className="form-control text-dark border" type="datetime-local" id="inforDataEntr" name="inforDataEntr" value={dataEntr} disabled />
                                            <label htmlFor="inforDataEntr" className="form-label">Data de entrada</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mb-3">{/*<!--Data de validade-->*/}
                                        <div className="form-floating">
                                            <input className={"form-control text-dark " + border} type="date" id="inforDataValidade" name="inforDataValidade" value={validade} onChange={(e) => setValidade(e.target.value)} disabled={!isEditable} />
                                            <label htmlFor="inforDataValidade" className="form-label">Data de validade</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mb-3">{/*<!--Preço por unidade-->*/}
                                        <div className="form-floating">
                                            <input className={"form-control " + border} type="number" step="any" id="inforPrecoUni" name="inforPrecoUni" value={preco} onChange={(e) => setPreco(e.target.value)} disabled={!isEditable} />
                                            <label htmlFor="inforPrecoUni" className="form-label">Preço por unidade</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mb-3">{/*<!--Quantidade-->*/}
                                        <div className="form-floating">
                                            <input className={"form-control " + border} type="number" step="any" id="inforQuant" name="inforQuant" value={quant} onChange={(e) => setQuant(e.target.value)} disabled={!isEditable} />
                                            <label htmlFor="inforQuant" className="form-label">Quantidade</label>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>

                            <div className="col-12 col-xl-6">
                                <div className="d-flex flex-column ps-0 pe-0 ps-md-5 pe-md-5 ps-xl-0 pe-xl-5">
                                    <fieldset className="mb-3">{/*<!--Valor Total-->*/}
                                        <div className="form-floating">
                                            <input className="form-control border" type="number" step="any" id="inforValorTotal" name="inforValorTotal" value={(quant * preco).toFixed(2)} disabled />
                                            <label htmlFor="inforValorTotal" className="form-label">Valor Total</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mb-3">{/*<!--Volume e Unidade de medida-->*/}
                                        <div className="input-group form-floating">
                                            <div className="form-floating">
                                                <input className={"form-control " + border} type="number" step="any" id="inforVol" style={{ textAlign: 'end' }} name="inforVol" value={volume} onChange={(e) => setVolume(e.target.value)} disabled={!isEditable} />
                                                <label htmlFor="inforVol" className="form-label">Volume por unidade</label>
                                            </div>
                                            <div className="form-floating">
                                                <select className={"form-select " + border} id="inforUnidMedida" name="inforUnidMedida" value={medida} onChange={(e) => setMedida(e.target.value)} disabled={!isEditable}>
                                                    <option value="">Não Determinada</option>
                                                    <option value="kg">Kilogramas</option>
                                                    <option value="g">Gramas</option>
                                                    <option value="l">Litros</option>
                                                    <option value="ml">Mililitros</option>
                                                    <option value="und">Unidades</option>
                                                </select>
                                                <label className="form-label" htmlFor="inforUnidMedida">Unidade de medida</label>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div className="form-floating mb-3">{/*<!--Lote-->*/}
                                        <input type="text" className={"form-control " + border} id="inforLote" name="inforLote" value={lote} onChange={(e) => setLote(e.target.value)} disabled={!isEditable} />
                                        <label className="form-label" htmlFor="inforLote">Lote</label>
                                    </div>

                                    <div className="form-floating mb-3">{/*<!--Endereço de Armazenamento-->*/}
                                        <input type="text" className={"form-control " + border} id="inforEnderecoArmazen" name="inforEnderecoArmazen" value={armazenamento} onChange={(e) => setArmazenamento(e.target.value)} disabled={!isEditable} />
                                        <label className="form-label" htmlFor="inforEnderecoArmazen">Endereço de armazenamento</label>
                                    </div>

                                    <fieldset className="mb-3">{/*<!--Data de Saída-->*/}
                                        <div className="form-floating">
                                            <input className="form-control text-dark border" type="datetime-local" id="inforDataSaid" name="inforDataSaid" value={dataSaida} disabled />
                                            <label htmlFor="inforDataSaid" className="form-label">Data de saída</label>
                                        </div>
                                    </fieldset>

                                    <div className="form-floating mb-3">{/*<!--Motivo de Saída-->*/}
                                        <input className="form-control border" id="inforMotivoSaida" name="inforMotivoSaida" value={motivoSaida} disabled />
                                        <label className="form-label" htmlFor="inforMotivoSaida">Motivo de Saída</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="modoEditar">
                            <div id='switchCheckEditar' className="row p-5">
                                <div className='d-flex align-items-end'>
                                    <div className='d-flex flex-column align-items-center'>
                                        <div className="form-switch">
                                            <input id="switchCheckEditar"
                                                ref={switchEdicao}
                                                name="switchCheckEditar"
                                                className="form-check-input"
                                                type="checkbox"
                                                onClick={btnEditar} />
                                            <input type="hidden" name="switchCheckEditar" />
                                        </div>
                                        <label className=" mt-2 text-black" style={{ fontSize: '.7rem', fontWeight: 'bolder' }} htmlFor="switchCheckEditar">Modo Editar</label>
                                    </div>
                                </div>
                            </div>

                            <div className={btns_deEdicao + ''}>
                                <button type="submit" className="btn btn-outline-primary mt-4 col-3 fw-bold">Salvar</button>
                                <button type="button" onClick={cancelarEdicao} className="btn btn-outline-danger mt-4 col-3 fw-bold">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </form >
            </div>
        </>
    )
}

export default EstoqueInforItem;