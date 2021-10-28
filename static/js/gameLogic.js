const GAME_CONFIG = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    title: "Colorful World - Make the World more Colorful",
    backgroundColor: "#808080",
    scene_obj: "outer",
    autoCenter: true,
    // scene: [MAIN_SCENE, GAME_SCENE]
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game_component = {};

// const MAIN_SCENE = {
//     key: "main_scene",
//     create: main_create
// }

// const GAME_SCENE = {
//     key: "game_scene",
//     create: game_create,
//     update: game_update
// }

function preload() {
    // let target = document.getElementById("target").value;
    // console.log("target: " + target);
    // console.log(JSON.parse(target));
    // let left = document.getElementById("left").value;
    // console.log("left: " + left);
    // console.log(JSON.parse(left));
    // let right = document.getElementById("right").value;
    // console.log("right: " + right);
    // console.log(JSON.parse(right));
}

function create() {
    console.log(Phaser.Input.Keyboard.KeyCodes);
    createGrid(this); // for layout
    createTarget(this);
    createPalette(this);
    createLeft(this);
    createRight(this);
    createBackground(this);

    createKey(this);
}

function createGrid(scene_obj) {
    scene_obj.add.rectangle(400 - 200, 300 - 150, 400, 300, 0x404040); // upper left
    scene_obj.add.rectangle(400 + 200, 300 + 150, 400, 300, 0x404040); // lower right
    scene_obj.add.rectangle(400 - 200 - 100, 300 + 150 - 75, 200, 150, 0xc0c0c0); // lower left upper left
    scene_obj.add.rectangle(400 - 200 + 100, 300 + 150 + 75, 200, 150, 0xc0c0c0); // lower left lower right
    scene_obj.add.rectangle(400 - 200 - 100 - 50, 300 + 150 + 75 - 37.5, 100, 75, 0x404040); // lower left lower left upper left
    scene_obj.add.rectangle(400 - 200 - 100 + 50, 300 + 150 + 75 + 37.5, 100, 75, 0x404040); // lower left lower left lower right
}

function createTarget(scene_obj) {
    game_component.target_roof = scene_obj.add.triangle(200, 450, 0, 25, 50, -25, 100, 25, 0xff0000);
    game_component.target_body = scene_obj.add.rectangle(200, 475, 50, 50, 0x00ff00);
    game_component.target_window = scene_obj.add.rectangle(200, 475, 25, 25, 0x0000ff);
    scene_obj.add.rectangle(200, 475, 25, 5, 0x000000);
    scene_obj.add.rectangle(200, 475, 5, 25, 0x000000);
}

function createPalette(scene_obj) {
    game_component.palette_roof = scene_obj.add.triangle(400, 300, 0, 50, 100, -50, 200, 50, 0x00ffff);
    game_component.palette_body = scene_obj.add.rectangle(400, 350, 100, 100, 0xff00ff);
    game_component.palette_window = scene_obj.add.rectangle(400, 350, 50, 50, 0xffff00);
    scene_obj.add.rectangle(400, 350, 50, 10, 0x000000);
    scene_obj.add.rectangle(400, 350, 10, 50, 0x000000);
}

function createLeft(scene_obj) {
    // scene_obj.add.circle(0, 300, 100, 0x000000);
    game_component.left_0 = scene_obj.add.circle(100, 300, 50, 0xff0000);
    game_component.left_1 = scene_obj.add.circle(50, 300 + Math.sin(Math.PI / 180 * 60) * 100, 50, 0x00ff00);
    game_component.left_2 = scene_obj.add.circle(-50, 300 + Math.sin(Math.PI / 180 * 60) * 100, 50, 0x0000ff);
    game_component.left_3 = scene_obj.add.circle(-100, 300, 50, 0x00ffff);
    game_component.left_4 = scene_obj.add.circle(-50, 300 - Math.sin(Math.PI / 180 * 60) * 100, 50, 0xff00ff);
    game_component.left_5 = scene_obj.add.circle(50, 300 - Math.sin(Math.PI / 180 * 60) * 100, 50, 0xffff00);

    game_component.left_0.setStrokeStyle(10, 0x000000);
    game_component.left_1.setStrokeStyle(10, 0x000000);
    game_component.left_2.setStrokeStyle(10, 0x000000);
    game_component.left_3.setStrokeStyle(10, 0x000000);
    game_component.left_4.setStrokeStyle(10, 0x000000);
    game_component.left_5.setStrokeStyle(10, 0x000000);
}

function createRight(scene_obj) {
    // scene_obj.add.circle(800, 300, 100, 0x000000);
    game_component.right_0 = scene_obj.add.circle(700, 300, 50, 0xff0000);
    game_component.right_1 = scene_obj.add.circle(750, 300 + Math.sin(Math.PI / 180 * 60) * 100, 50, 0x00ff00);
    game_component.right_2 = scene_obj.add.circle(850, 300 + Math.sin(Math.PI / 180 * 60) * 100, 50, 0x0000ff);
    game_component.right_3 = scene_obj.add.circle(900, 300, 50, 0x00ffff);
    game_component.right_4 = scene_obj.add.circle(850, 300 - Math.sin(Math.PI / 180 * 60) * 100, 50, 0xff00ff);
    game_component.right_5 = scene_obj.add.circle(750, 300 - Math.sin(Math.PI / 180 * 60) * 100, 50, 0xffff00);

    game_component.right_0.setStrokeStyle(10, 0x000000);
    game_component.right_1.setStrokeStyle(10, 0x000000);
    game_component.right_2.setStrokeStyle(10, 0x000000);
    game_component.right_3.setStrokeStyle(10, 0x000000);
    game_component.right_4.setStrokeStyle(10, 0x000000);
    game_component.right_5.setStrokeStyle(10, 0x000000);
}

function createBackground(scene_obj) {
    
}

function createKey(scene_obj) {
    // game_component.keyUp = scene_obj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    // game_component.keyDown = scene_obj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    // game_component.keyLeft = scene_obj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    // game_component.keyRight = scene_obj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    // game_component.keySpace = scene_obj.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    game_component.cursors = scene_obj.input.keyboard.createCursorKeys();
}

function update() {
    // if (game_component.keyUp.isDown) {
    //     console.log("UP");
    // }
    // if (game_component.keyDown.isDown) {
    //     console.log("DOWN");
    // }
    // if (game_component.keyLeft.isDown) {
    //     console.log("LEFT");
    // }
    // if (game_component.keyRight.isDown) {
    //     console.log("RIGHT");
    // }
    // if (game_component.keySpace.isDown) {
    //     console.log("SPACE");
    // }

    if (this.input.keyboard.checkDown(game_component.cursors.left, 1000)) {
        console.log("LEFT");
    } else if (this.input.keyboard.checkDown(game_component.cursors.right, 1000)) {
        console.log("RIGHT");
    }

    if (this.input.keyboard.checkDown(game_component.cursors.up, 1000)) {
        console.log("UP");
    } else if (this.input.keyboard.checkDown(game_component.cursors.down, 1000)) {
        console.log("DOWN");
    }

    if (this.input.keyboard.checkDown(game_component.cursors.space, 1000)) {
        console.log("SPACE");
    }
}

let game = new Phaser.Game(GAME_CONFIG);