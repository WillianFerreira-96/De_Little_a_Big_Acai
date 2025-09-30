function FecharModal(idModal){
    const loadModal = document.getElementById(idModal)
    loadModal.classList.remove("show");
    loadModal.style.display = "none";
    loadModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    const backdrop = document.getElementById("manual-backdrop");
    if (backdrop) backdrop.remove();
}

export default FecharModal