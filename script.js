"use strict";
class Car {
    constructor(make, model, colour, mileage, price) {
        //properties
        this.make = "";
        this.model = "";
        this.colour = "";
        this.mileage = 0;
        this.price = 0;
        this.make = make;
        this.model = model;
        this.colour = colour;
        this.mileage = mileage;
        this.price = price;
    }
}
let makes = { FORD: [], TOYOTA: [], BMW: [], AUDI: [] };
makes.FORD = "Fiesta,Focus,KA,Mondeo,Fusion,Transit".split(",");
makes.TOYOTA = "Corolla, Prius, Landcruiser,Supra,Camry,Yaris".split(",");
makes.BMW = "X1, X2, X3,X4,X5,X6".split(",");
makes.AUDI = "A1, A2, A3,A4,A5,A6".split(",");
let colours = "Black, Blue, Silver, Grey, Aqua".split(",");
let cardHolder = document.createElement("main");
cardHolder.classList.add("Holder");
document.body.appendChild(cardHolder);
//localStorage.removeItem("cars") // uncomment to reset
let cars = [];
cars.push(new Car("BMW", "X2", "Silver", 100000, 25000));
cars = JSON.parse(localStorage.getItem("cars"));
console.log(cars);
if (cars == null) {
    cars = generateRandomCars(makes, 20);
    saveCars();
}
renderCars();
let saveButton = document.getElementById("Button");
saveButton.addEventListener("click", AddCarFromForm);
let select = document.querySelector('#sortBy');
let result = document.querySelector('#result');
select.addEventListener('change', function () {
    let newResult = result.textContent = this.value;
    if (newResult == "Price") {
        cars = cars.sort((a, b) => (a.price - b.price));
        renderCars();
    }
    else if (newResult == "Mileage") {
        cars.sort((a, b) => (a.mileage - b.mileage));
        renderCars();
    }
});
let filterBy = document.getElementById('#filterBy');
filterBy.addEventListener('change', filterByColour);
function filterByColour() {
    let filterColour = cars.filter((c) => c.colour == (filterBy.value));
    //renderCars(filterColour)
    renderCars();
}
// function sortBy(){
//     if (sortByOption?.onselect.value == "Price"){
//         cars = cars.sort((a,b)=>a.price-b.price)
//     }
//     cars = cars.sort((a,b)=>a.mileage-b.mileage)
// }
// a generic function to return a random selection from ANY array (i choose to pass it)
// function pickFrom(list:string[]){
//     let r=Math.floor(Math.random()* list.length)  // generate a random number between 0 and the list length (-1)
//     return list[r]  //return the chosen item
// }
// function randomPic():string{
//     //returns a random car image URL
//     let pics=[]
//     pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/seat/ibiza.png")
//     pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/peugeot/108.png")
//     pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/renault/clio.png")
//     pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/ford/b-max.png")
//     pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/bmw/1-series.png")
//     pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/nissan/qashqai.png")
//     return pickFrom(pics)
// }
function saveCars() {
    //store
    localStorage.setItem("cars", JSON.stringify(cars)); //permanently save so user can close browser/switch off pc and come back to it
    //retrieve
    //localStorage.getItem("key")
}
function AddCarFromForm() {
    let make = document.getElementById("make").value;
    let model = document.getElementById("model").value;
    let price = parseInt(document.getElementById("price").value);
    let mileage = parseInt(document.getElementById("mileage").value);
    let colour = document.getElementById("colour").value;
    let car = { make: make, model: model, price: price, mileage: mileage, colour: colour };
    cars.push(car);
    renderCars();
    saveCars();
}
console.log(cars);
function generateRandomCars(makes, numberOfCars) {
    let cars = [];
    for (let i = 0; i < numberOfCars; i++) {
        let make = pickFrom(Object.keys(makes));
        let model = pickFrom(makes[make]);
        let colour = pickFrom(colours);
        cars.push({ make: make, model: model, price: randomInteger(10000), mileage: randomInteger(100000), colour: colour });
    }
    return cars;
}
function pickFrom(list) {
    let randomNumber = Math.floor(Math.random() * list.length);
    return list[randomNumber];
}
function randomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}
function renderCars() {
    cardHolder.innerHTML = "";
    for (let i = 0; i < cars.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        cardHolder.appendChild(card);
        let heading = document.createElement("h1");
        heading.classList.add("header");
        heading.innerHTML = cars[i].make + " " + cars[i].model;
        card.appendChild(heading);
        let paragraph = document.createElement("p");
        paragraph.innerHTML = `Mileage: ${cars[i].mileage} Price: £${cars[i].price} Colour: ${cars[i].colour}`;
        card.appendChild(paragraph);
        let button = document.createElement("button");
        button.dataset.index = i.toString(); //store the index of this car in the button's dataset
        button.className = "delete";
        button.innerHTML = "Delete";
        card.appendChild(button);
        button.onclick = function () {
            //card.remove() // doesn't remove from local storage
            //delete cars[this.dataset.index] //removes car[i] from array
            cars.splice(this.dataset.index, 1);
            renderCars();
            saveCars();
        };
    }
}
//# sourceMappingURL=script.js.map