"use strict"

class Car{
    //properties
    make: string=""
    model: string=""
    colour: string=""
    mileage: number=0
    price:number=0

    //methods
}

interface makes{
    FORD:string[],
    TOYOTA: string[],
    BMW: string[],
    AUDI:string[]
    //[key:string]: string[];
}

let makes: any={FORD:[], TOYOTA:[], BMW:[],AUDI:[]}
makes.FORD="Fiesta,Focus,KA,Mondeo,Fusion,Transit".split(",")
makes.TOYOTA="Corolla, Prius, Landcruiser,Supra,Camry,Yaris".split(",")
makes.BMW="X1, X2, X3,X4,X5,X6".split(",")
makes.AUDI="A1, A2, A3,A4,A5,A6".split(",")
let colours = "Black, Blue, Silver, Grey, Aqua".split(",")

let cardHolder=document.createElement("main")
cardHolder.classList.add("Holder")
document.body.appendChild(cardHolder)
//localStorage.removeItem("cars") // uncomment to reset
let cars:Car[]=[]
cars = JSON.parse(localStorage.getItem("cars")!)
if (cars == null){
    cars=generateRandomCars(makes,6)
    saveCars()
}

//cars.sort((a,b)=>(a.price-b.price))
renderCars()

let saveButton = document.getElementById("Button")
saveButton!.addEventListener("click", AddCarFromForm)

// let deleteButton = document.getElementsByClassName("delete")
// deleteButton.addEventListener("click", DeleteCard)

// function DeleteCard(){
//     alert("hi")
//     //localStorage.removeItem("car", value)
// } 

let sortByOption = document.getElementById("sortBy")
sortByOption!.addEventListener("change", sortBy)
console.log(sortByOption)
let select = document.querySelector('#sortBy');
let result = document.querySelector('#result');
select.addEventListener('change', function () {
        let newResult:string = result.textContent = this.value
        console.log(newResult)
        //newResult = this.value;

        if (newResult == "Price"){
            cars = cars.sort((a,b)=>a.price-b.price)
            console.log(cars)
        } else if (newResult == "Mileage"){
            cars.sort((a,b)=>a.mileage-b.mileage)
        }
        })

// function sortBy(){
//     if (sortByOption?.onselect.value == "Price"){
//         cars = cars.sort((a,b)=>a.price-b.price)
//     }

//     cars = cars.sort((a,b)=>a.mileage-b.mileage)

// }
function saveCars(){
    //store
    localStorage.setItem("cars", JSON.stringify(cars)) //permanently save so user can close browser/switch off pc and come back to it

    //retrieve
    //localStorage.getItem("key")
}

function AddCarFromForm(){
    let make=(<HTMLInputElement>document.getElementById("make")).value
    let model=(<HTMLInputElement>document.getElementById("model")).value
    let price:number=parseInt((<HTMLInputElement>document.getElementById("price")).value) 
    let mileage:number=parseInt((<HTMLInputElement>document.getElementById("mileage")).value)
    let colour=(<HTMLInputElement>document.getElementById("colour")).value  

    let car = {make:make, model:model, price:price,mileage:mileage, colour:colour}
    cars.push(car)
    renderCars()
    saveCars()
    
}
console.log(cars)
function generateRandomCars(makes:any,numberOfCars:number):Car[]{

    let cars:Car[]=[]
    for (let i = 0; i<numberOfCars;i++){
        let make:string=pickFrom(Object.keys(makes))
        let model = pickFrom(makes[make])
        let colour = pickFrom(colours)
        cars.push({make:make,model:model,price:randomInteger(10000), mileage:randomInteger(100000), colour:colour})
    }
    return cars
}

function pickFrom(list:string[]){
    let randomNumber=Math.floor(Math.random()* list.length)  
    return list[randomNumber]
}

function randomInteger(max:number){
    return Math.floor(Math.random() * max) +1   
}

function renderCars(){
    cardHolder.innerHTML = ""
    for (let i=0; i < cars.length; i++){
        let card = document.createElement("div");
        card.classList.add("card")
        cardHolder.appendChild(card);

        let heading= document.createElement("h1")
        heading.classList.add("header")
        heading.innerHTML= cars[i].make + " " + cars[i].model
        card.appendChild(heading)
    
        let paragraph= document.createElement("p")
        paragraph.innerHTML= `Mileage: ${cars[i].mileage} Price: £${cars[i].price} Colour: ${cars[i].colour}`
        card.appendChild(paragraph)

        let button = (<HTMLButtonElement>document.createElement("button"));
        button.dataset.index = i.toString() //store the index of this car in the button's dataset
        button.className = "delete"
        button.innerHTML = "Delete";
        card.appendChild(button);
        button.onclick = function(this:any) {
            card.remove() // doesn't remove from local storage
            //delete cars[this.dataset.index] //removes car[i] from array
            cars.splice(this.dataset.index,1)
            saveCars()
        }
    }
}

//TO-DO: add images to cards, add line breaks in p tag, add delete button, save new content to local storage (web storage API); sort cars by price/mileage/colour option; upload image of car in form