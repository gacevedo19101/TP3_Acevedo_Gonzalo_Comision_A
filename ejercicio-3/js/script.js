// Obtener referencias a los elementos del DOM
const tareasCompletadasLista = document.getElementById('tareasCompletadasLista');
const loadingMessage = document.getElementById('loadingMessage');
const errorMessage = document.getElementById('errorMessage');

// URL de la API de JSONPlaceholder para las tareas (todos)
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

/**
 * Función asíncrona para obtener y mostrar las tareas completadas.
 */
async function getCompletedTodos() {
    // Mostrar mensaje de carga y limpiar mensajes anteriores
    loadingMessage.style.display = 'block';
    errorMessage.textContent = '';
    tareasCompletadasLista.innerHTML = '';

    try {
        // 1. Realizar la petición GET a la API
        const response = await fetch(API_URL);

        // Verificar si la respuesta fue exitosa (código 200 OK)
        if (!response.ok) {
            // Si hay un error HTTP, lanzar una excepción
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        // Convertir la respuesta a formato JSON
        const data = await response.json();

        // 2. Filtrar las tareas que han sido completadas (completed: true)
        // Usamos .filter() para crear un nuevo array solo con las tareas completadas.
        const tareasCompletadas = data.filter(todo => todo.completed === true);

        // Ocultar el mensaje de carga
        loadingMessage.style.display = 'none';

        // 3. Mostrar las tareas completadas en el HTML
        // Usamos .forEach() para iterar sobre cada tarea completada.
        if (tareasCompletadas.length > 0) {
            tareasCompletadas.forEach(todo => {
                const li = document.createElement('li');
                // Mostramos el título de la tarea
                li.textContent = todo.title;
                tareasCompletadasLista.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No se encontraron tareas completadas.';
            tareasCompletadasLista.appendChild(li);
        }

    } catch (error) {
        // Capturar y mostrar cualquier error que ocurra durante la petición o el procesamiento
        console.error('Hubo un error al obtener las tareas:', error);
        loadingMessage.style.display = 'none'; // Ocultar mensaje de carga
        errorMessage.textContent = `Error al cargar las tareas: ${error.message}. Por favor, inténtalo de nuevo más tarde.`;
    }
}

// Ejecutar la función para obtener las tareas cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', getCompletedTodos);