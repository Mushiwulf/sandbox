

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
	    	{ locations: ["0", "0", "0"], hits: ["", "", ""] },
	    	{ locations: ["0", "0", "0"], hits: ["", "", ""] },
	    	{ locations: ["0", "0", "0"], hits: ["", "", ""] }
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
        },
        
        generateShipLocations: function() {
            var locations;
            for (var i = 0; i < this.numShips; i++) {
                do {
                    locations = this.generateShip();
                } while (this.collision(locations));
                this.ships[i].locations = locations;
            }
        },
        
        generateShip: function() {
          var direction = Math.floor(Math.random() * 2);
          var row, col;
          
          if (direction === 1) {
              row = Math.floor(Math.random() * this.boardSize);
              col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
          } else {
              col = Math.floor(Math.random() * this.boardSize);
              row = Math.floor(Math.random() * (this.boardSize - this.shipLength));              
          }
          
          var newShipLocations = [];
          for (var i = 0; i < this.shipLength; i++) {
              if (direction === 1) {
                  newShipLocations.push(row + "" + (col+i));
              } else {
                  newShipLocations.push((row + i) + "" + col);
              }
          }
          return newShipLocations;
         
        },
        
        collision: function(locations) {
            for (var i = 0; i < this.numShips; i++) {
                var ship = model.ships[i];
                for (var j = 0; j < locations.length; j++) {
                    if (ship.locations.indexOf(locations[j]) >= 0) {
                        return true;
                    }
                }
            }
            return false;
        }
    };
    
    var controller = {
      guesses: 0,
      processGuess: function(guess) {
          var location = parseGuess(guess);
          if (location) {
              this.guesses++;
              var hit = model.fire(location);
              if (hit && model.shipsSunk === model.numShips) {
                  view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
              }
          }
      }
    };
    function parseGuess(guess) {
        var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
        if (guess === null || guess.length !== 2) {
            alert("Please enter a valid guess.")
        } else {
            var firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar.toUpperCase());
            var column = guess.charAt(1);
            
            if (isNaN(row) || isNaN(column)) {
                alert("Oops, out of range.");
            } else if ( row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
                alert("Oops thats off the board!")
            } else {
                return row + column;
            }
        }
        return null;
    }
    function init() {
        var fireButton = document.getElementById("fireButton");
        fireButton.onclick = handleFireButton;
        var guessInput = document.getElementById("guessInput");
        guessInput.onkeypress = handleKeyPress;
        model.generateShipLocations();
    }
    function handleFireButton () {
        var guessInput = document.getElementById("guessInput");
        var guess = guessInput.value;
        controller.processGuess(guess);
        guessInput.value = "";
    }
    function handleKeyPress (e) {
        var fireButton = document.getElementById("fireButton");
        if (e.keyCode === 13) {
            fireButton.click();
            return false;
        }
    }
    /* test fires */
    init();
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
