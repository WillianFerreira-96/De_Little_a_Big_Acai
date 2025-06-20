import { BuscaAutomatica } from "../services/BuscaAutomatica"
//import AbrirLoadModel from "./AbrirLoadModal"
//import {FecharLoadModel} from "../utils/FecharLoadModel"
import { useState } from "react"

function MostrarBuscaAutomatica(){
    //AbrirLoadModel()
    try{
        var[data,setdata] = useState([])
        BuscaAutomatica().then((res)=>{
            console.log(res)
            setdata(res)
        })
            if(Array.isArray(data.listaVazia) && data.listaVazia.length == 0){
                return (
                    <>
                        <div className = "h2. Bootstrap heading text-center mt-5">{data.mensagem}</div>
                    </>
                )
                //FecharLoadModel()
            }else{
            }

    } catch (error) {
        console.error("Erro ao buscar dados:", error)
    }
}

export default MostrarBuscaAutomatica