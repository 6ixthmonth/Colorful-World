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
        create: create,
        update: update
    }
};

const LEFT = 0;
const RIGHT = 1;
const GAME_COMPONENT = {}

function create() {
    this.add.circle(400, 300, 150, 0xffffff, 0.0).setStrokeStyle(5, 0x000000).setDepth(0);

    let radius = 50;
    let sinY = Math.sin(Math.PI / 180 * 60) * radius * 3;

    let leftController = [];
    leftController.push(this.add.circle(400 + 150, 300 + 0, radius, 0xff0000).setStrokeStyle(5, 0x000000).setDepth(1));
    leftController.push(this.add.circle(400 -50, 300 + sinY, radius, 0x00ff00).setStrokeStyle(5, 0x000000).setDepth(5));
    leftController.push(this.add.circle(400 -50, 300 - sinY, radius, 0x0000ff).setStrokeStyle(5, 0x000000).setDepth(3));

    let rightController = [];
    rightController.push(this.add.circle(400 - 150, 300 + 0, radius, 0x00ffff).setStrokeStyle(5, 0x000000).setDepth(6));
    rightController.push(this.add.circle(400 + 50, 300 + sinY, radius, 0xff00ff).setStrokeStyle(5, 0x000000).setDepth(2));
    rightController.push(this.add.circle(400 + 50, 300 - sinY, radius, 0xffff00).setStrokeStyle(5, 0x000000).setDepth(4));

    GAME_COMPONENT["controllers"] = [leftController, rightController];
}

const ONE_DEG = Math.PI / 180 * 1;
const CENTER_POSITION = { x: 400, y: 300 }

function update() {
    Phaser.Actions.RotateAround([GAME_COMPONENT["controllers"][LEFT][0]], CENTER_POSITION, ONE_DEG * -0.2);
    Phaser.Actions.RotateAround([GAME_COMPONENT["controllers"][LEFT][1]], CENTER_POSITION, ONE_DEG * -0.5);
    Phaser.Actions.RotateAround([GAME_COMPONENT["controllers"][LEFT][2]], CENTER_POSITION, ONE_DEG * -1.1);
    Phaser.Actions.RotateAround([GAME_COMPONENT["controllers"][RIGHT][0]], CENTER_POSITION, ONE_DEG * 0.3);
    Phaser.Actions.RotateAround([GAME_COMPONENT["controllers"][RIGHT][1]], CENTER_POSITION, ONE_DEG * 0.7);
    Phaser.Actions.RotateAround([GAME_COMPONENT["controllers"][RIGHT][2]], CENTER_POSITION, ONE_DEG * 1.3);
}

let game = new Phaser.Game(GAME_CONFIG);