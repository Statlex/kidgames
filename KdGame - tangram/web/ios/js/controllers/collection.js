(function (win) {

	var collection = {
		showState: 'list', // 'list' or categories
		show: function() {

			var wrapper = $('.js-my-collection-list-wrapper', main.wrapper);

			if (this.showState === 'list') {
				// get all data
				dataBase.getAllDataArray(function(data){

					data = data.sort(function(a, b){
						return a.timestamp < b.timestamp;
					});

					var templateHTML = viewer.templates['my-collection-list'];
					console.log(templateHTML);


				});
			}

			if (this.showState === 'categories') {

			}



		}



	};

	win.collection = collection;

}(window));
