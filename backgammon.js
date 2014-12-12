function backgammonGame () {
    var view = {
        fillCell: function(index, side) {
            var cell = document.getElementById(index);
            cell.setAttribute("class", "fill"+side);            
        },
        emptyCell: function(index) {
            var cell = document.getElementById(index);
            if (cell != "null") {
                cell.setAttribute("class", "null");              
            }
               
        },
        showDice: function(roll, die) {
            var dieBin1 = document.getElementById("dieBin1");
            dieBin1.innerHTML = "<p>" + die + "</p>";
        }
        
    };
    var model = {
        playerTurn: "Black",
        startLocationsWhite: ["B0", "B1", "M0", "M1", "M2", "M3", "M4", "R0", "R1", "R2", "T0", "T1", "T2", "T3", "T4"],
        startLocationsBlack: ["Y0", "Y1", "N0", "N1", "N2", "N3", "N4", "I0", "I1", "I2", "G0", "G1", "G2", "G3", "G4"],
        dice: [0,0],
        clearBoard: function() {
            for (var i = 0; i < model.startLocationsWhite.length; i++) {
                var index = this.startLocationsWhite[i];
                view.emptyCell(index);
            }
                        
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
            if (model.playerTurn === "White") {
                model.playerTurn = "Black"
            } else {
                model.playerTurn = "White"
            }
        },
        getActiveChecker: function(location) {
            /* Take the index of the input and search the column for the last occupied slot*/

        },
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
        // proof of concept function coming. Remove later
        moveTest: function(column, player) {
            player = model.playerTurn;
            var newDirection;
            if (player === "White") {
                newDirection = 1;
            } else {
                newDirection = -1;
            }
            // newDirection not working properly (actually I think advancePlayer isnt working)
            var newColumn = String.fromCharCode(column.charCodeAt(0) + newDirection);
            var newRow = column.charAt(1);
            var newIndex = newColumn + newRow;
            view.emptyCell(column);
            view.fillCell(newIndex, player);
            controller.advancePlayer();
            
        }
        
    };
    function init() {
        model.setupBoard();
        var fireButton = document.getElementById("fireButton");
        fireButton.onclick = handleFireButton;
        var guessInput = document.getElementById("guessInput");
        guessInput.onkeypress = handleKeyPress;        
    }
    
        function handleKeyPress (e) {
        var fireButton = document.getElementById("fireButton");
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
    
    function handleRollDieButton() {
        
    }
    init();
    
}