package com.litte_acai.de_litte_a_big_acai.service;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    void adicionarItem (Item item, byte[] imagemBytes);
    List<Item>getAll();
}
