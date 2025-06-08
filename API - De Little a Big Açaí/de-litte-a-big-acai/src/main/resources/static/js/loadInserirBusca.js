window.addEventListener("load",async (e)=>{
    abrirLoadModel()
    try{
        const response = await fetch("/estoque/buscarTodos")
        if (!response.ok) throw new Error("Erro na requisição")
        const data = await response.json()
        console.log(data)
        setTimeout(() => {
            if(Array.isArray(data.dados) && data.dados.length == 0){
                const ifEmpty = document.getElementById("ifEmpty")
                mensage = document.createElement("h2")
                mensage.className = "h2. Bootstrap heading text-center mt-5"
                mensage.textContent = data.mensagem
                ifEmpty.appendChild(mensage)
                fecharLoadModel()
            }else{
                data.forEach(item => {
                    row = document.createElement("tr")
                    row.className = "table-light"
                    tdImagem = document.createElement("td")
                    //tdImagem.textContent = item.imagemItem
                    row.appendChild(tdImagem)
                    tdID = document.createElement("td")
                    tdID.textContent = "000"+item.idItem
                    row.appendChild(tdID)
                    tdNome = document.createElement("td")
                    tdNome.className = "text-nowrap"
                    tdNome.textContent = item.nomeItem
                    row.appendChild(tdNome)
                    tdMarca = document.createElement("td")
                    tdMarca.className = "text-nowrap"
                    tdMarca.textContent = item.marca
                    row.appendChild(tdMarca)
                    tdDescricao = document.createElement("td")
                    tdDescricao.textContent = item.descricaoItem
                    tdDescricao.className = "text-nowrap"
                    row.appendChild(tdDescricao)
                    tdCategoria = document.createElement("td")
                    tdCategoria.className = "text-nowrap"
                    tdCategoria.textContent = item.categoria
                    row.appendChild(tdCategoria)
                    tdPreço = document.createElement("td")
                    tdPreço.textContent = item.precoUni
                    row.appendChild(tdPreço)
                    tdQuant = document.createElement("td")
                    tdQuant.textContent = item.quant
                    row.appendChild(tdQuant)
                    tdVolume = document.createElement("td")
                    tdVolume.textContent = item.volumeUni
                    row.appendChild(tdVolume)
                    tdUniMedida = document.createElement("td")
                    tdUniMedida.textContent = item.unidMedida
                    row.appendChild(tdUniMedida)
                    tdDataValidade = document.createElement("td")
                    tdDataValidade.textContent = item.dataValidade
                    row.appendChild(tdDataValidade)
                    tdLote = document.createElement("td")
                    tdLote.textContent = item.lote
                    row.appendChild(tdLote)
                    tdEnderecoArmazen = document.createElement("td")
                    tdEnderecoArmazen.className = "text-nowrap"
                    tdEnderecoArmazen.textContent = item.enderecoArmazen
                    row.appendChild(tdEnderecoArmazen)
                    tdDataEntrada = document.createElement("td")
                    tdDataEntrada.textContent = item.dataEntr
                    row.appendChild(tdDataEntrada)
                    tdDataSaida = document.createElement("td")
                    tdDataSaida.textContent = item.dataSaid
                    row.appendChild(tdDataSaida)
                    tdMotivoSaida = document.createElement("td")
                    tdMotivoSaida.className = "text-nowrap"
                    tdMotivoSaida.textContent = item.motivoSaida
                    row.appendChild(tdMotivoSaida)

                    document.querySelector("tbody").appendChild(row)
                })
                fecharLoadModel()
            }
        }, 500);

    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        fecharLoadModel()
    }
})

function abrirLoadModel(){
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

function fecharLoadModel(){
    const loadModal = document.getElementById("loadModal")
    loadModal.classList.remove("show");
    loadModal.style.display = "none";
    loadModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    const backdrop = document.getElementById("manual-backdrop");
    if (backdrop) backdrop.remove();
}