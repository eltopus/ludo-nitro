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
        this.scene.scene.get('SideScene').events.emit('resetBothDice', 'die1', 'die2')
        return this.currentPlayer
    }

    playerhasActivePiecesOrRolledAtLeasetOneSix(): boolean {
        return this.currentPlayer.hasActivePieces() || this.atLeastOneSixIsRolled()
    }

    atLeastOneSixIsRolled(): boolean {
        return (this.scene.registry.get('die1') === 6 || this.scene.registry.get('die2')=== 6)
    }

    evaluateDiceRollCompletion(): boolean {
        return this.playerhasActivePiecesOrRolledAtLeasetOneSix();
    }

    evaluatePieceMovementCompletion(): boolean {
        return this.hasAtLeastOneNonZeroDieValue()
    }

    evaluateIfDieValueSixShouldBeConsumed(): boolean {
        return (this.currentPlayer.selectedPiece.isInActive())
    }

    shouldPlayBothDice(): boolean {
        // both dice seleted or none of the dice is selected
        return (this.scene.registry.get('die1-selected') && this.scene.registry.get('die2-selected')) || 
                (!this.scene.registry.get('die1-selected') && !this.scene.registry.get('die2-selected')) ||
                this.currentPlayer.hasExactlyOneActivePiece()
    }

    
    hasAtLeastOneNonZeroDieValue(): boolean {
        return (this.scene.registry.get('die1') > 0 || this.scene.registry.get('die2') > 0)
    }

    consumeDieWithValueSixReturnTheOtherValue(): number {
        let otherDieValue =0
        if (this.scene.registry.get('die1') === 6){
            otherDieValue = this.scene.registry.get('die2')
            this.scene.scene.get('SideScene').events.emit('resetBothDice')
            return otherDieValue
        }else if (this.scene.registry.get('die2') === 6){
            otherDieValue = this.scene.registry.get('die1')
            this.scene.scene.get('SideScene').events.emit('resetBothDice')
            return otherDieValue
        }
        return otherDieValue
    }

    consumeDieWithValueSixLeaveTheOtherValue(): boolean {
        if (this.scene.registry.get('die1') === 6){
            this.scene.scene.get('SideScene').events.emit('resetSingleDie', 'die1')
            return true
        }else if (this.scene.registry.get('die2') === 6){
            this.scene.scene.get('SideScene').events.emit('resetSingleDie', 'die2')
            return true
        }
        return false
    }
}