import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/estoqueCadastrar.css'
import { useEffect, useRef, useState } from "react"
import logotipo from '../assets/img/logotipo3.png'
import { CadastrarItem } from '../services/CadastrarItem'
import Swal from 'sweetalert2'
import LoadModel from '../components/LoadModel'
import AbrirLoadModel from '../utils/AbrirLoadModel'
import FecharLoadModel from '../utils/FecharLoadModel'

function EstoqueCadastrar() {

    const formCadastro = useRef(null)

    const [mostrarSwal, setMostrarSwal] = useState(false);
    const [swalTitle, setSwalTitle] = useState('')
    const [swalMessage, setSwalMessage] = useState('')
    const [swalIconColor, setSwalIconColor] = useState('')
    const [swalButtonColor, setSwalButtonColor] = useState('')

    //Ativar elemento 'Cadastrar' da NavBar
    useEffect(() => {
        const activeBuscar = document.getElementById('activeBuscar')
        const activeCadastrar = document.getElementById('activeCadastrar')
        activeCadastrar.className = 'nav-link activated'
        activeBuscar.className = 'nav-link'
    })

    useEffect(() => {
        if (mostrarSwal) {
            FecharLoadModel()
            Swal.fire({
                title: swalTitle,
                html: swalMessage,
                icon: swalTitle === 'Erro!' ? 'warning' : 'success',
                iconColor: swalIconColor,
                confirmButtonColor: swalButtonColor
            });
            setMostrarSwal(false);
        }
    }, [mostrarSwal]);

    async function cadastrar(e) {
        e.preventDefault()
        AbrirLoadModel()

        const formData = new FormData(formCadastro.current)
        const res = await CadastrarItem(formData)
        if (res.erro) {
            setSwalTitle("Erro!")
            setSwalMessage(`<h6>${res.erro}</h6>`)
            setSwalIconColor('#fff100')
            setSwalButtonColor('#ff0000')

        } else {
            setSwalTitle("Item Cadastrado!")
            setSwalMessage(`
                <div id='divSwal'>
                    <h5>Detalhes do item:</h5>
                    <b>ID: <strong>${res.idItem}</strong></b><br>
                    <b>Item: <strong> ${res.nomeItem}</strong></b><br>
                    <b>Marca: <strong>${res.marca}</strong></b><br>
                    <b>Categoria: <strong>${res.categoria}</strong></b>
                </div>
            `)
            setSwalIconColor('#11ff00')
            setSwalButtonColor('#0051ff')
        }

        setMostrarSwal(true)

        const form = formCadastro.current
        form['imagemItem'].value = '';
        form['nomeItem'].value = '';
        form['marca'].value = '';
        form['descricaoItem'].value = '';
        form['categoria'].value = '';
        form['precoUni'].value = '';
        form['quant'].value = '';
        form['volumeUni'].value = '';
        form['unidMedida'].value = '';
        form['dataValidade'].value = '';
        form['enderecoArmazen'].value = '';
        form['lote'].value = '';

    }

    return <>
        <LoadModel />
        <main id='mainCadastrar'>
            <div className="container d-flex justify-content-center">
                <div className="row flex-column-reverse flex-lg-row">
                    <div id="divCadastro" className="col-12 col-xl-6 d-flex flex-xl-column align-items-center justify-content-center">
                        <div className='bg-form pt-4 pb-4 p-sm-5 rounded shadow'>
                            <h2 className="text-center fs-1 fw-bolder">Cadastrar</h2>
                            <h5 className="text-center mb-3 fs-5 fw-bolder text-white">Novo Item</h5>

                            <form ref={formCadastro} onSubmit={cadastrar} className="d-flex flex-column align-items-center" encType="multipart/form-data">
                                <div className='overflow p-3'>
                                    <div className="mb-3">{/*<!--Foto-->*/}
                                        <input className="form-control" type="file" id="imagemItem" name="imagemItem" />
                                    </div>
                                    <div className="form-floating mb-3">{/*<!--Nome-->*/}
                                        <input type="text" className="form-control" id="nomeItem" name="nomeItem" required />
                                        <label className="form-label" htmlFor="nomeItem">Nome</label>
                                    </div>
                                    <div className="form-floating mb-3">{/*<!--Marca-->*/}
                                        <input type="text" className="form-control" id="marca" name="marca" />
                                        <label className="form-label" htmlFor="marca">Marca</label>
                                    </div>
                                    <div className="form-floating mb-3">{/*<!--Descrição-->*/}
                                        <input type="text" className="form-control" id="descricaoItem" name="descricaoItem" />
                                        <label className="form-label" htmlFor="descricaoItem">Descrição</label>
                                    </div>

                                    <div className="form-floating mb-3">{/*<!--Categoria-->*/}
                                        <select className="form-select" id="categoria" name="categoria">
                                            <option value="" defaultValue></option>
                                            <option value="frutas">Frutas</option>
                                            <option value="bases/massas">Bases/Massas</option>
                                            <option value="complementos">Complementos</option>
                                        </select>
                                        <label className="form-label" htmlFor="categoria">Categoria</label>
                                    </div>

                                    <fieldset className="mt-4">{/*<!--Preço por unidade-->*/}
                                        <div className="form-floating">
                                            <input className="form-control" type="number" step="any" id="precoUni" name="precoUni" />
                                            <label htmlFor="precoUni" className="form-label">Preço por unidade</label>
                                        </div>
                                    </fieldset>

                                    <fieldset className="mt-4">{/*<!--Quantidade-->*/}
                                        <div className="form-floating">
                                            <input className="form-control" type="number" step="any" id="quant" name="quant" />
                                            <label htmlFor="quant" className="form-label">Quantidade</label>
                                        </div>
                                    </fieldset>
                                    <fieldset className="mt-4">{/*<!--Volume e Unidade de medida-->*/}
                                        <div className="input-group form-floating">
                                            <div className="form-floating">
                                                <input className="form-control" type="number" step="any" id="volumeUni" name="volumeUni" />
                                                <label htmlFor="volumeUni" className="form-label">Volume por unidade</label>
                                            </div>
                                            <div className="form-floating">
                                                <select className="form-select" id="unidMedida" name="unidMedida">
                                                    <option value="" defaultValue></option>
                                                    <option value="kg">Kilogramas(Kg)</option>
                                                    <option value="g">Gramas(g)</option>
                                                    <option value="l">Litros(l)</option>
                                                    <option value="ml">Mililitros(ml)</option>
                                                    <option value="und">Unidades(und)</option>
                                                </select>
                                                <label className="form-label" htmlFor="unidMedida">Unidade de medida</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset className="mt-4">{/*<!--Data de validade-->*/}
                                        <div className="form-floating">
                                            <input className="form-control text-dark" type="date" id="dataValidade" name="dataValidade" />
                                            <label htmlFor="dataValidade" className="form-label">Data de validade</label>
                                        </div>
                                    </fieldset>
                                    <div className="form-floating mt-4">{/*<!--Lote-->*/}
                                        <input type="text" className="form-control" id="lote" name="lote" />
                                        <label className="form-label" htmlFor="lote">Lote</label>
                                    </div>

                                    <div className="form-floating mt-4">{/*<!--Endereço de Armazenamento-->*/}
                                        <input type="text" className="form-control" id="enderecoArmazen" name="enderecoArmazen" />
                                        <label className="form-label" htmlFor="enderecoArmazen">Endereço de armazenamento</label>
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