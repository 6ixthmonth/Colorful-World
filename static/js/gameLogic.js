const GAME_CONFIG = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    title: "Colorful World - Make the World more Colorful",
    backgroundColor: "#999999",
    parent: "outer",
    autoCenter: true,
    // scene: [MAIN_SCENE, GAME_SCENE]
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// const MAIN_SCENE = {
//     key: "mainScene",
//     create: mainCreate
// }

// const FAME_SCENE = {
//     key: "gameScene",
//     create: gameCreate
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
    // this.add.text(0, 0, "Demo");
    // this.add.circle(100, 100, 100, 0x000000);

    createTarget(this);
}

function createTarget(parent) {
    parent.add.triangle(400, 400, -100, 100, 100, 100, 0, 0, 0x333333);
    // parent.add.rectangle();
}

function update() {
    //
}

let game = new Phaser.Game(GAME_CONFIG);