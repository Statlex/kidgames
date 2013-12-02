(function () {

	"use strict";
	/*global window, document, console, state, alert, swipe, parseInt, setTimeout, swipeVars, localStorage */

	function getRandomNumber(min, max) {
		return Math.floor((Math.random() * (max - min)) + min);
	}

	function getRandomItem(array) {
		return array[getRandomNumber(0, array.length)];
	}

	var WSPercent, figureWrapper, isTouch, meta, difficult, vendorPrefix, difficultGlobal;

	WSPercent = 0.8;
	figureWrapper = 1 - WSPercent;
	vendorPrefix = swipeVars.vendorPrefix;

	meta = {
		curLevel: 0,
		maxLevel: 10,
		curTimeForRemember: 10,
		timeQ: 0.96, // -4% for each pass
		curFigure: '',
		curError: 0,
		maxError: 2
	};


	KGDB.transaction(function (tx) {
		tx.executeSql('SELECT * FROM info', [], function (tx, results) {

			var difficult = results.rows.item(1).dif;

			if (difficult === 'school') {
				meta.curTimeForRemember = 9;
			}

			if (difficult === 'university') {
				meta.curTimeForRemember = 8;
				meta.maxError = 1;
				meta.maxLevel = 100;
			}

		});
	});

	isTouch = (function () {
		return document.documentElement.hasOwnProperty('ontouchstart');
	}());

	function setBodySize() {
		var body;
		body = document.getElementsByTagName('body')[0];
		body.style.width = document.documentElement.clientWidth + 'px';
		body.style.height = document.documentElement.clientHeight + 'px';
	}

	function setWorkSpaceSize() {
		var workSpace, statusBar;
		workSpace = document.getElementsByClassName('work-space')[0];
		statusBar = document.getElementById('status-bar');
		workSpace.style.height = parseInt((document.documentElement.clientHeight - statusBar.clientHeight) * WSPercent, 10) + 'px';
		workSpace.style.paddingTop = statusBar.clientHeight + 'px';
	}

	function setFigureContainerSize() {
		var figuresForSelect, figureContainer, statusBar, figures, height, i, len, path, figure;
		path = 'images/double-pos-figures/';
		statusBar = document.getElementById('status-bar');
		figuresForSelect = document.querySelector('.figures-for-select');
		figureContainer = figuresForSelect.querySelector('.figure-container');
		figures = figuresForSelect.querySelectorAll('.figure-container > div');
		figuresForSelect.style.height = parseInt((document.documentElement.clientHeight - statusBar.clientHeight) * figureWrapper, 10) + 'px';
		height = parseInt(figuresForSelect.style.height, 10);
		for (i = 0, len = figures.length; i < len; i += 1) {
			figures[i].style.height = height + 'px';
			figures[i].style.width = height + 'px';
			figure = figures[i].className;
			figures[i].style.backgroundImage = 'url(' + path + figure + '.png' + ')';
		}
		figureContainer.style.width = parseInt(figures[0].style.width, 10) * len + 'px';
	}

	function showDifficult() {
		var difficult, place;
		place = document.getElementById('difficult');

		KGDB.transaction(function (tx) {
			tx.executeSql('SELECT * FROM info', [], function (tx, results) {

				difficult = results.rows.item(1).dif;
				difficultGlobal = difficult;
				place.innerHTML = '(' + difficult + ')';

			});
		});
	}

	function showLevel() {
		var place;
		place = document.getElementById('score-count');
		place.innerHTML = meta.curLevel.toString(10);
	}

	function addPucture(elem, figure) {
		var path, figureList, image;
		figureList = {                 // 'star', 'triangle', 'square', 'rhomb', 'oval', 'circle', 'rectangle'
			star: 4, // max count for figure
			triangle: 5,
			square: 4,
			rhomb: 3,
			oval: 3,
			circle: 6,
			rectangle: 5
		};
		image = figure + '-' + getRandomNumber(0, figureList[figure]) + '.png';
		path = 'images/figure-picture/';
		elem.style.backgroundPosition = '0 0';
		elem.style.backgroundImage = 'url(' + path + image + ')';
	}

	function addAnimation(elem) {
		var anim;
		anim = getRandomNumber(0, 7); // for example - (0, 3) => [0, 2]
		elem.className = 'animation-' + anim;
	}

	function setDefInput() {
		var buttons, i, len;
		buttons = document.querySelectorAll('.figure-container div');
		for (i = 0, len = buttons.length; i < len; i += 1) {
			buttons[i].style.opacity = '1';
		}
	}

	function showWarning() {
		var alertWindow, figure;
		alertWindow = document.querySelector('.hint-alert-wrapper');
		alertWindow.style.opacity = '1';
		figure = document.querySelector('.work-space > div');
		figure.style[vendorPrefix + 'Transition'] = 'none';
		figure.style.opacity = '0';
	}

	function createFigure() {

		var figure, figureSize, startPos, endPos, colors, figureArray, color, figureDOM, figureDOMInner, path, WS, yStartPos, yEndPos;
		WS = document.querySelector('.work-space');
		colors = ['blue', 'green', 'orange', 'red', 'violet', 'white', 'yellow'];
		figureArray = ['star', 'triangle', 'square', 'rhomb', 'oval', 'circle', 'rectangle'];
		figure = getRandomItem(figureArray);
		meta.curFigure = figure;
		color = getRandomItem(colors);
		figureSize = parseInt(document.documentElement.clientHeight * 0.5, 10);
		yStartPos = getRandomNumber(0, parseInt(WS.style.height, 10) - figureSize);
		yEndPos = getRandomNumber(0, parseInt(WS.style.height, 10) - figureSize);
		startPos = -figureSize;
		endPos = document.documentElement.clientWidth;
		path = 'images/figure-color/';

		figureDOM = document.createElement('div');
		figureDOMInner = document.createElement('div');
		figureDOM.appendChild(figureDOMInner);

		figureDOM.style.width = figureSize + 'px';
		figureDOM.style.height = figureSize + 'px';
//		figureDOM.style[vendorPrefix + 'Transform'] = 'translate(' + startPos + 'px, ' + yStartPos + 'px)';
		figureDOM.style.top = yStartPos + 'px'; // this is fix android devices.
		figureDOM.style.left = startPos + 'px';
		figureDOM.style[vendorPrefix + 'Transition'] = 'all ' + meta.curTimeForRemember + 's linear';


		figureDOMInner.style.width = figureSize + 'px';
		figureDOMInner.style.height = figureSize + 'px';

		figureDOMInner.style.backgroundImage = 'url(' + path + color + '.png)';
		figureDOMInner.style.backgroundPosition = '0 -' + (figureArray.indexOf(figure) * figureSize) + 'px';

		figureDOM.addEventListener(vendorPrefix + 'TransitionEnd', showWarning, false);

		WS.innerHTML = '';

//		if (((difficult === 'university') || (difficult === 'school' && meta.curLevel >= 4)) && Math.random() > 0.25) {
		if (Math.random() > 0.15) {
			addPucture(figureDOMInner, figure);
		}

		if ( ( (difficultGlobal === 'university') || (difficultGlobal === 'school' && meta.curLevel >= 4) ) && Math.random() > 0.2) {
			addAnimation(figureDOMInner);
		}

		WS.appendChild(figureDOM);

		setTimeout(function () {
			figureDOM.style[vendorPrefix + 'Transform'] = 'translate(' + (endPos - startPos) + 'px, ' + (yEndPos - yStartPos) + 'px)';
//			figureDOM.style.top = yEndPos + 'px';
//			figureDOM.style.left = endPos + 'px';

		}, 10);
		setDefInput();
	}

	// kinder-garden - одна фигура - простая, без поворотов
	// school - врямя сразу на секунду меньше, фигура поворачивается
	// и мигает, после 4-го левела появлятся картинки вместо фигурок
	// university - время ещё на фигурку меньше, сразу появляются всякие
	// картинки вместо фигурок, после 4-го - всякое кручение и мигание

	function showCurMistake() {
		var mistakeNode, error;
		mistakeNode = document.querySelector('#mistake span');
		error = meta.maxError - meta.curError;
		error = (error < 0) ? 0 : error;
		mistakeNode.innerHTML = error;
	}

	function startPage() {
		var goodScreen, badScreen, level, score;
		// // set some parameters
		meta.curError = 0;
		showCurMistake();
		// set level
		meta.curLevel += 1;
		if (meta.curLevel >= meta.maxLevel) {
			meta.curLevel = meta.maxLevel;
		}
		level = meta.curLevel;
		score = document.getElementById('score-count');
		score.innerHTML = level.toString(10);
		// hide extra screen
		goodScreen = document.getElementById('good-answer');
		badScreen = document.getElementById('bad-answer');
		goodScreen.setAttribute('style', '');
		badScreen.setAttribute('style', '');

		createFigure();
		meta.curTimeForRemember *= meta.timeQ;
		setDefInput();

	}

	function showBadScreen() {
		var WS;
		WS = document.querySelector('.work-space');
		WS.innerHTML = '';
		setTimeout(function () {
			var screen, figures;
			screen = document.querySelector('.failed-screen-wrapper');
			screen.style.display = 'block';
			setTimeout(function () {
				screen.style.opacity = '1';
			}, 10);
			figures = document.querySelector('.figures-for-select');
			figures.style.display = 'none';
		}, 1000);
	}

	function showEndLevelScreen() {
		setTimeout(function () {
			var screen;
			screen = document.querySelector('.win-screen-wrapper');
			screen.style.display = 'block';
			setTimeout(function () {
				screen.style.opacity = 1;
			}, 10);
		}, 150);
	}


	function setButtons() {
		var buttons, click, i, len, goodScreen, check, WS, redScreen, alertWindow;
		alertWindow = document.querySelector('.hint-alert-wrapper');
		redScreen = document.getElementById('mistake-answer');
		WS = document.querySelector('.work-space');
		goodScreen = document.getElementById('good-answer');
		function goodAnswer() {
			goodScreen.style.display = 'block';
			WS.innerHTML = '';
			alertWindow.style.opacity = '0';
			if (meta.curLevel >= meta.maxLevel) {
				WS.style.display = 'none';
				showEndLevelScreen();
				return;
			}
			setTimeout(function () {
				goodScreen.style.opacity = 1;
			}, 10);
			setTimeout(function () {
				if (goodScreen.style.display === 'block') {
					startPage();
				}
			}, 2 * 1000);
		}

		function showRedScreen() {
			redScreen.style.opacity = '1';
			setTimeout(function () {
				redScreen.style.opacity = '0';
			}, 200);
		}

		function badAnswer(node) {
			node.style.opacity = '0';
			meta.curError += 1;
			showRedScreen();
			if (meta.curError > meta.maxError) {
				showBadScreen();
				(document.getElementById('mistake')).style.display = 'none';
			}
			showCurMistake();
		}

		check = function () {
			if (this.style.opacity === '0') {
				return;
			}
			if (this.className === meta.curFigure) {
				goodAnswer();
			} else {
				this.style.opacity = '0';
				badAnswer(this);
			}
		};

		buttons = document.querySelectorAll('.figures-for-select .figure-container div');
		if (isTouch) {
			click = 'touchstart';
		} else {
			click = 'click';
		}
		for (i = 0, len = buttons.length; i < len; i += 1) {
			buttons[i].addEventListener(click, check, false);
		}
	}

	function showSplashScreen() {
		var splashScreen, button;

		showDifficult();
		showLevel();

		function startGame() {

			var mistakeNode;
			mistakeNode = document.getElementById('mistake');
			mistakeNode.style.display = 'block';

			if (splashScreen.style.display === 'block') {
				splashScreen.style.display = 'none';
			}

			setButtons();
			startPage();
		}

		splashScreen = document.querySelector('.splash-screen');
		splashScreen.style.display = 'block';
		button = splashScreen.querySelector('.start');
		if (isTouch) {
			button.addEventListener('touchstart', startGame, false);
		} else {
			button.addEventListener('click', startGame, false);
		}
	}

	function addSwipe() {
		var figuresWrapper, figuresContainer;
		figuresWrapper = document.querySelector('.figures-for-select');
		figuresContainer = figuresWrapper.querySelector('.figure-container');
		if (figuresContainer.clientWidth >= figuresWrapper.clientWidth) {
			swipe('.figures-for-select .figure-container', '{vertical : false}');
		}
	}

	function setGoodAnswerScreen() {
		var screen, click;
		screen = document.getElementById('good-answer');
		click = isTouch ? 'touchstart' : 'click';
		screen.addEventListener(click, startPage, false);
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


	function setFailFormButton() {

		var buttonWrapper, prevLevel, nextLevel, playAgain;

		function setLevel(elem) {

			var className = elem.className,
				endDif;


			KGDB.transaction(function (tx) {
				tx.executeSql('SELECT * FROM info', [], function (tx, results) {
					var difficult = results.rows.item(1).dif;
					endDif = difficult;

					if (className === 'next-level') {
						switch (difficult) {
							case 'kinder-garden':
								endDif = 'school';
								break;
							case 'school':
								endDif = 'university';
								break;
						}
					} else {
						switch (difficult) {
							case 'university':
								endDif = 'school';
								break;
							case 'school':
								endDif = 'kinder-garden';
								break;
						}
					}

				});

				KGDB.transaction(function(tx) {
					tx.executeSql('DELETE FROM info WHERE id=1');
					tx.executeSql('INSERT INTO info (id, dif) VALUES (1, "' + endDif + '")');
					window.location = elem.parentNode.href;
				});

			});


			event.stopPropagation();

		} // setLevel


		buttonWrapper = document.querySelector('.failed-screen-wrapper .button-wrapper');

		buttonWrapper.addEventListener('click', function () {
			event.preventDefault();
			return false;
		}, true);

		prevLevel = buttonWrapper.querySelector('.prev-level');
		nextLevel = buttonWrapper.querySelector('.next-level');
		playAgain = buttonWrapper.querySelector('.play-again');

		prevLevel.addEventListener('click', function () {
			setLevel(prevLevel);
		}, false);

		nextLevel.addEventListener('click', function () {
			setLevel(nextLevel);
		}, false);

		playAgain.addEventListener('click', function () {
			window.location = playAgain.parentNode.href;
		}, true);

		KGDB.transaction(function (tx) {
			tx.executeSql('SELECT * FROM info', [], function (tx, results) {
				var difficult = results.rows.item(1).dif;
				if (difficult === 'kinder-garden') {
					prevLevel.style.display = 'none';
				}

			});
		});

		nextLevel.style.display = 'none';

	}

	function run() {
		setFailFormButton();
		setBodySize();
		setWorkSpaceSize();
		setFigureContainerSize();
		showSplashScreen();
		addSwipe();
		setWinFormButton();
		setGoodAnswerScreen();
	}

	window.addEventListener('load', run, false);

}());

(function () {

	"use strict";
	/*global window, document */

	function noBodyScroll() {
		(document.getElementsByTagName('body')[0]).addEventListener('touchmove', function () {
			window.event.preventDefault();
		}, false);
	}

	window.addEventListener('load', noBodyScroll, false);

}());
