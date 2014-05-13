(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar, dataBase */

	win.GC = win.GC || {};

	win.GC.MainView = Backbone.View.extend({
		el: '.js-main-data-wrapper',
		events: {
			'click .js-fade': 'back'
		},
		selectors: {
			calendar: '.js-calendar-wrapper',
			notes: '.js-notes-wrapper',
			time: '.js-time-wrapper'
		},
		initialize: function() {
			this.templates = {
				calendarWrapper: templateContainer.templates['main-calendar-wrapper'],
				noteItem: templateContainer.templates['date-note']
			};

			// create calendar
			this.createCalendar();

			this.showNotes();

		},
		createCalendar: function() {

			this.$el.find(this.selectors.calendar).html(_.template(this.templates.calendarWrapper, {}));

			var date = new Date(),
				slider = new Slider(this.$el.find('.js-main-calendar-wrapper')[0], {year: date.getFullYear(), month: date.getMonth()});

			slider.setStartPosition();
			slider.init();

			slider.setCreatePages();

			APP.slider = slider;

			this.bindHelpButton();
			this.bindArrowButton();
			this.bindFade();
			this.showToday();

		},
		show: function(item) {
			var key;
			for (key in this.selectors) {
				if (this.selectors.hasOwnProperty(key)) {
					if (item === key) {

						if (key === 'notes') {
							this.showNotes();
							this.bindNotes();
						}

						this.$el.find(this.selectors[key]).show();
					} else {
						this.$el.find(this.selectors[key]).hide();
					}
				}
			}

		},
		bindHelpButton: function() {
			this.$el.find('.js-show-help').on('click', function(){
				APP.router.navigate('help', {trigger: true});
			});
		},
		bindArrowButton: function() {
			function changePage(direction) {
				APP.slider.changeMonthDate(direction);
				APP.slider.changePage(direction);
				APP.slider.updateDateNode();
			}
			this.$el.find('.js-slider-to-left').on('click', changePage.bind(APP.slider, -1));
			this.$el.find('.js-slider-to-right').on('click', changePage.bind(APP.slider, 1));
		},
		bindFade: function() {
			$('.js-fade').off();

			this.fade = {
				node: $('.js-fade'),
				show: function() {
					$(doc.body).addClass('blur');
					this.node.show();
				},
				hide: function() {
					$(doc.body).removeClass('blur');
					this.node.hide();
				}
			};

			this.fade.node.on('click', function(){
				Backbone.history.history.back();
			});

		},
		showToday: function() {

			var today = Calendar.prototype.getToday();
			$('.js-main-calendar-wrapper .js-main-calendar-page:nth-child(2) [data-date="' + today.str + '"]').eq(0).on('click');

		},


		showNotes: function() {

			var cycles = info.get('cycles') || [],
				that = this,
				addedData = [],
				notesMap = {
					pencil: ['sex', 'pill', 'weight', 'temperature', 'notes'],
					health: ['achy', 'acne', 'bloated', 'diarrhea'],
					mood: ['angry', 'calm', 'happy']
				},
				broFn = $();

			cycles.forEach(function(cycle){
				cycle.startCycle.dateMs = new Date([cycle.startCycle.year, cycle.startCycle.month + 1, cycle.startCycle.date].join(' ')).getTime();
				cycle.startCycle.cycleType = 'start cycle';
				addedData.push(JSON.parse(JSON.stringify(cycle.startCycle)));
				if (cycle.endFlow.str) {
					cycle.endFlow.dateMs = new Date([cycle.endFlow.year, cycle.endFlow.month + 1, cycle.endFlow.date].join(' ')).getTime();
					cycle.endFlow.cycleType = 'end flow';
					addedData.push(JSON.parse(JSON.stringify(cycle.endFlow)));
				}
			});

			dataBase.getAllDataArray(function(data){

				data = data.concat(addedData);

				data = data.sort(function(a, b){
					return b.dateMs - a.dateMs;
				});

				data.forEach(function(date, index, arr){
					var nearestDate, key, keyJ;
					if (date.cycleType) { // detect cycles
						nearestDate = arr[index - 1];
						if (nearestDate  && nearestDate.dateMs === date.dateMs && !nearestDate.cycleType) {
							nearestDate.addedType = date.cycleType;
							date.doNotShow = 1;
						}

						nearestDate = arr[index + 1];

						if (nearestDate  && nearestDate.dateMs === date.dateMs && !nearestDate.cycleType) {
							nearestDate.addedType = date.cycleType;
							date.doNotShow = 1;
						}

						date.addedType = date.cycleType;

					}

					if (date.data) {
						date.categories = {};
						// get available categories
						for (key in notesMap) {
							if (notesMap.hasOwnProperty(key)) {
								// create empty category
								date.categories[key] = {};
								for (keyJ in date.data) {
									if (date.data.hasOwnProperty(keyJ)) {
										// detect saves data in current category
										if (broFn.inArray(notesMap[key], keyJ)) {
											// add data tu current category
											date.categories[key][keyJ] = date.data[keyJ];
										}
									}
								}
							}
						}
					}

					console.log(date);
					console.log(Object.keys(date));
					console.log(Object.keys({}).length);

				});

				console.log(that.templates.noteItem);
				console.log(data);

				that.$el.find('.js-date-notes-list').html(broFn.template(that.templates.noteItem)({data:data}));


			});

		},
		bindNotes: function() {
			$('.js-notes-wrapper').off();

			// bind search
			var search = $('.js-notes-wrapper .js-search-notes');

			search.on('input', function(){

				var notes = doc.querySelectorAll('.js-date-note'),
					value = this.value,
					re,
					reStr = '--' + value + '--';

				if (!value.trim()) {
					Array.prototype.forEach.call(notes, function(node){
						var findElems = node.querySelectorAll('[data-default-text]');
						Array.prototype.forEach.call(findElems, function(findNodes){
							findNodes.innerText = findNodes.dataset.defaultText;
						});
						node.classList.remove('hidden');
					});
					return;
				}

				re = new RegExp(value, 'gi');

				Array.prototype.forEach.call(notes, function(node){
					var findElems = node.querySelectorAll('[data-default-text]');
					node.classList.add('hidden');
					Array.prototype.forEach.call(findElems, function(findNodes){

						var newText = findNodes.dataset.defaultText.replace(re, reStr);
						findNodes.innerText = newText;

						if (findNodes.dataset.defaultText !== newText) { // replace was
							node.classList.remove('hidden');
						}

					});
				});

				console.log(this.value);

			});

			search.on('input');


		}

	});

}(window, document, document.documentElement));
