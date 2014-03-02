(function (win, doc, docElem) {

	"use strict";
	/*global console, alert */

	var $ = function(selector) {
		return doc.querySelector(selector);
	};

	var $$ = function(selector) {
		return Array.prototype.splice(doc.querySelectorAll(selector));
	};

	var main = {
		handleEvent: function() {

			this.getLocation();

		},
		getLocation: function() {

			if (!navigator.geolocation) {
				alert("Geolocation is not supported by this browser.");
				return;
			}

			navigator.geolocation.getCurrentPosition(this.addMap);

		},
		addMap: function(position) {

			console.log(position.coords);

			var mapOptions = {
				center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
				zoom: 5,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map($("#map_canvas"), mapOptions);

			// add marker
			var marker;
			marker = new google.maps.Marker({
				position: mapOptions.center,
				map: map,
				title: 'Hello World!'
			});

			marker = new google.maps.Marker({
				position: new google.maps.LatLng(position.coords.latitude - 1, position.coords.longitude - 1),
				map: map,
				title: 'World!'
			});

			marker = new google.maps.Marker({
				position: new google.maps.LatLng(position.coords.latitude + 1, position.coords.longitude + 1),
				map: map,
				title: 'Hello!'
			});


		}



	};

	win.addEventListener('load', main, false);

}(window, document, document.documentElement));