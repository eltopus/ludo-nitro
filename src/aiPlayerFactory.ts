import {Player} from './player'
import {AIPlayer} from './aiplayer'
import {PlayerFactory} from './PlayerFactory'
export class AIPlayerFactory implements PlayerFactory {
    playerNames: Array<string>
    scene: Phaser.Scene
    constructor(scene: Phaser.Scene, playerNames?: Array<string>) {
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

    createPlayer(playerName: string): Player {
        return new AIPlayer(playerName, this.scene)
    }
}



