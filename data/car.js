class Car {
  #brand;
  #model;
  speed = 0;

  isTrunkOpen = false;

  constructor(carItem) {
    this.#brand = carItem.brand;
    this.#model = carItem.model;
    this.speed = carItem.carSpeed ? this.speed = carItem.carSpeed : this.speed = 0;
    this.displayInfo();
  }

  openTrunk() {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }

  trunkInfo(){
    return  this.isTrunkOpen ? 'Open trunk' : 'Close trunk';
  }

  go() {
    this.speed += 5;

    if ( (!this.isTrunkOpen) && (this.speed > 200 ) ) {
    this.speed = 200;
  }
}

  brake(){
    this.speed -= 5;
    if (this.speed < 0) { 
    this.speed  = 0;
    }
  }

  displayInfo(){
    console.log( `
      Brand: ${this.#brand},
      Model: ${this.#model},
      Speed: ${this.speed} km/h
     Trunk: ${this.trunkInfo()}
      `);
  }
}
 
const car1 = new Car({brand: 'Toyota', model : 'Corolla', carSpeed : 200});
car1.brake();
car1.displayInfo();
car1.brand = 'Nano';
car1.model= 'model';
car1.displayInfo();
const car2 = new Car({brand: 'Tesla', model: 'Tesla', carSpeed : 2});
const Car3 = new Car({brand : 'Mercedez', model : 'MMM', carSpeed : 0});

class RaceCar extends Car {
  acceleration;

  constructor(carItem) {
    super(carItem);
    this.acceleration = carItem.acceleration;
  }

  trunkInfo(){
    return 'race cars dont have trunk';
  }

  go(){
    this.speed += this.acceleration;

    if ( this.speed > 300  ) {
      this.speed = 300;
    } 
  }
}

  const raceCar1 = new RaceCar({brand: 'McLaren', model : 'F1',  acceleration : 20});
  raceCar1.go();
  raceCar1.brake();
  raceCar1.displayInfo();