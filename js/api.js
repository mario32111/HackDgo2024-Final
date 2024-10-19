async function enviarMensaje() {
    const fetch = (await import('node-fetch')).default;

    const alergias = ["Penicilina", "Polen", "Mariscos"];
    const mensaje = generatePrompt("Ibuprofeno", "XYZ Lab", "Tabletas", "400mg", "Cada 8 horas", "7 días", alergias, 70, 1.75, 22.9, "Sedentario");

    const API_KEY = 'PONER API KEY';
    const API_URL = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: mensaje }],
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            console.log(data.choices[0].message.content);
        } else {
            console.log("No se pudo obtener una respuesta de la API.");
        }
    } catch (error) {
        console.error('Error al obtener respuesta de ChatGPT:', error);
    }
}

function generatePrompt(medicamento, laboratorio, presentacion, dosis, frecuencia, duracion, alergias, peso, estatura, IMC, estiloDeVida) {
    return `El paciente debe tomar ${medicamento} (${laboratorio}) en presentación de ${presentacion}, con una dosis de ${dosis}, cada ${frecuencia} durante ${duracion}. 
    El paciente tiene alergias a ${alergias.join(", ")}, con un peso de ${peso}kg, una estatura de ${estatura}m, un IMC de ${IMC}, y un estilo de vida ${estiloDeVida}. Alguna de todas estas condiciones en la persona puede llegar a presentar contraindicaciones el consumo de sus medicamentos. Responde con si o no.`;
}

// Ejemplo de uso
enviarMensaje();
