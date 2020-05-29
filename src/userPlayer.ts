import {Piece} from './piece'
import {Player} from './player'
import {ActivePath} from "./activePath"


export class UserPlayer implements Player {
    playerName: string
    pieces: Array<Piece>
    exitedPieces: Array<Piece>
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
        this.exitedPieces = new Array<Piece>()
    }

    addPieces(pieces: Array<Piece>): void {
        for (let piece of pieces){
            this.pieces.push(piece)
        }
        this.group.addMultiple(pieces)
    }

    addPiece(piece: Piece): void {
        this.pieces.push(piece)
        this.group.add(piece)
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
                piece.setVisible(false)
                this.exitedPieces.push(piece)
                if (indexOf >= 0) {
                    console.log("Removing piece: " + pieceId)
                    this.pieces.splice(indexOf, 1);
                    break
                }
            }
        }
    }

    setPieceDraggable(): void {
        for (let piece of this.pieces) {
            piece.setDraggable()
        }
    }

    hasActivePieces(): boolean {
        for (let piece of this.pieces) {
            if (piece.isActive()){
                return true
            }
        }
        return false;
    }

    hasJustActivePieces(): boolean {
        for (let piece of this.pieces) {
            if (piece.isNotActive() || piece.isOnHomePath()){
                return false
            }
        }
        return true;
    }

    hasInActivePieces(): boolean {
        for (let piece of this.pieces) {
            if (piece.isInActive()){
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

    hasExactlyOneActiveAndAtLeastOneHomePiece(): boolean {
        let activePieceCount = 0;
        for (let piece of this.pieces) {
            if (piece.isActive() || piece.isOnHomePath()){
                ++activePieceCount
                if (activePieceCount > 1){
                    break
                }
            }
        }
        return (activePieceCount > 1);
    }

    allPiecesAreInactive(): boolean {
        for (let piece of this.pieces) {
            if (!piece.isNotActive()){
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

    hasHomePieces(): boolean {
        for (let piece of this.pieces) {
            if (piece.isOnHomePath()){
                return true;
            }
        }
        return false
    }

    getFirstActivePiece(): Piece {
        for (let piece of this.pieces) {
            if (piece.isActive()){
                return piece
            }
        }
        return null
    }

    doesNotBelong(piece: Piece): boolean {
        return this.group.contains(piece) === false
    }

    bringPiecesToTop(): void {
        this.group.getChildren().forEach((child) => {
            this.scene.children.bringToTop(child)
        })
    }

    hasNoPiecesLeft(): boolean {
        let count = 0
        for (let piece of this.pieces) {
            if (piece.isActive() || piece.isNotActive() || piece.isOnHomePath()){
                ++ count
                if (count > 0){
                    break
                }
            }
        }
        return count === 0
    }

    playerRollDice(): void {}

    playerPlayDice(activePath: Array<ActivePath>): void {}


}