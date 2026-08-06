package com.dks.backend.controller;

import com.dks.backend.dto.ProdutoRequestDTO;
import com.dks.backend.dto.ProdutoResponseDTO;
import com.dks.backend.service.ProdutoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "*")
@Tag(
        name = "Produtos",
        description = "Gerenciamento de Produtos"
)
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @Operation(summary = "Listar todos os produtos")
    @GetMapping
    public List<ProdutoResponseDTO> listarTodos() {
        return produtoService.listarTodos();
    }

    @Operation(summary = "Buscar produto por ID")
    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> buscarPorId(
            @PathVariable Long id) {

        return produtoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Cadastrar um novo produto")
    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> salvar(
            @RequestBody ProdutoRequestDTO dto) {

        return ResponseEntity.ok(
                produtoService.salvar(dto)
        );
    }

    @Operation(summary = "Atualizar um produto")
    @PutMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> atualizar(
            @PathVariable Long id,
            @RequestBody ProdutoRequestDTO dto) {

        if (produtoService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                produtoService.atualizar(id, dto)
        );
    }

    @Operation(summary = "Excluir um produto")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        if (produtoService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        produtoService.excluir(id);

        return ResponseEntity.noContent().build();
    }
}