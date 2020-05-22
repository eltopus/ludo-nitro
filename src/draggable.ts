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
        //let magicalNum = 44.25
        //this.piece_offset
        //this.piece_offset + (this.grid_offset * 14)

        this.pathA1Range(piece)

        // for (let i = 0; i < 15; ++i) {
        //     console.log("piece x cood is between " + this.piece_offset  + " and " + (this.getNextCord(i) + magicalNum) + " i " + i)
        //     if (piece.x >= 0 && piece.x <= this.getNextCord(i) + magicalNum && i ===0){
        //         piece.x = this.piece_offset
        //         piece.index = i
        //         if (piece.y >= 0 && piece.y <= this.getNextCord(6) + magicalNum){
        //             piece.y = this.getNextCord(6)
        //         }
        //         break
        //     }
            
            
        //     if (piece.x >= 0 && piece.x <= (this.getNextCord(i) + magicalNum) && (i >= 1) && (i <=5)){
        //         console.log("piece x cood is between " + this.getNextCord(i) + " and " + (this.getNextCord(i) + magicalNum) + " i " + i)
        //         piece.x = this.getNextCord(i)
        //         piece.index = i
        //         if (piece.y >= this.getNextCord(6)  && piece.y < this.getNextCord(6) + magicalNum){
        //             piece.y = this.getNextCord(6)
        //         }
        //         break;
        //     }

        //     if (piece.x >= 0 && piece.x <= (this.getNextCord(i) + magicalNum) && (i === 6) ){
        //         console.log("piece x cood is between " + this.getNextCord(i) + " and " + (this.getNextCord(i) + magicalNum) + " i " + i)
        //         piece.x = this.getNextCord(i)
        //         piece.index = Math.abs( Math.floor(((312.2 - piece.y) / this.grid_offset))) + 6
        //         if (piece.y >= this.getNextCord(i-1)  && piece.y < this.getNextCord(i-1) + magicalNum){
        //             piece.y = this.getNextCord(i-1)
        //         }
        //         break;
        //     }
            
           
            

        // }
       
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
            console.log("Detected x-------------------------: " + piece.x + " y: " + piece.y)
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

    getNextCord(i: number): number{
        return this.piece_offset + (this.grid_offset * i)
    }
}