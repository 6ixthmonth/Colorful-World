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
const LINE_COLOR = 0x000000;

function preload() {
    
}

function create() {
    // createGrid(this); // for layout

    createTarget(this);
    createPaletteAndCursor(this);
    createLeftController(this);
    createRightController(this);
    createBackground(this);
    setCursor(this);

    createKeys(this);
}

function createGrid(sceneObj) {
    sceneObj.add.rectangle(GAME_WINDOW_WIDTH / 2 - 200, GAME_WINDOW_HEIGHT / 2 - 150, 400, 300, 0x808080); // upper left
    sceneObj.add.rectangle(GAME_WINDOW_WIDTH / 2 + 200, GAME_WINDOW_HEIGHT / 2 + 150, 400, 300, 0x808080); // lower right

    sceneObj.add.rectangle(GAME_WINDOW_WIDTH / 2 - 200 - 100, GAME_WINDOW_HEIGHT / 2 + 150 - 75, 200, 150, 0x404040); // lower left upper left
    sceneObj.add.rectangle(GAME_WINDOW_WIDTH / 2 - 200 + 100, GAME_WINDOW_HEIGHT / 2 + 150 + 75, 200, 150, 0x404040); // lower left lower right
    sceneObj.add.rectangle(GAME_WINDOW_WIDTH / 2 - 200 + 100 - 50, GAME_WINDOW_HEIGHT / 2 + 150 + 75 - 37.5, 100, 75, 0xc0c0c0); // lower left lower right upper left
    sceneObj.add.rectangle(GAME_WINDOW_WIDTH / 2 - 200 + 100 + 50, GAME_WINDOW_HEIGHT / 2 + 150 + 75 + 37.5, 100, 75, 0xc0c0c0); // lower left lower right lower right

    sceneObj.add.rectangle(GAME_WINDOW_WIDTH / 2 + 200 - 100, GAME_WINDOW_HEIGHT / 2 + 150 - 75, 200, 150, 0x404040); // lower right upper left
    sceneObj.add.rectangle(GAME_WINDOW_WIDTH / 2 + 200 + 100, GAME_WINDOW_HEIGHT / 2 + 150 + 75, 200, 150, 0x404040); // lower right lower right
    sceneObj.add.rectangle(GAME_WINDOW_WIDTH / 2 + 200 - 100 - 50, GAME_WINDOW_HEIGHT / 2 + 150 + 75 - 37.5, 100, 75, 0xc0c0c0); // lower right lower left upper left
    sceneObj.add.rectangle(GAME_WINDOW_WIDTH / 2 + 200 - 100 + 50, GAME_WINDOW_HEIGHT / 2 + 150 + 75 + 37.5, 100, 75, 0xc0c0c0); // lower right lower left lower right
}

function createTarget(sceneObj) {
    GAME_COMPONENT.target = []
    GAME_COMPONENT.target[0] = sceneObj.add.triangle(200, 450, 0, 25, 50, -25, 100, 25, 0x808080, 1.0).setStrokeStyle(1, LINE_COLOR);
    GAME_COMPONENT.target[1] = sceneObj.add.rectangle(200, 475, 50, 50, 0x808080, 1.0).setStrokeStyle(1, LINE_COLOR);
    GAME_COMPONENT.target[2] = sceneObj.add.rectangle(200, 475, 25, 25, 0x808080, 1.0).setStrokeStyle(1, LINE_COLOR);
    sceneObj.add.rectangle(200, 475, 25, 5, LINE_COLOR);
    sceneObj.add.rectangle(200, 475, 5, 25, LINE_COLOR);

    let target = JSON.parse(document.getElementById("target").value);
    for (let i = 0; i < target.length; i++) {
        let c = Phaser.Display.Color.GetColor(target[i][0], target[i][1], target[i][2]);
        GAME_COMPONENT.target[i].setFillStyle(c, 1);
    }
}

function createPaletteAndCursor(sceneObj) {
    GAME_COMPONENT.palette = []
    GAME_COMPONENT.cursor = []
    GAME_COMPONENT.palette[0] = sceneObj.add.triangle(400, 300, 0, 50, 100, -50, 200, 50, 0xffffff, 1.0).setStrokeStyle(2, LINE_COLOR);
    GAME_COMPONENT.cursor[0] = sceneObj.add.triangle(400, 300, 0, 50, 100, -50, 200, 50, 0xffffff, 1.0).setStrokeStyle(2, LINE_COLOR);
    GAME_COMPONENT.palette[1] = sceneObj.add.rectangle(400, 350, 100, 100, 0xffffff, 1.0).setStrokeStyle(2, LINE_COLOR);
    GAME_COMPONENT.cursor[1] = sceneObj.add.rectangle(400, 350, 100, 100, 0xffffff, 1.0).setStrokeStyle(2, LINE_COLOR);
    GAME_COMPONENT.palette[2] = sceneObj.add.rectangle(400, 350, 50, 50, 0xffffff, 1.0).setStrokeStyle(2, LINE_COLOR);
    GAME_COMPONENT.cursor[2] = sceneObj.add.rectangle(400, 350, 50, 50, 0xffffff, 1.0).setStrokeStyle(2, LINE_COLOR);
    sceneObj.add.rectangle(400, 350, 50, 10, LINE_COLOR);
    sceneObj.add.rectangle(400, 350, 10, 50, LINE_COLOR);

    GAME_COMPONENT.triangleCursor = {}
    GAME_COMPONENT.triangleCursor.left = sceneObj.add.triangle(200, 300, 0, 0, 0, 100, 100, 50, 0xffffff, 1.0);
    GAME_COMPONENT.triangleCursor.right = sceneObj.add.triangle(600, 300, 0, 50, 100, 0, 100, 100, 0xffffff, 1.0);
}

function createLeftController(sceneObj) {
    sceneObj.add.circle(-25, 300, 100, 0xffffff, 0.0).setStrokeStyle(5, LINE_COLOR);
    // start from right, locate clockwisely
    let circleRadius = 50;
    let signDistance = Math.sin(Math.PI / 180 * 60) * circleRadius * 2;
    GAME_COMPONENT.leftController = []
    GAME_COMPONENT.leftController[0] = sceneObj.add.circle(-25 + 100, 300 + 0, circleRadius, 0xff0000).setStrokeStyle(5, LINE_COLOR);
    // GAME_COMPONENT.leftController[1] = sceneObj.add.circle(-25 + 50, 300 + signDistance, circleRadius, 0x00ff00).setStrokeStyle(5, LINE_COLOR);
    GAME_COMPONENT.leftController[1] = sceneObj.add.circle(-25 -50, 300 + signDistance, circleRadius, 0x0000ff).setStrokeStyle(5, LINE_COLOR);
    // GAME_COMPONENT.leftController[3] = sceneObj.add.circle(-25 -100, 300 - 0, circleRadius, 0x00ffff).setStrokeStyle(5, LINE_COLOR);
    GAME_COMPONENT.leftController[2] = sceneObj.add.circle(-25 -50, 300 - signDistance, circleRadius, 0xff00ff).setStrokeStyle(5, LINE_COLOR);
    // GAME_COMPONENT.leftController[5] = sceneObj.add.circle(-25 + 50, 300 - signDistance, circleRadius, 0xffff00).setStrokeStyle(5, LINE_COLOR);

    let left = JSON.parse(document.getElementById("left").value);
    for (let i = 0; i < left.length; i++) {
        let c = Phaser.Display.Color.GetColor(left[i][0], left[i][1], left[i][2]);
        GAME_COMPONENT.leftController[i].setFillStyle(c, 1);
    }
}

function createRightController(sceneObj) {
    sceneObj.add.circle(825, 300, 100, 0xffffff, 0.0).setStrokeStyle(5, LINE_COLOR);
    // start from left, locate counter-clockwisely
    let circleRadius = 50;
    let signDistance = Math.sin(Math.PI / 180 * 60) * circleRadius * 2;
    GAME_COMPONENT.rightController = []
    GAME_COMPONENT.rightController[0] = sceneObj.add.circle(GAME_WINDOW_WIDTH + 25 - 100, 300 + 0, circleRadius, 0xff0000).setStrokeStyle(5, LINE_COLOR);
    // GAME_COMPONENT.rightController[1] = sceneObj.add.circle(GAME_WINDOW_WIDTH + 25 - 50, 300 + signDistance, circleRadius, 0x00ff00).setStrokeStyle(5, LINE_COLOR);
    GAME_COMPONENT.rightController[1] = sceneObj.add.circle(GAME_WINDOW_WIDTH + 25 + 50, 300 + signDistance, circleRadius, 0x0000ff).setStrokeStyle(5, LINE_COLOR);
    // GAME_COMPONENT.rightController[3] = sceneObj.add.circle(GAME_WINDOW_WIDTH + 25 + 100, 300 - 0, circleRadius, 0x00ffff).setStrokeStyle(5, LINE_COLOR);
    GAME_COMPONENT.rightController[2] = sceneObj.add.circle(GAME_WINDOW_WIDTH + 25 + 50, 300 - signDistance, circleRadius, 0xff00ff).setStrokeStyle(5, LINE_COLOR);
    // GAME_COMPONENT.rightController[5] = sceneObj.add.circle(GAME_WINDOW_WIDTH + 25 - 50, 300 - signDistance, circleRadius, 0xffff00).setStrokeStyle(5, LINE_COLOR);

    let right = JSON.parse(document.getElementById("right").value);
    for (let i = 0; i < GAME_COMPONENT.rightController.length; i++) {
        let c = Phaser.Display.Color.GetColor(right[i][0], right[i][1], right[i][2]);
        GAME_COMPONENT.rightController[i].setFillStyle(c, 1);
    }
}

function setCursor(sceneObj) {
    sceneObj.tweens.add({
        targets: GAME_COMPONENT.cursor[0],
        alpha: 0.0,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut"
    });

    sceneObj.tweens.add({
        targets: GAME_COMPONENT.cursor[1],
        alpha: 0.0,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut"
    });

    sceneObj.tweens.add({
        targets: GAME_COMPONENT.cursor[2],
        alpha: 0.0,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut"
    });

    sceneObj.tweens.add({
        targets: GAME_COMPONENT.triangleCursor.left,
        alpha: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut"
    });

    sceneObj.tweens.add({
        targets: GAME_COMPONENT.triangleCursor.right,
        alpha: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut"
    });

    GAME_COMPONENT.cursor[0].visible = true;
    GAME_COMPONENT.cursor[1].visible = false;
    GAME_COMPONENT.cursor[2].visible = false;

    for (let i = 0; i < GAME_COMPONENT.cursor.length; i++) {
        GAME_COMPONENT.cursor[i].setFillStyle(setColor(), 1);
    }
    
    GAME_COMPONENT.triangleCursor.left.setFillStyle(GAME_COMPONENT.leftController[0].fillColor, 1.0);
    GAME_COMPONENT.triangleCursor.right.setFillStyle(GAME_COMPONENT.rightController[0].fillColor, 1.0);
}

function createBackground(sceneObj) {
    
}

function createKeys(sceneObj) {
    // GAME_COMPONENT.keyUp = sceneObj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    // GAME_COMPONENT.keyDown = sceneObj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    // GAME_COMPONENT.keyLeft = sceneObj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    // GAME_COMPONENT.keyRight = sceneObj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    // GAME_COMPONENT.keySpace = sceneObj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    GAME_COMPONENT.cursors = sceneObj.input.keyboard.createCursorKeys();
}

const ONE_DEG = Math.PI / 180 * 1;
let isLeftRotating = isRightRotating = false;
let leftRotateDeg = rightRotateDeg = 0;
let left_idx = right_idx = cursor_idx = 0;

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
        GAME_COMPONENT.cursor[(((cursor_idx % 3) + 3) % 3)].setFillStyle(setColor(), 1);
        GAME_COMPONENT.cursor[(((cursor_idx % 3) + 3) % 3)].visible = true;
    } else if (this.input.keyboard.checkDown(GAME_COMPONENT.cursors.down, 1000)) {
        GAME_COMPONENT.cursor[(((cursor_idx % 3) + 3) % 3)].visible = false;
        cursor_idx++;
        GAME_COMPONENT.cursor[(((cursor_idx % 3) + 3) % 3)].setFillStyle(setColor(), 1);
        GAME_COMPONENT.cursor[(((cursor_idx % 3) + 3) % 3)].visible = true;
    }

    if (this.input.keyboard.checkDown(GAME_COMPONENT.cursors.space, 1000)) {
        GAME_COMPONENT.palette[(((cursor_idx % 3) + 3) % 3)].setFillStyle(setColor(), 1);
        // middleCheck();
        check();
    }

    if (isLeftRotating) {
        Phaser.Actions.RotateAround(GAME_COMPONENT.leftController, { x: -25, y: 300 }, ONE_DEG * -2);
        leftRotateDeg += 2;
        if (leftRotateDeg % 120 == 0) {
            left_idx++;
            GAME_COMPONENT.cursor[(((cursor_idx % 3) + 3) % 3)].setFillStyle(setColor(), 1);
            GAME_COMPONENT.triangleCursor.left.setFillStyle(GAME_COMPONENT.leftController[(left_idx % 3)].fillColor, 1.0);
            isLeftRotating = false;
        }
    }

    if (isRightRotating) {
        Phaser.Actions.RotateAround(GAME_COMPONENT.rightController, { x: 825, y: 300 }, ONE_DEG * 2);
        rightRotateDeg += 2;
        if (rightRotateDeg % 120 == 0) {
            right_idx++
            GAME_COMPONENT.cursor[(((cursor_idx % 3) + 3) % 3)].setFillStyle(setColor(), 1);
            GAME_COMPONENT.triangleCursor.right.setFillStyle(GAME_COMPONENT.rightController[(right_idx % 3)].fillColor, 1.0);
            isRightRotating = false;
        }
    }
}

function setColor() {
    let leftColor = GAME_COMPONENT.leftController[(left_idx % 3)].fillColor;
    let leftRgb = Phaser.Display.Color.IntegerToRGB(leftColor);

    let rightColor = GAME_COMPONENT.rightController[(right_idx % 3)].fillColor;
    let rightRgb = Phaser.Display.Color.IntegerToRGB(rightColor);

    let combinedColor = Phaser.Display.Color.GetColor((leftRgb.r + rightRgb.r) / 2, (leftRgb.g + rightRgb.g) / 2, (leftRgb.b + rightRgb.b) / 2);

    return combinedColor;
}

function middleCheck() {
    let targetColor = GAME_COMPONENT.target[(((cursor_idx % 3) + 3) % 3)].fillColor;
    let palleteColor = GAME_COMPONENT.palette[(((cursor_idx % 3) + 3) % 3)].fillColor;
    if (targetColor != palleteColor) {
        return false;
    }
    return true;
}

function check() {
    let flag = true;

    for (let i = 0; i < GAME_COMPONENT.palette.length; i++) {
        let targetColor = GAME_COMPONENT.target[i].fillColor;
        let palleteColor = GAME_COMPONENT.palette[i].fillColor;
        if (targetColor != palleteColor) {
            flag = false;
            break;
        }
    }

    if (flag)
        clear();
}

function clear() {
    alert("CLEAR!");
}

let game = new Phaser.Game(GAME_CONFIG);