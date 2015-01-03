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
            
        }
        
    };
    var model = {
        playerTurn: "Black",
        startLocationsWhite: ["B0", "B1", "M0", "M1", "M2", "M3", "M4", "R0", "R1", "R2", "T0", "T1", "T2", "T3", "T4"],
        startLocationsBlack: ["Y0", "Y1", "N0", "N1", "N2", "N3", "N4", "I0", "I1", "I2", "G0", "G1", "G2", "G3", "G4"],
        dice: [1,2],
        numberOfMoves: 1,
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
            if (model.numberOfMoves === 0) {
                model.numberOfMoves = 2; //probably not the right place for this.
                controller.rollDice();
                if (model.playerTurn === "White") {
                    model.playerTurn = "Black";
                    var label = document.getElementById("bgFireButton");
                    label.setAttribute("value", "Black move!");
                    controller.rollDice();
                } else {
                model.playerTurn = "White";
                    var label = document.getElementById("bgFireButton");
                    label.setAttribute("value", "White move!");
                    controller.rollDice();
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
                controller.moveTest2(die, column);
            }
        },
        setActiveColumn: function(column) {
            model.activeColumn = column;
            var die = model.activeDie;
            if (die != null) {
                controller.moveTest2(die, column);
            }
        },



            /* there is a lot of half baked stuff here that I ened to refine, but I wanted to get my general idea down */

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
        // proof of concept function coming. Remove later
        moveTest2: function(die, column) { //for mouseevents only. refere to moveTest for current function
            var player = model.playerTurn;

            var newDirection;
            var move;
            var columnColor;
            if (player === "White") {
                newDirection = 1;
            } else {
                newDirection = -1;
            }
            move = newDirection * die;
            var oldRow = controller.findHighest(column);
            view.emptyCell(column+oldRow);
            var newColumn= controller.getNewColumn(column, move);
            var newColumnCode = newColumn.charCodeAt(0);
            if (newColumnCode < 90 && newColumnCode > 65) {
                columnColor = controller.getColumnColor(newColumn);
                if (columnColor === player || columnColor ==="empty") {
                    controller.findLowest(newColumn, player);
                    controller.advancePlayer();
                } else {
                    alert("invalid move");
                    view.fillCell(column+oldRow, player);

                }
            } else {
                alert("off the board (not ready for bearing off)");
                view.fillCell(column+oldRow, player);
            }            
        },
        moveTest: function(cell, die) {
            var player = model.playerTurn;
            var inactivePlayer = controller.getInactivePlayer();
            var newDirection;
            var move;
            var column;
            var roll = model.dice[0];
            var columnColor;
            var jailOccupied = document.getElementById(player + "Cell");
            if (player === "White") {
                newDirection = 1;
            } else {
                newDirection = -1;
            }
            move = newDirection * roll;
            if (jailOccupied.innerHTML > 0) {
                if (player === "Black") {
                    column = "Z"+move;
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
            if (newColumnCode < 90 && newColumnCode > 65) {
                columnColor = controller.getColumnColor(newColumn);
                if (columnColor === player || columnColor ==="empty") {
                    controller.findLowest(newColumn, player);
                    controller.advancePlayer();
                } else { 
                    var capturableCell = controller.getCapturable(newColumn+1);
                    if (capturableCell === "empty") {
                        //capture cell
                        view.fillCell(newColumn+0,player);
                        // need to send captured checker to jail still
                        var enemyJail = document.getElementById(inactivePlayer + "Cell");
                        enemyJail.innerHTML = Number(enemyJail.innerHTML)+1;
                        controller.advancePlayer();
                    } else {                 
                        alert("invalid move");
                        view.fillCell(column+oldRow, player);
                    }
                }
            } else {
                alert("off the board (not ready for bearing off)");
                view.fillCell(column+oldRow, player);
            }
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
    controller.validatePlayer(col);
    colInput.value = "";
    }
    
    function handleClearButton () {
        var clearButton = document.getElementById("clearButton");
        clearButton.onclick = model.clearBoard();
    }
    function handleClick (e) {
        var dieClick = document.getElementById("die0");
        var roll = dieClick.innerHTML;
        controller.activeDie(roll);
    }
    function handleRollDieButton() {
        
    }
    init();
}