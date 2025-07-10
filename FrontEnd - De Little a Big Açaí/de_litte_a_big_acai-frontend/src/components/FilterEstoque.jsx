import filtroIco from '../assets/img/ico/filtroIco.ico'
import logo from '../assets/img/logotipo2.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/filterEstoque.css'
import { useEffect, useRef } from 'react'

function FilterEstoque({ onFormFilter }) {
    const formFiltro = useRef(null)
    const bntClose = useRef(null)
    const btnLimparRef = useRef(null)

    function dadosFormulario(e) {
        e.preventDefault()
        const formData = new FormData(formFiltro.current)
        onFormFilter(formData)

        bntClose.current.click() //fecha o filterOffcanvas
    }

    useEffect(() => {
        const btnLimpar = btnLimparRef.current
        btnLimpar.addEventListener('click', () => {
            const filtros = formFiltro.current
            filtros['filterNome'].value = '';
            filtros['filterMarca'].value = '';
            filtros['filterCategotia'].value = '';
            filtros['filterDataEntr'].value = '';
            filtros['filterDataValidade'].value = '';
            filtros['filterPrecoUni'].value = '';
            filtros['filterQuant'].value = '';
            filtros['filterVol'].value = '';
            filtros['filterUnidMedida'].value = '';
            filtros['filterLote'].value = '';
            filtros['filterEnderecoArmazen'].value = '';
            filtros['filterDataSaid'].value = '';
            filtros['filterMotivoSaida'].value = '';
        })
    })
    
    return (
        <>
            <div className="d-flex flex-row fixed-left">
                <div id="filterOffcanvas" className="offcanvas offcanvas-start p-3" tabIndex="-1">
                    <div className="offcanvas-header d-flex flex-column align-items-start">
                        <button ref={bntClose} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        <img width="170px" src={logo}
                            alt="Litte Açaí Logo" />
                    </div>
                    <div className="offcanvas-body">{/*<!--OffCanvas Body-->*/}
                        <button ref={btnLimparRef} id="limparFiltro" className="btn btn-outline col-4 btn-sm mb-4">Limpar filtro</button>

                        <form ref={formFiltro} onSubmit={dadosFormulario}>
                            <div className="form-switch m-0 mb-3">
                                <input id="switchCheckEmEstoque"
                                    name="switchCheckEmEstoque"
                                    value="1"
                                    className="form-check-input"
                                    type="checkbox"/>
                                <input type="hidden" value="0" name="switchCheckEmEstoque" />
                                <label className=" ms-2 mt-1 text-white" style={{ fontSize: '.8rem' }}
                                    htmlFor="switchCheckEmEstoque">Em estoque</label>
                            </div>
                            <div className="form-floating mb-3">{/*<!--Nome-->*/}
                                <input type="text" className="form-control" id='filterNome' name="filterNome" />
                                <label className="form-label" htmlFor="filterNome">Nome</label>
                            </div>
                            <div className="form-floating mb-3">{/*<!--Marca-->*/}
                                <input type="text" className="form-control" id="filterMarca" name="filterMarca" />
                                <label className="form-label" htmlFor="filterMarca">Marca</label>
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
                                <div className="form-floating">
                                    <input className="form-control text-dark dataInput" type="date" id="filterDataEntr" name="filterDataEntr" />
                                    <label htmlFor="filterDataEntr" className="form-label">Data de entrada</label>
                                </div>
                                <div className="d-flex justify-content-between text-secondary dataInputLabel" >
                                    <label htmlFor="comparacaoDataEntr" className="form-label m-0">Antes do dia</label>
                                    <label htmlFor="comparacaoDataEntr" className="form-label m-0">No dia</label>
                                    <label htmlFor="comparacaoDataEntr" className="form-label m-0">Depois do dia</label>
                                </div>
                                <input type="range" className="form-range ps-4 pe-4" min="-1" max="1" step="1" name="comparacaoDataEntr" id="comparacaoDataEntr" />
                            </fieldset>

                            <fieldset className="mt-4">{/*<!--Data de validade-->*/}
                                <div className="form-floating">
                                    <input className="form-control text-dark dataInput" type="date" id="filterDataValidade" name="filterDataValidade" />
                                    <label htmlFor="filterDataValidade" className="form-label">Data de validade</label>
                                </div>
                                <div className="d-flex justify-content-between text-secondary" style={{ fontSize: '0.7rem' }}>
                                    <label htmlFor="comparacaoDataValid" className="form-label m-0">Antes do dia</label>
                                    <label htmlFor="comparacaoDataValid" className="form-label m-0">No dia</label>
                                    <label htmlFor="comparacaoDataValid" className="form-label m-0">Depois do dia</label>
                                </div>
                                <input type="range" className="form-range ps-4 pe-4" min="-1" max="1" step="1" name="comparacaoDataValid" id="comparacaoDataValid" />
                            </fieldset>

                            <fieldset className="mt-4">{/*<!--Preço por unidade-->*/}
                                <div className="form-floating">
                                    <input className="form-control" type="number" step="any" id="filterPrecoUni" name="filterPrecoUni" />
                                    <label htmlFor="filterPrecoUni" className="form-label">Preço por unidade</label>
                                </div>
                                <div className="d-flex justify-content-between text-secondary dataInputLabel">
                                    <label htmlFor="comparacaoPreco" className="form-label m-0">Menor que</label>
                                    <label htmlFor="comparacaoPreco" className="form-label m-0">Mesmo valor</label>
                                    <label htmlFor="comparacaoPreco" className="form-label m-0">Maior que</label>
                                </div>
                                <input type="range" className="form-range ps-4 pe-4" min="-1" max="1" step="1" name="comparacaoPreco" id="comparacaoPreco" />
                            </fieldset>

                            <fieldset className="mt-4">{/*<!--Quantidade-->*/}
                                <div className="form-floating">
                                    <input className="form-control" type="number" step="any" id="filterQuant" name="filterQuant" />
                                    <label htmlFor="filterQuant" className="form-label">Quantidade</label>
                                </div>
                                <div className="d-flex justify-content-between text-secondary dataInputLabel">
                                    <label htmlFor="comparacaoQuant" className="form-label m-0">Menor que</label>
                                    <label htmlFor="comparacaoQuant" className="form-label m-0">Mesmo valor</label>
                                    <label htmlFor="comparacaoQuant" className="form-label m-0">Maior que</label>
                                </div>
                                <input type="range" className="form-range ps-4 pe-4" min="-1" max="1" step="1" name="comparacaoQuant" id="comparacaoQuant" />
                            </fieldset>

                            <fieldset className="mt-4">{/*<!--Valor Total-->*/}
                                <div className="form-floating">
                                    <input className="form-control" type="number" step="any" id="filterValorTotal" name="filterValorTotal" />
                                    <label htmlFor="filterValorTotal" className="form-label">Valor Total</label>
                                </div>
                                <div className="d-flex justify-content-between text-secondary dataInputLabel">
                                    <label htmlFor="comparacaoValortotal" className="form-label m-0">Menor que</label>
                                    <label htmlFor="comparacaoValortotal" className="form-label m-0">Mesmo valor</label>
                                    <label htmlFor="comparacaoValortotal" className="form-label m-0">Maior que</label>
                                </div>
                                <input type="range" className="form-range ps-4 pe-4" min="-1" max="1" step="1" name="comparacaoValortotal" id="comparacaoValortotal" />
                            </fieldset>

                            <fieldset className="mt-4">{/*<!--Volume e Unidade de medida-->*/}
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
                                </div><div className="d-flex justify-content-between text-secondary dataInputLabel">
                                    <label htmlFor="comparacaoVol" className="form-label m-0">Menor que</label>
                                    <label htmlFor="comparacaoVol" className="form-label m-0">Mesmo valor</label>
                                    <label htmlFor="comparacaoVol" className="form-label m-0">Maior que</label>
                                </div>
                                <input type="range" className="form-range ps-4 pe-4" min="-1" max="1" step="1" name="comparacaoVol" id="comparacaoVol" />
                            </fieldset>

                            <div className="form-floating mt-4">{/*<!--Lote-->*/}
                                <input type="text" className="form-control" id="filterLote" name="filterLote" />
                                <label className="form-label" htmlFor="filterLote">Lote</label>
                            </div>

                            <div className="form-floating mt-4">{/*<!--Endereço de Armazenamento-->*/}
                                <input type="text" className="form-control" id="filterEnderecoArmazen" name="filterEnderecoArmazen" />
                                <label className="form-label" htmlFor="filterEnderecoArmazen">Endereço de armazenamento</label>
                            </div>

                            <fieldset className="mt-4">{/*<!--Data de Saída-->*/}
                                <div className="form-floating">
                                    <input className="form-control text-dark dataInput" type="date" id="filterDataSaid" name="filterDataSaid" />
                                    <label htmlFor="filterDataSaid" className="form-label">Data de saída</label>
                                </div>
                                <div className="d-flex justify-content-between text-secondary dataInputLabel">
                                    <label htmlFor="comparacaoDataSaid" className="form-label m-0">Antes do dia</label>
                                    <label htmlFor="comparacaoDataSaid" className="form-label m-0">No dia</label>
                                    <label htmlFor="comparacaoDataSaid" className="form-label m-0">Depois do dia</label>
                                </div>
                                <input type="range" className="form-range ps-4 pe-4" min="-1" max="1" step="1" name="comparacaoDataSaid" id="comparacaoDataSaid" />
                            </fieldset>

                            <div className="form-floating mt-4">{/*<!--Motivo de Saída-->*/}
                                <select className="form-select" id="filterMotivoSaida" name="filterMotivoSaida">
                                    <option value="" defaultValue></option>
                                    <option value="Perda">Perda</option>
                                    <option value="Produção">Produção</option>
                                    <option value="devolução">Devolução</option>
                                    <option value="Vencido">Fora da Validade</option>
                                </select>
                                <label className="form-label" htmlFor="filterMotivoSaida">Motivo de Saída</label>
                            </div>
                            <button type="submit" className="btn btn-outline mt-4 col-12 fw-bold">Pesquisar</button>
                        </form>
                    </div>
                </div>

                {/*<!-------------------------------------------------------------------------------------------------->*/}

                <button className="btn btn-filter d-flex align-items-center justify-content-center rounded-circle fixed-bottom mb-4 ms-2 " type="button"
                    data-bs-toggle="offcanvas" data-bs-target="#filterOffcanvas" aria-controls="filterOffcanvas">
                    <img src={filtroIco} width="25px" />
                </button>
            </div>
        </>
    )
}

export default FilterEstoque;