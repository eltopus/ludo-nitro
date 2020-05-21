import {Piece} from './piece'
import {PieceState} from './pieceState'
export class ActivePath extends Phaser.Curves.Path {

    scene: Phaser.Scene;
    remainderIndex: number;
    projectedIndex: number;
    projectedX: number;
    projectedY: number;
    projectedStartIndex: number;
    homeIndex: number;
    activePiece: Piece;
    projectedPieceState: any
    pieceType: any
    isValid: boolean
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
        this.scene.add.path(piece.x, piece.y);
    }

    updatePiece(): void {
        this.activePiece.index = this.projectedIndex;
        this.activePiece.pieceState = this.projectedPieceState;
    }
}