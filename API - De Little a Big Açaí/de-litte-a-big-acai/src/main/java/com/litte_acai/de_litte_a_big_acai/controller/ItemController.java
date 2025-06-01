package com.litte_acai.de_litte_a_big_acai.controller;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.repository.ItemRepository;
import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import jakarta.annotation.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.crypto.Data;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/")
public class ItemController{
    @Autowired
    ItemService itemService;

    @GetMapping(path = "/buscarTodos")
    private List<Item>getAll(){
        return itemService.getAll();
    }

    @PostMapping(path = "/adicionarItem")
    private void adicionarItem(@RequestPart MultipartFile imagemItem,
                               @RequestPart String nomeItem,
                               @RequestPart String marca,
                               @RequestPart String descricaoItem,
                               @RequestPart String categoria,
                               @RequestPart String precoUni,
                               @RequestPart String quant,
                               @RequestPart String volumeUni,
                               @RequestPart String unidMedida,
                               @RequestPart Date dataValidade)throws IOException{
        itemService.addItem(
                imagemItem,
                nomeItem,
                marca,
                descricaoItem,
                categoria,
                precoUni,
                quant,
                volumeUni,
                unidMedida,
                dataValidade
        );
    }
    /*
    @PostMapping(path = "/adicionarItem")
    private void adicionarItem (
        @RequestPart MultipartFile imagemItem,
        @RequestPart String nomeItem,
        @RequestPart String marca,
        @RequestPart String descricaoItem,
        @RequestPart String categoria,
        @RequestPart Double precoUni,
        @RequestPart Integer quant,
        @RequestPart Double volumeUni,
        @RequestPart String unidMedida,
        @RequestPart String lote,
        @RequestPart String enderecoArmazen) throws IOException{




        itemService.adicionarItem(
            imagemItem,
            nomeItem,
            marca,
            descricaoItem,
            categoria,
            precoUni,
            quant,
            volumeUni,
            unidMedida,
            lote,
            enderecoArmazen
        );
    }

     */
}
