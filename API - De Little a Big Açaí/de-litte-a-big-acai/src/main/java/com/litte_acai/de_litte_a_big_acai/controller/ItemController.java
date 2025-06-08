package com.litte_acai.de_litte_a_big_acai.controller;

import com.litte_acai.de_litte_a_big_acai.model.FiltroItem;
import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.beans.PropertyEditorSupport;
import java.io.IOException;
import java.sql.Date;
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

    @GetMapping(path = "/buscarIdNome")
    @ResponseBody
    private ResponseEntity<?> buscarIdNome(@RequestParam String idNome){
        return itemService.buscarIdOuNome(idNome.trim().toLowerCase());
    }

    @GetMapping(path = "/buscarTodos")
    @ResponseBody
    private ResponseEntity<?> getAll(){
        return itemService.getAll();
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
        @RequestParam(required = false) String comparacaoVol,
        @RequestParam(required = false) Double filterVol,
        @RequestPart(required = false) String filterUnidMedida,
        @RequestPart(required = false) String filterLote,
        @RequestPart(required = false) String filterEnderecoArmazen,
        @RequestParam(required = false) String comparacaoDataSaid,
        @RequestParam(required = false) LocalDate filterDataSaid,
        @RequestPart(required = false) String filterMotivoSaida){

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
        filtro.setComparaVol(comparacaoVol);
        filtro.setFilterVol(filterVol);
        filtro.setFilterUnidMedida(filterUnidMedida);
        filtro.setFilterLote(filterLote);
        filtro.setFilterEnderecoArmazen(filterEnderecoArmazen);
        filtro.setComparaDataSaid(comparacaoDataSaid);
        filtro.setFilterDataSaid(filterDataSaid);
        filtro.setFilterMotivoSaida(filterMotivoSaida);

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
        @RequestParam(required = false) LocalDate dataValidadeLocalDate,
        @RequestPart(required = false) String lote,
        @RequestPart(required = false) String enderecoArmazen)throws IOException {

        Item item = new Item();
        item.setImagemItem(imagemItem.getBytes());
        try {
            if (nomeItem != null && !nomeItem.isEmpty()) {
                item.setNomeItem(nomeItem.trim().toLowerCase());
            } else {
                throw new Exception("O nome do item NÃO foi preenchido!");
            }
            if (marca != null && !marca.isEmpty()) {
                item.setMarca(marca.trim().toLowerCase());
            }
            if (descricaoItem != null && !descricaoItem.isEmpty()) {
                item.setDescricaoItem(descricaoItem.trim().toLowerCase());
            }
            if (categoria != null && !categoria.isEmpty()) {
                item.setCategoria(categoria.trim().toLowerCase());
            }
            if (unidMedida != null && !unidMedida.isEmpty()) {
                item.setUnidMedida(unidMedida.trim().toLowerCase());
            }
            if (lote != null && !lote.isEmpty()) {
                item.setLote(lote.trim().toLowerCase());
            }
            if (enderecoArmazen != null && !enderecoArmazen.isEmpty()) {
                item.setEnderecoArmazen(enderecoArmazen.trim().toLowerCase());
            }
            if (precoUni != null && precoUni instanceof Double) {
                item.setPrecoUni(Double.valueOf(precoUni));
            }

            if (quant != null && quant instanceof Double) {
                item.setQuant(quant.intValue());
            }

            if (volumeUni != null && volumeUni instanceof Double) {
                item.setVolumeUni(Double.valueOf(volumeUni));
            }

            if (dataValidadeLocalDate != null) {
                Date dataValidade = Date.valueOf(dataValidadeLocalDate);
                item.setDataValidade(dataValidade);
            }
            return ResponseEntity.ok().body(itemService.addItem(item));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping(path = "/buscar")
    //@GetMappinp --> Pagina: buscar.html
    private String buscar(){
        return "buscar";
    }

}
