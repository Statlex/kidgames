(function (win, doc, docElem) {

	"use strict";
	/*global window, document, console, alert, openDatabase */

	var dataBaseA;

	dataBaseA = {
		dbName: 'rd_bd',
		tableName: 'rd_t_a',

		init: function(){
			var that = this;
			// create or connect to db
			this.db = openDatabase(this.dbName, '0.1', "A list of settings.", 4 * 1024 * 1024);
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
						tx.executeSql("CREATE TABLE " + that.tableName + " (id REAL UNIQUE, field TEXT, data TEXT)", [], null, null);
					}
				);
			});

		},

		saveValue: function(value, data, func) {
			console.log(arguments);
			var that = this;
			this.db.transaction(function (tx) {
				// remove data from db
				tx.executeSql("DELETE FROM " + that.tableName + " WHERE field = ?", [value], null, null);
				// save data to db
				tx.executeSql("INSERT INTO " + that.tableName + " (field, data) values(?, ?)", [value, data], func || null, null);
			});
		},

		removeValue: function(value, func) {
			var that = this;
			this.db.transaction(function (tx) {
				// remove data from db
				tx.executeSql("DELETE FROM " + that.tableName + " WHERE field = ?", [value], func || null, null);
			});
		},

		getValue: function(value, func) {

			var that = this;
			this.db.transaction(function (tx) {
				tx.executeSql("SELECT * FROM " + that.tableName + " WHERE field = ?", [value],
					function (tx, result) {
						if (result.rows.length) {
							func(result.rows.item(0).data);
						} else {
							func('');
						}
					}, null);
			});

		},

		getSavedValues: function(func, context) {

			var that = this;
			this.db.transaction(function (tx) {
				tx.executeSql("SELECT * FROM " + that.tableName, [],
					function (tx, result) {
						var data = {}, i, len, item;
						for (i = 0, len = result.rows.length; i < len; i += 1) {
							item = result.rows.item(i);
							data[item.field] = item.data;
						}
						func.call(context, data);
					}, null);
			});

		}

	};

	dataBaseA.init();

	win.dataBaseA = dataBaseA;

}(window, document, document.documentElement));