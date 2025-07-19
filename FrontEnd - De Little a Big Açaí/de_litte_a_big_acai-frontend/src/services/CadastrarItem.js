export async function CadastrarItem(formData) {
    try {
        const url = 'http://192.168.1.6:8080/estoque/adicionarItem';
        const response = await fetch(url, { method: "POST", body: formData })
        if(!response.ok)throw new Error("Erro na requisição")
        
        return await response.json()
    } catch (e) {
        console.error("Erro ao cadastrar dados: ", e)
        return  { erro: 'Erro ao cadastrar dados! Tente Novamente.' }
    }
}