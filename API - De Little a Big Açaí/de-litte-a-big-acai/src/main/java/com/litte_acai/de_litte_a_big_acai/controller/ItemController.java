package com.litte_acai.de_litte_a_big_acai.controller;

import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping(path = "/adicionarItem")
    private ResponseEntity<?> adicionarItem(
        @RequestPart MultipartFile imagemItem,
        @RequestPart String nomeItem,
        @RequestPart String marca,
        @RequestPart String descricaoItem,
        @RequestPart String categoria,
        @RequestPart String precoUni,
        @RequestPart String quant,
        @RequestPart String volumeUni,
        @RequestPart String unidMedida,
        @RequestPart String dataValidade,
        @RequestPart String lote,
        @RequestPart String enderecoArmazen)throws IOException{

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
                 dataValidade,
                 lote,
                 enderecoArmazen)
         );
    }
}
