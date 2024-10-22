const express = require('express');
const path = require('path');
const mqttHandler = require('./modules/mqttHandler');

const app = express();
const port = 3000;

// Serve arquivos estáticos da pasta 'www'
app.use(express.static(path.join(__dirname, 'www')));

// Inicializa o MQTT
mqttHandler.start();

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
