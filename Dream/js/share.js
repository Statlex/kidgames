(function () {

	"use strict";
	/*global window, document, console, alert, $A */

	window.share = {

		createShareLink: function() {

			$A('#wrapper a[share-for]').forEach(function(link){

				var url = encodeURIComponent(link.href);

				switch (link.getAttribute('share-for')) {
					case 'facebook':
						link.href = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
						break;
					case 'twitter':
						link.href = 'https://twitter.com/share?url=' + url;
						break;
					case 'linkedin':
						link.href = 'http://www.linkedin.com/shareArticle?mini=true&url=' + url;
						break;
					case 'vk':
						link.href = 'http://vk.com/share.php?url=' + url;
						break;
					case 'google':
						link.href = 'https://plus.google.com/share?url=' + url;
						break;
				}

				link.target = '_blank';

			});

		}

	};

}());
