import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/estoqueDashboard.css'
import EstoqueServices from '../services/EstoqueServices';

import { useEffect, useState } from 'react';

import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,   // Eixos categóricos (Bar, Line)
  LinearScale,     // Eixos numéricos (Bar, Line)
  BarElement,      // Gráfico de Barras (Bar)
  ArcElement,      // Gráfico de Pizza (Pie)
  PointElement,    // Pontos do gráfico de Linha (Line)
  LineElement,     // Para desenhar a linha no gráfico de Linha (Line)
  Title,           // Título do gráfico (geral)
  Tooltip,         // Tooltips ao passar o mouse (geral)
  Legend           // Legenda dos datasets (geral)
} from "chart.js";

ChartJS.register(
  CategoryScale,   // Bar, Line
  LinearScale,     // Bar, Line
  BarElement,      // Bar
  ArcElement,      // Pie
  PointElement,    // Line
  LineElement,     // Line
  Title,           // Geral
  Tooltip,         // Geral
  Legend           // Geral
);


function EstoqueDashboard() {

  const [itens, setItens] = useState([])
  const [quantItens, setQuantItens] = useState(0)
  const [valorItens, setValortItens] = useState(0)

  useEffect(() => {
    EstoqueServices.AutoBusca().then((data) => {
      setItens(data)
      console.log(data)
    });
  }, [])

  useEffect(() => {
    const somaQuantItens = itens.reduce((soma, item) => soma + item.quant, 0)
    setQuantItens(somaQuantItens)

    const somaValorItens = itens.reduce((soma, i) => i.precoUni * i.quant + soma, 0)
    var [intero, decimal] = somaValorItens.toFixed(2).toString().split(".")
    var total = "R$ " + intero + "," + decimal
    setValortItens(total)

  }, [itens]);

  const barra = {
    labels: ["Janeiro", "Fevereiro", "Março"],
    datasets: [
      {
        label: "Vendas",
        data: [12, 19, 7],
        backgroundColor: ["#8884d8", "#82ca9d", "#ffc658"]
      }
    ]
  };

  const pizza = {
    labels: ["Maçã", "Banana", "Uva"],
    datasets: [
      {
        label: "Frutas vendidas",
        data: [12, 19, 7],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
        borderWidth: 1,
      },
    ],
  };

  const linha = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
    datasets: [
      {
        label: "Vendas",
        data: [5, 10, 7, 15],
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54,162,235,0.2)",
        fill: true,
        tension: 0.3, // deixa a linha suavizada
      },
    ],
  };

  return <>
    <main className="">
      <div className="row main-row1 m-0 p-0">
        <div id='coluna1' className="col-4 m-0 p-0">
          {/*--- Tabela de Alertas ---*/}
          <div id='divTabelaAlerta' className="row overflow-y-auto ps-5 pe-5 pt-4 pb-1 m-0">
            {/*--- Vencidos ---*/}
            <button type="button" className="btn btn-danger position-relative mb-3" data-bs-toggle="collapse" href="#collapseVencidos" role="button" aria-expanded="false" aria-controls="collapseVencidos">
              Itens Vencidos
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                99+
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
            <div className="collapse" id="collapseVencidos">
              <table className='table table-light table-hover'>
                <thead className='table-dark rounded'>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=''>
                    <td>asdf</td>
                    <td>asdf</td>
                    <td>asdf</td>
                  </tr>
                  <tr>
                    <td>asdf</td>
                    <td>asdf</td>
                    <td>asdf</td>
                  </tr>
                  <tr>
                    <td>asdf</td>
                    <td>asdf</td>
                    <td>asdf</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*--- Baixa Quantidade ---*/}
            <button type="button" className="btn btn-warning position-relative mb-3" data-bs-toggle="collapse" href="#collapseBaixaQuant" role="button" aria-expanded="false" aria-controls="collapseBaixaQuant">
              Itens em Baixa Quantidade
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                99+
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
            <div className="collapse" id="collapseBaixaQuant">
              <table className='table table-light table-hover'>
                <thead className='table-dark rounded'>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=''>
                    <td>asdf</td>
                    <td>asdf</td>
                    <td>asdf</td>
                  </tr>
                  <tr>
                    <td>asdf</td>
                    <td>asdf</td>
                    <td>asdf</td>
                  </tr>
                  <tr>
                    <td>asdf</td>
                    <td>asdf</td>
                    <td>asdf</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*--- Proximo do Vencimento ---*/}
            <button type="button" className="btn btn-secondary position-relative mb-3" data-bs-toggle="collapse" href="#collapseProximoVenc" role="button" aria-expanded="false" aria-controls="collapseProximoVenc">
              Itens Próximo do Vencimento
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                99+
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
            <div className="collapse" id="collapseProximoVenc">
              <table className='table table-light table-hover'>
                <thead className='table-dark rounded'>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className=''>
                    <td>asdf</td>
                    <td>asdf</td>
                    <td>asdf</td>
                  </tr>
                  <tr>
                    <td>asdf</td>
                    <td>asdf</td>
                    <td>asdf</td>
                  </tr>
                  <tr>
                    <td>asdf</td>
                    <td>asdf</td>
                    <td>asdf</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          {/*--- Distribuição por Categoria ---*/}
          <div className="row p-5 bg-danger m-0 p-0">
            <div id="grafico-categoria" className='d-flex justify-content-center m-0 p-0'>
              <Pie data={pizza} />
            </div>
          </div>

        </div>
        <div id='coluna2' className="col-8 m-0 p-0">
          <div className="row m-0 p-0">

            {/*--- Itens em estoque ---*/}
            <div className="col-6 bg-primary">
              <div className="text-center p-3 " id="grafico-tamanho-estoque">
                <h2 className="text-black">Itens em Estoque</h2>
                <h2 className="text-primary fs-1 fw-bold">{quantItens} Itens</h2>
              </div>
            </div>

            {/*--- Valor do Estoque ---*/}
            <div className="col-6 bg-secondary-subtle">
              <div className="text-center p-3 " id="grafico-valor-estoque">
                <h2 className="text-black">Valor do Estoque</h2>
                <h2 className="text-primary fs-1 fw-bold">{valorItens}</h2>
              </div>
            </div>

          </div>

          {/*--- Evolução do estoque ---*/}
          <div className="row bg-warning m-0 p-3">
            <div id="grafico-evolucao-estoque" className='d-flex justify-content-center p-3'>
              <Line data={linha} />
            </div>
          </div>

        </div>
      </div>


      <div className="row main-row2 bg-dark">

        {/*--- Total de Perca (Dia) ---*/}
        <div className="col-4 bg-primary d-flex justify-content-end align-items-lg-center">
          <div>
            <Bar id="perca-dia" data={barra} />
          </div>
        </div>

        {/*--- Total de Perca (Mês) ---*/}
        <div className="col-4 bg-secondary d-flex justify-content-center align-items-lg-center">
          <div>
            <Line id="perca-mes" data={linha} />
          </div>
        </div>

        {/*--- Total de Perca (Ano) ---*/}
        <div className="col-4 bg-info d-flex justify-content-start align-items-lg-center">
          <div>
            <Line id="perca-ano" data={linha} />
          </div>
        </div>

      </div>
    </main>
  </>
}

export default EstoqueDashboard