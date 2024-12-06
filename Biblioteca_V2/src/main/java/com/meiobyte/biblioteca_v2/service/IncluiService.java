package com.meiobyte.biblioteca_v2.service;


import com.meiobyte.biblioteca_v2.model.Inclui;
import com.meiobyte.biblioteca_v2.repository.IncluiMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IncluiService {

    @Autowired
    private IncluiMongoRepository incluiRepository;

    public List<Inclui> listarTodos() {
        return incluiRepository.findAll();
    }

    public Optional<Inclui> buscarPorId(Integer id) {
        return incluiRepository.findById(id);
    }

    public Inclui salvar(Inclui inclui) {
        return incluiRepository.save(inclui);
    }

    public Inclui atualizar(Inclui inclui) {
        return incluiRepository.save(inclui);
    }

    public void deletar(Integer id) {
        incluiRepository.deleteById(id);
    }
}

