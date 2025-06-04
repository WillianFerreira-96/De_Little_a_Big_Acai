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
    public List<Item> getAll() {
        return itemRepository.findAll();
    }

    @Override
    public Item addItem(Item item){
        itemRepository.save(item);
        return item;
    }
}
