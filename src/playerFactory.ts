import {Player} from './player'
export class PlayerFactory {
    playerNames: Array<string>
    scene: Phaser.Scene
    constructor(playerNames: Array<string>, scene: Phaser.Scene) {
        this.playerNames = playerNames
        this.scene = scene
    }

    createPlayers(): Array<Player> {
        let players = new Array<Player>()
        for (let playerName of this.playerNames) {
            let player = new Player(playerName, this.scene)
            players.push(player)
        }
        return players
    }

}



