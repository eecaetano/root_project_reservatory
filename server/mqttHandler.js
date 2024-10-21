const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

const TOPICO_PUBLISH = 'INCB_ESP32_envia_vazao_volume';

module.exports = {
    start: function() {
        client.on('connect', () => {
            console.log('Conectado ao broker MQTT');
        });

        client.on('message', (topic, message) => {
            if (topic === TOPICO_PUBLISH) {
                console.log(`Mensagem recebida: ${message.toString()}`);
                // Aqui você pode adicionar lógica para enviar os dados para a interface web
            }
        });

        client.subscribe(TOPICO_PUBLISH, (err) => {
            if (!err) {
                console.log(`Inscrito no tópico ${TOPICO_PUBLISH}`);
            }
        });
    }
};
