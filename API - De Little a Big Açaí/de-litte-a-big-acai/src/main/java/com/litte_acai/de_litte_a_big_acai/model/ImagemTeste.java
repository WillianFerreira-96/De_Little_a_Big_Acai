package com.litte_acai.de_litte_a_big_acai.model;

import jakarta.persistence.*;

@Entity
@Table(name = "imagenstest")
public class ImagemTeste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] imagem;

    public ImagemTeste() {
    }

    public ImagemTeste(byte[] imagem) {
        this.imagem = imagem;
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
}
