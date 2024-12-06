package com.meiobyte.biblioteca_v2.controller;

import com.meiobyte.biblioteca_v2.model.Autor;
import com.meiobyte.biblioteca_v2.service.AutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/autores")
public class AutorController {

    @Autowired
    private AutorService autorService;

    @GetMapping
    public List<Autor> listarTodos() {
        return autorService.listarTodos();
    }

    @GetMapping("/{id}")
    public Autor buscarPorId(@PathVariable Integer id) {
        return autorService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Autor criar(@RequestBody Autor autor) {
        return autorService.salvar(autor);
    }

    @PutMapping("/{id}")
    public Autor atualizar(@PathVariable Integer id, @RequestBody Autor autor) throws Exception {
        if (!autorService.existsById(id)) {
            // Lança uma exceção personalizada caso o autor não exista
            throw new Exception("Autor não encontrado com o id " + id);
        }

        autorService.atualizar(autor); 
        return autor;
}

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        autorService.deletar(id);
    }
}
