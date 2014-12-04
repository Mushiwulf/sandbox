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
        
        startLocationsWhite: ["B0", "B1", "M0", "M1", "M2", "M3", "M4", "R0", "R1", "R2", "T0", "T1", "T2", "T3", "T4"],
        startLocationsBlack: ["Y0", "Y1", "N0", "N1", "N2", "N3", "N4", "I0", "I1", "I2", "G0", "G1", "G2", "G3", "G4"],
        clearBoard: function() {
            for (var i = 0; i < model.startLocationsWhite.length; i++) {
                var index = this.startLocationsWhite[i];
                view.emptyCell(index);
            }
                        
        },
        setupBoard: function() {
            model.clearBoard();
            for (var i = 0; i < model.startLocationsWhite.length; i++) {
                var index = this.startLocationsWhite[i];
                view.fillCell(index, "White");
            }
            for (var i = 0; i < model.startLocationsBlack.length; i++) {
                var index = this.startLocationsBlack[i];
                view.fillCell(index, "Black");
            }            
        }
    };
    var controller = {
        
    };
    function init() {
        model.setupBoard();
    }
    init();
}