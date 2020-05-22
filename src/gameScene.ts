import "phaser";
import {PieceFactory} from './pieceFactory'
import {PlayerFactory} from './playerFactory'
import {Player} from './player'
import {Rule} from './rule'
import {Draggable} from './draggable'


export class GameScene extends Phaser.Scene {
  info: Phaser.GameObjects.Text;
  currentPlayer: Player = null
  rule: Rule;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(/*params: any*/): void {
    this.rule = new Rule(this)
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
 
  
    let pieceFactory = new PieceFactory(this, null)
    let redPieces = pieceFactory.createRedPieces()
    let bluePieces = pieceFactory.createBluePieces()
    let yellowPieces = pieceFactory.createYellowPieces()
    let greenPieces = pieceFactory.createGreenPieces()

    let playerNames = ["RedBlue", "YellowGreen"]
    let playerFacory = new PlayerFactory(playerNames, this)
    let players = playerFacory.createPlayers();
    
    players[0].addPieces(redPieces);
    players[0].addPieces(bluePieces)
    players[1].addPieces(yellowPieces)
    players[1].addPieces(greenPieces)

    //players[0].setPieceDraggable()
    //players[1].setPieceDraggable()
 
    this.rule.addPlayers(players)
    this.currentPlayer = this.rule.getNextPlayer()

    let play = this.add.sprite(360, 360, 'play')
    play.setInteractive()

    play.on('pointerdown', (pointer) => {
        if (this.rule.shouldPlayBothSelectedDice()) {
          let dieOneScore = this.registry.get('die1')
          let dieTwoScore = this.registry.get('die2')
          console.log("both dice selected " + dieOneScore + " " + dieTwoScore)
          
          let isMoved = this.currentPlayer.moveSelectedPiece(dieOneScore + dieTwoScore)
          if(isMoved) {
            
          }
        }else {
          // worry about single die play later
          // should never be null unless - make sure
          let selectedDieId = this.selectedDieId();
          let dieValue = this.selectedDieValue()
          console.log("Die with id " + selectedDieId + " is selected with value: " + dieValue)
          let isMoved = this.currentPlayer.moveSelectedPiece(dieValue)
          if(isMoved) {
            this.scene.get('SideScene').events.emit('resetSingleDice', selectedDieId)
          }
        }
    });

    let draggable = new Draggable(24.1, 48.1, this)
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;

    });
    this.input.on('dragend', function (pointer, gameObject) {
      draggable.configureDraggable(gameObject)
    });

    this.events.on('pieceMovementCompleted', this.evaluatePieceMovementCompletion, this);
    this.events.on('dieRolledCompleted', this.evaluateDiceRollCompletion, this);
  }

  evaluatePieceMovementCompletion(pieceId: string, pieceIndex: number): void {
   console.log("Evaluating piece completion rule pieceId: " + pieceId )
   this.currentPlayer = this.rule.getNextPlayer()
 
    
  }

  evaluateDiceRollCompletion(dieCount: number): void {
    if (this.rule.evaluate()){
      console.log("Evaluate Game is true. Stay on player: " + this.currentPlayer.playerName)
    }else {
      this.currentPlayer = this.rule.getNextPlayer()
      console.log("Evaluate Game is false. Move to next player: " + this.currentPlayer.playerName)
    }
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

  selectedDieId(): string {
    if (this.registry.get('die1-selected')) {
      return 'die1'
    }
    if (this.registry.get('die2-selected')) {
      return 'die2'
    }
    return null
  }

  
  update(time: number): void {
    
  }

  

};
