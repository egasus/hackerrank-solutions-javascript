class Spot {
    constructor(template) {
      Object.assign(this, template);
    }
  
    fill(vehicle) {
      this.vehicle = vehicle
    }
    
    isFree(){
      return !this.vehicle
    }
  
    getVehicle() {
      return this.vehicle
    }
  
    release() {
      this.vehicle = undefined;
    }
}
  
class ParkingLotManager {

    constructor(vehicleTypes){
        this.spots = [];
        this.vehicles = new Map();
    }

    addSpots(vehicleType, idList){
        idList.forEach(id =>{
        this.spots.push(new Spot({vehicleType, id}));
        });
    }

    hasVehicle(licenseId){
        return this.vehicles.has(licenseId);
    }

    placeVehicle(vehicle) {
        if(this.hasVehicle(vehicle.licenseId)){ //Do some UI stuff here, dont throw..
            console.log(`There is already a vehicle here with id ${vehicle.licenseId}`);
            return;
        } 
            
        const spot = this.spots.find(spot => (vehicle instanceof spot.vehicleType && spot.isFree()));
        
        if(spot){
            spot.fill(vehicle)
            this.vehicles.set(vehicle.licenseId, spot);
            console.log(`Vehicle parked at ${spot.id}`)
        } else{
            console.log(`There is no free spot for ${vehicle.licenseId}`);
            
        }
    }

    removeVehicle(vehicle) {
        const spot = this.vehicles.get(vehicle.licenseId);
        if (spot){
        spot.release();
        this.vehicles.delete(vehicle.licenseId);      
        }else{
        console.log("There is no vehicle with that license id")  
        }
    }

}

class Vehicle {
    constructor(id) {
        this.licenseId = id
    }
}

class Motorcycle extends Vehicle {
    constructor(id) {
        super(id)
        this.size = 1
    }
}
  
class Car extends Vehicle {
    constructor(id) {
        super(id)
        this.size = 2
    }
}
  
class VIP extends Vehicle {
    constructor(id) {
        super(id)
        this.size = 2
    }
}
  
class Truck extends Vehicle {
    constructor(id) {
        super(id)
        this.size = 3
    }
}