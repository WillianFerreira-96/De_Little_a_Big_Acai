import logo from '../assets/img/logotipo5.jpeg'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/estoqueInforItem.css'
import { useEffect, useRef, useState } from 'react'

function EstoqueInforItem({ onFormFilter }) {
    const formFiltro = useRef(null)
    const bntClose = useRef(null)
    const [dataInputEntr, setDataInputEntr] = useState('dataInput')
    const [dataInputVal, setDataInputVal] = useState('dataInput')
    const [dataInputSaid, setDataInputSaid] = useState('dataInput')

    function dadosFormulario(e) {
        e.preventDefault()
        const formData = new FormData(formFiltro.current)
        onFormFilter(formData)

        bntClose.current.click()
    }

    return (
        <>
            <div id="inforItemOffcanvas" className="offcanvas offcanvas-start bg-primary-subtle" tabIndex="-1">
                <form ref={formFiltro} onSubmit={dadosFormulario} className='row'>
                    <div className="col-4 d-flex align-items-center justify-content-end">

                        <div className="card shadow">
                            <div className='container-img bg-info p-0 rounded d-flex align-items-center justify-content-center'>
                                <img src={logo} className="card-img-top bg-white rounded p-3" alt="..." />{/*<!--Imagem-->*/}
                            </div>
                            <div className="card-body p-5">
                                <h3 className="card-title">ID: {375}</h3>
                                <div className="form-floating mb-3">{/*<!--Nome-->*/}
                                    <input type="text" className="form-control" id='filterNome' name="filterNome" />
                                    <label className="form-label" htmlFor="filterNome">Nome</label>
                                </div>
                                <div className="form-floating mb-3">{/*<!--Marca-->*/}
                                    <input type="text" className="form-control" id="filterMarca" name="filterMarca" />
                                    <label className="form-label" htmlFor="filterMarca">Marca</label>
                                </div>
                                <input className="form-control" type="file" id="imagemItem" name="imagemItem" />
                            </div>
                        </div>

                    </div>
                    <div className="col-7 ">
                        <div className='row'>
                            <div className="col-6 descricoes">
                                <div className="atributosItens pt-5 pb-5 ps-5 pe-2">
                                    <div className="form-floating mb-3">{/*<!--Em Estoque-->*/}
                                        <select className="form-select" id="filterEstoque" name="filterEstoque">
                                            <option value="" defaultValue></option>
                                            <option value="Em Estoque">Em Estoque</option>
                                            <option value="Item Retirado">Item Retirado</option>
                                        </select>
                                        <label className="form-label" htmlFor="filterEstoque">Em Estoque</label>
                                    </div>

                                    <div className="form-floating mb-3">{/*<!--Descrição-->*/}
                                        <input type="text" className="form-control" id="filterDescricao" name="filterDescricao" />
                                        <label className="form-label" htmlFor="filterDescricao">Descrição</label>
                                    </div>

                                    <div className="form-floating mb-3">{/*<!--Categoria-->*/}
                                        <select className="form-select" id="filterCategotia" name="filterCategotia">
                                            <option value="" defaultValue></option>
                                            <option value="frutas">Frutas</option>
                                            <option value="bases/massas">Bases/Massas</option>
                                            <option value="complementos">Complementos</option>
                                        </select>
                                        <label className="form-label" htmlFor="filterCategotia">Categoria</label>
                                    </div>

                                    <fieldset>{/*<!--Data de entrada-->*/}
                                        <div className="form-floating mb-3">
                                            <input className={"form-control text-dark " + dataInputEntr} type="date" id="filterDataEntr" name="filterDataEntr" />
                                            <label htmlFor="filterDataEntr" className="form-label">Data de entrada</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mb-3">{/*<!--Data de validade-->*/}
                                        <div className="form-floating">
                                            <input className={"form-control text-dark " + dataInputVal} type="date" id="filterDataValidade" name="filterDataValidade" />
                                            <label htmlFor="filterDataValidade" className="form-label">Data de validade</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mb-3">{/*<!--Preço por unidade-->*/}
                                        <div className="form-floating">
                                            <input className="form-control" type="number" step="any" id="filterPrecoUni" name="filterPrecoUni" />
                                            <label htmlFor="filterPrecoUni" className="form-label">Preço por unidade</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mb-3">{/*<!--Quantidade-->*/}
                                        <div className="form-floating">
                                            <input className="form-control" type="number" step="any" id="filterQuant" name="filterQuant" />
                                            <label htmlFor="filterQuant" className="form-label">Quantidade</label>
                                        </div>
                                    </fieldset>


                                </div>
                            </div>



                            <div className="col descricoes">
                                <div className="atributosItens pt-5 pb-5 pe-5 ps-2">

                                    <fieldset className="mb-3">{/*<!--Valor Total-->*/}
                                        <div className="form-floating">
                                            <input className="form-control" type="number" step="any" id="filterValorTotal" name="filterValorTotal" />
                                            <label htmlFor="filterValorTotal" className="form-label">Valor Total</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mb-3">{/*<!--Volume e Unidade de medida-->*/}
                                        <div className="input-group form-floating">
                                            <div className="form-floating">
                                                <input className="form-control" type="number" step="any" id="filterVol" name="filterVol" />
                                                <label htmlFor="filterVol" className="form-label">Volume por unidade</label>
                                            </div>
                                            <div className="form-floating">
                                                <select className="form-select" id="filterUnidMedida" name="filterUnidMedida">
                                                    <option value="" defaultValue></option>
                                                    <option value="kg">Kilogramas(Kg)</option>
                                                    <option value="g">Gramas(g)</option>
                                                    <option value="l">Litros(l)</option>
                                                    <option value="ml">Mililitros(ml)</option>
                                                    <option value="und">Unidades(und)</option>
                                                </select>
                                                <label className="form-label" htmlFor="filterUnidMedida">Unidade de medida</label>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div className="form-floating mb-3">{/*<!--Lote-->*/}
                                        <input type="text" className="form-control" id="filterLote" name="filterLote" />
                                        <label className="form-label" htmlFor="filterLote">Lote</label>
                                    </div>

                                    <div className="form-floating mb-3">{/*<!--Endereço de Armazenamento-->*/}
                                        <input type="text" className="form-control" id="filterEnderecoArmazen" name="filterEnderecoArmazen" />
                                        <label className="form-label" htmlFor="filterEnderecoArmazen">Endereço de armazenamento</label>
                                    </div>

                                    <fieldset className="mb-3">{/*<!--Data de Saída-->*/}
                                        <div className="form-floating">
                                            <input className={"form-control text-dark " + dataInputSaid} type="date" id="filterDataSaid" name="filterDataSaid" />
                                            <label htmlFor="filterDataSaid" className="form-label">Data de saída</label>
                                        </div></fieldset>

                                    <div className="form-floating mb-3">{/*<!--Motivo de Saída-->*/}
                                        <select className="form-select" id="filterMotivoSaida" name="filterMotivoSaida">
                                            <option value="" defaultValue></option>
                                            <option value="Perda">Perda</option>
                                            <option value="Produção">Produção</option>
                                            <option value="devolução">Devolução</option>
                                            <option value="Vencido">Fora da Validade</option>
                                        </select>
                                        <label className="form-label" htmlFor="filterMotivoSaida">Motivo de Saída</label>
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
                    <div id='divClose' className="col p-3 d-flex justify-content-end">
                        <button ref={bntClose} type="button" className="btn-close p-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                </form >
            </div>
        </>
    )
}

export default EstoqueInforItem;