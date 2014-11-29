function fullBattleshipGame() {
    var view = {
        displayMessage: function(msg) {
            var messageArea = document.getElementById("messageArea");
            messageArea.innerHTML = msg;
        },
        displayHit: function(location) {
            var cell = document.getElementById(location);
            cell.setAttribute("class", "hit");
        },
        displayMiss: function(location) {
            var cell = document.getElementById(location);
            cell.setAttribute("class", "miss");
        }
    };
    var model = {
        boardSize: 7,
        numShips: 3,
        shipLength: 3,
        shipsSunk: 0,
        
	ships: [
		{ locations: ["06", "16", "26"], hits: ["", "", ""] },
		{ locations: ["24", "34", "44"], hits: ["", "", ""] },
		{ locations: ["10", "11", "12"], hits: ["", "", ""] }
	],
        
        fire: function(guess) {
            for(var i = 0; i < this.numShips; i++) {
                var ship = this.ships[i];
                var index = ship.locations.indexOf(guess);
                if (index >= 0) {
                    ship.hits[index] = "hit";
                    view.displayHit(guess);
                    view.displayMessage("HIT!");
                    if (this.isSunk(ship)) {
                        view.displayMessage("You sank my battleship!");
                        this.shipsSunk++;
                    }
                    return true;
                }

            }
            view.displayMiss(guess);
            view.displayMessage("You missed.");
            return false;
        },
        
        isSunk: function(ship) {
            for (var i = 0; i < this.shipLength; i++) {
                if (ship.hits[i] !== "hit") {
                    return false;
                }
            }
            return true;
        }
    };
    
    /* test fires */
    model.fire("24");
    model.fire("16");
    model.fire("26");

}


function battleshipGame() {

    var randomLoc = Math.floor(Math.random() * 5);
    var location1 = randomLoc;
    var location2 = location1+1;
    var location3 = location1+2;
    var guess;
    var hits = 0;
    var guesses = 0;
    var isSunk = false;
    var prevGuesses = [];
    
    while (isSunk === false) {
        guess = prompt("ready, aim, fire! (enter a number 0-6):");
        if (guess < 0 || guess > 6) {
            alert("Please enter a valid cell number (0-6)");
        }
        else {
            guesses = guesses + 1;
            
            if (guess == location1 || guess == location2 || guess == location3) {
                hits = hits +1;
                alert("HIT!");
                if (hits == 3) {
                    isSunk = true;
                    alert("You sunk my battleship!");
                }
            }
            else {
                alert("MISS!");
            }
        }
    }
    var stats = "You took " + guesses + " guesses to sink the battleship, " + "which means your shooting accuracy was " + ((3/guesses) * 100) + "%";
    alert(stats);
}

function childCareGame() {
    
 
    var childToCareFor = makeChild();
    
    function makeChild() {
        var names = ["Ray", "Mae", "Joy", "Sally", "Joe", "Chris", "Steven", "Althea", "Jax", "Thomas"];
        var age = Math.floor(Math.random() * 13);
        
        var rand1 = Math.floor(Math.random() * names.length);
        var child = {
            name: names[rand1],
            age: age
        };
        return child;
    }
    function displayChild(child) {
        alert("Your child's name is " + child.name + ". Your child is " + child.age + " years old.");
        var stuff = document.getElementById("gameOutput");
        stuff.innerHTML = child.name + " " + child.age;
    }
    
    displayChild(childToCareFor);
}
