// define global variables
let button = document.getElementById('btn');
let form = document.getElementById('dino-compare');
let grid = document.getElementById('grid');

// Create Dino Constructor
function BaseDino(dino) {
    this.species = dino.species;
    this.weight = dino.weight;
    this.diet = dino.diet;
    this.height = dino.height,
    this.facts = [dino.fact, `${dino.species} originates from ${dino.where}`, `${dino.species} lived in the ${dino.when} ages!`];
};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
BaseDino.prototype.compareWeight = function(human_weight) {
    let compareFact = `${this.species} weight is ${this.weight} lbs, your weight is ${human_weight} lbs!`;
    this.facts.push(compareFact);
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
BaseDino.prototype.compareHeight = function(human_feet, human_inches) {
    let humanSize = parseInt(human_feet)*12 + parseInt(human_inches);
    let compareFact = `${this.species} is ${this.height} inches tall, you are ${humanSize} inches tall!`;
    this.facts.push(compareFact);
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
BaseDino.prototype.compareDiet = function(human_diet) {
    let compareFact = `${this.species} is a ${this.diet}, you are a ${human_diet}`
    this.facts.push(compareFact);
}

BaseDino.prototype.displayCard = function() {
    let randomFact = ""
    if (this.species === "Pigeon") {
        randomFact = this.facts[0];
    } else {
        randomFact = this.facts[Math.floor(Math.random()*this.facts.length)];
    }
    
    return `
    <div id = "${this.species}" class="grid-item">
        <h3>${this.species}</h3>
        <img src="${'./images/' + this.species.toLowerCase() + '.png'}">
        <p>${randomFact}</p>
    </div>
    `;
}

// Create Human Object
// Constructor for Human
function Human() {
    this.name = document.getElementById('name').value;
    this.feet = document.getElementById('feet').value;
    this.inches = document.getElementById('inches').value;
    this.weight = document.getElementById('weight').value;
    this.diet = document.getElementById('diet').value;
}

// Methods for class Human
Human.prototype.displayCard = function() {
    return `
    <div id = "${this.name}" class="grid-item">
        <h3>${this.name}</h3>
        <img src="${'./images/human.png'}">
    </div>
    `;
}

// get human data from form
let getUserInput = function() {
    return {
        name: document.getElementById('name').value,
        height_feet: document.getElementById('feet').value
    }
};

// On button click, prepare and display infographic
// Generate Tiles for each Dino in Array
// Add tiles to DOM
// Remove form from screen
// Load Data from .json
fetch("./dino.json")
    .then(function(response) {
        dinosaurs = response.json();
        return dinosaurs
    })
    .then(function(dinosaurs) {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            form.style.display = 'none';
            for (i = 0; i < (dinosaurs.Dinos.length + 1); i++) {
                let humanObj = new Human();
                if (i < 4) {
                    let dinoObj = new BaseDino(dinosaurs.Dinos[i]);
                    dinoObj.compareDiet(humanObj.diet);
                    dinoObj.compareHeight(humanObj.feet, humanObj.inches);
                    dinoObj.compareWeight(humanObj.weight);
                    grid.insertAdjacentHTML('beforeend', dinoObj.displayCard());
                } else if (i === 4) {
                    // create human card
                    grid.insertAdjacentHTML('beforeend', humanObj.displayCard());
                } else {
                    let dinoObj = new BaseDino(dinosaurs.Dinos[(i-1)]);
                    dinoObj.compareDiet(humanObj.diet);
                    dinoObj.compareHeight(humanObj.feet, humanObj.inches);
                    dinoObj.compareWeight(humanObj.weight);
                    grid.insertAdjacentHTML('beforeend', dinoObj.displayCard());
                }
            }
        });
    });