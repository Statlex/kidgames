(function () {

	"use strict";
	/*global window, document, console, alert */

	var db;

	db = window.openDatabase('kgdb', '1.0', 'difficult', 1024 * 1024);

	window.KGDB = db;

}());
