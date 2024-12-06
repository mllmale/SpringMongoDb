package com.meiobyte.biblioteca_v2.repository;

import com.meiobyte.biblioteca_v2.model.Emprestimo;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface EmprestimoRepository extends MongoRepository<Emprestimo, Integer> {

    List<Emprestimo> findByLeitorId(Integer leitorId);
    
    List<Emprestimo> findByFuncionarioId(Integer funcionarioId);
    
    List<Emprestimo> findByDataBetween(String dataInicial, String dataFinal);
    
    List<Emprestimo> findByStatus(String status);
}
