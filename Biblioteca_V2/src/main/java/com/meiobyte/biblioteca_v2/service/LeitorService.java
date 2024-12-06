package com.meiobyte.biblioteca_v2.service;

import com.meiobyte.biblioteca_v2.model.Leitor;
import com.meiobyte.biblioteca_v2.repository.LeitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeitorService {

    @Autowired
    private LeitorRepository leitorRepository;

    public List<Leitor> listarTodos() {
        return leitorRepository.findAll();
    }

    public Optional<Leitor> buscarPorId(Integer id) {
        return leitorRepository.findById(id);
    }

    public Leitor salvar(Leitor leitor) {
        return leitorRepository.save(leitor);
    }

    public Leitor atualizar(Leitor leitor) {
        return leitorRepository.save(leitor);
    }

    public void deletar(Integer id) {
        leitorRepository.deleteById(id);
    }
}