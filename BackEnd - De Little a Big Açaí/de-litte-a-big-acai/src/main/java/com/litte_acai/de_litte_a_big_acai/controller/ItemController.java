package com.litte_acai.de_litte_a_big_acai.controller;

import com.litte_acai.de_litte_a_big_acai.model.FiltroItem;
import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.beans.PropertyEditorSupport;
import java.io.IOException;
import java.time.LocalDate;

@Controller
@RequestMapping("/estoque")
public class ItemController{
    @Autowired
    ItemService itemService;

    //initBinder para aceitar ponto ou virgula nas requisições Double ou Integer
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Double.class, new PropertyEditorSupport() {
            @Override
            public void setAsText(String text) {
                if (text != null && !text.isEmpty()) {
                    text = text.replace(",", ".");
                    setValue(Double.parseDouble(text));
                } else {
                    setValue(null);
                }
            }
        });
    }

    @GetMapping(path = "/buscarNomeOuID")
    @ResponseBody
    private ResponseEntity<?> buscarNomeOuID(@RequestParam String nomeOuID){
        return itemService.buscarNomeOuID(nomeOuID);
    }

    @GetMapping(path = "/buscarTodos")
    @ResponseBody
    private ResponseEntity<?> buscarTodosDesc(){
        return itemService.buscarTodosDesc();
    }

    @PostMapping(path = "/filtroBusca")
    @ResponseBody
    private ResponseEntity<?> filtroBusca(
        @RequestPart(required = false) String filterNome,
        @RequestPart(required = false) String filterMarca,
        @RequestPart(required = false) String filterCategotia,
        @RequestParam(required = false) String comparacaoDataEntr,
        @RequestParam(required = false) LocalDate filterDataEntr,
        @RequestParam(required = false) String comparacaoDataValid,
        @RequestParam(required = false) LocalDate filterDataValidade,
        @RequestParam(required = false) String comparacaoPreco,
        @RequestParam(required = false) Double filterPrecoUni,
        @RequestParam(required = false) String comparacaoQuant,
        @RequestParam(required = false) Integer filterQuant,
        @RequestParam(required = false) String comparacaoValortotal,
        @RequestParam(required = false) Double filterValorTotal,
        @RequestParam(required = false) String comparacaoVol,
        @RequestParam(required = false) Double filterVol,
        @RequestPart(required = false) String filterUnidMedida,
        @RequestPart(required = false) String filterLote,
        @RequestPart(required = false) String filterEnderecoArmazen,
        @RequestParam(required = false) String comparacaoDataSaid,
        @RequestParam(required = false) LocalDate filterDataSaid,
        @RequestPart(required = false) String filterMotivoSaida,
        @RequestPart(required = false) String switchCheckEmEstoque){

        FiltroItem filtro = new FiltroItem();

        filtro.setFilterNome(filterNome);
        filtro.setFilterMarca(filterMarca);
        filtro.setFilterCategotia(filterCategotia);
        filtro.setComparaDataEntr(comparacaoDataEntr);
        filtro.setFilterDataEntr(filterDataEntr);
        filtro.setComparaDataValid(comparacaoDataValid);
        filtro.setFilterDataValidade(filterDataValidade);
        filtro.setComparaPreco(comparacaoPreco);
        filtro.setFilterPrecoUni(filterPrecoUni);
        filtro.setComparaQuant(comparacaoQuant);
        filtro.setFilterQuant(filterQuant);
        filtro.setComparaValortotal(comparacaoValortotal);
        filtro.setFilterValorTotal(filterValorTotal);
        filtro.setComparaVol(comparacaoVol);
        filtro.setFilterVol(filterVol);
        filtro.setFilterUnidMedida(filterUnidMedida);
        filtro.setFilterLote(filterLote);
        filtro.setFilterEnderecoArmazen(filterEnderecoArmazen);
        filtro.setComparaDataSaid(comparacaoDataSaid);
        filtro.setFilterDataSaid(filterDataSaid);
        filtro.setFilterMotivoSaida(filterMotivoSaida);
        filtro.setFilterEmEstoque(switchCheckEmEstoque);

        return itemService.filtrarBusca(filtro);
    }

    @PostMapping(path = "/adicionarItem")
    private ResponseEntity<?> adicionarItem(
        @RequestPart(required = false) MultipartFile imagemItem,
        @RequestPart(required = false) String nomeItem,
        @RequestPart(required = false) String marca,
        @RequestPart(required = false) String descricaoItem,
        @RequestPart(required = false) String categoria,
        @RequestParam(required = false) Double precoUni,
        @RequestParam(required = false) Double quant,
        @RequestParam(required = false) Double volumeUni,
        @RequestPart(required = false) String unidMedida,
        @RequestParam(required = false) LocalDate dataValidade,
        @RequestPart(required = false) String lote,
        @RequestPart(required = false) String enderecoArmazen)throws IOException {

        Item item = new Item();
        item.setImagemItem(imagemItem.getBytes());
        item.setNomeItem(nomeItem);
        item.setMarca(marca);
        item.setDescricaoItem(descricaoItem);
        item.setCategoria(categoria);
        item.setUnidMedida(unidMedida);
        item.setLote(lote);
        item.setEnderecoArmazen(enderecoArmazen);
        item.setPrecoUni(precoUni);
        item.setQuant(quant);
        item.setVolumeUni(volumeUni);
        item.setDataValidade(dataValidade);

        return itemService.adicionarItem(item);
    }

    //Paginas HTML--------------------------------------------------------------------------------------------
    @GetMapping(path = "/buscar")
    private String buscar(){
        return "buscarEstoque";
    }

    @GetMapping(path = "/cadastrar")
    private String cadastrar(){
        return "cadastrarEstoque";
    }

}
