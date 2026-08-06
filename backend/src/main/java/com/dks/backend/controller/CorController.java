package com.dks.backend.controller;

import com.dks.backend.entity.Cor;
import com.dks.backend.repository.CorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cores")
@CrossOrigin(origins = "*")
public class CorController {

    private final CorRepository corRepository;

    public CorController(CorRepository corRepository) {
        this.corRepository = corRepository;
    }

    @GetMapping
    public List<Cor> listarTodas() {
        return corRepository.findAll();
    }
}