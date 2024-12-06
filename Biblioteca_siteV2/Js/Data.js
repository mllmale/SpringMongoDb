function formatDate(input) {
    let value = input.value.replace(/\D/g, ''); 
    if (value.length > 4) {
        value = value.slice(0, 4) + '-' + value.slice(4); 
    }
    if (value.length > 7) {
        value = value.slice(0, 7) + '-' + value.slice(7); 
    }
    input.value = value; 
}
