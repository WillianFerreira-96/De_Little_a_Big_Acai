package com.litte_acai.de_litte_a_big_acai.service;

import com.litte_acai.de_litte_a_big_acai.model.FiltroItem;
import com.litte_acai.de_litte_a_big_acai.model.Item;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ItemService {
    ResponseEntity<?> adicionarItem(Item item);
    ResponseEntity<?> buscarTodosDesc();
    ResponseEntity<?> buscarIdOuNome(String idNome);
    ResponseEntity<?> filtrarBusca(FiltroItem filtroItem);
}
