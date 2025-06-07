window.addEventListener("load",()=>{
    fetch('/estoque/buscarTodos')
        .then(response => response.json())
        .then(data=>{
            data.forEach(item => {
                console.log(item.nomeItem);
            });
            data.forEach(item => {

                row = document.createElement("tr")
                row.className = "table-light"
                tdImagem = document.createElement("td")
                //tdImagem.textContent = item.imagemItem
                row.appendChild(tdImagem)
                tdID = document.createElement("td")
                tdID.textContent = "000"+item.idItem
                row.appendChild(tdID)
                tdNome = document.createElement("td")
                tdNome.className = "text-nowrap"
                tdNome.textContent = item.nomeItem
                row.appendChild(tdNome)
                tdMarca = document.createElement("td")
                tdMarca.className = "text-nowrap"
                tdMarca.textContent = item.marca
                row.appendChild(tdMarca)
                tdDescricao = document.createElement("td")
                tdDescricao.textContent = item.descricaoItem
                tdDescricao.className = "text-nowrap"
                row.appendChild(tdDescricao)
                tdCategoria = document.createElement("td")
                tdCategoria.className = "text-nowrap"
                tdCategoria.textContent = item.categoria
                row.appendChild(tdCategoria)
                tdPreço = document.createElement("td")
                tdPreço.textContent = item.precoUni
                row.appendChild(tdPreço)
                tdQuant = document.createElement("td")
                tdQuant.textContent = item.quant
                row.appendChild(tdQuant)
                tdVolume = document.createElement("td")
                tdVolume.textContent = item.volumeUni
                row.appendChild(tdVolume)
                tdUniMedida = document.createElement("td")
                tdUniMedida.textContent = item.unidMedida
                row.appendChild(tdUniMedida)
                tdDataValidade = document.createElement("td")
                tdDataValidade.textContent = item.dataValidade
                row.appendChild(tdDataValidade)
                tdLote = document.createElement("td")
                tdLote.textContent = item.lote
                row.appendChild(tdLote)
                tdEnderecoArmazen = document.createElement("td")
                tdEnderecoArmazen.className = "text-nowrap"
                tdEnderecoArmazen.textContent = item.enderecoArmazen
                row.appendChild(tdEnderecoArmazen)
                tdDataEntrada = document.createElement("td")
                tdDataEntrada.textContent = item.dataEntr
                row.appendChild(tdDataEntrada)
                tdDataSaida = document.createElement("td")
                tdDataSaida.textContent = item.dataSaid
                row.appendChild(tdDataSaida)
                tdMotivoSaida = document.createElement("td")
                tdMotivoSaida.className = "text-nowrap"
                tdMotivoSaida.textContent = item.motivoSaida
                row.appendChild(tdMotivoSaida)

                document.querySelector("tbody").appendChild(row)

            })
        })
        .catch(err =>{
            console.error(err)
        })
})