package com.litte_acai.de_litte_a_big_acai.repository;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    boolean existsByNomeItem(String nomeItem);
    boolean existsByIdItem(long idItem);
    List<Item> findByIdItem(long itemId);
    List<Item> findByNomeItem(String nomeItem);
}
