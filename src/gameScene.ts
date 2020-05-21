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
  
    let pieceFactory = new PieceFactory(this, null)
    let redPieces = pieceFactory.createRedPieces()
    let bluePieces = pieceFactory.createBluePieces()
    let yellowPieces = pieceFactory.createYellowPieces()
    let greenPieces = pieceFactory.createGreenPieces()

    
    let player1 = new Player("PlayerOne", false, this)
    player1.addPieces(redPieces);
    player1.addPieces(bluePieces)
    

  }

  
  update(time: number): void {
    

}

};
