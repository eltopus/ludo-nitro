import {PieceState} from './pieceState'
import {Movement} from './movement'
import {ActivePath} from './activePath'
import PathFollower from 'phaser3-rex-plugins/plugins/pathfollower.js';
import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';

export class Piece extends Phaser.GameObjects.Sprite {
    index: number
    homeIndex: number
    pieceState: any
    pieceType: any
    startIndex: number
    movement: Movement
    pieceId: string
    moving: boolean
    
    constructor(scene: Phaser.Scene, x: number, y: number, index: number, homeIndex: number, startIndex: number, pieceType: any, texture: string){
        super(scene, x, y, texture);
        this.pieceId = texture
        this.index = index;
        this.homeIndex = homeIndex;
        this.scene.add.existing(this);
        this.pieceState = PieceState.Inactive
        this.pieceType = pieceType
        this.startIndex = startIndex
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


    move(moveby: number): void {
        
        let activePath = this.generatePath(moveby)
        if (activePath != null) {
          if (activePath.isValid) {
            this.movePieceAlong(activePath, this.scene)
            activePath.updatePiece();
          }else {
            console.log("Path cannot be applied because it is not valid")
          }
          
        }else {
          console.log("Path return null value")
        }
    }

    moveByPath(path: ActivePath): void {
      this.movePieceAlong(path, this.scene)
      path.updatePiece();
    }

    generatePath(moveBy: number): ActivePath {
        let path = new ActivePath(this.scene, this)
        path.moveBy = moveBy
        let function_id = this.getPathFunctionId(this.index)
        path = this.callPathFunction(function_id, moveBy, this.index, this.x, this.y, path)
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

      isNotActive(): boolean {
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


}