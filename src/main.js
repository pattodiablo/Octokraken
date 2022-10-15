
window.addEventListener('load', function () {

	let currentWidth =  document.body.clientWidth;
	let currentHeight = document.body.clientHeight;





	if(currentWidth>1080){
		console.log("ajusto tamanos")
		currentWidth=1080;
		currentHeight=1920;
	}
	console.log("currentWidth " + currentWidth);

	console.log("currentHeight " + currentHeight);

	var game = new Phaser.Game({
		width: 1080,
		height:  1920,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		physics: {
			default: "arcade",
			arcade: {
				fps: 60,
				gravity: { y: 0 },
				debug: false				
			}			
		},
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});
	
	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}
}