import {Die} from './die'
import {SideSceneEmitter} from './sideSceneEmmiter'
export class Dice {
    dice: Array<Die>
    scene: Phaser.Scene
    diceRolledCount: number
    emitter: SideSceneEmitter

    constructor(scene: Phaser.Scene) {
        this.dice = new Array<Die>()
        this.diceRolledCount = 0
        this.scene = scene
        this.emitter = new SideSceneEmitter(scene)
        this.scene.events.on('dieRolledCompleted', () => {
            ++this.diceRolledCount
            if (this.diceRolledCount > 1) {
                 this.emitter.emmitDiceRollCompleted(this.diceRolledCount)
                 this.diceRolledCount = 0
            }
           
        })
        this.scene.events.on('resetBothDice', () => {
            console.log("resetting both dice...")
            for (let die of this.dice){
                die.resetDieFrame()
                die.resetDieFrame()
            }
           
        })

        this.scene.events.on('resetSingleDie', (dieId: string) => {
            console.log("resetting single die: " + dieId)
            for (let die of this.dice){
                if (die.dieId === dieId){
                    die.resetDieFrame()
                    break
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