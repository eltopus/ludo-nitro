import {Piece} from './piece'
import {Red} from './pieceState'
import {Blue} from './pieceState'
import {Green} from './pieceState'
import {Yellow} from './pieceState'

export class Player {
    name: string
    isAactive: boolean
    pieces: Array<Piece>
    scene: Phaser.Scene

    constructor(name: string, isActive: boolean, pieces: Array<Piece>, scene: Phaser.Scene) {
        this.name = name
        this.isAactive = isActive
        this.pieces = pieces
        this.scene = scene
    }
}