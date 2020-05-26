import {Player} from './player'
import { ActivePath } from './activePath'
import { Piece } from './piece'
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

    evaluateDiceRollCompletion(): Array<ActivePath> {
        if (this.shouldPlayBothDice()){
            console.log("Play both after dice roll")
             return this.generateActivePathsForBothDice()
        }
        else {
            console.log("Play single after dice roll")
            return this.generateActivePathsForEachAndBothDice()
        }
    }


    evaluatePieceMovementCompletion(): Array<ActivePath> {
        if (this.shouldPlayBothDice()){
            console.log("Play both after movement")
             return this.generateActivePathsForBothDice()
        }
        else {
            console.log("Play single after movement")
            return this.generateActivePathsForEachAndBothDice()
        }
    }


    shouldPlayBothDice(): boolean {
        if (this.currentPlayer.hasNoActivePieces() && !this.doubleSixIsRolled()) {
            console.log("Player has no active piece. Play both dice")
            return true
        }

        if (this.currentPlayer.hasExactlyOneActivePiece() && !this.currentPlayer.hasHomePieces() && !this.atLeastOneSixIsRolled()){
            console.log("Player has exactly one active piece and NO six is rolled. Play both dice")
            return true
        }

        if (this.currentPlayer.hasExactlyOneActiveAndAtLeastOneHomePiece() && !this.homePiecesCanUseOneOrMoreDice()) {
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

        if (!this.homePiecesCanUseOneOrMoreDice() && this.currentPlayer.hasJustActivePieces() && !this.atLeastOneSixIsRolled()){
            console.log("Player has home pieces that can NOT use one or more dice")
            return true
        }
        return false
    }

    generateActivePathsForEachAndBothDice(): Array<ActivePath> {
        let dieOneScore = this.scene.registry.get('die1')
        let dieTwoScore = this.scene.registry.get('die2')
        let validPaths = new Array<ActivePath>()

        for (let piece of this.currentPlayer.pieces) {
            if (dieOneScore > 0){
                if ( this.eligibleForActivePathGeneration(piece)) {
                    let validDie1Path = piece.generatePath(dieOneScore)
                    if (validDie1Path !== null && validDie1Path.isValid){
                        validPaths.push(validDie1Path)
                    }
                }
            }
            if (dieTwoScore > 0){
                if (this.eligibleForActivePathGeneration(piece)) {
                    let validDie2Path = piece.generatePath(dieTwoScore)
                    if (validDie2Path !== null && validDie2Path.isValid) {
                        validPaths.push(validDie2Path)
                    }
                }
            
            }

            if (dieOneScore > 0 && dieTwoScore > 0) {
                if (this.eligibleForActivePathGeneration(piece)) {
                    let validBothDicePath = piece.generatePath(dieOneScore + dieTwoScore)
                    if (validBothDicePath !== null && validBothDicePath.isValid) {
                        validPaths.push(validBothDicePath)
                    }
                }
            }
        }
        return this.analyzeValidPaths(validPaths)
    }


    homePiecesCanUseOneOrMoreDice(): boolean {
        let validPaths = new Array<ActivePath>()
        if (this.currentPlayer.hasHomePieces()) {
            let dieOneScore = this.scene.registry.get('die1')
            let dieTwoScore = this.scene.registry.get('die2')
            

            for (let piece of this.currentPlayer.pieces) {
                if (dieOneScore > 0){
                    if (piece.isOnHomePath()) {
                        let validDie1Path = piece.generatePath(dieOneScore)
                        if (validDie1Path !== null && validDie1Path.isValid){
                            validPaths.push(validDie1Path)
                        }
                    }
                }
                if (dieTwoScore > 0){
                    if (piece.isOnHomePath()) {
                        let validDie2Path = piece.generatePath(dieTwoScore)
                        if (validDie2Path !== null && validDie2Path.isValid) {
                            validPaths.push(validDie2Path)
                        }
                    }
                
                }
            }
           return validPaths.length > 0 
        }else {
            return false
        }
        
    }

    homePieceCanUseOneOrMoreDice(piece: Piece): boolean {
        let validPaths = new Array<ActivePath>()
        if (this.currentPlayer.hasHomePieces()) {
            let dieOneScore = this.scene.registry.get('die1')
            let dieTwoScore = this.scene.registry.get('die2')
            if (dieOneScore > 0){
                if (piece.isOnHomePath()) {
                    let validDie1Path = piece.generatePath(dieOneScore)
                    if (validDie1Path !== null && validDie1Path.isValid){
                        validPaths.push(validDie1Path)
                    }
                }
            }
            if (dieTwoScore > 0){
                if (piece.isOnHomePath()) {
                    let validDie2Path = piece.generatePath(dieTwoScore)
                    if (validDie2Path !== null && validDie2Path.isValid) {
                        validPaths.push(validDie2Path)
                    }
                }
            }
            
        }
        return validPaths.length > 0
    }


    eligibleForActivePathGeneration(piece: Piece): boolean {
        return piece.isActive() || this.homePieceCanUseOneOrMoreDice(piece) || this.atLeastOneSixIsRolled()
    }

    analyzeValidPaths(paths: Array<ActivePath>): Array<ActivePath> {
        // when player has exactly one active piece and one or more home path pieces
        // need to remove paths from active piece that can make home path pieces unplayable
        if (this.currentPlayer.hasExactlyOneActivePiece()){
            let onlyActivePiece = this.currentPlayer.getFirstActivePiece() // should not be null
            let activePieveMovebys = []
            let nonActivePieveMovebys = []
            for (let path of paths){
                if (onlyActivePiece.pieceId === path.activePiece.pieceId) {
                    activePieveMovebys.push(path.moveBy)
                }else {
                    nonActivePieveMovebys.push(path.moveBy)
                }
            }
            activePieveMovebys = activePieveMovebys.filter((mb)=> {
                return (mb >= 1 && mb <=6)
            })
            nonActivePieveMovebys = this.arrayIntersection(activePieveMovebys, nonActivePieveMovebys)
            console.log(activePieveMovebys)
            console.log(nonActivePieveMovebys)


            if (activePieveMovebys.toString() === nonActivePieveMovebys.toString()) {
                console.log("Identical. Removing nothing...")
                return paths
            }else {
                let indexofPathToBeRemove = null
                for (let m of activePieveMovebys){
                    if (nonActivePieveMovebys.includes(m)){
                        console.log("remove: " + m)
                        indexofPathToBeRemove = m
                        break;

                    }
                }
                return this.removePathByInactivePiecesWithoutDieValueSix(this.removePathByMoveby(indexofPathToBeRemove, onlyActivePiece.pieceId, paths))
            }
            
        }else {
            return this.removePathByInactivePiecesWithoutDieValueSix(paths)
        }
    }

    interpreteActivePath(path: ActivePath): string {
        return "Play " + path.moveBy + " on " + path.activePiece.pieceId
    }

    arrayIntersection(a1: Array<ActivePath>, a2: Array<ActivePath>): Array<ActivePath> {
        return a1.filter((n)=> {
            return a2.indexOf(n) !== -1
        });
    }

    removePathByMoveby(moveby: number, pieceId: string, paths: Array<ActivePath>): Array<ActivePath> {
        if (moveby !== null){
                return paths.filter((path) => {
                return path.moveBy !== moveby || path.activePiece.pieceId !== pieceId
            })
        }else {
            return paths
        }
        
    }

    removePathByInactivePiecesWithoutDieValueSix(paths: Array<ActivePath>): Array<ActivePath> {
        return paths.filter((path) => {
            return (!path.activePiece.isActive() && path.moveBy === 6) || 
            (!path.activePiece.isActive() && path.moveBy > 6) ||
            path.activePiece.isActive() || 
            path.activePiece.isOnHomePath()
        }) 
    }

    evaluateIfDieValueSixShouldBeConsumed(): boolean {
        return (this.currentPlayer.selectedPiece.isNotActive())
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


    generateActivePathsForBothDice(): Array<ActivePath> {
        let dieOneScore = this.scene.registry.get('die1')
        let dieTwoScore = this.scene.registry.get('die2')
        let validPaths = new Array<ActivePath>()

        for (let piece of this.currentPlayer.pieces) {
            if (dieOneScore > 0 && dieTwoScore > 0) {
                if (this.eligibleForActivePathGeneration(piece)) {
                    let validBothDicePath = piece.generatePath(dieOneScore + dieTwoScore)
                    if (validBothDicePath !== null && validBothDicePath.isValid) {
                        validPaths.push(validBothDicePath)
                    }
                }
            }

        }
        return this.analyzeValidPaths(validPaths)
    }

    
    playerhasActivePiecesOrRolledAtLeasetOneSix(): boolean {
        return this.currentPlayer.hasActivePieces() || this.atLeastOneSixIsRolled()
    }

    atLeastOneSixIsRolled(): boolean {
        return (this.scene.registry.get('die1') === 6 || this.scene.registry.get('die2')=== 6)
    }

    evaluateNonActivePiecePlay(): boolean {
        if (this.atLeastOneSixIsRolled()){
            return true
        }
        return false
    }

}