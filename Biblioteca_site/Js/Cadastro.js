function cadastrarFuncionario() {
    const nome = document.getElementById("nome").value;
    const cargo = document.getElementById("cargo").value;

    const funcionario = {
        nome: nome,
        cargo: cargo
    };

    fetch("http://localhost:8081/api/funcionarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(funcionario)
    })
    .then(response => {
        if (response.ok) {
            alert("Funcionário cadastrado com sucesso!");
        } else {
            alert("Erro ao cadastrar funcionário.");
        }
    })
    .catch(error => {
        console.error("Erro ao enviar requisição:", error);
        alert("Erro ao cadastrar funcionário.");
    });
}
