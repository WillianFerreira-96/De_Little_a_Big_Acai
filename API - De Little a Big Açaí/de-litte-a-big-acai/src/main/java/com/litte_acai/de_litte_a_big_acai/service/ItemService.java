package com.litte_acai.de_litte_a_big_acai.service;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface ItemService {
    public Item addItem(Item item);

    List<Item>getAll();
}
