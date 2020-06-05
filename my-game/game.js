

const config = {
	type: Phaser.AUTO,
	width: 1525,
	height: 770,
	parent: 'phaser-game',
	background: 0x000000,
	scene: [Scene1,Scene2,Scene3]
};

let game = new Phaser.Game(config);
