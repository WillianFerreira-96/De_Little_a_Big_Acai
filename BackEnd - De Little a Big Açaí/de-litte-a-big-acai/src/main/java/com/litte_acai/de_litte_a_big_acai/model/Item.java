package com.litte_acai.de_litte_a_big_acai.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item")
    private long idItem;
    @Lob
    @Column(name = "imagemItem", columnDefinition = "LONGBLOB")
    private byte[] imagemItem;
    @Column(name = "nome_item", length = 50, nullable = false)
    private String nomeItem;
    @Column(length = 50, nullable = false)
    private String marca;
    @Column(name = "descricao_item", length = 300, nullable = false)
    private String descricaoItem;
    @Column(length = 50, nullable = false)
    private String categoria;
    @Column(name = "preco_uni", nullable = false)
    private double precoUni;
    @Column(nullable = false)
    private int quant;
    @Column(name = "volume_uni", nullable = false)
    private double volumeUni;
    @Column(name = "unid_medida", length = 20, nullable = false)
    private String unidMedida;
    @Column(name = "data_validade", nullable = true)
    private LocalDateTime  dataValidade;
    @Column(length = 50, nullable = false)
    private String lote;
    @Column(name = "endereco_armazen", length = 100, nullable = false)
    private String enderecoArmazen;
    @Column(name = "data_entr", nullable = true)
    private LocalDateTime  dataEntr;
    @Column(name = "data_said", nullable = true)
    private LocalDateTime  dataSaid;
    @Column(name = "motivo_saida", length = 30, nullable = false)
    private String motivoSaida;
    @Column(length = 30, nullable = false)
    private Boolean emEstoque;

    public Item() {
        imagemItem = new byte[0];
        nomeItem = "";
        marca = "";
        descricaoItem = "";
        categoria = "";
        precoUni = 0.0;
        quant = 0;
        volumeUni = 0;
        unidMedida = "";
        dataValidade = null;
        lote = "";
        enderecoArmazen = "";
        dataEntr = LocalDateTime.now();
        dataSaid = null;
        motivoSaida = "";
        emEstoque = true;
    }

    public long getIdItem() {
        return idItem;
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
        if (nomeItem != null && !nomeItem.isEmpty()) {
            this.nomeItem = nomeItem.trim().toLowerCase();
        }
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        if (marca != null && !marca.isEmpty()) {
            this.marca = marca.trim().toLowerCase();
        }        ;
    }

    public String getDescricaoItem() {
        return descricaoItem;
    }

    public void setDescricaoItem(String descricaoItem) {
        if (descricaoItem != null && !descricaoItem.isEmpty()) {
            this.descricaoItem = descricaoItem.trim().toLowerCase();
        }
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        if (categoria != null && !categoria.isEmpty()) {
            this.categoria = categoria.trim().toLowerCase();
        }
    }

    public double getPrecoUni() {
        return precoUni;
    }

    public void setPrecoUni(Double precoUni) {
        if (precoUni != null && precoUni instanceof Double) {
            this.precoUni = Double.valueOf(precoUni);
        }
    }

    public int getQuant() {
        return quant;
    }

    public void setQuant(Double quant) {
        if (quant != null && quant instanceof Double) {
            this.quant = quant.intValue();
        }
    }

    public double getVolumeUni() {
        return volumeUni;
    }

    public void setVolumeUni(Double volumeUni) {
        if (volumeUni != null && volumeUni instanceof Double) {
            this.volumeUni = Double.valueOf(volumeUni);
        }
    }

    public String getUnidMedida() {
        return unidMedida;
    }

    public void setUnidMedida(String unidMedida) {
        if (unidMedida != null && !unidMedida.isEmpty()) {
            this.unidMedida = unidMedida.trim().toLowerCase();
        }
    }

    public LocalDateTime  getDataValidade() {
        return dataValidade;
    }

    public void setDataValidade(LocalDate dataValidade) {
        if (dataValidade != null) {
            LocalTime currentTime = LocalTime.now();
            this.dataValidade = dataValidade.atTime(currentTime);
        }
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        if (lote != null && !lote.isEmpty()) {
            this.lote = lote.trim().toLowerCase();
        }
    }

    public String getEnderecoArmazen() {
        return enderecoArmazen;
    }

    public void setEnderecoArmazen(String enderecoArmazen) {
        if (enderecoArmazen != null && !enderecoArmazen.isEmpty()) {
            this.enderecoArmazen = enderecoArmazen.trim().toLowerCase();
        }
    }

    public LocalDateTime  getDataEntr() {
        return dataEntr;
    }

    public LocalDateTime  getDataSaid() {
        return dataSaid;
    }

    public void setDataSaid(LocalDateTime  dataSaid) {
        this.dataSaid = dataSaid;
    }

    public String getMotivoSaida() {
        return motivoSaida;
    }

    public void setMotivoSaida(String motivoSaida) {
        this.motivoSaida = motivoSaida;
    }

    public Boolean isEmEstoque() {
        return emEstoque;
    }

    public void setEmEstoque(Boolean emEstoque) {
        this.emEstoque = emEstoque;
    }
}
