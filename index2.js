var Gpio = require('pigpio').Gpio;
console.log('Define each color from RGB Strip light.');
//For each color you need to specify on what GPIO pin is connected and that we will use in mode OUTPUT
var ledRed = new Gpio(27, {mode: Gpio.OUTPUT});
var ledGreen = new Gpio(17, {mode: Gpio.OUTPUT});
var ledBlue = new Gpio(22, {mode: Gpio.OUTPUT});

let redDutyCycle = 0;
let blueDutyCycle = 0;
let greenDutyCycle = 0;

for (let redIndex = 0; redIndex <= 255; redIndex+5) {
    console.log(redIndex);
    for (let blueIndex = 0; blueIndex <= 255; blueIndex+5) {
        console.log(blueIndex);
        for (let greenIndex = 0; greenIndex <= 255; greenIndex+5) {
            console.log(greenIndex);            
        }
    }
}

fade_on(redDutyCycle);


function fade_on(dutyCycle) {
    for (let index = 0; index < 255; index+=5) {
        dutyCycle = index;
        console.log(dutyCycle);
    }
}

console.log(redDutyCycle);

// setInterval(() => {
//     ledRed.pwmWrite(redDutyCycle);
//     redDutyCycle +=3;

//     if (redDutyCycle > 255) {
//         redDutyCycle =0;
//         while (blueDutyCycle <= 255) {
//             blueDutyCycle += 3
//         }
//     }
// },50);

//You can set a brightness value between 0 and 255 
//where 0 is off and 255 is maximum brightness
/*
ledRed.pwmWrite(255);
console.log("Let's start other colors too");
ledGreen.pwmWrite(255);
ledBlue.pwmWrite(255);
//Stop the lights after 5 seconds
setTimeout(function(){
    console.log('Stop all colors after 5 seconds');
    ledRed.pwmWrite(0);
    ledGreen.pwmWrite(0);  
    ledBlue.pwmWrite(0);
}, 5000);
*/