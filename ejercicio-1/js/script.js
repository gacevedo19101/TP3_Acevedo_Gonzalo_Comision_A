const numero1Input = document.getElementById('numero1');
const numero2Input = document.getElementById('numero2');
const operacionSelect = document.getElementById('operacion');
const btnCalcular = document.getElementById('btnCalcular');
const resultadoDiv = document.getElementById('resultado');

// Función para deshabilitar/habilitar el botón "Calcular"
operacionSelect.addEventListener('change', () => {
    if (operacionSelect.value === 'division') {
        btnCalcular.disabled = true;
        resultadoDiv.textContent = 'La división está deshabilitada.';
        resultadoDiv.style.color = 'red';
    } else {
        btnCalcular.disabled = false;
        resultadoDiv.textContent = '';
        resultadoDiv.style.color = '#333';
    }
});

// Función para realizar la operación al hacer clic en el botón
btnCalcular.addEventListener('click', () => {
    const num1 = parseFloat(numero1Input.value);
    const num2 = parseFloat(numero2Input.value);
    const operacion = operacionSelect.value;
    let resultado;

    if (isNaN(num1) || isNaN(num2)) {
        resultadoDiv.textContent = 'Por favor, ingrese números válidos.';
        resultadoDiv.style.color = 'red';
        return;
    }

    switch (operacion) {
        case 'suma':
            resultado = num1 + num2;
            break;
        case 'resta':
            resultado = num1 - num2;
            break;
        case 'multiplicacion':
            resultado = num1 * num2;
            break;
        // La división se maneja con la deshabilitación del botón,
        // pero si por alguna razón se llega aquí, no debería ejecutarse.
        case 'division':
            resultadoDiv.textContent = 'La división está deshabilitada.';
            resultadoDiv.style.color = 'red';
            return;
        default:
            resultadoDiv.textContent = 'Operación no válida.';
            resultadoDiv.style.color = 'red';
            return;
    }

    resultadoDiv.textContent = `Resultado: ${resultado}`;
    resultadoDiv.style.color = '#333';
});