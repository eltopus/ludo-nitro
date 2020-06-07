import {Piece} from './piece'
import {PieceState} from './pieceState'
import { v4 as uuidv4 } from 'uuid';

export class ActivePath extends Phaser.Curves.Path {

    scene: Phaser.Scene;
    remainderIndex: number;
    projectedIndex: number;
    projectedX: number;
    projectedY: number;
    projectedStartIndex: number;
    homeIndex: number;
    activePiece: Piece;
    projectedPieceState: PieceState
    pieceType: any
    isValid: boolean
    moveBy: number
    singleDieValue: boolean
    rating: number
    pathId: string
    constructor(scene: Phaser.Scene, piece: Piece){
        super(piece.x, piece.y)
        this.scene = scene;
        this.remainderIndex = 0;
        this.projectedIndex = 0;
        this.projectedStartIndex = piece.startIndex
        this.projectedX = piece.x;
        this.projectedY = piece.y;
        this.homeIndex = piece.homeIndex;
        this.activePiece = piece;
        this.projectedPieceState = piece.pieceState
        this.pieceType = piece.pieceType
        this.isValid = true
        this.singleDieValue = false
        this.rating = 0
        this.pathId = uuidv4()
        this.scene.add.path(piece.x, piece.y);
    }

    updatePiece(): void {
        this.activePiece.index = this.projectedIndex;
        this.activePiece.pieceState = this.projectedPieceState;
    }

    filterByJson(jsons: any): boolean {
        for (let json of jsons){
            if (this.activePiece.pieceId === json.playerPieceId && this.projectedIndex < json.opposingPieceIndex){
                return true
            }
        }
        return false
    }

    filterByJsonInActivePieces(jsons: any): boolean {
        for (let json of jsons){
            if (this.activePiece.pieceId === json.playerPieceId && Math.abs(this.projectedIndex - 6) < json.opposingPieceIndex){
                return true
            }
        }
        return false
    }

    pathToString(): string {
        return "Play " + this.moveBy + " on " + this.activePiece.pieceId + " with state: " + this.activePiece.showPieceState() + " ProjectedIndex: " + this.projectedIndex
    }
}