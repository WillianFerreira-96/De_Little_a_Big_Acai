export async function BuscaAutomatica() {
    try {
        const response = await fetch("https://de-litte-a-big-acai-server-production.up.railway.app/estoque/buscarTodos")
        if (!response.ok) throw new Error("Erro na requisição") 
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        return []
    }
}
