import { useState } from 'react';
import './App.css';

function App() {
  // Estados para los dos números de entrada
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  // Estado para la operación seleccionada (por defecto 'suma')
  const [operation, setOperation] = useState('suma');
  // Estado para el resultado del cálculo
  const [result, setResult] = useState('');

  // Manejador para el cambio del primer número
  const handleNum1Change = (e) => {
    setNum1(e.target.value);
  };

  // Manejador para el cambio del segundo número
  const handleNum2Change = (e) => {
    setNum2(e.target.value);
  };

  // Manejador para el cambio de la operación seleccionada
  const handleOperationChange = (e) => {
    setOperation(e.target.value);
    // Limpiar el resultado cada vez que se cambia la operación
    setResult('');
  };

  // Manejador para el clic en el botón "Calcular"
  const handleCalculateClick = () => {
    // Convertir los inputs a números
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    // Validar si los inputs son números válidos
    if (isNaN(number1) || isNaN(number2)) {
      setResult('Por favor, ingresa números válidos.');
      return;
    }

    let calculatedResult;
    switch (operation) {
      case 'suma':
        calculatedResult = number1 + number2;
        break;
      case 'resta':
        calculatedResult = number1 - number2;
        break;
      case 'multiplicacion':
        calculatedResult = number1 * number2;
        break;
      case 'division':
        // Condición especial: Evitar división por cero
        if (number2 === 0) {
          setResult('No se puede dividir por cero.');
          return;
        }
        calculatedResult = number1 / number2;
        break;
      default:
        calculatedResult = 'Operación no válida';
    }

    setResult(`Resultado: ${calculatedResult}`);
  };

  // Determinar si el botón "Calcular" debe estar deshabilitado
  // Se deshabilita si la operación es 'division'
  const isCalculateButtonDisabled = operation === 'division';

  return (
    <div className="calculator-container">
      <h1>Calculadora</h1>
      <div className="input-group">
        <label htmlFor="num1">Número 1:</label>
        <input
          type="number"
          id="num1"
          value={num1}
          onChange={handleNum1Change}
          placeholder="Ingresa el primer número"
        />
      </div>

      <div className="input-group">
        <label htmlFor="num2">Número 2:</label>
        <input
          type="number"
          id="num2"
          value={num2}
          onChange={handleNum2Change}
          placeholder="Ingresa el segundo número"
        />
      </div>

      <div className="input-group">
        <label htmlFor="operation">Operación:</label>
        <select id="operation" value={operation} onChange={handleOperationChange}>
          <option value="suma">Suma</option>
          <option value="resta">Resta</option>
          <option value="multiplicacion">Multiplicación</option>
          <option value="division">División</option>
        </select>
      </div>

      <button onClick={handleCalculateClick} disabled={isCalculateButtonDisabled}>
        Calcular
      </button>

      {result && <div className="result">{result}</div>}
    </div>
  );
}

export default App;