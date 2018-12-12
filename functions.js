var Gpio = require('pigpio').Gpio;



class Lights {

    constructor(delay) {
      this.ledRed = new Gpio(27, {mode: Gpio.OUTPUT});
      this.ledGreen = new Gpio(17, {mode: Gpio.OUTPUT});
      this.ledBlue = new Gpio(22, {mode: Gpio.OUTPUT});

      this.delay = delay;
      this.fadeInResolve = null;
      this.fadeOutResolve = null;
    }
    
    setColor(color, dutyCycle) {
      switch (color) {
        case "RED":
          this.ledRed.pwmWrite(dutyCycle);
          break;
        case "BLUE":
          this.ledBlue.pwmWrite(dutyCycle);
          break;
        case "GREEN":
          this.ledGreen.pwmWrite(dutyCycle);
          break;
        default:
          break;
      }
    }

    fadeIn(color, dutyCycle) {
      return new Promise((resolve, reject) => {
        if (!this.fadeInResolve) {
          this.fadeInResolve = resolve
        }
        console.log(color + " fadein begin");
        setTimeout(() => {

          this.setColor(color, dutyCycle);
          
          console.log(dutyCycle);
          dutyCycle += 5;
          if (dutyCycle <= 255) this.fadeIn(color, dutyCycle);
          else this.fadeInResolve(this)
        }, this.delay);
      });
    }
  
    fadeOut(color, dutyCycle) {
      return new Promise((resolve, reject) => {
        if (!this.fadeOutResolve) {
          this.fadeOutResolve = resolve
        }

        console.log(color + " fadeout begin");
  
        setTimeout(() => {
          this.setColor(color, dutyCycle);
          console.log(dutyCycle);
          dutyCycle -= 5;
          if (dutyCycle >= 0) this.fadeOut(color, dutyCycle);
          else this.fadeOutResolve(this)
        }, this.delay);
      });
    }
  }
  
  
  var lights = new Lights(50);
  
  // lights.fadeIn("blue", 0).then(() => {
  //   console.log('Fade in done')
  //   lights.fadeOut("blue", 255).then(() => {
  //     console.log('Fade out done')
  //   })
  // });

  // lights.fadeIn("BLUE", 0).then(() => {
  //   lights.fadeOut("BLUE", 255).then(() => {
  //     lights.fadeIn("RED", 0).then(() => {
  //       lights.fadeOut("RED", 255);
  //     })
  //   })
  // });

  lights.fadeIn("BLUE", 0).then(() => {
    lights.fadeOut("BLUE, 255");
  }).then(() => {
    lights.fadeIn("RED", 0).then(() => {
      lights.fadeOut("RED", 255);
    })
  })