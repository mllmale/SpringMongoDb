package com.meiobyte.biblioteca_v2.controller;

import com.meiobyte.biblioteca_v2.model.Inclui;
import com.meiobyte.biblioteca_v2.service.IncluiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inclui")
public class IncluiController {

    @Autowired
    private IncluiService incluiService;

    @GetMapping
    public List<Inclui> listarTodos() {
        return incluiService.listarTodos();
    }

    @GetMapping("/{id}")
    public Inclui buscarPorId(@PathVariable Integer id) {
        return incluiService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Inclui criar(@RequestBody Inclui inclui) {
        return incluiService.salvar(inclui);
    }

    @PutMapping("/{id}")
    public Inclui atualizar(@PathVariable Integer id, @RequestBody Inclui inclui) {
        inclui.setId(id);
        return incluiService.atualizar(inclui);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        incluiService.deletar(id);
    }
}
