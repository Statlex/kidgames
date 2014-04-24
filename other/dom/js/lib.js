var jQuery = (function () {

	var jQuery = function (selector, context) {
		return new jQuery.fn.init(selector, context);
	};

	jQuery.fn = jQuery.prototype = {
		init: function (selector, context) {
			// ...
			this.selector = selector;
			// add nodes

			return this;
		}
		// jQuery API methods
	}

	jQuery.fn.red = function( ) {
		console.log(this);
		console.log(arguments);
	}

	jQuery.fn.init.prototype = jQuery.fn;

	return (window.jQuery = window.$ = jQuery);

}());

