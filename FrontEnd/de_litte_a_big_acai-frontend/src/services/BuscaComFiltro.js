export async function BuscaComFiltro(formData) {
    try{
        const response = await fetch("https://de-little-a-big-acai.fly.dev/estoque/filtroBusca", {method: "POST", body: formData})
        if (!response.ok) throw new Error("Erro na requisição")
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados: ", error)
        return []
    }    
}