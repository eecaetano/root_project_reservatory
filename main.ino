/* Projeto: medição de vazão de reservatório com ESP32 e sensor de distância ultrassônico */

/* Headers */ 
#include <WiFi.h> 
#include <PubSubClient.h>  
#include <Ultrasonic.h>

/* Definições - serial de debug */
#define SERIAL_DEBUG_BAUDRATE          115200
#define NUM_PULA_LINHAS_SERIAL_DEGUB   80

/* Definições - sensor ultrassônico */
#define GPIO_TRIGGER    23
#define GPIO_ECHO       22

/* Definições - medição de vazão */
#define PI_APROXIMADO            3.1415927
#define NUM_MEDIDAS_DISTANCIA    100

/* Definições - área do reservatório: */
#define CIRCULO
#define CIRCULO_RAIO         0.05  //[m]

/* Definições - MQTT */
#define TOPICO_PUBLISH   "INCB_ESP32_envia_vazao_volume"  
#define ID_MQTT  "INCB_Cliente_MQTT_vazao_volume"     

/* Variáveis e objetos globais */
Ultrasonic ultrasonic(GPIO_TRIGGER, GPIO_ECHO);
float area_perfil_reservatorio;  
float volume_total_retirado = 0.0;
float vazao_calculada = 0.0;

/* SSID / nome da rede WI-FI que deseja se conectar */
const char* SSID = "Seu_SSID"; 
const char* PASSWORD = "Sua_Senha"; 
const char* BROKER_MQTT = "broker.hivemq.com"; 
int BROKER_PORT = 1883;

/* wi-fi */
WiFiClient espClient;
/* MQTT */
PubSubClient MQTT(espClient);

/* Prototypes */
float calcula_area_perfil_reservatorio(void);
float mede_distancia_em_metros(void);
float media_distancias(void);
float calcula_vazao_e_volume_retirado(void);
void init_wifi(void);
void init_mqtt(void);
void reconnect_wifi(void); 
void verifica_conexoes_wifi_mqtt(void);

/* Implementações */
float calcula_area_perfil_reservatorio(void) {
    float area_calc = 0.0;
    #ifdef CIRCULO
      area_calc = PI_APROXIMADO * CIRCULO_RAIO * CIRCULO_RAIO;    
    #endif
    return area_calc; 
}

float media_distancias(void) {
    int i;
    float soma_medidas = 0.0;
    float media = 0.0;
    for(i=0; i<NUM_MEDIDAS_DISTANCIA; i++)
        soma_medidas = soma_medidas + mede_distancia_em_metros();     
    media = (soma_medidas / NUM_MEDIDAS_DISTANCIA);    
    return media;    
}

float mede_distancia_em_metros(void) {
    float cm_msec = 0.0;
    float dist_metros = 0.0;
    long microsec = ultrasonic.timing();
    cm_msec = ultrasonic.convert(microsec, Ultrasonic::CM);
    dist_metros = (cm_msec / 100.0);
    return dist_metros; 
}

void init_wifi(void) {
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
}

void init_mqtt(void) {
    MQTT.setServer(BROKER_MQTT, BROKER_PORT);
}

void reconnect_wifi() {
    if (WiFi.status() == WL_CONNECTED)
        return;
         
    WiFi.begin(SSID, PASSWORD);
     
    while (WiFi.status() != WL_CONNECTED) {
        delay(100);
        Serial.print(".");
    }
   
    Serial.println();
    Serial.print("Conectado com sucesso na rede ");
    Serial.print(SSID);
    Serial.println("IP obtido: ");
    Serial.println(WiFi.localIP());
}

void verifica_conexoes_wifi_mqtt(void) {
    reconnect_wifi(); 
    if (!MQTT.connected()) 
        reconnect_mqtt(); 
}

void setup() {
    Serial.begin(SERIAL_DEBUG_BAUDRATE);
    area_perfil_reservatorio = calcula_area_perfil_reservatorio();
    volume_total_retirado = 0.0;
    init_wifi();
    init_mqtt();
}

void loop() {
    char msg_mqtt[100] = {0};
    calcula_vazao_e_volume_retirado();
    verifica_conexoes_wifi_mqtt();
    sprintf(msg_mqtt, "Vazao: %.2fm^3/s - Volume: %.2fm^3", vazao_calculada, volume_total_retirado);
    MQTT.publish(TOPICO_PUBLISH, msg_mqtt);
    MQTT.loop();
}
