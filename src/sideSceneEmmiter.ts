export class SideSceneEmitter {
    scene: Phaser.Scene
    constructor(scene: Phaser.Scene){
        this.scene = scene
    }

    emmitDiceRollCompleted(diceRolledCount: number): void {
        this.scene.scene.get('GameScene').events.emit('dieRolledCompleted', diceRolledCount)
    }

    emmitDieRollCompleted(dieId: string): void {
        this.scene.events.emit('dieRolledCompleted', dieId)
    }

    emmitDieSelection(dieId: string): void {
        this.scene.scene.get('GameScene').events.emit('dieSelection', dieId)
    }

    emmitDiceRoll(value1: number, value2: number): void {
        this.scene.events.emit('rollDice', value1, value2)
    }

}

