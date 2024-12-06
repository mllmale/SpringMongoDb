package com.meiobyte.biblioteca_v2.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "leitores")
public class Leitor {

    @Id
    private Integer id;

    private String nome;
    private String endereco;
    private String telefone;

    public void setId(Integer id) {
        this.id = id;
    }
}