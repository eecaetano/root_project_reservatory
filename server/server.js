const express = require('express');
const path = require('path');
const mqttHandler = require('./mqttHandler');

const app = express();
const port = 3000;

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Inicializa o MQTT
mqttHandler.start();

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
