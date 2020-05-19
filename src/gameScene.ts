import "phaser";
import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';
import PathFollower from 'phaser3-rex-plugins/plugins/pathfollower.js';
import {Movement} from './movement'
import {Piece} from './piece'
import {ActivePath} from './activePath'
import {Red} from './pieceState'
import {Blue} from './pieceState'
import {Green} from './pieceState'
import {Yellow} from './pieceState'

export class GameScene extends Phaser.Scene {
  info: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(/*params: any*/): void {
    
  }

  preload(): void {
    this.load.image("board", "assets/board.jpg");
    this.load.image("redPiece1", "assets/red.png");
    this.load.image("redPiece2", "assets/red.png");
    this.load.image("bluePiece1", "assets/blue.png");
    this.load.image("bluePiece2", "assets/blue.png");
    this.load.image("yellowPiece1", "assets/yellow.png");
    this.load.image("yellowPiece2", "assets/yellow.png");
    this.load.image("greenPiece1", "assets/green.png");
    this.load.image("greenPiece2", "assets/green.png");
    
  }

  movePieceTo(piece: Phaser.GameObjects.Sprite, x: number, y: number): void{
    console.log("Moving to new pos")
    let config = {
      speed: 400,
      rotateToTarget: true
    }
    let moveTo = new MoveTo(piece, config);
    moveTo.moveTo(x, y)
    moveTo.setRotateToTarget(0);
    moveTo.on('complete', function(gameObject, moveTo){
      //piece.setPosition(72.2, 312.7);
    });
  }

  movePieceAlong(piece: Piece, path: ActivePath, scene: Phaser.Scene): void {
    let config = {
      path: path,
      t: 0,
      rotateToPath: true
    }
    let pathFollower = new PathFollower(piece, config)
   
    scene.tweens.add({
      targets: pathFollower,
      t: 1,
      ease: 'Linear',
      duration: 1000,
      repeat: 0,
      yoyo: false
    }).on('complete', function(tween, targets){
      console.log(piece.x + ", " + piece.y + ", " + piece.index)
    });

  }

  create(): void {
    this.cameras.main.setViewport(0, 0, 721, 721);
    this.add.image(361, 361, 'board')  
    let scene = this;
    let red_x_start = 72.2
    let red_y_start = 312.7
    let red_index = 1

    let red_x_start1 = 72.2
    let red_y_start1 = 408.9
    let red_index1 = 49
   
    let red1 = new Piece(this, red_x_start1, red_y_start1, red_index1, 51, Red, 'redPiece1')
    let red2 = new Piece(this, 24.2, 24.2, -1, 51, Red, 'redPiece1')
    
    let blue1 = new Piece(this, 312.7, 120.3, 9, 12, Blue, 'bluePiece1')
    let blue2 = new Piece(this, 505.1, 72.7, -1, 12, Blue, 'bluePiece2')

    let yellow1 = new Piece(this, 553.2, 312.7, 21, 25, Yellow, 'yellowPiece1')
    let yellow2 = new Piece(this, 649.4, 553.2, -1, 25, Yellow, 'yellowPiece2')

    let green1 = new Piece(this, 408.9, 601.9, 35, 38, Green, 'greenPiece1')
    let green2 = new Piece(this, 24.2, 650, -1, 38, Green, 'greenPiece2')

    red1.setInteractive()
    red2.setInteractive()
    blue1.setInteractive()
    blue2.setInteractive()
    yellow1.setInteractive()
    yellow2.setInteractive()
    green1.setInteractive()
    green2.setInteractive()

    let movement = new Movement(24.1, 48.1, this);
    
    red2.on('pointerdown', (pointer) => {
      let path = new ActivePath(scene, red2)
      let activePath = this.generatePath(red2, 3, movement, path)
      if (activePath != null) {
        this.movePieceAlong(red2, activePath, scene)
        activePath.updatePiece();
      }
    });

    red1.on('pointerdown', (pointer) => {
      let path = new ActivePath(scene, red1)
      let activePath = this.generatePath(red1, 3, movement, path)
      if (activePath != null) {
        this.movePieceAlong(red1, activePath, scene)
        activePath.updatePiece();
        //movePiece(this, 264.6, 312.7)
      }
    });

    blue1.on('pointerdown', (pointer) => {
      let path = new ActivePath(scene, blue1)
      let activePath = this.generatePath(blue1, 3, movement, path)
      if (activePath != null) {
        this.movePieceAlong(blue1, activePath, scene)
        activePath.updatePiece();

      }
    });

    blue2.on('pointerdown', (pointer) => {
      let path = new ActivePath(scene, blue2)
      let activePath = this.generatePath(blue2, 3, movement, path)
      if (activePath != null) {
        this.movePieceAlong(blue2, activePath, scene)
        activePath.updatePiece();

      }
    });

    yellow1.on('pointerdown', (pointer) => {
      let path = new ActivePath(scene, yellow1)
      let activePath = this.generatePath(yellow1, 5, movement, path)
      if (activePath != null) {
        this.movePieceAlong(yellow1, activePath, scene)
        activePath.updatePiece()

      }
    });

    yellow2.on('pointerdown', (pointer) => {
      let path = new ActivePath(scene, yellow2)
      let activePath = this.generatePath(yellow2, 5, movement, path)
      if (activePath != null) {
        this.movePieceAlong(yellow2, activePath, scene)
        activePath.updatePiece()

      }
    });

    green1.on('pointerdown', (pointer) => {
      let path = new ActivePath(scene, green1)
      let activePath = this.generatePath(green1, 3, movement, path)
      if (activePath != null) {
        this.movePieceAlong(green1, activePath, scene)
        activePath.updatePiece()
      }
    });

    green2.on('pointerdown', (pointer) => {
      let path = new ActivePath(scene, green2)
      let activePath = this.generatePath(green2, 3, movement, path)
      if (activePath != null) {
        this.movePieceAlong(green2, activePath, scene)
        activePath.updatePiece()
      }
    });
   
  }

  update(time: number): void {}

  generatePath(piece: Piece, moveBy: number, movement: Movement, path: ActivePath): ActivePath {
    
    let function_id = this.getPathFunctionId(movement, piece.index)
    path = this.callPathFunction(movement, function_id, moveBy, piece.index, piece.x, piece.y, path)
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


  
};
