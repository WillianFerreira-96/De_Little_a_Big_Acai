import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/estoqueCadastrar.css'
import { useEffect } from "react"
import logotipo from '../assets/img/logotipo3.png'

function EstoqueCadastrar() {
    //Ativar elemento 'Cadastrar' da NavBar
    useEffect(() => {
        const activeCadastrar = document.getElementById('activeCadastrar')
        activeCadastrar.className = 'nav-link activated'
    })

    return <>
        <main id='mainCadastrar'>
            <div className="container d-flex justify-content-center">
                <div className="row flex-column-reverse flex-lg-row">
                    <div id="divCadastro" className="col-12 col-xl-6 d-flex flex-xl-column align-items-center justify-content-center">
                        <div className='bg-form pt-4 pb-4 p-sm-5 rounded'>
                            <h2 className="text-center mb-3 fs-1 fw-bolder text-wrap">Cadastrar<h5>Novo Item</h5></h2>
                            
                            <form id="formulario" className="d-flex flex-column align-items-center" enctype="multipart/form-data">
                                <div className='overflow p-3'>
                                    <div className="mb-3">{/*<!--Foto-->*/}
                                        <input className="form-control" type="file" id="imagemItem" name="imagemItem" />
                                    </div>
                                    <div className="form-floating mb-3">{/*<!--Nome-->*/}
                                        <input type="text" className="form-control" id="nomeItem" name="nomeItem" required/>
                                        <label className="form-label" for="nomeItem">Nome</label>
                                    </div>
                                    <div className="form-floating mb-3">{/*<!--Marca-->*/}
                                        <input type="text" className="form-control" id="marca" name="marca" />
                                        <label className="form-label" for="marca">Marca</label>
                                    </div>
                                    <div className="form-floating mb-3">{/*<!--Descrição-->*/}
                                        <input type="text" className="form-control" id="descricaoItem" name="descricaoItem" />
                                        <label className="form-label" for="descricaoItem">Descrição</label>
                                    </div>

                                    <div className="form-floating mb-3">{/*<!--Categoria-->*/}
                                        <select className="form-select" id="categoria" name="categoria">
                                            <option value="" selected></option>
                                            <option value="frutas">Frutas</option>
                                            <option value="bases/massas">Bases/Massas</option>
                                            <option value="complementos">Complementos</option>
                                        </select>
                                        <label className="form-label" for="categoria">Categoria</label>
                                    </div>

                                    <fieldset className="mt-4">{/*<!--Preço por unidade-->*/}
                                        <div className="form-floating">
                                            <input className="form-control" type="number" step="any" id="precoUni" name="precoUni" />
                                            <label for="precoUni" className="form-label">Preço por unidade</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mt-4">{/*<!--Quantidade-->*/}
                                        <div className="form-floating">
                                            <input className="form-control" type="number" step="any" id="quant" name="quant" />
                                            <label for="quant" className="form-label">Quantidade</label>
                                        </div>
                                    </fieldset>
                                    <fieldset className="mt-4">{/*<!--Volume e Unidade de medida-->*/}
                                        <div className="input-group form-floating">
                                            <div className="form-floating">
                                                <input className="form-control" type="number" step="any" id="volumeUni" name="volumeUni" />
                                                <label for="volumeUni" className="form-label">Volume por unidade</label>
                                            </div>
                                            <div className="form-floating">
                                                <select className="form-select" id="unidMedida" name="unidMedida">
                                                    <option value="" selected></option>
                                                    <option value="kg">Kilogramas(Kg)</option>
                                                    <option value="g">Gramas(g)</option>
                                                    <option value="l">Litros(l)</option>
                                                    <option value="ml">Mililitros(ml)</option>
                                                    <option value="und">Unidades(und)</option>
                                                </select>
                                                <label className="form-label" for="unidMedida">Unidade de medida</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset className="mt-4">{/*<!--Data de validade-->*/}
                                        <div className="form-floating">
                                            <input className="form-control text-dark" type="date" id="dataValidade" name="dataValidade" />
                                            <label for="dataValidade" className="form-label">Data de validade</label>
                                        </div>
                                    </fieldset>
                                    <div className="form-floating mt-4">{/*<!--Lote-->*/}
                                        <input type="text" className="form-control" id="lote" name="lote" />
                                        <label className="form-label" for="lote">Lote</label>
                                    </div>

                                    <div className="form-floating mt-4">{/*<!--Endereço de Armazenamento-->*/}
                                        <input type="text" className="form-control" id="enderecoArmazen" name="enderecoArmazen" />
                                        <label className="form-label" for="enderecoArmazen">Endereço de armazenamento</label>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-cadastrar mt-4 col-11 fw-bold">Cadastrar</button>
                            </form>
                        </div>
                    </div>
                    <div id="divLogo" className="d-xl-flex col-xl-6 flex-xl-column justify-content-center align-items-center ps-3">
                        <img src={logotipo} alt="logotipo" />
                    </div>
                </div>
            </div>
        </main>
    </>
}

export default EstoqueCadastrar