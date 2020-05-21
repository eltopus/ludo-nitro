import "phaser";
import {Movement} from './movement'
import {Piece} from './piece'
import {Red} from './pieceState'
import {Blue} from './pieceState'
import {Green} from './pieceState'
import {Yellow} from './pieceState'
import {PieceFactory} from './pieceFactory'
import {Player} from './player'
import {Die} from './die'
import {Dice} from './dice'

export class SideScene extends Phaser.Scene {
  info: Phaser.GameObjects.Text;
  dice: Dice

  constructor() {
    super({
      key: "SideScene", active: true
    });
  }

  init(/*params: any*/): void {
    
  }

  preload(): void {
    this.load.spritesheet('dice', "assets/dice.png", { frameWidth: 69, frameHeight: 69, endFrame: 5 })
    this.load.image('play', '/assets/play.png')
    this.load.image('rollDice', '/assets/rollDice.png')
  }

  create(): void {
    
    let graphics = this.add.graphics()
    graphics.lineStyle(4, 0xffffff, 1);
    graphics.strokeRoundedRect(723, 1, 300, 721, 32);
    graphics.strokeRoundedRect(723, 300, 300, 120, 32);
    let play = this.add.sprite(800, 600, 'play')
    let rollDice = this.add.sprite(910, 600, 'rollDice')
    rollDice.setScale(0.2, 0.2)
    play.setInteractive()
    rollDice.setInteractive()
    let die1 = new Die(this, 820, 360, 0, 'dice')
    let die2 = new Die(this, 920, 360, 1, 'dice')
    
    this.dice = new Dice()
    this.dice.addDice(die1)
    this.dice.addDice(die2)

     play.on('pointerdown', (pointer) => {
        
     });

     rollDice.on('pointerdown', (pointer) => {
        this.dice.rollDice()
     });



  }

  
  update(time: number): void {}

};
