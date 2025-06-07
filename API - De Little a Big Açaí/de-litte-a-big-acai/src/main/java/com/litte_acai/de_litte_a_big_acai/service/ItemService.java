package com.litte_acai.de_litte_a_big_acai.service;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ItemService {
    Item addItem(Item item);
    List<Item>getAll();
    ResponseEntity<?> buscarIdOuNome(String idNome);
}
