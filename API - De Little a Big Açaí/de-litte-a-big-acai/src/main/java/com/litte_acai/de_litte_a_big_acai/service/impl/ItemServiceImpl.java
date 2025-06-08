package com.litte_acai.de_litte_a_big_acai.service.impl;

import com.litte_acai.de_litte_a_big_acai.model.FiltroItem;
import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.repository.ItemRepository;
import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.*;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    private StringHttpMessageConverter stringHttpMessageConverter;

    @Override
    public ResponseEntity<?> getAll() {
        if (itemRepository.findAll().isEmpty()) {
            return ResponseEntity.ok().body(Collections.emptyList());
        }else {
            return ResponseEntity.ok().body(itemRepository.findAll());
        }
    }

    @Override
    public Item addItem(Item item){
        itemRepository.save(item);
        return item;
    }
    @Override
    public ResponseEntity<?> buscarIdOuNome(String idNome){
        if (idNome.matches("\\d+")){
            if(itemRepository.existsByIdItem(Long.parseLong(idNome))){
                return ResponseEntity.ok().body(itemRepository.findByIdItem(Long.parseLong(idNome)));
            }else {
                Map<String, Object> resposta = new HashMap<>();
                resposta.put("mensagem", "Oops! Não encontramos nada com essas caracteristicas");
                resposta.put("dados", Collections.emptyList());
                return ResponseEntity.ok(resposta);
            }
        }else {
            if (itemRepository.existsByNomeItem(idNome)) {
                return ResponseEntity.ok().body(itemRepository.findByNomeItem(idNome));
            } else {
                Map<String, Object> resposta = new HashMap<>();
                resposta.put("mensagem", "Oops! Não encontramos nada com essas caracteristicas");
                resposta.put("dados", Collections.emptyList());
                return ResponseEntity.ok(resposta);
            }
        }
    }

    @Override
    public ResponseEntity<?> filtrarBusca(FiltroItem filtroItem){
        List<Item> itensFiltrados = new ArrayList<>();



        if (filtroItem.getFilterNome() != null){
            itensFiltrados.addAll(itemRepository.findByNomeItem(filtroItem.getFilterNome()));
        }
        if(filtroItem.getFilterMarca() != null){
            if (itensFiltrados.size() == 0){
                itensFiltrados.addAll(itemRepository.findByMarca(filtroItem.getFilterMarca()));
            }else{
                itensFiltrados.removeIf(itemFiltrado -> !itemFiltrado.getMarca().equals(filtroItem.getFilterMarca()));
            }
        }
        if(filtroItem.getFilterCategotia() != null){
            if (itensFiltrados.size() == 0){
                itensFiltrados.addAll(itemRepository.findByCategoria(filtroItem.getFilterCategotia()));
            }else {
                itensFiltrados.removeIf(itemFiltrado -> !itemFiltrado.getCategoria().equals(filtroItem.getFilterCategotia()));
            }
        }
        /*
        -----------Seguir essa sequência------------
        private String filterUnidMedida;
        private String filterLote;
        private String filterEnderecoArmazen;
        private String filterMotivoSaida;

        private String comparaDataEntr;
        private Date filterDataEntr;
        private String comparaDataValid;
        private Date filterDataValidade;
        private String comparaDataSaid;
        private Date filterDataSaid;

        private String comparaPreco;
        private Double filterPrecoUni;
        private String comparaQuant;
        private int filterQuant;
        private String comparaVol;
        private Double filterVol;

        */
        return ResponseEntity.ok().body(itensFiltrados);
    }

}
