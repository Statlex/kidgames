bro(function(){

	var $ = bro;

	var dropZone = $('.js-drop-zone');

	function handleFiles(e) {
		var files = e.target.files; // FileList object

		for (var i = 0, f; f = files[i]; i++) {

			var reader = new FileReader();

			reader.onload = function(file, index){

				var temp = URL.createObjectURL(file);

				console.log(file.toString());

				var audio = new Audio();
				console.log(audio);

				audio.src = temp;

				audio.play();
				console.log(temp);

				player.list[index] = audio;

				//this.string += this.createSVGLine(event.target.result, file);
				//this.textArea.value = this.string;

			}.bind(this, f, i);

			// Read in the image file as a data URL.
			reader.readAsBinaryString(f);

		}

	}
	
	
	dropZone.on('change', handleFiles)


	var player = {
		list: []
	};

	var Track = function(data) {
		var util = $();
		util.extend(this, data);
	}


});