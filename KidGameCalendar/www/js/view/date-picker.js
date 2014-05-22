(function (win, doc, docElem) {

	"use strict";
	/*global console, alert, Backbone, window, document, util, Slider, _, templateContainer */
	/*global GC, lang, templateContainer, info, APP, $, Backbone, Calendar, dataBase, cycleMaster */

	win.GC = win.GC || {};

	win.GC.DatePicherView = Backbone.View.extend({
		el: '.js-main-wrapper',
		events: {

		},
		selectors: {

		},
		initialize: function() {
			console.log('init');
			this.fade = $(templateContainer.templates['date-picker-fade']);
			this.picker = $(templateContainer.templates['date-picker']);
		},
		show: function() {

			APP.router.navigate('date-picker', {trigger: true});

			console.log('show');

			this.date = new Date();

			this.$el.append(this.fade);
			this.fade.on('click', this.close.bind(this));

			this.createSelects();
			this.bindSelects();
			this.$el.append(this.picker);

			this.setDate();

			APP.datePicher = this;



		},
		createSelects: function() {

			// create dates
			var dateSelect = this.picker.find('.js-select-date'),
				ii,
				optionStr = '<option value="date">date<\/option>',
				datesStr = '';
			for (ii = 1; ii <= 31; ii += 1) {
				datesStr += optionStr.replace(/date/gi, ii);
			}
			dateSelect.html(datesStr);

			// create years
			var yearSelect = this.picker.find('.js-select-year'),
				yearStr = '',
				currentYear = this.date.getFullYear();
			for (ii = 0; ii <= 50; ii += 1) {
				yearStr += optionStr.replace(/date/gi, currentYear - ii);
			}
			yearSelect.html(yearStr);

			// create months
			var monthSelect = this.picker.find('.js-select-month'),
				monthStr = '';
			optionStr = '<option value="date"> month <\/option>';
			for (ii = 1; ii <= 12; ii += 1) {
				monthStr += optionStr.replace('date', ii-1).replace('month', lang.month[ii-1]);
			}
			monthSelect.html(monthStr);

		},
		setDate: function(data) {

			var date = this.picker.find('.js-select-date'),
				month = this.picker.find('.js-select-month'),
				year = this.picker.find('.js-select-year'),
				state;

			if (data) {
				this.date = new Date([data.year, data.month, data.date].join(' '));
			}

			// set default state
			date.prop('selectedIndex', this.date.getDate() - 1);
			month.prop('selectedIndex', this.date.getMonth());
			year.prop('selectedIndex', 0);

			state = cycleMaster.scanDay({
				getStateOnly: true,
				date: [this.date.getDate(), this.date.getMonth(), this.date.getFullYear()].join('-')
			});

			console.log(state);


		},
		bindSelects: function() {

			var selects = this.picker.find('.js-select-wrapper select'),
				buttons = this.picker.find('.js-select-wrapper .js-change-plus, .js-select-wrapper .js-change-minus');

			selects.on('change', (function(){
				var date = this.picker.find('.js-select-date'),
					month = this.picker.find('.js-select-month'),
					year = this.picker.find('.js-select-year'),
					data;

				data = {
					date: date.prop('options')[date.prop('selectedIndex')].value,
					month: month.prop('options')[month.prop('selectedIndex')].value,
					year: year.prop('options')[year.prop('selectedIndex')].value
				};
				data.month = +data.month;
				data.month += 1;

				this.setDate(data);
			}.bind(this)));


			buttons.on('click', function(){

				var select = this.parentNode.querySelector('select'),
					selectedIndex = select.selectedIndex,
					optionLength = select.options.length;

				selectedIndex += this.classList.contains('js-change-plus') ? 1 : -1;

				if (selectedIndex < 0) {
					selectedIndex = optionLength - 1;
				}

				if (selectedIndex > optionLength - 1) {
					selectedIndex = 0;
				}

				select.selectedIndex = selectedIndex;

				$(select).on('change');

			});


		},
		close: function() {

			Backbone.history.history.back();

			console.log('close');

			this.fade.remove();
			this.picker.remove();


			// remove nodes

		}

	});

}(window, document, document.documentElement));
