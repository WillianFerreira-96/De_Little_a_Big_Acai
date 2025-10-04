import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/estoqueDashboard.css'

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

function EstoqueDashboard() {
  return <>
    <main className="">
      <div className="row">
        <div id='coluna1' className="col-4">

          {/*--- Tabela de Alertas ---*/}
          <div id='divTabelaAlerta' className="row overflow-y-auto ms-1 mt-2">
            <button type="button" class="btn btn-primary position-relative" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
              Itens com baixa quantidade
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                99+
                <span class="visually-hidden">unread messages</span>
              </span>
            </button>
            <div class="collapse" id="collapseExample">
              <table className='table table-light table-hover'>
                <thead className='table-head table-dark rounded'>
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
          <div className="row">
            <Pie data={pizza} />
          </div>

        </div>
        <div id='coluna2' className="col-8">
          <div className="row">

            {/*--- Tamanho do Estoque ---*/}
            <div className="col-6">
              <Line data={linha} />
            </div>

            {/*--- Valor do Estoque ---*/}
            <div className="col-6">
              <Line data={linha} />
            </div>

          </div>

          {/*--- Evolução do estoque ---*/}
          <div className="row">
            <Line data={linha} />
          </div>

        </div>
      </div>
      <div className="row">

        {/*--- Total de Perca (Dia) ---*/}
        <div className="col-4">
          <Bar data={barra} />
        </div>

        {/*--- Total de Perca (Mês) ---*/}
        <div className="col-4">
          <Line data={linha} />
        </div>

        {/*--- Total de Perca (Ano) ---*/}
        <div className="col-4">
          <Line data={linha} />
        </div>

      </div>
    </main>
  </>
}

export default EstoqueDashboard