const formFiltro = document.getElementById("formFiltro")
formFiltro.addEventListener("submit",async (e)=>{
    e.preventDefault()

    const formData = new FormData(formFiltro)

    try{
        const response = await fetch("/estoque/filtroBusca", {method: "POST",body: formData})
        if (!response.ok) throw new Error("Erro na requisição")
        const data = await response.json()
        console.log(data)















    } catch (error) {
        console.error("Erro ao buscar dados:", error)
    }

})