package com.meiobyte.biblioteca_v2.repository;

import com.meiobyte.biblioteca_v2.model.Autor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AutorRepository extends MongoRepository<Autor, Integer> {
}