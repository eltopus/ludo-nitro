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
                    "state": "Inactive"
                },
                {
                    "id": "red2",
                    "x": 144.35,
                    "y": 192.45,
                    "hx": 144.35,
                    "hy": 192.45,
                    "index": -1,
                    "state": "Inactive"
                },
                {
                    "id": "red3",
                    "x": 96.25,
                    "y": 144.35,
                    "hx": 96.25,
                    "hy": 144.35,
                    "index": -1,
                    "state": "Inactive"
                },
                {
                    "id": "red4",
                    "x": 192.45,
                    "y": 144.35,
                    "hx": 192.45,
                    "hy": 144.35,
                    "index": -1,
                    "state": "Inactive"
                }
            ]

        },
        "blue": {
            "hIndex": 12,
            "sIndex": 14,
            "pieces": [
                {
                    "id": "blue1",
                    "x": 529.15,
                    "y": 144.35,
                    "hx": 529.15,
                    "hy": 144.35,
                    "index": -1,
                    "state": "Inactive"
                },
                {
                    "id": "blue2",
                    "x": 625.35,
                    "y": 144.35,
                    "hx": 625.35,
                    "hy": 144.35,
                    "index": -1,
                    "state": "Inactive"
                },
                {
                    "id": "blue3",
                    "x": 577.25,
                    "y": 192.45,
                    "hx": 577.25,
                    "hy": 192.45,
                    "index": -1,
                    "state": "Inactive"
                },
                {
                    "id": "blue4",
                    "x": 577.25,
                    "y": 96.25,
                    "hx": 577.25,
                    "hy": 96.25,
                    "index": -1,
                    "state": "Inactive"
                }
            ]

        },
        "yellow": {
            "hIndex": 25,
            "sIndex": 27,
            "pieces": [
                {
                    "id": "yellow1",
                    "x": 577.25,
                    "y": 529.15,
                    "hx": 577.25,
                    "hy": 529.15,
                    "index": -1,
                    "state": "Inactive"
                },
                {
                    "id": "yellow2",
                    "x": 577.25,
                    "y": 625.35,
                    "hx": 577.25,
                    "hy": 625.35,
                    "index": -1,
                    "state": "Inactive"
                },
                {
                    "id": "yellow3",
                    "x": 529.15,
                    "y": 577.25,
                    "hx": 529.15,
                    "hy": 577.25,
                    "index": -1,
                    "state": "Inactive"
                },
                {
                    "id": "yellow4",
                    "x": 625.35,
                    "y": 577.25,
                    "hx": 625.35,
                    "hy": 577.25,
                    "index": -1,
                    "state": "Inactive"
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
                    "state": "Inactive"
                },
                {
                    "id": "green2",
                    "x": 96.25,
                    "y": 577.25,
                    "hx": 96.25,
                    "hy": 577.25,
                    "index": -1,
                    "state": "Inactive"
                },
                {
                    "id": "green3",
                    "x": 144.35,
                    "y": 529.15,
                    "hx": 144.35,
                    "hy": 529.15,
                    "index": -1,
                    "state": "Inactive"
                },
                {
                    "id": "green4",
                    "x": 144.35,
                    "y": 625.35,
                    "hx": 144.35,
                    "hy": 625.35,
                    "index": -1,
                    "state": "Inactive"
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

        redConfig.pieces.forEach((piece) => {
            let redPiece = new Piece(this.scene, piece.x, piece.y, piece.x, piece.y, piece.index, homeIndex, startIndex, Red, piece.id);
            redPieces.push(redPiece);
        }) 

        return redPieces;
    }

    createRedPiece(pieceId: string): Piece {
        let configs = this.pieceConfig.red
        let redPieceConfig = configs.pieces.filter((piece) => {
            return piece.id === pieceId
        }) 
        let homeIndex = configs.hIndex
        let startIndex = configs.sIndex
        let homeX = redPieceConfig[0].hx, homeY = redPieceConfig[0].hy
        return new Piece(this.scene, 0, 0, homeX, homeY, -1, homeIndex, startIndex, Red, pieceId);
    }


    createBluePieces(): Array<Piece> {
        let bluePieces = new Array<Piece>()
        let blueConfig = this.pieceConfig.blue
        let homeIndex = blueConfig.hIndex
        let startIndex = blueConfig.sIndex

        blueConfig.pieces.forEach((piece) => {
            let bluePiece = new Piece(this.scene, piece.x, piece.y, piece.x, piece.y, piece.index, homeIndex, startIndex, Blue, piece.id);
            bluePieces.push(bluePiece);
        })
        return bluePieces;
    }

    createBluePiece(pieceId: string): Piece {
        let configs = this.pieceConfig.blue
        let bluePieceConfig = configs.pieces.filter((piece) => {
            return piece.id === pieceId
        }) 
        let homeIndex = configs.hIndex
        let startIndex = configs.sIndex
        let homeX = bluePieceConfig[0].hx, homeY = bluePieceConfig[0].hy
        return new Piece(this.scene, 0, 0, homeX, homeY, -1, homeIndex, startIndex, Blue, pieceId);
       
    }
    

    createYellowPieces(): Array<Piece> {
        let yellowPieces = new Array<Piece>()
        let yellowConfig = this.pieceConfig.yellow
        let homeIndex = yellowConfig.hIndex
        let startIndex = yellowConfig .sIndex

        yellowConfig .pieces.forEach((piece) => {
            let yellowPiece = new Piece(this.scene, piece.x, piece.y, piece.x, piece.y, piece.index, homeIndex, startIndex, Yellow, piece.id);
            yellowPieces.push(yellowPiece);
        })
        return yellowPieces;
    }

    createYellowPiece(pieceId: string): Piece {
        let configs = this.pieceConfig.yellow
        let yellowPieceConfig = configs.pieces.filter((piece) => {
            return piece.id === pieceId
        }) 
        let homeIndex = configs.hIndex
        let startIndex = configs.sIndex
        let homeX = yellowPieceConfig[0].hx, homeY = yellowPieceConfig[0].hy
        return new Piece(this.scene, 0, 0, homeX, homeY, -1, homeIndex, startIndex, Yellow, pieceId);
       
    }

    createGreenPieces(): Array<Piece> {
        let greenPieces = new Array<Piece>()
        let greenConfig = this.pieceConfig.green
        let homeIndex = greenConfig.hIndex
        let startIndex = greenConfig.sIndex

        greenConfig.pieces.forEach((piece) => {
            let greenPiece = new Piece(this.scene, piece.x, piece.y, piece.x, piece.y, piece.index, homeIndex, startIndex, Green, piece.id);
            greenPieces.push(greenPiece);
        })

        return greenPieces;
    }

    createGreenPiece(pieceId: string): Piece {
        let configs = this.pieceConfig.green
        let greenPieceConfig = configs.pieces.filter((piece) => {
            return piece.id === pieceId
        })
        let homeIndex = configs.hIndex
        let startIndex = configs.sIndex
        let homeX = greenPieceConfig[0].hx, homeY = greenPieceConfig[0].hy
        return new Piece(this.scene, 0, 0, homeX, homeY, -1, homeIndex, startIndex, Green, pieceId);
       
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