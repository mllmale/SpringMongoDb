package com.meiobyte.biblioteca_v2.service;

import com.meiobyte.biblioteca_v2.model.Autor;
import com.meiobyte.biblioteca_v2.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutorService {

    @Autowired
    private AutorRepository autorRepository;

    public List<Autor> listarTodos() {
        return autorRepository.findAll();
    }

    public Optional<Autor> buscarPorId(Integer id) {
        return autorRepository.findById(id);
    }

    public Autor salvar(Autor autor) {
        return autorRepository.save(autor);
    }

    public Autor atualizar(Autor autor) {
        return autorRepository.save(autor);
    }

    public void deletar(Integer id) {
        autorRepository.deleteById(id);
    }

    // Método para verificar se o autor existe
    public boolean existsById(Integer id) {
        return autorRepository.existsById(id);
    }
}
