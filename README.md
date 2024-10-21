# Projeto de Medição de Vazão com ESP32 e Sensor Ultrassônico

Este projeto mede a vazão de um reservatório utilizando um ESP32 e um sensor de distância ultrassônico, e envia os dados para um servidor Node.js via MQTT. A interface web exibe os dados de vazão e volume total retirado do reservatório.

## Estrutura de Diretórios

project-root/
│
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── server/
│   ├── server.js
│   └── mqttHandler.js
│
├── node_modules/
│
├── package.json
└── package-lock.json

## Configuração do Projeto

### Passo 1: Inicializar o Projeto Node.js

No diretório raiz do projeto, execute:
```bash
npm init -y
