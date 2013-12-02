(function () {

	window.addEventListener('load', function () {
		swipe('#container', '{vertical : false, pagination : true}');
		swipe('#shape-slider-container', '{vertical : true}');
	}, false);

	var isTouch = (function () {
		return 'ontouchstart' in document.documentElement;
	}());

	var iterator = 0;

	window.fi = window.fi || {}; // fi == find it

	var topPadding;
	var setRightSidePos = function () {
		topPadding = parseInt(document.getElementById('status-bar').clientHeight);
		var rightSide = document.getElementById('right-side');
		rightSide.style.height = document.documentElement.clientHeight - topPadding + 'px';
		rightSide.style.width = Math.round(document.documentElement.clientWidth * 0.15) + 'px';
	};

	var setSmallFigures = function () {
		var body = document.getElementsByTagName('body')[0],
			imgs = body.querySelectorAll('#shape-slider-container > div'),
			i;

		body.style.width = document.documentElement.clientWidth + 'px';
		body.style.height = document.documentElement.clientHeight + 'px';

		if (isTouch) {

			for (i = imgs.length; i--;) {
				imgs[i].addEventListener('touchstart', getStartPos, false); // see fun below
			}
			body.addEventListener('touchmove', newElemMove, false);         // see fun below
			body.addEventListener('touchend', newElemPut, false);
		}
		else {

			for (i = imgs.length; i--;) {
				imgs[i].addEventListener('mousedown', getStartPos, false);
			}
			body.addEventListener('mousemove', newElemMove, false);
			body.addEventListener('mouseup', newElemPut, false);
		}

	};

	function setSmallFiguresSize() {
		var shapeSliderContainer, figures, i, len, size;
		shapeSliderContainer = document.getElementById('shape-slider-container');
		size = shapeSliderContainer.clientWidth;
		figures = shapeSliderContainer.getElementsByTagName('div');
		for (i = 0, len = figures.length; i < len; i += 1) {
			figures[i].style.width = size + 'px';
			figures[i].style.height = size + 'px';
		}

	}

	var getStartPos = function () {
//		if (getFigure.figure && getFigure.figure.getAttribute('class') == 'new-figure good') {
//			getFigure.figure = false;
//			return;
//		}
		getStartPos.can = true; // can try to create new element
		getStartPos.elemCreated = false; // created or not created new element?
		getStartPos.figure = this.cloneNode(true); // put figure to object's property
		try {
			getStartPos.x = event.touches[0].pageX;
			getStartPos.curX = event.touches[0].pageX;
			getStartPos.y = event.touches[0].pageY;
			getStartPos.curY = event.touches[0].pageY;
		}
		catch (e) {
			getStartPos.x = event.pageX;
			getStartPos.curX = event.pageX;
			getStartPos.y = event.pageY;
			getStartPos.curY = event.pageY;
		}
	};

	var getCurPageNumber = function () {
		var container = document.querySelector('#work-space #container'),
			page = container.querySelector('.page'),
			style = container.getAttribute('style') || '',
			curPos = parseInt(style.substring(style.lastIndexOf('translate(') + 10, style.length - 1)) || 0,
			number = Math.round(Math.abs(curPos / page.clientWidth));
		getCurPageNumber.number = number;
		return number;       // return page's number
	};

	var newElemMove = function () {
		var page, figure;
		if (getFigure.figure && (getFigure.figure.getAttribute('class') == 'new-figure good' || getFigure.figure.getAttribute('class') == 'new-figure bad')) {
			getFigure.figure = false;
			return;
		}

		getStartPos.curX = eventPos.x();
		getStartPos.curY = eventPos.y();

		// create new element if necessary
		if (getStartPos.can && (Math.abs(getStartPos.curX - getStartPos.x) > 10)) {
			getStartPos.can = false;
			page = document.querySelectorAll('#work-space .page')[getCurPageNumber()];
			figure = getStartPos.figure;
			figure.className = 'new-figure';
			figure.style.zIndex = '9999';
			page.appendChild(figure);
			getStartPos.curX = getStartPos.x;
			getStartPos.curY = getStartPos.y;
			getStartPos.elemCreated = true;
			fitElemToImage.array = fiList.list[getCurPageNumber.number][figure.title];
			swipeVars.isScrollX = false;
			swipeVars.isScrollY = false;
		}

		if (getStartPos.elemCreated) {
			getStartPos.figure.style[swipeVars.transform] = 'translate(' +
				getStartPos.curX + 'px,' +
				( getStartPos.curY - topPadding ) + 'px)';
			fitElemToImage(getStartPos.figure, getStartPos.curX, getStartPos.curY - topPadding);
		}

		// move exist element

		if (getFigure.can && getFigure.figure) {
			getFigure.figure.style[swipeVars.transform] = 'translate(' +
				getStartPos.curX + 'px,' +
				( getStartPos.curY - topPadding ) + 'px)';
			event.stopPropagation();
			fitElemToImage(getFigure.figure, getStartPos.curX, getStartPos.curY - topPadding);
		}
	};

	var newElemPut = function () {

//		if (getStartPos.figure) {
		getStartPos.elemCreated = false;
		getStartPos.can = false;
		setZIndex();

		if (getFigure.figure && getFigure.figure.getAttribute('class').indexOf('new-figure') != -1) {
			getFigure.figure = false;
			getStartPos.elemCreated = false;
			return;
		}
		var width = document.querySelector('#work-space .page').clientWidth,
			figure = getStartPos.figure;
		if (getStartPos.curX >= width && getStartPos.elemCreated) {
			figure.parentNode.removeChild(figure);
		}
		else if (figure) {

			if (isTouch) {
				figure.addEventListener('touchstart', getFigure, false);       // do it
			}
			else {
				figure.addEventListener('mousedown', getFigure, false);
			}

			if (figure.getAttribute('class') == 'new-figure active' || figure.getAttribute('class') == 'new-figure good') {
				goodPosition(figure);
//					fiList.initSwipe();
//					setTimeout(fiList.initSwipe, 2500);
			}
			else {
				badPosition(figure);
			}

			if (isTouch) {
				figure.addEventListener('touchstart', function () {
					event.stopPropagation()
				}, true);
				figure.addEventListener('touchmove', function () {
					event.preventDefault();
					event.stopPropagation()
				}, true);
			} else {
				figure.addEventListener('mousedown', function () {
					event.stopPropagation()
				}, true);
				figure.addEventListener('mousehmove', function () {
					event.stopPropagation()
				}, true);
			}

		}
//		}
		getStartPos.figure = false;
		getFigure.figure = false;
		getStartPos.elemCreated = false;
		getFigure.can = false;
		swipeVars.dx = 0;
	};

	var setProgress = function () {
		var pages, score, pagesWin, i, len, difficult, difficultText;
		pagesWin = 0;
		pages = document.querySelectorAll('#work-space .page');
		score = document.getElementById('score-count');
		difficult = document.getElementById('difficult');

		KGDB.transaction(function(tx){
			tx.executeSql('SELECT * FROM info', [], function(tx, results){
				difficultText = (results.rows.item(1).dif).replace('-', ' ');
				difficult.innerHTML = '(' + difficultText + ')';
			});
		});

		setProgress = function () { // переопределение фунции
			pagesWin = 0;
			for (var i = 0, len = pages.length; i < len; i += 1) {
				if (parseInt(pages[i].getAttribute('figcount'), 10) === 0) {
					pagesWin += 1;
				}
			}
			score.innerHTML = pagesWin + ' / ' + len;
			return pagesWin - len;
		};

		setProgress(); // инициализация функции

	};

	function pageDone(page) {
		var splashScreen, clone, container, pos;

		function turnPage() {
			container.style[swipeVars.vendorPrefix + 'Transition'] = 'all 0.5s ease-out';
			container.style[swipeVars.vendorPrefix + 'Transform'] = 'translate(' + pos + 'px,0px)';
		}

		splashScreen = document.querySelector('.splash-screen-wrapper .splash-screen');
		clone = splashScreen.cloneNode(true);
		page.appendChild(clone);
		setTimeout(function () {
			clone.style.opacity = '1';
		}, 20);

		container = page.parentNode;
		pos = title.curPos(container);
		pos = pos - page.clientWidth;

		if (Math.abs(pos) >= container.clientWidth) {
			pos = pos + page.clientWidth;
		}

		setTimeout(turnPage, 2500);
	}

	var goodPosition = function (figure) {
		figure.className = 'new-figure good';
		fitElemToImage.lastArray[0] = 0;
		fitElemToImage.lastArray[1] = 0;
		fitElemToImage.lastArray[2] = 0;

		// check win for page
		if (figure.parentNode.getAttribute('figcount') <= figure.parentNode.querySelectorAll('.new-figure.good').length) {
			// TO DO: сделать привязку к странице, то есть что бы не выкидовалось по несколько раз окно с тем что типа вин
			// просто проверять есть ли такой дивак в этом окне (паедже) или нет, для алл вин вделать привязку
			// к #work-space
			// при повышении сложности просто дописывать сложность и перезагружать страницу
			console.log('ypa, proshol!');
			figure.parentNode.setAttribute('figcount', '0');
			getStartPos.figure = false;
			pageDone(figure.parentNode);
			isAllWin(setProgress());
		}

		// check win for all game, need add

	};

	function isAllWin(number) {
		var splashScreen;
		if (Math.round(number) === 0) {
			splashScreen = document.querySelector('.win-screen-wrapper');
			splashScreen.style.display = 'block';
			setTimeout(function () {
				splashScreen.style.opacity = 1;
			}, 100);
		}
	}

	function hideFigure(node) {
		var div = node;
		setTimeout(function () {
			div.style.display = 'none';
		}, 1500);

	}

	var badPosition = function (figure) {
		if (isTouch) {
			figure.addEventListener('touchstart', function () {
				event.stopPropagation()
			}, true);
			figure.addEventListener('touchmove', function () {
				event.preventDefault();
				event.stopPropagation()
			}, true);
		} else {
			figure.addEventListener('mousedown', function () {
				event.stopPropagation()
			}, true);
			figure.addEventListener('mousehmove', function () {
				event.stopPropagation()
			}, true);
		}
		figure.className = 'new-figure bad';
		hideFigure(figure);
	};

	var setZIndex = function () {
		var figures = document.querySelectorAll('.new-figure'),
			i;
		for (i = figures.length; i--;) {
			figures[i].style.zIndex = '';
		}
	};

	var getFigure = function () {

		getFigure.figure = this;

		if (getFigure.figure && getFigure.figure.className.indexOf('new-figure') == -1) {
			getFigure.figure = false;
			getStartPos.can = false;
//			return;
		}
		else {
			var style = getFigure.figure.getAttribute('style');
			var regExp = /\d+px/gi;
			getFigure.xStart = regExp.exec(style);
			getFigure.yStart = regExp.exec(style);
			getFigure.can = true;
			fitElemToImage.array = fiList.list[getCurPageNumber.number][getFigure.figure.title]; // get array of figures coordinates
			getFigure.figure.style.zIndex = '9999';
//		event.stopPropagation();

		}
		swipeVars.isScrollY = false;
		swipeVars.isScrollX = false;

	};

	var fitElemToImage = function (elem, x, y) { // I understood that is shitCode, but while I can't write better :(
		if (fitElemToImage.array) {
			for (iterator = (fitElemToImage.array).length; iterator--;) { // get each array in array of array
				if ((Math.abs((fitElemToImage.array)[iterator][0] - x) < (fitElemToImage.array)[iterator][2]) &&
					(Math.abs((fitElemToImage.array)[iterator][1] - y) < (fitElemToImage.array)[iterator][2])) {
					if (elem.getAttribute('class') != 'new-figure active') {
						elem.setAttribute('class', 'new-figure active'); // active
						fitElemToImage.lastArray = (fitElemToImage.array)[iterator];
					}
					iterator = false; // out from 'for'
				}
				else {
					if (elem.getAttribute('class') != 'new-figure') {
						elem.className = 'new-figure';       // unactivated
					}
				}
			}
		}
	};

	function setCSSSlider() {
		var body, size, style;
		body = document.getElementsByTagName('body')[0];
		size = document.getElementById('shape-slider-container').getElementsByTagName('div')[0].clientWidth >> 1;
		style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		style.innerHTML = '#work-space .page div {margin: -' + size + 'px 0 0 -' + size + 'px}';
		body.appendChild(style);
	}

	function setWinFormButton() {

		var difficult, nextDifficult, button, buttonWrapper, playAgain;

		buttonWrapper = document.querySelector('.button-wrapper');
		button = document.querySelector('.win-screen-wrapper .next-level');

		KGDB.transaction(function (tx) {
			tx.executeSql('SELECT * FROM info', [], function (tx, results) {

				function nextLevel() {
					KGDB.transaction(function (tx) {
						tx.executeSql('DELETE FROM info WHERE id=1');
						tx.executeSql('INSERT INTO info (id, dif) VALUES (1, "' + nextDifficult + '")');
						window.location = buttonWrapper.href;
					});
					event.stopPropagation();

				}

				difficult = results.rows.item(1).dif;
				switch (difficult) {
					case 'kinder-garden' :
						nextDifficult = 'school';
						break;
					case 'school' :
						nextDifficult = 'university';
						break;
					case 'university' :
						button.style.display = 'none';
						return;
				}

				button.addEventListener('click', nextLevel, true);

			});
		});

		buttonWrapper.addEventListener('click', function(){
			event.preventDefault();
		}, true);

		playAgain = document.querySelector('.play-again-win');

		playAgain.addEventListener('click', function () {
			window.location = playAgain.parentNode.href;
		}, true);

	}

	function removeHint() {

		var style;

		KGDB.transaction(function(tx){
			tx.executeSql('SELECT * FROM info', [], function(tx, results){

				if (results.rows.item(1).dif === 'university') {
					style = document.createElement('style');
					style.setAttribute('type', 'text/css');
					style.innerHTML = '.new-figure.active { box-shadow: none; }';
					document.getElementsByTagName('body')[0].appendChild(style);
				}

			});
		});

	}

	function setStartButton() {
		var button;
		button = document.querySelector('.splash-screen-find-it .start');

		function hideScreen() {
			var screen, style, body;
			body = document.querySelector('body');
			screen = document.querySelector('.splash-screen-find-it');
			screen.style.display = 'none';
			style = document.createElement('style');
			style.setAttribute('type', 'text/css');
			style.innerHTML = '#find-it-page .page {opacity: 1;}';
			body.appendChild(style);
			showScroll();
		}

		if (isTouch) {
			button.addEventListener('touchstart', hideScreen, false);
		} else {
			button.addEventListener('click', hideScreen, false);
		}

	}


	function showScroll() {

		var scrollBlock, maxPos;
		scrollBlock = document.getElementById('shape-slider-container');
		maxPos = scrollBlock.clientHeight - scrollBlock.parentNode.clientHeight;

		setTimeout(function(){

			scrollBlock.style[swipeVars.vendorPrefix + 'Transition'] = 'all 0.5s ease-out';
			scrollBlock.style[swipeVars.vendorPrefix + 'Transform'] = 'translate(0px, -' + maxPos + 'px)';

			setTimeout(function(){
				scrollBlock.style[swipeVars.vendorPrefix + 'Transform'] = 'translate(0px, 0px)';
			}, 700);

		}, 200);

	}

	var run = function () {
		setRightSidePos();
		setSmallFigures();
		setSmallFiguresSize();
		setCSSSlider();
		setProgress(); // initializing function
		setWinFormButton();
		removeHint();
		setStartButton();
//		showScroll();
	};

	window.addEventListener('load', run, false);

}());

