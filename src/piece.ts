import {PieceState} from './pieceState'
import {Movement} from './movement'
import {ActivePath} from './activePath'
import PathFollower from 'phaser3-rex-plugins/plugins/pathfollower.js';
import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';
import {Red} from './pieceState'
import {Blue} from './pieceState'
import {Green} from './pieceState'
import {Yellow} from './pieceState'
import {PPiece} from './persistence/ludo'

export class Piece extends Phaser.GameObjects.Sprite {
    index: number
    homeIndex: number
    pieceState: any
    pieceType: any
    startIndex: number
    movement: Movement
    pieceId: string
    moving: boolean
    homeX: number
    homeY: number
    homeStartIndex: number
    
    constructor(scene: Phaser.Scene, x: number, y: number, homeX: number, homeY: number, index: number, homeIndex: number, startIndex: number, pieceType: any, texture: string, homeStartIndex: number){
        super(scene, x, y, texture);
        this.homeX = homeX
        this.homeY = homeY
        this.pieceId = texture
        this.index = index;
        this.homeIndex = homeIndex;
        this.scene.add.existing(this);
        this.pieceState = PieceState.Inactive
        this.pieceType = pieceType
        this.startIndex = startIndex
        this.homeStartIndex = homeStartIndex
        this.movement = new Movement(24.1, 48.1, scene);
        this.moving = false
        this.setInteractive()
        this.on('pointerdown', (pointer) => {
          this.scene.events.emit('pieceSelected', this.pieceId)
        });
        
    }

    setDraggable(): void {
      this.scene.input.setDraggable(this, true)
    }

    moveByPath(path: ActivePath): void {
      this.movePieceAlong(path, this.scene)
      path.updatePiece();
    }

    move(moveby: number): void {
      
        if (!this.isActive() && moveby >= 6){
          moveby -= 6
        }
        let activePath = this.generatePath(moveby, true)
        if (activePath != null) {
          if (activePath.isValid) {
            this.scene.children.bringToTop(this)
            this.movePieceAlong(activePath, this.scene)
            activePath.updatePiece();
          }else {
            console.log("Path cannot be applied because it is not valid")
          }
        }else {
          console.log("Path return null value")
        }
    }

    generatePath(moveby: number, singleDie: boolean): ActivePath {
        let path = new ActivePath(this.scene, this)
        path.singleDieValue = singleDie
        path.moveBy = moveby
        let function_id = this.getPathFunctionId(this.index)
        path = this.callPathFunction(function_id, moveby, this.index, this.x, this.y, path)
        if (path.remainderIndex === 0) {
          return path;
        }else {
          do {
            function_id = this.getPathFunctionId(path.projectedIndex)
            path = this.callPathFunction(function_id, path.remainderIndex, path.projectedIndex, path.projectedX, path.projectedY, path)
          }while(path.remainderIndex > 0)
        }
        return path;
    }

    getPathFunctionId(index: number): string {
        return this.movement.getPathFunctionId(index);
    }

    callPathFunction(funct_id:string, moveby:number, index:number, x:number, y:number, path:ActivePath): ActivePath {
      switch(funct_id) {
        case "Z1": {
          return this.movement.generatePathZ1(path, moveby)
          break;
        }
        case "A1": {
          return this.movement.generatePathA1(moveby, index,x, y, path)
          break;
        }
        case "A2": {
          return this.movement.generatePathA2(moveby, index,x, y, path)
          break;
        }
        case "A3": {
          return this.movement.generatePathA3(moveby, index,x, y, path)
          break;
        }
        case "B1": {
          return this.movement.generatePathB1(moveby, index,x, y, path)
          break;
        }
        case "B2": {
          return this.movement.generatePathB2(moveby, index,x, y, path)
          break;
        }
        case "B3": {
          return this.movement.generatePathB3(moveby, index,x, y, path)
          break;
        }
        case "C1": {
          return this.movement.generatePathC1(moveby, index,x, y, path)
          break;
        }
        case "C2": {
          return this.movement.generatePathC2(moveby, index,x, y, path)
          break;
        }
        case "C3": {
          return this.movement.generatePathC3(moveby, index,x, y, path)
          break;
        }
        case "D1": {
          return this.movement.generatePathD1(moveby, index,x, y, path)
          break;
        }
        case "D2": {
          return this.movement.generatePathD2(moveby, index,x, y, path)
          break;
        }
        case "D3": {
          return this.movement.generatePathD3(moveby, index,x, y, path)
          break;
        }
        case "A4": {
          return this.movement.generatePathA4(moveby, index,x, y, path)
          break;
        }
        case "D4": {
          return this.movement.generatePathD4(moveby, index,x, y, path)
          break;
        }
        case "B4": {
          return this.movement.generatePathB4(moveby, index,x, y, path)
          break;
        }
        case "C4": {
          return this.movement.generatePathC4(moveby, index,x, y, path)
          break;
        }
        default:
          break;
      }
      return null;
    }

      movePieceAlong(path: ActivePath, scene: Phaser.Scene): void {
        let config = {
          path: path,
          t: 0,
          rotateToPath: true
        }
        let pathFollower = new PathFollower(this, config)
        this.moving = true
       
        scene.tweens.add({
          targets: pathFollower,
          t: 1,
          ease: 'Linear',
          duration: 1000,
          repeat: 0,
          yoyo: false
        }).on('complete', (tween, targets) => {
          
          this.moving = false
          this.scene.events.emit('pieceMovementCompleted', this.pieceId, this.index)
          if (this.pieceState === PieceState.Exited){
            this.scene.events.emit('pieceExited', this.pieceId)
            console.log(this.x + ", " + this.y + ", " + this.index)
          }
        });
    }

    movePieceTo(x: number, y: number): void{
        console.log("Moving to new pos")
        let config = {
          speed: 400,
          rotateToTarget: true
        }
        let moveTo = new MoveTo(this, config);
        moveTo.moveTo(x, y)
        moveTo.setRotateToTarget(0);
        moveTo.on('complete', function(gameObject, moveTo){
          //piece.setPosition(72.2, 312.7);
        });
      }

      isMoving(): boolean {
        return this.moving
      }

      isActive(): boolean {
        return this.pieceState === PieceState.Active
      }

      isExited(): boolean {
        return this.pieceState === PieceState.Exited
      }

      isNotActive(): boolean {
        return this.pieceState !== PieceState.Inactive
      }

      isInActive(): boolean {
        return this.pieceState === PieceState.Inactive
      }

      isOnHomePath(): boolean {
        return this.pieceState === PieceState.OnHomePath
      }

      becomeActive(): void {
        this.pieceState = PieceState.Active
      }

      becomeInActive(): void {
        this.pieceState = PieceState.Inactive
        this.index = -1
      }

      becomeHomeBound(): void {
        this.pieceState = PieceState.OnHomePath
      }

      becomeExited(): void {
        this.pieceState = PieceState.Exited
      }

      showPieceState(): string {
        switch(this.pieceState){
            case PieceState.Active: {
                return "Active"
            }
            case PieceState.Inactive: {
                return "Inactive"
            }
            case PieceState.OnHomePath: {
                return "OnHomePath"
            }
            case PieceState.Exited: {
                return "Exited"
            }
            default:
                return "UNKNOWN"
        }
    }

    getPieceState(state: string): any {
      switch(state) {
          case "Inactive": {
              return PieceState.Inactive
          }
          case "Active": {
              return PieceState.Active
          }
          case "OnHomePath": {
              return PieceState.OnHomePath
          }
          case "Exited": {
              return PieceState.Exited
          }
          default:
              return PieceState.Inactive
      }
    }

    showPieceType(): string {
      switch(this.pieceType){
          case Red: {
              return "Red"
          }
          case Blue: {
              return "Blue"
          }
          case Green: {
              return "Green"
          }
          case Yellow: {
              return "Yellow"
          }
          default:
              return "UNKNOWN"
      }
  }

  getPieceType(pieceType: string): any {
    switch(pieceType){
        case "Red": {
            return Red
        }
        case "Blue": {
            return Blue
        }
        case "Green": {
            return Green
        }
        case "Yellow": {
            return Yellow
        }
        default:
            return null
    }
}

    moveBackHome(): void {
      this.index = -1
      this.becomeInActive()
      this.movePieceTo(this.homeX, this.homeY)
    }

    updatePiece(config: PPiece): void {
      if (this.pieceId === config.pieceId) {
        this.x = config.x
        this.y = config.y
        this.index = config.index
        this.pieceState = this.getPieceState(config.pieceState)
        if (this.isExited()){
          this.setVisible(false)
        }
        
      }
    }
}