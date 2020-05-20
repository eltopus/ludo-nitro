import "phaser";
import {Movement} from './movement'
import {Piece} from './piece'
import {Red} from './pieceState'
import {Blue} from './pieceState'
import {Green} from './pieceState'
import {Yellow} from './pieceState'
import {PieceFactory} from './pieceFactory'
import {Player} from './player'

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
    this.load.image("red1", "assets/red.png");
    this.load.image("red2", "assets/red.png");
    this.load.image("red3", "assets/red.png");
    this.load.image("red4", "assets/red.png");
    this.load.image("blue1", "assets/blue.png");
    this.load.image("blue2", "assets/blue.png");
    this.load.image("blue3", "assets/blue.png");
    this.load.image("blue4", "assets/blue.png");
    this.load.image("yellow1", "assets/yellow.png");
    this.load.image("yellow2", "assets/yellow.png");
    this.load.image("yellow3", "assets/yellow.png");
    this.load.image("yellow4", "assets/yellow.png");
    this.load.image("green1", "assets/green.png");
    this.load.image("green2", "assets/green.png");
    this.load.image("green3", "assets/green.png");
    this.load.image("green4", "assets/green.png");
    
  }

  create(): void {
    this.cameras.main.setViewport(0, 0, 721, 721);
    this.add.image(361, 361, 'board')  
    let scene = this;
  
    let red_x_start1 = 24.1 + (48.1 * 3.5)
    let red_y_start1 = 24.1 + (48.1 * 2.5)
    let red_index1 = 49

    let blue_x_start1 = 24.1 + (48.1 * 11.5)
    let blue_y_start1 = 24.1 + (48.1 * 1.5)

    let yellow_x_start1 = 24.1 + (48.1 * 12.5)
    let yellow_y_start1 = 24.1 + (48.1 * 11.5)

    let green_x_start1 = 24.1 + (48.1 * 2.5)
    let green_y_start1 = 24.1 + (48.1 * 12.5)

  

    let pieceFactory = new PieceFactory(this, null)
    //let redPieces = pieceFactory.createRedPieces()
    //let bluePieces = pieceFactory.createBluePieces()
    //let yellowPieces = pieceFactory.createYellowPieces()
    let greenPieces = pieceFactory.createGreenPieces()
   
    /* let red1 = new Piece(this, red_x_start1, red_y_start1, -1, -1, Red, 'redPiece1')
    let red2 = new Piece(this, 24.2, 24.2, -1, 51, Red, 'redPiece2')
    
    let blue1 = new Piece(this, blue_x_start1, blue_y_start1, -1, 12, Blue, 'bluePiece1')
    let blue2 = new Piece(this, 505.1, 72.7, -1, 12, Blue, 'bluePiece2')

    let yellow1 = new Piece(this, yellow_x_start1, yellow_y_start1, -1, 25, Yellow, 'yellowPiece1')
    let yellow2 = new Piece(this, 649.4, 553.2, -1, 25, Yellow, 'yellowPiece2')

    let green1 = new Piece(this, green_x_start1, green_y_start1, -1, 38, Green, 'greenPiece1')
    let green2 = new Piece(this, 24.2, 650, -1, 38, Green, 'greenPiece2') */


    
   /*  red2.on('pointerdown', function(pointer) {
      this.move(5)
    }); */

    /* red1.on('pointerdown', function(pointer) {
      this.move(3)
    });

    blue1.on('pointerdown', function(pointer) {
      this.move(3)
    });

    blue2.on('pointerdown', function(pointer){
      this.move(3)
    });

    yellow1.on('pointerdown', function(pointer){
      this.move(3)
    });

    yellow2.on('pointerdown', function(pointer){
      this.move(3)
    });

    green1.on('pointerdown', function(pointer){
      this.move(3)
    });

    green2.on('pointerdown', function(pointer){
      this.move(3)
    }); */
   
  }

  update(time: number): void {}

};
