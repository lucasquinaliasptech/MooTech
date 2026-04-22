#include <DHT.h>

#define TIPO_SENSOR DHT11
const int PINO_SENSOR_DHT11 = A0;

DHT sensorDHT(PINO_SENSOR_DHT11, TIPO_SENSOR);


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  sensorDHT.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  float umidade = sensorDHT.readHumidity();
  float temperatura = sensorDHT.readTemperature();

  if (isnan(temperatura) || isnan(umidade)) {
    Serial.println("Erro ao ler o sensor");
  } else {
   // Serial.print("Umidade ");
    Serial.print(umidade);
   // Serial.print(" % ");
   // Serial.print("Temperatura ");
    Serial.print(";");

    Serial.print(temperatura);
   // Serial.print(" °c");
    Serial.println(";");
 
  }

  delay(1000);
}
