bro(function () {

	var $ = bro;

	var list = [];

	var playList = $('.js-play-list');

	var player = $('.js-player');

	player.on('ended', function () {

		var $this = $(this),
			nextIndex = +$this.data('index') + 1,
			nextItem = $('.js-track[data-index="' + nextIndex + '"]');

		if (nextItem.isEmpty()) {
			nextItem = $('.js-track[data-index="0"]');
		}

		$this.prop('src', nextItem.data('src'))
			.data('index', nextItem.data('index'))
			.prop('play').call(this);

		$('.js-current-track').html(nextItem.html());

	});

	$('.js-drop-zone').on('change', function (e) {

		var fileCounter = 0;

		var files = e.target.files; // FileList object

		for (var i = 0, len = files.length; i < len; i++) {

			var reader = new FileReader();

			var f = files[i];

			reader.onload = function (file, index) {

				list[index] = {
					file: file,
					src: URL.createObjectURL(file),
					name: file.name,
					index: index
				};

				fileCounter += 1;

				if (fileCounter === len) {
					createList();
				}

			}.bind(this, f, i);

			// Read in the image file as a data URL.
			reader.readAsBinaryString(f);

		}

	});


	function createList() {

		list.forEach(function (item, index) {

			var $track = $('<div/>', {
				class: 'track js-track'
			})
				.data(item)
				.html(item.name.replace(/\.\S*?$/, ''))
				.on('click', function () {

					var $this = $(this);

					player.prop('src', $this.data('src'))
						.data('index', $this.data('index'))
						.prop('play').call(player[0]);

					$('.js-current-track').html($this.html());

				});

			playList.append($track);


			var audio = new Audio();

			audio.src = item.src;
			audio.index = index;
			$(audio).on('canplaythrough', function () {

				var sec = parseInt(this.duration),
					min = Math.floor(sec / 60);
				sec %= 60;

				$('.js-track').eq(this.index).data('duration', min + '.' + sec);

			});

		});

	}


});