const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/operacion", (req, res) => {
  let { num1, num2, op } = req.query;

  if (!num1 || !num2 || !op) {
    return res.status(400).json({ error: "Faltan parámetros" });
  }

  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).json({ error: "Valores inválidos" });
  }

  let result;
  switch (op) {
    case "+":
      result = n1 + n2;
      break;
    case "-":
      result = n1 - n2;
      break;
    case "*":
      result = n1 * n2;
      break;
    case "/":
      if (n2 === 0) {
        return res.status(400).json({ error: "No se puede dividir entre 0" });
      }
      result = n1 / n2;
      break;
    default:
      return res.status(400).json({ error: "Operación no válida" });
  }

  res.json({ result });
});

app.get("", (req, res) => {
    res.json({message : "Hello world"});
});

app.listen(3001, () => {
  console.log(`Servidor corriendo en el puerto: 3001`);
});
