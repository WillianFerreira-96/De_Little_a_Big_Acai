package com.litte_acai.de_litte_a_big_acai.service.impl;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.repository.ItemRepository;
import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    private StringHttpMessageConverter stringHttpMessageConverter;

    @Override
    public List<Item> getAll() {
        return itemRepository.findAll();
    }

    @Override
    public Item addItem(Item item){
        itemRepository.save(item);
        return item;
    }
    @Override
    public ResponseEntity<?> buscarIdOuNome(String idNome){
        if (idNome.matches("\\d+")){
            itemRepository.existsByIdItem(Long.parseLong(idNome));
            return ResponseEntity.ok().body(itemRepository.findByIdItem(Long.parseLong(idNome)));
        }else {
            if (itemRepository.existsByNomeItem(idNome)) {
                return ResponseEntity.ok().body(itemRepository.findByNomeItem(idNome));
            } else {
                return ResponseEntity.ok(Collections.emptyList());
            }
        }
    }
}
