class Lights {
    constructor(delay) {
      this.blue = 0;
      this.green = 0;
      this.red = 0;
      this.delay = delay;
      this.fadeInResolve = null;
      this.fadeOutResolve = null;
    }
  
    fadeIn(color, i) {
      return new Promise((resolve, reject) => {
        if (!this.fadeInResolve) {
          this.fadeInResolve = resolve
        }
  
        setTimeout(() => {
          this[color] = i;
          console.log(this[color]);
          i += 5;
          if (i <= 255) this.fadeIn(color, i);
          else this.fadeInResolve(this)
        }, this.delay);
      });
    }
  
    fadeOut(color, i) {
      return new Promise((resolve, reject) => {
        if (!this.fadeOutResolve) {
          this.fadeOutResolve = resolve
        }
  
        setTimeout(() => {
          this[color] = i;
          console.log(this[color]);
          i -= 5;
          if (i >= 0) this.fadeOut(color, i);
          else this.fadeOutResolve(this)
        }, this.delay);
      });
    }
  }
  
  
  var lights = new Lights(50);
  
  lights.fadeIn("blue", 0).then(() => {
    console.log('Fade in done')
    lights.fadeOut("blue", 255).then(() => {
      console.log('Fade out done')
    })
  });