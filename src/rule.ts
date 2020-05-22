import {Player} from './player'
export class Rule {
    players: Array<Player>
    currentPlayer: Player
    
    constructor() {
        this.players = Array<Player>()

    }

    addPlayers (players: Array<Player>): void {
        for (let player of players) {
            this.players.unshift(player)
        }
    }

    getNextPlayer(): Player {
        this.currentPlayer = this.players.pop()
        this.players.unshift(this.currentPlayer)
        return this.currentPlayer
    }
}