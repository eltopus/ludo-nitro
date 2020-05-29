import {Piece} from './piece'
import { PieceState } from './pieceState';
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
        this.pathC1Range(piece)
        this.pathA2Range(piece)
        this.pathD1Range(piece)
        this.pathA3Range(piece)
        this.pathD2Range(piece)
        this.pathB1Range(piece)
        this.pathD3Range(piece)
        this.pathB2Range(piece)
        this.pathC2Range(piece)
        this.pathB3Range(piece)
        this.pathC3Range(piece)
        this.pathRedRange(piece)
        this.pathYellowRange(piece)
        this.pathBlueRange(piece)
        this.pathGreenRange(piece)
        this.pathHomeRedRange(piece)
        this.pathHomeBlueRange(piece)
        this.pathHomeYellowRange(piece)
        this.pathHomeGreenRange(piece)
        this.configurePiece(piece)


       
        console.log("x: " + piece.x + " y: " + piece.y + " index: " + piece.index + " state: " + this.showPieceState(piece.pieceState))


    }

    pathA1Range(piece: Piece): void {
        // 0 - 5
        let magicalNum = 22.25
        let xMin = 0
        let xMax = this.getNextCord(5) + magicalNum
        let yMin = this.getNextCord(6) - magicalNum
        let yMax = this.getNextCord(6) + magicalNum
        //console.log("PathA1 xMin: " + xMin + " xMax: " + xMax + " " + yMin + " " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            for (let i = 0; i < 6; i++) {
                if (piece.x > 0 && piece.x <= this.getNextCord(0)  + magicalNum && i===0){
                    piece.x = this.getNextCord(0)
                    piece.y = this.getNextCord(6)
                    piece.index = 0
                    break;
                }
                if (piece.x > this.getNextCord(1) - magicalNum && piece.x <= this.getNextCord(1)  + magicalNum && i===1){
                    piece.x = this.getNextCord(1)
                    piece.y = this.getNextCord(6)
                    piece.index = 1
                    break;
                }
                if (piece.x > this.getNextCord(2) - magicalNum && piece.x <= this.getNextCord(2)  + magicalNum && i===2){
                    piece.x = this.getNextCord(2)
                    piece.y = this.getNextCord(6)
                    piece.index = 2
                    break;
                }
                if (piece.x > this.getNextCord(3) - magicalNum && piece.x <= this.getNextCord(3)  + magicalNum && i===3){
                    piece.x = this.getNextCord(3)
                    piece.y = this.getNextCord(6)
                    piece.index = 3
                    break;
                }
                if (piece.x >  this.getNextCord(4) - magicalNum&& piece.x <= this.getNextCord(4)  + magicalNum && i===4){
                    piece.x = this.getNextCord(4)
                    piece.y = this.getNextCord(6)
                    piece.index = 4
                    break;
                }
                if (piece.x > this.getNextCord(5) - magicalNum && piece.x <= this.getNextCord(5)  + magicalNum && i===5){
                    piece.x = this.getNextCord(5)
                    piece.y = this.getNextCord(6)
                    piece.index = 5
                    break;
                }
            }
            
                
        }
    }

    pathC1Range(piece: Piece): void {
        let magicalNum = 22.25
        let xMin = this.getNextCord(6) - magicalNum
        let xMax = this.getNextCord(6) + magicalNum
        let yMin = 0
        let yMax = this.getNextCord(5) + magicalNum
        //console.log("PathD1 xMin: " + xMin + " xMax: " + xMax + " " + yMin + " " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            for (let i = 0; i < 6; i++) {
                if (piece.y > this.getNextCord(5) - magicalNum && piece.y <= this.getNextCord(5)  + magicalNum && i===0){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(5)
                    piece.index = 6
                    break;
                }
                if (piece.y > this.getNextCord(4) - magicalNum && piece.y <= this.getNextCord(4)  + magicalNum && i===1){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(4)
                    piece.index = 7
                    break;
                }
                if (piece.y > this.getNextCord(3) - magicalNum && piece.y <= this.getNextCord(3)  + magicalNum && i===2){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(3)
                    piece.index = 8
                    break;
                }
                if (piece.y > this.getNextCord(2) - magicalNum && piece.y <= this.getNextCord(2)  + magicalNum && i===3){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(2)
                    piece.index = 9
                    break;
                }
                if (piece.y > this.getNextCord(1) - magicalNum && piece.y <= this.getNextCord(1)  + magicalNum && i===4){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(1)
                    piece.index = 10
                    break;
                }
                if (piece.y > 0 && piece.y <= this.getNextCord(0)  + magicalNum && i===5){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(0)
                    piece.index = 11
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



    pathA3Range(piece: Piece): void {
        let magicalNum = 22.25
        let xMin = this.getNextCord(9) - magicalNum
        let xMax = this.getNextCord(14) + magicalNum
        let yMin = this.getNextCord(6) - magicalNum
        let yMax = this.getNextCord(6) + magicalNum
       // console.log("PathA3 xMin: " + xMin + " xMax: " + xMax + " yMin: " + yMin + " yMax: " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            for (let i = 0; i < 6; i++) {
                if (piece.x >= this.getNextCord(9) - magicalNum && piece.x <= this.getNextCord(9)  + this.magicalNum && i===0){
                    piece.x = this.getNextCord(9)
                    piece.y = this.getNextCord(6)
                    piece.index = 19
                    break;
                }
                if (piece.x > this.getNextCord(10) - magicalNum && piece.x <= this.getNextCord(10)  + this.magicalNum && i===1){
                    piece.x = this.getNextCord(10)
                    piece.y = this.getNextCord(6)
                    piece.index = 20
                    break;
                }
                if (piece.x > this.getNextCord(11) - magicalNum && piece.x <= this.getNextCord(11)  + this.magicalNum && i===2){
                    piece.x = this.getNextCord(11)
                    piece.y = this.getNextCord(6)
                    piece.index = 21
                    break;
                }
                if (piece.x > this.getNextCord(12) - magicalNum && piece.x <= this.getNextCord(12)  + this.magicalNum && i===3){
                    piece.x = this.getNextCord(12)
                    piece.y = this.getNextCord(6)
                    piece.index = 22
                    break;
                }
                if (piece.x > this.getNextCord(13) - magicalNum && piece.x <= this.getNextCord(13)  + this.magicalNum && i===4){
                    piece.x = this.getNextCord(13)
                    piece.y = this.getNextCord(6)
                    piece.index = 23
                    break;
                }
                if (piece.x > this.getNextCord(14) - magicalNum && piece.x <= this.getNextCord(14)  + this.magicalNum && i===5){
                    piece.x = this.getNextCord(14)
                    piece.y = this.getNextCord(6)
                    piece.index = 24
                    break;
                }
            }
            
        }
    }


    pathD2Range(piece: Piece): void {
        let magicalNum = 23.5
        //console.log((this.getNextCord(7) - magicalNum -2) + " " + (this.getNextCord(7) + magicalNum) + " " + 0 + " " + (this.getNextCord(0) + magicalNum))
        if ((piece.x >= this.getNextCord(14)- magicalNum) && (piece.x <= this.getNextCord(14) + magicalNum)  && (piece.y >= this.getNextCord(7) - magicalNum) && piece.y <= (this.getNextCord(7) + magicalNum)){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            piece.x = this.getNextCord(14)
            piece.y = this.getNextCord(7)
            piece.index = 25
        }
    }

    pathB1Range(piece: Piece): void {
        let magicalNum = 22.25
        let xMin = this.getNextCord(9) - magicalNum
        let xMax = this.getNextCord(14) + magicalNum 
        let yMin = this.getNextCord(8) - magicalNum
        let yMax = this.getNextCord(9) + magicalNum
        //console.log("PathC1 xMin: " + xMin + " xMax: " + xMax + " yMin: " + yMin + " yMax: " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            for (let i = 0; i < 6; i++) {
                if (piece.x >= this.getNextCord(14) - magicalNum && piece.x <= this.getNextCord(14) + magicalNum && i===0){
                    piece.x = this.getNextCord(14)
                    piece.y = this.getNextCord(8)
                    piece.index = 26
                    break;
                }
                if (piece.x >= this.getNextCord(13) - magicalNum && piece.x <= this.getNextCord(13) + magicalNum + 10  && i===1){
                    //console.log("Detected x: " + (this.getNextCord(13)) + " y: " + (this.getNextCord(13) - magicalNum))
                    piece.x = this.getNextCord(13)
                    piece.y = this.getNextCord(8)
                    piece.index = 27
                    break;
                }
                if (piece.x > this.getNextCord(12) - magicalNum  && piece.x <= this.getNextCord(12)  + magicalNum && i===2){
                    piece.x = this.getNextCord(12)
                    piece.y = this.getNextCord(8)
                    piece.index = 28
                    break;
                }
                if (piece.x > this.getNextCord(11) - magicalNum && piece.x <= this.getNextCord(11)  + magicalNum && i===3){
                    piece.x = this.getNextCord(11)
                    piece.y = this.getNextCord(8)
                    piece.index = 29
                    break;
                }
                if (piece.x > this.getNextCord(10) - magicalNum && piece.x <= this.getNextCord(10)  + magicalNum && i===4){
                    piece.x = this.getNextCord(10)
                    piece.y = this.getNextCord(8)
                    piece.index = 30
                    break;
                }
                if (piece.x > this.getNextCord(9) - magicalNum && piece.x <= this.getNextCord(9)  + magicalNum && i===5){
                    piece.x = this.getNextCord(9)
                    piece.y = this.getNextCord(8)
                    piece.index = 31
                    break;
                }
            }
            
        }
    }

    pathD3Range(piece: Piece): void {
        let magicalNum = 22.25
        let xMin = this.getNextCord(8) - magicalNum
        let xMax = this.getNextCord(8) + magicalNum
        let yMin = this.getNextCord(9) - magicalNum
        let yMax = this.getNextCord(14) + magicalNum
        //console.log("PathD1 xMin: " + xMin + " xMax: " + xMax + " " + yMin + " " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            for (let i = 0; i < 6; i++) {
                if (piece.y > this.getNextCord(9) - magicalNum && piece.y <= this.getNextCord(9)  + magicalNum && i===0){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(9)
                    piece.index = 32
                    break;
                }
                if (piece.y > this.getNextCord(10) - magicalNum && piece.y <= this.getNextCord(10)  + magicalNum && i===1){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(10)
                    piece.index = 33
                    break;
                }
                if (piece.y > this.getNextCord(11) - magicalNum && piece.y <= this.getNextCord(11)  + magicalNum && i===2){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(11)
                    piece.index = 34
                    break;
                }
                if (piece.y > this.getNextCord(12) - magicalNum && piece.y <= this.getNextCord(12)  + magicalNum && i===3){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(12)
                    piece.index = 35
                    break;
                }
                if (piece.y >  this.getNextCord(13) - magicalNum&& piece.y <= this.getNextCord(13)  + magicalNum && i===4){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(13)
                    piece.index = 36
                    break;
                }
                if (piece.y > this.getNextCord(14) - magicalNum && piece.y <= this.getNextCord(14)  + magicalNum && i===5){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(14)
                    piece.index = 37
                    break;
                }
            }
            
                
        }
    }

    pathB2Range(piece: Piece): void {
        let magicalNum = 23.5
        //console.log((this.getNextCord(7) - magicalNum -2) + " " + (this.getNextCord(7) + magicalNum) + " " + 0 + " " + (this.getNextCord(0) + magicalNum))
        if ((piece.x >= this.getNextCord(7)- magicalNum) && (piece.x <= this.getNextCord(7) + magicalNum)  && (piece.y >= this.getNextCord(14) - magicalNum) && piece.y <= (this.getNextCord(14) + magicalNum)){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            piece.x = this.getNextCord(7)
            piece.y = this.getNextCord(14)
            piece.index = 38
        }
    }

    pathC2Range(piece: Piece): void {
        let magicalNum = 22.25
        let xMin = this.getNextCord(6) - magicalNum
        let xMax = this.getNextCord(6) + magicalNum
        let yMin = this.getNextCord(9) - magicalNum
        let yMax = this.getNextCord(14) + magicalNum
        //console.log("PathD1 xMin: " + xMin + " xMax: " + xMax + " " + yMin + " " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            for (let i = 0; i < 6; i++) {
                if (piece.y > this.getNextCord(14) - magicalNum && piece.y <= this.getNextCord(14)  + magicalNum && i===0){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(14)
                    piece.index = 39
                    break;
                }
                if (piece.y > this.getNextCord(13) - magicalNum && piece.y <= this.getNextCord(13)  + magicalNum && i===1){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(13)
                    piece.index = 40
                    break;
                }
                if (piece.y > this.getNextCord(12) - magicalNum && piece.y <= this.getNextCord(12)  + magicalNum && i===2){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(12)
                    piece.index = 41
                    break;
                }
                if (piece.y > this.getNextCord(11) - magicalNum && piece.y <= this.getNextCord(11)  + magicalNum && i===3){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(11)
                    piece.index = 42
                    break;
                }
                if (piece.y >  this.getNextCord(10) - magicalNum&& piece.y <= this.getNextCord(10)  + magicalNum && i===4){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(10)
                    piece.index = 43
                    break;
                }
                if (piece.y > this.getNextCord(9) - magicalNum && piece.y <= this.getNextCord(9)  + magicalNum && i===5){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(9)
                    piece.index = 44
                    break;
                }
            }
            
                
        }
    }

    pathB3Range(piece: Piece): void {
        let magicalNum = 44.25
        let xMin = 0
        let xMax = this.getNextCord(5) + magicalNum
        let yMin = this.getNextCord(8) - magicalNum
        let yMax = this.getNextCord(8) + magicalNum
       // console.log("PathA3 xMin: " + xMin + " xMax: " + xMax + " yMin: " + yMin + " yMax: " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            for (let i = 0; i < 6; i++) {
                if (piece.x >= this.getNextCord(5) - magicalNum && piece.x <= this.getNextCord(5)  + magicalNum && i===0){
                    piece.x = this.getNextCord(5)
                    piece.y = this.getNextCord(8)
                    piece.index = 45
                    break;
                }
                if (piece.x > this.getNextCord(4) - magicalNum && piece.x <= this.getNextCord(4)  + magicalNum && i===1){
                    piece.x = this.getNextCord(4)
                    piece.y = this.getNextCord(8)
                    piece.index = 46
                    break;
                }
                if (piece.x > this.getNextCord(3) - magicalNum && piece.x <= this.getNextCord(3)  + magicalNum && i===2){
                    piece.x = this.getNextCord(3)
                    piece.y = this.getNextCord(8)
                    piece.index = 47
                    break;
                }
                if (piece.x > this.getNextCord(2) - magicalNum && piece.x <= this.getNextCord(2)  + magicalNum && i===3){
                    piece.x = this.getNextCord(2)
                    piece.y = this.getNextCord(8)
                    piece.index = 48
                    break;
                }
                if (piece.x > this.getNextCord(1) - magicalNum && piece.x <= this.getNextCord(1)  + magicalNum && i===4){
                    piece.x = this.getNextCord(1)
                    piece.y = this.getNextCord(8)
                    piece.index = 49
                    break;
                }
                if (piece.x > this.getNextCord(0) - magicalNum && piece.x <= this.getNextCord(0)  + magicalNum && i===5){
                    piece.x = this.getNextCord(0)
                    piece.y = this.getNextCord(8)
                    piece.index = 50
                    break;
                }
            }
            
        }
    }

    pathC3Range(piece: Piece): void {
        let magicalNum = 23.5
        //console.log((this.getNextCord(7) - magicalNum -2) + " " + (this.getNextCord(7) + magicalNum) + " " + 0 + " " + (this.getNextCord(0) + magicalNum))
        if ((piece.x >= 0) && (piece.x <= this.getNextCord(0) + magicalNum)  && (piece.y >= this.getNextCord(7) - magicalNum && piece.y <= (this.getNextCord(7) + magicalNum))){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            piece.x = this.getNextCord(0)
            piece.y = this.getNextCord(7)
            piece.index = 51
        }
    }


    pathRedRange(piece: Piece): void {
        let magicalNum = 44.25
        let xMin = this.getNextCord(1) - magicalNum 
        let xMax = this.getNextCord(6) + magicalNum
        let yMin = this.getNextCord(7) - magicalNum
        let yMax = this.getNextCord(7) + magicalNum
       // console.log("PathA3 xMin: " + xMin + " xMax: " + xMax + " yMin: " + yMin + " yMax: " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            for (let i = 1; i < 7; i++) {
                if (piece.x >= this.getNextCord(1) - magicalNum && piece.x <= this.getNextCord(1)  + magicalNum && i===1){
                    piece.x = this.getNextCord(1)
                    piece.y = this.getNextCord(7)
                    piece.index = 52
                    break;
                }
                if (piece.x > this.getNextCord(2) - magicalNum && piece.x <= this.getNextCord(2)  + magicalNum && i===2){
                    piece.x = this.getNextCord(2)
                    piece.y = this.getNextCord(7)
                    piece.index = 53
                    break;
                }
                if (piece.x > this.getNextCord(3) - magicalNum && piece.x <= this.getNextCord(3)  + magicalNum && i===3){
                    piece.x = this.getNextCord(3)
                    piece.y = this.getNextCord(7)
                    piece.index = 54
                    break;
                }
                if (piece.x > this.getNextCord(4) - magicalNum && piece.x <= this.getNextCord(4)  + magicalNum && i===4){
                    piece.x = this.getNextCord(4)
                    piece.y = this.getNextCord(7)
                    piece.index = 55
                    break;
                }
                if (piece.x > this.getNextCord(5) - magicalNum && piece.x <= this.getNextCord(5)  + magicalNum && i===5){
                    piece.x = this.getNextCord(5)
                    piece.y = this.getNextCord(7)
                    piece.index = 56
                    break;
                }
                if (piece.x > this.getNextCord(6)  && piece.x <= this.getNextCord(6)  + magicalNum && i===6){
                    piece.x = this.getNextCord(6)
                    piece.y = this.getNextCord(7)
                    piece.index = 57
                    break;
                }
            }
            
        }
    }

    pathYellowRange(piece: Piece): void {
        // 64 - 69
        let magicalNum = 22.25
        let xMin = this.getNextCord(8) - magicalNum 
        let xMax = this.getNextCord(14) + magicalNum
        let yMin = this.getNextCord(7) - magicalNum
        let yMax = this.getNextCord(7) + magicalNum
       // console.log("PathA3 xMin: " + xMin + " xMax: " + xMax + " yMin: " + yMin + " yMax: " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            for (let i = 1; i < 7; i++) {
                if (piece.x >= this.getNextCord(13) - magicalNum && piece.x <= this.getNextCord(13)  + magicalNum && i===1){
                    piece.x = this.getNextCord(13)
                    piece.y = this.getNextCord(7)
                    piece.index = 64
                    break;
                }
                if (piece.x > this.getNextCord(12) - magicalNum && piece.x <= this.getNextCord(12)  + magicalNum && i===2){
                    piece.x = this.getNextCord(12)
                    piece.y = this.getNextCord(7)
                    piece.index = 65
                    break;
                }
                if (piece.x > this.getNextCord(11) - magicalNum && piece.x <= this.getNextCord(11)  + magicalNum && i===3){
                    piece.x = this.getNextCord(11)
                    piece.y = this.getNextCord(7)
                    piece.index = 66
                    break;
                }
                if (piece.x > this.getNextCord(10) - magicalNum && piece.x <= this.getNextCord(10)  + magicalNum && i===4){
                    piece.x = this.getNextCord(10)
                    piece.y = this.getNextCord(7)
                    piece.index = 67
                    break;
                }
                if (piece.x > this.getNextCord(9) - magicalNum && piece.x <= this.getNextCord(9)  + magicalNum && i===5){
                    piece.x = this.getNextCord(9)
                    piece.y = this.getNextCord(7)
                    piece.index = 68
                    break;
                }
                if (piece.x > this.getNextCord(8)  && piece.x <= this.getNextCord(8)  + magicalNum && i===6){
                    piece.x = this.getNextCord(8)
                    piece.y = this.getNextCord(7)
                    piece.index = 69
                    break;
                }
            }
            
        }
    }

    pathBlueRange(piece: Piece): void {
        // 58 - 63
        let magicalNum = 22.25
        let xMin = this.getNextCord(7) - magicalNum
        let xMax = this.getNextCord(7) + magicalNum
        let yMin = this.getNextCord(1) - magicalNum
        let yMax = this.getNextCord(6) + magicalNum
        //console.log("PathD1 xMin: " + xMin + " xMax: " + xMax + " " + yMin + " " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            for (let i = 0; i < 6; i++) {
                if (piece.y > this.getNextCord(1) - magicalNum && piece.y <= this.getNextCord(1)  + magicalNum && i===0){
                    piece.x = this.getNextCord(7)
                    piece.y = this.getNextCord(1)
                    piece.index = 58
                    break;
                }
                if (piece.y > this.getNextCord(2) - magicalNum && piece.y <= this.getNextCord(2)  + magicalNum && i===1){
                    piece.x = this.getNextCord(7)
                    piece.y = this.getNextCord(2)
                    piece.index = 59
                    break;
                }
                if (piece.y > this.getNextCord(3) - magicalNum && piece.y <= this.getNextCord(3)  + magicalNum && i===2){
                    piece.x = this.getNextCord(7)
                    piece.y = this.getNextCord(3)
                    piece.index = 60
                    break;
                }
                if (piece.y > this.getNextCord(4) - magicalNum && piece.y <= this.getNextCord(4)  + magicalNum && i===3){
                    piece.x = this.getNextCord(7)
                    piece.y = this.getNextCord(4)
                    piece.index = 61
                    break;
                }
                if (piece.y >  this.getNextCord(5) - magicalNum&& piece.y <= this.getNextCord(5)  + magicalNum && i===4){
                    piece.x = this.getNextCord(7)
                    piece.y = this.getNextCord(5)
                    piece.index = 62
                    break;
                }
                if (piece.y > this.getNextCord(6) - magicalNum && piece.y <= this.getNextCord(6)  + magicalNum && i===5){
                    piece.x = this.getNextCord(7)
                    piece.y = this.getNextCord(6)
                    piece.index = 63
                    break;
                }
            }
            
                
        }
    }

    pathGreenRange(piece: Piece): void {
        // 70 - 75
        let magicalNum = 22.25
        let xMin = this.getNextCord(7) - magicalNum
        let xMax = this.getNextCord(7) + magicalNum
        let yMin = this.getNextCord(8) - magicalNum
        let yMax = this.getNextCord(14) + magicalNum
        //console.log("PathD1 xMin: " + xMin + " xMax: " + xMax + " " + yMin + " " + yMax)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            //console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
            for (let i = 0; i < 6; i++) {
                if (piece.y > this.getNextCord(13) - magicalNum && piece.y <= this.getNextCord(13)  + magicalNum && i===0){
                    piece.x = this.getNextCord(7)
                    piece.y = this.getNextCord(13)
                    piece.index = 70
                    break;
                }
                if (piece.y > this.getNextCord(12) - magicalNum && piece.y <= this.getNextCord(12)  + magicalNum && i===1){
                    piece.x = this.getNextCord(7)
                    piece.y = this.getNextCord(12)
                    piece.index = 71
                    break;
                }
                if (piece.y > this.getNextCord(11) - magicalNum && piece.y <= this.getNextCord(11)  + magicalNum && i===2){
                    piece.x = this.getNextCord(7)
                    piece.y = this.getNextCord(11)
                    piece.index = 72
                    break;
                }
                if (piece.y > this.getNextCord(10) - magicalNum && piece.y <= this.getNextCord(10)  + magicalNum && i===3){
                    piece.x = this.getNextCord(7)
                    piece.y = this.getNextCord(10)
                    piece.index = 73
                    break;
                }
                if (piece.y >  this.getNextCord(9) - magicalNum&& piece.y <= this.getNextCord(9)  + magicalNum && i===4){
                    piece.x = this.getNextCord(7)
                    piece.y = this.getNextCord(9)
                    piece.index = 74
                    break;
                }
                if (piece.y > this.getNextCord(8) - magicalNum && piece.y <= this.getNextCord(8)  + magicalNum && i===5){
                    piece.x = this.getNextCord(7)
                    piece.y = this.getNextCord(8)
                    piece.index = 75
                    break;
                }
            }
            
                
        }
    }

    pathHomeRedRange(piece: Piece): void {
        let xMin = this.getNextCord(0)
        let xMax = this.getNextCord(5)
        let yMin = this.getNextCord(0)
        let yMax = this.getNextCord(5)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            piece.x = piece.homeX
            piece.y = piece.homeY
            piece.index = -1
        }
    }

    pathHomeBlueRange(piece: Piece): void {
        let xMin = this.getNextCord(9)
        let xMax = this.getNextCord(14)
        let yMin = this.getNextCord(0)
        let yMax = this.getNextCord(5)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            piece.x = piece.homeX
            piece.y = piece.homeY
            piece.index = -1
        }

    }

    pathHomeGreenRange(piece: Piece): void {
        let xMin = this.getNextCord(0)
        let xMax = this.getNextCord(5)
        let yMin = this.getNextCord(9)
        let yMax = this.getNextCord(14)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            piece.x = piece.homeX
            piece.y = piece.homeY
            piece.index = -1
        }
    }


    pathHomeYellowRange(piece: Piece): void {
        let xMin = this.getNextCord(9)
        let xMax = this.getNextCord(14)
        let yMin = this.getNextCord(9)
        let yMax = this.getNextCord(14)
        if (piece.x >= xMin && piece.x <= xMax  && piece.y >= yMin && piece.y <= yMax){
            piece.x = piece.homeX
            piece.y = piece.homeY
            piece.index = -1
        }

    }

    configurePiece(piece: Piece){
        if (piece.index >= 0 && piece.index <=51) {
            piece.becomeActive()
        }

        if (piece.index >= 52 && piece.index <=56 || 
            piece.index >= 58 && piece.index <=62 || 
            piece.index >= 64 && piece.index <=69 || 
            piece.index >= 70 && piece.index <=74 ) {
            piece.becomeHomeBound()
        }

        if (piece.index === 57 || 
            piece.index === 63 || 
            piece.index === 69 || 
            piece.index === 75  ) {
            piece.becomeExited()
        }

        if (piece.index < 0) {
            piece.becomeInActive()
        }
    }


    getNextCord(i: number): number{
        return this.piece_offset + (this.grid_offset * i)
    }

    showPieceState(pieceState: PieceState): string {
        switch(pieceState){
            case PieceState.Active: {
                return "Active"
            }
            case PieceState.Inactive: {
                return "Inactive"
            }
            case PieceState.OnHomePath: {
                return "OnHomePath"
            }
            case PieceState.Exited: {
                return "Exited"
            }
            default:
                return "UNKNOWN"
        }
    }
}