function VehicleConstructor(name, wheels, passengers, speed) {
  this.distance_traveled = 0;
  this.name = name;
  this.wheels = wheels;
  this.passengers = passengers;
  this.speed = speed;
  this.vin = createVin();
}

VehicleConstructor.prototype.move = function() {
  this.updateDistanceTraveled();
  this.makeNoise();
  return this;
}
VehicleConstructor.prototype.checkMiles = function() {
  console.log(this.distance_traveled);
  return this;
}
VehicleConstructor.prototype.makeNoise = function () {
  console.log("Skeet Skeet");
  return this;
}

VehicleConstructor.prototype.updateDistanceTraveled = function() {
  this.distance_traveled += this.speed;
}

function createVin() {
  var vin = "";
  for(var i = 0; i < 17; i++) {
    vin += Math.floor(Math.random()*10);
  }
  return vin;
}

var bike = new VehicleConstructor("bike", 2, 1, 1);
bike.makeNoise = function() {
  console.log("Skeet skeet");
}

var sedan = new VehicleConstructor("sedan", 4, 5, 2);
sedan.makeNoise = function() {
  console.log("Zoom zoom");
}

var bus = new VehicleConstructor("bus", 8, 20, 2);
bus.addPassengers = function(new_passengers) {
  this.passengers += new_passengers;
}

// console.log(bike);
// console.log(sedan);
// console.log(bus);

bus.addPassengers(20);
console.log(bus.passengers);
bus.addPassengers(400);
console.log(bus.passengers);
console.log(bus.speed);
sedan.move().move().move();
sedan.checkMiles();
console.log(sedan.speed);
console.log("vin:" + sedan.vin)
