package com.meiobyte.biblioteca_v2.controller;

import com.meiobyte.biblioteca_v2.model.Leitor;
import com.meiobyte.biblioteca_v2.service.LeitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leitores")
public class LeitorController {

    @Autowired
    private LeitorService leitorService;

    @GetMapping
    public List<Leitor> listarTodos() {
        return leitorService.listarTodos();
    }

    @GetMapping("/{id}")
    public Leitor buscarPorId(@PathVariable Integer id) {
        return leitorService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Leitor criar(@RequestBody Leitor leitor) {
        return leitorService.salvar(leitor);
    }

    @PutMapping("/{id}")
    public Leitor atualizar(@PathVariable Integer id, @RequestBody Leitor leitor) {
        leitor.setId(id);
        return leitorService.atualizar(leitor);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        leitorService.deletar(id);
    }
}
