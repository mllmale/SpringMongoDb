async function editarItem(tipo) {
    // Obter os campos do formulário com base no tipo
    let campos;
    switch (tipo) {
        case 'autores':
            campos = {
                id: document.getElementById('inputAutorId'),
                nome: document.getElementById('inputAutorNome'),
            };
            break;
        case 'funcionarios':
            campos = {
                id: document.getElementById('inputFuncionarioId'),
                nome: document.getElementById('inputFuncionarioNome'),
                cargo: document.getElementById('inputFuncionarioCargo'),
            };
            break;
        case 'livros':
            campos = {
                id: document.getElementById('inputLivroId'),
                titulo: document.getElementById('inputLivroTitulo'),
                autor: document.getElementById('inputLivroAutor'),
            };
            break;
        case 'emprestimos':
            campos = {
                id: document.getElementById('inputEmprestimoId'),
                leitor: document.getElementById('inputEmprestimoLeitor'),
                funcionario: document.getElementById('inputEmprestimoFuncionario'),
                livro: document.getElementById('inputEmprestimoLivro'),
                dataEmprestimo: document.getElementById('inputEmprestimoDataEmprestimo'),
                dataDevolucao: document.getElementById('inputEmprestimoDataDevolucao'),
            };
            break;
        default:
            console.error('Tipo de edição desconhecido');
            return;
    }

    // Verificar se o ID está preenchido
    if (!campos.id || !campos.id.value.trim()) {
        alert("Por favor, insira um ID válido.");
        return;
    }

    const id = campos.id.value.trim();

    // Construir o objeto com os dados a serem enviados
    const dadosAtualizados = {};
    for (const [key, campo] of Object.entries(campos)) {
        if (key !== 'id' && campo && campo.value.trim()) {
            dadosAtualizados[key] = campo.value.trim();
        }
    }

    // Verificar se há dados para atualizar
    if (Object.keys(dadosAtualizados).length === 0) {
        alert("Por favor, preencha ao menos um campo para editar.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/${tipo}/${id}`, {
            method: 'PUT', // Usando PUT para atualizar o registro
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados),
        });

        if (!response.ok) {
            throw new Error(`Erro ao editar ${tipo}.`);
        }

        alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} editado com sucesso!`);
        
        // Limpar os campos após a edição
        for (const campo of Object.values(campos)) {
            if (campo) campo.value = '';
        }
    } catch (error) {
        console.error(error);
        alert(`Erro ao editar o ${tipo}: ${error.message}`);
    }
}
