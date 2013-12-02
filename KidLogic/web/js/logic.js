(function () {

	"use strict";
	/*global window, document, console, alert, logic, viewer, utils, splashScreen */

	window.logic = window.logic || {};

	logic.goodAnswer = function(node) {
		utils.score.addToScore(5);
		node.removeAttribute('onclick');
		window.splashScreen.showOk('viewer.showCategory(\'' + utils.info.curCategory + '\')');
	};

	logic.badAnswer = function(node) {
        var noTransition;
        noTransition = function() {
            this.style[utils.venPre + 'Transition'] = 'none';
        };
		utils.score.addToScore(-3);
		utils.score.show();
		node.removeAttribute('onclick');
		node.className += ' gray-answer';
        node.addEventListener(utils.venPre + 'TransitionEnd', noTransition, false);
	};

}());
