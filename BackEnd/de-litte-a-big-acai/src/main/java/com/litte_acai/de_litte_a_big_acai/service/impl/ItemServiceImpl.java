package com.litte_acai.de_litte_a_big_acai.service.impl;

import com.litte_acai.de_litte_a_big_acai.model.FiltroItem;
import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.repository.ItemRepository;
import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    ItemRepository itemRepository;

    @Override
    public ResponseEntity<?> buscarTodosDesc() {
        if (itemRepository.findAll().isEmpty()) {
            return ResponseEntity.ok(notFound());
        }else {
                return ResponseEntity.ok().body(itemRepository.findAllByOrderByIdItemDesc());
        }
    }

    @Override
    public ResponseEntity<?> adicionarItem(Item item){
        itemRepository.save(item);
        return ResponseEntity.ok().body(item);
    }
    @Override
    public ResponseEntity<?> buscarNomeOuID(String nomeOuID){
        String nomeOuIDLowcase =  nomeOuID.trim().toLowerCase();
        if (nomeOuIDLowcase.matches("\\d+")){
            if(itemRepository.existsByIdItem(Long.parseLong(nomeOuIDLowcase))){
                return ResponseEntity.ok().body(itemRepository.findByIdItem(Long.parseLong(nomeOuIDLowcase)));
            }else {
                return ResponseEntity.ok(notFound());
            }
        }else {
            if (itemRepository.existsByNomeItem(nomeOuIDLowcase)) {
                List<Item> itens = new ArrayList<>(itemRepository.findByNomeItem(nomeOuIDLowcase));
                itens.sort(Comparator.comparing(Item::getIdItem).reversed());
                return ResponseEntity.ok().body(itens);
            } else {
                return ResponseEntity.ok(notFound());
            }
        }
    }

    @Override
    public ResponseEntity<?> filtrarBusca(FiltroItem filtro){
        List<Item> itensFiltrados = new ArrayList<>();
        boolean isFistSearch = true;

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
            if (isFistSearch){
                if(comparativo == -1){
                    //Antes de...
                    if(itemRepository.existsByDataValidadeBefore(filtro.getFilterDataValidade())){
                        itensFiltrados.addAll(itemRepository.findByDataValidadeBefore(filtro.getFilterDataValidade()));
                        isFistSearch = false;
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

        //Filtro Preço por Unidade
        if (filtro.getFilterPrecoUni() != 0) {
            int comparativo = Integer.parseInt(filtro.getComparaPreco());
            if (isFistSearch){
                if(comparativo == -1){
                    //Menor que...
                    if(itemRepository.existsByPrecoUniIsLessThan(filtro.getFilterPrecoUni())){
                        itensFiltrados.addAll(itemRepository.findByPrecoUniIsLessThan(filtro.getFilterPrecoUni()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else if(comparativo == 1){
                    //Maior que...
                    if(itemRepository.existsByPrecoUniIsGreaterThan(filtro.getFilterPrecoUni())){
                        itensFiltrados.addAll(itemRepository.findByPrecoUniIsGreaterThan(filtro.getFilterPrecoUni()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else{
                    //Mesmo Valor!
                    if(itemRepository.existsByPrecoUni(filtro.getFilterPrecoUni())){
                        itensFiltrados.addAll(itemRepository.findByPrecoUni(filtro.getFilterPrecoUni()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }
            }else {
                if (comparativo == -1){
                    //Menor que...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getPrecoUni() > filtro.getFilterPrecoUni()) {
                            itensFiltrados.remove(i);
                        }
                    }
                } else if (comparativo == 1) {
                    //Maior que...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getPrecoUni() < filtro.getFilterPrecoUni()) {
                            itensFiltrados.remove(i);
                        }
                    }
                }else {
                    //Mesmo Valor!
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if(itensFiltrados.get(i).getPrecoUni() != filtro.getFilterPrecoUni()){
                            itensFiltrados.remove(i);
                        }
                    }
                }
            }
        }

        //Filtro Quantidade
        if (filtro.getFilterQuant() != 0) {
            int comparativo = Integer.parseInt(filtro.getComparaQuant());
            if (isFistSearch){
                if(comparativo == -1){
                    //Menor que...
                    if(itemRepository.existsByQuantIsLessThan(filtro.getFilterQuant())){
                        itensFiltrados.addAll(itemRepository.findByQuantIsLessThan(filtro.getFilterQuant()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else if(comparativo == 1){
                    //Maior que...
                    if(itemRepository.existsByQuantIsGreaterThan(filtro.getFilterQuant())){
                        itensFiltrados.addAll(itemRepository.findByQuantIsGreaterThan(filtro.getFilterQuant()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else{
                    //Mesmo Valor!
                    if(itemRepository.existsByQuant(filtro.getFilterQuant())){
                        itensFiltrados.addAll(itemRepository.findByQuant(filtro.getFilterQuant()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }
            }else {
                if (comparativo == -1){
                    //Menor que...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getQuant() > filtro.getFilterQuant()) {
                            itensFiltrados.remove(i);
                        }
                    }
                } else if (comparativo == 1) {
                    //Maior que...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getQuant() < filtro.getFilterQuant()) {
                            itensFiltrados.remove(i);
                        }
                    }
                }else {
                    //Mesmo Valor!
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if(itensFiltrados.get(i).getQuant() != filtro.getFilterQuant()){
                            itensFiltrados.remove(i);
                        }
                    }
                }
            }
        }

        //Filtro Valor Total
        if (filtro.getFilterValorTotal() != 0) {
            int comparativo = Integer.parseInt(filtro.getComparaValortotal());
            if (isFistSearch){
                itensFiltrados.addAll(itemRepository.findAll());
                if(comparativo == -1){
                    //Menor que...
                    if(!itensFiltrados.isEmpty()){
                        itensFiltrados.removeIf(item ->
                            item.getPrecoUni() * item.getQuant() > filtro.getFilterValorTotal()
                        );
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else if(comparativo == 1){
                    //Maior que...
                    if(!itensFiltrados.isEmpty()){
                        itensFiltrados.removeIf(item ->
                                item.getPrecoUni() * item.getQuant() < filtro.getFilterValorTotal()
                        );
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else{
                    //Mesmo Valor!
                    if(!itensFiltrados.isEmpty()){
                        itensFiltrados.forEach(item->{
                            System.out.println("Total: "+item.getPrecoUni() * item.getQuant()+" Filtro: "+ filtro.getFilterValorTotal());
                        });
                        itensFiltrados.removeIf(item -> {
                            BigDecimal preco = BigDecimal.valueOf(item.getPrecoUni());
                            BigDecimal quant = BigDecimal.valueOf(item.getQuant());
                            BigDecimal valorTotal = preco.multiply(quant).setScale(2, RoundingMode.HALF_UP);

                            return valorTotal.compareTo(BigDecimal.valueOf(filtro.getFilterValorTotal())) != 0;
                        });
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }
            }else {
                if (comparativo == -1){
                    //Menor que...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if ((itensFiltrados.get(i).getPrecoUni() * itensFiltrados.get(i).getQuant()) > filtro.getFilterValorTotal()) {
                            itensFiltrados.remove(i);
                        }
                    }
                } else if (comparativo == 1) {
                    //Maior que...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if ((itensFiltrados.get(i).getPrecoUni() * itensFiltrados.get(i).getQuant()) < filtro.getFilterValorTotal()) {
                            itensFiltrados.remove(i);
                        }
                    }
                }else {
                    //Mesmo Valor!
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if((itensFiltrados.get(i).getPrecoUni() * itensFiltrados.get(i).getQuant()) != filtro.getFilterValorTotal()){
                            itensFiltrados.remove(i);
                        }
                    }
                }
            }
        }

        //Filtro Volume por Unidade e Unidade de Medida
        if (filtro.getFilterVol() != 0 && !filtro.getFilterUnidMedida().equals("")) {
            int comparativo = Integer.parseInt(filtro.getComparaVol());
            if (isFistSearch){
                if(comparativo == -1){
                    //Menor que...
                    if(itemRepository.existsByVolumeUniIsLessThanAndUnidMedida(filtro.getFilterVol(),filtro.getFilterUnidMedida())){
                        itensFiltrados.addAll(itemRepository.findByVolumeUniIsLessThanAndUnidMedida(filtro.getFilterVol(),filtro.getFilterUnidMedida()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else if(comparativo == 1){
                    //Maior que...
                    if(itemRepository.existsByVolumeUniIsGreaterThanAndUnidMedida(filtro.getFilterVol(),filtro.getFilterUnidMedida())){
                        itensFiltrados.addAll(itemRepository.findByVolumeUniIsGreaterThanAndUnidMedida(filtro.getFilterVol(),filtro.getFilterUnidMedida()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else{
                    //Mesmo Valor!
                    if(itemRepository.existsByVolumeUniAndUnidMedida(filtro.getFilterVol(),filtro.getFilterUnidMedida())){
                        itensFiltrados.addAll(itemRepository.findByVolumeUniAndUnidMedida(filtro.getFilterVol(),filtro.getFilterUnidMedida()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }
            }else {
                if (comparativo == -1){
                    //Menor que...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getVolumeUni() > filtro.getFilterVol()) {
                            itensFiltrados.remove(i);
                            continue;
                        }
                        if (!itensFiltrados.get(i).getUnidMedida().equals(filtro.getFilterUnidMedida())) {
                            itensFiltrados.remove(i);
                        }
                    }
                } else if (comparativo == 1) {
                    //Maior que...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getVolumeUni() < filtro.getFilterVol()) {
                            itensFiltrados.remove(i);
                            continue;
                        }
                        if (!itensFiltrados.get(i).getUnidMedida().equals(filtro.getFilterUnidMedida())) {
                            itensFiltrados.remove(i);
                        }
                    }
                }else {
                    //Mesmo Valor!
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getVolumeUni() != filtro.getFilterVol()) {
                            itensFiltrados.remove(i);
                            continue;
                        }
                        if (!itensFiltrados.get(i).getUnidMedida().equals(filtro.getFilterUnidMedida())) {
                            itensFiltrados.remove(i);
                        }
                    }
                }
            }
        }

        //Filtro Lote
        if(filtro.getFilterLote() != null && !filtro.getFilterLote().isEmpty() && !filtro.getFilterLote().isBlank()){
            if (isFistSearch){
                if(itemRepository.existsByLote(filtro.getFilterLote()) ){
                    itensFiltrados.addAll(itemRepository.findByLote(filtro.getFilterLote()));
                    isFistSearch = false;
                }else {
                    return ResponseEntity.ok(notFound());
                }
            }else {
                for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                    String itemfiltro = itensFiltrados.get(i).getLote().trim().toLowerCase();
                    if (!filtro.getFilterLote().equals(itemfiltro)) {
                        itensFiltrados.remove(i);
                    }
                }
            }
        }

        //Filtro Endereço de Armazenamento
        if(filtro.getFilterEnderecoArmazen() != null && !filtro.getFilterEnderecoArmazen().isEmpty() && !filtro.getFilterEnderecoArmazen().isBlank()){
            if (isFistSearch){
                if(itemRepository.existsByEnderecoArmazen(filtro.getFilterEnderecoArmazen()) ){
                    itensFiltrados.addAll(itemRepository.findByEnderecoArmazen(filtro.getFilterEnderecoArmazen()));
                    isFistSearch = false;
                }else {
                    return ResponseEntity.ok(notFound());
                }
            }else {
                for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                    String itemfiltro = itensFiltrados.get(i).getEnderecoArmazen().trim().toLowerCase();
                    if (!filtro.getFilterEnderecoArmazen().equals(itemfiltro)) {
                        itensFiltrados.remove(i);
                    }
                }
            }
        }

        //Filtro Data de Saída
        if (filtro.getFilterDataSaid() != null) {
            int comparativo = Integer.parseInt(filtro.getComparaDataSaid());
            if (isFistSearch){
                if(comparativo == -1){
                    //Antes de...
                    if(itemRepository.existsByDataSaidBefore(filtro.getFilterDataSaid())){
                        itensFiltrados.addAll(itemRepository.findByDataSaidBefore(filtro.getFilterDataSaid()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else if(comparativo == 1){
                    //Depois de...
                    if(itemRepository.existsByDataSaidAfter(filtro.getFilterDataSaid())){
                        itensFiltrados.addAll(itemRepository.findByDataSaidAfter(filtro.getFilterDataSaid()));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }else{
                    //No dia!
                    LocalDate filtroData = filtro.getFilterDataSaid().toLocalDate();
                    LocalDateTime inicio = filtroData.atStartOfDay();
                    LocalDateTime fim = filtroData.atTime(23, 59, 59);
                    if(itemRepository.existsByDataSaidBetween(inicio, fim)){
                        itensFiltrados.addAll(itemRepository.findByDataSaidBetween(inicio, fim));
                        isFistSearch = false;
                    }else {
                        return ResponseEntity.ok(notFound());
                    }
                }
            }else {
                if (comparativo == -1){
                    //Antes de...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getDataSaid() == null) {
                            itensFiltrados.remove(i);
                            continue;
                        }
                        if (itensFiltrados.get(i).getDataSaid().isAfter(filtro.getFilterDataSaid())) {
                            itensFiltrados.remove(i);
                        }
                    }
                } else if (comparativo == 1) {
                    //Depois de...
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        if (itensFiltrados.get(i).getDataSaid() == null) {
                            itensFiltrados.remove(i);
                            continue;
                        }
                        if (itensFiltrados.get(i).getDataSaid().isBefore(filtro.getFilterDataSaid())) {
                            itensFiltrados.remove(i);
                        }
                    }
                }else {
                    //No dia!
                    for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                        LocalDate filtroData = filtro.getFilterDataSaid().toLocalDate();
                        LocalDateTime inicio = filtroData.atStartOfDay();
                        LocalDateTime fim = filtroData.atTime(23, 59, 59);
                        if ((itensFiltrados.get(i).getDataSaid() == null)) {
                            itensFiltrados.remove(i);
                            continue;
                        }
                        if(itensFiltrados.get(i).getDataSaid().isBefore(inicio) || itensFiltrados.get(i).getDataSaid().isAfter(fim)){
                            itensFiltrados.remove(i);
                        }
                    }
                }
            }
        }

        //Filtro Motivo da Saída
        if (filtro.getFilterMotivoSaida() != null && !filtro.getFilterMotivoSaida().isEmpty() && !filtro.getFilterMotivoSaida().isBlank()) {
            if (isFistSearch){
                if(itemRepository.existsByMotivoSaida(filtro.getFilterMotivoSaida())){
                    itensFiltrados.addAll(itemRepository.findByMotivoSaida(filtro.getFilterMotivoSaida()));
                    isFistSearch = false;
                }else {
                    return ResponseEntity.ok(notFound());
                }
            }else {
                for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                    String itemfiltro = itensFiltrados.get(i).getMotivoSaida().trim().toLowerCase();
                    if (!filtro.getFilterMotivoSaida().equals(itemfiltro)) {
                        itensFiltrados.remove(i);
                    }
                }
            }
        }

        //Filtro Em Estoque
        if(filtro.isFilterEmEstoque()){
            for (int i = itensFiltrados.size() - 1; i >= 0; i--) {
                if (!itensFiltrados.get(i).isEmEstoque()) {
                    itensFiltrados.remove(i);
                }
            }
        }

        if(itensFiltrados.size() == 0){
            return ResponseEntity.ok().body(notFound());
        }else {
            itensFiltrados.sort(Comparator.comparing(Item::getIdItem).reversed());
            return ResponseEntity.ok().body(itensFiltrados);
        }
    }

    private Map<String, Object> notFound(){
        Map<String, Object> resposta = new HashMap<>();
        resposta.put("mensagem", "Oops! Não encontramos nada com essas caracteristicas");
        resposta.put("listaVazia", Collections.emptyList());

        return resposta;
    }
}
