package com.litte_acai.de_litte_a_big_acai.service.impl;

import com.litte_acai.de_litte_a_big_acai.model.ImagemTeste;
import com.litte_acai.de_litte_a_big_acai.repository.ImagemTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImagemTesteService {

    @Autowired
    private ImagemTestRepository imagemTestRepository;

    public void savarImagem(byte[] imagemBytes) {
        ImagemTeste imagemTeste = new ImagemTeste(imagemBytes);
        imagemTestRepository.save(imagemTeste);

    }
}
