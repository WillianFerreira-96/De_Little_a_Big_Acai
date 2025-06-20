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
