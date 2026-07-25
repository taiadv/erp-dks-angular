
package com.dks.backend.entity;

import com.dks.backend.enums.NivelUsuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 50, unique = true)
    private String usuario;

    @Column(nullable = false)
    private String senha;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NivelUsuario nivel;

    @Column(nullable = false)
    private Boolean ativo;

    private LocalDate dataCadastro;
}