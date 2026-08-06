package com.dks.backend.controller;

import com.dks.backend.entity.Tamanho;
import com.dks.backend.repository.TamanhoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tamanhos")
@CrossOrigin(origins = "*")
public class TamanhoController {

    private final TamanhoRepository tamanhoRepository;

    public TamanhoController(TamanhoRepository tamanhoRepository) {
        this.tamanhoRepository = tamanhoRepository;
    }

    @GetMapping
    public List<Tamanho> listarTodos() {
        return tamanhoRepository.findAll();
    }
}