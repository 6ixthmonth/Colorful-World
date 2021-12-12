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
const LEFT = 0;
const RIGHT = 1;
const GAME_COMPONENT = {};

let tweensConfig = {
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut"
};

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

/* Create untransformable game objects. */
function createBackground(scene) {
    scene.add.circle(400, 0, 150, WHITE, 0.0).setStrokeStyle(5, BLACK);
    scene.add.circle(-25, 300, 100, WHITE, 0.0).setStrokeStyle(5, BLACK);
    scene.add.circle(825, 300, 100, WHITE, 0.0).setStrokeStyle(5, BLACK);
}

/* Create target game objects to fill color. */
function createTargets(scene) {
    GAME_COMPONENT["targets"] = [];

    GAME_COMPONENT["targets"].push(scene.add.triangle(400, 300, 0, 50, 100, -50, 200, 50, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(1));
    GAME_COMPONENT["targets"].push(scene.add.rectangle(400, 350, 100, 100, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(3));
    GAME_COMPONENT["targets"].push(scene.add.rectangle(400, 350, 50, 50, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(5));
    scene.add.rectangle(400, 350, 50, 10, BLACK).setDepth(7);
    scene.add.rectangle(400, 350, 10, 50, BLACK).setDepth(7);
}

/* Create objective game objects to ensure goal. */
function createObjectives(scene) {
    GAME_COMPONENT["objectives"] = [];

    GAME_COMPONENT["objectives"].push(scene.add.triangle(400, 60, 0, 25, 50, -25, 100, 25, WHITE, 1.0).setStrokeStyle(1, BLACK));
    GAME_COMPONENT["objectives"].push(scene.add.rectangle(400, 85, 50, 50, WHITE, 1.0).setStrokeStyle(1, BLACK));
    GAME_COMPONENT["objectives"].push(scene.add.rectangle(400, 85, 25, 25, WHITE, 1.0).setStrokeStyle(1, BLACK));
    scene.add.rectangle(400, 85, 25, 5, BLACK);
    scene.add.rectangle(400, 85, 5, 25, BLACK);
}

/* Create controllable game objects. */
function createControllers(scene) {
    let radius = 50; // unit: pixel
    let sinY = Math.sin(Math.PI / 180 * 60) * radius * 2;

    let leftCenterX = -25;
    let rightCenterX = 825;
    let centerY = 300;

    GAME_COMPONENT["controllers"] = [];

    // start from right(0 deg), place clockwisely.
    let leftController = [];
    leftController.push(scene.add.circle(leftCenterX + radius * 2, centerY + 0, radius, 0xff0000).setStrokeStyle(5, BLACK));
    leftController.push(scene.add.circle(leftCenterX - radius, centerY + sinY, radius, 0x00ff00).setStrokeStyle(5, BLACK));
    leftController.push(scene.add.circle(leftCenterX - radius, centerY - sinY, radius, 0x0000ff).setStrokeStyle(5, BLACK));

    // start from left(180 deg), place counter-clockwisely.
    let rightController = [];
    rightController.push(scene.add.circle(rightCenterX - radius * 2, centerY + 0, radius, 0x00ffff).setStrokeStyle(5, BLACK));
    rightController.push(scene.add.circle(rightCenterX + radius, centerY + sinY, radius, 0xff00ff).setStrokeStyle(5, BLACK));
    rightController.push(scene.add.circle(rightCenterX + radius, centerY - sinY, radius, 0xffff00).setStrokeStyle(5, BLACK));

    GAME_COMPONENT["controllers"].push(leftController);
    GAME_COMPONENT["controllers"].push(rightController);
}

/* Create cursor game objects display selected target. */
function createCursors(sceneObj) {
    GAME_COMPONENT["cursors"] = []
    
    GAME_COMPONENT["cursors"].push(sceneObj.add.triangle(400, 300, 0, 50, 100, -50, 200, 50, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(2));
    GAME_COMPONENT["cursors"].push(sceneObj.add.rectangle(400, 350, 100, 100, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(4));
    GAME_COMPONENT["cursors"].push(sceneObj.add.rectangle(400, 350, 50, 50, WHITE, 1.0).setStrokeStyle(2, BLACK).setDepth(6));
}

/* Create indicator game objects display selected controller. */
function createIndicators(sceneObj) {
    GAME_COMPONENT["indicators"] = []
    
    GAME_COMPONENT["indicators"].push(sceneObj.add.triangle(200, 300, 0, 0, 0, 100, 100, 50, WHITE, 1.0));
    GAME_COMPONENT["indicators"].push(sceneObj.add.triangle(600, 300, 0, 50, 100, 0, 100, 100, WHITE, 1.0));
}

/* Fill colors to objective game objects. */
function initObjectives() {
    let objective = JSON.parse(document.getElementById("objective").value);
    for (let i = 0; i < objective.length; i++) {
        GAME_COMPONENT["objectives"][i].setFillStyle(objective[i], 1);
    }
}

/* Fill colors to controllable game objects. */
function initControllers() {
    let left = JSON.parse(document.getElementById("left").value);
    let right = JSON.parse(document.getElementById("right").value);
    let colorList = [left, right];

    for (let i = 0; i < GAME_COMPONENT["controllers"].length; i++) {
        for (let j = 0; j < GAME_COMPONENT["controllers"][i].length; j++) {
            GAME_COMPONENT["controllers"][i][j].setFillStyle(colorList[i][j], 1.0);
        }
    }
}

/* Fill colors and set tweens effect to cursors. */
function initCursors(sceneObj) {
    GAME_COMPONENT["cursors"][0].setFillStyle(getMixedColor(), 1.0);

    GAME_COMPONENT["cursors"][0].visible = true;
    GAME_COMPONENT["cursors"][1].visible = false;
    GAME_COMPONENT["cursors"][2].visible = false;

    tweensConfig["targets"] = GAME_COMPONENT["cursors"];
    tweensConfig["alpha"] = 0.0;
    sceneObj.tweens.add(tweensConfig);
}

/* Fill colors and set tweens effect to indicators. */
function initIndicators(sceneObj) {
    GAME_COMPONENT["indicators"][LEFT].setFillStyle(GAME_COMPONENT["controllers"][LEFT][0].fillColor, 1.0);
    GAME_COMPONENT["indicators"][RIGHT].setFillStyle(GAME_COMPONENT["controllers"][RIGHT][0].fillColor, 1.0);

    tweensConfig["targets"] = GAME_COMPONENT["indicators"];
    tweensConfig["alpha"] = 0.5;
    sceneObj.tweens.add(tweensConfig);
}

/* Make the game to be able to detect key input. */
function createKeys(sceneObj) {
    GAME_COMPONENT["keys"] = sceneObj.input.keyboard.createCursorKeys();
}

const ONE_DEG = Math.PI / 180 * 1;
let isLeftRotating = isRightRotating = false;
let leftRotateDeg = rightRotateDeg = 0;
let leftIdx = rightIdx = cursorIdx = 0;

function update() {
    // when left or right arrow key has been pressed,
    if (this.input.keyboard.checkDown(GAME_COMPONENT.keys.left, 1000)) { isLeftRotating = true; }
    else if (this.input.keyboard.checkDown(GAME_COMPONENT.keys.right, 1000)) { isRightRotating = true; }

    // when up or down arrow key has been pressed,
    if (this.input.keyboard.checkDown(GAME_COMPONENT.keys.up, 1000)) {
        GAME_COMPONENT["cursors"][(((cursorIdx-- % 3) + 3) % 3)].visible = false;
        GAME_COMPONENT["cursors"][(((cursorIdx % 3) + 3) % 3)].setFillStyle(getMixedColor(), 1);
        GAME_COMPONENT["cursors"][(((cursorIdx % 3) + 3) % 3)].visible = true;
    } else if (this.input.keyboard.checkDown(GAME_COMPONENT.keys.down, 1000)) {
        GAME_COMPONENT["cursors"][(((cursorIdx++ % 3) + 3) % 3)].visible = false;
        GAME_COMPONENT["cursors"][(((cursorIdx % 3) + 3) % 3)].setFillStyle(getMixedColor(), 1);
        GAME_COMPONENT["cursors"][(((cursorIdx % 3) + 3) % 3)].visible = true;
    }

    // when space key has been pressed,
    if (this.input.keyboard.checkDown(GAME_COMPONENT.keys.space, 1000)) {
        GAME_COMPONENT["targets"][(((cursorIdx % 3) + 3) % 3)].setFillStyle(getMixedColor(), 1);
        if (checkStageClear()) {
            $("#stageClearModal").modal("show");
        }
    }

    // after left arrow key was pressed, lotate left controller counter-clockwisely until 120 degrees.
    if (isLeftRotating) {
        Phaser.Actions.RotateAround(GAME_COMPONENT["controllers"][LEFT], { x: -25, y: 300 }, ONE_DEG * -2);
        leftRotateDeg += 2;
        if (leftRotateDeg % 120 == 0) {
            leftIdx++;
            GAME_COMPONENT["cursors"][(((cursorIdx % 3) + 3) % 3)].setFillStyle(getMixedColor(), 1);
            GAME_COMPONENT["indicators"][LEFT].setFillStyle(GAME_COMPONENT["controllers"][LEFT][(leftIdx % 3)].fillColor, 1.0);
            isLeftRotating = false;
        }
    }

    // after right arrow key was pressed, lotate right controller clockwisely until 120 degrees.
    if (isRightRotating) {
        Phaser.Actions.RotateAround(GAME_COMPONENT["controllers"][RIGHT], { x: 825, y: 300 }, ONE_DEG * 2);
        rightRotateDeg += 2;
        if (rightRotateDeg % 120 == 0) {
            rightIdx++
            GAME_COMPONENT["cursors"][(((cursorIdx % 3) + 3) % 3)].setFillStyle(getMixedColor(), 1);
            GAME_COMPONENT["indicators"][RIGHT].setFillStyle(GAME_COMPONENT["controllers"][RIGHT][(rightIdx % 3)].fillColor, 1.0);
            isRightRotating = false;
        }
    }
}

// Get mixed color by selected left & right color selections.
function getMixedColor() {
    let leftColor = GAME_COMPONENT["controllers"][LEFT][(leftIdx % 3)].fillColor;
    let leftRgb = Phaser.Display.Color.IntegerToRGB(leftColor);

    let rightColor = GAME_COMPONENT["controllers"][RIGHT][(rightIdx % 3)].fillColor;
    let rightRgb = Phaser.Display.Color.IntegerToRGB(rightColor);

    let mixedColor = Phaser.Display.Color.GetColor((leftRgb.r + rightRgb.r) / 2, (leftRgb.g + rightRgb.g) / 2, (leftRgb.b + rightRgb.b) / 2);

    return mixedColor;
}

function checkStageClear() {
    let result = true;

    for (let i = 0; i < GAME_COMPONENT["objectives"].length; i++) {
        let objectiveColor = GAME_COMPONENT["objectives"][i].fillColor;
        let targetColor = GAME_COMPONENT["targets"][i].fillColor;
        if (objectiveColor != targetColor) {
            result = false;
            break;
        }
    }

    return result;
}

function reset() {

}

let game = new Phaser.Game(GAME_CONFIG);