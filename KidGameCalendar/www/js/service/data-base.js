(function (win) {

	"use strict";
	/*global window, document, console, alert, openDatabase */

	var dataBase;

	dataBase = {
		dbName: 'rd_bd',
		tableName: 'rd_t_1',

		init: function(){
			var that = this;
			// create or connect to db
			this.db = openDatabase(this.dbName, '0.1', "A list of days.", 4 * 1024 * 1024);
			if (!this.db) {
				console.warn("---- Failed to connect to database. ----");
				return;
			}
			// create table if table is not exist
			this.db.transaction(function (tx) {
				tx.executeSql("SELECT COUNT(*) FROM " + that.tableName, [],
					function (result) {
						//console.log(result);
					},
					function (tx, error) {
						tx.executeSql("CREATE TABLE " + that.tableName + " (id REAL UNIQUE, date TEXT, data TEXT)", [], null, null);
					}
				);
			});
		},

		saveDateInfo: function(date, data) {
			var that = this;
			this.db.transaction(function (tx) {
				// remove data from db
				tx.executeSql("DELETE FROM " + that.tableName + " WHERE date = ?", [date], null, null);
				// save data to db
				tx.executeSql("INSERT INTO " + that.tableName + " (date, data) values(?, ?)", [date, data], null, null);
			});
		},
		getDateInfo: function(date, func) {

			var that = this;
			this.db.transaction(function (tx) {
				tx.executeSql("SELECT * FROM " + that.tableName + " WHERE date = ?", [date],
					function (tx, result) {
						if (result.rows.length) {
							func(result.rows.item(0).data);
						} else {
							func('{}');
						}
					}, null);
			});

		},
		getSavedDates: function(func, context) {

			var that = this;
			this.db.transaction(function (tx) {
				tx.executeSql("SELECT * FROM " + that.tableName, [],
					function (tx, result) {
						var arr = [], i, len;
						for (i = 0, len = result.rows.length; i < len; i += 1) {
							arr.push(result.rows.item(i).date);
						}
						func.call(context, arr);
					}, null);
			});

		},
		getAllDataArray: function(func) {
			var tableName = this.tableName;
			this.db.transaction(function (tx) {
				tx.executeSql("SELECT * FROM " + tableName, [],
					function (tx, result) {
						var data = [],
							i, len, item;
						for (i = 0, len = result.rows.length; i < len; i += 1) {
							item = result.rows.item(i);
							data.push({
								imageId: item.imageId,
								polygonsData: item.polygonsData
							});
						}
						func(data);
					}, null);
			});
		},
		getAllDataHashMap: function(func) {
			var tableName = this.tableName;
			this.db.transaction(function (tx) {
				tx.executeSql("SELECT * FROM " + tableName, [],
					function (tx, result) {
						var data = {},
							i, len, item;
						for (i = 0, len = result.rows.length; i < len; i += 1) {
							item = result.rows.item(i);
							data[item.imageId] = item.polygonsData;
						}
						func(data);
					}, null);
			});
		},
		removeDataByImageId: function(imageId) {
			var tableName = this.tableName;
			// delete row from table
			this.db.transaction(function (tx) {
				tx.executeSql("DELETE FROM " + tableName + " WHERE imageId = ?", [imageId], null, null);
			});
		}

	};

	dataBase.init();

	window.dataBase = dataBase;

}(window));
