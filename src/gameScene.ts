import "phaser";
import {PieceFactory} from './pieceFactory'
import {UserPlayerFactory} from './userPlayerFactory'
import {AIPlayerFactory} from './aiPlayerFactory'
import {Player} from './player'
import {Rule} from './rule'
import {Draggable} from './draggable'
import {TextBox} from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import {ActivePath} from "./activePath"
import {Ludo} from './persistence/ludo'
import {PPlayer} from './persistence/ludo'
import {PPiece} from './persistence/ludo'
import {PDie} from './persistence/ludo'
import {LoadJson} from './loadJson'

export class GameScene extends Phaser.Scene {
  info: Phaser.GameObjects.Text;
  currentPlayer: Player = null
  rule: Rule;
  paths: Array<ActivePath> = null
  sendOnce = true
  ludo: LoadJson

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
    this.load.image('save', '/assets/save.png')
    this.load.image('flick', '/assets/flick.png')
    this.load.json('data', '/assets/ludo.json')
    
  }

  create(): void {
    let loadGame = true
    let loadAi = false
    let aiMode = false
    let playerMode = 2

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
     let play = this.add.sprite(868, 600, 'play')
    play.setInteractive()

    let flick = this.add.sprite(950, 50, 'flick')
    flick.setInteractive()

    let save = this.add.sprite(800, 50, 'save')
    save.setInteractive()

    

    if (!loadGame){
      let pieceFactory = new PieceFactory(this, null)
      let redPieces = pieceFactory.createRedPieces()
      let bluePieces = pieceFactory.createBluePieces()
      let yellowPieces = pieceFactory.createYellowPieces()
      let greenPieces = pieceFactory.createGreenPieces()

      if (playerMode=== 2){
        let rdname = ["RedBlue"]
        let bname = ["GreenYellow"]
        let p1 = null , p2 = null
        if (aiMode){
          let uf1 = new AIPlayerFactory(this, rdname)
          p1 = uf1.createPlayers();
          let uf2 = new AIPlayerFactory(this, bname)
          p2 = uf2.createPlayers();
        
        }else {
          let uf1 = new UserPlayerFactory(this, rdname)
          p1 = uf1.createPlayers();
          let uf2 = new UserPlayerFactory(this, bname)
          p2 = uf2.createPlayers();
        }
        p1[0].addPieces(redPieces)
        p1[0].addPieces(bluePieces)
        p2[0].addPieces(yellowPieces)
        p2[0].addPieces(greenPieces)
        p1[0].setPieceDraggable()
        p2[0].setPieceDraggable()
        this.rule.addPlayers(p1)
        this.rule.addPlayers(p2)
      }else {
        let rdname = ["RedPlayer"]
        let bname = ["BluePlayer"]
        let yname = ["YellowPlayer"]
        let gname = ["GreenPlayer"]
        let p1 = null, p2 = null, p3 = null, p4 = null
        if (aiMode){
          let uf1 = new AIPlayerFactory(this, rdname)
          p1 = uf1.createPlayers();
          let uf2 = new AIPlayerFactory(this, bname)
          p2 = uf2.createPlayers();
          let uf3 = new AIPlayerFactory(this, yname)
          p3 = uf3.createPlayers();
          let uf4 = new AIPlayerFactory(this, gname)
          p4 = uf4.createPlayers();

        }else {
          let uf1 = new UserPlayerFactory(this, rdname)
          p1 = uf1.createPlayers();
          let uf2 = new UserPlayerFactory(this, bname)
          p2 = uf2.createPlayers();
          let uf3 = new UserPlayerFactory(this, yname)
          p3 = uf3.createPlayers();
          let uf4 = new UserPlayerFactory(this, gname)
          p4 = uf4.createPlayers();
        }
        
        p1[0].addPieces(redPieces)
        p2[0].addPieces(bluePieces)
        p3[0].addPieces(yellowPieces)
        p4[0].addPieces(greenPieces)

        p1[0].setPieceDraggable()
        p2[0].setPieceDraggable()
        p3[0].setPieceDraggable()
        p4[0].setPieceDraggable()
      
        this.rule.addPlayers(p1)
        this.rule.addPlayers(p2)
        this.rule.addPlayers(p3)
        this.rule.addPlayers(p4)
      }

      
      this.currentPlayer = this.rule.getNextPlayer()
      this.registry.set('currentPlayer', this.currentPlayer.playerName)
      this.currentPlayer.playerRollDice()
    }else {
      let ludoGame = new LoadJson(this)
      this.ludo = ludoGame
      let players = ludoGame.loadGame(loadAi)
      this.rule.addPlayers(players)
      for (let die of ludoGame.data.dice) {
        if (die.dieId === "die1"){
          this.registry.set('die1', die.dieValue)
        }
        if (die.dieId === "die2"){
          this.registry.set('die2', die.dieValue)
        }
       
      }
      for (let player of this.rule.players){
        player.setPieceDraggable()
      }
      this.currentPlayer = this.rule.getNextPlayer()
      this.registry.set('currentPlayer', this.currentPlayer.playerName)
      this.paths = this.rule.evaluateDiceRollCompletion()
      for (let path of this.paths) {
        console.log(path.pathToString())
      }
      this.currentPlayer.playerRollDice()
    }
    
    flick.on('pointerdown', (pointer) => {
    })

    save.on('pointerdown', (pointer) => {
      let ludo = new Ludo()
      let pplayers = new Array<PPlayer>()
      for (let player of this.rule.players){
        console.log(player)
        let pplayer = new PPlayer()
        pplayer.playerName = player.playerName
        for (let piece of player.pieces){
          let ppiece = new PPiece()
          ppiece.pieceId = piece.pieceId
          ppiece.index = piece.index
          ppiece.x = piece.x
          ppiece.y = piece.y
          ppiece.pieceState = piece.showPieceState()
          ppiece.pieceType = piece.showPieceType()
          pplayer.pieces.push(ppiece)
        }
        for (let piece of player.exitedPieces){
          let ppiece = new PPiece()
          ppiece.pieceId = piece.pieceId
          ppiece.index = piece.index
          ppiece.x = piece.x
          ppiece.y = piece.y
          ppiece.pieceState = piece.showPieceState()
          ppiece.pieceType = piece.showPieceType()
          pplayer.pieces.push(ppiece)
        }
        pplayers.push(pplayer)
      }

      let currentPlayer = pplayers.reverse().pop()
      for (let p of pplayers){
        ludo.players.push(p)
      }
      ludo.players.unshift(currentPlayer)

      let pdie1 = new PDie()
      pdie1.dieId = 'die1'
      pdie1.dieValue = this.registry.get('die1')
      pdie1.selected = this.registry.get('die1-selected')
      ludo.dice.push(pdie1)
      let pdie2 = new PDie()
      pdie2.dieId = 'die2'
      pdie2.dieValue = this.registry.get('die2')
      pdie2.selected = this.registry.get('die2-selected')
      ludo.dice.push(pdie2) 
      console.log(JSON.stringify(ludo, null, 2))
    })

    play.on('pointerdown', (pointer) => {
      if (this.currentPlayer.hasSelectedPiece()) {
        if (this.paths.length > 0){
          if (this.singleDieIsSelected()){
            //console.log("Single Die selected....")
            let selectedDieId = this.getSelectedSingleDieId()
            let dieValue = this.getSelectedDieValue(selectedDieId)
            this.playDiceValue(dieValue, selectedDieId)

          }else if (this.bothDiceSelected()) {
            //console.log("Both Dice selected....")
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
    for (let player of this.rule.players){
      for (let piece of player.pieces){
        //console.log("pieceId: " + piece.pieceId + " pieceIndex: " + piece.index + " state: " + piece.showPieceState())
      }
    }
    let opposingPieces = this.rule.getAllPiecesAtIndex(pieceIndex)
    for (let oppossingPiece of opposingPieces){
      console.log("Opposing index: " + oppossingPiece.pieceId)
      this.rule.handlePeckingSituation(pieceId, oppossingPiece)
      break
    }

    // check if player wins
    if (this.currentPlayer.hasNoPiecesLeft()){
      alert(this.currentPlayer.playerName + " wins!!!")
    }
    
    this.paths = this.rule.evaluatePieceMovementCompletion()
    if (this.paths.length === 0) {
      if (this.rule.rolledDoubleSix){
        //console.log("Stay on current player because of prior double six")
        //this.rule.rolledDoubleSix = false
        //this.currentPlayer.playerPlayDice(this.paths)
      }else {
        this.currentPlayer = this.rule.getNextPlayer()
        this.currentPlayer.playerRollDice()
      }
    }else {
      console.log("Evaluate Game is true after first play. Stay on player: " + this.currentPlayer.playerName)
      for (let path of this.paths) {
        console.log(path.pathToString())
      }
      this.currentPlayer.playerPlayDice(this.paths)
    }
  }

  evaluateDiceRollCompletion(diceRollValue: number): void {
    if (diceRollValue === 12){
      //console.log("doublesix roll set: " + diceRollValue)
      //this.rule.rolledDoubleSix = true
    }
    this.paths = this.rule.evaluateDiceRollCompletion()
    if (this.paths.length === 0) {
      this.currentPlayer = this.rule.getNextPlayer()
      this.currentPlayer.playerRollDice()
    }else {
      console.log("Evaluate Game is true. Stay on player: " + this.currentPlayer.playerName)
      for (let path of this.paths) {
        console.log(path.pathToString())
      }
      this.currentPlayer.playerPlayDice(this.paths)
    }
  }

  update(time: number): void {
    
  }

  singleDieIsSelected(): boolean {
    return (this.registry.get('die1-selected') && !this.registry.get('die2-selected')) || 
           (!this.registry.get('die1-selected') && this.registry.get('die2-selected'))
  }

  bothDiceSelected(): boolean {
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

  isVadidPath(activePath: ActivePath) {
    for (let path of this.paths){
      if (path.pathToString() === activePath.pathToString()){
        return true
      }
    }
    return false
  }

  playDiceValue(dieValue: number, diceIds: Array<string>): void {
    let piecePath  = this.currentPlayer.selectedPiece.generatePath(dieValue)
    if (this.isVadidPath(piecePath)){
      console.log(piecePath.pathToString() + " is valid!")
      diceIds.forEach(id => {
        this.scene.get('SideScene').events.emit('resetSingleDie', id)
      });
      let isMoved = this.currentPlayer.moveSelectedPiece(dieValue)
      if (isMoved){

      }
    }else{
      console.log(piecePath.pathToString() + " is NOT valid!")
    }   
  }

};
