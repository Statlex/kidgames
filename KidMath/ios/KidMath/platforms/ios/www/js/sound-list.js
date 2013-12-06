(function (win) {

	"use strict";
	/*global window, document, console, alert */

    var path = window.location.pathname;
    var phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);

	var pathPrefix ='sound/';

	win.soundList = {
		goodAnswer: pathPrefix + 'good-answer.mp3',
		click: pathPrefix + 'click.mp3',
		endSection: pathPrefix + 'end-section.mp3',
		badAnswer: pathPrefix + 'bad-answer.mp3',
		swipe: pathPrefix + 'swipe.mp3'
	}

}(window));
