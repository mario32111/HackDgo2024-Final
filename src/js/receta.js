async function enviarMensaje(medicamentos) {
    const alergias = ["Penicilina", "Polen", "Mariscos"];
    const mensaje = generatePrompt(medicamentos, alergias, 70, 1.75, 22.9, "Sedentario");

    const API_KEY = 'inserte api key '; // Cambia por tu API Key
    const API_URL = 'https://api.openai.com/v1/chat/completions';

    const dataToSend = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: mensaje }]
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
            console.error(`Error: ${response.status}`);
            alert(`Error: ${response.status}`); // Muestra un alert si hay un error
        } else {
            const responseData = await response.json();
            const message = responseData.choices?.[0]?.message?.content;

            if (message) {
                console.log(message);
                alert(`Respuesta de la API: ${message}`); // Muestra la respuesta en un alert
            } else {
                console.log("No se pudo obtener una respuesta de la API.");
                alert("No se pudo obtener una respuesta de la API."); // Muestra un alert si no hay respuesta
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en la conexión a la API.'); // Muestra un alert si hay un error de conexión
    }
}

function generatePrompt(medicamentos, alergias, peso, estatura, IMC, estiloDeVida) {
    const medicamentosStr = medicamentos.map(m =>
        `Nombre Genérico: ${m.nombreGenerico}, Forma Farmacéutica: ${m.formaFarmaceutica}, Dosis: ${m.dosis}, Presentación: ${m.presentacion}, Frecuencia: ${m.frecuencia}, Duración: ${m.duracion}, Indicaciones: ${m.indicaciones}`
    ).join("; ");

    const alergiasStr = alergias.join(", ");

    return `El paciente debe tomar los siguientes medicamentos: ${medicamentosStr}. 
    El paciente tiene alergias a ${alergiasStr}, con un peso de ${peso}kg, una estatura de ${estatura}m, un IMC de ${IMC}, y un estilo de vida ${estiloDeVida}. 
    Alguna de todas estas condiciones en la persona puede llegar a presentar contraindicaciones el consumo de sus medicamentos. Responde con sí o no.`;
}

// Definir la función que procesará los datos del formulario
function procesarFormulario(event) {
    // Evitar el envío automático del formulario
    event.preventDefault();

    // Capturar los datos del formulario
    const formData = new FormData(event.target);
    const recetaData = {
        nombreMedico: formData.get('nombre-medico'),
        cedulaMedico: formData.get('cedula-medico'),
        fechaEmision: formData.get('fecha-emision'),
        institucionEducativa: formData.get('institucion-educativa'),
        domicilioConsultorio: formData.get('domicilio-consultorio'),
        telefonoMedico: formData.get('telefono-medico'),
        medicamentos: []
    };

    // Recolectar los datos de los medicamentos
    const medicamentos = document.querySelectorAll('.medicamento');
    medicamentos.forEach((medicamento) => {
        const nombreGenerico = medicamento.querySelector('input[name="nombre-generico"]').value;
        const formaFarmaceutica = medicamento.querySelector('input[name="forma-farmaceutica"]').value;
        const dosis = medicamento.querySelector('input[name="dosis"]').value;
        const presentacion = medicamento.querySelector('input[name="presentacion"]').value;
        const frecuencia = medicamento.querySelector('input[name="frecuencia"]').value;
        const duracion = medicamento.querySelector('input[name="duracion"]').value;
        const indicaciones = medicamento.querySelector('textarea[name="indicaciones"]').value;

        recetaData.medicamentos.push({
            nombreGenerico,
            formaFarmaceutica,
            dosis,
            presentacion,
            frecuencia,
            duracion,
            indicaciones
        });
    });

    enviarMensaje(recetaData.medicamentos);
}

// Esperar a que el DOM esté completamente cargado para asociar el evento
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-receta');
    if (form) {
        form.addEventListener('submit', procesarFormulario);
    } else {
        console.error("Formulario con ID 'form-receta' no encontrado.");
    }
});
