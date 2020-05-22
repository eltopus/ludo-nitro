import "phaser";
import {Die} from './die'
import {Dice} from './dice'

export class SideScene extends Phaser.Scene {
  die1Score: Phaser.GameObjects.Text;
  die2Score: Phaser.GameObjects.Text;
  displayPlayerName: Phaser.GameObjects.Text;
  dice: Dice

  constructor() {
    super({
      key: "SideScene", active: true
    });
  }

  init(/*params: any*/): void {
    
  }

  preload(): void {
    this.load.spritesheet('die1', "assets/dice.png", { frameWidth: 69, frameHeight: 69, endFrame: 5 })
    this.load.spritesheet('die2', "assets/dice.png", { frameWidth: 69, frameHeight: 69, endFrame: 5 })
    this.load.image('rollDice', '/assets/rollDice.png')
  }

  create(): void {
    
    let graphics = this.add.graphics()
    graphics.lineStyle(4, 0xffffff, 1);
    graphics.strokeRoundedRect(723, 1, 300, 721, 32);
    graphics.strokeRoundedRect(723, 300, 300, 120, 32);
    let rollDice = this.add.sprite(868, 500, 'rollDice')
    rollDice.setScale(0.2, 0.2)
    rollDice.setInteractive()
    let die1 = new Die(this, 820, 360, -1, 'die1')
    let die2 = new Die(this, 920, 360, -1, 'die2')
    
    this.dice = new Dice(this)
    this.dice.addDice(die1)
    this.dice.addDice(die2)

     

     rollDice.on('pointerdown', (pointer) => {
        this.dice.rollDice()
     });

     this.die1Score = this.add.text(780, 200, "dieOne: 0")
     this.die2Score = this.add.text(880, 200, "dieTwo: 0")

     this.displayPlayerName = this.add.text(750, 150, "CurrentPlayer: " + this.registry.get('currentPlayer'))
     this.registry.events.on('changedata', this.updateScore,  this)
  }

  updateScore(parent, key, data): void {
  
    if (key === 'die1'){
      this.die1Score.setText("dieOne: " + data)
    }
    if (key === 'die2'){
      this.die2Score.setText("dieTwo: " + data)
    }
    if (key === 'die1-selected'){
      console.log("die1 selected: " + data)
    }
    if (key === 'die2-selected'){
      console.log("die2 selected: " + data)
    }
    if (key === 'currentPlayer'){
      this.displayPlayerName.setText("CurrentPlayer: " + data)
    }

  }

  update(time: number): void {
    for (let die of this.dice.dice){
      if (die.hasValue()){
        die.alpha = 1
      }else {
        die.alpha = 0.5
      }
    }
  }

};
