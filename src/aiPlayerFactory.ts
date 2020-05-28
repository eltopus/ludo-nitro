import {Player} from './player'
import {AIPlayer} from './aiplayer'
export class AIPlayerFactory {
    playerNames: Array<string>
    scene: Phaser.Scene
    constructor(playerNames: Array<string>, scene: Phaser.Scene) {
        this.playerNames = playerNames
        this.scene = scene
    }

    createPlayers(): Array<Player> {
        let players = new Array<Player>()
        for (let playerName of this.playerNames) {
            let player = new AIPlayer(playerName, this.scene)
            players.push(player)
        }
        return players
    }
}



