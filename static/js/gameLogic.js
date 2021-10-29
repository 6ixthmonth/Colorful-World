const GAME_WINDOW_WIDTH = 800;
const GAME_WINDOW_HEIGHT = 600;

const GAME_CONFIG = {
    type: Phaser.AUTO,
    width: GAME_WINDOW_WIDTH,
    height: GAME_WINDOW_HEIGHT,
    title: "Colorful World - Make the World more Colorful",
    backgroundColor: "#808080",
    parent: "wrapper",
    autoCenter: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const GAME_COMPONENT = {};

function preload() {
    
}

function create() {
    createGrid(this); // for layout

    createTarget(this);
    createPalette(this);
    createCursor(this);
    createLeftController(this);
    createRightController(this);
    createBackground(this);

    createKey(this);

    console.log(GAME_COMPONENT);
}

function createGrid(sceneObj) {
    sceneObj.add.rectangle(400 - 200, 300 - 150, 400, 300, 0x404040); // upper left
    sceneObj.add.rectangle(400 + 200, 300 + 150, 400, 300, 0x404040); // lower right
    sceneObj.add.rectangle(400 - 200 - 100, 300 + 150 - 75, 200, 150, 0xc0c0c0); // lower left upper left
    sceneObj.add.rectangle(400 - 200 + 100, 300 + 150 + 75, 200, 150, 0xc0c0c0); // lower left lower right
    sceneObj.add.rectangle(400 - 200 - 100 - 50, 300 + 150 + 75 - 37.5, 100, 75, 0x404040); // lower left lower left upper left
    sceneObj.add.rectangle(400 - 200 - 100 + 50, 300 + 150 + 75 + 37.5, 100, 75, 0x404040); // lower left lower left lower right
}

function createTarget(sceneObj) {
    GAME_COMPONENT.target = []
    GAME_COMPONENT.target[0] = sceneObj.add.triangle(200, 450, 0, 25, 50, -25, 100, 25, 0x808080, 0.5).setStrokeStyle(1, 0x000000);
    GAME_COMPONENT.target[1] = sceneObj.add.rectangle(200, 475, 50, 50, 0x808080, 0.5).setStrokeStyle(1, 0x000000);
    GAME_COMPONENT.target[2] = sceneObj.add.rectangle(200, 475, 25, 25, 0x808080, 0.5).setStrokeStyle(1, 0x000000);
    sceneObj.add.rectangle(200, 475, 25, 5, 0x000000);
    sceneObj.add.rectangle(200, 475, 5, 25, 0x000000);

    let target = JSON.parse(document.getElementById("target").value);
    for (let i = 0; i < target.length; i++) {
        let c = Phaser.Display.Color.GetColor(target[i][0], target[i][1], target[i][2]);
        GAME_COMPONENT.target[i].setFillStyle(c, 1);
    }
}

function createPalette(sceneObj) {
    GAME_COMPONENT.palette = []
    GAME_COMPONENT.palette[0] = sceneObj.add.triangle(400, 300, 0, 50, 100, -50, 200, 50, 0xffffff, 1.0).setStrokeStyle(1, 0x000000);
    GAME_COMPONENT.palette[1] = sceneObj.add.rectangle(400, 350, 100, 100, 0xffffff, 1.0).setStrokeStyle(1, 0x000000);
    GAME_COMPONENT.palette[2] = sceneObj.add.rectangle(400, 350, 50, 50, 0xffffff, 1.0).setStrokeStyle(1, 0x000000);
    sceneObj.add.rectangle(400, 350, 50, 10, 0x000000);
    sceneObj.add.rectangle(400, 350, 10, 50, 0x000000);
}

function createCursor(sceneObj) {
    GAME_COMPONENT.cursor = []
    GAME_COMPONENT.cursor[0] = sceneObj.add.triangle(400, 300, 0, 50, 100, -50, 200, 50, 0xffff00, 0.5);
    GAME_COMPONENT.cursor[1] = sceneObj.add.rectangle(400, 350, 100, 100, 0xffff00, 0.5);
    GAME_COMPONENT.cursor[2] = sceneObj.add.rectangle(400, 350, 50, 50, 0xffff00, 0.5);

    sceneObj.tweens.add({
        targets: GAME_COMPONENT.cursor[0],
        alpha: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });

    sceneObj.tweens.add({
        targets: GAME_COMPONENT.cursor[1],
        alpha: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });

    sceneObj.tweens.add({
        targets: GAME_COMPONENT.cursor[2],
        alpha: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });

    GAME_COMPONENT.cursor[0].visible = true;
    GAME_COMPONENT.cursor[1].visible = false;
    GAME_COMPONENT.cursor[2].visible = false;
}

function createLeftController(sceneObj) {
    // sceneObj.add.circle(0, 300, 100, 0x000000);
    // start from right, locate clockwisely
    let circleRadius = 50;
    let signDistance = Math.sin(Math.PI / 180 * 60) * circleRadius * 2;
    GAME_COMPONENT.leftController = []
    GAME_COMPONENT.leftController[0] = sceneObj.add.circle(0 + 100, 300 + 0, circleRadius, 0xff0000).setStrokeStyle(10, 0x000000);
    GAME_COMPONENT.leftController[1] = sceneObj.add.circle(0 + 50, 300 + signDistance, circleRadius, 0x00ff00).setStrokeStyle(10, 0x000000);
    GAME_COMPONENT.leftController[2] = sceneObj.add.circle(0 -50, 300 + signDistance, circleRadius, 0x0000ff).setStrokeStyle(10, 0x000000);
    GAME_COMPONENT.leftController[3] = sceneObj.add.circle(0 -100, 300 - 0, circleRadius, 0x00ffff).setStrokeStyle(10, 0x000000);
    GAME_COMPONENT.leftController[4] = sceneObj.add.circle(0 -50, 300 - signDistance, circleRadius, 0xff00ff).setStrokeStyle(10, 0x000000);
    GAME_COMPONENT.leftController[5] = sceneObj.add.circle(0 + 50, 300 - signDistance, circleRadius, 0xffff00).setStrokeStyle(10, 0x000000);

    let left = JSON.parse(document.getElementById("left").value);
    for (let i = 0; i < left.length; i++) {
        let c = Phaser.Display.Color.GetColor(left[i][0], left[i][1], left[i][2]);
        GAME_COMPONENT.leftController[i].setFillStyle(c, 1);
    }
}

function createRightController(sceneObj) {
    // sceneObj.add.circle(800, 300, 100, 0x000000);
    // start from left, locate counter-clockwisely
    let circleRadius = 50;
    let signDistance = Math.sin(Math.PI / 180 * 60) * circleRadius * 2;
    GAME_COMPONENT.rightController = []
    GAME_COMPONENT.rightController[0] = sceneObj.add.circle(GAME_WINDOW_WIDTH - 100, 300 + 0, circleRadius, 0xff0000).setStrokeStyle(10, 0x000000);
    GAME_COMPONENT.rightController[1] = sceneObj.add.circle(GAME_WINDOW_WIDTH - 50, 300 + signDistance, circleRadius, 0x00ff00).setStrokeStyle(10, 0x000000);
    GAME_COMPONENT.rightController[2] = sceneObj.add.circle(GAME_WINDOW_WIDTH + 50, 300 + signDistance, circleRadius, 0x0000ff).setStrokeStyle(10, 0x000000);
    GAME_COMPONENT.rightController[3] = sceneObj.add.circle(GAME_WINDOW_WIDTH + 100, 300 - 0, circleRadius, 0x00ffff).setStrokeStyle(10, 0x000000);
    GAME_COMPONENT.rightController[4] = sceneObj.add.circle(GAME_WINDOW_WIDTH + 50, 300 - signDistance, circleRadius, 0xff00ff).setStrokeStyle(10, 0x000000);
    GAME_COMPONENT.rightController[5] = sceneObj.add.circle(GAME_WINDOW_WIDTH - 50, 300 - signDistance, circleRadius, 0xffff00).setStrokeStyle(10, 0x000000);

    let right = JSON.parse(document.getElementById("right").value);
    for (let i = 0; i < GAME_COMPONENT.rightController.length; i++) {
        let c = Phaser.Display.Color.GetColor(right[i][0], right[i][1], right[i][2]);
        GAME_COMPONENT.rightController[i].setFillStyle(c, 1);
    }
}

function createBackground(sceneObj) {
    
}

function createKey(sceneObj) {
    // GAME_COMPONENT.keyUp = sceneObj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    // GAME_COMPONENT.keyDown = sceneObj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    // GAME_COMPONENT.keyLeft = sceneObj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    // GAME_COMPONENT.keyRight = sceneObj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    // GAME_COMPONENT.keySpace = sceneObj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    GAME_COMPONENT.cursors = sceneObj.input.keyboard.createCursorKeys();
}

let isLeftRotating = false;
let leftRotateDeg = 0;
let isRightRotating = false;
let rightRotateDeg = 0;
const ONE_DEG = Math.PI / 180 * 1;

let left_idx = 0;
let right_idx = 0;
let cursor_idx = 0;

function update() {
    // if (GAME_COMPONENT.keyUp.isDown) {
    //     console.log("UP");
    // }
    // if (GAME_COMPONENT.keyDown.isDown) {
    //     console.log("DOWN");
    // }
    // if (GAME_COMPONENT.keyLeft.isDown) {
    //     console.log("LEFT");
    // }
    // if (GAME_COMPONENT.keyRight.isDown) {
    //     console.log("RIGHT");
    // }
    // if (GAME_COMPONENT.keySpace.isDown) {
    //     console.log("SPACE");
    // }

    if (this.input.keyboard.checkDown(GAME_COMPONENT.cursors.left, 1000)) {
        isLeftRotating = true;
    } else if (this.input.keyboard.checkDown(GAME_COMPONENT.cursors.right, 1000)) {
        isRightRotating = true;
    }

    if (this.input.keyboard.checkDown(GAME_COMPONENT.cursors.up, 1000)) {
        GAME_COMPONENT.cursor[(((cursor_idx % 3) + 3) % 3)].visible = false;
        cursor_idx--;
        GAME_COMPONENT.cursor[(((cursor_idx % 3) + 3) % 3)].visible = true;
    } else if (this.input.keyboard.checkDown(GAME_COMPONENT.cursors.down, 1000)) {
        GAME_COMPONENT.cursor[(((cursor_idx % 3) + 3) % 3)].visible = false;
        cursor_idx++;
        GAME_COMPONENT.cursor[(((cursor_idx % 3) + 3) % 3)].visible = true;
    }

    if (this.input.keyboard.checkDown(GAME_COMPONENT.cursors.space, 1000)) {
        console.log("SPACE");
    }

    if (isLeftRotating) {
        Phaser.Actions.RotateAround(GAME_COMPONENT.leftController, { x: 0, y: 300 }, ONE_DEG * -1);
        leftRotateDeg++;
        if (leftRotateDeg % 60 == 0) {
            left_idx++;
            console.log("left_idx: " + (left_idx % 6));
            isLeftRotating = false;
        }
    }

    if (isRightRotating) {
        Phaser.Actions.RotateAround(GAME_COMPONENT.rightController, { x: 800, y: 300 }, ONE_DEG * 1);
        rightRotateDeg++;
        if (rightRotateDeg % 60 == 0) {
            right_idx++
            console.log("right_idx: " + (right_idx % 6));
            isRightRotating = false;
        }
    }
}

let game = new Phaser.Game(GAME_CONFIG);