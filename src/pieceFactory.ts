import {Piece} from './piece'
import {Red} from './pieceState'
import {Blue} from './pieceState'
import {Green} from './pieceState'
import {Yellow} from './pieceState'
import {PieceState} from './pieceState'
export class PieceFactory {
    scene: Phaser.Scene
    config: any

    pieceConfig = {
        "red": {
            "hIndex": 51,
            "sIndex": 1,
            "pieces": [
                {
                    "id": "red1",
                    "x": 144.35,
                    "y": 96.25,
                    "hx": 144.35,
                    "hy": 96.25,
                    "index": -1,
                    "state": "inactive"
                },
                {
                    "id": "red2",
                    "x": 144.35,
                    "y": 192.45,
                    "hx": 144.35,
                    "hy": 192.45,
                    "index": -1,
                    "state": "inactive"
                },
                {
                    "id": "red3",
                    "x": 96.25,
                    "y": 144.35,
                    "hx": 96.25,
                    "hy": 144.35,
                    "index": -1,
                    "state": "inactive"
                },
                {
                    "id": "red4",
                    "x": 192.45,
                    "y": 144.35,
                    "hx": 192.45,
                    "hy": 144.35,
                    "index": -1,
                    "state": "inactive"
                }
            ]

        },
        "blue": {
            "hIndex": 12,
            "sIndex": 14,
            "pieces": [
                {
                    "id": "blue1",
                    "x": 192.45,
                    "y": 144.35,
                    "hx": 192.45,
                    "hy": 144.35,
                    "index": -1,
                    "state": "inactive"
                },
                {
                    "id": "blue2",
                    "x": 192.45,
                    "y": 144.35,
                    "hx": 192.45,
                    "hy": 144.35,
                    "index": -1,
                    "state": "inactive"
                },
                {
                    "id": "blue3",
                    "x": 192.45,
                    "y": 144.35,
                    "hx": 192.45,
                    "hy": 144.35,
                    "index": -1,
                    "state": "inactive"
                },
                {
                    "id": "blue4",
                    "x": 192.45,
                    "y": 144.35,
                    "hx": 192.45,
                    "hy": 144.35,
                    "index": -1,
                    "state": "inactive"
                }
            ]

        },
        "yellow": {
            "hIndex": 25,
            "sIndex": 27,
            "pieces": [
                {
                    "id": "yellow1",
                    "x": 192.45,
                    "y": 144.35,
                    "hx": 192.45,
                    "hy": 144.35,
                    "index": -1,
                    "state": "inactive"
                },
                {
                    "id": "yellow2",
                    "x": 192.45,
                    "y": 144.35,
                    "hx": 192.45,
                    "hy": 144.35,
                    "index": -1,
                    "state": "inactive"
                },
                {
                    "id": "yellow3",
                    "x": 192.45,
                    "y": 144.35,
                    "hx": 192.45,
                    "hy": 144.35,
                    "index": -1,
                    "state": "inactive"
                },
                {
                    "id": "yellow4",
                    "x": 192.45,
                    "y": 144.35,
                    "hx": 192.45,
                    "hy": 144.35,
                    "index": -1,
                    "state": "inactive"
                }
            ]

        },
        "green": {
            "hIndex": 38,
            "sIndex": 40,
            "pieces": [
                {
                    "id": "green1",
                    "x": 192.45,
                    "y": 577.25,
                    "hx": 192.45,
                    "hy": 577.25,
                    "index": -1,
                    "state": "inactive"
                },
                {
                    "id": "green2",
                    "x": 96.25,
                    "y": 577.25,
                    "hx": 96.25,
                    "hy": 577.25,
                    "index": -1,
                    "state": "inactive"
                },
                {
                    "id": "green3",
                    "x": 144.35,
                    "y": 529.15,
                    "hx": 144.35,
                    "hy": 529.15,
                    "index": -1,
                    "state": "inactive"
                },
                {
                    "id": "green4",
                    "x": 144.35,
                    "y": 625.35,
                    "hx": 144.35,
                    "hy": 625.35,
                    "index": -1,
                    "state": "inactive"
                }
            ]

        }
    }
    constructor(scene: Phaser.Scene, config: any) {
       this.scene = scene
    }

    createRedPieces(): Array<Piece> {
        let redPieces = new Array<Piece>()
        let redConfig = this.pieceConfig.red
        let homeIndex = redConfig.hIndex
        let startIndex = redConfig.sIndex

       /*  redConfig.pieces.forEach((piece) => {
            let redPiece = new Piece(this.scene, piece.x, piece.y, piece.index, homeIndex, startIndex, Red, piece.id);
            redPieces.push(redPiece);
        }) */

        for(let piece of redConfig.pieces) {
            let redPiece = new Piece(this.scene, piece.x, piece.y, piece.index, homeIndex, startIndex, Red, piece.id);
            redPieces.push(redPiece);
        }
        return redPieces;
    }

    createBluePieces(): Array<Piece> {
        let bluePieces = new Array<Piece>()
        let blueConfig = this.pieceConfig.blue
        let homeIndex = blueConfig.hIndex
        let startIndex = blueConfig.sIndex

        /* blueConfig.pieces.forEach((piece) => {
            let bluePiece = new Piece(this.scene, piece.x, piece.y, piece.index, homeIndex, startIndex, Blue, piece.id);
            bluePieces.push(bluePiece);
        }) */

        for(let piece of blueConfig.pieces) {
            let bluePiece = new Piece(this.scene, piece.x, piece.y, piece.index, homeIndex, startIndex, Blue, piece.id);
            bluePieces.push(bluePiece);
        }
        return bluePieces;
    }

    createYellowPieces(): Array<Piece> {
        let yellowPieces = new Array<Piece>()
        let yellowConfig = this.pieceConfig.yellow
        let homeIndex = yellowConfig.hIndex
        let startIndex = yellowConfig .sIndex

        /* yellowConfig .pieces.forEach((piece) => {
            let yellowPiece = new Piece(this.scene, piece.x, piece.y, piece.index, homeIndex, startIndex, Yellow, piece.id);
            yellowPieces.push(yellowPiece);
        })
 */
        for (let piece of yellowConfig.pieces) {
            let yellowPiece = new Piece(this.scene, piece.x, piece.y, piece.index, homeIndex, startIndex, Yellow, piece.id);
            yellowPieces.push(yellowPiece);
        }
        return yellowPieces;
    }

    createGreenPieces(): Array<Piece> {
        let greenPieces = new Array<Piece>()
        let greenConfig = this.pieceConfig.green
        let homeIndex = greenConfig.hIndex
        let startIndex = greenConfig.sIndex

        /* greenConfig.pieces.forEach((piece) => {
            let greenPiece = new Piece(this.scene, piece.x, piece.y, piece.index, homeIndex, startIndex, Green, piece.id);
            greenPieces.push(greenPiece);
        }) */

        for (let piece of greenConfig.pieces){
            let greenPiece = new Piece(this.scene, piece.x, piece.y, piece.index, homeIndex, startIndex, Green, piece.id);
            greenPieces.push(greenPiece);
        }
        return greenPieces;
    }

    getPieceState(state: string): any {
        switch(state) {
            case "inactive": {
                return PieceState.Inactive
            }
            case "active": {
                return PieceState.Active
            }
            case "onhomepath": {
                return PieceState.OnHomePath
            }
            case "exited": {
                return PieceState.Exited
            }
            default:
                return PieceState.Inactive
        }
    }

    
}