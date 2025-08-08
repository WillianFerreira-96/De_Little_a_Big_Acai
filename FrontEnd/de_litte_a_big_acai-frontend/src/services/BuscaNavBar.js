export async function BuscaNavBar(nomeOuID) {
    try {
        const response = await fetch(`https://de-litte-a-big-acai-server-production.up.railway.app/estoque/buscarNomeOuID?nomeOuID=${nomeOuID}`)
        if (!response.ok) throw new Error("Erro na requisição")            
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        return []
    }
}
