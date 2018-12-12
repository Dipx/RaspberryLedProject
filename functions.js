var Gpio = require('pigpio').Gpio;

var ledRed = new Gpio(27, {mode: Gpio.OUTPUT});
var ledGreen = new Gpio(17, {mode: Gpio.OUTPUT});
var ledBlue = new Gpio(22, {mode: Gpio.OUTPUT});


class Lights {
  constructor(delay) {
    this.delay = delay;
  }

  setColor(color, dutyCycle) {
    switch (color) {
      case "RED":
        //ledRed.pwmWrite(dutyCycle);
        break;
      case "BLUE":
        //ledBlue.pwmWrite(dutyCycle);
        break;
      case "GREEN":
        //ledGreen.pwmWrite(dutyCycle);
        break;
      default:
        break;
    }
  }

  fadeIn(color, dutyCycle) {
    return new Promise((resolve, reject) => {
      if (!this[`fadeIn${color}`]) {
        this[`fadeIn${color}`] = resolve
      }
      setTimeout(() => {
        console.log(`[FadeIn] ${color} set to ${dutyCycle}`);
        this.setColor(color, dutyCycle);
        dutyCycle += 5;
        if (dutyCycle <= 255) this.fadeIn(color, dutyCycle);
        else {
        	this[`fadeIn${color}`](this);
          this[`fadeIn${color}`] = null;
        }
      }, this.delay);
    });
  }

  fadeOut(color, dutyCycle) {
    return new Promise((resolve, reject) => {
      if (!this[`fadeOut${color}`]) {
        this[`fadeOut${color}`] = resolve
      }


      setTimeout(() => {
        console.log(`[FadeOut] ${color} set to ${dutyCycle}`);
        this.setColor(color, dutyCycle);
        dutyCycle -= 5;
        if (dutyCycle >= 0) this.fadeOut(color, dutyCycle);
        else {
        	this[`fadeOut${color}`](this);
          this[`fadeOut${color}`] = null;
        }
      }, this.delay);
    });
  }
}


var lights = new Lights(50);

(async () => {
	await Promise.all([
  	lights.fadeIn('BLUE', 0),
    lights.fadeIn('RED', 100)
   ])
   await lights.fadeOut('RED', 150);
   console.log('DOne')
})()

