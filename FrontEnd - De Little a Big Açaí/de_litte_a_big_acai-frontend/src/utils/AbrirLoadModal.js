function AbrirLoadModel(){
    const loadModal = document.getElementById("loadModal")
    loadModal.classList.add("show");
    loadModal.style.display = "block";
    loadModal.removeAttribute("aria-hidden");

    document.body.classList.add("modal-open");

    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop fade show";
    backdrop.id = "manual-backdrop";
    document.body.appendChild(backdrop);
}

export default AbrirLoadModel