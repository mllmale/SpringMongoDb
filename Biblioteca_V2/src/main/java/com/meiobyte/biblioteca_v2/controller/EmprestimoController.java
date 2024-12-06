package com.meiobyte.biblioteca_v2.controller;

import com.meiobyte.biblioteca_v2.model.Emprestimo;
import com.meiobyte.biblioteca_v2.service.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {

    @Autowired
    private EmprestimoService emprestimoService;

    @GetMapping
    public List<Emprestimo> listarTodos() {
        return emprestimoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Emprestimo buscarPorId(@PathVariable Integer id) {
        return emprestimoService.buscarPorId(id).orElse(null);
    }

     @GetMapping("/leitor/{id}")
    public Emprestimo buscarPorLeitor(@PathVariable Integer id) {
        return (Emprestimo) emprestimoService.buscarPorLeitor(id);
    }

    @GetMapping("/data")
    public List<Emprestimo> buscarPorData(@RequestParam String dataInicial, @RequestParam String dataFinal) {
        return emprestimoService.buscarPorData(dataInicial, dataFinal);  
    }

    @GetMapping("/nao-emprestado")
    public List<Emprestimo> buscarNaoEmprestado() {
        return emprestimoService.buscarNaoEmprestado();
    }

    @PostMapping
    public Emprestimo criar(@RequestBody Emprestimo emprestimo) {
        return emprestimoService.salvar(emprestimo);
    }


    @PutMapping("/{id}")
    public Emprestimo atualizar(@PathVariable Integer id, @RequestBody Emprestimo emprestimo) {
        emprestimo.setId(id);
        return emprestimoService.atualizar(emprestimo);
    }


    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        emprestimoService.deletar(id);
    }
}
