import { EditarItem } from "../services/EditarItem"
import FecharModal from "../utils/FecharModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { ExcluirItem } from "../services/ExcluirItem"

function Editar({ itemEditado }) {

    function salvarEdicao(e) {
        e.preventDefault()
        EditarItem(itemEditado)
        window.location.reload()
    }

    return <>
        <div className="modal fade" id="EditarStaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="EditarStaticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="EditarStaticBackdropLabel">Tem Certeza?</h5>
                    </div>
                    <div className="modal-body">
                        <b className="fs-6 fw-normal">Essa edição será permanente e não poderá ser desfeita!</b>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={salvarEdicao} className="btn btn-primary">Salvar Edição</button>
                        <button type="button" onClick={()=>{FecharModal('EditarStaticBackdrop')}} className="btn btn-outline-danger fw-medium" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

function Deletar({idDelete}) {

    function deletarItem(e) {
        e.preventDefault()
        ExcluirItem(idDelete)
        window.location.reload()
    }

    return <>
        <div className="modal fade" id="DeletarStaticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="DeletarStaticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content bg-dark">
                    <div className="modal-header ">
                        <FontAwesomeIcon className="fs-1 text-danger" icon={faTriangleExclamation}/>
                        <h5 className="modal-title text-white fs-3" id="DeletarStaticBackdropLabel">Danger Zone!</h5>
                    </div>
                    <div className="modal-body">
                        <b className="fs-6 fw-normal text-white fs-5">Excluir um item é uma ação irreversível!</b><br />
                        <b className="fs-6 fw-normal text-white fs-4">Tem Certeza que deseja Excluir esse item? </b>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={deletarItem} className="btn btn-outline-danger col-5">Excluir Item</button>
                        <button type="button" onClick={()=>{FecharModal('DeletarStaticBackdrop')}} className="btn btn-outline-secondary fw-medium" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

const ConfirmaModal = {
    Editar,
    Deletar
}

export default ConfirmaModal