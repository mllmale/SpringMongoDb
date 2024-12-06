package com.meiobyte.biblioteca_v2.repository;

import com.meiobyte.biblioteca_v2.model.Livro;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LivroRepository extends MongoRepository<Livro, Integer> {
}