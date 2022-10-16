const { Vehicle } = require('../models');

module.exports.findVehicle = async (req,res) => {

    /**
     * Expect http://localhost:3001/api/cars?car_make=something,model...
     */

    const { car_model, car_make, year} = req.query;

    if(car_make || car_model){
    try{
      const values = { year }
      const attributes = []

        if(car_make){
            values.car_make = car_make
            attributes[0] = "car_make"
        }

        if(car_model){
            values.car_model = car_model
            attributes[1] = "car_model"
        }


        const cars = await Vehicle.findAll({
            where : values,
            attributes 
        })
    
        if(!cars.length){
          return res
            .status(404)
            .json({message: 'There are no vehicles with this specification'})
        }
    
         res.render('cars/cars', {...req.session, cars})
        }

          catch(err){
            return res 
            .status(500)
            .json({message: "Something went wrong with the server", err})
          }
        }
    
    else{
       await this.getAllCars(req,res)
    }
          
    
}

module.exports.findVehicleApi = async (req,res) => {

    /**
     * Expect http://localhost:3001/api/cars?car_make=something,model...
     */

    const { car_model, car_make, year} = req.query;

    if(car_make || car_model || year){
    try{
      const values = { }
      const attributes = ['vehicle_id']

       if(year){
        values.year = year
         attributes[1] = "year"
       }

        if(car_make){
            values.car_make = car_make
            attributes[2] = "car_make"
        }

        if(car_model){
            values.car_model = car_model
            attributes[3] = "car_model"
        }


        const cars = await Vehicle.findAll({
            where : values,
        })
    
        if(!cars.length){
          return res
            .status(404)
            .json({message: 'There are no vehicles with this specification'})
        }
    
         res.json(cars);
        }

          catch(err){
            return res 
            .status(500)
            .json({message: "Something went wrong with the server", err})
          }
        }
    
    else{
       await this.getAllCarsApi(req,res)
    }
          
    
}

/*
*Expect "2003": {
		"car_year": 2003,
		"quantity": 3
	}
response from the api
*/
module.exports.getYears = async(req,res) => {
 try{
    const cars = await Vehicle.findAll({
        attributes: ['year','vehicle_id'],
        raw: true
    });

    const carFormat = {}


    cars.forEach(car => {
        if(car.year in carFormat){
            carFormat[car.year].quantity += 1
        }
        else{
            carFormat[car.year] = {
                car_year: car.year,
                quantity : 1,
                id : car.vehicle_id
            }
        }
    })

    return res.json(carFormat)
 }
 catch(err){
    return res
    .status(500)
    .json({message: "Something went wrong with our server"})
 }
 


}



module.exports.getAllCars = async(req,res) => {
    try{
       const cars = await Vehicle.findAll({raw: true });


       res.render('cars/cars', {...req.session, cars })
    }
    catch(err){
       return res
       .status(500)
       .json({message: "Something went wrong with our server"})
    }
   }

module.exports.getAllCarsApi = async(req,res) => {
    try{
       const cars = await Vehicle.findAll({raw: true });


       res.json(cars);
    }
    catch(err){
       return res
       .status(500)
       .json({message: "Something went wrong with our server"})
    }
   }




