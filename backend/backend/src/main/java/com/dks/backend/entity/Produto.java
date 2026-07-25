package com.dks.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String codigo;

    @Column(length = 50)
    private String codigoBarras;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "fornecedor_id")
    private Fornecedor fornecedor;

    @ManyToOne
    @JoinColumn(name = "cor_id")
    private Cor cor;

    @ManyToOne
    @JoinColumn(name = "tamanho_id")
    private Tamanho tamanho;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 50)
    private String marca;

    @Column(length = 50)
    private String colecao;

    @Column(length = 255)
    private String descricao;

    private BigDecimal custo;

    private BigDecimal preco;

    private BigDecimal precoPromocional;

    private Integer estoque;

    private Integer estoqueMinimo;

    private Boolean ativo;

    private LocalDate dataCadastro;
}