const mqtt = require('mqtt');
const SerialPort = require('serialport');
const net = require('net');

const client = mqtt.connect('mqtt://broker.hivemq.com');
const TOPICO_PUBLISH = 'INCB_ESP32_envia_vazao_volume';

// Configuração da porta serial (USB)
const port = new SerialPort('/dev/ttyUSB0', { baudRate: 115200 });

// Configuração do cliente TCP/IP
const tcpClient = new net.Socket();
tcpClient.connect(12345, '127.0.0.1', () => {
    console.log('Conectado ao servidor TCP/IP');
});

module.exports = {
    start: function() {
        client.on('connect', () => {
            console.log('Conectado ao broker MQTT');
        });

        client.on('message', (topic, message) => {
            if (topic === TOPICO_PUBLISH) {
                const data = message.toString();
                console.log(`Mensagem recebida: ${data}`);

                // Enviar dados via USB
                port.write(data, (err) => {
                    if (err) {
                        return console.log('Erro ao enviar dados via USB:', err.message);
                    }
                    console.log('Dados enviados via USB');
                });

                // Enviar dados via TCP/IP
                tcpClient.write(data, (err) => {
                    if (err) {
                        return console.log('Erro ao enviar dados via TCP/IP:', err.message);
                    }
                    console.log('Dados enviados via TCP/IP');
                });
            }
        });

        client.subscribe(TOPICO_PUBLISH, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_PUBLISH}`);
            }
        });
    }
};
