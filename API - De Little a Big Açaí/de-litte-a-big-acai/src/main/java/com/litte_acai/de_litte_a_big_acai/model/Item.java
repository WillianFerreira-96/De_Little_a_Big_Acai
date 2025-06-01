package com.litte_acai.de_litte_a_big_acai.model;

import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;


@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item")
    private long idItem;
    @Lob
    @Column(name = "imagemItem", columnDefinition = "MEDIUMBLOB")
    private byte[] imagemItem;
    @Column(name = "nome_item", length = 50, nullable = true)
    private String nomeItem;
    @Column(length = 50)
    private String marca;
    @Column(name = "descricao_item", length = 300)
    private String descricaoItem;
    @Column(length = 50)
    private String categoria;
    @Column(name = "preco_uni")
    private double precoUni;
    @Column(nullable = true)
    private int quant;
    @Column(name = "volume_uni")
    private double volumeUni;
    @Column(name = "unid_medida", length = 20)
    private String unidMedida;
    @Column(name = "data_validade")
    private Date dataValidade;
    @Column(length = 50)
    private String lote;
    @Column(name = "endereco_armazen", length = 100)
    private String enderecoArmazen;
    @Column(name = "data_entr", nullable = true)
    private Date dataEntr;
    @Column(name = "data_said")
    private Date dataSaid;
    @Column(name = "motivo_saida", length = 30, nullable = true)
    private String motivoSaida;

    public Item() {
    }

/*
    public Item(byte[] imagemItem, String nomeItem, String marca, String descricaoItem, String categoria, Double precoUni) {
        this.imagemItem = imagemItem;
        this.nomeItem = nomeItem;
        this.marca = marca;
        this.descricaoItem = descricaoItem;
        this.categoria = categoria;
        this.precoUni = precoUni;
        //this.quant = quant;
    }

    public Item(String nomeItem,
                String marca,
                String descricaoItem,
                String categoria,
                double precoUni,
                int quant,
                double volumeUni,
                String unidMedida,
                String lote,
                String enderecoArmazen) {
        this.nomeItem = nomeItem;
        this.marca = marca;
        this.descricaoItem = descricaoItem;
        this.categoria = categoria;
        this.precoUni = precoUni;
        this.quant = quant;
        this.volumeUni = volumeUni;
        this.unidMedida = unidMedida;
        this.lote = lote;
        this.enderecoArmazen = enderecoArmazen;
    }

    public Item(byte[]imagemItem,
                String nomeItem,
                String marca,
                String descricaoItem,
                String categoria,
                double precoUni,
                int quant,
                double volumeUni,
                String unidMedida,
                String lote,
                String enderecoArmazen) {
        this.imagemItem = imagemItem;
        this.nomeItem = nomeItem;
        this.marca = marca;
        this.descricaoItem = descricaoItem;
        this.categoria = categoria;
        this.precoUni = precoUni;
        this.quant = quant;
        this.volumeUni = volumeUni;
        this.unidMedida = unidMedida;
        this.lote = lote;
        this.enderecoArmazen = enderecoArmazen;
    }
    */

    public long getIdItem() {
        return idItem;
    }

    public void setIdItem(long idItem) {
        this.idItem = idItem;
    }

    public byte[] getImagemItem() {
        return imagemItem;
    }

    public void setImagemItem(byte[] imagemItem) {
        this.imagemItem = imagemItem;
    }

    public String getNomeItem() {
        return nomeItem;
    }

    public void setNomeItem(String nomeItem) {
        this.nomeItem = nomeItem;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getDescricaoItem() {
        return descricaoItem;
    }

    public void setDescricaoItem(String descricaoItem) {
        this.descricaoItem = descricaoItem;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public double getPrecoUni() {
        return precoUni;
    }

    public void setPrecoUni(double precoUni) {
        this.precoUni = precoUni;
    }

    public int getQuant() {
        return quant;
    }

    public void setQuant(int quant) {
        this.quant = quant;
    }

    public double getVolumeUni() {
        return volumeUni;
    }

    public void setVolumeUni(double volumeUni) {
        this.volumeUni = volumeUni;
    }

    public String getUnidMedida() {
        return unidMedida;
    }

    public void setUnidMedida(String unidMedida) {
        this.unidMedida = unidMedida;
    }

    public Date getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(Date dataValidade) {
        this.dataValidade = dataValidade;
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public String getEnderecoArmazen() {
        return enderecoArmazen;
    }

    public void setEnderecoArmazen(String enderecoArmazen) {
        this.enderecoArmazen = enderecoArmazen;
    }

    public Date getDataEntr() {
        return dataEntr;
    }

    public void setDataEntr(Date dataEntr) {
        this.dataEntr = dataEntr;
    }

    public Date getDataSaid() {
        return dataSaid;
    }

    public void setDataSaid(Date dataSaid) {
        this.dataSaid = dataSaid;
    }

    public String getMotivoSaida() {
        return motivoSaida;
    }

    public void setMotivoSaida(String motivoSaida) {
        this.motivoSaida = motivoSaida;
    }
}
