(function (win) {

	var collection = {
		showState: 'list', // 'list' or categories
		show: function() {

			var wrapper = $('.js-my-collection-list-wrapper', main.wrapper);

			if (this.showState === 'list') {
				// get all data
				dataBase.getAllDataArray(function(arr){

					var data = {};
					data.arr = arr.sort(function(a, b){
						return a.timestamp < b.timestamp;
					});

					var templateHTML = viewer.templates['my-collection-list'].html;
					wrapper.innerHTML = viewer.template(templateHTML)(data);


				});
			}

			if (this.showState === 'categories') {

			}



		}



	};

	win.collection = collection;

}(window));
