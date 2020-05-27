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
        if (this.currentPlayer.allPiecesAreInactive()){
            console.log("All pieces are inactive...")
            return true
        }
        // player has no active piece and no six is rolled
        if (!this.currentPlayer.hasJustActivePieces() && !this.atLeastOneSixIsRolled() && !this.doubleSixIsRolled()) {
            console.log("Player has no active piece and no six is rolled Play both dice")
            return true
        }

        if (!this.currentPlayer.hasActivePieces() && !this.atLeastOneSixIsRolled() && !this.doubleSixIsRolled()) {
            console.log("Player has no active piece and no six is rolled Play both dice")
            return true
        }

        if (this.currentPlayer.hasExactlyOneActivePiece() && !this.currentPlayer.hasHomePieces() && !this.atLeastOneSixIsRolled() && !this.doubleSixIsRolled()){
            console.log("Player has exactly one active piece and no six is rolled. Play both dice")
            return true

        }

        if (this.currentPlayer.hasExactlyOneActivePiece() && this.currentPlayer.hasHomePieces() && !this.homePiecesCanUseOneOrMoreDice() && !this.atLeastOneSixIsRolled() && !this.doubleSixIsRolled()){
            console.log("Player has exactly one active piece and home piece. Home piece cannot use dice and no six is rolled. Play both dice")
            return true

        }

        if (this.currentPlayer.hasHomePieces() && !this.homePiecesCanUseOneOrMoreDice() && !this.currentPlayer.hasJustActivePieces() && this.currentPlayer.hasInActivePieces() && !this.atLeastOneSixIsRolled() && !this.doubleSixIsRolled()){
            console.log("Player has home pieces but none can use any of the dice values. Play Both dice")
            return true
        }

        if (this.currentPlayer.hasExactlyOneActivePiece() && this.currentPlayer.hasInActivePieces() && !this.atLeastOneSixIsRolled() && this.doubleSixIsRolled()){
            console.log("Player has exactly one active piece and no inactive piece(s). No six or bouble six is rolled Play Both dice")
            return true
        }

        if (this.currentPlayer.hasExactlyOneActivePiece() && !this.currentPlayer.hasInActivePieces() && !this.homePiecesCanUseOneOrMoreDice() && !this.canPutPieceOnHomePath()){
            console.log("Player has exactly one active piece and no inactive piece(s) and no home piece that can use dice Play Both dice: ")
            return true
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
                    let validBothDicePath = piece.generatePath(dieOneScore + dieTwoScore)
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
            //console.log(activePieveMovebys)
            //console.log(nonActivePieveMovebys)


            if (activePieveMovebys.toString() === nonActivePieveMovebys.toString()) {
                console.log("Identical. Removing nothing...")
                return this.removePathByInactivePiecesWithoutDieValueSix(paths)
            }else {
                let indexofPathToBeRemove = null
                for (let m of activePieveMovebys){
                    if (nonActivePieveMovebys.includes(m)){
                        console.log("remove: " + m)
                        indexofPathToBeRemove = m
                        break;

                    }
                }
                return (this.removePathByInactivePiecesWithoutDieValueSix(this.removePathByMoveby(indexofPathToBeRemove, onlyActivePiece.pieceId, paths)))
            }
            
        }else {
            return (this.removePathByInactivePiecesWithoutDieValueSix(paths))
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

    convertSixValuePlayOnInActivePiecesToZeroPlay(paths: Array<ActivePath>): Array<ActivePath> {
        paths.map((path) => {
            if (!path.activePiece.isActive() && path.moveBy === 6){
                path.moveBy = 0
                return path
            }
            else if (!path.activePiece.isActive() && path.moveBy > 6){
                path.moveBy = path.moveBy - 6
            }else {
                return path
            }
        });
        return paths 
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
        if (dieValue1 > 0) {
            let path = piece.generatePath(dieValue1)
            if (path !== null && path.isValid && path.projectedIndex > piece.homeIndex){
                return true
            }
        }else if (dieValue2 > 0) {
            let path = piece.generatePath(dieValue2)
            if (path !== null && path.isValid && path.projectedIndex > piece.homeIndex){
                return true
            }
        }
        else {
            return false
        }
    }

    getAllPiecesAtIndex(index: number): Array<Piece> {
        let pieces = []
        for (let player of this.players) {
            if (player !== this.currentPlayer){
                pieces = player.pieces.filter((piece)=> {
                    return piece.index === index
                });
            }
        }
        return pieces
    }

    handlePeckingSituation(currentPlayerPieceId: string, opposingPlayerPiece: Piece): void {
        this.scene.events.emit('pieceExited', currentPlayerPieceId)
        opposingPlayerPiece.moveBackHome()
    }
}