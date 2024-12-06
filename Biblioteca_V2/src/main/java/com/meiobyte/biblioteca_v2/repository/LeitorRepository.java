package com.meiobyte.biblioteca_v2.repository;

import com.meiobyte.biblioteca_v2.model.Leitor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LeitorRepository extends MongoRepository<Leitor, Integer> {
}