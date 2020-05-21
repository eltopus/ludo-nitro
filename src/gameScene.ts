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
    this.load.image('play', '/assets/play.png')
    
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

    let play = this.add.sprite(360, 360, 'play')
    play.setInteractive()

    play.on('pointerdown', (pointer) => {
        
        if (this.bothDiceSelected()) {
          let dieOneScore = this.registry.get('die1')
          let dieTwoScore = this.registry.get('die2')
          let isMoved = player1.moveSelectedPiece(dieOneScore + dieTwoScore)
          if(isMoved) {
            //this.registry.set('die1', 0)
            //this.registry.set('die2', 0)
          }
        }else {
          let dieValue = this.selectedDieValue()
          let isMoved = player1.moveSelectedPiece(dieValue)
          if(isMoved) {
            //this.registry.set('die1', 0)
            //this.registry.set('die2', 0)
          }
        }
    });

    this.events.on('pieceMovementCompleted', this.evaluateRule, this);
    

  }

  evaluateRule(pieceId: string, pieceIndex: number): void {
   console.log("Evaluating pieceId: " + pieceId + " pieceIndex: " + pieceIndex)
    
  }

  bothDiceSelected(): boolean {
    return (this.registry.get('die1-selected') && this.registry.get('die2-selected'))
  }

  selectedDieValue(): number {
    if (this.registry.get('die1-selected')) {
      return this.registry.get('die1')
    }

    if (this.registry.get('die2-selected')) {
      return this.registry.get('die2')
    }
    return 0
  }


  
  update(time: number): void {
    

}

};
