package com.meiobyte.biblioteca_v2.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "inclui")
public class Inclui {

    @Id
    private Integer id;

    @DBRef
    private Emprestimo emprestimo;

    @DBRef
    private Livro livro;
    public void setId(Integer id) {
        this.id = id;
    }
}
