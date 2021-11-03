const GAME_WINDOW_WIDTH = 800;
const GAME_WINDOW_HEIGHT = 600;

const GAME_CONFIG = {
    type: Phaser.AUTO,
    width: GAME_WINDOW_WIDTH,
    height: GAME_WINDOW_HEIGHT,
    title: "Colorful World - Make the World more Colorful",
    backgroundColor: "#ffffff",
    parent: "wrapper",
    autoCenter: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const GAME_COMPONENT = {};
const BLACK = 0x000000;
const WHITE = 0xffffff;

function preload() {
    
}

function create() {
    // createGrid(this); // for layout

    createTarget(this);
    createPalette(this);
    createCursor(this);
    createIndicator(this);
    createController(this);
    createBackground(this);

    setTarget();
    setCursor(this);
    setIndicator(this);
    setController();

    createKeys(this);
}

function createGrid(sceneObj) {
    let halfWidth = GAME_WINDOW_WIDTH / 2;
    let halfHeight = GAME_WINDOW_HEIGHT / 2;

    sceneObj.add.rectangle(halfWidth - 200, halfHeight - 150, halfWidth, halfHeight, 0x808080); // upper left
    sceneObj.add.rectangle(halfWidth + 200, halfHeight + 150, halfWidth, halfHeight, 0x808080); // lower right

    sceneObj.add.rectangle(halfWidth - 200 - 100, halfHeight + 150 - 75, halfWidth / 2, halfHeight / 2, 0x404040); // lower left upper left
    sceneObj.add.rectangle(halfWidth - 200 + 100, halfHeight + 150 + 75, halfWidth / 2, halfHeight / 2, 0x404040); // lower left lower right
    sceneObj.add.rectangle(halfWidth - 200 + 100 - 50, halfHeight + 150 + 75 - 37.5, halfWidth / 4, halfHeight / 4, 0xc0c0c0); // lower left lower right upper left
    sceneObj.add.rectangle(halfWidth - 200 + 100 + 50, halfHeight + 150 + 75 + 37.5, halfWidth / 4, halfHeight / 4, 0xc0c0c0); // lower left lower right lower right

    sceneObj.add.rectangle(halfWidth + 200 - 100, halfHeight + 150 - 75, halfWidth / 2, halfHeight / 2, 0x404040); // lower right upper left
    sceneObj.add.rectangle(halfWidth + 200 + 100, halfHeight + 150 + 75, halfWidth / 2, halfHeight / 2, 0x404040); // lower right lower right
    sceneObj.add.rectangle(halfWidth + 200 - 100 - 50, halfHeight + 150 + 75 - 37.5, halfWidth / 4, halfHeight / 4, 0xc0c0c0); // lower right lower left upper left
    sceneObj.add.rectangle(halfWidth + 200 - 100 + 50, halfHeight + 150 + 75 + 37.5, halfWidth / 4, halfHeight / 4, 0xc0c0c0); // lower right lower left lower right
}

function createTarget(sceneObj) {
    GAME_COMPONENT.target = []

    GAME_COMPONENT.target[0] = sceneObj.add.triangle(200, 450, 0, 25, 50, -25, 100, 25, WHITE, 1.0).setStrokeStyle(1, BLACK);
    GAME_COMPONENT.target[1] = sceneObj.add.rectangle(200, 475, 50, 50, WHITE, 1.0).setStrokeStyle(1, BLACK);
    GAME_COMPONENT.target[2] = sceneObj.add.rectangle(200, 475, 25, 25, WHITE, 1.0).setStrokeStyle(1, BLACK);
    sceneObj.add.rectangle(200, 475, 25, 5, BLACK);
    sceneObj.add.rectangle(200, 475, 5, 25, BLACK);
}

function createPalette(sceneObj) {
    GAME_COMPONENT.palette = []

    GAME_COMPONENT.palette[0] = sceneObj.add.triangle(400, 300, 0, 50, 100, -50, 200, 50, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(1);
    GAME_COMPONENT.palette[1] = sceneObj.add.rectangle(400, 350, 100, 100, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(3);
    GAME_COMPONENT.palette[2] = sceneObj.add.rectangle(400, 350, 50, 50, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(5);
    sceneObj.add.rectangle(400, 350, 50, 10, BLACK).setDepth(7);
    sceneObj.add.rectangle(400, 350, 10, 50, BLACK).setDepth(7);
}

function createCursor(sceneObj) {
    GAME_COMPONENT.cursor = []
    
    GAME_COMPONENT.cursor[0] = sceneObj.add.triangle(400, 300, 0, 50, 100, -50, 200, 50, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(2);
    GAME_COMPONENT.cursor[1] = sceneObj.add.rectangle(400, 350, 100, 100, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(4);
    GAME_COMPONENT.cursor[2] = sceneObj.add.rectangle(400, 350, 50, 50, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(6);
}

function createIndicator(sceneObj) {
    GAME_COMPONENT.indicator = {}
    
    GAME_COMPONENT.indicator.left = sceneObj.add.triangle(200, 300, 0, 0, 0, 100, 100, 50, WHITE, 1.0);
    GAME_COMPONENT.indicator.right = sceneObj.add.triangle(600, 300, 0, 50, 100, 0, 100, 100, WHITE, 1.0);
}

function createController(sceneObj) {
    sceneObj.add.circle(-25, 300, 100, WHITE, 0.0).setStrokeStyle(5, BLACK);
    sceneObj.add.circle(825, 300, 100, WHITE, 0.0).setStrokeStyle(5, BLACK);

    let circleRadius = 50;
    let signDistance = Math.sin(Math.PI / 180 * 60) * circleRadius * 2;

    // start from right, locate clockwisely
    GAME_COMPONENT.leftController = []
    GAME_COMPONENT.leftController[0] = sceneObj.add.circle(-25 + 100, 300 + 0, circleRadius, 0xff0000).setStrokeStyle(5, BLACK);
    GAME_COMPONENT.leftController[1] = sceneObj.add.circle(-25 -50, 300 + signDistance, circleRadius, 0x00ff00).setStrokeStyle(5, BLACK);
    GAME_COMPONENT.leftController[2] = sceneObj.add.circle(-25 -50, 300 - signDistance, circleRadius, 0x0000ff).setStrokeStyle(5, BLACK);

    // start from left, locate counter-clockwisely
    GAME_COMPONENT.rightController = []
    GAME_COMPONENT.rightController[0] = sceneObj.add.circle(GAME_WINDOW_WIDTH + 25 - 100, 300 + 0, circleRadius, 0x00ffff).setStrokeStyle(5, BLACK);
    GAME_COMPONENT.rightController[1] = sceneObj.add.circle(GAME_WINDOW_WIDTH + 25 + 50, 300 + signDistance, circleRadius, 0xff00ff).setStrokeStyle(5, BLACK);
    GAME_COMPONENT.rightController[2] = sceneObj.add.circle(GAME_WINDOW_WIDTH + 25 + 50, 300 - signDistance, circleRadius, 0xffff00).setStrokeStyle(5, BLACK);
}

function setTarget() {
    let target = JSON.parse(document.getElementById("target").value);
    for (let i = 0; i < target.length; i++) {
        let targetColor = Phaser.Display.Color.GetColor(target[i][0], target[i][1], target[i][2]);
        GAME_COMPONENT.target[i].setFillStyle(targetColor, 1);
    }
}

function setCursor(sceneObj) {
    sceneObj.tweens.add({
        targets: GAME_COMPONENT.cursor,
        alpha: 0.0,
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
}

function setIndicator(sceneObj) {
    sceneObj.tweens.add({
        targets: GAME_COMPONENT.indicator.left,
        alpha: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut"
    });
    
    sceneObj.tweens.add({
        targets: GAME_COMPONENT.indicator.right,
        alpha: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut"
    });

    GAME_COMPONENT.indicator.left.setFillStyle(GAME_COMPONENT.leftController[0].fillColor, 1.0);
    GAME_COMPONENT.indicator.right.setFillStyle(GAME_COMPONENT.rightController[0].fillColor, 1.0);
}

function setController() {
    let left = JSON.parse(document.getElementById("left").value);
    for (let i = 0; i < left.length; i++) {
        let c = Phaser.Display.Color.GetColor(left[i][0], left[i][1], left[i][2]);
        GAME_COMPONENT.leftController[i].setFillStyle(c, 1);
    }

    let right = JSON.parse(document.getElementById("right").value);
    for (let i = 0; i < right.length; i++) {
        let c = Phaser.Display.Color.GetColor(right[i][0], right[i][1], right[i][2]);
        GAME_COMPONENT.rightController[i].setFillStyle(c, 1);
    }
}

function createBackground(sceneObj) {
    
}

function createKeys(sceneObj) {
    GAME_COMPONENT.cursors = sceneObj.input.keyboard.createCursorKeys();
}

const ONE_DEG = Math.PI / 180 * 1;
let isLeftRotating = isRightRotating = false;
let leftRotateDeg = rightRotateDeg = 0;
let left_idx = right_idx = cursor_idx = 0;

function update() {
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
            GAME_COMPONENT.indicator.left.setFillStyle(GAME_COMPONENT.leftController[(left_idx % 3)].fillColor, 1.0);
            isLeftRotating = false;
        }
    }

    if (isRightRotating) {
        Phaser.Actions.RotateAround(GAME_COMPONENT.rightController, { x: 825, y: 300 }, ONE_DEG * 2);
        rightRotateDeg += 2;
        if (rightRotateDeg % 120 == 0) {
            right_idx++
            GAME_COMPONENT.cursor[(((cursor_idx % 3) + 3) % 3)].setFillStyle(setColor(), 1);
            GAME_COMPONENT.indicator.right.setFillStyle(GAME_COMPONENT.rightController[(right_idx % 3)].fillColor, 1.0);
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
    $("#stageClearModal").modal("show");
}

function reset() {

}

let game = new Phaser.Game(GAME_CONFIG);