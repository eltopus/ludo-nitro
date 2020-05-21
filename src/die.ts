export class Die extends Phaser.GameObjects.Sprite {
    frameIndex: number
    dieId: string
    rng = new Phaser.Math.RandomDataGenerator()
    dieFrame: number

    constructor(scene: Phaser.Scene, x: number, y: number, frameIndex: number, texture: string){
        super(scene, x, y, texture, frameIndex);
        this.dieId = texture
        this.frameIndex = frameIndex
        this.setInteractive();
        let config = {
            key: 'roll',
            frames: this.scene.anims.generateFrameNumbers('dice', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: 0,
            repeatDelay: 0
        };
        
        this.scene.anims.create(config)
        this.scene.add.existing(this)

        this.scene.registry.events.emit('BLUR')
        
        this.on('animationcomplete', this.animComplete, this);


        // this.on('pointerdown', (pointer) => {
        //     this.scene.events.emit('dieSelected', this.dieId)
        //     this.setAngle(45)
        //     //this.tint = 0x808080;
        //     this.dieFrame = Phaser.Math.Between(0, 5)
        //     this.anims.play('roll', false)


        //  });

    }

    animComplete(animation, frame): void {
        this.frame = this.texture.frames[this.dieFrame];
        this.setAngle(180)
    }

    roll(): void {
        this.scene.events.emit('dieSelected', this.dieId)
        this.setAngle(45)
        this.dieFrame = Phaser.Math.Between(0, 5)
        this.anims.play('roll', false)
    }

}