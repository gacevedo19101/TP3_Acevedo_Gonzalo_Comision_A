import { useState } from 'react'; // Importamos el hook useState para manejar el estado
import './App.css'; // Estilos para este componente

function App() {
  // Declaramos un estado para controlar qué botón está habilitado.
  // `true` significa que el botón izquierdo está habilitado, `false` significa que el derecho lo está.
  const [isLeftEnabled, setIsLeftEnabled] = useState(true);

  // Función que se ejecuta al hacer clic en el botón izquierdo
  const handleLeftClick = () => {
    // Si el botón izquierdo está habilitado, lo deshabilitamos y habilitamos el derecho
    if (isLeftEnabled) {
      setIsLeftEnabled(false);
    }
  };

  // Función que se ejecuta al hacer clic en el botón derecho
  const handleRightClick = () => {
    // Si el botón derecho está habilitado, lo deshabilitamos y habilitamos el izquierdo
    if (!isLeftEnabled) { // !isLeftEnabled significa que el derecho está habilitado
      setIsLeftEnabled(true);
    }
  };

  return (
    <div className="button-container">
      {/* Botón Izquierdo */}
      <button
        className="button-left"
        onClick={handleLeftClick}
        disabled={!isLeftEnabled} // El botón está deshabilitado si `isLeftEnabled` es false
      >
        Izquierdo
      </button>

      {/* Botón Derecho */}
      <button
        className="button-right"
        onClick={handleRightClick}
        disabled={isLeftEnabled} // El botón está deshabilitado si `isLeftEnabled` es true
      >
        Derecho
      </button>
    </div>
  );
}

export default App; // Exportamos el componente App para que pueda ser usado en main.jsx