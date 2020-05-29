import {Piece} from './piece'
import {ActivePath} from "./activePath"
export interface Player {
    playerName: string
    pieces: Array<Piece>
    exitedPieces: Array<Piece>
    scene: Phaser.Scene
    group: Phaser.Physics.Arcade.Group
    selectedPiece: Piece
    hasSelectedPiece(): boolean
    hasNoPiecesLeft(): boolean
    moveSelectedPiece(dieValue: number)
    bringPiecesToTop(): void
    allPiecesAreInactive(): boolean
    hasJustActivePieces(): boolean
    hasActivePieces(): boolean
    hasExactlyOneActivePiece(): boolean
    hasHomePieces(): boolean
    hasInActivePieces(): boolean
    getFirstActivePiece(): Piece
    addPieces(pieces: Array<Piece>): void
    setPieceDraggable(): void
    playerRollDice(): void
    hasNoActivePieces(): boolean
    playerPlayDice(activePath: Array<ActivePath>): void
    addPiece(piece: Piece): void
}