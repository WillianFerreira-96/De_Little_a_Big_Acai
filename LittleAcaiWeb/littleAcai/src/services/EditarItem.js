export async function EditarItem(formData) {
    const urlDev = "http://localhost:8080"
    const urlDeploy = "https://de-little-a-big-acai.fly.dev"
    try {
        const url = urlDeploy + "/estoque/editarItem";
        const response = await fetch(url, { method: "PUT", body: formData })
        if(!response.ok)throw new Error("Erro na requisição")
        
        return await response.json()
    } catch (e) {
        console.error("Erro ao salvar edição de dados: ", e)
        return  { erro: 'Erro ao salvar edição de dados! Tente Novamente.' }
    }
}