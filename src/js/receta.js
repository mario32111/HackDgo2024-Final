async function enviarMensaje(medicamentos, diagnostico) {
    const alergias = ["Penicilina", "Polen", "Mariscos"];
    const mensaje = generatePrompt(medicamentos, alergias, 70, 1.75, 22.9, "Sedentario", diagnostico);

    const API_KEY = ''; // Cambia por tu API Key
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
            showModal(`Error: ${response.status}`);
        } else {
            const responseData = await response.json();
            const message = responseData.choices?.[0]?.message?.content;

            if (message) {
                console.log(message);
                showModal(`Respuesta de la API: ${message}`);
            } else {
                console.log("No se pudo obtener una respuesta de la API.");
                showModal("No se pudo obtener una respuesta de la API.");
            }
        }
    } catch (error) {
        console.error('Error:', error);
        showModal('Error en la conexión a la API.');
    }
}

// Función para mostrar el modal con la respuesta
function showModal(message) {
    const modal = document.getElementById('responseModal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-button');

    modalMessage.textContent = message;
    modal.style.display = "block";

    // Cerrar el modal al hacer clic en el botón de cierre
    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    // Cerrar el modal al hacer clic fuera de la ventana modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function generatePrompt(medicamentos, alergias, peso, estatura, IMC, estiloDeVida, diagnostico) {
    const medicamentosStr = medicamentos.map(m =>
        `Nombre Genérico: ${m.nombreGenerico}, Forma Farmacéutica: ${m.formaFarmaceutica}, Dosis: ${m.dosis}, Presentación: ${m.presentacion}, Frecuencia: ${m.frecuencia}, Duración: ${m.duracion}, Indicaciones: ${m.indicaciones}`
    ).join("; ");

    const alergiasStr = alergias.join(", ");

    return `El paciente debe tomar los siguientes medicamentos: ${medicamentosStr}. 
    El paciente tiene alergias a ${alergiasStr}, con un peso de ${peso}kg, una estatura de ${estatura}m, un IMC de ${IMC}, y un estilo de vida ${estiloDeVida}. 
    Además, el diagnóstico médico es: ${diagnostico}.
    Alguna de estas condiciones puede presentar contraindicaciones con los medicamentos indicados. Responde solamente con sí o no y la razon.`;
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
        curpPaciente: formData.get('curp-paciente'),
        diagnostico: formData.get('diagnostico'),  // Capturar diagnóstico

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

    enviarMensaje(recetaData.medicamentos, recetaData.diagnostico); // Enviar diagnóstico a la API
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
