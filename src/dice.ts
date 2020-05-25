import {Die} from './die'
export class Dice {
    dice: Array<Die>
    scene: Phaser.Scene
    diceRolledCount: number

    constructor(scene: Phaser.Scene) {
        this.dice = new Array<Die>()
        this.diceRolledCount = 0
        this.scene = scene
        this.scene.events.on('dieRolledCompleted', () => {
            ++this.diceRolledCount
            if (this.diceRolledCount > 1) {
                 let gameScene = this.scene.scene.get('GameScene')
                 gameScene.scene.scene.events.emit('dieRolledCompleted', this.diceRolledCount)
                 this.diceRolledCount = 0
            }
           
        })
        this.scene.events.on('resetBothDice', () => {
            for (let die of this.dice){
                die.resetDieFrame()
                die.resetDieFrame()
            }
           
        })

        this.scene.events.on('resetSingleDie', (dieId: string) => {
            for (let die of this.dice){
                if (die.dieId = dieId){
                    die.resetDieFrame()
                }
                
            }
           
        })
    }

    addDice(die: Die): void {
        this.dice.push(die)
    }

    rollDice(): void {
        for (let die of this.dice) {
            die.roll()
        }
    }


    getFrame(index: number): number {
        return this.dice[index].dieFrame
    }

    getFrameValue(index: number): number {
        switch(index) {
            case 0:
                return 4
            case 1:
                return 5
            case 2:
                return 6
            case 3:
                return 2
            case 4:
                return 3
            case 5:
                return 1
            default:
                return 0;
        }
    }
}