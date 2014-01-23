(function () {

	"use strict";
	/*global window, document, console, alert */

	var db = openDatabase("myDataBase", "0.1", "A list of to do items.", 40 * 1024 * 1024);
	if (!db) {
		console.log("---- Failed to connect to database. ----");
	}

	// drop table
	db.transaction(function (tx) {
		tx.executeSql('DELETE FROM SimpleTable');
	});

	// create table if table is not exist
	db.transaction(function (tx) {
		tx.executeSql("SELECT COUNT(*) FROM SimpleTable", [],
			function (result) {
				console.log(result);
			},
			function (tx, error) {
				tx.executeSql("CREATE TABLE SimpleTable (id REAL UNIQUE, label TEXT, timestamp REAL)", [], null, null);
			}
		)
	});

	// insert to table some data
	db.transaction(function (tx) {
		tx.executeSql("INSERT INTO SimpleTable (label, timestamp) values(?, ?)", ["Купить iPad или HP Slate", new Date().getTime()], null, null);
	});
	db.transaction(function (tx) {
		tx.executeSql("INSERT INTO SimpleTable (label, timestamp) values(?, ?)", ["HP Slate", new Date().getTime()], null, null);
	});
	db.transaction(function (tx) {
		tx.executeSql("INSERT INTO SimpleTable (label, timestamp) values(?, ?)", ["iPad", new Date().getTime()], null, null);
	});

	// get data from table
	db.transaction(function (tx) {
		tx.executeSql("SELECT * FROM SimpleTable", [],
			function (tx, result) {
				for (var i = 0; i < result.rows.length; i++) {
					document.write('<b>' + result.rows.item(i)['label'] + '</b><br />');
				}
		}, null)
	});

	document.write('<b>----------------------------</b><br />');

	// delete row from table
	db.transaction(function (tx) {
		tx.executeSql("DELETE FROM SimpleTable WHERE label = ?", ["iPad"], null, null);
		// the same result
		// tx.executeSql("DELETE FROM SimpleTable WHERE label = 'iPad'", [], null, null);
	});

	// get data from table
	db.transaction(function (tx) {
		tx.executeSql("SELECT * FROM SimpleTable", [],
			function (tx, result) {
				for (var i = 0; i < result.rows.length; i++) {
					document.write('<b>' + result.rows.item(i)['label'] + '</b><br />');
				}
			}, null)
	});

}());
