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
                var die1 = document.getElementById("die"+die);
                die1.innerHTML = roll;
            
        },
        changeDieColor: function(player) {
            for (var i=0; i<2;) {
                var die = document.getElementById("die"+i);
                die.setAttribute("class", player+"Die");
                i++;
            }
        }
        
    };
    var model = {
        playerTurn: "Black",
        startLocationsWhite: ["B0", "B1", "M0", "M1", "M2", "M3", "M4", "R0", "R1", "R2", "T0", "T1", "T2", "T3", "T4"],
        startLocationsBlack: ["Y0", "Y1", "N0", "N1", "N2", "N3", "N4", "I0", "I1", "I2", "G0", "G1", "G2", "G3", "G4"],
        dice: [1,2],
        numberOfMoves: 1,
        bearingOffBlack: 5,
        bearingOffWhite: 5,
        activeDie: null,
        activeColumn: null,
       clearBoard: function() {
            $('table td').removeClass("Black");
            $('table td').removeClass("White");
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
            model.activeColumn = null;
            model.activeDie = null;
            if (model.numberOfMoves === 0) {
                model.numberOfMoves = 2; //probably not the right place for this.
                controller.rollDice();
                if (model.dice[0] === model.dice[1]) {
                    model.numberOfMoves = 4;
                }
                if (model.playerTurn === "White") {
                    model.playerTurn = "Black";
                    var label = document.getElementById("bgFireButton");
                    label.setAttribute("value", "Black move!");
                    view.changeDieColor("Black");
                  //  controller.rollDice();
                } else {
                model.playerTurn = "White";
                    var label = document.getElementById("bgFireButton");
                    label.setAttribute("value", "White move!");
                    view.changeDieColor("White");
                  //  controller.rollDice();
                }
            }
            model.numberOfMoves--;
        },
        activeDie: function(id) {
             var die = document.getElementById(id);
             model.activeDie = die.innerHTML;
             die.setAttribute("class", "active")
        },
        setActiveDie: function(die) {
            //this should take the active die and indicate that somehow and then the player needs to select a column.
            //Alternately, they will have selected a column first and then this will fire the move function passing the column and the die.
            model.activeDie = die;
            var column = model.activeColumn;
            if (column != null) {
            //    controller.moveTest(column, die);
                controller.validatePlayer(column, die);
            }
        },
        setActiveColumn: function(column) {
            model.activeColumn = column;
            var die = model.activeDie;
            if (die != null) {
            //    controller.moveTest(column, die);
                controller.validatePlayer(column, die);
            }
        },



            /* there is a lot of half baked stuff here that I ened to refine, but I wanted to get my general idea down */

        rollDice: function(first) {
            // loop through the dice array and grab two random numbers. Send to view.
            var dice = model.dice;
/*            if (first) {
                var die0 = document.getElementById("die0");
                die0.setAttribute("class", "BlackDie");
                var die1 = document.getElementById("die1");
                die1.setAttribute("class", "WhiteDie");
                var label = document.getElementById("bgFireButton");
                if (dice[0] > dice[1]) {
                //black player starts
                label.setAttribute("value", "Black move!");
                model.playerTurn = "Black";
                } else {
                //white player starts
                label.setAttribute("value", "White move!");
                model.playerTurn = "White";
                }
            } */
            for (var i = 0; i < dice.length; i++ ) {
                dice[i] = Math.floor(Math.random()*6)+1;
                view.showDice(dice[i], i);
                            if (first) {
                var die0 = document.getElementById("die0");
                die0.setAttribute("class", "BlackDie");
                var die1 = document.getElementById("die1");
                die1.setAttribute("class", "WhiteDie");
                var label = document.getElementById("bgFireButton");
                if (dice[0] > dice[1]) {
                //black player starts
                label.setAttribute("value", "Black move!");
                model.playerTurn = "Black";
                } else {
                //white player starts
                label.setAttribute("value", "White move!");
                model.playerTurn = "White";
                }
            }
                if (first && (dice[0] === dice[1])) {
                    controller.rollDice (1);
                }
            }

        },
        getNewColumn: function(column, move) {
            var newColumn = String.fromCharCode(column.charCodeAt(0) + move);
            return newColumn;
        },
       
        findLowest: function (column, player) {
          //  var player = controller;
            for ( var i = 0; i<3; i++) {
                for (var j = 0; j<5; j++) {
                    var index = column + j;
                    var cell = document.getElementById(index).className;
                    if (cell === "empty") {
                        view.fillCell (index, player);
                        return;
                    } else if (i === 1 && cell === player) {
                        view.fillCell(index, player + "2");
                        return;
                    } else if (i === 2 && cell === player + "2") {
                        view.fillCell(index, player + "3");
                        return;
                    } else {
                    }
                    
                }
            }
        },
        
        findHighest: function (column) {
            for (var i = 4; i> 0; i--) {
                var index = column + i;
                var cell = document.getElementById(index).className;
                if (cell !== "empty") {
                    return i;
                }
            } return 0;
        },
        getColumnOnly: function(cell) {
            var column = cell.charAt(0).toUpperCase();
            return column;
        },
        getColumnColor: function(cell) {
            var column = controller.getColumnOnly(cell);
            var row = controller.findHighest(column);
            var index = column + row;
            var color = document.getElementById(index).className;
            return color;
        },
        getCapturable: function(cell) {
            var cellClass = document.getElementById(cell).className;
            return cellClass;
        },
        validatePlayer: function(cell, die) {
            var player = model.playerTurn;
            var columnColor = controller.getColumnColor(cell);
            if (player !== columnColor) {
                alert("wrong player");
                
            } else {
                controller.moveTest(cell, die);
            }
        },
        getInactivePlayer: function() {
            var player = model.playerTurn;
            if (player === "Black") {
                return "White";
            } else {
                return "Black";
            }
        },
        bearingOffCounterUp: function(player) {
            model["bearingOff"+player]++;
        },
        bearingOffCounterDown: function(inactivePlayer){
            model["bearingOff"+inactivePlayer]--;
        },
        // proof of concept function coming. Remove later

        moveTest: function(cell, die) {
            var player = model.playerTurn;
            var inactivePlayer = controller.getInactivePlayer();
            var newDirection;
            var move;
            var column;
            var roll = die;
            var columnColor;
            var jailOccupied = document.getElementById(player + "Cell");
            /*
            if (model.numberOfMoves === 0) {
                roll = model.dice[1];
            } */
            
            if (player === "White") {
                newDirection = 1;
            } else {
                newDirection = -1;
            }
            move = newDirection * roll;
            if (jailOccupied.innerHTML > 0) {
                if (player === "Black") {
                    column = "Z";
                } else {
                    column = "A";
                } var jail = document.getElementById(player + "Cell");
                  jail.innerHTML = Number(jail.innerHTML)-1; //abort decrement if unable to play
            } else {
                column = controller.getColumnOnly(cell);
                var oldRow = controller.findHighest(column);
                view.emptyCell(column+oldRow);
            }
            var newColumn= controller.getNewColumn(column, move);
            var newColumnCode = newColumn.charCodeAt(0);
            var columnCode = column.charCodeAt(0);
            if (newColumnCode < 90 && newColumnCode > 65) {    //check for new column on board
                columnColor = controller.getColumnColor(newColumn);
                if (columnColor === player || columnColor ==="empty") { // check that new column is either empty or occupied by hte active player
                    controller.findLowest(newColumn, player);
                    // try another bearing off method here. whenever a checker passes the threshold, add 1 to the bearing off value. when value = 15, bearing off is legal
                    //make sure to check oldColumn for origin outside zone
                    // need to get column code instead of just the letter
                    if (((player==="Black" && newColumnCode<72)&& columnCode>71) || ((player==="White"&& newColumnCode>83)&& columnCode < 84)) {
                        controller.bearingOffCounterUp(player);
                    } 
                    controller.advancePlayer();
                } else {                                            // otherwise, check if it is capturable
                    var capturableCell = controller.getCapturable(newColumn+1);
                    if (capturableCell === "empty") {
                        view.fillCell(newColumn+0,player);
                        var enemyJail = document.getElementById(inactivePlayer + "Cell");
                        enemyJail.innerHTML = Number(enemyJail.innerHTML)+1;
                        if (((player==="Black" && newColumnCode<72)&& columnCode>71) || ((player==="White"&& newColumnCode>83)&& columnCode < 84)) {
                            controller.bearingOffCounterUp(player);
                        }
                        if (((player === "Black")&& newColumnCode>83) || ((player === "White")&& newColumnCode<72)) {
                        controller.bearingOffCounterDown(inactivePlayer);
                        } // ^ checks for captured token in bearing off zone
                        controller.advancePlayer();
                    } else {                                       // if not empty, occupied by player, or capturable, it is not a valid move
                        alert("invalid move");
                        view.fillCell(column+oldRow, player);
                    }
                }
            } else {
                var bearingOffLegal = "bearingOff"+player;
                if (bearingOffLegal >= 15) {
                    alert("you may bear off"); //need some bearing off code here
                }

                alert("off the board (not ready for bearing off)");
                view.fillCell(column+oldRow, player);
            }
        }
        
    };
    function init() {
        model.setupBoard();
        controller.rollDice(1);
        var fireButton = document.getElementById("bgFireButton");
        fireButton.onclick = handleFireButton;
        var guessInput = document.getElementById("guessInput");
        guessInput.onkeypress = handleKeyPress;      
        var clearButton = document.getElementById("clearButton");
        clearButton.onclick = handleClearButton;
      // These need some serious work still
        var switchActiveDie = document.getElementById("dice");
        switchActiveDie.onclick = handleSwitchDiceButton;
        var getActiveColumn1 = document.getElementById("backgammonTableOne");
        getActiveColumn1.onclick = handleGetActiveColumn;
        var getActiveColumn2 = document.getElementById("backgammonTableTwo");
        getActiveColumn2.onclick = handleGetActiveColumn;
        var getActiveColumn3 = document.getElementById("backgammonTableThree");
        getActiveColumn3.onclick = handleGetActiveColumn;
        var getActiveColumn4 = document.getElementById("backgammonTableFour");
        getActiveColumn4.onclick = handleGetActiveColumn;
        var endTurnButton = document.getElementById("endTurn");
        endTurnButton.onclick = endTurnPress;
        
    }
    function endTurnPress () {
        model.numberOfMoves = 0;
        controller.advancePlayer();
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
    controller.validatePlayer(col);
    colInput.value = "";
    }
    function handleGetActiveColumn (event) {
        var data = event.target;
        var cell = data.id;
        var column = cell.charAt(0);
        controller.setActiveColumn(column);
    }
    function handleSwitchDiceButton (event) {
        var data = event.target;
        var value = data.cellIndex;
        var die = model.dice[value];
        controller.setActiveDie(die);
    }
    
    function handleClearButton () {
        var clearButton = document.getElementById("clearButton");
        clearButton.onclick = model.clearBoard();
    }
    function handleRollDieButton() {
        
    }
    init();
}