package com.litte_acai.de_litte_a_big_acai.service.impl.V2Impl;

import com.litte_acai.de_litte_a_big_acai.model.ImagemTeste;
import com.litte_acai.de_litte_a_big_acai.model.v2Test.V2ImagemTeste;
import com.litte_acai.de_litte_a_big_acai.repository.ImagemTestRepository;
import com.litte_acai.de_litte_a_big_acai.repository.v2Test.V2ImagemTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class V2ImagemTesteService {

    @Autowired
    private V2ImagemTestRepository v2imagemTestRepository;

    public void v2savarImagem(V2ImagemTeste v2ImagemTeste){
        v2imagemTestRepository.save(v2ImagemTeste);

    }
}
