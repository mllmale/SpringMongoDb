const checkboxFiltroLeitor = document.getElementById('consulta/emprestimo/selecionar_leitor');
const checkboxFiltroFuncionarioResponsavel = document.getElementById('consulta/emprestimo/selecionar_funcionario_responsavel');
const checkboxFiltroLivro = document.getElementById('consulta/emprestimo/selecionar_livro');
const checkboxFiltroData = document.getElementById('consulta/emprestimo/selecionar_data');
const checkboxFiltroId = document.getElementById('consulta/emprestimo/selecionar_id');


const campoLeitor = document.getElementById('campo_emprestimo_leitor');
const campoFuncionarioResponsavel = document.getElementById('campo_emprestimo_funcionario_responsavel');
const campoLivro = document.getElementById('campo_emprestimo_livro');
const campoDataInicial = document.getElementById('campo_emprestimo_data_inicial');
const campoDataFinal = document.getElementById('campo_emprestimo_data_final');
const campoId = document.getElementById('campo_emprestimo_id');

document.addEventListener('DOMContentLoaded', function () {
// Mostrar/ocultar campos de entrada com base nos filtros selecionados

checkboxFiltroLeitor.addEventListener('change', () => campoLeitor.style.display = checkboxFiltroLeitor.checked ? 'inline' : 'none');
checkboxFiltroFuncionarioResponsavel.addEventListener('change', () => campoFuncionarioResponsavel.style.display = checkboxFiltroFuncionarioResponsavel.checked ? 'inline' : 'none');
checkboxFiltroLivro.addEventListener('change', () => campoLivro.style.display = checkboxFiltroLivro.checked ? 'inline' : 'none');
checkboxFiltroData.addEventListener('change', () => campoDataInicial.style.display = checkboxFiltroData.checked ? 'inline' : 'none');
checkboxFiltroData.addEventListener('change', () => campoDataFinal.style.display = checkboxFiltroData.checked ? 'inline' : 'none');
checkboxFiltroId.addEventListener('change', () => campoId.style.display = checkboxFiltroId.checked ? 'inline' : 'none'); 
});

const checkboxVisibilidadeLeitor = document.getElementById('consulta/emprestimo/visibilidade_leitor');
const checkboxVisibilidadeFuncionarioResponsavel = document.getElementById('consulta/emprestimo/visibilidade_funcionario_responsavel');
const checkboxVisibilidadeLivro = document.getElementById('consulta/emprestimo/visibilidade_livro');
const checkboxVisibilidadeData = document.getElementById('consulta/emprestimo/visibilidade_data');
const checkboxVisibilidadeId = document.getElementById('consulta/emprestimo/visibilidade_id');

const pesquisaLeitor = document.getElementById('pesquisa_emprestimo_leitor');
const pesquisaFuncionarioResponsavel = document.getElementById('pesquisa_emprestimo_funcionario_responsavel');
const pesquisaLivro = document.getElementById('pesquisa_emprestimo_livro');
const pesquisaDataInicial = document.getElementById('pesquisa_emprestimo_data_inicial');
const pesquisaDataFinal = document.getElementById('pesquisa_emprestimo_data_final');
const pesquisaId = document.getElementById('pesquisa_emprestimo_id');

FormConsulta = document.getElementById("formConsultaEmprestimo");

FormConsulta.addEventListener("submit", async function (event) {
event.preventDefault();

// Inicializando os filtros e o endpoint base
const filtros = {};
let endpoint = "http://localhost:8080/api/emprestimos";

// Verifica qual filtro está ativo e monta o endpoint correspondente
if (checkboxFiltroLeitor.checked && pesquisaLeitor.value.trim() !== "") {
    filtros.leitor = pesquisaLeitor.value.trim();
    endpoint += "leitores/nome"; 

} else if (checkboxFiltroFuncionarioResponsavel.checked && pesquisaFuncionarioResponsavel.value.trim() !== "") {
    filtros.funcionario_responsavel = pesquisaFuncionarioResponsavel.value.trim();
    endpoint += "/buscarPorFuncionarioResponsavel"; 

} else if (checkboxFiltroLivro.checked && pesquisaLivro.value.trim() !== "") {
    filtros.livro = pesquisaLivro.value.trim();
    endpoint += "/buscarPorLivro"; 

} else if (checkboxFiltroData.checked && pesquisaDataInicial.value.trim() !== "" && pesquisaDataFinal.value.trim() !== "") {
    filtros.dataEmprestimo = pesquisaDataInicial.value.trim();
    filtros.dataDevolucao = pesquisaDataFinal.value.trim();
    endpoint += "/buscarPorData"; 

} else if (checkboxFiltroId.checked && pesquisaId.value.trim() !== "") {
    filtros.id_emprestimo = pesquisaId.value.trim();
    endpoint = `http://localhost:8080/api/emprestimos/${filtros.id_emprestimo}`; 
}

// Adiciona os filtros como parâmetros da URL
const url = new URL(endpoint);
Object.entries(filtros).forEach(([key, value]) => {
    url.searchParams.append(key, value);
});

console.log("URL gerada:", url.toString()); // Verifica a URL final
console.log("Endpoint", endpoint);

try {
    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) throw new Error("Erro ao consultar empréstimos.");

    const emprestimos = await response.json();

    // Se o retorno for um objeto único, transforme-o em um array
    const emprestimosArray = Array.isArray(emprestimos) ? emprestimos : [emprestimos];


    const tbody = document.querySelector("#resultadoConsultaEmprestimo tbody");
    const thead = document.querySelector("#resultadoConsultaEmprestimo thead");
    tbody.innerHTML = ""; 
    const headerRow = document.querySelector("#headerRowEmprestimo");
    headerRow.innerHTML = ""; 

    // Adicionando os cabeçalhos com base nos checkboxes de visibilidade
    if (checkboxVisibilidadeLeitor.checked) {
        const thLeitor = document.createElement("th");
        thLeitor.textContent = "Leitor";
        headerRow.appendChild(thLeitor);
    }
    if (checkboxVisibilidadeFuncionarioResponsavel.checked) {
        const thFuncionarioResponsavel = document.createElement("th");
        thFuncionarioResponsavel.textContent = "Funcionario responsável";
        headerRow.appendChild(thFuncionarioResponsavel);
    }
    if (checkboxVisibilidadeLivro.checked) {
        const thLivro = document.createElement("th");
        thLivro.textContent = "Livro";
        headerRow.appendChild(thLivro);
    }
    if (checkboxVisibilidadeData.checked) {
        const thData = document.createElement("th");
        thData.textContent = "Data";
        headerRow.appendChild(thData);
    }
    if (checkboxVisibilidadeId.checked) {
        const thId = document.createElement("th");
        thId.textContent = "ID";
        headerRow.appendChild(thId);
    }

    if (emprestimosArray.length === 0) {
        tbody.innerHTML = "<tr><td colspan='4'>Nenhum empréstimo encontrado.</td></tr>";
        return;
    }

    // Adicionando os dados na tabela
emprestimosArray.forEach(emprestimo => {
    const tr = document.createElement("tr");

    // Campo para o leitor
    if (checkboxVisibilidadeLeitor.checked) {
        const tdLeitor = document.createElement("td");
        tdLeitor.textContent = emprestimo.leitor?.nome || "N/A"; // Acessa o nome do leitor
        tr.appendChild(tdLeitor);
    }

    // Campo para o funcionário responsável
    if (checkboxVisibilidadeFuncionarioResponsavel.checked) {
        const tdFuncionarioResponsavel = document.createElement("td");
        tdFuncionarioResponsavel.textContent = emprestimo.funcionario?.nome || "N/A"; // Acessa o nome do funcionário
        tr.appendChild(tdFuncionarioResponsavel);
    }

    // Campo para o livro
    if (checkboxVisibilidadeLivro.checked) {
        const tdLivro = document.createElement("td");
        tdLivro.textContent = emprestimo.livro?.titulo || "N/A"; // Acessa o título do livro
        tr.appendChild(tdLivro);
    }

    // Campo para as datas de empréstimo e devolução
    if (checkboxVisibilidadeData.checked) {
        const tdData = document.createElement("td");
        if (emprestimo.dataEmprestimo && emprestimo.dataDevolucao) {
            tdData.textContent = `De: ${emprestimo.dataEmprestimo} Até: ${emprestimo.dataDevolucao}`;
        } else {
            tdData.textContent = "N/A";
        }
        tr.appendChild(tdData);
    }

    // Campo para o ID do empréstimo
    if (checkboxVisibilidadeId.checked) {
        const tdId = document.createElement("td");
        tdId.textContent = emprestimo.id_emprestimo || "N/A";
        tr.appendChild(tdId);
    }

    tbody.appendChild(tr);
});


} catch (error) {
    console.error("Erro ao buscar empréstimos:", error);
    alert("Ocorreu um erro ao buscar os dados dos empréstimos. Tente novamente.");
}
});