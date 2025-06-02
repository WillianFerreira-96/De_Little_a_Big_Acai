package com.litte_acai.de_litte_a_big_acai.service;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ItemService {
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
                        String enderecoArmazen)throws IOException;

    List<String>getAll();
}
