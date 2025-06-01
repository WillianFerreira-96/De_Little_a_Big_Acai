package com.litte_acai.de_litte_a_big_acai.service.impl;

import com.litte_acai.de_litte_a_big_acai.TestRepository;
import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.repository.ItemRepository;
import com.litte_acai.de_litte_a_big_acai.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.crypto.Data;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    ItemRepository itemRepository;

    @Override
    public List<Item> getAll() {
        return itemRepository.findAll();
    }

    @Override
    public void addItem(MultipartFile imagemItem,
                        String nomeItem,
                        String marca,
                        String descricaoItem,
                        String categoria,
                        String precoUni,
                        String quant,
                        String volumeUni,
                        String unidMedida,
                        Date dataValidade)throws IOException{

        byte[] imagemItemBytes = imagemItem.getBytes();

        Item item = new Item();
        item.setImagemItem(imagemItemBytes);
        item.setNomeItem(marca);
        item.setDescricaoItem(descricaoItem);
        item.setCategoria(categoria);
        item.setPrecoUni(Double.valueOf(precoUni));
        item.setQuant(Integer.valueOf(quant));
        item.setVolumeUni(Double.valueOf(volumeUni));
        item.setUnidMedida(unidMedida);
        item.setDataValidade(dataValidade);

        itemRepository.save(item);
    }
    /*
    public void adicionarItem(MultipartFile imagemItem,
                              String nomeItem,
                              String marca,
                              String descricaoItem,
                              String categoria,
                              double precoUni,
                              int quant,
                              double volumeUni,
                              String unidMedida,
                              String lote,
                              String enderecoArmazen) throws IOException {

        byte[] imagemItemBytes = imagemItem.getBytes();
        if(!imagemItem.isEmpty()){
            Item item = new Item(
                //Com Imagem
                imagemItemBytes,
                nomeItem,
                marca,
                descricaoItem,
                categoria,
                precoUni,
                quant,
                volumeUni,
                unidMedida,
                lote,
                enderecoArmazen
            );
            itemRepository.save(item);
        }else {
            Item item = new Item(
                    //Sem imagem
                    nomeItem,
                    marca,
                    descricaoItem,
                    categoria,
                    precoUni,
                    quant,
                    volumeUni,
                    unidMedida,
                    lote,
                    enderecoArmazen
            );
            itemRepository.save(item);
        }
    }*/

}
