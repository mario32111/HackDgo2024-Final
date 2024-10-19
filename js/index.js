function handleSubmit(event) {
    event.preventDefault(); // Evita que el formulario reinicie la página
    ocultar(); // Llama a tu función ocultar aquí
}
function ocultar() {
    const nodos = document.getElementsByClassName('service_area');
    
    // Asegúrate de que la colección no esté vacía antes de acceder a un elemento
    if (nodos.length > 0) {
        nodos[0].classList.remove("ocultar"); // Acceder al primer elemento de la colección
    }
    console.log("El elemento ha sido ocultado");
}


function toggleElemenent(event, id) {
    event.preventDefault(); // Evita que el formulario reinicie la página
    cambiar(id); // Llama a tu función cambiar aquí
}

function cambiar(id) {
    const nodo = document.getElementById(id); // Buscar por ID
    
    if (nodo) {
        nodo.classList.toggle("ocultar"); // Alternar la clase ocultar
    } else {
        console.log("El elemento con el ID especificado no fue encontrado.");
    }
}
