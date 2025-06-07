const buscarIdNome = document.getElementById("buscarIdNome")
const formNavBar = document.getElementById("formNavBar")
formNavBar.addEventListener("submit",(e)=>{
    e.preventDefault()
    const buscarIdNomeValue = buscarIdNome.value

    fetch(`/estoque/buscarIdNome?idNome=${buscarIdNomeValue}`)
        .then(response => response.json())
        .then(data=>{
                console.log(data)
        })
        .catch(err =>{
            console.error(err)
        })
})
/*
fetch('/estoque/buscarIdNome')
    .then(response => response.json())
    .then(data=>{
        data.forEach(item => {
            console.log(item.nomeItem);
        });
        data.forEach(item => {

        })
    })
    .catch(err =>{
        console.error(err)
    })
 */