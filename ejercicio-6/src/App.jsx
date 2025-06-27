import { useState } from 'react';
import './App.css';

function App() {
  // Estados para peso y altura
  const [weight, setWeight] = useState(''); // en kg
  const [height, setHeight] = useState(''); // en metros
  // Estado para el IMC calculado
  const [imc, setImc] = useState(null);
  // Estado para el mensaje de resultado (texto y clase CSS para el color)
  const [message, setMessage] = useState({ text: '', className: '' });

  // Manejador para el cambio del peso
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
    setImc(null); // Limpiar IMC y mensaje al cambiar inputs
    setMessage({ text: '', className: '' });
  };

  // Manejador para el cambio de la altura
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    setImc(null); // Limpiar IMC y mensaje al cambiar inputs
    setMessage({ text: '', className: '' });
  };

  // Función para calcular el IMC
  const calculateImc = () => {
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);

    // Validar entradas
    if (isNaN(parsedWeight) || isNaN(parsedHeight) || parsedWeight <= 0 || parsedHeight <= 0) {
      setMessage({ text: 'Por favor, ingresa valores válidos de peso y altura.', className: 'message-red' });
      setImc(null);
      return;
    }

    // IMC = peso (kg) / (altura (m) * altura (m))
    const calculatedImc = parsedWeight / (parsedHeight * parsedHeight);
    setImc(calculatedImc.toFixed(2)); // Redondear a 2 decimales

    // Determinar el mensaje y la clase CSS según el IMC
    if (calculatedImc < 18.5) {
      setMessage({ text: `IMC: ${calculatedImc.toFixed(2)} - Nivel bajo.`, className: 'message-yellow' });
    } else if (calculatedImc >= 18.5 && calculatedImc <= 24.9) {
      setMessage({ text: `IMC: ${calculatedImc.toFixed(2)} - Nivel normal.`, className: 'message-green' });
    } else if (calculatedImc >= 25 && calculatedImc <= 29.9) {
      setMessage({ text: `IMC: ${calculatedImc.toFixed(2)} - Nivel de sobrepeso.`, className: 'message-orange' });
    } else { // IMC >= 30
      setMessage({ text: `IMC: ${calculatedImc.toFixed(2)} - Nivel de obesidad.`, className: 'message-red' });
    }
  };

  return (
    <div className="imc-container">
      <h1>Calculadora de IMC</h1>
      <div className="input-group">
        <label htmlFor="weight">Peso (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={handleWeightChange}
          placeholder="Ej: 70"
          step="0.1"
        />
      </div>

      <div className="input-group">
        <label htmlFor="height">Altura (m):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={handleHeightChange}
          placeholder="Ej: 1.75"
          step="0.01"
        />
      </div>

      <button onClick={calculateImc}>
        Calcular IMC
      </button>

      {/* Mostrar el mensaje solo si hay un texto */}
      {message.text && (
        <div className={`result-message ${message.className}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default App;