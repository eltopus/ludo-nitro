import {Player} from './player'
export class Rule {
    players: Array<Player>
    currentPlayer: Player
    scene: Phaser.Scene
    
    constructor(scene: Phaser.Scene) {
        this.players = Array<Player>()
        this.scene = scene

    }

    addPlayers (players: Array<Player>): void {
        for (let player of players) {
            this.players.unshift(player)
        }
    }

    getNextPlayer(): Player {
        this.currentPlayer = this.players.pop()
        this.players.unshift(this.currentPlayer)
        this.scene.registry.set('currentPlayer', this.currentPlayer.playerName)
        this.scene.scene.get('SideScene').events.emit('resetBothDice')
        return this.currentPlayer
    }

    playerhasActivePiecesOrRolledAtLeasetOneSix(): boolean {
        return this.currentPlayer.hasActivePieces() || this.atLeastOneSixIsRolled()
    }

    atLeastOneSixIsRolled(): boolean {
        return (this.scene.registry.get('die1') === 6 || this.scene.registry.get('die2')=== 6)
    }

    evaluate(): boolean {
        return this.playerhasActivePiecesOrRolledAtLeasetOneSix();
    }

    shouldPlayBothSelectedDice(): boolean {
        // both dice seleted or none of the dice is selected
        return (this.scene.registry.get('die1-selected') && this.scene.registry.get('die2-selected')) || 
                (!this.scene.registry.get('die1-selected') && !this.scene.registry.get('die2-selected'))
      }
}