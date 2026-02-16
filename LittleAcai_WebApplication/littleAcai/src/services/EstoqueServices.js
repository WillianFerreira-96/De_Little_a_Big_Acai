const localhost = "http://localhost:8080"
const remotehost = "https://api-little-acai.fly.dev"

const hostname = remotehost

const AutoBusca = async () => {
    try {
        const response = await fetch(hostname + "/estoque/buscarTodos")
        if (!response.ok) throw new Error("Erro na requisição") 
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        return []
    }
}

const BuscaFiltro = async (formData) => {
    try{
        const response = await fetch(hostname + "/estoque/filtroBusca", {method: "POST", body: formData})
        if (!response.ok) throw new Error("Erro na requisição")
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados: ", error)
        return []
    }    
}

const BuscaNavBar = async (nomeOuID) => {    
    try {
        const response = await fetch(`${hostname}/estoque/buscarNomeOuID?nomeOuID=${nomeOuID}`)
        if (!response.ok) throw new Error("Erro na requisição")
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        return []
    }
}

const CadastrarItem = async (formData) => {
    try {
        const response = await fetch(hostname + "/estoque/adicionarItem", { method: "POST", body: formData })
        if(!response.ok)throw new Error("Erro na requisição")        
        return await response.json()
    } catch (e) {
        console.error("Erro ao cadastrar dados: ", e)
        return  { erro: 'Erro ao cadastrar dados! Tente Novamente.' }
    }
}

const EditarItem = async (formData) => {
    try {
        const response = await fetch(hostname + "/estoque/editarItem", { method: "PUT", body: formData })
        if(!response.ok)throw new Error("Erro na requisição")        
        return await response.json()
    } catch (e) {
        console.error("Erro ao salvar edição de dados: ", e)
        return  { erro: 'Erro ao salvar edição de dados! Tente Novamente.' }
    }
}

const ExcluirItem = async (idDelete) => {    
    try {
        const response = await fetch(`${hostname}/estoque/excluirItem/${idDelete}`,{method: "DELETE"})
        if (!response.ok) throw new Error("Erro na requisição")
        return await response.json()
    } catch (error) {
        console.error("Erro ao buscar dados:", error)
        return []
    }
}

const EstoqueServices = {
    AutoBusca,
    BuscaFiltro,
    BuscaNavBar,
    CadastrarItem,
    EditarItem,
    ExcluirItem
}

export default EstoqueServices;