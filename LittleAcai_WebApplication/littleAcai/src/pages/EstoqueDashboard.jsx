import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/estoqueDashboard.css'
import EstoqueServices from '../services/EstoqueServices';

import { useEffect, useState, useRef } from 'react';

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
  Legend,           // Legenda dos datasets (geral)
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

  const [vencidos, setVencidos] = useState([])
  const [quantVencidos, setQuantVencidos] = useState(0)
  const [displayPopUpVenc, setDisplayPopUpVenc] = useState(false)

  const [baixaQuant, setBaixaQuant] = useState([])
  const [quantMin, setQuantMin] = useState(2)
  const [quantBaixaQuant, setQuantBaixaQuant] = useState(0)
  const [displayPopUpBaixaQuant, setDisplayPopUpBaixaQuant] = useState(false)

  const [proximoVenc, setProximoVenc] = useState([])
  const [quantSemana, setQuantSemana] = useState(1)
  const [quantProximoVenc, setQuantProximoVenc] = useState(0)
  const [displayPopUpProximoVenc, setDisplayPopUpProximoVenc] = useState(false)

  const [quantFruta, setQuantFruta] = useState(0)
  const [quantMassas, setQuantMassas] = useState(0)
  const [quantComplementos, setQuantComplementos] = useState(0)

  const [janeiro, setJaneiro] = useState(0);
  const [fevereiro, setFevereiro] = useState(0);
  const [marco, setMarco] = useState(0);
  const [abril, setAbril] = useState(0);
  const [maio, setMaio] = useState(0);
  const [junho, setJunho] = useState(0);
  const [julho, setJulho] = useState(0);
  const [agosto, setAgosto] = useState(0);
  const [setembro, setSetembro] = useState(0);
  const [outubro, setOutubro] = useState(0);
  const [novembro, setNovembro] = useState(0);
  const [dezembro, setDezembro] = useState(0);

  const [quantPerdaHoje, setQuantPerdaHoje] = useState(0)
  const [quantPerdaOntem, setQuantPerdaOntem] = useState(0)

  const [_1, set_1] = useState(0)
  const [_2, set_2] = useState(0)
  const [_3, set_3] = useState(0)
  const [_4, set_4] = useState(0)
  const [_5, set_5] = useState(0)
  const [_6, set_6] = useState(0)
  const [_7, set_7] = useState(0)
  const [_8, set_8] = useState(0)
  const [_9, set_9] = useState(0)
  const [_10, set_10] = useState(0)
  const [_11, set_11] = useState(0)
  const [_12, set_12] = useState(0)
  const [_13, set_13] = useState(0)
  const [_14, set_14] = useState(0)
  const [_15, set_15] = useState(0)
  const [_16, set_16] = useState(0)
  const [_17, set_17] = useState(0)
  const [_18, set_18] = useState(0)
  const [_19, set_19] = useState(0)
  const [_20, set_20] = useState(0)
  const [_21, set_21] = useState(0)
  const [_22, set_22] = useState(0)
  const [_23, set_23] = useState(0)
  const [_24, set_24] = useState(0)
  const [_25, set_25] = useState(0)
  const [_26, set_26] = useState(0)
  const [_27, set_27] = useState(0)
  const [_28, set_28] = useState(0)
  const [_29, set_29] = useState(0)
  const [_30, set_30] = useState(0)
  const [_31, set_31] = useState(0)

  const [janeiroPerda, setJaneiroPerda] = useState(0);
  const [fevereiroPerda, setFevereiroPerda] = useState(0);
  const [marcoPerda, setMarcoPerda] = useState(0);
  const [abrilPerda, setAbrilPerda] = useState(0);
  const [maioPerda, setMaioPerda] = useState(0);
  const [junhoPerda, setJunhoPerda] = useState(0);
  const [julhoPerda, setJulhoPerda] = useState(0);
  const [agostoPerda, setAgostoPerda] = useState(0);
  const [setembroPerda, setSetembroPerda] = useState(0);
  const [outubroPerda, setOutubroPerda] = useState(0);
  const [novembroPerda, setNovembroPerda] = useState(0);
  const [dezembroPerda, setDezembroPerda] = useState(0);

  useEffect(() => {
    EstoqueServices.AutoBusca().then((data) => {
      setItens(data)
      console.log(data)
    });
  }, [])

  useEffect(() => {
    //Quant. de Itens
    const somaQuantItens = itens.reduce((soma, item) => soma + item.quant, 0)
    setQuantItens(somaQuantItens)

    //Valor em estoque
    const somaValorItens = itens.reduce((soma, i) => i.precoUni * i.quant + soma, 0)
    var [intero, decimal] = somaValorItens.toFixed(2).toString().split(".")
    var total = "R$ " + intero + "," + decimal
    setValortItens(total)

    //Itens Vencidos
    const agora = new Date().toISOString().slice(0, 19);
    const itensVenc = itens.filter(i => i.dataValidade <= agora)
    setVencidos(itensVenc)
    setQuantVencidos(itensVenc.length)
    if (itensVenc.length > 0) setDisplayPopUpVenc(true)

    //Itens em Baixa quantidade
    const itensBaixaQuant = itens.filter(i => i.quant < quantMin)
    setBaixaQuant(itensBaixaQuant)
    setQuantBaixaQuant(itensBaixaQuant.length)
    if (itensBaixaQuant.length > 0) setDisplayPopUpBaixaQuant(true)

    //Itens Proximo do Vencimento
    const proximosDias = new Date()
    proximosDias.setDate(new Date().getDate() + quantSemana * 7)

    const itensProximoVenc = itens.filter(i => !(!i.dataValidade) && i.dataValidade > agora && new Date(i.dataValidade) < proximosDias)
    setProximoVenc(itensProximoVenc)
    setQuantProximoVenc(itensProximoVenc.length)
    if (itensProximoVenc.length > 0) setDisplayPopUpProximoVenc(true)

    //Distribuição por Categoria
    const frutas = itens.reduce((soma, i) => {
      if (i.categoria == 'frutas') {
        soma += i.quant
      }
      return soma
    }, 0)
    const massas = itens.reduce((soma, i) => {
      if (i.categoria == 'bases/massas') {
        soma += i.quant
      }
      return soma
    }, 0)
    const complementos = itens.reduce((soma, i) => {
      if (i.categoria == 'complementos') {
        soma += i.quant
      }
      return soma
    }, 0)
    setQuantFruta(frutas)
    setQuantMassas(massas)
    setQuantComplementos(complementos)

    //Evolução do Estoque
    for (var ind = 0; ind < 12; ind++) {
      var valorMes = itens.reduce((soma, i) => {
        const data = new Date(i.dataEntr)
        if (data.getMonth() === ind && data.getFullYear() === new Date().getFullYear()) {
          soma += i.precoUni * i.quant
        }
        return soma
      }, 0)

      switch (ind) {
        case 0:
          setJaneiro(valorMes.toFixed(2))
          break;

        case 1:
          setFevereiro(valorMes.toFixed(2))
          break;

        case 2:
          setMarco(valorMes.toFixed(2))
          break;

        case 3:
          setAbril(valorMes.toFixed(2))
          break;

        case 4:
          setMaio(valorMes.toFixed(2))
          break;

        case 5:
          setJunho(valorMes.toFixed(2))
          break;

        case 6:
          setJulho(valorMes.toFixed(2))
          break;

        case 7:
          setAgosto(valorMes.toFixed(2))
          break;

        case 8:
          setSetembro(valorMes.toFixed(2))
          break;

        case 9:
          setOutubro(valorMes.toFixed(2))
          break;

        case 10:
          setNovembro(valorMes.toFixed(2))
          break;

        case 11:
          setDezembro(valorMes.toFixed(2))
          break;

        default:
          break;
      }
    }

    //Perca dia 
    const hoje = new Date()

    const percaHoje = itens.filter((i) => {
      const data = new Date(i.dataValidade)
      return (
        data.getFullYear() === hoje.getFullYear() &&
        data.getMonth() === hoje.getMonth() &&
        data.getDate() === hoje.getDate()
      )
    })
    setQuantPerdaHoje(percaHoje.length)

    const ontem = new Date()
    ontem.setDate(hoje.getDate() - 1)

    const percaOntem = itens.filter((i) => {
      const data = new Date(i.dataValidade)

      return (
        data.getFullYear() === ontem.getFullYear() &&
        data.getMonth() === ontem.getMonth() &&
        data.getDate() === ontem.getDate()
      )
    })
    setQuantPerdaOntem(percaOntem.length)

    //Perda Mês
    for (var ind = 1; ind <= 31; ind++) {
      const perdasMes = itens.filter((i) => {
        const data = new Date(i.dataValidade)
        return (
          data.getFullYear() === hoje.getFullYear() &&
          data.getMonth() === hoje.getMonth() &&
          data.getDate() === ind
        )
      }).length

      switch (ind) {
        case 1:
          set_1(perdasMes)
          break;

        case 2:
          set_2(perdasMes)
          break;

        case 3:
          set_3(perdasMes)
          break;

        case 4:
          set_4(perdasMes)
          break;

        case 5:
          set_5(perdasMes)
          break;

        case 6:
          set_6(perdasMes)
          break;

        case 7:
          set_7(perdasMes)
          break;

        case 8:
          set_8(perdasMes)
          break;

        case 9:
          set_9(perdasMes)
          break;

        case 10:
          set_10(perdasMes)
          break;

        case 11:
          set_11(perdasMes)
          break;

        case 12:
          set_12(perdasMes)
          break;

        case 13:
          set_13(perdasMes)
          break;

        case 14:
          set_14(perdasMes)
          break;

        case 15:
          set_15(perdasMes)
          break;

        case 16:
          set_16(perdasMes)
          break;

        case 17:
          set_17(perdasMes)
          break;

        case 18:
          set_18(perdasMes)
          break;

        case 19:
          set_19(perdasMes)
          break;

        case 20:
          set_20(perdasMes)
          break;

        case 21:
          set_21(perdasMes)
          break;

        case 22:
          set_22(perdasMes)
          break;

        case 23:
          set_23(perdasMes)
          break;

        case 24:
          set_24(perdasMes)
          break;

        case 25:
          set_25(perdasMes)
          break;

        case 26:
          set_26(perdasMes)
          break;

        case 27:
          set_27(perdasMes)
          break;

        case 28:
          set_28(perdasMes)
          break;

        case 29:
          set_29(perdasMes)
          break;

        case 30:
          set_30(perdasMes)
          break;

        case 31:
          set_31(perdasMes)
          break;

        default:
          break;
      }

    }

    //Perda Ano
    for (var ind = 0; ind < 12; ind++) {
      var perdasAno = itens.reduce((count, i) => {
        const data = new Date(i.dataValidade)
        if (data.getFullYear() === hoje.getFullYear()) {
          if (data.getMonth() === ind) {
            if (ind === hoje.getMonth()) {
              if (data <= hoje) {
                count++
              }
            } else if (ind < hoje.getMonth()) {
              count++
            }

          }
        }
        return count

      }, 0)

      switch (ind) {
        case 0:
          setJaneiroPerda(perdasAno)
          break;
        case 1:
          setFevereiroPerda(perdasAno)
          break;
        case 2:
          setMarcoPerda(perdasAno)
          break;
        case 3:
          setAbrilPerda(perdasAno)
          break;
        case 4:
          setMaioPerda(perdasAno)
          break;
        case 5:
          setJunhoPerda(perdasAno)
          break;
        case 6:
          setJulhoPerda(perdasAno)
          break;
        case 7:
          setAgostoPerda(perdasAno)
          break;
        case 8:
          setSetembroPerda(perdasAno)
          break;
        case 9:
          setOutubroPerda(perdasAno)
          break;
        case 10:
          setNovembroPerda(perdasAno)
          break;
        case 11:
          setDezembroPerda(perdasAno)
          break;
        default:
          break;
      }
    }


  }, [itens]);

  const porCategoria = {
    labels: ["Frutas", "Bases/Massas", "Complementos"],
    datasets: [
      {
        label: "Quantidade",
        data: [quantFruta, quantMassas, quantComplementos],
        backgroundColor: ["#8cc63e", "#692f8a", "#a81bb1"],
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };

  const evolucaoEstoque = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    datasets: [
      {
        label: "Valor em estoque (Mês - R$)",
        data: [janeiro, fevereiro, marco, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro],
        borderColor: "#ff00fe",
        backgroundColor: "#ff00fe",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const perdaDia = {
    labels: ["Ontem", "Hoje"],
    datasets: [
      {
        label: "Perdas (Dia)",
        data: [quantPerdaOntem, quantPerdaHoje],
        backgroundColor: ["#8cc63e", "#652d90"]
      }
    ]
  };

  const perdaMes = {
    labels: ["Dia 1", "Dia 2", "Dia 3", "Dia 4", "Dia 5", "Dia 6", "Dia 7", "Dia 8", "Dia 9", "Dia 10", "Dia 11", "Dia 12", "Dia 13", "Dia 14", "Dia 15", "Dia 16", "Dia 17", "Dia 18", "Dia 19", "Dia 20", "Dia 21", "Dia 22", "Dia 23", "Dia 24", "Dia 25", "Dia 26", "Dia 27", "Dia 28", "Dia 29", "Dia 30", "Dia 31"],
    datasets: [
      {
        label: "Perdas (Mês)",
        data: [_1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31],
        borderColor: "#ff00fe",
        backgroundColor: "#ff00fe",
      }
    ]
  };

  const perdaAno = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    datasets: [
      {
        label: "Perdas (Ano)",
        data: [janeiroPerda, fevereiroPerda, marcoPerda, abrilPerda, maioPerda, junhoPerda, julhoPerda, agostoPerda, setembroPerda, outubroPerda, novembroPerda, dezembroPerda],
        borderColor: "#ff00fe",
        backgroundColor: "#ff00fe",
      }
    ]
  };

  const optionsGrafico = {
    plugins: {
      legend: {
        labels: {
          color: "#ffffff"
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: "#a1a1a1"
        },
        ticks: {
          color: "#ffffff"
        }
      },
      y: {
        grid: {
          color: "#a1a1a1"
        },
        ticks: {
          color: "#ffffff"
        }
      }
    }
  };

  const optionsPorCategoria = {
    plugins: {
      legend: {
        labels: {
          color: "#ffffff"
        }
      }
    }
  };

  return <>
    <main id='mainDashdoard'>
      <div className="row main-row1 m-0 p-0">
        <div id='coluna1' className="col-4 m-0 p-0">
          {/*--- Tabela de Alertas ---*/}
          <div id='divTabelaAlerta' className="row overflow-y-scroll ps-5 pe-5 pt-5 pb-5 m-0 ">
            {/*--- Vencidos ---*/}
            <b className='h1 fw-bold text-center text-white p-0 m-0'>Alertas</b>
            <button type="button" className="btn btn-danger position-relative mb-3" data-bs-toggle="collapse" href="#collapseVencidos" role="button" aria-expanded="false" aria-controls="collapseVencidos">
              Itens Vencidos
              <span className={`${displayPopUpVenc ? " d-inline-block " : " d-none "} position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger`}>
                {quantVencidos}
                <span className="visually-hidden"></span>
              </span>
            </button>
            <div className="collapse" id="collapseVencidos">
              <table className='table table-light table-hover'>
                <thead className='table-danger'>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                {vencidos.map((i) => {
                  return <tbody>
                    <tr>
                      <td>{i.idItem}</td>
                      <td>{i.nomeItem}</td>
                      <td>{i.quant}</td>
                    </tr>
                  </tbody>
                })}
              </table>
            </div>

            {/*--- Baixa Quantidade ---*/}
            <button type="button" className="btn btn-warning position-relative mb-3" data-bs-toggle="collapse" href="#collapseBaixaQuant" role="button" aria-expanded="false" aria-controls="collapseBaixaQuant">
              Itens em Baixa Quantidade <span className='text-secondary'> | Menos que {quantMin}</span>
              <span className={`${displayPopUpBaixaQuant ? " d-inline-block " : " d-none "} position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger`}>
                {quantBaixaQuant}
                <span className="visually-hidden"></span>
              </span>
            </button>
            <div className="collapse" id="collapseBaixaQuant">
              <table className='table table-light table-hover'>
                <thead className='table-warning'>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                {baixaQuant.map((i) => {
                  return <tbody>
                    <tr>
                      <td>{i.idItem}</td>
                      <td>{i.nomeItem}</td>
                      <td>{i.quant}</td>
                    </tr>
                  </tbody>
                })}
              </table>
            </div>

            {/*--- Proximo do Vencimento ---*/}
            <button type="button" className="btn btn-secondary position-relative mb-3" data-bs-toggle="collapse" href="#collapseProximoVenc" role="button" aria-expanded="false" aria-controls="collapseProximoVenc">
              Itens Próximo do Vencimento <span className='text-dark'> | há {quantSemana} semana</span>
              <span className={`${displayPopUpProximoVenc ? " d-inline-block " : " d-none "} position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger`}>
                {quantProximoVenc}
                <span className="visually-hidden"></span>
              </span>
            </button>
            <div className="collapse" id="collapseProximoVenc">
              <table className='table table-light table-hover'>
                <thead className='table-secondary'>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                {proximoVenc.map((i) => {
                  return <tbody>
                    <tr>
                      <td>{i.idItem}</td>
                      <td>{i.nomeItem}</td>
                      <td>{i.quant}</td>
                    </tr>
                  </tbody>
                })}
              </table>
            </div>
          </div>
        </div>
        <div id='coluna2' className="col-8 m-0 p-0">
          <div className="row m-0 p-0">

            {/*--- Itens em estoque ---*/}
            <div className="col-6  border-end border-bottom border-5 border-secondary">
              <div className="text-center p-3 " id="grafico-tamanho-estoque">
                <h2 className="text-white">Itens em Estoque</h2>
                <h2 className="text-green fs-1 fw-bold">{quantItens} Itens</h2>
              </div>
            </div>

            {/*--- Valor do Estoque ---*/}
            <div className="col-6 border-bottom border-5 border-secondary">
              <div className="text-center p-3 " id="grafico-valor-estoque">
                <h2 className="text-white">Valor do Estoque</h2>
                <h2 className="text-green fs-1 fw-bold">{valorItens}</h2>
              </div>
            </div>

          </div>

          <div className='d-flex align-items-center justify-content-around ps-5'>
            {/*--- Distribuição por Categoria ---*/}
            <div className="row m-0 p-0">
              <div id="divGraficoCategoria" className='d-flex flex-column justify-content-start align-items-center m-0 p-0'>
                <b className='text-nowrap text-decoration-none fs-4 p-0 mb-3 text-white'>Distribuição por Categoria</b>
                <div>
                  <Pie id="grafico-categoria" data={porCategoria} options={optionsPorCategoria} />
                </div>
              </div>
            </div>

            {/*--- Evolução do estoque ---*/}
            <div className="row m-0 p-0">
              <div id="divGraficoEvolucao" className='d-flex flex-column justify-content-start align-items-center m-0 p-3'>
                <b className='text-nowrap text-decoration-none fs-4 p-0 mb-3 text-white'>Evolução do Estoque ao longo do Ano (R$) </b>
                <div className='d-flex justify-content-start align-items-center'>
                  <Line id="grafico-evolucao" data={evolucaoEstoque} options={optionsGrafico} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="row main-row2 border-top border-5 border-secondary">

        {/*--- Total de Perda (Dia) ---*/}
        <div className="col-4 d-flex justify-content-end align-items-lg-center">
          <div>
            <Bar id="perda-dia" data={perdaDia} options={optionsGrafico} />
          </div>
        </div>

        {/*--- Total de Perda (Mês) ---*/}
        <div className="col-4 d-flex justify-content-center align-items-lg-center">
          <div>
            <Line id="perda-mes" data={perdaMes} options={optionsGrafico} />
          </div>
        </div>

        {/*--- Total de Perda (Ano) ---*/}
        <div className="col-4 d-flex justify-content-start align-items-lg-center">
          <div>
            <Line id="perda-ano" data={perdaAno} options={optionsGrafico} />
          </div>
        </div>

      </div>
    </main>
  </>
}

export default EstoqueDashboard