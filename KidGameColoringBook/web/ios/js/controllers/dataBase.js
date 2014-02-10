(function (win) {

	var dataBase;

	dataBase = {
		dbName: 'cb_db_11_21',
		tableName: 'cb_t_2002_21',
		init: function(){
			var that = this;
			// create or connect to db
			this.db = openDatabase(this.dbName, '0.1', "A list of images.", 4 * 1024 * 1024);
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
						tx.executeSql("CREATE TABLE " + that.tableName + " (id REAL UNIQUE, imageId REAL, polygonsData TEXT)", [], null, null);
					}
				)
			});

		},
		saveProgress: function(data) {
			var that = this;
			console.log(data);
			this.db.transaction(function (tx) {
				// remove data from db
				tx.executeSql("DELETE FROM " + that.tableName + " WHERE imageId = ?", [data.imageId], null, null);
				// save data to db
				tx.executeSql("INSERT INTO " + that.tableName + " (imageId, polygonsData) values(?, ?)", [data.imageId, data.polygonsData], null, null);
			});

		},
		getDataByFigureId: function(id, func) {

			var that = this;
			this.db.transaction(function (tx) {
				tx.executeSql("SELECT * FROM " + that.tableName + " WHERE imageId = ?", [id],
					function (tx, result) {
						if (result.rows.length) {
							func(result.rows.item(0).polygonsData);
						} else {
							func('{}');
						}
					}, null)
			});

		},
		getAllDataArray: function(func) {

			var tableName = this.tableName;

			this.db.transaction(function (tx) {
				tx.executeSql("SELECT * FROM " + tableName, [],
					function (tx, result) {
						var data = [];
						for (var i = 0, len = result.rows.length; i < len; i += 1) {
							var item = result.rows.item(i);

							data.push({
								imageId: item.imageId,
								polygonsData: item.polygonsData
							});

						}
						func(data);
					}, null)
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

	win.dataBase = dataBase;

}(window));
