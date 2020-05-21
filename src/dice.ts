import {Die} from './die'
export class Dice {
    dice: Array<Die>

    constructor() {
        this.dice = new Array<Die>()
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