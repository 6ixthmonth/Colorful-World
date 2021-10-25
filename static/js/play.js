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

function preload() {
    this.load.image("sky", "/static/img/sky.png");
    this.load.image("ground", "/static/img/platform.png");
    this.load.image("star", "/static/img/star.png");
    this.load.image("bomb", "/static/img/bomb.png");
    this.load.spritesheet("dude", "/static/img/dude.png",
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {
    // this.add.image(400, 300, "sky");
    this.add.text(0, 0, "Demo");
    this.add.circle(100, 100, 100, 0xff0000);
    // platforms = this.physics.add.staticGroup();

    // platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // platforms.create(600, 400, 'ground');
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');
}

function update() {
    //
}

let game = new Phaser.Game(GAME_CONFIG);

// const MAIN_SCENE = {
//     key: "mainScene",
//     create: mainCreate
// }

// const FAME_SCENE = {
//     key: "gameScene",
//     create: gameCreate
// }