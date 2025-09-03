export async function BuscaNavBar(nomeOuID) {
    try {
        const response = await fetch(`https://de-little-a-big-acai.fly.dev/estoque/buscarNomeOuID?nomeOuID=${nomeOuID}`)
        if (!response.ok) throw new Error("Erro na requisição")            
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        return []
    }
}
