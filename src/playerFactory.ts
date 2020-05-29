import {Player} from './player'
export interface PlayerFactory {
    createPlayers(): Array<Player>
    createPlayer(playerName: string): Player
}
