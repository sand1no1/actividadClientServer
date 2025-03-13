"use client";

import { useState } from "react";

export default function Home() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = async () => {
    if (!num1 || !num2 || !operation) {
      setError("Por favor, completa todos los campos.");
      setResult(null);
      return;
    }

    setError(null);

    const response = await fetch(
      `http://localhost:3001/operacion?num1=${num1}&num2=${num2}&op=${encodeURIComponent(operation)}`
    );
    const data = await response.json();
    
    if (data.error) {
      setError(data.error);
      setResult(null);
    } else {
      setResult(data.result);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex space-x-4 p-4 bg-white rounded-lg shadow-md">
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="border p-2 rounded"
          placeholder="Número 1"
        />
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="" disabled>Seleccione una operación</option>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">x</option>
          <option value="/">÷</option>
        </select>
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="border p-2 rounded"
          placeholder="Número 2"
        />
      </div>
      <button
        onClick={calculate}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded shadow"
      >
        Calcular
      </button>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      {result &&  
        <div className="mt-4 text-xl font-semibold">
          Resultado: {result}
        </div>
      }

    </div>
  );
}
