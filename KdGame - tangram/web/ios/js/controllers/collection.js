(function (win) {

	var collection = {
		showState: 'list', // 'list' or categories
		show: function() {

			console.log('show---');

			// get all data
			dataBase.getAllData(function(data){
				console.log(data);
			});




		}



	};

	win.collection = collection;

}(window));
