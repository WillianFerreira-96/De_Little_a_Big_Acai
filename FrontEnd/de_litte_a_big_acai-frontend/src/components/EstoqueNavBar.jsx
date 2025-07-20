import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/styles/estoqueNavBar.css'
import logomarca from '../assets/img/mascote.png'
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function EstoqueNavBar({ onLiftingNomeOuID }) {

    var [nomeOuID, setNomeOuID] = useState('')
    const toggleRef = useRef(null)
    const menuRef = useRef(null)
    const navigate = useNavigate();

    //State Up para a PageBuscarEstoque
    function StateUpNomeOuID(e) {
        e.preventDefault()
        navigate('/estoque/buscar');
        onLiftingNomeOuID(nomeOuID)
        toggleRef.current.click();
    }

    useEffect(() => {
        const handleToggle = () => {
            menuRef.current.classList.toggle('open');
        };

        const button = toggleRef.current;
        button.addEventListener('click', handleToggle);

        return () => {
            button.removeEventListener('click', handleToggle);
        };
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top bg-green" aria-label="Main navigation">
                <div className="container-fluid">
                    <div></div>
                    <div className="d-flex align-content-center">
                        <img width="40px" src={logomarca} alt="Little Açaí Logo" />
                        <a className="navbar-brand ms-1 me-5 fs-4" href="#">Little Açaí</a>
                    </div>

                    <button ref={toggleRef} className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div ref={menuRef} className="navbar-collapse offcanvas-collapse" id="navbarsDefault">
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
                                    <p className="offcanvas-collapse-text mb-0">Retirada de Item</p>
                                </a>
                            </li>
                        </ul>
                        <form className="d-flex m-0" id="formNavBar" onSubmit={StateUpNomeOuID}>
                            <input className="form-control me-2" value={nomeOuID} onChange={(e) => { setNomeOuID(e.target.value) }} type="search" name="nomeOuID" id="nomeOuID" placeholder="Buscar ID ou Nome" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default EstoqueNavBar;