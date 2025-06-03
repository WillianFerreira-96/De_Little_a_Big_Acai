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
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

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
                        Integer quant,
                        Double volumeUni,
                        String unidMedida,
                        LocalDate dataValidadeLocalDate,
                        String lote,
                        String enderecoArmazen)throws IOException{

        byte[] imagemItemBytes = imagemItem.getBytes();

        Item item = new Item();
        item.setImagemItem(imagemItemBytes);
        item.setNomeItem(nomeItem);
        item.setMarca(marca);
        item.setDescricaoItem(descricaoItem);
        item.setCategoria(categoria);
        item.setUnidMedida(unidMedida);
        item.setLote(lote);
        item.setEnderecoArmazen(enderecoArmazen);

        if (precoUni != null) {
            item.setPrecoUni(Double.valueOf(precoUni));
        }

        if(quant != null){
            item.setQuant(Integer.valueOf(quant));
        }

        if(volumeUni != null){
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
