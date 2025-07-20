export async function BuscaAutomatica() {
    try {
        const response = await fetch("http://192.168.1.6:8080/estoque/buscarTodos")
        if (!response.ok) throw new Error("Erro na requisição") 
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        return []
    }
}
