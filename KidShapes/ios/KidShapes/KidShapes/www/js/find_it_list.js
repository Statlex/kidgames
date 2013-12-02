// find it list - list of images and coordinates for small figures

(function () {


	/*global state */

	window.fiList = window.fiList || {};

	var self = window.fiList;

	var setDifficult = function () {

		//var difficult = state.getDifficult();

		KGDB.transaction(function (tx) {
			tx.executeSql('SELECT * FROM info', [], function (tx, results) {
				switch (results.rows.item(1).dif) {
					case 'kinder-garden':
						self.list = allList.kinder_garden;
						break;
					case 'school':
						self.list = allList.school;
						break;
					case 'university':
						self.list = allList.university;
						break;
					default :
						console.log('NO list for current difficult :(');
				}
			});
		});

	};

	setDifficult();

	var setImage = function () {

		var list, i, container, page, img, height;
		i = 0;
		list = self.list;

		container = document.getElementById('container');
		height = container.parentNode.style.height;

		while (list[i]) {
			page = document.createElement('div');
			page.className = 'page';
			page.setAttribute('figcount', list[i].figCount);
			page.style.height = height;
			page.style.backgroundImage = 'url(' + list[i].img + ')';
			img = new Image();
			img.src = list[i].img;
			//img.addEventListener('load', setCoords, false);
			container.appendChild(page);
			i += 1;
		}

		var list = self.list,
			pages = document.querySelectorAll('.page'),
			i, len;

		for (i = 0, len = pages.length; i < len; i++) {

			var img;

			pages[i].number = i;

			if (list[i]) {
				pages[i].setAttribute('figcount', list[i].figCount);
				pages[i].style.backgroundImage = 'url(' + list[i].img + ')';
				img = new Image();
				img.src = list[i].img;
				img.addEventListener('load', setCoords, false);
			}
			else {
				pages[i].innerHTML = i + ' - have no image :(';
			}

		}

	};

	var setCoords = function () {

		var pages = document.querySelectorAll('.page'),
			page = pages[0] ,
			pageWidth = page.clientWidth,
			pageHeight = page.clientHeight,
			pageAspect = pageWidth / pageHeight,
			imgWidth, imgHeight,
			imgAspect,
			list = self.list,
			q, i,
			hPadding, vPadding,
			key, arrayOfArrays,
			k, l, listItem;

		for (i = pages.length; i--;) {
			listItem = list[i];
			if (listItem && this.src.indexOf(listItem.img) != -1) {
				imgWidth = this.width;
				imgHeight = this.height;
				imgAspect = imgWidth / imgHeight;

				// count picture size
				if (pageAspect > imgAspect) {
					q = pageHeight / imgHeight;
					imgHeight = pageHeight;
					imgWidth = imgWidth * q;
				}
				else {
					q = pageWidth / imgWidth;
					imgWidth = pageWidth;
					imgHeight = imgHeight * q;
				}

				// count picture padding
				hPadding = Math.round((pageWidth - imgWidth) / 2);
				vPadding = Math.round((pageHeight - imgHeight) / 2);

				// parse and fit cur page property
				for (key in listItem) {
					if (listItem.hasOwnProperty(key) && Array.isArray(listItem[key])) {
						arrayOfArrays = listItem[key];
						for (k = arrayOfArrays.length; k--;) {
							for (l = arrayOfArrays[k].length; l--;) {
								arrayOfArrays[k][l] = Math.round(arrayOfArrays[k][l] * q);
								if (l == 0) {
									arrayOfArrays[k][l] = Math.round(arrayOfArrays[k][l] + hPadding);
								}
								if (l == 1) {
									arrayOfArrays[k][l] = Math.round(arrayOfArrays[k][l] + vPadding);
								}
							}
						}
					}
				}
			}
		}
	};

	var xPosition = function (style) {
		if (style.indexOf('translate(') !== -1) {
			return parseInt(style.substring(style.lastIndexOf('translate(') + 10, style.length - 1), 10) || 0;
		} else {
			return 0;
		}
	};

	self.initSwipe = function () {
		var container, prefix, startPoint, style;
		prefix = title.vendorPrefix;
		container = document.getElementById('container');
		style = container.getAttribute('style');
		startPoint = xPosition(style);
		container.style[prefix + 'Transition'] = 'all 0.010s linear';
		container.style[prefix + 'Transform'] = 'translate(' + (startPoint + 1) + 'px, 0px)';
		setTimeout(function () {
			container.style[prefix + 'Transform'] = 'translate(' + (startPoint - 1) + 'px, 0px)';
		}, 10);
		setTimeout(function () {
			container.style[prefix + 'Transform'] = 'translate(' + (startPoint) + 'px, 0px)';
		}, 20);

	};

	function imageCash() {
		var preloadList, path, img, i, len;
		path = 'i/splash-screen/';
		preloadList = ['done.png', 'bg.jpg'];
		img = document.createElement('img');
		for (i = 0, len = preloadList.length; i < len; i += 1) {
			img = new Image();
			img.src = path + preloadList[i];
		}
	}

	var run = function () {

		setTimeout(function () {
			setImage(); // include setCoords
			self.initSwipe();
			imageCash();
		}, 1000);

	};

	window.addEventListener('load', run, false);

}());