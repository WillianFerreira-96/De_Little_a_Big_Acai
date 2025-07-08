import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/styles/navBarEstoque.css'
import logomarca from '../assets/img/mascote.png'
import { useState } from 'react';

function NavBarEstoque({ onLiftingNomeOuID}) {

    var [nomeOuID, setNomeOuID] = useState('')

    //State Up para a PageBuscarEstoque
    function StateUpNomeOuID(e) {
        e.preventDefault()
        onLiftingNomeOuID(nomeOuID)
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top bg-green" aria-label="Main navigation">
                <div className="container-fluid">
                    <div></div>
                    <div className="d-flex align-content-center">
                        <img width="40px" src={logomarca} alt="Little Açaí Logo" />
                        <a className="navbar-brand ms-1 me-5 fs-4" href="#">Little Açaí</a>
                    </div>

                    <button className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse offcanvas-collapse" id="navbarsDefault">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav nav-pills">
                            <li className="nav-item">
                                <a id="activeDashboard" className="nav-link" href="#">
                                    <p className="offcanvas-collapse-text mb-0">Dashboard</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a id="activeCadastrar" className="nav-link" href="/estoque/cadastrar">
                                    <p className="offcanvas-collapse-text mb-0">Cadastrar Item</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a id="activeBuscar" className="nav-link" href="/estoque/buscar">
                                    <p className="offcanvas-collapse-text mb-0">Buscar</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a id="activeSaida" className="nav-link" href="#">
                                    <p className="offcanvas-collapse-text mb-0">Saída de Item</p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a id="activeEditar" className="nav-link" href="#">
                                    <p className="offcanvas-collapse-text mb-0">Editar Item</p>
                                </a>
                            </li>
                        </ul>
                        <form className="d-flex m-0" id="formNavBar" onSubmit={StateUpNomeOuID}>
                            <input className="form-control me-2" value={nomeOuID} onChange={(e) => {setNomeOuID(e.target.value)}} type="search" name="nomeOuID" id="nomeOuID" placeholder="Buscar ID ou Nome" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBarEstoque;