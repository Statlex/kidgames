(function () {



	var isTouch = (function () {
		return 'ontouchstart' in document.documentElement;
	}());

	window.eventPos = {};

	if (isTouch) {
		eventPos.x = function () {
			return event.touches[0].pageX;
		};
		eventPos.y = function () {
			return event.touches[0].pageY;
		};
	}
	else {
		eventPos.x = function () {
			return event.pageX;
		};
		eventPos.y = function () {
			return event.pageY;
		};
	}

}());

(function () {
	var noBodyScroll = function () {
		(document.getElementsByTagName('body')[0]).addEventListener('touchmove', function () {
//            event.stopPropagation();
			event.preventDefault();
		}, false);
	};
	window.addEventListener('load', noBodyScroll, false);
}());

(function () {

	var marginTop = 32;

	window.title = window.title || {};

	title.isTouch = (function () {
		return 'ontouchstart' in document.documentElement;
	}());

	title.vendorPrefix = (function () {
		var userAgent = navigator.userAgent,
			vendorPrefix;
		if (userAgent.indexOf('MSIE') != -1) {
			vendorPrefix = 'ms';
		}
		else if (userAgent.indexOf('Gecko') != -1) {
			vendorPrefix = 'webkit';
		}
		else if (userAgent.indexOf('Mozilla') != -1) {
			vendorPrefix = 'moz';
		}
		else if (userAgent.indexOf('Opera') != -1) {
			vendorPrefix = 'o';
		}
		return vendorPrefix;
	}());

	title.setSize = function () {
		var width, height, workSpace, pages, container, i, body;
		workSpace = document.getElementById('work-space');
		if (!workSpace) return;
		width = workSpace.parentNode.clientWidth;
		height = document.documentElement.clientHeight;
		pages = workSpace.querySelectorAll('.page');
		container = workSpace.querySelector('#container');

		workSpace.style.width = width + 'px';
		workSpace.style.height = (height - marginTop) + 'px'; // top padding 1/2
		container.style.width = (pages.length * width) + 'px';

		for (i = pages.length; i--;) {
			pages[i].style.width = workSpace.style.width;
			pages[i].style.height = workSpace.style.height;
		}

		body = document.querySelector('body');
		body.style.width = document.documentElement.clientWidth + 'px';
		body.style.height = document.documentElement.clientHeight + 'px';

	};

	title.bindButtons = function () {
		var workSpace = document.getElementById('work-space'),
			startGame = document.querySelector('#start-game'),
			gameNameButtons = document.querySelectorAll('.p2 .button'),
			gameDifficultButtons = document.querySelectorAll('.p3 .button'),
			back = document.querySelector('#home-page #back'),
			about = document.getElementById('about'),
			i;

		if (startGame) {
			startGame.addEventListener('click', title.start, false);
		}

		for (i = gameNameButtons.length; i--;) {
				gameNameButtons[i].addEventListener('click', title.selectGame, false);
		}

		for (i = gameDifficultButtons.length; i--;) {
			gameDifficultButtons[i].addEventListener('click', title.difficultGame, false);
		}

		if (back) {
			back.addEventListener('click', title.back, false);
		}

		if (about) {
			about.addEventListener('click', title.about, false);
		}

	};

	title.start = function () {
		title.changePage(1);
		setTimeout(function () {
			title.showStatusBar();
		}, 300);
	};

	title.selectGame = function () {
		var gameDifficultButtons = document.querySelectorAll('.p3 .button'),
			href = this.getAttribute('href'),
			i;
		if (this.getAttribute('id') != 'learn-basics') {
			for (i = gameDifficultButtons.length; i--;) {
				gameDifficultButtons[i].setAttribute('href', href);
			}
			title.changePage(1);

			var gameName = this.getAttribute('id');

			KGDB.transaction(
				function(tx) {
					tx.executeSql('DROP TABLE IF EXISTS info');
					tx.executeSql('CREATE TABLE IF NOT EXISTS info (id unique, dif)');
					tx.executeSql('INSERT INTO info (id, dif) VALUES (0, "' + gameName + '")');
				}
			);

//			state.gameName = this.getAttribute('id');
//			localStorage.setItem('state', state.toString());
			event.preventDefault();
			event.stopPropagation();
		}

		title.showStatusBar();

	};

	title.difficultGame = function () {
		var difficult = this.getAttribute('id');
		var link = this.href;

		KGDB.transaction(function(tx) {
			tx.executeSql('INSERT INTO info (id, dif) VALUES (1, "' + difficult + '")');
			window.location = link;
		});

		event.preventDefault();

		//localStorage.setItem('state', state.toString());
	};

	title.back = function () {
		title.changePage(-1);
		var container = document.querySelector('#container'),
			curPos = title.curPos(container);
		if (!curPos) title.hideStatusBar();
	};

	title.about = function () {
		KG.message(document.querySelector('#info .about').innerHTML);
	};

	title.showStatusBar = function () {
		var statusBar = document.getElementById('status-bar');
		if (statusBar.style.top != '0px') statusBar.style.top = '0px';
	};

	title.hideStatusBar = function () {
		var statusBar = document.getElementById('status-bar');
		statusBar.style.top = '';
	};

	title.changePage = function (q) {
		var container = document.querySelector('#container'),
			curPos = title.curPos(container),
			width = container.querySelector('.page').clientWidth;
		curPos = curPos - q * width;
		if (curPos >= 0) curPos = 0;
		container.style[title.vendorPrefix + 'Transform'] = 'translateX(' + curPos + 'px)';
	};

	title.curPos = function (container) {
		var transform = container.style[title.vendorPrefix + 'Transform'].toString(),
			startPos = transform.indexOf('translateX(') + 11;
		transform = parseInt(transform.substring(startPos, transform.length)) || 0;
		return transform;
	};

	var runFuns = function () {
		title.setSize();
		title.bindButtons();
		console.log('from js -> general.js is loaded');
	};

	window.addEventListener('load', runFuns, false);

	// event position

	if (title.isTouch) {
		window.gX = function () {
			return event.touches[0].pageX;
		};
		window.gY = function () {
			return event.touches[0].pageY;
		};
	}
	else {
		window.gX = function () {
			return event.pageX;
		};
		window.gY = function () {
			return event.pageY;
		};
	}

}());


