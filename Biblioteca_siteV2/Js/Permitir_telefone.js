function PermitirTelefone(input) {
    let valor = input.value;

    // Remove qualquer caractere não numérico
    valor = valor.replace(/\D/g, '');

    // Aplica a máscara (xx) xxxx-xxxx ou (xx) xxxxx-xxxx
    if (valor.length <= 10) {
        valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1)$2-$3');
    } else {
        valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1)$2-$3');
    }

    // Atualiza o valor do campo de entrada com a máscara aplicada
    input.value = valor;
}
