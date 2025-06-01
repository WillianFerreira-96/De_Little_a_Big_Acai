package com.litte_acai.de_litte_a_big_acai.service;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.crypto.Data;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

public interface ItemService {
    public void addItem(MultipartFile imagemItem,
                        String nomeItem,
                        String marca,
                        String descricaoItem,
                        String categoria,
                        String precoUni,
                        String quant,
                        String volumeUni,
                        String unidMedida,
                        Date dataValidade)throws IOException;
    /*
    void adicionarItem (MultipartFile imagemItem,
                        String nomeItem,
                        String marca,
                        String descricaoItem,
                        String categoria,
                        double precoUni,
                        int quant,
                        double volumeUni,
                        String unidMedida,
                        String lote,
                        String enderecoArmazen) throws IOException;
    */
    List<Item>getAll();


}
