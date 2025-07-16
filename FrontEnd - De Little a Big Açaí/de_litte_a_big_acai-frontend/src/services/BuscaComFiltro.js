export async function BuscaComFiltro(formData) {
    try{
        const response = await fetch("http://localhost:8080/estoque/filtroBusca", {method: "POST", body: formData})
        if (!response.ok) throw new Error("Erro na requisição")
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados: ", error)
        return []
    }    
}