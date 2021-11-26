const GAME_WINDOW_WIDTH = 800;
const GAME_WINDOW_HEIGHT = 600;

const GAME_CONFIG = {
    type: Phaser.AUTO,
    width: GAME_WINDOW_WIDTH,
    height: GAME_WINDOW_HEIGHT,
    title: "Colorful World - Make the World more Colorful",
    backgroundColor: "#ffffff",
    parent: "wrapper",
    // autoCenter: true,
    scene: {
        create: create,
        update: update
    }
};

const BLACK = 0x000000;
const WHITE = 0xffffff;
const GAME_COMPONENT = {};

function create() {
    createBackground(this);
    createTargets(this);

    createObjectives(this);
    createControllers(this);
    createCursors(this);
    createIndicators(this);
    
    initObjectives();
    initControllers();
    initCursors(this);
    initIndicators(this);

    createKeys(this);
}

function createBackground(sceneObj) {
    sceneObj.add.circle(400, 0, 150, WHITE, 0.0).setStrokeStyle(5, BLACK);
    sceneObj.add.circle(-25, 300, 100, WHITE, 0.0).setStrokeStyle(5, BLACK);
    sceneObj.add.circle(825, 300, 100, WHITE, 0.0).setStrokeStyle(5, BLACK);
}

function createTargets(sceneObj) {
    GAME_COMPONENT.targets = []

    GAME_COMPONENT.targets[0] = sceneObj.add.triangle(400, 300, 0, 50, 100, -50, 200, 50, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(1);
    GAME_COMPONENT.targets[1] = sceneObj.add.rectangle(400, 350, 100, 100, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(3);
    GAME_COMPONENT.targets[2] = sceneObj.add.rectangle(400, 350, 50, 50, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(5);
    sceneObj.add.rectangle(400, 350, 50, 10, BLACK).setDepth(7);
    sceneObj.add.rectangle(400, 350, 10, 50, BLACK).setDepth(7);
}

function createObjectives(sceneObj) {
    GAME_COMPONENT.objectives = []

    GAME_COMPONENT.objectives[0] = sceneObj.add.triangle(400, 60, 0, 25, 50, -25, 100, 25, WHITE, 1.0).setStrokeStyle(1, BLACK);
    GAME_COMPONENT.objectives[1] = sceneObj.add.rectangle(400, 85, 50, 50, WHITE, 1.0).setStrokeStyle(1, BLACK);
    GAME_COMPONENT.objectives[2] = sceneObj.add.rectangle(400, 85, 25, 25, WHITE, 1.0).setStrokeStyle(1, BLACK);
    sceneObj.add.rectangle(400, 85, 25, 5, BLACK);
    sceneObj.add.rectangle(400, 85, 5, 25, BLACK);
}

function createControllers(sceneObj) {
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

function createCursors(sceneObj) {
    GAME_COMPONENT.cursors = []
    
    GAME_COMPONENT.cursors[0] = sceneObj.add.triangle(400, 300, 0, 50, 100, -50, 200, 50, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(2);
    GAME_COMPONENT.cursors[1] = sceneObj.add.rectangle(400, 350, 100, 100, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(4);
    GAME_COMPONENT.cursors[2] = sceneObj.add.rectangle(400, 350, 50, 50, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(6);
}

function createIndicators(sceneObj) {
    GAME_COMPONENT.indicators = {}
    
    GAME_COMPONENT.indicators.left = sceneObj.add.triangle(200, 300, 0, 0, 0, 100, 100, 50, WHITE, 1.0);
    GAME_COMPONENT.indicators.right = sceneObj.add.triangle(600, 300, 0, 50, 100, 0, 100, 100, WHITE, 1.0);
}

function initObjectives() {
    let objectiveValues = JSON.parse(document.getElementById("objective").value);
    for (let i = 0; i < objectiveValues.length; i++) {
        // let objectiveColor = Phaser.Display.Color.GetColor(objectiveValues[i][0], objectiveValues[i][1], objectiveValues[i][2]);
        // let objectiveColor = objectiveValues[i][0] * (16 ** 4) + objectiveValues[i][1] * (16 ** 2) + objectiveValues[i][2];
        GAME_COMPONENT.objectives[i].setFillStyle(objectiveValues[i], 1);
    }
}

function initControllers() {
    let left = JSON.parse(document.getElementById("left").value);
    for (let i = 0; i < left.length; i++) {
        // let c = Phaser.Display.Color.GetColor(left[i][0], left[i][1], left[i][2]);
        GAME_COMPONENT.leftController[i].setFillStyle(left[i], 1);
    }

    let right = JSON.parse(document.getElementById("right").value);
    for (let i = 0; i < right.length; i++) {
        // let c = Phaser.Display.Color.GetColor(right[i][0], right[i][1], right[i][2]);
        GAME_COMPONENT.rightController[i].setFillStyle(right[i], 1);
    }
}

function initCursors(sceneObj) {
    sceneObj.tweens.add({
        targets: GAME_COMPONENT.cursors,
        alpha: 0.0,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut"
    });

    GAME_COMPONENT.cursors[0].visible = true;
    GAME_COMPONENT.cursors[1].visible = false;
    GAME_COMPONENT.cursors[2].visible = false;

    for (let i = 0; i < GAME_COMPONENT.cursors.length; i++) {
        GAME_COMPONENT.cursors[i].setFillStyle(getColor(), 1);
    }
}

function initIndicators(sceneObj) {
    sceneObj.tweens.add({
        targets: [GAME_COMPONENT.indicators.left, GAME_COMPONENT.indicators.right],
        alpha: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut"
    });
    
    GAME_COMPONENT.indicators.left.setFillStyle(GAME_COMPONENT.leftController[0].fillColor, 1.0);
    GAME_COMPONENT.indicators.right.setFillStyle(GAME_COMPONENT.rightController[0].fillColor, 1.0);
}

function createKeys(sceneObj) {
    GAME_COMPONENT.keys = sceneObj.input.keyboard.createCursorKeys();
}

const ONE_DEG = Math.PI / 180 * 1;
let isLeftRotating = isRightRotating = false;
let leftRotateDeg = rightRotateDeg = 0;
let left_idx = right_idx = cursor_idx = 0;

function update() {
    // when left or right arrow key has been pressed
    if (this.input.keyboard.checkDown(GAME_COMPONENT.keys.left, 1000)) { isLeftRotating = true; }
    else if (this.input.keyboard.checkDown(GAME_COMPONENT.keys.right, 1000)) { isRightRotating = true; }

    // when up or down arrow key has been pressed
    if (this.input.keyboard.checkDown(GAME_COMPONENT.keys.up, 1000)) {
        GAME_COMPONENT.cursors[(((cursor_idx-- % 3) + 3) % 3)].visible = false;
        GAME_COMPONENT.cursors[(((cursor_idx % 3) + 3) % 3)].visible = true;
        GAME_COMPONENT.cursors[(((cursor_idx % 3) + 3) % 3)].setFillStyle(getColor(), 1);
    } else if (this.input.keyboard.checkDown(GAME_COMPONENT.keys.down, 1000)) {
        GAME_COMPONENT.cursors[(((cursor_idx++ % 3) + 3) % 3)].visible = false;
        GAME_COMPONENT.cursors[(((cursor_idx % 3) + 3) % 3)].visible = true;
        GAME_COMPONENT.cursors[(((cursor_idx % 3) + 3) % 3)].setFillStyle(getColor(), 1);
    }

    // when space key has been pressed
    if (this.input.keyboard.checkDown(GAME_COMPONENT.keys.space, 1000)) {
        GAME_COMPONENT.targets[(((cursor_idx % 3) + 3) % 3)].setFillStyle(getColor(), 1);
        check();
    }

    if (isLeftRotating) {
        Phaser.Actions.RotateAround(GAME_COMPONENT.leftController, { x: -25, y: 300 }, ONE_DEG * -2);
        leftRotateDeg += 2;
        if (leftRotateDeg % 120 == 0) {
            left_idx++;
            GAME_COMPONENT.cursors[(((cursor_idx % 3) + 3) % 3)].setFillStyle(getColor(), 1);
            GAME_COMPONENT.indicators.left.setFillStyle(GAME_COMPONENT.leftController[(left_idx % 3)].fillColor, 1.0);
            isLeftRotating = false;
        }
    }

    if (isRightRotating) {
        Phaser.Actions.RotateAround(GAME_COMPONENT.rightController, { x: 825, y: 300 }, ONE_DEG * 2);
        rightRotateDeg += 2;
        if (rightRotateDeg % 120 == 0) {
            right_idx++
            GAME_COMPONENT.cursors[(((cursor_idx % 3) + 3) % 3)].setFillStyle(getColor(), 1);
            GAME_COMPONENT.indicators.right.setFillStyle(GAME_COMPONENT.rightController[(right_idx % 3)].fillColor, 1.0);
            isRightRotating = false;
        }
    }
}

function getColor() {
    let leftColor = GAME_COMPONENT.leftController[(left_idx % 3)].fillColor;
    let leftRgb = Phaser.Display.Color.IntegerToRGB(leftColor);

    let rightColor = GAME_COMPONENT.rightController[(right_idx % 3)].fillColor;
    let rightRgb = Phaser.Display.Color.IntegerToRGB(rightColor);

    let combinedColor = Phaser.Display.Color.GetColor((leftRgb.r + rightRgb.r) / 2, (leftRgb.g + rightRgb.g) / 2, (leftRgb.b + rightRgb.b) / 2);
    return combinedColor;
}

function check() {
    let flag = true;

    for (let i = 0; i < GAME_COMPONENT.targets.length; i++) {
        let objectiveColor = GAME_COMPONENT.objectives[i].fillColor;
        let targetColor = GAME_COMPONENT.targets[i].fillColor;
        if (objectiveColor != targetColor) {
            flag = false;
            break;
        }
    }

    if (flag) stageClear();
}

function stageClear() {
    $("#stageClearModal").modal("show");
}

function reset() {

}

let game = new Phaser.Game(GAME_CONFIG);