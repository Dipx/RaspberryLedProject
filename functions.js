class Lights {
  constructor(delay) {
    this.delay = delay;
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

  fadeIn(color, from, to) {
    return new Promise((resolve, reject) => {
      if (!this[`fadeIn${color}`]) {
        this[`fadeIn${color}`] = resolve
      }
      setTimeout(() => {
        //console.log(`[FadeIn] ${color} set to ${from}`);
        this.setColor(color, from);
        from += 5;
        if (from <= to) this.fadeIn(color, from);
        else {
        	this[`fadeIn${color}`](this);
          this[`fadeIn${color}`] = null;
        }
      }, this.delay);
    });
  }

  fadeOut(color, from, to) {
    return new Promise((resolve, reject) => {
      if (!this[`fadeOut${color}`]) {
        this[`fadeOut${color}`] = resolve
      }


      setTimeout(() => {
        //console.log(`[FadeOut] ${color} set to ${from}`);
        this.setColor(color, from);
        from -= 5;
        if (from >= to) this.fadeOut(color, from);
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
  	lights.fadeIn('BLUE', 0, 255),
    lights.fadeIn('RED', 100, 255)
   ])
   await lights.fadeOut('RED', 150, 0);
   console.log('Done')
})()

