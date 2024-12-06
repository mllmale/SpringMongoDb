package com.meiobyte.biblioteca_v2.controller;

import com.meiobyte.biblioteca_v2.model.Autor;
import com.meiobyte.biblioteca_v2.model.Livro;
import com.meiobyte.biblioteca_v2.service.LivroService;
import com.meiobyte.biblioteca_v2.service.AutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @Autowired
    private AutorService autorService;  // Service para buscar o autor

    @GetMapping
    public List<Livro> listarTodos() {
        return livroService.listarTodos();
    }

    @GetMapping("/autor/{id}")
    public Livro buscarPorId(@PathVariable Integer id) {
        return livroService.buscarPorAutor(id).orElse(null);
    }

    @PostMapping
    public Livro criar(@RequestBody Livro livro) {
        Optional<Autor> autor = autorService.buscarPorId(livro.getAutor().getId_autor());

        if (autor.isPresent()) {
            livro.setAutor(autor.get());
            return livroService.salvar(livro);
        } else {
            throw new RuntimeException("Autor não encontrado");
        }
    }

    @PutMapping("/{id}")
    public Livro atualizar(@PathVariable Integer id, @RequestBody Livro livro) {
        livro.setId(id);
        return livroService.atualizar(livro);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        livroService.deletar(id);
    }
}
