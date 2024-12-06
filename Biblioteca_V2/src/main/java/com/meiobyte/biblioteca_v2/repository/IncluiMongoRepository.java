package com.meiobyte.biblioteca_v2.repository;

import com.meiobyte.biblioteca_v2.model.Inclui;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IncluiMongoRepository  extends MongoRepository<Inclui, Integer> {
}