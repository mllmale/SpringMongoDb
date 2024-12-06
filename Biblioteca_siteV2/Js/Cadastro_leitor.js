function cadastrarLeitor() {
    const id = document.querySelector('input[placeholder="ID"]').value;
    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereço").value;
    const telefone = document.getElementById("telefone").value;

    const leitores = {
        nome: nome,
        endereco: endereco,
        telefone: telefone
    };
    
  

    fetch("http://localhost:8080/api/leitores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(leitores)
    })

    .then(response => {
        if (response.ok) {
            alert("Leitor cadastrado com sucesso!");
            id.value = '';
            document.getElementById("nome").value = '';
            document.getElementById("endereço").value = '';
            document.getElementById("telefone").value = '';
        } else {
            alert("Erro ao cadastrar leitor.");
        }
    })
    .catch(error => {
        console.error("Erro ao enviar requisição:", error);
        alert("Erro ao cadastrar leitor.");
    });
}

