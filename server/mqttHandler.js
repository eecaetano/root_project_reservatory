const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

const topic = 'INCB_ESP32_envia_vazao_volume';

client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Inscrito no tópico ${topic}`);
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`Mensagem recebida no tópico ${topic}: ${message.toString()}`);
  // Aqui você pode adicionar lógica para processar a mensagem recebida
});

module.exports = client;
