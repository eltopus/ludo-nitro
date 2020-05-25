import "phaser";
import {PieceFactory} from './pieceFactory'
import {PlayerFactory} from './playerFactory'
import {Player} from './player'
import {Rule} from './rule'
import {Draggable} from './draggable'
import { TextBox, TextArea } from 'phaser3-rex-plugins/templates/ui/ui-components.js';


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

    let conf = {
      text: this.add.text(800, 100, 'This is the test')
    }
    let tb = new TextBox(this, conf);
    
    this.add.existing(tb)
    tb.setInteractive()

    tb.on('pointerdown', function () {
      let icon = this.getElement('action').setVisible(false);
      this.resetChildVisibleState(icon);
      if (this.isTyping) {
          this.stop(true);
      } else {
          this.typeNextPage();
      }
  }, tb)

    


    this.cameras.main.setViewport(0, 0, 1020, 721);
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

    players[0].setPieceDraggable()
    players[1].setPieceDraggable()
 
    this.rule.addPlayers(players)
    this.currentPlayer = this.rule.getNextPlayer()
    this.registry.set('currentPlayer', this.currentPlayer.playerName)

    let play = this.add.sprite(868, 600, 'play')
    play.setInteractive()

    play.on('pointerdown', (pointer) => {

      if (this.currentPlayer.hasSelectedPiece()) {
        // Handle both dice play
          if (this.rule.shouldPlayBothDice()) {
            if (this.rule.evaluateIfDieValueSixShouldBeConsumed()){
              this.playBothDiceButConsumeSix()
            }else {
              this.playBothDice()
            }
          }else {
            // handles split dice play cases
            if (this.currentPlayer.selectedPieceIsActive()){
              // handles active pieces
              if (this.dieIsSelected()){
                if (this.currentPlayer.selectedPieceIsActive()){
                 this.playSelectedDie()
                }else {
                  console.log("Handle selected piece is not active")
                }
                
              }else {
                console.log("Please select a die...")
              }
            }else {
              // handles non active pieces
              if (this.dieIsSelected()){
                if (this.rule.atLeastOneSixIsRolled()){
                  if (this.rule.anyOfTheSelectedDiceHasValueSix()){
                    console.log("piece not active, six rolled, die value six is selected")
                    this.playConsumeSix()
                  }else {
                    // ignore die selection and play both dice
                    console.log("piece not active, six rolled, die value six is NOT selected")
                    console.log("Selected die value cannot be applied to selected piece")
                  }
                
                }else {
                  console.log("Handles no six is rolled and selected piece is NOT active")
                }
              }else {
                console.log("Please select a die...")
              }
            }
            
          }
        }else{
          console.log("Please select a piece...")
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
   //console.log("Evaluating piece completion rule pieceId: " + pieceId )
   if (this.rule.evaluatePieceMovementCompletion()){
    console.log("Stay on current player...")
   }else {
     this.currentPlayer = this.rule.getNextPlayer()
   }
   
 
    
  }

  evaluateDiceRollCompletion(dieCount: number): void {
    if (this.rule.evaluateDiceRollCompletion()){
     // console.log("Evaluate Game is true. Stay on player: " + this.currentPlayer.playerName)
    }else {
      this.currentPlayer = this.rule.getNextPlayer()
      //console.log("Evaluate Game is false. Move to next player: " + this.currentPlayer.playerName)
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

  nonZeroDieValue(): number {
    let dieValue = this.registry.get('die1')
    if (dieValue > 0) {
      return dieValue
    }
    dieValue = this.registry.get('die2')
    if (dieValue > 0) {
      return dieValue
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

  dieIsSelected(): boolean {
    return (this.registry.get('die1-selected')) || (this.registry.get('die2-selected'))
  }

  playBothDice(): void {
    let dieOneScore = this.registry.get('die1')
    let dieTwoScore = this.registry.get('die2')
    console.log("Should play both dice " + dieOneScore + " " + dieTwoScore)
    this.scene.get('SideScene').events.emit('resetBothDice')
    let isMoved = this.currentPlayer.moveSelectedPiece(dieOneScore + dieTwoScore)
    if (!isMoved) {
        console.log("PlayBothDice: Value must always be true else theres a problem! " + isMoved)
    }
  }

  playBothDiceButConsumeSix(): void {
    let dieValue = this.rule.consumeDieWithValueSixReturnTheOtherValue()
    console.log("Should consume six and play remaining value: " + dieValue)
    let isMoved = this.currentPlayer.moveSelectedPiece(dieValue)
    if (!isMoved) {
      console.log("PlayBothDiceConsumeSix: Value must always be true else theres a problem! " + isMoved)
    }
  }

  playSelectedDie(): void {
    let selectedDieId = this.selectedDieId();
    let dieValue = this.selectedDieValue()
    console.log("Should play " + selectedDieId + " with value: " + dieValue)
    let isMoved = this.currentPlayer.moveSelectedPiece(dieValue)
    if (!isMoved) {
      console.log("PlaySelectedDie: Value must always be true else theres a problem! " + isMoved)
    }
    this.scene.get('SideScene').events.emit('resetSingleDie', selectedDieId)
  }

  playConsumeSix(): void {
    let selectedDieId = this.rule.consumeDieWithValueSixAndReturnPieceId()
    if (selectedDieId != null) {
      let isMoved = this.currentPlayer.moveSelectedPiece(0)
      this.scene.get('SideScene').events.emit('resetSingleDie', selectedDieId)
      if (!isMoved) {
        console.log("PlayConsumeSix: Value must always be true else theres a problem! " + isMoved)
      }
    }else {
      console.log("Piece id is null.. Should never happen")
    }
    

  }
  
  update(time: number): void {
    
  }
  

  

};
