package com.litte_acai.de_litte_a_big_acai.service.impl;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.repository.ItemRepository;
import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    private StringHttpMessageConverter stringHttpMessageConverter;

    @Override
    public List<String> getAll() {
        List<String> nomes = new ArrayList<>();
        itemRepository.findAll().forEach(item -> {
            nomes.add(item.getNomeItem());
        });

        return nomes;
    }

    @Override
    public Item addItem(MultipartFile imagemItem,
                        String nomeItem,
                        String marca,
                        String descricaoItem,
                        String categoria,
                        Double precoUni,
                        Double quant,
                        Double volumeUni,
                        String unidMedida,
                        LocalDate dataValidadeLocalDate,
                        String lote,
                        String enderecoArmazen)throws IOException{

        Item item = new Item();
            item.setImagemItem(imagemItem.getBytes());
            item.setNomeItem(nomeItem.trim().toLowerCase());
            item.setMarca(marca.trim().toLowerCase());
            item.setDescricaoItem(descricaoItem.trim().toLowerCase());
            item.setCategoria(categoria.trim().toLowerCase());
            item.setUnidMedida(unidMedida.trim().toLowerCase());
            item.setLote(lote.trim().toLowerCase());
            item.setEnderecoArmazen(enderecoArmazen.trim().toLowerCase());

            if (precoUni != null && precoUni instanceof Double) {
                item.setPrecoUni(Double.valueOf(precoUni));
            }

            if(quant != null && quant instanceof Double){
                item.setQuant(quant.intValue());
            }

            if(volumeUni != null && volumeUni instanceof Double) {
                item.setVolumeUni(Double.valueOf(volumeUni));
            }

            if(dataValidadeLocalDate != null) {
                Date dataValidade = Date.valueOf(dataValidadeLocalDate);
                item.setDataValidade(dataValidade);
            }

        itemRepository.save(item);
        return item;
    }
}
