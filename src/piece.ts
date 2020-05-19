import {PieceState} from './pieceState'
export class Piece extends Phaser.GameObjects.Sprite {
   index: number;
   homeIndex: number;
   pieceState: any
   pieceType: any
   
  
    constructor(scene: Phaser.Scene, x: number, y: number, index: number, homeIndex: number, pieceType: any, texture: string){
        super(scene, x, y, texture);
        this.index = index;
        this.homeIndex = homeIndex;
        this.scene.add.existing(this);
        this.pieceState = PieceState.Inactive
        this.pieceType = pieceType
    }

    becomeActive(): void {
        this.pieceState = PieceState.Active
    }

    becomeInActive(): void {
        this.pieceState = PieceState.Inactive
    }

    beOnHomePath(): void {
        this.pieceState = PieceState.OnHomePath
    }

    becomeExited(): void {
        this.pieceState = PieceState.Exited
    }

}