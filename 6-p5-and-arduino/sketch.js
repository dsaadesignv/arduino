var b = p5.board('/dev/cu.usbmodem1421', 'arduino');
var led;

function setup(){
  led = b.pin(2, 'LED');
}

function keyPressed() {
  if (keyCode === LEFT_ARROW){
    led.on();
  } else if (keyCode === RIGHT_ARROW) {
    led.off();
  } else if (keyCode === UP_ARROW){
    led.blink();
  } else if (keyCode === DOWN_ARROW) {
    led.noBlink();
  }
}