function permitirApenasNumeros(input) {
    input.value = input.value.replace(/\D/g, '');
}

function cadastrarLivro() {
    // Captura os valores dos campos
    const titulo = document.getElementById("titulo").value;
    const autorNome = document.getElementById("autor").value;
    const autorNacionalidade = document.getElementById("nacionalidade").value;
    const anoPublicacao = document.getElementById("ano").value;
    const codigo = document.getElementById("codigo").value;

    // Definir um id de autor fixo ou capturar o id de algum autor já cadastrado
    // Supondo que o autor já esteja cadastrado com id_autor, caso contrário, você poderia usar um campo de seleção
    const idAutor = 1;  // Aqui você pode buscar ou inserir um id de autor já cadastrado

    // Cria o objeto autor com id_autor
    const autor = {
        id_autor: idAutor
    };

    // Cria o objeto livro com a referência ao autor
    const livro = {
        titulo: titulo,
        anoPublicacao: anoPublicacao,
        autor: autor  // Passando o autor com o id_autor
    };

    // Log para verificar os dados antes do envio
    console.log("Livro que está sendo enviado:", livro);

    // Configura e envia a requisição ao backend
    fetch("http://localhost:8081/api/livros", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(livro)
    })
    .then(response => {
        if (response.ok) {
            alert("Livro cadastrado com sucesso!");
        } else {
            alert("Erro ao cadastrar livro.");
        }
    })
    .catch(error => {
        console.error("Erro ao enviar requisição:", error);
        alert("Erro ao cadastrar livro.");
    });
}
