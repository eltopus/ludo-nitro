import "phaser";
import {PieceFactory} from './pieceFactory'
import {PlayerFactory} from './playerFactory'
import {Player} from './player'
import {Rule} from './rule'
import {Draggable} from './draggable'
import { TextBox, TextArea } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import { ActivePath } from "./activePath";


export class GameScene extends Phaser.Scene {
  info: Phaser.GameObjects.Text;
  currentPlayer: Player = null
  rule: Rule;
  paths: Array<ActivePath> = null

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
        if (this.paths.length > 1){
          // die selection needed
          // what if both dice selected?
          if (this.singleDieIsSelected()){
            console.log("Single Die selected....")
            let selectedDieId = this.getSelectedSingleDieId()
            let dieValue = this.getSelectedDieValue(selectedDieId)
            this.playDiceValue(dieValue, selectedDieId)

          }else if (this.bothDiceSelected()) {
            console.log("Both Dice selected....")
            let selectedDieIds = this.getSelectedBothDiceIds()
            let dieValue = this.getSelectedDieValue(selectedDieIds)
            this.playDiceValue(dieValue, selectedDieIds)
          }else {
            console.log("Please select die...")
          }
        }else {
          // no die selection needed
          console.log("Path's lenght is 0")
          
        }

      }else {
        console.log("Please select piece...")
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
    this.paths = this.rule.evaluatePieceMovementCompletion()
    if (this.paths.length === 0) {
      if (this.rule.rolledDoubleSix){
        console.log("Stay on current player because of prior double six")
        this.rule.rolledDoubleSix = false
      }else {
        this.currentPlayer = this.rule.getNextPlayer()
      }
    }else {
      console.log("Evaluate Game is true after first play. Stay on player: " + this.currentPlayer.playerName)
      for (let path of this.paths) {
        console.log(this.interpreteActivePath(path))
      }
    }
  }

  evaluateDiceRollCompletion(diceRollValue: number): void {
    if (diceRollValue === 12){
      console.log("doublesix roll set: " + diceRollValue)
      this.rule.rolledDoubleSix = true
    }
    this.paths = this.rule.evaluateDiceRollCompletion()
    if (this.paths.length === 0) {
      this.currentPlayer = this.rule.getNextPlayer()
    }else {
      console.log("Evaluate Game is true. Stay on player: " + this.currentPlayer.playerName)
      for (let path of this.paths) {
        console.log(this.interpreteActivePath(path))
      }
    }
  }

  update(time: number): void {}

  singleDieIsSelected(): any {
    return (this.registry.get('die1-selected') && !this.registry.get('die2-selected')) || 
           (!this.registry.get('die1-selected') && this.registry.get('die2-selected'))
  }

  bothDiceSelected(): any {
    return (this.registry.get('die1-selected') && this.registry.get('die2-selected'))
  }

  getSelectedSingleDieId(): Array<string> {
    let ids = []
    if (this.registry.get('die1-selected')) {
      ids.push('die1')
    }else {
      ids.push('die2')
    }
    return ids
  }

  getSelectedBothDiceIds(): Array<string> {
    return ["die1", "die2"]
  }

  getSelectedDieValue(dieIds: Array<string>): number {
    let value = 0
    dieIds.forEach((id)=> {
      value += this.registry.get(id)
    })
    return value
  }


  interpreteActivePath(path: ActivePath): string {
    return "Play " + path.moveBy + " on " + path.activePiece.pieceId + " with state: " + path.activePiece.showPieceState()
  }

  isVadidPath(path: ActivePath) {
    for (let p of this.paths){
      if (this.interpreteActivePath(p) == this.interpreteActivePath(path)){
        return true
      }
    }
    return false
  }

  playDiceValue(dieValue: number, diceIds: Array<string>): void {
    let piecePath  = this.currentPlayer.selectedPiece.generatePath(dieValue)
    if (this.isVadidPath(piecePath)){
      console.log(this.interpreteActivePath(piecePath) + " is valid!")
      diceIds.forEach(id => {
        this.scene.get('SideScene').events.emit('resetSingleDie', id)
      });
      let isMoved = this.currentPlayer.moveSelectedPiece(dieValue)
    }else{
      console.log(this.interpreteActivePath(piecePath) + " is NOT valid!")
    }   
  }
 
  
};
