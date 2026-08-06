package com.dks.backend.service;

import com.dks.backend.dto.ProdutoRequestDTO;
import com.dks.backend.dto.ProdutoResponseDTO;
import com.dks.backend.entity.Produto;
import com.dks.backend.repository.CategoriaRepository;
import com.dks.backend.repository.CorRepository;
import com.dks.backend.repository.FornecedorRepository;
import com.dks.backend.repository.ProdutoRepository;
import com.dks.backend.repository.TamanhoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final CategoriaRepository categoriaRepository;
    private final FornecedorRepository fornecedorRepository;
    private final CorRepository corRepository;
    private final TamanhoRepository tamanhoRepository;

    public ProdutoService(
            ProdutoRepository produtoRepository,
            CategoriaRepository categoriaRepository,
            FornecedorRepository fornecedorRepository,
            CorRepository corRepository,
            TamanhoRepository tamanhoRepository) {

        this.produtoRepository = produtoRepository;
        this.categoriaRepository = categoriaRepository;
        this.fornecedorRepository = fornecedorRepository;
        this.corRepository = corRepository;
        this.tamanhoRepository = tamanhoRepository;
    }

    public List<ProdutoResponseDTO> listarTodos() {
        return produtoRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<ProdutoResponseDTO> buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .map(this::toResponseDTO);
    }

    public ProdutoResponseDTO salvar(ProdutoRequestDTO dto) {

        Produto produto = new Produto();

        preencherProduto(produto, dto);

        if (produto.getDataCadastro() == null) {
            produto.setDataCadastro(LocalDate.now());
        }

        if (produto.getAtivo() == null) {
            produto.setAtivo(true);
        }

        if (produto.getEstoque() == null) {
            produto.setEstoque(0);
        }

        Produto salvo = produtoRepository.save(produto);

        return toResponseDTO(salvo);
    }

    public ProdutoResponseDTO atualizar(
            Long id,
            ProdutoRequestDTO dto) {

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Produto não encontrado"));

        preencherProduto(produto, dto);

        Produto atualizado = produtoRepository.save(produto);

        return toResponseDTO(atualizado);
    }

    public void excluir(Long id) {

        if (!produtoRepository.existsById(id)) {
            throw new RuntimeException("Produto não encontrado");
        }

        produtoRepository.deleteById(id);
    }

    private void preencherProduto(
            Produto produto,
            ProdutoRequestDTO dto) {

        produto.setCodigo(dto.getCodigo());
        produto.setCodigoBarras(dto.getCodigoBarras());
        produto.setNome(dto.getNome());
        produto.setMarca(dto.getMarca());
        produto.setColecao(dto.getColecao());
        produto.setDescricao(dto.getDescricao());

        produto.setCusto(dto.getCusto());
        produto.setPreco(dto.getPreco());
        produto.setPrecoPromocional(dto.getPrecoPromocional());

        produto.setEstoque(dto.getEstoque());
        produto.setEstoqueMinimo(dto.getEstoqueMinimo());

        produto.setAtivo(dto.getAtivo());

        if (dto.getDataCadastro() != null) {
            produto.setDataCadastro(dto.getDataCadastro());
        }

        if (dto.getCategoriaId() != null) {

            produto.setCategoria(
                    categoriaRepository
                            .findById(dto.getCategoriaId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Categoria não encontrada"))
            );

        } else {
            produto.setCategoria(null);
        }

        if (dto.getFornecedorId() != null) {

            produto.setFornecedor(
                    fornecedorRepository
                            .findById(dto.getFornecedorId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Fornecedor não encontrado"))
            );

        } else {
            produto.setFornecedor(null);
        }

        if (dto.getCorId() != null) {

            produto.setCor(
                    corRepository
                            .findById(dto.getCorId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Cor não encontrada"))
            );

        } else {
            produto.setCor(null);
        }

        if (dto.getTamanhoId() != null) {

            produto.setTamanho(
                    tamanhoRepository
                            .findById(dto.getTamanhoId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Tamanho não encontrado"))
            );

        } else {
            produto.setTamanho(null);
        }
    }

    private ProdutoResponseDTO toResponseDTO(Produto produto) {

        ProdutoResponseDTO dto = new ProdutoResponseDTO();

        dto.setId(produto.getId());
        dto.setCodigo(produto.getCodigo());
        dto.setCodigoBarras(produto.getCodigoBarras());

        dto.setNome(produto.getNome());
        dto.setMarca(produto.getMarca());
        dto.setColecao(produto.getColecao());
        dto.setDescricao(produto.getDescricao());

        dto.setCusto(produto.getCusto());
        dto.setPreco(produto.getPreco());
        dto.setPrecoPromocional(produto.getPrecoPromocional());

        dto.setEstoque(produto.getEstoque());
        dto.setEstoqueMinimo(produto.getEstoqueMinimo());

        dto.setAtivo(produto.getAtivo());
        dto.setDataCadastro(produto.getDataCadastro());

        if (produto.getCategoria() != null) {
            dto.setCategoriaId(produto.getCategoria().getId());
            dto.setCategoriaNome(produto.getCategoria().getNome());
        }

        if (produto.getFornecedor() != null) {
            dto.setFornecedorId(produto.getFornecedor().getId());
            dto.setFornecedorNome(produto.getFornecedor().getNome());
        }

        if (produto.getCor() != null) {
            dto.setCorId(produto.getCor().getId());
            dto.setCorNome(produto.getCor().getNome());
        }

        if (produto.getTamanho() != null) {
            dto.setTamanhoId(produto.getTamanho().getId());
            dto.setTamanhoDescricao(
                    produto.getTamanho().getDescricao()
            );
        }

        return dto;
    }
}