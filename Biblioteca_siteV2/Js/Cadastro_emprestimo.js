document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar os autores no select
    function carregarFuncionario() {
        const selectFuncionario = document.getElementById("selectFuncionario");
       
        // Faz a requisição para pegar os autores
        fetch("http://localhost:8080/api/funcionarios")
            .then(response => response.json())  // Parseia o retorno para JSON
            .then(funcionarios => {
                // Limpa as opções anteriores (caso tenha sido carregado algo antes)
                selectFuncionario.innerHTML = '<option value="" disabled selected>Funcionário responsável</option>';
                
                // Preenche o select com os autores
                funcionarios.forEach(funcionario => {
                    const option = document.createElement("option");
                    option.value = funcionario.id_funcionario;  // Supondo que cada autor tenha um id
                    option.textContent = funcionario.nome;  // Nome do autor
                    selectFuncionario.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Erro ao carregar funcionários:", error);
                alert("Erro ao carregar funcionários.");
            });
    }

    function carregarLeitor() {
        const selectLeitor = document.getElementById("selectLeitor");
       
        // Faz a requisição para pegar os autores
        fetch("http://localhost:8080/api/leitores")
            .then(response => response.json())  // Parseia o retorno para JSON
            .then(leitores => {
                // Limpa as opções anteriores (caso tenha sido carregado algo antes)
                selectLeitor.innerHTML = '<option value="" disabled selected>Leitor</option>';
                
                // Preenche o select com os autores
                leitores.forEach(leitor => {
                    const option = document.createElement("option");
                    option.value = leitor.id_leitor;  // Supondo que cada autor tenha um id
                    option.textContent = leitor.nome;  // Nome do autor
                    selectLeitor.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Erro ao carregar leitores:", error);
                alert("Erro ao carregar leitores.");
            });
    }

    function carregarLivro() {
        const selectLivro = document.getElementById("selectLivro");

        // Faz a requisição para pegar os autores
        fetch("http://localhost:8080/api/livros")
            .then(response => response.json())  // Parseia o retorno para JSON
            .then(livros => {
                // Limpa as opções anteriores (caso tenha sido carregado algo antes)
                selectLivro.innerHTML = '<option value="" disabled selected>Livro</option>';
                
                // Preenche o select com os autores
                livros.forEach(livro => {
                    const option = document.createElement("option");
                    option.value = livro.id_livro;  // Supondo que cada autor tenha um id
                    option.textContent = livro.titulo;  // Nome do autor
                    selectLivro.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Erro ao carregar livros:", error);
                alert("Erro ao carregar livros.");
            });
    }

    // Carregar autores quando a página for carregada
    carregarFuncionario();
    carregarLivro();
    carregarLeitor();
});

// Função para cadastrar o livro
function cadastrarEmprestimo() {
    const selectLeitor = document.getElementById("selectLeitor");
    const id_emprestimo = document.getElementById("id_emprestimo").value;
    const selectFuncionario = document.getElementById("selectFuncionario");
    const selectLivro = document.getElementById("selectLivro");

    // Verifica se os selects existem antes de tentar acessar seus valores
    if (!selectLeitor || !selectFuncionario || !selectLivro) {
        alert("Erro: Um ou mais campos não foram carregados corretamente.");
        return;
    }

    const id_leitor = selectLeitor.value;
    const id_funcionario = selectFuncionario.value;
    const id_livro = selectLivro.value;

    // Verifica se um item foi selecionado e obtém o texto (nome ou título)
    const nome_leitor = selectLeitor.options[selectLeitor.selectedIndex]?.text || "Desconhecido";
    const nome_funcionario = selectFuncionario.options[selectFuncionario.selectedIndex]?.text || "Desconhecido";
    const nome_livro = selectLivro.options[selectLivro.selectedIndex]?.text || "Desconhecido";

    const data_inicial = document.getElementById("data_inicial").value;
    const data_final = document.getElementById("data_final").value;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!id_leitor) {
        alert("Por favor, selecione o leitor.");
        return;
    }
    if (!id_funcionario) {
        alert("Por favor, selecione o funcionário responsável.");
        return;
    }
    if (!id_livro) {
        alert("Por favor, selecione o livro.");
        return;
    }
    if (!data_inicial || !data_final) {
        alert("Por favor, selecione as datas de empréstimo e devolução.");
        return;
    }

    const emprestimo = {
        leitor: {
            id_leitor: id_leitor,
            nome: nome_leitor
        },
        funcionario: {
            id_funcionario: id_funcionario,
            nome: nome_funcionario
        },
        livro: {
            id_livro: id_livro,
            titulo: nome_livro
        },
        dataEmprestimo: data_inicial,
        dataDevolucao: data_final,
        id_emprestimo: id_emprestimo,
        status: "EMPRESTADO"
    };

    console.log(emprestimo);

    // Envia a requisição para o backend
    fetch("http://localhost:8080/api/emprestimos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(emprestimo)
    })
    .then(response => {
        if (response.ok) {
            alert("Empréstimo cadastrado com sucesso!");
            // Limpa os campos após o envio
            document.getElementById("selectLeitor").value = '';
            document.getElementById("id_emprestimo").value = '';
            document.getElementById("selectFuncionario").value = '';
            document.getElementById("selectLivro").value = '';
            document.getElementById("data_inicial").value = '';
            document.getElementById("data_final").value = '';
        } else {
            alert("Erro ao cadastrar empréstimo.");
        }
    })
    .catch(error => {
        console.error("Erro ao enviar requisição:", error);
        alert("Erro ao cadastrar empréstimo (requisição).");
    });
}



