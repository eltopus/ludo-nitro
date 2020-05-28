import "phaser";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { GameScene } from "./gameScene";
import {SideScene} from "./sideScene"

const config: Phaser.Types.Core.GameConfig = {
  title: "LudoNitro",
  scale: {
     parent: "game",
     width: 1027,
     height: 722,
     //mode: Phaser.Scale.FIT,
     //autoCenter: Phaser.Scale.CENTER_BOTH
  },
 
  type: Phaser.AUTO,
  
  dom: {
    createContainer: true
  },
  scene: [GameScene, SideScene],
  plugins: {
    scene: [{
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI'
    }]
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  backgroundColor: "#18216D",
};

export class LudoNitro extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
window.onload = () => {
  var game = new LudoNitro(config);
};