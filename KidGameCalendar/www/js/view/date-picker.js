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
			this.picker = $(_.template(templateContainer.templates['date-picker'], {}));
			this.header = this.picker.find('.js-period-state');
			this.day = this.picker.find('.js-date-picker-day');
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

			this.setSelectInputsSize();

			this.setStateBtn = this.picker.find('.js-set-date-picker');
			this.setStateBtn.on('click', (function(){

				var state = cycleMaster.scanDay({
					forceRun: true,
					date: [this.date.getDate(), this.date.getMonth(), this.date.getFullYear()].join('-')
				});

				if (state !== 'impossible day') { // detect normal day
					this.close();
				}

			}.bind(this)));

			this.setDate();

			this.picker.find('.js-close-date-picker').on('click', this.close.bind(this));

			APP.datePicher = this;

			$('.js-main-wrapper').addClass('blur');

		},

		setSelectInputsSize: function() {
			var inputs = this.picker.find('.js-current-input'),
				height = inputs[0].clientHeight;

			inputs.forEach(function(node){
				node.style.lineHeight = height + 'px';
				node.style.fontSize = height * 0.6 + 'px';

			});

			if (height < 2) {
				console.warn('setSelectInputsSize');
				win.setTimeout(this.setSelectInputsSize.bind(this), 100);
			}

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

			win.setTimeout((function(){
				this.picker.find('select').forEach(function(node){
					node.style.display = 'block';
				});
			}.bind(this)), 500);

		},
		setDate: function(data) {

			var date = this.picker.find('.js-select-date'),
				month = this.picker.find('.js-select-month'),
				year = this.picker.find('.js-select-year'),
				state, selects;

			if (data) {
				this.date = new Date();
				this.date.setDate(data.date);
				this.date.setMonth(data.month);
				this.date.setFullYear(data.year);
			}

			// set default state
			selects = {
				date: date.prop('selectedIndex', this.date.getDate() - 1),
				month: month.prop('selectedIndex', this.date.getMonth()),
				year: year.prop('selectedIndex', (new Date().getFullYear()) - this.date.getFullYear())
			};

			state = cycleMaster.scanDay({
				getStateOnly: true,
				date: [this.date.getDate(), this.date.getMonth(), this.date.getFullYear()].join('-')
			});

			this.setStateBtn.html(state.buttonText);
			this.setStateBtn.data('state', state.state);
			this.header.html(state.shortText);
			this.day.html(lang.dayFull[this.date.getDay()]);

			['date', 'month', 'year'].forEach(function(item) {
				var select = selects[item][0],
					text = select.options[select.selectedIndex].innerHTML;
				this.picker.find('.js-current-input-' + item).html(text);
			}, this);

		},
		bindSelects: function() {

			var selects = this.picker.find('.js-select-wrapper select'),
				buttons = this.picker.find('.js-select-wrapper .js-change-plus, .js-select-wrapper .js-change-minus'),

				selectChange = function () {
					var date = this.picker.find('.js-select-date'),
						month = this.picker.find('.js-select-month'),
						year = this.picker.find('.js-select-year'),
						data;

					data = {
						date: date.prop('options')[date.prop('selectedIndex')].value,
						month: month.prop('options')[month.prop('selectedIndex')].value,
						year: year.prop('options')[year.prop('selectedIndex')].value
					};

					this.setDate(data);
				}.bind(this);

			selects.on('change', selectChange);

			buttons.on('click', function(){

				var select = this.parentNode.parentNode.querySelector('select'),
					selectedIndex = select.selectedIndex,
					optionLength = select.options.length,
					q = this.classList.contains('js-change-year') ? -1 : 1;

				selectedIndex += this.classList.contains('js-change-plus') ? q : -q;

				if (selectedIndex < 0) {
					selectedIndex = optionLength - 1;
				}

				if (selectedIndex > optionLength - 1) {
					selectedIndex = 0;
				}

				select.selectedIndex = selectedIndex;

				selectChange();

			});


		},
		close: function() {

			if ($('.js-date-picker-fade').isEmpty()) {
				return;
			}

			if (Backbone.history.fragment === 'date-picker') {
				Backbone.history.history.back();
			}

			this.fade.remove();
			this.picker.remove();

			$('.js-main-wrapper').removeClass('blur');

			// remove nodes

		}

	});

}(window, document, document.documentElement));
