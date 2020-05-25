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

    evaluateDiceRollCompletion(): boolean {
        return this.playerhasActivePiecesOrRolledAtLeasetOneSix();
    }

    evaluatePieceMovementCompletion(): boolean {
        return this.hasAtLeastOneNonZeroDieValue()
    }

    evaluateIfDieValueSixShouldBeConsumed(): boolean {
        return (this.currentPlayer.selectedPiece.isNotActive())
    }

    evaluateNonActivePiecePlay(): boolean {
        if (this.atLeastOneSixIsRolled()){
            return true
        }
        return false
    }

    shouldPlayBothDice(): boolean {

        if (this.currentPlayer.hasNoActivePieces() && !this.doubleSixIsRolled()) {
            console.log("Player has no active piece. Play both dice")
                return true
        }
        if (this.currentPlayer.hasExactlyOneActivePiece() && this.currentPlayer.selectedPieceIsActive()) {
            console.log("Player has exactly one active piece which is also the selected piece. Play both dice")
                return true
        }

        if (this.currentPlayer.hasActivePieces() && 
                this.currentPlayer.selectedPieceIsNotActive() && 
                this.atLeastOneSixIsRolled() && 
                this.bothDiceSelected()) {
            console.log("Player has active pieces selected piece is NOT active, six is rolled and both dice are selected. Play both dice")
                return true
        }

        if (this.currentPlayer.hasActivePieces() &&
            this.currentPlayer.selectedPieceIsActive() &&
            this.bothDiceSelected())  {
                console.log("Player has active pieces and both dice are selected. Play both dice")
                return true
        }
        if (this.hasExactlyOneUnspentDie() && this.currentPlayer.selectedPieceIsActive())  {
            console.log("Player has one unspent die. Play both dice")
            return true
        }
        return false
    }

    hasExactlyOneUnspentDie(): boolean {
        if (this.scene.registry.get('die1') <= 0 && this.scene.registry.get('die2') > 0) {
            return true
        }
        if (this.scene.registry.get('die2') <= 0 && this.scene.registry.get('die1') > 0) {
            return true
        }
        return false
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

    consumeDieWithValueSixAndReturnPieceId(): string {
        if (this.scene.registry.get('die1') === 6){
            this.scene.scene.get('SideScene').events.emit('resetSingleDie', 'die1')
            return "die1"
        }else if (this.scene.registry.get('die2') === 6){
            this.scene.scene.get('SideScene').events.emit('resetSingleDie', 'die2')
            return "die2"
        }
        return null
    }

    bothDiceSelected(): boolean {
        return this.scene.registry.get('die1-selected') && this.scene.registry.get('die2-selected')
    }

    anyOfTheSelectedDiceHasValueSix(): boolean {
        return this.scene.registry.get('die1-selected') && this.scene.registry.get('die1') === 6 || this.scene.registry.get('die2-selected') && this.scene.registry.get('die2') === 6
    }

    doubleSixIsRolled(): boolean {
        return this.scene.registry.get('die1') === 6 && this.scene.registry.get('die2') === 6
    }

}