const config = {
	type: Phaser.AUTO,
	width: 1515,
	height: 770,
	parent: 'phaser-game',
	background: 0x000000,
	scene: [Scene1]
};

let game = new Phaser.Game(config);