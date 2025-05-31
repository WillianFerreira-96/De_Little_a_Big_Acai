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

    @PostMapping(value = "/adicionarItem", consumes = "multipart/form-data")
    private String adicionarItem (@RequestPart Item item, @RequestPart MultipartFile imagem) throws IOException {

        byte[] imagemBytes = imagem.getBytes();

        itemService.adicionarItem(item, imagemBytes);
        return "Item adicionado com sucesso!";
    }


}
