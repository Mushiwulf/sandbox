function backgammonGame () {
    var view = {
        fillCell: function(index, side) {
            var cell = document.getElementById(index);
            cell.setAttribute("class", side);
        },
        emptyCell: function(index) {
            var cell = document.getElementById(index);
            if (cell != null) {
                cell.setAttribute("class", "empty");              
            }
               
        },
        showDice: function(roll, die) {
            var dieBin1 = document.getElementById("dieBin1");
            dieBin1.innerHTML = "<p>" + die + "</p>";
        }
        
    };
    var model = {
        playerTurn: "Black",
        allPositions: ["B0", "B1", "B2", "B3", "B4", "C0", "C1"],
        startLocationsWhite: ["B0", "B1", "M0", "M1", "M2", "M3", "M4", "R0", "R1", "R2", "T0", "T1", "T2", "T3", "T4"],
        startLocationsBlack: ["Y0", "Y1", "N0", "N1", "N2", "N3", "N4", "I0", "I1", "I2", "G0", "G1", "G2", "G3", "G4"],
        dice: [0,0],
        numberOfMoves: 1,
       clearBoard: function() {
           $('table td').removeClass("Black");
           $('table td').addClass("empty");
         /*   for (var i = 0; i < model.allPositions.length; i++) {
                var index = this.allPositions[i];
                view.emptyCell(index);
            } */
        }, 
        setupBoard: function() {
            var index;
            var i;
            model.clearBoard();
            for (i = 0; i < model.startLocationsWhite.length; i++) {
                index = this.startLocationsWhite[i];
                view.fillCell(index, "White");
            }
            for (i = 0; i < model.startLocationsBlack.length; i++) {
                index = this.startLocationsBlack[i];
                view.fillCell(index, "Black");
            }            
        },
        /* Right now I am going to make a function that does nothing to the model, just passes values from the controller to the view. I think inthe future I want to store things in an array in the model, so then this function will make more sense*/
        updateChecker: function(oldLocation, newLocation, player) {
            view.emptyCell(oldLocation);
            view.fillCell(newLocation, player);
        }
    };
    var controller = {
        /* I am not sure how I want to get user input. I have been thinking about checking the player and then making their checkers clickable.
           I've also considered doing move validation up front and only making valid columns clickable. But first I think I need to write the function to just move a checker */

        
        setStartingPlayer: function() {
            /* Roll the dice, high roll starts. */
            var playerWhite = Math.floor(Math.random()*6)+1;
            var playerBlack = Math.floor(Math.random()*6)+1;
            
        },
        advancePlayer: function() {
            if (model.numberOfMoves === 0) {
                model.numberOfMoves = 2; //probably not hte right place for this.
                if (model.playerTurn === "White") {
                    model.playerTurn = "Black";
                    var label = document.getElementById("bgFireButton");
                    label.setAttribute("value", "Black move!");
                } else {
                model.playerTurn = "White";
                    var label = document.getElementById("bgFireButton");
                    label.setAttribute("value", "White move!");
                }
            }
            model.numberOfMoves--;
        },

/*        getActiveChecker: function(location, player) {
            // Take the index of the input and search the column for the last occupied slot
            
            var i = 0;
            do {
                location = location + i.toSring;
                location = document.getElementById(location);
                view.fillCell(location, player);
                i++;
            } while (location != null || "empty");
        }, */
        moveChecker: function(player, location, die) {
            var roll = this.die;
            var direction;
            if (player === "White") {
                direction = 1;
            } else {
                direction = -1;
            }
            var move = roll*direction;
            
            var newLocation = String.fromCharCode(location.charCodeAt(0) + move);
            model.updateChecker (location, newLocation, player);
            /* there is a lot of half baked stuff here that I ened to refine, but I wanted to get my general idea down */
        },
        rollDice: function() {
            // loop through the dice array and grab two random numbers. Send to view.
            var dice = model.dice;
            for (var i = 0; i < dice.length; i++ ) {
                dice[i] = Math.floor(Math.random()*6)+1;
                view.showDice(dice[i], i);
            }
        },
        getNewColumn: function(column, move) {
            var newColumn = String.fromCharCode(column.charCodeAt(0) + move);
            return newColumn;
        },
        findLowest: function (column) {
            for (var i = 0; i<5; i++) {
                var index = column + i;
                var cell = document.getElementById(index).className;
                if (cell == "empty") {
                    return i;
                }
            } return i%4; //for now it keeps the checkers from running over. I really need to wrap this in a layer to check for double and triple stacks
        },
        findHighest: function (column) {
            for (var i = 4; i>= 0; i--) {
                var index = column + i;
                var cell = document.getElementById(index).className;
                if (cell !== "empty") {
                    return i;
                }
            } 
        },
        getColumnOnly: function(cell) {
            var column = cell.charAt(0).toUpperCase();
            return column;
        },
        validatePlayer: function(cell) {
            
        },
        // proof of concept function coming. Remove later
        moveTest: function(cell, player) {
            player = model.playerTurn;
            var newDirection;
            var move;
            var die = 2;
            if (player === "White") {
                newDirection = 1;
            } else {
                newDirection = -1;
            }
            move = newDirection * die;
            var column = controller.getColumnOnly(cell);
            var oldRow = controller.findHighest(column);
            view.emptyCell(column+oldRow);
            var newColumn= controller.getNewColumn(column, move);
            var newRow =  controller.findLowest(newColumn);
            var newIndex = newColumn + newRow;
           // var newIndex =  newColumn + newRow;// controller.getLowestInColumn(newColumn);

            view.fillCell(newIndex, player); //having issue setting newIndex
            // controller.getActiveChecker(newIndex.charAt(0));
            controller.advancePlayer();
            
        }
        
    };
    function init() {
        model.setupBoard();
        var fireButton = document.getElementById("bgFireButton");
        fireButton.onclick = handleFireButton;
        var guessInput = document.getElementById("guessInput");
        guessInput.onkeypress = handleKeyPress;        
    }
    
    function handleKeyPress (e) {
    var fireButton = document.getElementById("bgFireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
        }
    }
    
    function handleFireButton () {
    var colInput = document.getElementById("guessInput");
    var col = colInput.value;
    controller.moveTest(col);
    colInput.value = "";
    }
    
    function handleClearButton () {
        var clearButton = document.getElementById("clearButton");
        clearButton.onclick = model.clearBoard();
    }
    
    function handleRollDieButton() {
        
    }
    init();
}