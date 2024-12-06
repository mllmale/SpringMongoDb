package com.meiobyte.biblioteca_v2.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "livros")  // Define a coleção no MongoDB
public class Livro {

    @Id
    private Integer id;  // Definindo o ID, que será usado no MongoDB

    private String titulo;

    private Integer anoPublicacao;

    @DBRef  // Relacionamento com Autor
    private Autor autor;

    public void setId(Integer id) {
        this.id = id;
    }
}