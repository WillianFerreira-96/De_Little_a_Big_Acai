package com.litte_acai.de_litte_a_big_acai.service.impl;

import com.litte_acai.de_litte_a_big_acai.model.FiltroItem;
import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.repository.ItemRepository;
import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;



import java.lang.reflect.Field;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
    public ResponseEntity<?> addItem(Item item){
        itemRepository.save(item);
        return ResponseEntity.ok().body(item);
    }
    @Override
    public ResponseEntity<?> buscarIdOuNome(String nomeId){
        String idNome =  nomeId.trim().toLowerCase();
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

        //processarFiltro(filtro);//-------------------------------------------

        List<Item> itensFiltrados = new ArrayList<>();
        Boolean isFistSearch = true;

        //Filtro Nome
        if (filtro.getFilterNome() != null && !filtro.getFilterNome().isEmpty() && !filtro.getFilterNome().isBlank()){
            if(itemRepository.existsByNomeItem(filtro.getFilterNome())){
                itensFiltrados.addAll(itemRepository.findByNomeItem(filtro.getFilterNome()));
                isFistSearch = false;
            }else {
                return ResponseEntity.ok(notFound());
            }
        }

        //Filtro Marca
        if(filtro.getFilterMarca() != null && !filtro.getFilterMarca().isEmpty() && !filtro.getFilterMarca().isBlank()){
            if (isFistSearch){
                if(itemRepository.existsByMarca(filtro.getFilterMarca()) ){
                    itensFiltrados.addAll(itemRepository.findByMarca(filtro.getFilterMarca()));
                    isFistSearch = false;
                }else {
                    return ResponseEntity.ok(notFound());
                }
            }else {
                for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                    String itemfiltro = itensFiltrados.get(i).getMarca().trim().toLowerCase();
                    if (!filtro.getFilterMarca().equals(itemfiltro)) {
                        itensFiltrados.remove(i);
                    }
                }
            }
        }

        //Filtro Categoria
        if (filtro.getFilterCategotia() != null && !filtro.getFilterCategotia().isEmpty() && !filtro.getFilterCategotia().isBlank()) {
            if (isFistSearch){
                if(itemRepository.existsByCategoria(filtro.getFilterCategotia())){
                    itensFiltrados.addAll(itemRepository.findByCategoria(filtro.getFilterCategotia()));
                    isFistSearch = false;
                }else {
                    return ResponseEntity.ok(notFound());
                }
            }else {
                for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                    String itemfiltro = itensFiltrados.get(i).getCategoria().trim().toLowerCase();
                    if (!filtro.getFilterCategotia().equals(itemfiltro)) {
                        itensFiltrados.remove(i);
                    }
                }
            }
        }

        //Filtro Data de Entrada
        if (filtro.getFilterDataEntr() != null) {
            int comparativo = Integer.parseInt(filtro.getComparaDataEntr());
            if (isFistSearch){
                if(comparativo == -1){
                    //Antes de...
                    if(itemRepository.existsByDataEntrBefore(filtro.getFilterDataEntr())){
                        itensFiltrados.addAll(itemRepository.findByDataEntrBefore(filtro.getFilterDataEntr()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else if(comparativo == 1){
                    //Depois de...
                    if(itemRepository.existsByDataEntrAfter(filtro.getFilterDataEntr())){
                        itensFiltrados.addAll(itemRepository.findByDataEntrAfter(filtro.getFilterDataEntr()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else{
                    //No dia!
                    LocalDate filtroData = filtro.getFilterDataEntr().toLocalDate();
                    LocalDateTime inicio = filtroData.atStartOfDay();
                    LocalDateTime fim = filtroData.atTime(23, 59, 59);
                    if(itemRepository.existsByDataEntrBetween(inicio, fim)){
                        itensFiltrados.addAll(itemRepository.findByDataEntrBetween(inicio, fim));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }
            }else {
                if (comparativo == -1){
                    //Antes de...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getDataEntr() == null) {
                            itensFiltrados.remove(i);
                            continue;
                        }
                        if (itensFiltrados.get(i).getDataEntr().isAfter(filtro.getFilterDataEntr())) {
                            itensFiltrados.remove(i);
                        }
                    }
                } else if (comparativo == 1) {
                    //Depois de...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getDataEntr() == null) {
                            itensFiltrados.remove(i);
                            continue;
                        }
                        if (itensFiltrados.get(i).getDataEntr().isBefore(filtro.getFilterDataEntr())) {
                            itensFiltrados.remove(i);
                        }
                    }
                }else {
                    //No dia!
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        LocalDate filtroData = filtro.getFilterDataEntr().toLocalDate();
                        LocalDateTime inicio = filtroData.atStartOfDay();
                        LocalDateTime fim = filtroData.atTime(23, 59, 59);
                        if ((itensFiltrados.get(i).getDataEntr() == null)) {
                            itensFiltrados.remove(i);
                            continue;
                        }
                        if(itensFiltrados.get(i).getDataEntr().isBefore(inicio) || itensFiltrados.get(i).getDataEntr().isAfter(fim)){
                            itensFiltrados.remove(i);
                        }
                    }
                }
            }
        }

        //Filtro Data de Validade
        if (filtro.getFilterDataValidade() != null) {
            int comparativo = Integer.parseInt(filtro.getComparaDataValid());
            System.out.println("StringComparativo: "+filtro.getComparaDataValid()+"\ncomparativo: " + comparativo);
            if (isFistSearch){
                if(comparativo == -1){
                    //Antes de...
                    if(itemRepository.existsByDataValidadeBefore(filtro.getFilterDataValidade())){
                        itensFiltrados.addAll(itemRepository.findByDataValidadeBefore(filtro.getFilterDataValidade()));
                        isFistSearch = false;
                        vizualizarLista(itensFiltrados);
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else if(comparativo == 1){
                    //Depois de...
                    if(itemRepository.existsByDataValidadeAfter(filtro.getFilterDataValidade())){
                        itensFiltrados.addAll(itemRepository.findByDataValidadeAfter(filtro.getFilterDataValidade()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else{
                    //No dia!
                    LocalDate filtroData = filtro.getFilterDataValidade().toLocalDate();
                    LocalDateTime inicio = filtroData.atStartOfDay();
                    LocalDateTime fim = filtroData.atTime(23, 59, 59);
                    if(itemRepository.existsByDataValidadeBetween(inicio, fim)){
                        itensFiltrados.addAll(itemRepository.findByDataValidadeBetween(inicio, fim));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }
            }else {
                if (comparativo == -1){
                    //Antes de...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getDataValidade() == null) {
                            itensFiltrados.remove(i);
                            continue;
                        }
                        if (itensFiltrados.get(i).getDataValidade().isAfter(filtro.getFilterDataValidade())) {
                            itensFiltrados.remove(i);
                        }
                    }
                } else if (comparativo == 1) {
                    //Depois de...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getDataValidade() == null) {
                            itensFiltrados.remove(i);
                            continue;
                        }
                        if (itensFiltrados.get(i).getDataValidade().isBefore(filtro.getFilterDataValidade())) {
                            itensFiltrados.remove(i);
                        }
                    }
                }else {
                    //No dia!
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        LocalDate filtroData = filtro.getFilterDataValidade().toLocalDate();
                        LocalDateTime inicio = filtroData.atStartOfDay();
                        LocalDateTime fim = filtroData.atTime(23, 59, 59);
                        if ((itensFiltrados.get(i).getDataValidade() == null)) {
                            itensFiltrados.remove(i);
                            continue;
                        }
                        if(itensFiltrados.get(i).getDataValidade().isBefore(inicio) || itensFiltrados.get(i).getDataValidade().isAfter(fim)){
                            itensFiltrados.remove(i);
                        }
                    }
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

    public void vizualizarLista(/*FiltroItem filtro, */List<Item> itensFiltrados/*, int index*/){
        int size = itensFiltrados.size();
        System.out.println("\nLista com "+size+" itens");
        /*System.out.println("Comparando: filtro = [" + filtro.getFilterDataEntr() + "] vs itensFiltrados = [" + itensFiltrados.get(index).getDataEntr() + "]");
        itensFiltrados.forEach(item -> {
            System.out.println("Item: "+item.getNomeItem()+". Marca: "+item.getDataEntr());
        });
        System.out.println("\nLista com "+size+" itens");
        System.out.println("\n");*/

        itensFiltrados.forEach(itensFiltrado -> {
            System.out.println("ID "+itensFiltrado.getIdItem()+" Nome "+itensFiltrado.getNomeItem()+" Data "+itensFiltrado.getDataValidade());
        });
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
