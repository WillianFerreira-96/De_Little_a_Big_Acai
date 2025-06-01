package com.litte_acai.de_litte_a_big_acai.controller;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.repository.ItemRepository;
import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import jakarta.annotation.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.crypto.Data;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "/estoque")
public class ItemController{
    @Autowired
    ItemService itemService;

    @GetMapping(path = "/buscarTodos")
    private List<Item>getAll(){
        return itemService.getAll();
    }

    @PostMapping(value = "/adicionarItem")
    private void adicionarItem (
        @RequestPart MultipartFile imagemItem,
        @RequestPart String nomeItem,
        @RequestPart String marca,
        @RequestPart String descricaoItem,
        @RequestPart String categoria,
        @RequestPart double preçoUni,
        @RequestPart int quant,
        @RequestPart double volume,
        @RequestPart String unidMedida,
        @RequestPart Data dataValidade,
        @RequestPart String lote,
        @RequestPart String enderecoArmazen
    )throws IOException {


    }


}
