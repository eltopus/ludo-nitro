import {Piece} from './piece'
import {Red} from './pieceState'
import {Blue} from './pieceState'
import {Green} from './pieceState'
import {Yellow} from './pieceState'

export class Player {
    playerName: string
    pieces: Array<Piece>
    scene: Phaser.Scene
    group: Phaser.Physics.Arcade.Group
    selectedPiece: Piece

    constructor(playerName: string, scene: Phaser.Scene) {
        this.playerName = playerName
        this.scene = scene
        this.group =this.scene.physics.add.group({})
        this.scene.events.on('pieceSelected', this.pieceSelected, this);
        this.scene.events.on('pieceExited', this.destroyPiece, this);
        this.selectedPiece = null
        this.pieces = new Array<Piece>()
    }

    addPieces(pieces: Array<Piece>): void {
        for (let piece of pieces){
            this.pieces.push(piece)
        }
        this.group.addMultiple(pieces)
    }

    pieceSelected(pieceId: string): void {
        for (let piece of this.pieces) {
            if (piece.pieceId === pieceId && this.group.contains(piece)){
                //console.log("Piece " + pieceId + " has been selected")
                piece.tint = 0x808080;
                
                if (this.selectedPiece != null && this.selectedPiece != piece) {
                    this.selectedPiece.clearTint()
                }
                this.selectedPiece = piece
                //this.moveSelectedPiece(4)
                break
            }
        }
    }

    moveSelectedPiece(moveBy: number): boolean {
        if (this.selectedPiece != null && !this.selectedPiece.isMoving()) {
            this.selectedPiece.move(moveBy)
            return true;
        }else {
            return false
        }
    }

    destroyPiece(pieceId: string): void {
        let indexOf = -1
        for (let piece of this.pieces) {
            if (piece.pieceId === pieceId) {
                indexOf = this.pieces.indexOf(piece)
                piece.destroy()
            }
        }
        if (indexOf >= 0) {
            this.pieces.splice(indexOf, 1);
        }
        this.selectedPiece = null
    }

    setPieceDraggable(): void {
        for (let piece of this.pieces) {
            piece.setDraggable()
        }
    }

    hasActivePieces(): boolean {
        
        for (let piece of this.pieces) {
            //console.log("pieceId: " + piece.pieceId + " pieceState: " + piece.pieceState)
            if (piece.isActive()){
                return true
            }
        }
        return false;
    }

    hasNoActivePieces(): boolean {
        
        for (let piece of this.pieces) {
            if (piece.isActive()){
                return false
            }
        }
        return true;
    }

    hasExactlyOneActivePiece(): boolean {
        let activePieceCount = 0;
        for (let piece of this.pieces) {
            if (piece.isActive()){
                ++activePieceCount
                if (activePieceCount > 1){
                    break
                }
            }
        }
        return (activePieceCount === 1);
    }

    hasSelectedPiece(): boolean {
        return this.selectedPiece !== null
    }

    selectedPieceIsActive(): boolean {
        return this.selectedPiece.isActive()
    }

    selectedPieceIsNotActive(): boolean {
        return this.selectedPiece.isNotActive()
    }
    


}