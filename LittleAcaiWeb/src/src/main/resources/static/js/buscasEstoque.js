//Busca Automática-------------------------------------------------------------------------------
window.addEventListener("load",async (e)=>{
    abrirLoadModel()
    try{
        const response = await fetch("/estoque/buscarTodos")
        if (!response.ok) throw new Error("Erro na requisição")
        const data = await response.json()
        console.log(data)
        setTimeout(() => {
            if(Array.isArray(data.listaVazia) && data.listaVazia.length == 0){
                const ifEmpty = document.getElementById("ifEmpty")
                mensage = document.createElement("h2")
                mensage.className = "h2. Bootstrap heading text-center mt-5"
                mensage.textContent = data.mensagem
                ifEmpty.appendChild(mensage)
                fecharLoadModel()
            }else{
                mostrarResultadosBusca(data)
                fecharLoadModel()
            }
        }, 500);

    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        fecharLoadModel()
    }
})

//Busca pela Barra de Pesquisa-------------------------------------------------------------------
const buscarIdNome = document.getElementById("buscarIdNome")
const formNavBar = document.getElementById("formNavBar")
const overFlowDiv = document.getElementById("overFlowDiv")
formNavBar.addEventListener("submit",async (e)=>{
    e.preventDefault()
    abrirLoadModel()

    const buscarIdNomeValue = buscarIdNome.value
    buscarIdNome.value = ""

    try{
        const response = await fetch(`/estoque/buscarNomeOuID?nomeOuID=${buscarIdNomeValue}`)
        if (!response.ok) throw new Error("Erro na requisição")

        const data = await response.json()

        console.log(data)
        setTimeout(() => {
            if(Array.isArray(data.listaVazia) && data.listaVazia.length == 0){
                limparDivs()
                mensage = document.createElement("h2")
                mensage.className = "h2. Bootstrap heading text-center mt-5"
                mensage.textContent = data.mensagem
                ifEmpty.appendChild(mensage)
                overFlowDiv.scrollTo({ left: 0, behavior: 'smooth' })
                document.getElementById("navbarsDefault").className = "navbar-collapse offcanvas-collapse"
                fecharLoadModel()
            }else{
                limparDivs()
                mostrarResultadosBusca(data)
                document.getElementById("navbarsDefault").className = "navbar-collapse offcanvas-collapse"
                fecharLoadModel()
            }
        }, 500);

    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        fecharLoadModel()
    }
})

//Busca Filtrada---------------------------------------------------------------------------------
const formFiltro = document.getElementById("formFiltro")
formFiltro.addEventListener("submit",async (e)=>{
    e.preventDefault()
    abrirLoadModel()

    const formData = new FormData(formFiltro)
    try{
        const response = await fetch("/estoque/filtroBusca", {method: "POST",body: formData})
        if (!response.ok) throw new Error("Erro na requisição")
        const data = await response.json()

        console.log(data)
        setTimeout(() => {
            if(Array.isArray(data.listaVazia) && data.listaVazia.length == 0){
                limparDivs()
                mensage = document.createElement("h2")
                mensage.className = "h2. Bootstrap heading text-center mt-5"
                mensage.textContent = data.mensagem
                ifEmpty.appendChild(mensage)
                overFlowDiv.scrollTo({ left: 0, behavior: 'smooth' })

                const offcanvasEl = document.getElementById('filterOffcanvas');
                const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
                offcanvasInstance.hide();

                fecharLoadModel()
            }else{
                limparDivs()
                mostrarResultadosBusca(data)

                const offcanvasEl = document.getElementById('filterOffcanvas');
                const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
                offcanvasInstance.hide();

                fecharLoadModel()
            }
        }, 500);

    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        fecharLoadModel()
    }
})

//Limpar Filtro----------------------------------------------------------------------------------
const btnLimparFiltro = document.getElementById("limparFiltro")
btnLimparFiltro.addEventListener("click",()=>{
    document.getElementById("filterNome").value=""
    document.getElementById("filterMarca").value=""
    document.getElementById("filterCategotia").value=""
    document.getElementById("filterDataEntr").value=""
    document.getElementById("filterDataValidade").value=""
    document.getElementById("filterPrecoUni").value=""
    document.getElementById("filterQuant").value=""
    document.getElementById("filterVol").value=""
    document.getElementById("filterUnidMedida").value=""
    document.getElementById("filterLote").value=""
    document.getElementById("filterEnderecoArmazen").value=""
    document.getElementById("filterDataSaid").value=""
    document.getElementById("filterMotivoSaida").value=""
})

//Tooltips do Switch "Em Estoque"----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const switchCheckEmEstoque = document.getElementById("switchCheckEmEstoque");
    const tooltip = new bootstrap.Tooltip(switchCheckEmEstoque);

    switchCheckEmEstoque.addEventListener("change", () => {
        const novoTexto = switchCheckEmEstoque.checked ? "Apenas Itens Em Estoque" : "Todos os Itens";
        switchCheckEmEstoque.setAttribute("data-bs-placement", "right");
        switchCheckEmEstoque.setAttribute("data-bs-title", novoTexto);
        tooltip.setContent({ '.tooltip-inner': novoTexto });
    });
});

//Funções----------------------------------------------------------------------------------------
function mostrarResultadosBusca(data){
    data.forEach(item => {
        row = document.createElement("tr")
        row.className = "table-light table-hover"

        //Imagem
        tdImagem = document.createElement("td")
        //tdImagem.textContent = item.imagemItem
        row.appendChild(tdImagem)

        //Id
        tdID = document.createElement("td")
        tdID.textContent = "000"+item.idItem
        row.appendChild(tdID)

        //Nome
        tdNome = document.createElement("td")
        tdNome.className = "text-nowrap"
        tdNome.textContent = item.nomeItem
        row.appendChild(tdNome)

        //Marca
        tdMarca = document.createElement("td")
        tdMarca.className = "text-nowrap"
        tdMarca.textContent = item.marca
        row.appendChild(tdMarca)

        //Descrição
        tdDescricao = document.createElement("td")
        tdDescricao.textContent = item.descricaoItem
        tdDescricao.className = "text-nowrap"
        row.appendChild(tdDescricao)

        //Categoria
        tdCategoria = document.createElement("td")
        tdCategoria.className = "text-nowrap"
        tdCategoria.textContent = item.categoria
        row.appendChild(tdCategoria)

        //Data de Entrada
        tdDataEntrada = document.createElement("td")
        tdDataEntrada.className = "text-nowrap"
        if(item.dataEntr == null){
            tdDataEntrada.textContent = "Sem Data de Entrada"
        }else {
            tdDataEntrada.textContent = formatarData(item.dataEntr, true)
        }
        row.appendChild(tdDataEntrada)

        //Preço
        tdPreço = document.createElement("td")
        tdPreço.className = "text-nowrap"
        var [intero, decimal] = item.precoUni.toFixed(2).toString().split(".")
        tdPreço.textContent = `R$ ${intero},${decimal}`
        row.appendChild(tdPreço)

        //Quantidade
        tdQuant = document.createElement("td")
        tdQuant.className = "text-nowrap"
        tdQuant.textContent = `${item.quant} unidade(s)`
        row.appendChild(tdQuant)

        //Valor Total
        tdTotal = document.createElement("td")
        tdTotal.className = "text-nowrap"
        var valorTotal = item.precoUni * item.quant
        var [intero, decimal] = valorTotal.toFixed(2).toString().split(".")
        tdTotal.textContent = `R$ ${intero},${decimal}`
        row.appendChild(tdTotal)

        //Volume
        tdVolume = document.createElement("td")
        tdVolume.className = "text-nowrap"
        var [intero, decimal] = item.volumeUni.toFixed(2).toString().split(".")
        tdVolume.textContent = `${intero},${decimal} ${item.unidMedida}`
        row.appendChild(tdVolume)

        //Data de Validade
        tdDataValidade = document.createElement("td")
        tdDataValidade.className = "text-nowrap"
        if(item.dataValidade == null){
            tdDataValidade.textContent = "Sem Data de Validade"
        }else {
            tdDataValidade.textContent = formatarData(item.dataValidade, false)
        }
        row.appendChild(tdDataValidade)

        //Lote
        tdLote = document.createElement("td")
        tdLote.textContent = item.lote
        row.appendChild(tdLote)

        //Endereço de Armazenamento
        tdEnderecoArmazen = document.createElement("td")
        tdEnderecoArmazen.className = "text-nowrap"
        tdEnderecoArmazen.textContent = item.enderecoArmazen
        row.appendChild(tdEnderecoArmazen)

        //Em Estoque
        tdEmEstoque = document.createElement("td")
        tdEmEstoque.className = "text-nowrap"
        if(item.emEstoque){
            tdEmEstoque.textContent = "Em Estoque"
        }else {
            tdEmEstoque.textContent = "Item Retirado"
            row.className = "table-danger"
        }
        row.appendChild(tdEmEstoque)

        //Motivo de Saída
        tdMotivoSaida = document.createElement("td")
        tdMotivoSaida.className = "text-nowrap"
        tdMotivoSaida.textContent = item.motivoSaida
        row.appendChild(tdMotivoSaida)

        //Data de Saída
        tdDataSaida = document.createElement("td")
        tdDataSaida.className = "text-nowrap"
        if(item.dataSaid == null){
            tdDataSaida.textContent = "Sem Data de Saída"
        }else {
            tdDataSaida.textContent = formatarData(item.dataSaid, true)
        }
        row.appendChild(tdDataSaida)

        document.querySelector("tbody").appendChild(row)
    })
}

function formatarData(dataLocalDateTime, withTime){
    const [datePart, timePart] = dataLocalDateTime.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);
    const data = new Date(year, month - 1, day, hour, minute, second);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear()
    const hora = String(data.getHours()).padStart(2, '0');
    const minuto = String(data.getMinutes()).padStart(2, '0');

    if(withTime){
        return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
    }else{
        return `${dia}/${mes}/${ano}`;
    }
}

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

function limparDivs(){
    document.getElementById("ifEmpty").innerHTML=""
    document.querySelector("tbody").innerHTML=""
}
