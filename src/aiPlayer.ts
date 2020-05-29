import {Piece} from './piece'
import {Player} from './player'
import {ActivePath} from "./activePath"
import {PPlayer} from './persistence/ludo'


export class AIPlayer implements Player {
    playerName: string
    pieces: Array<Piece>
    exitedPieces: Array<Piece>
    scene: Phaser.Scene
    group: Phaser.Physics.Arcade.Group
    selectedPiece: Piece

    constructor(playerName: string, scene: Phaser.Scene) {
        this.playerName = playerName
        this.scene = scene
        this.group =this.scene.physics.add.group({})
        this.scene.events.on('pieceSelected', this.pieceSelected, this);
        this.scene.events.on('pieceExited', this.destroyPiece, this);
        this.selectedPiece = null
        this.pieces = new Array<Piece>()
        this.exitedPieces = new Array<Piece>()
    }

    addPieces(pieces: Array<Piece>): void {
        for (let piece of pieces){
            this.pieces.push(piece)
        }
        this.group.addMultiple(pieces)
    }

    addPiece(piece: Piece): void {
        this.pieces.push(piece)
        this.group.add(piece)
    }

    pieceSelected(pieceId: string): void {
        for (let piece of this.pieces) {
            if (piece.pieceId === pieceId && this.group.contains(piece)){
                //console.log("Piece " + pieceId + " has been selected")
                piece.tint = 0x808080;
                
                if (this.selectedPiece != null && this.selectedPiece != piece) {
                    this.selectedPiece.clearTint()
                }
                this.selectedPiece = piece
                break
            }
        }
    }

    moveSelectedPiece(moveBy: number): boolean {
        if (this.selectedPiece != null && !this.selectedPiece.isMoving()) {
            this.selectedPiece.move(moveBy)
            return true;
        }else {
            return false
        }
    }

    destroyPiece(pieceId: string): void {
        let indexOf = -1
        for (let piece of this.pieces) {
            if (piece.pieceId === pieceId) {
                indexOf = this.pieces.indexOf(piece)
                piece.setVisible(false)
                this.exitedPieces.push(piece)
                if (indexOf >= 0) {
                    console.log("Removing piece: " + pieceId)
                    this.pieces.splice(indexOf, 1);
                    break
                }
            }
        }
    }

    setPieceDraggable(): void {
        for (let piece of this.pieces) {
            piece.setDraggable()
        }
    }

    hasActivePieces(): boolean {
        for (let piece of this.pieces) {
            if (piece.isActive()){
                return true
            }
        }
        return false;
    }

    hasJustActivePieces(): boolean {
        for (let piece of this.pieces) {
            if (piece.isNotActive() || piece.isOnHomePath()){
                return false
            }
        }
        return true;
    }

    hasInActivePieces(): boolean {
        for (let piece of this.pieces) {
            if (piece.isInActive()){
                return true
            }
        }
        return false;
    }

    hasNoActivePieces(): boolean {
        for (let piece of this.pieces) {
            if (piece.isActive()){
                return false
            }
        }
        return true;
    }

    hasExactlyOneActiveAndAtLeastOneHomePiece(): boolean {
        let activePieceCount = 0;
        for (let piece of this.pieces) {
            if (piece.isActive() || piece.isOnHomePath()){
                ++activePieceCount
                if (activePieceCount > 1){
                    break
                }
            }
        }
        return (activePieceCount > 1);
    }

    allPiecesAreInactive(): boolean {
        for (let piece of this.pieces) {
            if (!piece.isNotActive()){
                return false
            }
        }
        return true;
    }

    hasExactlyOneActivePiece(): boolean {
        let activePieceCount = 0;
        for (let piece of this.pieces) {
            if (piece.isActive()){
                ++activePieceCount
                if (activePieceCount > 1){
                    break
                }
            }
        }
        return (activePieceCount === 1);
    }

    hasSelectedPiece(): boolean {
        return this.selectedPiece !== null
    }

    selectedPieceIsActive(): boolean {
        return this.selectedPiece.isActive()
    }

    selectedPieceIsNotActive(): boolean {
        return this.selectedPiece.isNotActive()
    }

    hasHomePieces(): boolean {
        for (let piece of this.pieces) {
            if (piece.isOnHomePath()){
                return true;
            }
        }
        return false
    }

    getFirstActivePiece(): Piece {
        for (let piece of this.pieces) {
            if (piece.isActive()){
                return piece
            }
        }
        return null
    }

    doesNotBelong(piece: Piece): boolean {
        return this.group.contains(piece) === false
    }

    bringPiecesToTop(): void {
        this.group.getChildren().forEach((child) => {
            this.scene.children.bringToTop(child)
        })
    }

    hasNoPiecesLeft(): boolean {
        let count = 0
        for (let piece of this.pieces) {
            if (piece.isActive() || piece.isNotActive() || piece.isOnHomePath()){
                ++ count
                if (count > 0){
                    break
                }
            }
        }
        return count === 0
    }

    playerRollDice(): void {
        let value1 =  Phaser.Math.Between(1, 6)
        let value2 =  Phaser.Math.Between(1, 6)
        //value1 = 1
        //value2 = 1
        setTimeout(()=> {
            this.scene.scene.get('SideScene').events.emit('rollDice', value1, value2)
        }, 1000);
    }

    playerPlayDice(activePaths: Array<ActivePath>): void {
        setTimeout(()=> {
            activePaths = activePaths.filter((path)=> {
                return path.isValid && path.activePiece !== null
            })
            let randPathIndex = Phaser.Math.Between(0, activePaths.length - 1)
            if (randPathIndex < 0)
                randPathIndex = 0

            let chosenPath = activePaths[randPathIndex]
            let chosenPiece = chosenPath.activePiece
            this.determineDieId(chosenPath)
            chosenPiece.move(chosenPath.moveBy)
        }, 1000);
        
    }

    determineDieId(path: ActivePath): void {
        let moveBy = path.moveBy
        let dieOneValue = this.scene.registry.get('die1')
        let dieTwoValue = this.scene.registry.get('die2')
        if (moveBy > 6 || path.moveBy === (dieOneValue + dieTwoValue)){
            //this.scene.registry.set('die1', 0)
            //this.scene.registry.set('die2', 0)
            this.scene.scene.get('SideScene').events.emit('resetBothDice')
        }else {
           
            if (path.moveBy === dieOneValue){
                //this.scene.registry.set('die1', 0)
                this.scene.scene.get('SideScene').events.emit('resetSingleDie', 'die1')
            }
            else if (path.moveBy === dieTwoValue){
                //this.scene.registry.set('die2', 0)
                this.scene.scene.get('SideScene').events.emit('resetSingleDie', 'die2')
            }
        }
    }

    

    isVadidPath(currentPath: ActivePath, allPaths: Array<ActivePath>) {
        for (let path of allPaths){
          if (path.pathToString() === currentPath.pathToString()){
            return true
          }
        }
        return false
      }
}