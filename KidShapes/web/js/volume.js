(function () {

	return;

	console.log('test return');

	window.KG = window.KG || {};

	window.KG.volume = {};

	var self = window.KG.volume;

	self.percent = (function () {
		return localStorage.getItem('volume') || 50;
	}());

	self.getPercent = function () {
		return ((localStorage.getItem('volume') || 50) / 100);
	};

	var isTouch = (function () {
		return 'ontouchstart' in document.documentElement;
	}());

	self.format = (function () {
		var testAudio;
		testAudio = new Audio();
		if (testAudio.canPlayType('audio/3gp')) {
			alert('3gp');
			return '3gp';
		}
		if (testAudio.canPlayType('audio/ogg')) {
			alert('ogg');
			return 'ogg';
		}
		if (testAudio.canPlayType('audio/mp3')) {
			alert('mp3');
			return 'mp3';
		}
		if (testAudio.canPlayType('audio/wav')) {
			alert('wav');
			return 'wav';
		}

		return false;

	}());

	var setVolume = function () {
		var volumeLine = document.getElementById('volume-line'),
			volumePoint = document.getElementById('volume-point'),
			curPos, percent,
			min = 51,
			max = 213,
			setVol = function () {
				try {
					curPos = event.touches[0].pageY;
				}
				catch (e) {
					curPos = event.pageY;
				}
				percent = Math.round((curPos - min) / (max - min) * 100);
				percent = (percent >= 100) ? 100 : percent;
				percent = (percent <= 0) ? 0 : percent;
				volumePoint.style.top = percent + '%';
				self.percent = 100 - percent;
				localStorage.setItem('volume', self.percent);
				event.preventDefault();
				event.stopPropagation();
			};
		if (isTouch) {
			volumeLine.addEventListener('touchstart', setVol, false);
			volumeLine.addEventListener('touchmove', setVol, false);
		}
		else {
			volumeLine.addEventListener('mousestart', setVol, false);
			volumeLine.addEventListener('mousemove', setVol, false);
		}
		volumePoint.style.top = self.percent + '%';
	};

	var setButton = function () {
		var volumeButton = document.getElementById('volume'),
			volumeField = document.getElementById('volume-control'),
			volumeBg = document.getElementById('volume-bg'),
			close = function () {
				if (!volumeField.style.display || volumeField.style.display == 'none') {
					volumeBg.style.display = 'block';
					volumeField.style.display = 'block';
				}
				else {
					volumeBg.style.display = 'none';
					volumeField.style.display = 'none';
				}
			};
		if (isTouch) {
			volumeButton.addEventListener('touchstart', close, false);
			volumeBg.addEventListener('touchstart', close, false);
		}
		else {
			volumeButton.addEventListener('click', close, false);
			volumeBg.addEventListener('click', close, false);
		}
	};

	self.sound = {
		list: {
			swipe: 'sound/swipe.' + self.format,
			pushButton: 'sound/button.' + self.format
		},
		sounds: {},
		play: function (actionName) { // here is two 'try', i couldn't created better way :(
			try {
				self.sound.sounds[actionName].volume = self.getPercent();
				self.sound.sounds[actionName].currentTime = 0;
				self.sound.sounds[actionName].play();
			} catch (e) {}

			if (window.lb) {
				var forPlay = window.lb.sound;
				forPlay.breakSound();
				try { // if current sound is not loaded
					forPlay.sounds[swipeVars.curPageX].currentTime = 0;
					forPlay.sounds[swipeVars.curPageX].volume = self.getPercent(); // if page is NaN or look like, when appear ERROR
				} catch (e) {
					swipeVars.curPageX = Math.round(Math.abs(swipeVars.xss / swipeVars.pageWidth));
				}
				try { // shit happen
					forPlay.sounds[swipeVars.curPageX].play();
				} catch (e) {
				}
			}

		},
		init: function () {
			for (var key in self.sound.list) {
				if (self.sound.list.hasOwnProperty(key)) {
					self.sound.sounds[key] = new Audio(self.sound.list[key]);
					self.sound.sounds[key].loop = false;
				}
			}
		}
	};

	var soundForButtons = function () {
		var body = document.querySelector('body'),
			buttons = body.querySelectorAll('.button'),
			back = body.querySelector('#back'),
			i;
		if (back) {
			if (isTouch) {
				back.addEventListener('touchstart', function () {
					self.sound.play('pushButton')
				}, false);
			}
			else {
				back.addEventListener('click', function () {
					self.sound.play('pushButton')
				}, false);
			}
		}
		for (i = buttons.length; i--;) {
			if (isTouch) {
				buttons[i].addEventListener('touchstart', function () {
					self.sound.play('pushButton');
				}, false);
			}
			else {
				buttons[i].addEventListener('click', function () {
					self.sound.play('pushButton');
				}, false);
			}
		}
	};

	if (!self.format) { // if audio not supported
		self.sound.play = function () {
		};
		soundForButtons = function () {
		};
		window.addEventListener('load', function () {
			document.getElementById('volume').style.display = 'none';
		}, false); // hide volume button
	}

	var runFun = function () {
		self.sound.init();
		setButton();
		setVolume();
		soundForButtons();
	};

	window.addEventListener('load', runFun, false);

}());

