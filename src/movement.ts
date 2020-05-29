
import {ActivePath} from './activePath'
import {PieceState, Red, Blue, Green, Yellow} from './pieceState'
export class Movement {
    piece_offset: number;
    grid_offset: number;
    scene: Phaser.Scene

    constructor(piece_offset: number, grid_offset: number, scene: Phaser.Scene) {
        this.piece_offset = piece_offset
        this.grid_offset = grid_offset
        this.scene = scene;
    }

    generatePathA1(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 0;
        const stopIndex = 5;

        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets A1 criteria because it is " +  startIndex + " <= " + stopIndex);
            if ((index + moveBy) > stopIndex){
                //console.log("Movement index " + (index + moveBy) + " is >= " + stopIndex);
                let adjustedMoveBy = (stopIndex - index)
                let x_start1 = (x + (this.grid_offset * adjustedMoveBy))
                if (adjustedMoveBy > 0) {
                    path.lineTo(x_start1, y)
                }
                let x_start2 = (x_start1 + this.grid_offset); 
                let y_start1 = (y - this.grid_offset)

                path.lineTo(x_start2 ,y_start1)
                path.remainderIndex = (moveBy - adjustedMoveBy) - 1;
                path.projectedIndex = stopIndex + 1
                path.projectedX = x_start2;
                path.projectedY = y_start1
                return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= 5");
                path.lineTo(x + (this.grid_offset * moveBy), y)
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                return path;
            }
        }
        else {
            return null;
        }
        
    }

    generatePathC1(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 6;
        const stopIndex = 11;
    
        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets C1 criteria because it is " +  startIndex + " <= " + stopIndex);
        
            if ((index + moveBy) > stopIndex){
                //console.log("Movement index: " + (index + moveBy) + " is greater than stop index: " + stopIndex);
                let adjustedMoveBy = (stopIndex - index)
                let y_start1 = (y - (this.grid_offset * adjustedMoveBy))
                if (adjustedMoveBy > 0) {
                    path.lineTo(x, y_start1)
                }
                let x_start1 = (x + this.grid_offset);
                path.lineTo(x_start1, y_start1)
                path.remainderIndex = (moveBy - adjustedMoveBy) -1
                path.projectedIndex = (index + adjustedMoveBy) + 1
                path.projectedX = x_start1
                path.projectedY = y_start1
;               return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= 11");
                path.lineTo(x, y - (this.grid_offset * moveBy))
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                return path;
            }
        }
        else {
            return null;
        }
    }

    generatePathA2(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 12;
        const stopIndex = 13;

        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets A2 criteria because it is " +  startIndex + " <= " + stopIndex);

            if (path.homeIndex === 12){
                //console.log("Detecting blue home index...")
                let blueHomePath = this.blueFromActiveToHomePath(path, index, moveBy,x, y)
                return blueHomePath
            }
        
            if ((index + moveBy) > stopIndex){
                //console.log("Movement index " + (index + moveBy) + " is greater than stop index: " + stopIndex);
                let adjustedMoveBy = (stopIndex - index)
                let x_start1 = (x + (this.grid_offset * adjustedMoveBy))
                let y_start1 = (y + this.grid_offset)
                if (adjustedMoveBy > 0) {
                    path.lineTo(x_start1, y)
                }
                path.lineTo(x_start1, y_start1)
                path.remainderIndex = (moveBy - adjustedMoveBy) -1
                path.projectedIndex = stopIndex + 1
                path.projectedX = x_start1
                path.projectedY = y_start1
                return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " <= 13");
                path.lineTo(x + (this.grid_offset * moveBy), y)
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                return path;
            }
        }
        else {
            return null;
        }
        
    }


    generatePathD1(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 14;
        const stopIndex = 18;

        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets D1 criteria because it is " +  startIndex + " <= " + stopIndex);
        
            if ((index + moveBy) > stopIndex){
                //console.log("Movement index: " + (index + moveBy) + " is greater than stop index: " + stopIndex);
                let adjustedMoveBy = (stopIndex - index)
                let y_start1 = (y + (this.grid_offset * adjustedMoveBy))
                let y_start2 = (y_start1 + this.grid_offset)
                let x_start = (x + this.grid_offset)
                if (adjustedMoveBy > 0) {
                    path.lineTo(x, y_start1)
                }
                path.lineTo(x_start, y_start2)
                path.remainderIndex = (moveBy - adjustedMoveBy) -1
                path.projectedIndex = (index + adjustedMoveBy) + 1
                path.projectedX = x_start
                path.projectedY = y_start2
;               return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= 18");
                path.lineTo(x, y + (this.grid_offset * moveBy))
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                return path;
            }
        }
        else {
            return null;
        }
    }

    generatePathA3(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 19;
        const stopIndex = 24;

        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets A3 criteria because it is " +  startIndex + " <= " + stopIndex);
        
            if ((index + moveBy) > stopIndex){
                //console.log("Movement index " + (index + moveBy) + " is >= " + stopIndex);
                let adjustedMoveBy = (stopIndex - index)
                let x_start1 = (x + (this.grid_offset * adjustedMoveBy))
                if (adjustedMoveBy > 0) {
                    path.lineTo(x_start1, y)
                }
                let y_start1 = (y + this.grid_offset)
                path.lineTo(x_start1 ,y_start1)
                path.remainderIndex = (moveBy - adjustedMoveBy) -1;
                path.projectedIndex = stopIndex + 1
                path.projectedX = x_start1;
                path.projectedY = y_start1
                return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= 5");
                path.lineTo(x + (this.grid_offset * moveBy), y)
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                return path;
            }
        }
        else {
            return null;
        }
        
    }

    generatePathD2(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 25;
        const stopIndex = 26;

        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets D2 criteria because it is " +  startIndex + " <= " + stopIndex);

            if (path.homeIndex === 25){
                //console.log("Detecting yellow home index...")
                let blueHomePath = this.yellowFromActiveToHomePath(path, index, moveBy,x, y)
                return blueHomePath
            }
        
            if ((index + moveBy) > stopIndex){
                //console.log("Movement index: " + (index + moveBy) + " is greater than stop index: " + stopIndex);
                let adjustedMoveBy = (stopIndex - index)
                let y_start1 = (y + (this.grid_offset * adjustedMoveBy))
                if (adjustedMoveBy > 0) {
                    path.lineTo(x, y_start1)
                }
                let x_start1 = (x - this.grid_offset)
                path.lineTo(x_start1, y_start1)
                path.remainderIndex = (moveBy - adjustedMoveBy) -1
                path.projectedIndex = (index + adjustedMoveBy) + 1
                path.projectedX = x_start1
                path.projectedY = y_start1
;               return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= 26");
                path.lineTo(x, y + (this.grid_offset * moveBy))
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                return path;
            }
        }
        else {
            return null;
        }
    }

    generatePathB1(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 27;
        const stopIndex = 31;

        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets B1 criteria because it is " +  startIndex + " <= " + stopIndex);
        
            if ((index + moveBy) > stopIndex){
                //console.log("Movement index " + (index + moveBy) + " is >= " + stopIndex);
                let adjustedMoveBy = (stopIndex - index)
                let x_start1 = (x - (this.grid_offset * adjustedMoveBy))
                if (adjustedMoveBy > 0) {
                    path.lineTo(x_start1, y)
                }
                let y_start1 = (y + this.grid_offset)
                let x_start2 = (x_start1 - this.grid_offset)
                path.lineTo(x_start2 ,y_start1)
                path.remainderIndex = (moveBy - adjustedMoveBy) -1;
                path.projectedIndex = stopIndex + 1
                path.projectedX = x_start2;
                path.projectedY = y_start1
                return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= 5");
                path.lineTo(x - (this.grid_offset * moveBy), y)
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                return path;
            }
        }
        else {
            return null;
        }
        
    }

    generatePathD3(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 32;
        const stopIndex = 37;

        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets D3 criteria because it is " +  startIndex + " <= " + stopIndex);
        
            if ((index + moveBy) > stopIndex){
                //console.log("Movement index: " + (index + moveBy) + " is greater than stop index: " + stopIndex);
                let adjustedMoveBy = (stopIndex - index)
                let y_start1 = (y + (this.grid_offset * adjustedMoveBy))
                if (adjustedMoveBy > 0) {
                    path.lineTo(x, y_start1)
                }
                let x_start1 = (x - this.grid_offset)
                path.lineTo(x_start1, y_start1)
                path.remainderIndex = (moveBy - adjustedMoveBy) -1
                path.projectedIndex = (index + adjustedMoveBy) + 1
                path.projectedX = x_start1
                path.projectedY = y_start1
;               return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= 18");
                path.lineTo(x, y + (this.grid_offset * moveBy))
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                return path;
            }
        }
        else {
            return null;
        }
    }

    generatePathB2(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 38;
        const stopIndex = 39;

        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets B2 criteria because it is " +  startIndex + " <= " + stopIndex);

            if (path.homeIndex === 38){
                //console.log("Detecting green home index...")
                let greenHomePath = this.greenFromActiveToHomePath(path, index, moveBy,x, y)
                return greenHomePath
            }
        
            if ((index + moveBy) > stopIndex){
                //console.log("Movement index " + (index + moveBy) + " is >= " + stopIndex);
                let adjustedMoveBy = (stopIndex - index)
                //console.log("Adjusted: " + adjustedMoveBy)
                let x_start1 = (x - (this.grid_offset * adjustedMoveBy))
                if (adjustedMoveBy > 0) {
                    path.lineTo(x_start1, y)
                }
                let y_start1 = Math.abs(y - this.grid_offset)
                path.lineTo(x_start1 ,y_start1)
                path.remainderIndex = (moveBy - adjustedMoveBy) -1;
                path.projectedIndex = stopIndex + 1
                path.projectedX = x_start1;
                path.projectedY = y_start1
                return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= " + stopIndex);
                path.lineTo(x - (this.grid_offset * moveBy), y)
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                return path;
            }
        }
        else {
            return null;
        }
        
    }

    generatePathC2(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 40;
        const stopIndex = 44;

        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets C2 criteria because it is " +  startIndex + " <= " + stopIndex);
        
            if ((index + moveBy) > stopIndex){
                //console.log("Movement index: " + (index + moveBy) + " is greater than stop index: " + stopIndex);
                let adjustedMoveBy = (stopIndex - index)
                let y_start1 = (y - (this.grid_offset * adjustedMoveBy))
                if (adjustedMoveBy > 0) {
                    path.lineTo(x, y_start1)
                }
                let x_start1 = (x - this.grid_offset);
                let y_start2 = (y_start1 - this.grid_offset)
                
                path.lineTo(x_start1, y_start2)
                path.remainderIndex = (moveBy - adjustedMoveBy) -1
                path.projectedIndex = (index + adjustedMoveBy) + 1
                path.projectedX = x_start1
                path.projectedY = y_start2
;               return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= 44");
                path.lineTo(x, y - (this.grid_offset * moveBy))
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                return path;
            }
        }
        else {
            return null;
        }
    }

    generatePathB3(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 45;
        const stopIndex = 50;

        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets B3 criteria because it is " +  startIndex + " <= " + stopIndex);
        
            if ((index + moveBy) > stopIndex){
                //console.log("Movement index " + (index + moveBy) + " is >= " + stopIndex);
                let adjustedMoveBy = (stopIndex - index)
                let x_start1 = (x - (this.grid_offset * adjustedMoveBy))
                if (adjustedMoveBy > 0) {
                    path.lineTo(x_start1, y)
                }
                let y_start1 = (y - this.grid_offset)
                path.lineTo(x_start1 ,y_start1)
                path.remainderIndex = (moveBy - adjustedMoveBy) -1;
                path.projectedIndex = stopIndex + 1
                path.projectedX = x_start1;
                path.projectedY = y_start1
                return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= 50");
                path.lineTo(x - (this.grid_offset * moveBy), y)
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                return path;
            }
        }
        else {
            return null;
        }
        
    }

    generatePathC3(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const stopIndex = 51;
        const startIndex = 51;
        //console.log("C3 ProjectedIndexBefore: " + path.projectedIndex)

        if (path.homeIndex === 51){
            //console.log("Detecting red home index...")
            let redHomePath = this.redFromActiveToHomePath(path, index, moveBy,x, y)
            return redHomePath
        }

        if (index === stopIndex) {
            //console.log("index: " + index + " Meets C3 criteria because it is " +  startIndex + " <= " + stopIndex);
        
            if ((index + moveBy) > stopIndex){
                //console.log("Movement index: " + (index + moveBy) + " is greater than stop index: " + stopIndex);
                let adjustedMoveBy = Math.abs(stopIndex - index)
                let y_start1 = (y - this.grid_offset);
                if (adjustedMoveBy > 0) {
                    path.lineTo(x, y_start1)
                }
                let x_start1 = (x + (this.grid_offset * adjustedMoveBy))
                
                path.lineTo(x_start1, y_start1)
                path.remainderIndex = (moveBy - adjustedMoveBy) -1
                path.projectedIndex = 0
                path.projectedX = x_start1
                path.projectedY = y_start1
;               return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is == 51");
                path.lineTo(x, y - (this.grid_offset * moveBy))
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                return path;
            }
        }
        else {
            return null;
        }
    }

    generatePathA4(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 52;
        const stopIndex = 57;
        // red
        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets A4 criteria because it is " +  startIndex + " <= " + stopIndex);
            if ((index + moveBy) > stopIndex){
                //console.log("Movement denied because index: " + (index + moveBy) + " is greater than stop index: " + stopIndex);
                path.remainderIndex = 0
                path.isValid = false
                return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= " + stopIndex);
                path.lineTo(x + (this.grid_offset * moveBy), y)
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                if (newIndex == stopIndex) {
                    path.projectedPieceState = PieceState.Exited
                }
                return path;
            }
        }
        else {
            return null;
        }
    }

    generatePathD4(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 58;
        const stopIndex = 63;
        // blue
        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets D4 criteria because it is " +  startIndex + " <= " + stopIndex);
            if ((index + moveBy) > stopIndex){
                //console.log("Movement denied because index: " + (index + moveBy) + " is greater than stop index: " + stopIndex);
                path.remainderIndex = 0
                path.isValid = false
                return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= " + stopIndex);
                path.lineTo(x, y + (this.grid_offset * moveBy))
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                if (newIndex == stopIndex) {
                    path.projectedPieceState = PieceState.Exited
                }
                return path;
            }
        }
        else {
            return null;
        }
    }

    generatePathB4(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 64;
        const stopIndex = 69;
        // yellow
        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets B4 criteria because it is " +  startIndex + " <= " + stopIndex);
            if ((index + moveBy) > stopIndex){
                //console.log("Movement denied because index: " + (index + moveBy) + " is greater than stop index: " + stopIndex);
                path.remainderIndex = 0
                path.isValid = false
                return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= " + stopIndex);
                path.lineTo(x - (this.grid_offset * moveBy), y)
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                if (newIndex == stopIndex) {
                    path.projectedPieceState = PieceState.Exited
                }
                return path;
            }
        }
        else {
            return null;
        }
    }

    generatePathC4(moveBy: number, index: number, x: number, y: number, path: ActivePath): ActivePath {
        const startIndex = 70;
        const stopIndex = 75;
        // green
        if (index >= startIndex && index <= stopIndex) {
            //console.log("index: " + index + " Meets C4 criteria because it is " +  startIndex + " <= " + stopIndex);
            if ((index + moveBy) > stopIndex){
                //console.log("Movement denied because index: " + (index + moveBy) + " is greater than stop index: " + stopIndex);
                path.isValid = false
                path.remainderIndex = 0
                return path;
            }else {
                let newIndex = (index + moveBy);
                //console.log("Movement index: " + newIndex + " is <= " + stopIndex);
                path.lineTo(x, y - (this.grid_offset * moveBy))
                path.projectedIndex = newIndex;
                path.remainderIndex = 0
                if (newIndex == stopIndex) {
                    //console.log("Piece is exited........................... ");
                    path.projectedPieceState = PieceState.Exited
                }
                return path;
            }
        }
        else {
            return null;
        }
    }


    getPathFunctionId(index: number): string {
        if (index < 0){
            return "Z1"
        }
        if (index >=0 && index <=5){
            return "A1"
        }
        if (index >=6 && index <=11){
            return "C1"
        }
        if (index >=12 && index <=13){
            return "A2"
        }
        if (index >=14 && index <=18){
            return "D1"
        }
        if (index >=19 && index <=24){
            return "A3"
        }
        if (index >=25 && index <=26){
            return "D2"
        }
        if (index >=27 && index <=31){
            return "B1"
        }
        if (index >=32 && index <=37){
            return "D3"
        }
        if (index >=38 && index <=39){
            return "B2"
        }
        if (index >=40 && index <=44){
            return "C2"
        }
        if (index >=45 && index <=50){
            return "B3"
        }
        if (index >=51 && index < 52){
            return "C3"
        }
        if (index >=52 && index <= 57){
            return "A4"
        }
        if (index >=58 && index <= 63){
            return "D4"
        }
        if (index >=64 && index <= 69){
            return "B4"
        }
        if (index >=70 && index <= 75){
            return "C4"
        }
        return null;

    }

    blueFromActiveToHomePath(path: ActivePath, index: number, moveBy: number, x: number, y: number): ActivePath {
        // path is 58 - 63
        let homeStartIndex = 58
        let homeStopIndex = 63
        let adjustedMoveBy = Math.abs((index + moveBy) - path.homeIndex)
        //console.log("Adjusted Home Index: " + adjustedMoveBy)
        if (adjustedMoveBy > 6) {
            path.remainderIndex = 0
            path.isValid = false
            return path

        }
        let y_start1 = (y + (this.grid_offset * adjustedMoveBy))
        path.lineTo(x, y_start1)
        path.remainderIndex = 0
        path.projectedIndex = (homeStartIndex + (adjustedMoveBy - 1))
        if (path.projectedIndex == homeStopIndex) {
            path.projectedPieceState = PieceState.Exited
        }
        return path
        
    }

    yellowFromActiveToHomePath(path: ActivePath, index: number, moveBy: number, x: number, y: number): ActivePath {
        // path is 64 - 69
        let homeStartIndex = 64
        let homeStopIndex = 69
        let adjustedMoveBy = Math.abs((index + moveBy) - path.homeIndex)
        //console.log("Adjusted Home Index: " + adjustedMoveBy)
        if (adjustedMoveBy > 6) {
            path.remainderIndex = 0
            path.isValid = false
            return path

        }
        let x_start1 = (x - (this.grid_offset * adjustedMoveBy))
        path.lineTo(x_start1, y)
        path.remainderIndex = 0
        path.projectedIndex = (homeStartIndex + (adjustedMoveBy - 1))
        if (path.projectedIndex == homeStopIndex) {
            path.projectedPieceState = PieceState.Exited
        }
        return path
    }

    greenFromActiveToHomePath(path: ActivePath, index: number, moveBy: number, x: number, y: number): ActivePath {
        // path is 70 - 75
        let homeStartIndex = 70
        let homeStopIndex = 75
        let adjustedMoveBy = Math.abs((index + moveBy) - path.homeIndex)
        //console.log("Adjusted Home Index: " + adjustedMoveBy)
        if (adjustedMoveBy > 6) {
            path.remainderIndex = 0
            path.isValid = false
            return path

        }
        let y_start1 = (y - (this.grid_offset * adjustedMoveBy))
        path.lineTo(x, y_start1)
        path.remainderIndex = 0
        path.projectedIndex = (homeStartIndex + (adjustedMoveBy - 1))
        if (path.projectedIndex == homeStopIndex) {
            path.projectedPieceState = PieceState.Exited
        }
        return path
    }

    redFromActiveToHomePath(path: ActivePath, index: number, moveBy: number, x: number, y: number): ActivePath {
        // path is 52 - 57
        let homeStartIndex = 52
        let homeStopIndex = 57
        let adjustedMoveBy = Math.abs((index + moveBy) - path.homeIndex)
        //console.log("Adjusted Home Index: " + adjustedMoveBy)
        if (adjustedMoveBy > 6) {
            path.remainderIndex = 0
            path.isValid = false
            return path

        }
        let x_start1 = (x + (this.grid_offset * adjustedMoveBy))
        path.lineTo(x_start1, y)
        path.remainderIndex = 0
        path.projectedIndex = (homeStartIndex + (adjustedMoveBy - 1))
        if (path.projectedIndex == homeStopIndex) {
            path.projectedPieceState = PieceState.Exited
        }
        return path
    }

    generatePathZ1(path: ActivePath, moveBy: number): ActivePath {
    
        switch(path.pieceType){
            case Red: {
                //console.log("Criteria Z1 Moving red piece to index " + path.projectedStartIndex);
                path.projectedX = Red.StartX
                path.projectedY = Red.StartY
                path.lineTo(Red.StartX, Red.StartY)
                path.projectedIndex = Red.StartIndex
                path.remainderIndex = moveBy
                path.projectedPieceState = PieceState.Active
                //console.log("Remainder " + moveBy);
                return path;

            }
            case Blue: {
                //console.log("Criteria Z1 Moving blue piece to index " + path.projectedStartIndex);
                path.projectedX = Blue.StartX
                path.projectedY = Blue.StartY
                path.lineTo(Blue.StartX, Blue.StartY)
                path.projectedIndex = Blue.StartIndex
                path.remainderIndex = moveBy
                path.projectedPieceState = PieceState.Active
                //console.log("Remainder " + moveBy);
                return path;

            }
            case Yellow: {
                //console.log("Criteria Z1 Moving yellow piece to index " + path.projectedStartIndex);
                path.projectedX = Yellow.StartX
                path.projectedY = Yellow.StartY
                path.lineTo(Yellow.StartX, Yellow.StartY)
                path.projectedIndex = Yellow.StartIndex
                path.remainderIndex = moveBy
                path.projectedPieceState = PieceState.Active
                //console.log("Remainder " + moveBy);
                return path;

            }
            case Green: {
                //console.log("Criteria Z1 Moving green piece to index " + path.projectedStartIndex);
                path.projectedX = Green.StartX
                path.projectedY = Green.StartY
                path.lineTo(Green.StartX, Green.StartY)
                path.projectedIndex = Green.StartIndex
                path.remainderIndex = moveBy
                path.projectedPieceState = PieceState.Active
                //console.log("Remainder " + moveBy);
                return path;
            }
            default:
                break;
            return null
        }
    }
    
};