import {Player} from './player'
import {UserPlayer} from './userplayer'
import {PlayerFactory} from './PlayerFactory'
export class UserPlayerFactory implements PlayerFactory {
    playerNames: Array<string>
    scene: Phaser.Scene
    constructor(scene: Phaser.Scene, playerNames?: Array<string>) {
        this.playerNames = playerNames
        this.scene = scene
    }

    createPlayers(): Array<Player> {
        let players = new Array<Player>()
        for (let playerName of this.playerNames) {
            let player = new UserPlayer(playerName, this.scene)
            players.push(player)
        }
        return players
    }

    createPlayer(playerName: string): Player {
      return new UserPlayer(playerName, this.scene)
    }

}



