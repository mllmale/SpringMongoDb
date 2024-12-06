const checkboxFiltroTitulo = document.getElementById('consulta/livro/selecionar_titulo');
const checkboxFiltroAutor = document.getElementById('consulta/livro/selecionar_autor');
const checkboxFiltroAno = document.getElementById('consulta/livro/selecionar_ano');
const checkboxFiltroId = document.getElementById('consulta/livro/selecionar_id');
const checkboxFiltroDisponivel = document.getElementById('consulta/livro/selecionar_disponivel');



const campoTitulo = document.getElementById('campo_livro_titulo');
const campoAutor = document.getElementById('campo_livro_autor');
const campoAno = document.getElementById('campo_livro_ano');
const campoId = document.getElementById('campo_livro_id');
const campoDisponivel = document.getElementById('campo_livro_disponivel');


document.addEventListener('DOMContentLoaded', function () {

    // Mostrar/ocultar campos de entrada com base nos filtros selecionados
    checkboxFiltroTitulo.addEventListener('change', () => campoTitulo.style.display = checkboxFiltroTitulo.checked ? 'inline' : 'none');
    checkboxFiltroAutor.addEventListener('change', () => campoAutor.style.display = checkboxFiltroAutor.checked ? 'inline' : 'none');
    checkboxFiltroAno.addEventListener('change', () => campoAno.style.display = checkboxFiltroAno.checked ? 'inline' : 'none');
    checkboxFiltroId.addEventListener('change', () => campoId.style.display = checkboxFiltroId.checked ? 'inline' : 'none');
    checkboxFiltroDisponivel.addEventListener('change', () => campoDisponivel.style.display = checkboxFiltroDisponivel.checked ? 'inline' : 'none');
});


const checkboxVisibilidadeTitulo = document.getElementById('consulta/livro/visibilidade_titulo');
const checkboxVisibilidadeAutor = document.getElementById('consulta/livro/visibilidade_autor');
const checkboxVisibilidadeAno = document.getElementById('consulta/livro/visibilidade_ano');
const checkboxVisibilidadeId = document.getElementById('consulta/livro/visibilidade_id');
const checkboxVisibilidadeDisponivel = document.getElementById('consulta/livro/visibilidade_disponivel');


const pesquisaTitulo = document.getElementById('pesquisa_livro_titulo');
const pesquisaAutor = document.getElementById('pesquisa_livro_autor');
const pesquisaAno = document.getElementById('pesquisa_livro_ano');
const pesquisaId = document.getElementById('pesquisa_livro_id');
const pesquisaDisponivel = document.getElementById('pesquisa_livro_disponivel');

const FormConsulta = document.getElementById("formConsultaLivro");

FormConsulta.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Inicializando os filtros e o endpoint base
    const filtros = {};
    let endpoint = "http://localhost:8080/api/livros";

    // Verifica qual filtro está ativo e monta o endpoint correspondente
    if (checkboxFiltroTitulo.checked && pesquisaTitulo.value.trim() !== "") {
        filtros.titulo = pesquisaTitulo.value.trim();
        endpoint += "/buscarPorTitulo"; // Endpoint para busca por nome
    } else if (checkboxFiltroAutor.checked && pesquisaAutor.value.trim() !== "") {
        filtros.autor = pesquisaAutor.value.trim();
        endpoint += "/buscarPorAutor"; // Endpoint para busca por nacionalidade
    } else if (checkboxFiltroAno.checked && pesquisaAno.value.trim() !== "") {
        filtros.ano = pesquisaAno.value.trim();
        endpoint += "/buscarPorAno"; // Endpoint para busca por ID
    } else if (checkboxFiltroId.checked && pesquisaId.value.trim() !== "") {
        filtros.id_livro = pesquisaId.value.trim();
        endpoint = `http://localhost:8080/api/livros/${filtros.id_livro}`; // Endpoint para busca por quantidade de livros
    } else if (checkboxFiltroDisponivel.checked && pesquisaDisponivel.value.trim() !== "") {
        filtros.disponivel = pesquisaDisponivel.value.trim();
        endpoint = "/dpseuvejo"; // Endpoint para busca por quantidade de livros
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

        if (!response.ok) throw new Error("Erro ao consultar livros.");

        const livros = await response.json();

        // Se o retorno for um objeto único, transforme-o em um array
        const livrosArray = Array.isArray(livros) ? livros : [livros];


        const tbody = document.querySelector("#resultadoConsultaLivro tbody");
        const thead = document.querySelector("#resultadoConsultaLivro thead");
        tbody.innerHTML = ""; // Limpa os dados anteriores
        const headerRow = document.querySelector("#headerRowLivro");
        headerRow.innerHTML = ""; // Limpa os títulos anteriores

        // Adicionando os cabeçalhos com base nos checkboxes de visibilidade
        if (checkboxVisibilidadeTitulo.checked) {
            const thTitulo = document.createElement("th");
            thTitulo.textContent = "Título";
            headerRow.appendChild(thTitulo);
        }
        if (checkboxVisibilidadeAutor.checked) {
            const thAutor = document.createElement("th");
            thAutor.textContent = "Autor";
            headerRow.appendChild(thAutor);
        }
        if (checkboxVisibilidadeAno.checked) {
            const thAno = document.createElement("th");
            thAno.textContent = "Ano";
            headerRow.appendChild(thAno);
        }
        if (checkboxVisibilidadeId.checked) {
            const thId = document.createElement("th");
            thId.textContent = "ID";
            headerRow.appendChild(thId);
        }
        if (checkboxVisibilidadeDisponivel.checked) {
            const thDisponivel = document.createElement("th");
            thDisponivel.textContent = "Disponível";
            headerRow.appendChild(thDisponivel);
        }

        if (livrosArray.length === 0) {
            tbody.innerHTML = "<tr><td colspan='4'>Nenhum livro encontrado.</td></tr>";
            return;
        }

        // Adicionando os dados na tabela
        livrosArray.forEach(livro => {
            const tr = document.createElement("tr");

            if (checkboxVisibilidadeTitulo.checked) {
                const tdTitulo = document.createElement("td");
                tdTitulo.textContent = livro.titulo || "N/A";
                tr.appendChild(tdTitulo);
            }
            if (checkboxVisibilidadeAutor.checked) {
                const tdAutor = document.createElement("td");
                tdAutor.textContent =  livro.autor && livro.autor.nome ? livro.autor.nome : "N/A";
                tr.appendChild(tdAutor);
            }
            if (checkboxVisibilidadeAno.checked) {
                const tdAno = document.createElement("td");
                tdAno.textContent = livro.anoPublicacao || "N/A";
                tr.appendChild(tdAno);
            }
            if (checkboxVisibilidadeId.checked) {
                const tdId = document.createElement("td");
                tdId.textContent = livro.id_livro || "N/A";
                tr.appendChild(tdId);
            }
            if (checkboxVisibilidadeDisponivel.checked) {
                const tdDisponivel = document.createElement("td");
                tdDisponivel.textContent = livro.disponivel || "N/A";
                tr.appendChild(tdDisponivel);
            }

            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error("Erro ao buscar livros:", error);
        alert("Ocorreu um erro ao buscar os dados dos livros. Tente novamente.");
    }
});
