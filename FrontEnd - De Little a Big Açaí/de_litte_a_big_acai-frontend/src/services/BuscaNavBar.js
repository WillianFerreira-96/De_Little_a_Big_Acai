export async function BuscaNavBar(buscarIdNome) {
    try {
        const response = await fetch(`/estoque/buscarIdNome?idNome=${buscarIdNome}`)
        if (!response.ok) throw new Error("Erro na requisição")
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        return []
    }
}
