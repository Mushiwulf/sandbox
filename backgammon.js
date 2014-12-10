function backgammonGame () {
    var view = {
        fillCell: function(index, side) {
            var cell = document.getElementById(index);
            cell.setAttribute("class", "fill"+side);            
        },
        emptyCell: function(index) {
            var cell = document.getElementById(index);
            if (cell != "null") {
                cell.setAttribute("class", "empty");              
            }
               
        }
        
    };
    var model = {
        playerTurn: "white",
        startLocationsWhite: ["B0", "B1", "M0", "M1", "M2", "M3", "M4", "R0", "R1", "R2", "T0", "T1", "T2", "T3", "T4"],
        startLocationsBlack: ["Y0", "Y1", "N0", "N1", "N2", "N3", "N4", "I0", "I1", "I2", "G0", "G1", "G2", "G3", "G4"],
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
            if (model.playerTurn === "white") {
                model.playerTurn = "black"
            } else {
                model.playerTurn = "white"
            }
        },
        getActiveChecker: function(loction) {
            /* Take the index of the input and search the column for the last occupied slot*/
        },
        moveChecker: function(player, location, die) {
            var roll = this.die;
            if (player === "white") {
                var direction = 1;
            } else {
                direction = -1;
            }
            var move = roll*direction;
            
            var newLocation = String.fromCharCode(location.charCodeAt(0) + move);
            /* there is a lot of half baked stuff here that I ened to refine, but I wanted to get my general idea down */
        }
        
    };
    function init() {
        model.setupBoard();
    }
    init();
    
}