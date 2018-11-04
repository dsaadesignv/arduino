# Switch LED from Processing

## Montage

![](schema-arduino-blink-led.png)

## Code

### Processing

```java
// On importe la librairie serial (pour parler à Arduino)
import processing.serial.*;

// On crée un objet de type Serial (pour parler à Arduino)
Serial myPort;  

void setup() {
	// On crée une fenêtre Processing
  size(200,200);
  
  // On affiche la liste des ports de l'ordi
  // pour trouver le port de la carte Arduino
  println(Serial.list());
  
  // On sélectionne le bon port sur lequel est branchée la carte Arduino
  String portName = Serial.list()[0];
  
  // On crée la connexion avec Arduino 
  myPort = new Serial(this, portName, 9600);
}

void draw() {
	// Si on clique dans la fenêtre…
	
  if (mousePressed == true) {    
	  // On envoie "1" à Arduino                       
  	myPort.write('1');
  } 
  
  // Si on ne clique pas dans la fenêtre…
  
  else {
	  // On envoie "0" à Arduino
  	myPort.write('0');
  }   
}
```

### Arduino

```java
// On stockera dans une variable `val` ce qu'on recevra depuis Processing
char val;

// On définit le numéro du PIN de la LED
int ledPin = 13;

void setup() {
	// On définit le PIN de la LED comme une valeur à envoyer (on va allumer ou éteindre la LED)
	pinMode(ledPin, OUTPUT);
	
	// On crée la communication à 9600 bps
	Serial.begin(9600);
}

void loop() {
	// Si la communication est établie
	// et qu'on a des valeurs à recevoir
 	
 	if (Serial.available()) {
 		// On stocke la valeur dans la variable `val`
   	val = Serial.read();
	}
	
	
	// Si la variable `val` vaut "1"
	
	if (val == '1') {
		digitalWrite(ledPin, HIGH); // On allume la LED
	} 
	
	// Si la variable `val` ne vaut pas "1" (donc sûrement "0" dans notre cas) 
	
	else {
  	digitalWrite(ledPin, LOW); // On éteint la LED
	}
	
	// On attend 10 millisecondes avant de recommencer
	delay(10);
}
```