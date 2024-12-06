function cadastrarFuncionario() {
    const id = document.querySelector('input[placeholder="ID"]').value;
    const nome = document.getElementById("nome").value;
    const cargo = document.getElementById("cargo").value;
    const funcionario = {
        nome: nome,
        cargo: cargo
    };
    
    fetch("http://localhost:8080/api/funcionarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(funcionario)
    })

    .then(response => {
        if (response.ok) {
            alert("Funcionário cadastrado com sucesso!");
            document.querySelector('input[placeholder="ID"]').value = '';
            document.getElementById("nome").value = '';
            document.getElementById("cargo").value = '';
        } else {
            alert("Erro ao cadastrar funcionário.");
        }
    })
    .catch(error => {
        console.error("Erro ao enviar requisição:", error);
        alert("Erro ao cadastrar funcionário.");
    });
}

