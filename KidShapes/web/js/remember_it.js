 (function () {
  
  "use strict";
  /*global window, document, console, alert */
  
  function run() {
  var div, body;
  div = document.createElement('div');
  div.setAttribute('id', 'deb');
  div.style.position = 'absolute';
  div.style.left = '20px';
  div.style.top = '20px';
  body = document.querySelector('body');
  body.appendChild(div);
  }
  
  window.addEventListener('load', run, false);
  
  }());
  
  
  (function () {
   
   "use strict";
   /*global window, document, console, alert, clearInterval, state, swipe, swipeVars, setTimeout, localStorage */
   
   var isTouch, remItVars, WSPercent, figureWrapper, showMistake;
   
   function deb(str) {
   var div, body;
   div = document.getElementById('deb');
   div.innerHTML += str + '<br>';
   body = document.querySelector('body');
   body.appendChild(div);
   }
   
   function getRandomNumber(min, max) {
   return Math.floor((Math.random() * (max - min)) + min);
   }
   
   function getRandomItem(array) {
   return array[getRandomNumber(0, array.length)];
   }
   
   function addPucture(elem, figure) {
   var path, figureList, image;
   figureList = {                 // 'star', 'triangle', 'square', 'rhomb', 'oval', 'circle', 'rectangle'
   star: 4,    // max count for figure
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
   
   showMistake = function () {
   var mistakeWrapper, mistakeTag, mistake;
   mistakeWrapper = document.getElementById('mistake');
   mistakeTag = mistakeWrapper.querySelector('span');
   mistakeWrapper.style.display = 'block';
   showMistake = function () {
   mistake = remItVars.maxError - remItVars.curErrors;
   mistake = (mistake > 0) ? mistake : 0;
   mistakeTag.innerHTML = mistake;
   };
   showMistake();
   };
   
   WSPercent = 0.8;
   figureWrapper = 1 - WSPercent;
   
   isTouch = (function () {
              return document.documentElement.hasOwnProperty('ontouchstart');
              }());
   
   remItVars = {
   curLevel: 1,  //0
   maxLevel: 10, //
   getLevel: function () {
   this.curLevel += 1;
   return remItVars.curLevel;
   },
   curTimeForRemember: 10,       // 10
   getTimeForRemember: function () {
   this.curTimeForRemember *= 0.96; // - 4%
   return this.curTimeForRemember;
   },
   curErrors: 0,
   maxError: 2
   };
   
   var difficultGlobal;
   
   KGDB.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM info', [], function (tx, results) {
                                  
                                  var difficult = results.rows.item(1).dif;
                                  difficultGlobal = difficult;
                                  
                                  if (difficult !== 'kinder-garden') {
                                  remItVars.curTimeForRemember = 9;
                                  }
                                  
                                  if (difficult === 'university') {
                                  remItVars.curTimeForRemember = 8;
                                  remItVars.maxLevel = 100;
                                  }
                                  
                                  });
                    });
   
   function showLevel() {
   var score, difficultNode, difficultText;
   
   function endLevel() {
   var winScreen, hide, i, len, elem;
   hide = ['figures-for-select', 'timer-wrapper', 'work-space'];
   for (i = 0, len = hide.length; i < len; i += 1) {
   elem = document.querySelector('.' + hide[i]);
   elem.style[swipeVars.vendorPrefix + 'Transition'] = 'opacity 0s linear';
   elem.style.opacity = '0';
   }
   winScreen = document.querySelector('.win-screen-wrapper');
   winScreen.style.display = 'block';
   setTimeout(function () {
              winScreen.style.opacity = '1';
              }, 10);
   }
   
   score = document.querySelector('#score-count');
   difficultNode = document.getElementById('difficult');
   
   
   KGDB.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM info', [], function (tx, results) {
                                  
                                  var difficult = results.rows.item(1).dif;
                                  
                                  difficultText = difficult.replace('-', ' ');
                                  difficultNode.innerHTML = '(' + difficultText + ')';
                                  if (remItVars.curLevel <= remItVars.maxLevel) {
                                  score.innerHTML = remItVars.curLevel;
                                  } else {
                                  endLevel();
                                  }
                                  
                                  });
                    });
   
   }
   
   function createFigures() {
   var i, len, difficult, level, figures, figure, figureArray, workSpace, figureSize, path, color, colors, minXPos, minYPos, maxXPos, maxYPos, transformStyle;
   
   remItVars.curErrors = 0;
   
   path = 'images/figure-color/';
   colors = ['blue', 'green', 'orange', 'red', 'violet', 'white', 'yellow'];
   figureArray = ['star', 'triangle', 'square', 'rhomb', 'oval', 'circle', 'rectangle'];
   workSpace = document.querySelector('.work-space');
   figureSize = parseInt(workSpace.clientHeight * 0.65, 10);
   maxXPos = workSpace.clientWidth;
   maxYPos = parseInt(workSpace.style.height, 10);
   minXPos = parseInt(figureSize / 2, 10);
   minYPos = parseInt(figureSize / 2, 10);
   workSpace.innerHTML = '';
   difficult = difficultGlobal;
   level = remItVars.getLevel() - 1;
   level = (level <= 4) ? level : 4;
   figures = [];
   for (i = 0, len = level; i < len; i += 1) { // created divs and add them to work space
   figure = getRandomItem(figureArray);
   if (difficultGlobal === 'kinder-garden') {
   if (!color) {
   color = getRandomItem(colors);
   }
   } else {
   color = getRandomItem(colors);
   }
   figures[i] = document.createElement('div');
   figures[i].style.width = figureSize + 'px';
   figures[i].style.height = figureSize + 'px';
   figures[i].style.backgroundImage = 'url(' + path + color + '.png)';
   figures[i].style.backgroundPosition = '0 -' + (figureArray.indexOf(figure) * figureSize) + 'px';
   
   switch (i) {
   case 0:
   figures[i].style.left = getRandomNumber(minXPos, (maxXPos / 2) - figureSize) + 'px';
   figures[i].style.top = getRandomNumber(minYPos, (maxYPos / 2) - figureSize) + 'px';
   break;
   case 1:
   figures[i].style.left = getRandomNumber((maxXPos / 2), maxXPos - figureSize) + 'px';
   figures[i].style.top = getRandomNumber(minYPos, (maxYPos / 2) - figureSize) + 'px';
   break;
   case 2:
   figures[i].style.left = getRandomNumber((maxXPos / 2), maxXPos - figureSize) + 'px';
   figures[i].style.top = getRandomNumber((maxYPos / 2), maxYPos - figureSize) + 'px';
   break;
   case 3:
   figures[i].style.left = getRandomNumber(minXPos, (maxXPos / 2) - figureSize) + 'px';
   figures[i].style.top = getRandomNumber((maxYPos / 2), maxYPos - figureSize) + 'px';
   break;
   default:
   console.log('not place for ' + i + 'th figure, select random place.');
   figures[i].style.left = getRandomNumber(minXPos, maxXPos - figureSize) + 'px';
   figures[i].style.top = getRandomNumber(minYPos, maxYPos - figureSize) + 'px';
   }
   
   figures[i].className = 'remember-figure';
   figures[i].setAttribute('figure', figure);
   //			if ((difficult === 'university' || (difficult === 'school' && remItVars.curLevel >= 4)) && Math.random() < 0.8) {
   if (Math.random() > 0.15) {
   addPucture(figures[i], figure);
   }
   workSpace.appendChild(figures[i]);
   }
   
   if (difficult === 'school' || difficult === 'university') {
   for (i = 0, len = figures.length; i < len; i += 1) {
   transformStyle = 'scale(' + (0.5 + Math.random()) + ')';
   if (figures[i].style.backgroundImage.indexOf('images/figure-color') === -1) {
   transformStyle += ' rotate(' + getRandomNumber(0, 360) + 'deg)';
   }
   figures[i].style[swipeVars.vendorPrefix + 'Transform'] = transformStyle;
   }
   }
   
   
   if (difficult === 'university') {
   for (i = 0, len = figures.length; i < len; i += 1) {
   if (remItVars.curLevel >= 4 && Math.random() < 0.8) {
   figures[i].className += ' animation-' + getRandomNumber(0, 10);
   }
   }
   }
   showMistake();
   }
   
   function showFigureForSelected() {
   var figuresForSelect, WSFigures, i, len;
   figuresForSelect = document.querySelector('.figures-for-select');
   figuresForSelect.style.display = 'block';
   WSFigures = document.querySelectorAll('.work-space .remember-figure');
   for (i = 0, len = WSFigures.length; i < len; i += 1) {
   WSFigures[i].style.display = 'none';
   }
   }
   
   function hideTimer() {
   var timerWrapper;
   timerWrapper = document.querySelector('.timer-wrapper');
   timerWrapper.style.display = 'none';
   }
   
   function timer() {
   var timeForRemember, timerDiv, figuresForSelect, prefix, timerWrapper;
   prefix = swipeVars.vendorPrefix;
   
   remItVars.curErrors = 0;
   
   
   // hide extra figures
   figuresForSelect = document.querySelector('.figures-for-select');
   figuresForSelect.style.display = 'none';
   
   timerWrapper = document.querySelector('.timer-wrapper');
   timerWrapper.style.display = 'block';
   
   timerDiv = document.getElementById('timer');
   timeForRemember = remItVars.getTimeForRemember();
   
   timerDiv.style[prefix + 'Transition'] = 'width 0s linear';
   timerDiv.style.width = '100%';
   
   timerDiv.style[prefix + 'Transition'] = 'width ' + timeForRemember + 's linear';
   setTimeout(function () {
              timerDiv.style.width = '0%';
              }, 10);
   
   timerDiv.addEventListener(prefix + 'TransitionEnd', function () {
                             var figuresForSelect;
                             figuresForSelect = document.querySelector('.figures-for-select');
                             if (figuresForSelect.style.display === 'block') {
                             return;
                             }
                             hideTimer();
                             showFigureForSelected();
                             }, false);
   
   }
   
   function setBodySize() {
   var body = document.getElementsByTagName('body')[0];
   body.style.width = document.documentElement.clientWidth + 'px';
   body.style.height = document.documentElement.clientHeight + 'px';
   }
   
   function setWorkSpaceSize() {
   var workSpace = document.getElementsByClassName('work-space')[0],
   statusBar = document.getElementById('status-bar');
   workSpace.style.height = parseInt((document.documentElement.clientHeight - statusBar.clientHeight) * WSPercent, 10) + 'px';
   workSpace.style.paddingTop = statusBar.clientHeight + 'px';
   }
   
   function setFigureContainerSize() {
   var figuresForSelect, figureContainer, statusBar, figures, height, i, len, path, figure, span;
   path = 'images/double-pos-figures/';
   statusBar = document.getElementById('status-bar');
   console.log(statusBar);
   figuresForSelect = document.querySelector('.figures-for-select');
   console.log(figuresForSelect);
   figureContainer = figuresForSelect.querySelector('.figure-container');
   console.log(figureContainer);
   figures = figuresForSelect.querySelectorAll('.figure-container > div');
   console.log(figures + ' !!!' + figures.length);
   figuresForSelect.style.height = parseInt((document.documentElement.clientHeight - statusBar.clientHeight) * figureWrapper, 10) + 'px';
   console.log('figuresForSelect.style.height - ' + figuresForSelect.style.height);
   height = parseInt(figuresForSelect.style.height, 10);
   console.log('height - ' + height);
   for (i = 0, len = figures.length; i < len; i += 1) {
   figures[i].style.height = height + 'px';
   figures[i].style.width = height + 'px';
   span = figures[i].querySelector('span');
   span.style.display = 'block';
   span.style.width = height + 'px';
   span.style.height = height + 'px';
   figure = figures[i].className;
   span.style.backgroundImage = 'url(' + path + figure + '.png' + ')';
   }
   figureContainer.style.width = parseInt(figures[0].style.width, 10) * len + 'px';
   }
   
   function showSplashScreen() {
   var splashScreen, button;
   
   function startGame() {
   if (splashScreen.style.display === 'block') {
   splashScreen.style.display = 'none';
   }
   
   setTimeout(setIGotIt, 1000);
   
   createFigures();
   timer();
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
   
   function getWorkSpaceFigures() {
   var workSpace, figures, figuresArray, i, len, attr;
   workSpace = document.querySelector('.work-space');
   figures = workSpace.getElementsByTagName('div');
   figuresArray = [];
   for (i = 0, len = figures.length; i < len; i += 1) {
   attr = figures[i].getAttribute('figure');
   if (figuresArray.indexOf(attr) === -1) {
   figuresArray.push(attr);
   }
   }
   figuresArray.sort();
   return figuresArray;
   }
   
   function getCheckFigures() {
   var figures, attr, i, len, figuresArray;
   figures = document.querySelectorAll('.figures-for-select input:checked');
   figuresArray = [];
   for (i = 0, len = figures.length; i < len; i += 1) {
   attr = figures[i].getAttribute('figure');
   if (figuresArray.indexOf(attr) === -1) {
   figuresArray.push(attr);
   }
   }
   figuresArray.sort();
   return figuresArray;
   }
   
   function defaultAllInput() {
   var inputs, i, len;
   inputs = document.querySelectorAll('.figures-for-select .figure-container input'); // defaulted all input
   for (i = 0, len = inputs.length; i < len; i += 1) {
   inputs[i].checked = false;
   }
   }
   
   function checkAnswer() {
   var inputs, i, len, check;
   inputs = document.querySelectorAll('.figures-for-select .figure-container input');
   check = function () {
   var WSFigures, checkFigures, i, len, allDone, input;
   
   function showFigure(name) {
   var WSFigures, i, len;
   WSFigures = document.querySelectorAll('.work-space div[figure="' + name + '"]');
   for (i = 0, len = WSFigures.length; i < len; i += 1) {
   WSFigures[i].style.display = 'block';
   }
   }
   
   function badAnswer(name) {
   var badFigure, badAnswerDiv, failedScreen, figuresForSelect;
   
   function showNeededFigure() {
   var figures, i, len;
   figures = document.querySelectorAll('.work-space div');
   for (i = 0, len = figures.length; i < len; i += 1) {
   figures[i].style.display = 'block';
   }
   }
   
   function hideTopMenuButton() {
   var buttons, button, i, len;
   buttons = ['wrapper-button', 'about', 'volume'];
   for (i = 0, len = buttons.length; i < len; i += 1) {
   button = document.getElementById(buttons[i]);
   button.style.display = 'none';
   }
   }
   
   badAnswerDiv = document.getElementById('bad-answer');
   badAnswerDiv.style.display = 'block';
   setTimeout(function () {
              badAnswerDiv.style.opacity = '1';
              }, 10);
   
   setTimeout(function () {
              if (badAnswerDiv.style.display === 'block') {
              badAnswerDiv.style.opacity = '0';
              setTimeout(function () {
                         badAnswerDiv.style.display = 'none';
                         }, 500);
              }
              }, 2000);
   
   badFigure = badAnswerDiv.querySelector('.bad-figure');
   badFigure.style.backgroundImage = 'url(images/figures/' + name + '.png)';
   
   remItVars.curErrors += 1;
   if (remItVars.curErrors > remItVars.maxError) {
   failedScreen = document.querySelector('.failed-screen-wrapper');
   figuresForSelect = document.querySelector('.figures-for-select');
   figuresForSelect.style.display = 'none';
   failedScreen.style.display = 'block';
   // show needed figure
   showNeededFigure();
   hideTopMenuButton();
   }
   showMistake();
   }
   
   function pageDone() {
   showLevel();
   var splashScreen;
   splashScreen = document.getElementById('good-answer');
   splashScreen.style.display = 'block';
   setTimeout(function () {
              splashScreen.style.opacity = '1';
              }, 10);
   
   splashScreen.addEventListener(swipeVars.vendorPrefix + 'TransitionEnd', function () {
                                 if (splashScreen.style.opacity === '0') {
                                 splashScreen.style.display = 'none';
                                 }
                                 }, false);
   
   
   setTimeout(function () {
              if (splashScreen.style.display === 'block') {
              splashScreen.style.opacity = '0';
              defaultAllInput();
              timer();
              createFigures();
              }
              }, 5 * 1000);
   
   }
   
   input = this;
   allDone = true;
   WSFigures = getWorkSpaceFigures();
   checkFigures = getCheckFigures();
   
   if (!(input.checked)) {     // don't uncheck if this is checked
   input.checked = true;
   }
   
   if (WSFigures.length === 0) {
   input.checked = false;
   } else {
   // comparison figures
   for (i = 0, len = checkFigures.length; i < len; i += 1) {
   if (WSFigures.indexOf(checkFigures[i]) !== -1) {
   showFigure(checkFigures[i]);
   } else {
   allDone = false;
   input.checked = false; // this is work
   badAnswer(input.getAttribute('figure'));
   }
   }
   
   if (WSFigures.length === checkFigures.length && allDone) {
   pageDone();
   }
   }
   
   };
   
   for (i = 0, len = inputs.length; i < len; i += 1) {
   inputs[i].addEventListener('change', check, false);
   }
   
   }
   
   function setBadAnswer() {
   var badAnswer;
   
   function hide() {
   badAnswer.style.opacity = '0';
   badAnswer.addEventListener(swipeVars.vendorPrefix + 'TransitionEnd', function () {
                              if (badAnswer.style.opacity === '0') {
                              badAnswer.style.display = 'none';
                              }
                              }, false);
   }
   
   badAnswer = document.getElementById('bad-answer');
   if (isTouch) {
   badAnswer.addEventListener('touchend', hide, false);
   } else {
   badAnswer.addEventListener('mouseup', hide, false);
   }
   }
   
   function setGoodAnswer() {
   var splashScreen;
   
   function nextLevel() {
   
   defaultAllInput();
   
   splashScreen.style.opacity = '0';
   splashScreen.addEventListener(swipeVars.vendorPrefix + 'TransitionEnd', function () {
                                 if (splashScreen.style.opacity === '0') {
                                 splashScreen.style.display = 'none';
                                 }
                                 }, false);
   
   createFigures();
   timer();
   }
   
   splashScreen = document.getElementById('good-answer');
   
   if (isTouch) {
   splashScreen.addEventListener('touchend', nextLevel, false);
   } else {
   splashScreen.addEventListener('mouseup', nextLevel, false);
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
   
   function setIGotIt() {
   var node;
   
   function stopTracking() {
   hideTimer();
   showFigureForSelected();
   
   }
   
   node = document.querySelector('.work-space');
   
   node.addEventListener('click', stopTracking, false);
   }
   
   function run() {
   
   //setIGotIt();
   //deb('run');
   setBodySize();
   //deb('setBodySize()');
   setWorkSpaceSize();
   //deb('setWorkSpaceSize()');
   setFigureContainerSize();
   //deb('setFigureContainerSize()');
   showSplashScreen();
   //deb('showSplashScreen()');
   showLevel();
   //deb('showLevel()');
   checkAnswer();
   //deb('checkAnswer()');
   addSwipe();
   //deb('addSwipe()');
   setBadAnswer();
   //deb('setBadAnswer()');
   setGoodAnswer();
   //deb('setGoodAnswer()');
   setWinFormButton();
   //deb('setWinFormButton()');
   setFailFormButton();
   //deb('remember it - run');
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