package com.meiobyte.biblioteca_v2.controller;


import com.meiobyte.biblioteca_v2.model.Funcionario;
import com.meiobyte.biblioteca_v2.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping
    public List<Funcionario> listarTodos() {
        return funcionarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Funcionario buscarPorId(@PathVariable Integer id) {
        return funcionarioService.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Funcionario criar(@RequestBody Funcionario funcionario) {
        return funcionarioService.salvar(funcionario);
    }


    @PutMapping("/{id}")
    public Funcionario atualizar(@PathVariable Integer id, @RequestBody Funcionario funcionario) {
        funcionario.setId(id);
        return funcionarioService.atualizar(funcionario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        funcionarioService.deletar(id);
    }

}
