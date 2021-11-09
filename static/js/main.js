const GAME_WINDOW_WIDTH = 800;
const GAME_WINDOW_HEIGHT = 600;

const GAME_CONFIG = {
    type: Phaser.AUTO,
    width: GAME_WINDOW_WIDTH,
    height: GAME_WINDOW_HEIGHT,
    title: "Colorful World - Make the World more Colorful",
    backgroundColor: "#6c757d",
    parent: "wrapper",
    autoCenter: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

function preload() {
    
}

const GAME_COMPONENT = {}

function create() {
    this.add.circle(400, 300, 150, 0xffffff, 0.0).setStrokeStyle(5, 0x000000).setDepth(0);

    let circleRadius = 50;
    let signDistance = Math.sin(Math.PI / 180 * 60) * circleRadius * 2 * 1.5;

    GAME_COMPONENT.leftController = []
    GAME_COMPONENT.leftController[0] = this.add.circle(400 + 150, 300 + 0, circleRadius, 0xff0000).setStrokeStyle(5, 0x000000).setDepth(1);
    GAME_COMPONENT.leftController[1] = this.add.circle(400 -50, 300 + signDistance, circleRadius, 0x00ff00).setStrokeStyle(5, 0x000000).setDepth(5);
    GAME_COMPONENT.leftController[2] = this.add.circle(400 -50, 300 - signDistance, circleRadius, 0x0000ff).setStrokeStyle(5, 0x000000).setDepth(3);

    GAME_COMPONENT.rightController = []
    GAME_COMPONENT.rightController[0] = this.add.circle(400 - 150, 300 + 0, circleRadius, 0x00ffff).setStrokeStyle(5, 0x000000).setDepth(6);
    GAME_COMPONENT.rightController[1] = this.add.circle(400 + 50, 300 + signDistance, circleRadius, 0xff00ff).setStrokeStyle(5, 0x000000).setDepth(2);
    GAME_COMPONENT.rightController[2] = this.add.circle(400 + 50, 300 - signDistance, circleRadius, 0xffff00).setStrokeStyle(5, 0x000000).setDepth(4);
}

const ONE_DEG = Math.PI / 180 * 1;
const CENTER_POSITION = { x: 400, y: 300 }

function update() {
    // Phaser.Actions.RotateAround(GAME_COMPONENT.leftController, CENTER_POSITION, ONE_DEG * -0.5);
    // Phaser.Actions.RotateAround(GAME_COMPONENT.rightController, CENTER_POSITION, ONE_DEG * 1);
    Phaser.Actions.RotateAround([GAME_COMPONENT.leftController[0]], CENTER_POSITION, ONE_DEG * -0.2);
    Phaser.Actions.RotateAround([GAME_COMPONENT.leftController[1]], CENTER_POSITION, ONE_DEG * -0.5);
    Phaser.Actions.RotateAround([GAME_COMPONENT.leftController[2]], CENTER_POSITION, ONE_DEG * -1.1);
    Phaser.Actions.RotateAround([GAME_COMPONENT.rightController[0]], CENTER_POSITION, ONE_DEG * 0.3);
    Phaser.Actions.RotateAround([GAME_COMPONENT.rightController[1]], CENTER_POSITION, ONE_DEG * 0.7);
    Phaser.Actions.RotateAround([GAME_COMPONENT.rightController[2]], CENTER_POSITION, ONE_DEG * 1.3);
}

let game = new Phaser.Game(GAME_CONFIG);