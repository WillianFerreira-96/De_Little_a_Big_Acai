package com.litte_acai.de_litte_a_big_acai.repository;

import com.litte_acai.de_litte_a_big_acai.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    boolean existsByIdItem(long idItem);
    boolean existsByNomeItem(String nomeItem);
    boolean existsByMarca(String Marca);
    boolean existsByCategoria(String Categotia);
    boolean existsByDataEntrBefore(LocalDateTime dataEntrBefore);
    boolean existsByDataEntrAfter(LocalDateTime filterDataEntr);
    boolean existsByDataEntrBetween(LocalDateTime inicio, LocalDateTime fim);
    boolean existsByDataValidadeBefore(LocalDateTime filterDataValidade);
    boolean existsByDataValidadeAfter(LocalDateTime filterDataValidade);
    boolean existsByDataValidadeBetween(LocalDateTime inicio, LocalDateTime fim);

    List<Item> findByIdItem(long itemId);
    List<Item> findByNomeItem(String nomeItem);
    List<Item> findByMarca(String marca);
    List<Item> findByCategoria(String categoria);
    List<Item> findByDataEntrBefore(LocalDateTime dataEntrBefore);
    List<Item> findByDataEntrAfter(LocalDateTime filterDataEntr);
    List<Item> findByDataEntrBetween(LocalDateTime inicio, LocalDateTime fim);
    List<Item> findByDataValidadeBefore(LocalDateTime filterDataValidade);
    List<Item> findByDataValidadeAfter(LocalDateTime filterDataValidade);
    List<Item> findByDataValidadeBetween(LocalDateTime inicio, LocalDateTime fim);


}
