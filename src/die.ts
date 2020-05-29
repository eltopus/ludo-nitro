import {SideSceneEmitter} from './sideSceneEmmiter'
import {PDie} from './persistence/ludo'
export class Die extends Phaser.GameObjects.Sprite {
    frameIndex: number
    dieId: string
    rng = new Phaser.Math.RandomDataGenerator()
    dieFrame: number
    isSelected: boolean
    emitter: SideSceneEmitter

    constructor(scene: Phaser.Scene, x: number, y: number, frameIndex: number, texture: string){
        super(scene, x, y, texture, frameIndex);
        this.dieId = texture
        this.dieFrame = -1
        this.emitter = new SideSceneEmitter(scene)
     
        this.isSelected = false
        this.setInteractive();
        let config = {
            key: 'roll',
            frames: this.scene.anims.generateFrameNumbers(texture, { start: 0, end: 5 }),
            frameRate: 5,
            repeat: 0,
            repeatDelay: 0
        };
        
        this.scene.anims.create(config)
        this.scene.add.existing(this)        
        this.on('animationcomplete', this.animComplete, this);
        //this.tint = 0x808080;
        this.scene.registry.set(this.dieId, this.getFrameValue(-1))
        this.scene.registry.set(this.dieId + "-selected", false)
        this.on('pointerdown', (pointer) => {
            if (this.isSelected){
                this.scale = 1
                this.isSelected = false
                this.scene.registry.set(this.dieId + "-selected", false)
            }else {
                this.scale = 0.8
                this.isSelected = true
                this.scene.registry.set(this.dieId + "-selected", true)
            }
            
         });


    }

    animComplete(animation, frame): void {
        this.frame = this.texture.frames[this.dieFrame];
        this.setAngle(180)
        this.scene.registry.set(this.dieId, this.getFrameValue(this.dieFrame))
        this.emitter.emmitDieRollCompleted(this.dieId, this.getFrameValue(this.dieFrame))
    }

    roll(value: number): void {
        this.alpha = 1
        this.scale = 1
        this.setAngle(45)
        let setFrame = this.getFrameFromValue(value)
        if (setFrame >= 0){
            this.dieFrame = setFrame
        }else {
            this.dieFrame = Phaser.Math.Between(0, 5)
            
        }
        this.anims.play('roll', false)
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

    getFrameFromValue(value: number): number {
        switch(value) {
            case 4:
                return 0
            case 5:
                return 1
            case 6:
                return 2
            case 2:
                return 3
            case 3:
                return 4
            case 1:
                return 5
            default:
                return -1;
        }
    }


    resetDieFrame(): void {
        this.dieFrame = -1
        this.isSelected = false
        this.scene.registry.set(this.dieId, 0)
        this.scene.registry.set(this.dieId + "-selected", false)
    }

    hasValue(): boolean {
        return (this.getFrameValue(this.dieFrame) > 0 && this.getFrameValue(this.dieFrame) < 7)
    }

    select(): void {
        this.scale = 0.8
        this.isSelected = true
        this.scene.registry.set(this.dieId + "-selected", true)
    }

    updateDie(die: PDie): void {
        this.dieFrame = this.getFrameFromValue(die.dieValue)
        console.log(this.dieFrame)
        this.frame = this.texture.frames[this.dieFrame];
        this.isSelected = die.selected
        this.scene.registry.set(this.dieId, die.dieValue)
        this.scene.registry.set(this.dieId + "-selected", die.selected)
    }

}