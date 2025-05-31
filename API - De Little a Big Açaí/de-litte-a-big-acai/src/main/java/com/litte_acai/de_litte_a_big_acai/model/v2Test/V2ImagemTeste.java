package com.litte_acai.de_litte_a_big_acai.model.v2Test;

import jakarta.persistence.*;

@Entity
@Table(name = "v2imagenstest")
public class V2ImagemTeste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] imagem;
    private String titulo;
    private String descricao;

    public V2ImagemTeste() {
    }

    public V2ImagemTeste(String titulo, String descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
    }

    public V2ImagemTeste(byte[] imagem, String titulo, String descricao) {
        this.imagem = imagem;
        this.titulo = titulo;
        this.descricao = descricao;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public byte[] getImagem() {
        return imagem;
    }

    public void setImagem(byte[] imagem) {
        this.imagem = imagem;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
