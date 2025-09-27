const form = document.getElementById('formulario')
form.addEventListener("submit", (e)=>{
    e.preventDefault()

    const formData = new FormData(form)

    const url = '/estoque/adicionarItem';
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => {
            console.log('Status:', res.status);
            Swal.fire({
                title: 'Certin!',
                text: `Funfooooou`,
                icon: 'success',
                confirmButtonText: 'OK',
                background: '#ffffff',
                color: '#000000',
                iconColor: '#11ff00',
                confirmButtonColor: '#0051ff'

            });
            return res.json();
        })
        .then(data => console.log(data))
        .catch(err => {
            Swal.fire({
                title: 'Deu Pau!',
                text: 'O nome do item NÃO foi preenchido!',
                icon: 'warning',
                confirmButtonText: 'OK',
                background: '#fffbc6',
                color: '#000000',
                iconColor: '#fff100',
                confirmButtonColor: '#ff0000'

            });
        });

})