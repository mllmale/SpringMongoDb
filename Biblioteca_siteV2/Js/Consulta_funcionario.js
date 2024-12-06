    const checkboxFiltroNome = document.getElementById('consulta/funcionario/selecionar_nome');
    const checkboxFiltroCargo= document.getElementById('consulta/funcionario/selecionar_cargo');
    const checkboxFiltroId = document.getElementById('consulta/funcionario/selecionar_id');
  
    const campoNome = document.getElementById('campo_funcionario_nome');
    const campoCargo = document.getElementById('campo_funcionario_cargo');
    const campoId = document.getElementById('campo_funcionario_id');
   
document.addEventListener('DOMContentLoaded', function () {

    // Mostrar/ocultar campos de entrada com base nos filtros selecionados
    checkboxFiltroNome.addEventListener('change', () => campoNome.style.display = checkboxFiltroNome.checked ? 'inline' : 'none');
    checkboxFiltroCargo.addEventListener('change', () => campoCargo.style.display = checkboxFiltroCargo.checked ? 'inline' : 'none');
    checkboxFiltroId.addEventListener('change', () => campoId.style.display = checkboxFiltroId.checked ? 'inline' : 'none');
   
});

    const checkboxVisibilidadeNome = document.getElementById('consulta/funcionario/visibilidade_nome');
    const checkboxVisibilidadeCargo = document.getElementById('consulta/funcionario/visibilidade_cargo');
    const checkboxVisibilidadeId = document.getElementById('consulta/funcionario/visibilidade_id');

    const pesquisaNome = document.getElementById('pesquisa_funcionario_nome');
    const pesquisaCargo = document.getElementById('pesquisa_funcionario_cargo');
    const pesquisaId = document.getElementById('pesquisa_funcionario_id');

    const FormConsulta = document.getElementById("formConsultaFuncionario");

    FormConsulta.addEventListener("submit", async function (event) {
        event.preventDefault();
    
        // Inicializando os filtros e o endpoint base
        const filtros = {};
        let endpoint = "http://localhost:8080/api/funcionarios";
    
        // Verifica qual filtro está ativo e monta o endpoint correspondente
        if (checkboxFiltroNome.checked && pesquisaNome.value.trim() !== "") {
            filtros.nome = pesquisaNome.value.trim();
            endpoint += "/buscarPorNome"; // Endpoint para busca por nome
        } else if (checkboxFiltroCargo.checked && pesquisaCargo.value.trim() !== "") {
            filtros.cargo = pesquisaCargo.value.trim();
            endpoint += "/buscarPorCargo"; // Endpoint para busca por nacionalidade
        } else if (checkboxFiltroId.checked && pesquisaId.value.trim() !== "") {
            filtros.id_funcionario = pesquisaId.value.trim();
            endpoint = `http://localhost:8080/api/funcionarios/${filtros.id_funcionario}`; // Endpoint para busca por ID
        } 
    
        // Adiciona os filtros como parâmetros da URL
        const url = new URL(endpoint);
        Object.entries(filtros).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    
        console.log("URL gerada:", url.toString()); // Verifica a URL final
    
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
    
            if (!response.ok) throw new Error("Erro ao consultar funcionario.");
    
            const funcionarios = await response.json();
    
            // Se o retorno for um objeto único, transforme-o em um array
            const funcionariosArray = Array.isArray(funcionarios) ? funcionarios : [funcionarios];
    
            const tbody = document.querySelector("#resultadoConsultaFuncionario tbody");
            const thead = document.querySelector("#resultadoConsultaFuncionario thead");
            tbody.innerHTML = ""; 
            const headerRow = document.querySelector("#headerRowFuncionario");
            headerRow.innerHTML = ""; 
    
            // Adicionando os cabeçalhos com base nos checkboxes de visibilidade
            if (checkboxVisibilidadeNome.checked) {
                const thNome = document.createElement("th");
                thNome.textContent = "Nome";
                headerRow.appendChild(thNome);
            }
            if (checkboxVisibilidadeCargo.checked) {
                const thCargo = document.createElement("th");
                thCargo.textContent = "Cargo";
                headerRow.appendChild(thCargo);
            }
            if (checkboxVisibilidadeId.checked) {
                const thId = document.createElement("th");
                thId.textContent = "ID";
                headerRow.appendChild(thId);
            }
    
            if (funcionariosArray.length === 0) {
                tbody.innerHTML = "<tr><td colspan='4'>Nenhum funcionario encontrado.</td></tr>";
                return;
            }
    
            // Adicionando os dados na tabela
            funcionariosArray.forEach(funcionario => {
                const tr = document.createElement("tr");
    
                if (checkboxVisibilidadeNome.checked) {
                    const tdNome = document.createElement("td");
                    tdNome.textContent = funcionario.nome ? funcionario.nome.trim() : "N/A";
                    tr.appendChild(tdNome);
                }
                if (checkboxVisibilidadeCargo.checked) {
                    const tdCargo = document.createElement("td");
                    tdCargo.textContent = funcionario.cargo ? funcionario.cargo.trim() : "N/A";
                    tr.appendChild(tdCargo);
                }
                if (checkboxVisibilidadeId.checked) {
                    const tdId = document.createElement("td");
                    tdId.textContent = funcionario.id_funcionario ? funcionario.id_funcionario : "N/A";
                    tr.appendChild(tdId);
                }
    
                tbody.appendChild(tr);
            });
    
        } catch (error) {
            console.error("Erro ao buscar funcionarios:", error);
            alert("Ocorreu um erro ao buscar os dados dos funcionarios. Tente novamente.");
        }
    });
