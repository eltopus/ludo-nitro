import {Player} from './player'
import { ActivePath } from './activePath'
import { Piece } from './piece'
export class Rule {
    players: Array<Player>
    currentPlayer: Player
    scene: Phaser.Scene
    rolledDoubleSix: boolean
    
    constructor(scene: Phaser.Scene) {
        this.players = Array<Player>()
        this.scene = scene
        this.rolledDoubleSix = false

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
        this.currentPlayer.bringPiecesToTop()
        return this.currentPlayer
    }

    evaluateDiceRollCompletion(): Array<ActivePath> {
        if (this.shouldPlayBothDice()){
            //console.log("Play both after dice roll")
             return this.generateActivePathsForBothDice()
        }
        else {
            //console.log("Play single after dice roll")
            return this.generateActivePathsForEachAndBothDice()
        }
    }

    evaluatePieceMovementCompletion(): Array<ActivePath> {
        if (this.shouldPlayBothDice()){
            //console.log("Play both after movement")
             return this.generateActivePathsForBothDice()
        }
        else {
            //console.log("Play single after movement")
            return this.generateActivePathsForEachAndBothDice()
        }
    }

    shouldPlayBothDice(): boolean {
        console.log(this.canPutPieceOnHomePath())
        if (this.currentPlayer.allPiecesAreInactive() && (!this.doubleSixIsRolled() || !this.atLeastOneSixIsRolled())){
            console.log("A2 plath both")
            return true
        }else {
            if (this.currentPlayer.hasActivePieces()){
                if (this.currentPlayer.hasExactlyOneActivePiece()){
                    if (this.atLeastOneSixIsRolled() || this.doubleSixIsRolled()){
                        if (this.currentPlayer.hasInActivePieces()){
                            if (this.currentPlayer.hasHomePieces()){
                                if (this.homePiecesCanUseOneOrMoreDice()){
                                    return false
                                }else {
                                    if (this.currentPlayer.hasInActivePieces()){
                                        console.log("B2 Split dice")
                                        return false
                                    }else {
                                        console.log("C2 Play both")
                                        return true
                                    }
                                    
                                }
                            }else {

                            }
                        }else {
                            if (this.homePiecesCanUseOneOrMoreDice()){
                                console.log("D2 split dice")
                                return false
                            }else {
                                console.log("E2 Play both")
                                return true
                            }
                        }

                    }else {
                        if (this.activePieceCanUseOneOrMoreDice()){
                            if (this.canPutPieceOnHomePath()){
                                console.log("F2 split dice")
                                return false
                            }else {
                                if (this.homePiecesCanUseOneOrMoreDice()){
                                    console.log("G2 split dice")
                                    return false
                                }else {
                                    console.log("H2 Play both")
                                    return true
                                }
                               
                            }
                        }else {
                            console.log("I2 plath both")
                            return true
                        }
                    }

                }else {
                   
                }

            }else {
                if (this.currentPlayer.hasHomePieces()){
                    if (this.homePiecesCanUseOneOrMoreDice()){
                        if (this.currentPlayer.hasInActivePieces()){
                            if (this.atLeastOneSixIsRolled() || this.doubleSixIsRolled()){
                                console.log("J2 split dice")
                                return false
                            }else {
                                console.log("K2 Play both")
                                return true
                            }
                        }
                    }else {
                        console.log("L2 Play both")
                        return true
                    }

                }else{
                    if (this.currentPlayer.hasInActivePieces()){
                        if (this.currentPlayer.hasExactlyOneInactivePiece()){
                            if (this.doubleSixIsRolled() || this.atLeastOneSixIsRolled()){
                                console.log("M2 Play both")
                                return true
                            }
                        }else {
                            console.log("N2 Split dice") 
                            return false
                        }
                        
                    }else {
                        console.log("Not sure")
                    }
                    
                   return true
                }
            }
        }
        return false
    }

    homePiecesCanUseOneOrMoreDice(): boolean {
        let validPaths = new Array<ActivePath>()
        if (this.currentPlayer.hasHomePieces()) {
            let dieOneScore = this.scene.registry.get('die1')
            let dieTwoScore = this.scene.registry.get('die2')
            
            for (let piece of this.currentPlayer.pieces) {
                if (dieOneScore > 0){
                    if (piece.isOnHomePath()) {
                        let validDie1Path = piece.generatePath(dieOneScore, true)
                        if (validDie1Path !== null && validDie1Path.isValid){
                            validPaths.push(validDie1Path)
                        }
                    }
                }
                if (dieTwoScore > 0){
                    if (piece.isOnHomePath()) {
                        let validDie2Path = piece.generatePath(dieTwoScore, true)
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
                    let validDie1Path = piece.generatePath(dieOneScore, true)
                    if (validDie1Path !== null && validDie1Path.isValid){
                        validPaths.push(validDie1Path)
                    }
                }
            }
            if (dieTwoScore > 0){
                if (piece.isOnHomePath()) {
                    let validDie2Path = piece.generatePath(dieTwoScore, true)
                    if (validDie2Path !== null && validDie2Path.isValid) {
                        validPaths.push(validDie2Path)
                    }
                }
            }
            
        }
        return validPaths.length > 0
    }

    activePieceCanUseOneOrMoreDice(): boolean {
        let piece = this.currentPlayer.getFirstActivePiece()
        let validPaths = new Array<ActivePath>()
        let dieOneScore = this.scene.registry.get('die1')
        let dieTwoScore = this.scene.registry.get('die2')
        if (dieOneScore > 0){
            if (piece.isActive()) {
                let validDie1Path = piece.generatePath(dieOneScore, true)
                if (validDie1Path !== null && validDie1Path.isValid){
                    validPaths.push(validDie1Path)
                }
            }
        }
        if (dieTwoScore > 0){
            if (piece.isActive()) {
                let validDie2Path = piece.generatePath(dieTwoScore, true)
                if (validDie2Path !== null && validDie2Path.isValid) {
                    validPaths.push(validDie2Path)
                }
            }
        }
        return validPaths.length > 0
    }

    doubleSixIsRolled(): boolean {
        return this.scene.registry.get('die1') === 6 && this.scene.registry.get('die2') === 6
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

    generateActivePathsForBothDice(): Array<ActivePath> {
        let dieOneScore = this.scene.registry.get('die1')
        let dieTwoScore = this.scene.registry.get('die2')
        let validPaths = new Array<ActivePath>()
        for (let piece of this.currentPlayer.pieces) {
            if (dieOneScore > 0 || dieTwoScore > 0) {
                if (this.eligibleForActivePathGeneration(piece)) {
                    let validBothDicePath = piece.generatePath(dieOneScore + dieTwoScore, false)
                    if (validBothDicePath !== null && validBothDicePath.isValid) {
                        validPaths.push(validBothDicePath)
                    }
                }
            }
        }
        return this.analyzeValidPaths(validPaths)
    }

    generateActivePathsForEachAndBothDice(): Array<ActivePath> {
        let dieOneScore = this.scene.registry.get('die1')
        let dieTwoScore = this.scene.registry.get('die2')
        let validPaths = new Array<ActivePath>()

        for (let piece of this.currentPlayer.pieces) {
            if (dieOneScore > 0){
                if ( this.eligibleForActivePathGeneration(piece)) {
                    let validDie1Path = piece.generatePath(dieOneScore, true)
                    if (validDie1Path !== null && validDie1Path.isValid){
                        validPaths.push(validDie1Path)
                    }
                }
            }
            if (dieTwoScore > 0){
                if (this.eligibleForActivePathGeneration(piece)) {
                    let validDie2Path = piece.generatePath(dieTwoScore, true)
                    if (validDie2Path !== null && validDie2Path.isValid) {
                        validPaths.push(validDie2Path)
                    }
                }
            }
            if (dieOneScore > 0 && dieTwoScore > 0) {
                if (this.eligibleForActivePathGeneration(piece)) {
                    let validBothDicePath = piece.generatePath(dieOneScore + dieTwoScore, false)
                    if (validBothDicePath !== null && validBothDicePath.isValid) {
                        validPaths.push(validBothDicePath)
                    }
                }
            }
        }
        return this.analyzeValidPaths(validPaths)
    }

    analyzeValidPaths(paths: Array<ActivePath>): Array<ActivePath> {
        // when player has exactly one active piece and one or more home path pieces
        // need to remove paths from active piece that can make home path pieces unplayable
        if (this.currentPlayer.hasExactlyOneActivePiece()){
            let onlyActivePiece = this.currentPlayer.getFirstActivePiece() // should not be null
            let activePieveMovebys = []
            let nonActivePieveMovebys = []
            let singleDieValue = true
            let lock = false
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
            if (activePieveMovebys.toString() === nonActivePieveMovebys.toString()) {
                console.log("Identical. Removing nothing...")
                if (this.pathContainsDoubleSixValue(paths)){
                    return this.removePathByInactivePiecesWithoutDieValueSix(paths)
                }else {
                    return this.removeSixValuePathFromActivePiece(this.removePathByInactivePiecesWithoutDieValueSix(paths))
                }
                
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
            return (this.removePathByInactivePiecesWithoutDieValueSix(paths))
        }
    }

    removePathByInactivePiecesWithoutDieValueSix(paths: Array<ActivePath>): Array<ActivePath> {
        return paths.filter((path) => {
            return (path.activePiece.isInActive() && path.moveBy === 6) || 
            (path.activePiece.isInActive() && path.moveBy > 6) ||
            path.activePiece.isActive() || 
            path.activePiece.isOnHomePath()
        }) 
    }


    removeSixValuePathFromActivePiece(paths: Array<ActivePath>): Array<ActivePath> {
        return paths.filter((path) => {
            return (path.activePiece.isActive() && path.moveBy !== 6) ||
                    (path.activePiece.isInActive()) ||
                    (path.activePiece.isOnHomePath())
        }) 
    }

    pathContainsDoubleSixValue(paths: Array<ActivePath>): boolean{
        for (let path of paths){
            if (path.moveBy === 12){
                return true
            }
        }
        return false
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

    canPutPieceOnHomePath(): boolean {
        for (let piece of this.currentPlayer.pieces) {
            if (piece.isActive() && this.validateDieCanPutPieceOnHomePath(piece)){
                return true
            }
        }
        return false
    }

    validateDieCanPutPieceOnHomePath(piece: Piece): boolean {
        let dieValue1 = this.scene.registry.get('die1')
        let dieValue2 = this.scene.registry.get('die2')
        let cond1 = false
        let cond2 = false
        
        if (dieValue1 > 0) {
            let path = piece.generatePath(dieValue1, true)
           
            if (path !== null && path.isValid && path.projectedIndex >= piece.homeStartIndex){
                cond1 = true 
            }
        }
        if (dieValue2 > 0) {
            let path = piece.generatePath(dieValue2, true)
            if (path !== null && path.isValid && path.projectedIndex >= piece.homeStartIndex){
                cond2 = true
            }
        }
        return cond1 && cond2
    }

    getAllPiecesAtIndex(index: number): Array<Piece> {
        let pieces = []
        for (let player of this.players) {
            if (player !== this.currentPlayer){
                for (let piece of player.pieces){
                    if (piece.index === index){
                        pieces.push(piece)
                    }
                }
            }
        }
        return pieces
    }

    handlePeckingSituation(currentPlayerPieceId: string, opposingPlayerPiece: Piece): void {
        this.scene.events.emit('pieceExited', currentPlayerPieceId)
        opposingPlayerPiece.moveBackHome()
    }

    getPlayerOrder(): Array<string> {
        let playerOrder = []
        for (let player of this.players) {
            playerOrder.push(player.playerName)
        }
        return playerOrder
    }

    eligibleForActivePathGeneration(piece: Piece): boolean {
        return (piece.isActive() || this.homePieceCanUseOneOrMoreDice(piece) || this.atLeastOneSixIsRolled()) && !piece.isExited()
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

    bothDiceSelected(): boolean {
        return this.scene.registry.get('die1-selected') && this.scene.registry.get('die2-selected')
    }

}