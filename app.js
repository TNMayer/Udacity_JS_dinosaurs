let button = document.getElementById('btn');
let form = document.getElementById('dino-compare');
let grid = document.getElementById('grid');

// Create Dino Constructor
let Dino = function(dino) {
    this.species = dino.species;
    this.weight = dino.weight;
    this.diet = dino.diet;
    this.height = dino.height;
    this.where = dino.where;
    this.when = dino.when;
    this.fact = dino.fact;
};

// Create Dino Objects
const dinoCard = function(dinoObj) {
    return `
    <div id = "${dinoObj.species}" class="grid-item">
        <h3>${dinoObj.species}</h3>
        <img src="${'./images/' + dinoObj.species.toLowerCase() + '.png'}">
    </div>
    `;
};


// Create Human Object

// Use IIFE to get human data from form


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.


// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen


// On button click, prepare and display infographic
fetch("./dino.json")
    .then(function(response) {
        dinosaurs = response.json();
        return dinosaurs
    })
    .then(function(dinosaurs) {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            form.remove();
            count = 0;
            console.log(dinosaurs.Dinos[0]);
            for (i = 0; i < (dinosaurs.Dinos.length + 1); i++) {
                let dinoObj = new Dino(dinosaurs.Dinos[i]);
                grid.insertAdjacentHTML('beforeend', dinoCard(dinoObj));
            }
        });
    });