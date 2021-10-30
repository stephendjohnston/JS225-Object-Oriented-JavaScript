"use strict";

// All cars start out not moving, and sedans
// can accelerate about 8 miles per hour per second (mph/s).

let sedan = makeCar(8, 6);
let coupe = makeCar(12, 5);
let hatchback = makeCar(9, 7);

function makeCar(accelRate, brakeRate) {
  return {
    speed: 0,
    accelRate,
    brakeRate,

    accelerate() {
      this.speed += this.rate;
    },

    brake() {
      this.speed -= brakeRate;
      if (this.speed < 0) this.speed = 0;
    }
  }
}

sedan.accelerate();
console.log(sedan.speed)
sedan.brake();
console.log(sedan.speed)
sedan.brake();
console.log(sedan.speed)
