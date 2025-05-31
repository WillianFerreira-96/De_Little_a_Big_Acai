package com.litte_acai.de_litte_a_big_acai.controller;

import com.litte_acai.de_litte_a_big_acai.model.ImagemTeste;
import com.litte_acai.de_litte_a_big_acai.repository.ImagemTestRepository;
import com.litte_acai.de_litte_a_big_acai.service.impl.ImagemTesteService;
import jakarta.annotation.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(path = "/test")
public class ImagemTesteController {

    @Autowired
    ImagemTesteService imagemService;


    @PostMapping(path = "/imagem")
    private void testImagem(@RequestBody MultipartFile file)throws IOException {
        try{
            if(file.isEmpty()){
               throw new Exception("Arquivo Vazio!");
            }else {
                byte[] imagemBytes = file.getBytes();
                imagemService.savarImagem(imagemBytes);
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }


    }
}
