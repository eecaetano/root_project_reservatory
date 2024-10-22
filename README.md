# <h1>Projeto de Monitoramento de Reservatório</h1>
Este projeto utiliza um ESP32 e um sensor de distância ultrassônico para medir a vazão de um reservatório. Os dados são enviados para um servidor via MQTT e exibidos em uma interface web.

Estrutura do Projeto
meu_projeto_reservatorio/
├── esp32/
│   ├── main.ino
│   └── config.h
├── servidor/
│   ├── init.lua
│   ├── server.lua
│   ├── data.lua
│   ├── modules/
│   │   ├── wifi.lua
│   │   ├── mqttHandler.js
│   │   ├── sensor.lua
│   └── www/
│       ├── index.html
│       ├── style.css
│       └── script.js
└── README.md

Descrição dos Arquivos
ESP32
main.ino: Código principal para o ESP32 que mede a distância usando um sensor ultrassônico e envia os dados para o servidor via MQTT.
config.h: Arquivo de configuração contendo as credenciais Wi-Fi e o endereço do servidor.
Servidor (NodeMCU)
init.lua: Inicializa o servidor.
server.lua: Configura o servidor para receber dados do ESP32 e servir a interface web.
data.lua: Armazena os dados recebidos do ESP32.
Módulos
wifi.lua: Configuração e conexão Wi-Fi.
mqttHandler.js: Gerencia a conexão e comunicação MQTT.
sensor.lua: Código para leitura de sensores (se necessário).
Interface Web
index.html: Página principal que exibe os dados de vazão e volume total retirado do reservatório.
style.css: Estilos para a interface web.
script.js: Script para atualizar os dados na interface web.
Configuração
ESP32
Configuração Wi-Fi: Edite o arquivo config.h com as credenciais da sua rede Wi-Fi e o endereço do servidor:
const char* ssid = "Seu_SSID";
const char* password = "Sua_Senha";
const char* serverName = "http://seu_servidor.com/data";

Carregar o Código: Use a IDE Arduino para carregar o código main.ino na placa ESP32.
Servidor
Configuração do Servidor: Certifique-se de que o NodeMCU está configurado para rodar scripts Lua.
Carregar os Arquivos: Carregue os arquivos init.lua, server.lua, data.lua e o conteúdo da pasta www e modules no NodeMCU.
Node.js
Instale as Dependências:
npm install express mqtt

Inicie o Servidor:
node server.js

Uso
Iniciar o ESP32: Conecte o ESP32 à alimentação e ele começará a medir a distância e enviar os dados para o servidor.
Acessar a Interface Web: Abra um navegador e acesse o endereço do servidor para visualizar os dados de vazão e volume total.
