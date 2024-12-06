package com.meiobyte.biblioteca_v2.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "autores")
public class Autor {

    @Id
    private Integer id_autor;

    private String nome;
    private String nacionalidade;
}
