export class Die extends Phaser.GameObjects.Sprite {
    frameIndex: number
    dieId: string
    rng = new Phaser.Math.RandomDataGenerator()
    dieFrame: number
    isSelected: boolean

    constructor(scene: Phaser.Scene, x: number, y: number, frameIndex: number, texture: string){
        super(scene, x, y, texture, frameIndex);
        this.dieId = texture
        this.dieFrame = -1
     
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
        this.scene.events.emit('dieRolledCompleted', this.dieId)
    }

    roll(): void {
        this.alpha = 1
        this.scale = 1
        this.setAngle(45)
        this.dieFrame = Phaser.Math.Between(0, 5)
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

    resetDieFrame(): void {
        this.dieFrame = -1
        this.isSelected = false
        this.scene.registry.set(this.dieId, 0)
    }

    hasValue(): boolean {
        return (this.getFrameValue(this.dieFrame) > 0 && this.getFrameValue(this.dieFrame) < 7)
    }

}