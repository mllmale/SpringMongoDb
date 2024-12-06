package com.meiobyte.biblioteca_v2.repository;

import com.meiobyte.biblioteca_v2.model.Funcionario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FuncionarioRepository extends MongoRepository<Funcionario, Integer> {
}