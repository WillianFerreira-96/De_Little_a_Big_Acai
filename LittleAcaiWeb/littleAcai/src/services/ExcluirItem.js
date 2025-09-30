export async function ExcluirItem(idDelete) {
    const urlDev = "http://localhost:8080"
    const urlDeploy = "https://de-little-a-big-acai.fly.dev"
    
    try {
        const response = await fetch(`${urlDeploy}/estoque/excluirItem/${idDelete}`,{method: "DELETE"})
        if (!response.ok) throw new Error("Erro na requisição")
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        return []
    }
}
