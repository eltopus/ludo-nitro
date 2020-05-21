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
        this.setInteractive()
        this.on('pointerdown', (pointer) => {
          this.scene.events.emit('pieceSelected', this.pieceId)
        });
    }


    becomeActive(): void {
        this.pieceState = PieceState.Active
    }

    becomeInActive(): void {
        this.pieceState = PieceState.Inactive
    }

    beOnHomePath(): void {
        this.pieceState = PieceState.OnHomePath
    }

    becomeExited(): void {
        this.pieceState = PieceState.Exited
    }

    move(moveby: number): void {
        let activePath= new ActivePath(this.scene, this)
        activePath = this.generatePath(moveby, this.movement, activePath)
        if (activePath != null) {
          this.movePieceAlong(activePath, this.scene)
          activePath.updatePiece();
        }

    }

    generatePath(moveBy: number, movement: Movement, path: ActivePath): ActivePath {
    
        let function_id = this.getPathFunctionId(movement, this.index)
        path = this.callPathFunction(movement, function_id, moveBy, this.index, this.x, this.y, path)
        if (path.remainderIndex === 0) {
          return path;
        }else {
          do {
            function_id = this.getPathFunctionId(movement, path.projectedIndex)
            path = this.callPathFunction(movement, function_id, path.remainderIndex, path.projectedIndex, path.projectedX, path.projectedY, path)
          }while(path.remainderIndex > 0)
        }
        return path;
      }
    
      getPathFunctionId(movement: Movement, index: number): string {
        return movement.getPathFunctionId(index);
      }

      callPathFunction(movement:Movement, funct_id:string, moveby:number, index:number, x:number, y:number, path:ActivePath): ActivePath {
        switch(funct_id) {
          case "Z1": {
            return movement.generatePathZ1(path, moveby)
            break;
          }
          case "A1": {
            return movement.generatePathA1(moveby, index,x, y, path)
            break;
          }
          case "A2": {
            return movement.generatePathA2(moveby, index,x, y, path)
            break;
          }
          case "A3": {
            return movement.generatePathA3(moveby, index,x, y, path)
            break;
          }
          case "B1": {
            return movement.generatePathB1(moveby, index,x, y, path)
            break;
          }
          case "B2": {
            return movement.generatePathB2(moveby, index,x, y, path)
            break;
          }
          case "B3": {
            return movement.generatePathB3(moveby, index,x, y, path)
            break;
          }
          case "C1": {
            return movement.generatePathC1(moveby, index,x, y, path)
            break;
          }
          case "C2": {
            return movement.generatePathC2(moveby, index,x, y, path)
            break;
          }
          case "C3": {
            return movement.generatePathC3(moveby, index,x, y, path)
            break;
          }
          case "D1": {
            return movement.generatePathD1(moveby, index,x, y, path)
            break;
          }
          case "D2": {
            return movement.generatePathD2(moveby, index,x, y, path)
            break;
          }
          case "D3": {
            return movement.generatePathD3(moveby, index,x, y, path)
            break;
          }
          case "A4": {
            return movement.generatePathA4(moveby, index,x, y, path)
            break;
          }
          case "D4": {
            return movement.generatePathD4(moveby, index,x, y, path)
            break;
          }
          case "B4": {
            return movement.generatePathB4(moveby, index,x, y, path)
            break;
          }
          case "C4": {
            return movement.generatePathC4(moveby, index,x, y, path)
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
       
        scene.tweens.add({
          targets: pathFollower,
          t: 1,
          ease: 'Linear',
          duration: 1000,
          repeat: 0,
          yoyo: false
        }).on('complete', (tween, targets) => {
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

}