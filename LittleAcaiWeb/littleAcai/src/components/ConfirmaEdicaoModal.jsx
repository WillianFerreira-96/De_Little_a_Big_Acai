import { EditarItem } from "../services/EditarItem"
import FecharConfirmaEdicaoModal from "../utils/FecharConfirmaEdicaoModal"

export default function ConfirmaEdicaoModal({ itemEditado }) {

    function salvarEdicao(e) {
        e.preventDefault()
        EditarItem(itemEditado)
        window.location.reload()
    }

    return <>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Tem Certeza?</h5>
                    </div>
                    <div className="modal-body">
                        <b className="fs-6 fw-normal">Essa edição será permanente e não poderá ser desfeita!</b>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={salvarEdicao} className="btn btn-primary">Salvar Edição</button>
                        <button type="button" onClick={FecharConfirmaEdicaoModal} className="btn btn-outline-danger fw-medium" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}