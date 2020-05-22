import {Piece} from './piece'
export class Draggable {
    piece_offset: number;
    grid_offset: number;
    scene: Phaser.Scene
    magicalNum = 44.25
    constructor(piece_offset: number, grid_offset: number, scene: Phaser.Scene){
        this.piece_offset = piece_offset
        this.grid_offset = grid_offset
        this.scene = scene;
    }

    configureDraggable(piece: Piece) : void {
        

        this.pathA1Range(piece)
        this.pathA2Range(piece)
        this.pathD1Range(piece)
        this.pathA3Range(piece)

       
        console.log("x: " + piece.x + " y: " + piece.y + " index: " + piece.index)

    }

    pathA1Range(piece: Piece): void {
        //console.log( 0 + " " + (this.getNextCord(5) + this.magicalNum) + " " + 0 + " " + this.getNextCord(6) + this.magicalNum)
        if ((piece.x >= 0) && (piece.x <= this.getNextCord(5)  + this.magicalNum)  && (piece.y >= 0 && piece.y <= this.getNextCord(6) + this.magicalNum)){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            //console.log(this.piece_offset + " " + (this.getNextCord(5) + this.magicalNum) + " " + this.piece_offset + " " + this.getNextCord(5) + this.magicalNum)
            for (let i = 0; i < 6; i++) {
                if (piece.x > 0 && piece.x <= this.getNextCord(i)  + this.magicalNum && i===0){
                    piece.x = this.getNextCord(i)
                    piece.y = this.getNextCord(6)
                    piece.index = i
                    break;
                }
                if (piece.x > 0 && piece.x <= this.getNextCord(i)  + this.magicalNum && i===1){
                    piece.x = this.getNextCord(i)
                    piece.y = this.getNextCord(6)
                    piece.index = i
                    break;
                }
                if (piece.x > 0 && piece.x <= this.getNextCord(i)  + this.magicalNum && i===2){
                    piece.x = this.getNextCord(i)
                    piece.y = this.getNextCord(6)
                    piece.index = i
                    break;
                }
                if (piece.x > 0 && piece.x <= this.getNextCord(i)  + this.magicalNum && i===3){
                    piece.x = this.getNextCord(i)
                    piece.y = this.getNextCord(6)
                    piece.index = i
                    break;
                }
                if (piece.x > 0 && piece.x <= this.getNextCord(i)  + this.magicalNum && i===4){
                    piece.x = this.getNextCord(i)
                    piece.y = this.getNextCord(6)
                    piece.index = i
                    break;
                }
                if (piece.x > 0 && piece.x <= this.getNextCord(i)  + this.magicalNum && i===5){
                    piece.x = this.getNextCord(i)
                    piece.y = this.getNextCord(6)
                    piece.index = i
                    break;
                }
            }
        }


        let magicalNum = 22.5
        //console.log((this.getNextCord(6) - 3) + " " + (this.getNextCord(6) + magicalNum) + " " + 0 + " " + (this.getNextCord(6) - magicalNum))
        if ((piece.x >= this.getNextCord(6)- 3) && (piece.x <= this.getNextCord(6)  + magicalNum)  && (piece.y >= 0 && piece.y <= (this.getNextCord(6) - magicalNum))){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            //console.log(this.piece_offset + " " + (this.getNextCord(5) + this.magicalNum) + " " + this.piece_offset + " " + this.getNextCord(5) + this.magicalNum)
            for (let i = 0; i < 6; i++) {
                if (piece.y > 0 && piece.y <= this.getNextCord(i)  + this.magicalNum && i===0){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(i)
                    piece.index = 11
                    break;
                }
                if (piece.y > 0 && piece.y <= this.getNextCord(i)  + this.magicalNum && i===1){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(i)
                    piece.index = 10
                    break;
                }
                if (piece.y > 0 && piece.y <= this.getNextCord(i)  + this.magicalNum && i===2){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(i)
                    piece.index = 9
                    break;
                }
                if (piece.y > 0 && piece.y <= this.getNextCord(i)  + this.magicalNum && i===3){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(i)
                    piece.index = 8
                    break;
                }
                if (piece.y > 0 && piece.y <= this.getNextCord(i)  + this.magicalNum && i===4){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(i)
                    piece.index = 7
                    break;
                }
                if (piece.y > 0 && piece.y <= this.getNextCord(i)  + this.magicalNum && i===5){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(i)
                    piece.index = 6
                    break;
                }
            }
            
        }
    }

    pathA2Range(piece: Piece): void {
        let magicalNum = 23.5
        //console.log((this.getNextCord(7) - magicalNum -2) + " " + (this.getNextCord(7) + magicalNum) + " " + 0 + " " + (this.getNextCord(0) + magicalNum))
        if ((piece.x >= this.getNextCord(7)- magicalNum) && (piece.x <= this.getNextCord(7) + magicalNum)  && (piece.y >= 0 && piece.y <= (this.getNextCord(0) + magicalNum))){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            piece.x = this.getNextCord(7)
            piece.y = this.getNextCord(0)
            piece.index = 12
        }
    }


    pathD1Range(piece: Piece): void {
        let magicalNum = 44.25
        let xMin = this.getNextCord(8) - magicalNum
        let xMax = this.getNextCord(8) +5
        let yMin = 0
        let yMax = this.getNextCord(6) + magicalNum
        //console.log("PathD1 xMin: " + xMin + " xMax: " + xMax + " " + yMin + " " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            for (let i = 0; i < 6; i++) {
                if (piece.y > 0 && piece.y <= this.getNextCord(i)  + magicalNum && i===0){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(i)
                    piece.index = 13
                    break;
                }
                if (piece.y > 0 && piece.y <= this.getNextCord(i)  + this.magicalNum && i===1){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(i)
                    piece.index = 14
                    break;
                }
                if (piece.y > 0 && piece.y <= this.getNextCord(i)  + this.magicalNum && i===2){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(i)
                    piece.index = 15
                    break;
                }
                if (piece.y > 0 && piece.y <= this.getNextCord(i)  + this.magicalNum && i===3){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(i)
                    piece.index = 16
                    break;
                }
                if (piece.y > 0 && piece.y <= this.getNextCord(i)  + this.magicalNum && i===4){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(i)
                    piece.index = 17
                    break;
                }
                if (piece.y > 0 && piece.y <= this.getNextCord(i)  + this.magicalNum && i===5){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(i)
                    piece.index = 18
                    break;
                }
            }
            
                
        }
    }

    pathD2Range(piece: Piece): void {
        let magicalNum = 23.5
        //console.log((this.getNextCord(7) - magicalNum -2) + " " + (this.getNextCord(7) + magicalNum) + " " + 0 + " " + (this.getNextCord(0) + magicalNum))
        if ((piece.x >= this.getNextCord(7)- magicalNum) && (piece.x <= this.getNextCord(7) + magicalNum)  && (piece.y >= 0 && piece.y <= (this.getNextCord(0) + magicalNum))){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            piece.x = this.getNextCord(7)
            piece.y = this.getNextCord(0)
            piece.index = 12
        }
    }

    pathA3Range(piece: Piece): void {
        let magicalNum = 44.25
        let xMin = this.getNextCord(9) - magicalNum
        let xMax = this.getNextCord(14) + magicalNum
        let yMin = 0
        let yMax = this.getNextCord(6) + magicalNum
        console.log("PathA3 xMin: " + xMin + " xMax: " + xMax + " " + yMin + " " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            console.log(this.piece_offset + " " + (this.getNextCord(5) + this.magicalNum) + " " + this.piece_offset + " " + this.getNextCord(5) + this.magicalNum)
            for (let i = 0; i < 6; i++) {
                if (piece.x > this.getNextCord(9) && piece.x <= this.getNextCord(9)  + this.magicalNum && i===0){
                    piece.x = this.getNextCord(9)
                    piece.y = this.getNextCord(6)
                    piece.index = 20
                    break;
                }
                if (piece.x > this.getNextCord(10) && piece.x <= this.getNextCord(10)  + this.magicalNum && i===1){
                    piece.x = this.getNextCord(10)
                    piece.y = this.getNextCord(6)
                    piece.index = 21
                    break;
                }
                if (piece.x > this.getNextCord(11) && piece.x <= this.getNextCord(11)  + this.magicalNum && i===2){
                    piece.x = this.getNextCord(11)
                    piece.y = this.getNextCord(6)
                    piece.index = 21
                    break;
                }
                if (piece.x > this.getNextCord(12) && piece.x <= this.getNextCord(12)  + this.magicalNum && i===3){
                    piece.x = this.getNextCord(12)
                    piece.y = this.getNextCord(6)
                    piece.index = 22
                    break;
                }
                if (piece.x > this.getNextCord(13) && piece.x <= this.getNextCord(13)  + this.magicalNum && i===4){
                    piece.x = this.getNextCord(13)
                    piece.y = this.getNextCord(6)
                    piece.index = 22
                    break;
                }
                if (piece.x > this.getNextCord(14) && piece.x <= this.getNextCord(14)  + this.magicalNum && i===5){
                    piece.x = this.getNextCord(14)
                    piece.y = this.getNextCord(6)
                    piece.index = 22
                    break;
                }
            }
            
        }
    }


    

    getNextCord(i: number): number{
        return this.piece_offset + (this.grid_offset * i)
    }
}