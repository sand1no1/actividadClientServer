const express = require('express');
const app = express();

app.get("/hello", (req, res) => {
    res.json({message : "Hello world"});
});

app.listen(3000, () => {
    console.log("El servidor esta corriendo en el puerto 3000");
});