import "phaser";
import MoveToPlugin from 'phaser3-rex-plugins/plugins/moveto-plugin.js';
import PathFollowerPlugin from 'phaser3-rex-plugins/plugins/pathfollower-plugin.js';
import { GameScene } from "./gameScene";

const config: Phaser.Types.Core.GameConfig = {
  title: "LudoNitro",
  width: 1200,
  height: 800,
  type: Phaser.AUTO,
  parent: "game",
  scene: [GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  plugins: {
    global: [{
        key: 'rexMoveTo',
        plugin: MoveToPlugin,
        start: true
    },
    {
      key: 'rexPathFollower',
      plugin: PathFollowerPlugin,
      start: true
    }]
  },
  backgroundColor: "#18216D"
};

export class LudoNitro extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
window.onload = () => {
  var game = new LudoNitro(config);
};