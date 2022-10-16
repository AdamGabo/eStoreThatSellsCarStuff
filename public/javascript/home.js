

const searchForm = document.getElementById('search-form');

const yearToggle = document.getElementById('year-toggle');
const makeToggle = document.getElementById('make-toggle');
const modelToggle = document.getElementById('model-toggle'); 


searchForm.addEventListener('click', searchCars)

async function searchCars(e){
    e.preventDefault();
 
    if(e.target.id === 'year-toggle'){
        yearInit();
    }
    if(yearToggle.value !== 'All years'){
        getMakeData();
    }
    if(modelToggle.value){
        // setModelData();
    }
}


function yearInit(){
    
    const app = {};
    app.yearDropDown = yearToggle;

    app.getYearData = async function getYearData(e){
         
        if(app.yearDropDown.childElementCount === 1){
            const res = await fetch('api/cars/year',{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
                
        const carYears = await res.json();

    
        
        //create options from the list of years
        app.createYearsOptions(carYears)
        }


    }
    
    app.createYearsOptions = function(years){ 
        //To clear all pre('#year-options')vious years                
        this.yearDropDown.innerHTML = '<option disabled hidden selected>All years</option>'

        
    
        for(const [key,value] of Object.entries(years)){
             const option = document.createElement('option');
             option.value = value.car_year
             option.innerText = `${value.car_year}(${value.quantity})`
             app.yearDropDown.append(option)
            
        }
        return;
    }

    return app.getYearData();
}

function getMakeData(){
   
    const year = yearToggle.value;
 
   const app = {};
 
   app.fetchMakeData = async function(){
     makeToggle.removeAttribute('disabled')
    
     //Checking if the fetch request has already been made
  
     if(makeToggle.childElementCount === 1){
  
      // http://localhost:3001/api/cars?year= yearVariable
  
      const res = await fetch('api/cars?' + new URLSearchParams({
          year
      }),{
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
      });
  
      const make = await res.json()
     console.log(make)
     makeToggle.innerHTML = '<option disabled hidden selected>All Makes --</option>'
    // createMakeOptions(make)
  
  
   }
   }
 
   app.createMakeOptions = function(make){
       makeToggle.innerHTML = '<option disabled hidden selected>All Makes</option>'
    
       make.forEach(car => {
        //To clear all pre('#make-options')vious years                
        const option = document.createElement('option');
        option.value = car.car_make
        option.innerText = `${car.car_make}`
        makeToggle.append(option)
          
     })


    }

    app.fetchMakeData();
 }
