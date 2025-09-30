package com.little_acai_api.controller;

import com.little_acai_api.model.FiltroItem;
import com.little_acai_api.model.Item;
import com.little_acai_api.service.ItemService;
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

    //initBinder aceita ponto ou virgula nas requisições Double ou Integer
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

    @PutMapping(path = "/editarItem")
    private ResponseEntity<?> editarItem(
            @RequestPart(required = false) MultipartFile imagemItem,
            @RequestPart(required = false) String InforId,
            @RequestPart(required = false) String inforNome,
            @RequestPart(required = false) String inforMarca,
            @RequestPart(required = false) String inforDescricao,
            @RequestPart(required = false) String inforCategoria,
            @RequestParam(required = false) Double inforPrecoUni,
            @RequestParam(required = false) Double inforQuant,
            @RequestParam(required = false) Double inforVol,
            @RequestPart(required = false) String inforUnidMedida,
            @RequestParam(required = false) LocalDate inforDataValidade,
            @RequestPart(required = false) String inforLote,
            @RequestPart(required = false) String inforEnderecoArmazen)throws IOException {

        Item itemEditado = new Item();
        itemEditado.setImagemItem(imagemItem.getBytes());
        itemEditado.setIdItem(Long.parseLong(InforId));
        itemEditado.setNomeItem(inforNome);
        itemEditado.setMarca(inforMarca);
        itemEditado.setDescricaoItem(inforDescricao);
        itemEditado.setCategoria(inforCategoria);
        itemEditado.setUnidMedida(inforUnidMedida);
        itemEditado.setLote(inforLote);
        itemEditado.setEnderecoArmazen(inforEnderecoArmazen);
        itemEditado.setPrecoUni(inforPrecoUni);
        itemEditado.setQuant(inforQuant);
        itemEditado.setVolumeUni(inforVol);
        itemEditado.setDataValidade(inforDataValidade);

        return itemService.editarItem(itemEditado);
    }

    @PostMapping(path = "/retirarItem")
    @ResponseBody
    private ResponseEntity<?> retirarItem(@RequestParam String id, @RequestParam String motivo){
        return itemService.retirarItem(id, motivo);
    }

    @DeleteMapping(path="/excluirItem/{id}")
    @ResponseBody
    private ResponseEntity<?> excluirItem(@PathVariable String id) {
        return ResponseEntity.ok().body(itemService.excluirItem(id));
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
