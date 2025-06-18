import { useEffect } from 'react';

function PageBuscarEstoque() {
    useEffect(()=>{
        const activeBuscar = document.getElementById('activeBuscar')
        activeBuscar.className = 'nav-link activated'
    })
    return (
        <>
            <main>
                <div id="overFlowDiv" style={{
                    overflow: "auto",
                    height: "calc(100vh - 56px)",
                    width: "100vw"
                }}>
                    <table class="table table-light table-striped">
                        <thead>
                            <tr>
                                <th>Imagem</th>
                                <th class="text-nowrap">ID</th>
                                <th class="text-nowrap">Nome</th>
                                <th class="text-nowrap">Marca</th>
                                <th class="text-nowrap">Descrição</th>
                                <th class="text-nowrap">Categoria</th>
                                <th class="text-nowrap">Data de Entrada</th>
                                <th class="text-nowrap">Preço por unidade</th>
                                <th class="text-nowrap">Quantidade</th>
                                <th class="text-nowrap">Valor Total</th>
                                <th class="text-nowrap">Volume por unidade</th>
                                <th class="text-nowrap">Data de Validade</th>
                                <th class="text-nowrap">Lote</th>
                                <th class="text-nowrap">Endereço de Armazenamento</th>
                                <th class="text-nowrap">Em Estoque</th>
                                <th class="text-nowrap">Motivo da Saída</th>
                                <th class="text-nowrap">Data de Saída</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <div id="ifEmpty"></div>
                </div>
            </main>
        </>
    )
}

export default PageBuscarEstoque;