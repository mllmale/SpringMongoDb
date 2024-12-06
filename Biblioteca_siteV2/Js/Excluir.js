async function excluirItem(tipo) {
    // Mostrar o alerta de confirmação
    const confirmar = await mostrarModalConfirmacao();
    if (!confirmar) {
        return; // Se o usuário escolher "Não", a função é encerrada
    }

    // Obter o ID do item com base no tipo passado
    let inputId;
    switch (tipo) {
        case 'autores':
            inputId = document.getElementById('inputAutorId');
            break;
        case 'funcionarios':
            inputId = document.getElementById('inputFuncionarioId');
            break;
        case 'livros':
            inputId = document.getElementById('inputLivroId');
            break;
        case 'emprestimos':
            inputId = document.getElementById('inputEmprestimoId');
            break;
        default:
            console.error('Tipo de exclusão desconhecido');
            return;
    }

    // Verificar se o campo de ID existe e contém um valor
    if (!inputId || !inputId.value.trim()) {
        alert("Por favor, insira um ID válido.");
        return;
    }

    console.log(tipo);
    
    const id = inputId.value.trim();

    try {
        const response = await fetch(`http://localhost:8080/api/${tipo}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`Erro ao excluir ${tipo}.`);
        }

        alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} excluído com sucesso!`);

        // Limpar o campo de ID após a exclusão
        inputId.value = '';
    } catch (error) {
        console.error(error);
        alert(`Erro ao excluir o ${tipo}: ${error.message}`);
    }
}

async function mostrarModalConfirmacao() {
    return new Promise(resolve => {
        // Exibe a caixa de diálogo personalizada
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';

        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '5px';
        modalContent.style.textAlign = 'center';
        modalContent.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

        const message = document.createElement('p');
        message.textContent = 'Tem certeza que deseja excluir?';
        modalContent.appendChild(message);

        const buttons = document.createElement('div');
        buttons.style.marginTop = '20px';

        const btnSim = document.createElement('button');
        btnSim.textContent = 'Sim';
        btnSim.style.margin = '0 10px';
        btnSim.style.padding = '10px 20px';
        btnSim.onclick = () => {
            document.body.removeChild(modal); // Remover o modal
            resolve(true); // Resolver a promessa com "true"
        };

        const btnNao = document.createElement('button');
        btnNao.textContent = 'Não';
        btnNao.style.margin = '0 10px';
        btnNao.style.padding = '10px 20px';
        btnNao.onclick = () => {
            document.body.removeChild(modal); // Remover o modal
            resolve(false); // Resolver a promessa com "false"
        };

        buttons.appendChild(btnSim);
        buttons.appendChild(btnNao);
        modalContent.appendChild(buttons);
        modal.appendChild(modalContent);

        document.body.appendChild(modal);
    });
}
