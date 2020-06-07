import "phaser";
import {PieceFactory} from './pieceFactory'
import {UserPlayerFactory} from './userPlayerFactory'
import {AIPlayerFactory} from './aiPlayerFactory'
import {Player} from './player'
// import data from '../assets/ludo.json'
import {PlayerFactory} from './PlayerFactory'
const axios = require('axios').default;


export class LoadJson {
    scene : Phaser.Scene 
    playerFactory : PlayerFactory 
    userFactory : PlayerFactory 
    pieceFactory : PieceFactory 
    data : any 
    getPlayers: any
    constructor(scene : Phaser.Scene) {
        this.scene = scene
        this.data = this.scene.cache.json.get('data');
        // this.data = data
        this.getPlayers = async function(ai: boolean) {
            const response = await axios({url: 'http://localhost:3000/data', method: 'get'})
            let players: Array<Player> = new Array<Player>()
            if (ai) {
                this.playerFactory = new AIPlayerFactory(this.scene)
            } else {
                this.playerFactory = new UserPlayerFactory(this.scene)
            }
    
            this.pieceFactory = new PieceFactory(this.scene, null)
    
            for (let pplayer of response.data.players) {
                let aiPlayer = this.playerFactory.createPlayer(pplayer.playerName)
                for (let ppiece of pplayer.pieces) {
                    switch (ppiece.pieceType) {
                        case "Red":
                            {
                                let piece = this.pieceFactory.createRedPiece(ppiece.pieceId)
                                piece.updatePiece(ppiece)
                                aiPlayer.addPiece(piece)
                                break;
                            }
                        case "Blue":
                            {
                                let piece = this.pieceFactory.createBluePiece(ppiece.pieceId)
                                piece.updatePiece(ppiece)
                                aiPlayer.addPiece(piece)
                                break;
                            }
                        case "Yellow":
                            {
                                let piece = this.pieceFactory.createYellowPiece(ppiece.pieceId)
                                piece.updatePiece(ppiece)
                                aiPlayer.addPiece(piece)
                                break;
                            }
                        case "Green":
                            {
                                let piece = this.pieceFactory.createGreenPiece(ppiece.pieceId)
                                piece.updatePiece(ppiece)
                                aiPlayer.addPiece(piece)
                                break;
                            }
                        default:
                            break
                    }
                }
                players.push(aiPlayer)
            }
            return players
        };
    }

    loadGame(ai : boolean): Array < Player > {
        let players: Array<Player> = new Array<Player>()
        if (ai) {
            this.playerFactory = new AIPlayerFactory(this.scene)
        } else {
            this.playerFactory = new UserPlayerFactory(this.scene)
        }

        this.pieceFactory = new PieceFactory(this.scene, null)
        for (let pplayer of this.data.players) {
            let aiPlayer = this.playerFactory.createPlayer(pplayer.playerName)
            for (let ppiece of pplayer.pieces) {
                switch (ppiece.pieceType) {
                    case "Red":
                        {
                            let piece = this.pieceFactory.createRedPiece(ppiece.pieceId)
                            piece.updatePiece(ppiece)
                            aiPlayer.addPiece(piece)
                            break;
                        }
                    case "Blue":
                        {
                            let piece = this.pieceFactory.createBluePiece(ppiece.pieceId)
                            piece.updatePiece(ppiece)
                            aiPlayer.addPiece(piece)
                            break;
                        }
                    case "Yellow":
                        {
                            let piece = this.pieceFactory.createYellowPiece(ppiece.pieceId)
                            piece.updatePiece(ppiece)
                            aiPlayer.addPiece(piece)
                            break;
                        }
                    case "Green":
                        {
                            let piece = this.pieceFactory.createGreenPiece(ppiece.pieceId)
                            piece.updatePiece(ppiece)
                            aiPlayer.addPiece(piece)
                            break;
                        }
                    default:
                        break
                }
            }
            players.push(aiPlayer)
        }
        return players
}

}
