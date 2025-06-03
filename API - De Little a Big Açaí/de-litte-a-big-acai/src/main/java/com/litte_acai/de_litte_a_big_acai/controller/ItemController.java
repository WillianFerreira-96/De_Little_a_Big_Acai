package com.litte_acai.de_litte_a_big_acai.controller;

import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.beans.PropertyEditorSupport;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "/estoque")
public class ItemController{
    @Autowired
    ItemService itemService;

    @GetMapping(path = "/buscarTodos")
    private List<String>getAll(){
        return itemService.getAll();
    }

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

    @PostMapping(path = "/adicionarItem")
    private ResponseEntity<?> adicionarItem(
        @RequestPart(required = false) MultipartFile imagemItem,
        @RequestPart String nomeItem,
        @RequestPart(required = false) String marca,
        @RequestPart(required = false) String descricaoItem,
        @RequestPart(required = false) String categoria,
        @RequestParam(required = false) Double precoUni,
        @RequestParam(required = false) Double quant,
        @RequestParam(required = false) Double volumeUni,
        @RequestPart(required = false) String unidMedida,
        @RequestParam(required = false) LocalDate dataValidadeLocalDate,
        @RequestPart(required = false) String lote,
        @RequestPart(required = false) String enderecoArmazen)throws IOException{

         return ResponseEntity.status(HttpStatus.CREATED).body(itemService.addItem(
                 imagemItem,
                 nomeItem,
                 marca,
                 descricaoItem,
                 categoria,
                 precoUni,
                 quant,
                 volumeUni,
                 unidMedida,
                 dataValidadeLocalDate,
                 lote,
                 enderecoArmazen)
         );
    }
}
