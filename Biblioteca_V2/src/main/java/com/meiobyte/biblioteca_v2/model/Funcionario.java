package com.meiobyte.biblioteca_v2.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "funcionarios")
public class Funcionario {

    @Id
    private Integer id_funcionario;

    private String nome;
    private String cargo;

    public void setId(Integer id) {
        this.id_funcionario = id;
    }
}
