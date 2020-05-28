
export class Ludo {
    players: Array<PPlayer>
    dice: Array<PDie>
    constructor(){
        this.players = new Array<PPlayer>()
        this.dice = new Array<PDie>()
    }
}

export class PPlayer {
    playerName: string
    selectedPieceId: string
    pieces: Array<PPiece>
    constructor(){
        this.pieces = new Array<PPiece>()
    }

}

export class PPiece {
    pieceId: string
    index: number
    pieceState: string
    pieceType: string
    x: number
    y: number
    constructor(){}
}

export class PDie {
    dieId: string
    dieValue: number
    selected: boolean
    constructor(){}

}
