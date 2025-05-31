package com.litte_acai.de_litte_a_big_acai.controller.v2Test;

import com.litte_acai.de_litte_a_big_acai.model.v2Test.V2ImagemTeste;
import com.litte_acai.de_litte_a_big_acai.service.impl.V2Impl.V2ImagemTesteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(path = "/v2test")
public class V2ImagemTesteController {

    @Autowired
    V2ImagemTesteService v2ImagemTesteService;


    @PostMapping(path = "/v2imagem")
    //O nome do elemento MultipartFile, nesse caso "file", será o name do input do formulário HTML.
    private void v2testImagem(@RequestPart MultipartFile file,
                              @RequestPart String titulo,
                              @RequestPart String descricao
                              )throws IOException {

        if(!file.isEmpty()){
            //Para usar o MultipartFile.getBytes(), é necessário usar o throws IOException no cabeçalho da função ou procedimento
            byte[] imagemBytes = file.getBytes();
            V2ImagemTeste v2ImagemTeste = new V2ImagemTeste(imagemBytes, titulo, descricao);
            v2ImagemTesteService.v2savarImagem(v2ImagemTeste);
        }else {
            V2ImagemTeste v2ImagemTeste = new V2ImagemTeste(titulo, descricao);
            v2ImagemTesteService.v2savarImagem(v2ImagemTeste);
        }

    }

    @PostMapping(path = "/testeJson")
    private String testJson(@RequestBody String testJson){
        return testJson;
    }


}
