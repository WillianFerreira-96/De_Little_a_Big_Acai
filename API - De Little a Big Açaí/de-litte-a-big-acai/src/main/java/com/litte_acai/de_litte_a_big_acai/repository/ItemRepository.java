package com.litte_acai.de_litte_a_big_acai.repository;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Item findByNomeItem(String nomeItem);
}
