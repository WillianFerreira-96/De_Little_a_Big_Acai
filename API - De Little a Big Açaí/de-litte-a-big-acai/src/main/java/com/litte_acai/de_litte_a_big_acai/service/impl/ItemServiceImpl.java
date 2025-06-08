package com.litte_acai.de_litte_a_big_acai.service.impl;

import com.litte_acai.de_litte_a_big_acai.model.FiltroItem;
import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.repository.ItemRepository;
import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;



import java.lang.reflect.Field;
import java.sql.Date;
import java.util.*;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    ItemRepository itemRepository;

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
                return ResponseEntity.ok(notFound());
            }
        }else {
            if (itemRepository.existsByNomeItem(idNome)) {
                return ResponseEntity.ok().body(itemRepository.findByNomeItem(idNome));
            } else {

                return ResponseEntity.ok(notFound());
            }
        }
    }

    @Override
    public ResponseEntity<?> filtrarBusca(FiltroItem filtro){

        processarFiltro(filtro);//-------------------------------------------

        List<Item> itensFiltrados = new ArrayList<>();


        if (filtro.getFilterNome() != null && !filtro.getFilterNome().isEmpty() && itemRepository.existsByNomeItem(filtro.getFilterNome())){
                itensFiltrados.addAll(itemRepository.findByNomeItem(filtro.getFilterNome()));
        }

        if(filtro.getFilterMarca() != null && !filtro.getFilterMarca().isEmpty()){
            if (itensFiltrados.size() == 0){
                if(itemRepository.existsByMarca(filtro.getFilterMarca())){
                    itensFiltrados.addAll(itemRepository.findByMarca(filtro.getFilterMarca()));
                }else {
                    return ResponseEntity.ok(notFound());
                }
            }else{

                itensFiltrados.removeIf(item -> !item.getMarca().equals(filtro.getFilterMarca()));
                if(itensFiltrados.size() == 0){
                    return ResponseEntity.ok().body(notFound());
                }
            }
        }

        if (filtro.getFilterCategotia() != null && !filtro.getFilterCategotia().isEmpty()){
            if (itensFiltrados.size() == 0){
                if(itemRepository.existsByCategoria(filtro.getFilterCategotia())){
                    itensFiltrados.addAll(itemRepository.findByCategoria(filtro.getFilterCategotia()));
                }else {
                    return ResponseEntity.ok(notFound());
                }
            }else {
                itensFiltrados.removeIf(item -> !item.getCategoria().equals(filtro.getFilterCategotia()));
                if(itensFiltrados.size() == 0){
                    return ResponseEntity.ok().body(notFound());
                }
            }
        }


/*
        if(filtro.getFilterUnidMedida() != null){
            if (itensFiltrados.size() == 0){
                if(itemRepository.existsByUnidMedida(filtro.getFilterUnidMedida())){
                    itensFiltrados.addAll(itemRepository.findByUnidMedida(filtro.getFilterUnidMedida()));
                }else {
                    return ResponseEntity.ok().body(notFound());
                }
            }else{
                itensFiltrados.removeIf(item ->
                        item.getUnidMedida() == null || !item.getUnidMedida().equals(filtro.getFilterUnidMedida())
                );
                if(itensFiltrados.size() == 0){
                    return ResponseEntity.ok().body(notFound());
                }
            }
        }












/*




        if(filtro.getFilterMarca() != null && filtro.getFilterMarca().isEmpty() ){
            if (itensFiltrados.size() == 0){
                if(itemRepository.existsByMarca(filtro.getFilterMarca())){
                    itensFiltrados.addAll(itemRepository.findByMarca(filtro.getFilterMarca()));
                }
            }else{

            }
        }


        if(filtro.getFilterCategotia() != null && filtro.getFilterCategotia().isEmpty()){
            if (itensFiltrados.size() == 0){
                if(itemRepository.existsByCategoria(filtro.getFilterCategotia())){
                    itensFiltrados.addAll(itemRepository.findByCategoria(filtro.getFilterCategotia()));
                }
            }else{
                itensFiltrados.removeIf(item ->
                        item.getCategoria() == null || !item.getCategoria().equals(filtro.getFilterCategotia())
                );
            }
        }





































        /*

        if(filtro.getFilterUnidMedida() != null){
            if (itensFiltrados.size() == 0){
                if(itemRepository.existsByUnidMedida(filtro.getFilterUnidMedida())){
                    itensFiltrados.addAll(itemRepository.findByUnidMedida(filtro.getFilterUnidMedida()));
                }else {
                    return ResponseEntity.ok().body(notFound());
                }
            }else{
                itensFiltrados.removeIf(item ->
                        item.getUnidMedida() == null || !item.getUnidMedida().equals(filtro.getFilterUnidMedida())
                );
                if(itensFiltrados.size() == 0){
                    return ResponseEntity.ok().body(notFound());
                }
            }
        }



        if(){
            if (){
                if(){

                }else {
                    return ResponseEntity.ok().body(notFound());
                }
            }else{
                itensFiltrados.removeIf(item -> );
                if(){
                    return ResponseEntity.ok().body(notFound());
                }
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

        if(itensFiltrados.size() > 0){
            return ResponseEntity.ok().body(itensFiltrados);
        }else {
            return ResponseEntity.ok().body(notFound());
        }
        */


        if(itensFiltrados.size() == 0){
            return ResponseEntity.ok().body(notFound());
        }else {
            return ResponseEntity.ok().body(itensFiltrados);
        }
    }

    public void processarFiltro(FiltroItem filtro) {
        for (Field field : FiltroItem.class.getDeclaredFields()) {
            field.setAccessible(true);
            try {
                Object valor = field.get(filtro);
                if (valor != null) {
                    System.out.println("Campo: " + field.getName() + ", Valor: " + valor);
                }
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }



    private Map<String, Object> notFound(){
        Map<String, Object> resposta = new HashMap<>();
        resposta.put("mensagem", "Oops! Não encontramos nada com essas caracteristicas");
        resposta.put("dados", Collections.emptyList());

        return resposta;
    }
}
