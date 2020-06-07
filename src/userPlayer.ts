import {Piece} from './piece'
import {Player} from './player'
import {ActivePath} from "./activePath"


export class UserPlayer extends Player {
   

    constructor(playerName: string, scene: Phaser.Scene) {
        super(playerName, scene)
    }

   
    playerRollDice(): void {}

    playerPlayDice(activePath: Array<ActivePath>): void {}

    addOpposingPlayer(player: Player): void {}


}