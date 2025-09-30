export async function CadastrarItem(formData) {
    const urlDev = "http://localhost:8080"
    const urlDeploy = "https://de-little-a-big-acai.fly.dev"
    try {
        const url = urlDeploy + "/estoque/adicionarItem";
        const response = await fetch(url, { method: "POST", body: formData })
        if(!response.ok)throw new Error("Erro na requisição")
        
        return await response.json()
    } catch (e) {
        console.error("Erro ao cadastrar dados: ", e)
        return  { erro: 'Erro ao cadastrar dados! Tente Novamente.' }
    }
}