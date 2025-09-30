package com.little_acai_api.service;

import com.little_acai_api.model.FiltroItem;
import com.little_acai_api.model.Item;
import org.springframework.http.ResponseEntity;

public interface ItemService {
    ResponseEntity<?> adicionarItem(Item item);
    ResponseEntity<?> buscarTodosDesc();
    ResponseEntity<?> buscarNomeOuID(String idNome);
    ResponseEntity<?> filtrarBusca(FiltroItem filtroItem);
    ResponseEntity<?> retirarItem(String idRetirar, String motivoRetirar);
    ResponseEntity<?> editarItem(Item itemEditado);
    ResponseEntity<?> excluirItem(String idExcluir);
}
