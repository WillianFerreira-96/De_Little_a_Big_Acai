package com.litte_acai.de_litte_a_big_acai.service.impl;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.repository.ItemRepository;
import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    ItemRepository itemRepository;

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
                        String precoUni,
                        String quant,
                        String volumeUni,
                        String unidMedida,
                        String dataValidade,
                        String lote,
                        String enderecoArmazen)throws IOException{

        byte[] imagemItemBytes = imagemItem.getBytes();

        Item item = new Item();
        item.setImagemItem(imagemItemBytes);
        item.setNomeItem(nomeItem);
        item.setMarca(marca);
        item.setDescricaoItem(descricaoItem);
        item.setCategoria(categoria);
        item.setPrecoUni(Double.valueOf(precoUni));
        item.setQuant(Integer.valueOf(quant));
        item.setVolumeUni(Double.valueOf(volumeUni));
        item.setUnidMedida(unidMedida);
        item.setDataValidade(Date.valueOf(dataValidade));
        item.setLote(lote);
        item.setEnderecoArmazen(enderecoArmazen);

        itemRepository.save(item);
        return item;
    }
}
