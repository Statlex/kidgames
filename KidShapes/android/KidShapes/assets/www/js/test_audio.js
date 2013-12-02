(function(){

	window.audioFormat = (function() {

		var testAudio = new Audio();

		if (testAudio.canPlayType('audio/mp3')) {
			return 'mp3';
		}
		else if (testAudio.canPlayType('audio/ogg')) {
			return 'ogg';
		}
		else { // shit happen
			return 'wav';
		}

	});

//	audioFormat = self;

}());