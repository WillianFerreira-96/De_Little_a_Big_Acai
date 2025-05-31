package com.litte_acai.de_litte_a_big_acai;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import com.litte_acai.de_litte_a_big_acai.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class TestRepository implements CommandLineRunner {
    @Autowired
    ItemRepository itemRepository;

    @Override
    public void run(String... args) throws Exception {
        /*

            System.out.println(item.getNomeItem());
            System.out.println(item.getPrecoUni());
            System.out.println(item.getQuant());
            System.out.println(item.getVolumeUni());
            System.out.println(item.getUnidMedida());

         */


    }


}
