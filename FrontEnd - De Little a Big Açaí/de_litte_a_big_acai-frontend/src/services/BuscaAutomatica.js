export async function BuscaAutomatica() {
    try {
        const response = await fetch("http://localhost:8080/estoque/buscarTodos")
        if (!response.ok) throw new Error("Erro na requisição") 
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        return []
    }
}

/*

abrirLoadModel()
setTimeout(() => {
    if (Array.isArray(data.listaVazia) && data.listaVazia.length == 0) {
        const ifEmpty = document.getElementById("ifEmpty")
        mensage = document.createElement("h2")
        mensage.className = "h2. Bootstrap heading text-center mt-5"
        mensage.textContent = data.mensagem
        ifEmpty.appendChild(mensage)
        fecharLoadModel()
    } else {
        mostrarResultadosBusca(data)
        fecharLoadModel()
    }
}, 500);
fecharLoadModel()

*/