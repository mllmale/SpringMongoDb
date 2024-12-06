package com.meiobyte.biblioteca_v2.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

import java.time.LocalDate;

@Data
@Document(collection = "emprestimos")
public class Emprestimo {

    @Id
    private Integer id_emprestimo;

    private String data;

    private LocalDate dataEmprestimo;
    private LocalDate dataDevolucao;

    @Field("status") 
    private String status;

    @DBRef
    private Leitor leitor;

    @DBRef
    private Funcionario funcionario;

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public void setId(Integer id) {
        this.id_emprestimo = id;
    }
}
