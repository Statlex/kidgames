// c-swipe -> creatures' swipe :)
// by NastyCreatures (Dmitry Turovtsov);

// if you want vertical swipe need write "swipe('.wrapper .container','v');"
// if you want horizontal swipe need write "swipe('.wrapper .container','h');" or "swipe('.wrapper .container','');"

/*examples
 window.addEventListener('load', function () {
 swipe('.wrapper .container', '');
 }, false);

 window.addEventListener('load', function () {
 swipe('.wrapper .container2', '{vertical : true}');
 swipe('.wrapper .container3', 'vertical : false, pagination : true');
 swipe('.wrapper .container', '{vertical : false, pagination : true, points : true, buttons : true}');
 }, false);
 end of examples */

var swipeVars = {
	xsc: 0, // x start of cursor
	xcc: 0, // x current of cursor
	xec: 0, // x end of cursor
	ysc: 0, // y start of cursor
	ycc: 0, // y current of cursor
	yec: 0, // y end of cursor

	xss: 0, // x start of swipe
	xcs: 0, // x current of swipe
	xes: 0, // x end of swipe
	yss: 0, // y start of swipe
	ycs: 0, // y current of swipe
	yes: 0, // y end of swipe

	dx: 0, // delta x
	dy: 0, // delta y
	tx: 0, // target x
	ty: 0, // target y
	xbc: 0, // x before cursor
	ybc: 0, // y before cursor

	st: 0, // start time
	et: 0, // end time
	md: false, // mouse is down ?
	xStyle: '', // style of element - x scroll
	yStyle: '', // style of element - y scroll
	vendorPrefix: '',
	transform: '',
	transition: '',

	xatm: '', // x after transform
	xatn: '', // x after transition
	yatm: '', // y after transform
	yatn: '', // y after transition
	dw: 0, // delta width
	dh: 0, // delta height
	isScrollX: true, // may x swipe
	isScrollY: true, // may y swipe

	isPaginationX: false,
	isPaginationY: false,
	isPagePoint: false,
	isPageButton: false,
	pageWidth: 0,
	pageHeight: 0,
	curPageX: 0,
	curPageY: 0,
	maxSpeedNextPageX: 200,
	maxSpeedNextPageY: 200,
	speedX: 0,
	speedY: 0,

	minSwipeX: 10,
	minSwipeY: 10,
	isTouchDevice: false
};

swipeVars.browserDetect = function () {
	var userAgent = navigator.userAgent,
		vendorPrefix = 'webkit';
	if (userAgent.indexOf('MSIE') != -1) {
		vendorPrefix = 'ms';
	}
	else if (userAgent.indexOf('Gecko') != -1) {
		vendorPrefix = 'webkit';
	}
	else if (userAgent.indexOf('Mozilla') != -1) {
		vendorPrefix = 'moz';
	}
	else if (userAgent.indexOf('Opera') != -1) {
		vendorPrefix = 'o';
	}
	return vendorPrefix;
};

swipeVars.vendorPrefix = swipeVars.browserDetect();
swipeVars.isTouchDevice = (function () {
	return 'ontouchstart' in document.documentElement;
}());

swipeVars.transform = swipeVars.vendorPrefix + 'Transform';
swipeVars.transition = swipeVars.vendorPrefix + 'Transition';

function swipe(selector, paremeters) {

	var params = eval('(' + paremeters + ')'),
		vertical = params.vertical,
		pagination = params.pagination,
		point = params.points,
		button = params.buttons,
		divs = document.querySelectorAll(selector);

	window.addEventListener('resize', function () {
		swipeVars.swipeResize(selector, paremeters);
	}, false);

	swipeVars.addSwipeStyles(selector); // add styles
	// vertical swipe

	if (pagination) {
		if (point) swipeVars.isPagePoint = true;
		if (button) swipeVars.isPageButton = true;
	}

	if (vertical) {
		if (pagination) {
			swipeVars.isPaginationY = true;
		}
		swipeVars.addSwipeEventV(divs); // vertical swipe
	}
	else {
		if (pagination) {
			swipeVars.isPaginationX = true;
		}
		swipeVars.addSwipeEventH(divs); // horizontal swipe
	}

}

swipeVars.addSwipeStyles = function (selector) {
	var style = document.querySelector('.swipe-css');
	if (!style) {
		style = document.createElement('style');
		style.setAttribute('class', 'swipe-css');
		style.innerText = selector + ' { -' + swipeVars.vendorPrefix + '-tap-highlight-color: rgba(0, 0, 0, 0); ' +
			'-' + swipeVars.vendorPrefix + '-user-select: none; }';
		document.querySelector('body').appendChild(style);
	}
	else {
		style.innerText += ' ' + selector + ' { -' + swipeVars.vendorPrefix + '-tap-highlight-color: rgba(0, 0, 0, 0); ' +
			'-' + swipeVars.vendorPrefix + '-user-select: none; }';
	}
};

swipeVars.addSwipeEventH = function (divs) {
	var i = 0, len = 0;
	if (swipeVars.isTouchDevice) {
		for (i = 0, len = divs.length; i < len; i++) {
			divs[i].parentNode.style.overflowX = 'hidden';
			divs[i].addEventListener('touchstart', swipeVars.startSwipeH, false);
			divs[i].addEventListener('touchmove', swipeVars.moveSwipeH, false);
			divs[i].addEventListener('touchend', swipeVars.endSwipeH, false);
			divs[i].addEventListener('touchcancel', swipeVars.endSwipeH, false);
			if (swipeVars.isPaginationX) {
				divs[i].setAttribute('pagination', 'hor');
				swipeVars.pageInnerDiv(divs[i]);
			}
		}
	}
	else {
		for (i = 0, len = divs.length; i < len; i++) {
			divs[i].parentNode.style.overflowX = 'hidden';
			divs[i].addEventListener('mousedown', swipeVars.startSwipeH, false);
			divs[i].addEventListener('mousemove', swipeVars.moveSwipeH, false);
			divs[i].addEventListener('mouseup', swipeVars.endSwipeH, false);
			divs[i].addEventListener('mouseout', swipeVars.endSwipeH, false);
			if (swipeVars.isPaginationX) {
				divs[i].setAttribute('pagination', 'hor');
				swipeVars.pageInnerDiv(divs[i]);
			}
		}
	} // -- if
	swipeVars.isPaginationX = false;
};

swipeVars.addSwipeEventV = function (divs) {
	var i = 0, len = 0;
	if (swipeVars.isTouchDevice) {
		for (i = 0, len = divs.length; i < len; i++) {
			divs[i].parentNode.style.overflowY = 'hidden';
			divs[i].addEventListener('touchstart', swipeVars.startSwipeV, false);
			divs[i].addEventListener('touchmove', swipeVars.moveSwipeV, false);
			divs[i].addEventListener('touchend', swipeVars.endSwipeV, false);
			divs[i].addEventListener('touchcancel', swipeVars.endSwipeV, false);
			if (swipeVars.isPaginationY) {
				divs[i].setAttribute('pagination', 'ver');
				swipeVars.pageInnerDiv(divs[i]);
			}
		}
	}
	else {
		for (i = 0, len = divs.length; i < len; i++) {
			divs[i].parentNode.style.overflowY = 'hidden';
			divs[i].addEventListener('mousedown', swipeVars.startSwipeV, false);
			divs[i].addEventListener('mousemove', swipeVars.moveSwipeV, false);
			divs[i].addEventListener('mouseup', swipeVars.endSwipeV, false);
			divs[i].addEventListener('mouseout', swipeVars.endSwipeV, false);
			if (swipeVars.isPaginationY) {
				divs[i].setAttribute('pagination', 'ver');
				swipeVars.pageInnerDiv(divs[i]);
			}
		}
	} // -- if

	swipeVars.isPagePoint = false;
	swipeVars.isPageButton = false;
	swipeVars.isPaginationY = false;

};

swipeVars.pageInnerDiv = function (elem) {
	var direction = elem.getAttribute('pagination'),
		i = 0,
		len = 0,
		sum = 0,
		divs = elem.getElementsByTagName('div');

	if (direction == 'hor') {
		for (i = 0, len = divs.length; i < len; i++) {
			if (divs[i].parentNode.getAttribute('pagination') == 'hor') {
				divs[i].style.float = 'left';
				divs[i].style.width = divs[i].parentNode.parentNode.clientWidth + 'px';
				sum += divs[i].clientWidth;
			}
		}
		elem.style.width = sum + 'px';
	} // -- if

	if (direction == 'ver') {
		for (i = 0, len = divs.length; i < len; i++) {
			if (divs[i].parentNode.getAttribute('pagination') == 'ver') {
				divs[i].style.float = 'none';
				divs[i].style.height = divs[i].parentNode.parentNode.clientHeight + 'px';
				sum += divs[i].clientHeight;
			}
		}
		elem.style.height = sum + 'px';
	} // -- if

	if (swipeVars.isPagePoint) swipeVars.addPagePoints(elem);
	if (swipeVars.isPageButton) swipeVars.addPageButton(elem);
};

swipeVars.xPosition = function (style) {
	try {
		return parseInt(style.substring(style.lastIndexOf('translate(') + 10, style.length - 1));
	}
	catch (e) {
		return 0;
	}
};

swipeVars.yPosition = function (style) {
	try {
		return parseInt(style.substring(style.lastIndexOf('translate(0px,') + 15, style.length - 1));
	}
	catch (e) {
		return 0;
	}
};

swipeVars.startSwipeH = function () {
	if (this.getAttribute('pagination') == 'hor') {
		try {
			swipeVars.pageWidth = this.querySelector('div').clientWidth;
			swipeVars.isPaginationX = true;
		}
		catch (e) {
			swipeVars.pageWidth = 0;
			swipeVars.isPaginationX = false;
		}
	} // -- if

	swipeVars.dw = this.clientWidth - this.parentNode.clientWidth;

	swipeVars.xStyle = this.getAttribute('style'); // get (and if need set) style
	swipeVars.xss = swipeVars.xPosition(swipeVars.xStyle);

	this.style[swipeVars.transition] = 'none';
	if (!swipeVars.xss) { // test on suite style + fix
		this.style[swipeVars.transform] = 'translate(0px,0px)';
	}

	swipeVars.xcs = swipeVars.xss; // set start position of swipe - get from style of swipe
	swipeVars.st = (new Date()).getTime(); // get start time

	// get start position of cursor
	try {
		swipeVars.xsc = event.touches[0].pageX;
	}
	catch (e) {
		swipeVars.xsc = event.pageX;
	}
	swipeVars.md = true; // set mouse down ot true
	swipeVars.xbc = swipeVars.xsc + 1000; // set before cursor position
};

swipeVars.moveSwipeH = function () {

	if (swipeVars.md && swipeVars.isScrollX) { // if mouse down

		// get current position of cursor
		try {
			swipeVars.xcc = event.touches[0].pageX;
		}
		catch (e) {
			swipeVars.xcc = event.pageX;
		}

		setTimeout('swipeVars.xbc = swipeVars.xsc', 200);

		swipeVars.dx = swipeVars.xcc - swipeVars.xsc; // get offset

		if ((swipeVars.xss == 0 && swipeVars.dx > 0) || (-swipeVars.xss == swipeVars.dw && swipeVars.dx < 0)) {
			swipeVars.dx = swipeVars.dx >> 1;
		}

		if (Math.abs(swipeVars.dx) > swipeVars.minSwipeX) { // no any scroll if swiping more than 5px;
			event.preventDefault();
			swipeVars.isScrollY = false;
		}

		swipeVars.xcs = swipeVars.dx + swipeVars.xss; // set x current swipe
		this.style[swipeVars.transform] = 'translate(' + swipeVars.xcs + 'px,0px)'; // set style

	} // -- if

};

swipeVars.endSwipeH = function () {

	if (swipeVars.dx) { // if was offset
		if (swipeVars.isPaginationX) {
			swipeVars.stoppingHorPagination(this);
		}
		else {
			swipeVars.stoppingHorSwipe(this);
		}
	} // -- if

	swipeVars.isPaginationX = false; // return to default value
	swipeVars.dx = 0;
	swipeVars.md = false;
	swipeVars.isScrollX = true;
	swipeVars.isScrollY = true;

};

swipeVars.stoppingHorPagination = function (elem) {

	swipeVars.et = (new Date()).getTime(); // get end time
	swipeVars.curPageX = Math.round(Math.abs(swipeVars.xss / swipeVars.pageWidth));
	swipeVars.speedX = parseInt(swipeVars.dx / (swipeVars.et - swipeVars.st) * 1000);

	if (Math.abs(swipeVars.dx) > swipeVars.minSwipeX && Math.abs(swipeVars.speedX) > swipeVars.maxSpeedNextPageX) {
		if (swipeVars.speedX > 0) {
			swipeVars.curPageX--;
		}
		else {
			swipeVars.curPageX++;
		}
	}
	else {
		swipeVars.curPageX = Math.round(Math.abs(swipeVars.xcs / swipeVars.pageWidth));
	}

	swipeVars.tx = -swipeVars.curPageX * swipeVars.pageWidth;

	if (swipeVars.tx > 0 || swipeVars.dw <= 0) {  // edge left position
		swipeVars.xatn = 'all 0.4s ease-out';
		swipeVars.xatm = 'translate(0px,0px)';
	} else if (-swipeVars.tx >= swipeVars.dw) {  // edge right position
		swipeVars.xatn = 'all 0.4s ease-out';
		swipeVars.xatm = 'translate(' + (-swipeVars.dw) + 'px,0px)';
	} else {
		swipeVars.xatn = 'all 0.5s ease-out';
		swipeVars.xatm = 'translate(' + swipeVars.tx + 'px,0px)';
	}

	elem.style[swipeVars.transition] = swipeVars.xatn;
	elem.style[swipeVars.transform] = swipeVars.xatm;
//	KG.volume.sound.play('swipe');
	swipeVars.setActivePointHor(elem);

};

swipeVars.stoppingHorSwipe = function (elem) {

	swipeVars.et = (new Date()).getTime(); // get end time

	if (Math.abs(swipeVars.dx) > swipeVars.minSwipeX) {
		swipeVars.tx = swipeVars.xcs + parseInt(swipeVars.dx / (swipeVars.et - swipeVars.st) * 1000); // current pos + speed
	}
	else {
		swipeVars.tx = swipeVars.xcs;
	}
	swipeVars.setEdgePosH(elem);
};

swipeVars.setEdgePosH = function (elem) {
	if (swipeVars.tx > 0 || swipeVars.dw <= 0) {  // edge left position
		swipeVars.xatn = 'all 0.4s ease-out';
		swipeVars.xatm = 'translate(0px,0px)';
	} else if (-swipeVars.tx >= swipeVars.dw) {  // edge right position
		swipeVars.xatn = 'all 0.4s ease-out';
		swipeVars.xatm = 'translate(' + (-swipeVars.dw) + 'px,0px)';
	} else if (Math.abs(swipeVars.xbc - swipeVars.xsc) < 10) {  // slow motion
		swipeVars.xatn = 'all 0s ease-out';
		swipeVars.xatm = 'translate(' + swipeVars.xcs + 'px,0px)';
	} else {
		swipeVars.xatn = 'all 0.5s ease-out';
		swipeVars.xatm = 'translate(' + swipeVars.tx + 'px,0px)';
	}

	elem.style[swipeVars.transition] = swipeVars.xatn;
	elem.style[swipeVars.transform] = swipeVars.xatm;
};

swipeVars.startSwipeV = function () {

	if (this.getAttribute('pagination') == 'ver') {
		try {
			swipeVars.pageHeight = this.querySelector('div').clientHeight;
			swipeVars.isPaginationY = true;
		}
		catch (e) {
			swipeVars.pageHeight = 0;
			swipeVars.isPaginationY = false;
		}
	} // -- if

	swipeVars.dh = this.clientHeight - this.parentNode.clientHeight;

	swipeVars.yStyle = this.getAttribute('style'); // get (and if need set) style
	swipeVars.yss = swipeVars.yPosition(swipeVars.yStyle);

	this.style[swipeVars.transition] = 'none';
	if (!swipeVars.yss) { // test on suite style + fix
		this.style[swipeVars.transform] = 'translate(0px,0px)';
	}

	swipeVars.ycs = swipeVars.yss; // set start position of swipe - get from style of swipe
	swipeVars.st = (new Date()).getTime(); // get start time

	// get start position of cursor
	try {
		swipeVars.ysc = event.touches[0].pageY;
	}
	catch (e) {
		swipeVars.ysc = event.pageY;
	}
	swipeVars.md = true; // set mouse down ot true
	swipeVars.ybc = swipeVars.ysc + 1000; // set before cursor position

};

swipeVars.moveSwipeV = function () {

	if (swipeVars.md && swipeVars.isScrollY) { // if mouse down

		// get current position of cursor
		try {
			swipeVars.ycc = event.touches[0].pageY;
		}
		catch (e) {
			swipeVars.ycc = event.pageY;
		}

		setTimeout('swipeVars.ybc = swipeVars.ysc', 200);

		swipeVars.dy = swipeVars.ycc - swipeVars.ysc; // get offset

		if ((swipeVars.yss == 0 && swipeVars.dy > 0) || (-swipeVars.yss == swipeVars.dh && swipeVars.dy < 0)) {
			swipeVars.dy = swipeVars.dy >> 1;
		}

		if (Math.abs(swipeVars.dy) > swipeVars.minSwipeY) { // no any scroll if swiping more than 5px;
			event.preventDefault();
			swipeVars.isScrollX = false;
		}

		swipeVars.ycs = swipeVars.dy + swipeVars.yss; // set x current swipe
		this.style[swipeVars.transform] = 'translate(0px,' + swipeVars.ycs + 'px)'; // set style

	} // -- if

};

swipeVars.endSwipeV = function () {

	if (swipeVars.dy) { // if was offset

		if (swipeVars.isPaginationY) {
			swipeVars.stoppingVerPagination(this);
		}
		else {
			swipeVars.stoppingVerSwipe(this);
		}
	} // -- if

	swipeVars.isPaginationY = false;
	swipeVars.dy = 0; // return to default value
	swipeVars.md = false;
	swipeVars.isScrollX = true;
	swipeVars.isScrollY = true;

};

swipeVars.stoppingVerPagination = function (elem) {
	swipeVars.et = (new Date()).getTime(); // get end time
	swipeVars.curPageY = Math.round(Math.abs(swipeVars.yss / swipeVars.pageHeight));
	swipeVars.speedY = parseInt(swipeVars.dy / (swipeVars.et - swipeVars.st) * 1000);

	if (Math.abs(swipeVars.dy) > swipeVars.minSwipeY && Math.abs(swipeVars.speedY) > swipeVars.maxSpeedNextPageY) {
		if (swipeVars.speedY > 0) {
			swipeVars.curPageY--;
		}
		else {
			swipeVars.curPageY++;
		}
	}
	else {
		swipeVars.curPageY = Math.round(Math.abs(swipeVars.ycs / swipeVars.pageHeight));
	}

	swipeVars.ty = -swipeVars.curPageY * swipeVars.pageHeight;

	if (swipeVars.ty > 0 || swipeVars.dh < 0) {  // edge left position
		swipeVars.yatn = 'all 0.4s ease-out';
		swipeVars.yatm = 'translate(0px,0px)';
	} else if (-swipeVars.ty >= swipeVars.dh) {  // edge right position
		swipeVars.yatn = 'all 0.4s ease-out';
		swipeVars.yatm = 'translate(0px,' + (-swipeVars.dh) + 'px)';
	} else {
		swipeVars.yatn = 'all 0.5s ease-out';
		swipeVars.yatm = 'translate(0px,' + swipeVars.ty + 'px)';
	}

	elem.style[swipeVars.transition] = swipeVars.yatn;
	elem.style[swipeVars.transform] = swipeVars.yatm;
//	KG.volume.sound.play('swipe');
	swipeVars.setActivePointVer(elem);

};

swipeVars.stoppingVerSwipe = function (elem) {
	swipeVars.et = (new Date()).getTime(); // get end time

	if (Math.abs(swipeVars.dy) > swipeVars.minSwipeY) {
		swipeVars.ty = swipeVars.ycs + parseInt(swipeVars.dy / (swipeVars.et - swipeVars.st) * 1000); // get current pos of swipe + speed
	}
	else {
		swipeVars.ty = swipeVars.ycs;
	}
	swipeVars.setEdgePosV(elem);
};

swipeVars.setEdgePosV = function (elem) {
	if (swipeVars.ty > 0 || swipeVars.dh <= 0) {
		swipeVars.yatn = 'all 0.4s ease-out';
		swipeVars.yatm = 'translate(0px,0px)';
	} else if (-swipeVars.ty >= swipeVars.dh) {
		swipeVars.yatn = 'all 0.4s ease-out';
		swipeVars.yatm = 'translate(0px,' + (-swipeVars.dh) + 'px)';
	} else if (Math.abs(swipeVars.ybc - swipeVars.ysc) < 10) {
		swipeVars.yatn = 'all 0s ease-out';
		swipeVars.yatm = 'translate(0px,' + swipeVars.ycs + 'px)';
	} else {
		swipeVars.yatn = 'all 0.5s ease-out';
		swipeVars.yatm = 'translate(0px,' + swipeVars.ty + 'px)';
	}
	elem.style[swipeVars.transition] = swipeVars.yatn;
	elem.style[swipeVars.transform] = swipeVars.yatm;
};

swipeVars.swipeResize = function (selector, paremeters) {
	var divs = document.querySelectorAll(selector);
	var params = eval('(' + paremeters + ')');
	if (params.vertical) {
		swipeVars.resizeSwipeV(divs);
	}
	else {
		swipeVars.resizeSwipeH(divs);
	}
};

swipeVars.resizeSwipeH = function (divs) {

	for (var i = 0, len = divs.length; i < len; i++) {

		swipeVars.tx = swipeVars.xPosition(divs[i].getAttribute('style'));
		if (!swipeVars.tx) swipeVars.tx = 0; // if swipeVars.ty is NaN

		swipeVars.dw = divs[i].clientWidth - divs[i].parentNode.clientWidth;

		if (divs[i].getAttribute('pagination') == 'hor') {
			swipeVars.setPageWidth(divs[i]);
		}
		else {
			swipeVars.setEdgePosH(divs[i]);
		}
	}
};

swipeVars.setPageWidth = function (elem) {
	elem.style[swipeVars.transition] = 'none';

	var divs = elem.querySelectorAll('div'),
		pageWidth = elem.querySelector('div').clientWidth,
		curPos = (swipeVars.xPosition(elem.getAttribute('style'))) ? swipeVars.xPosition(elem.getAttribute('style')) : 0,
		curPage = Math.round(curPos / pageWidth),
		sum = 0,
		i, len;

	for (i = 0, len = divs.length; i < len; i++) {
		if (divs[i].parentNode.getAttribute('pagination') == 'hor') {
			pageWidth = divs[i].parentNode.parentNode.clientWidth;
			divs[i].style.width = pageWidth + 'px';
			sum += divs[i].clientWidth;
		}
	}

	elem.style.width = sum + 'px';
	elem.style[swipeVars.transform] = 'translate(' + (curPage * pageWidth) + 'px,0px)';

};

swipeVars.resizeSwipeV = function (divs) {

	for (var i = 0, len = divs.length; i < len; i++) {

		swipeVars.ty = swipeVars.yPosition(divs[i].getAttribute('style'));
		if (!swipeVars.ty) swipeVars.ty = 0; // if swipeVars.ty is NaN

		swipeVars.dh = divs[i].clientHeight - divs[i].parentNode.clientHeight;

		if (divs[i].getAttribute('pagination') == 'ver') {
			swipeVars.setPageHeight(divs[i]);
		}
		else {
			swipeVars.setEdgePosV(divs[i]);
		}
	}

};

swipeVars.setPageHeight = function (elem) {
	elem.style[swipeVars.transition] = 'none';

	var divs = elem.querySelectorAll('div'),
		pageHeight = elem.querySelector('div').clientHeight,
		curPos = (swipeVars.yPosition(elem.getAttribute('style'))) ? (swipeVars.yPosition(elem.getAttribute('style'))) : 0,
		curPage = Math.round(curPos / pageHeight),
		sum = 0,
		i, len;

	for (i = 0, len = divs.length; i < len; i++) {
		if (divs[i].parentNode.getAttribute('pagination') == 'ver') {
			pageHeight = divs[i].parentNode.parentNode.clientHeight;
			divs[i].style.height = pageHeight + 'px';
			sum += divs[i].clientHeight;
		}
	}

	elem.style.height = sum + 'px';
	elem.style[swipeVars.transform] = 'translate(0px,' + (curPage * pageHeight) + 'px)';

};

swipeVars.addPagePoints = function (elem) {
	var wrapper = elem.parentNode,
		divs = elem.getElementsByTagName('div'),
		span = '',
		i = 0;

	if (!wrapper.querySelector('.point-wrapper')) {
		var pointWrapper = document.createElement('div');
		pointWrapper.className = 'point-wrapper';
		for (i = divs.length; i--;)    span += '<span><\/span>';
		pointWrapper.innerHTML += span;
		pointWrapper.querySelector('span').className = 'active';
		wrapper.insertBefore(pointWrapper, elem.nextSibling); // insert before elem
	}

};

swipeVars.addPageButton = function (elem) {

	var wrapper = elem.parentNode,
		leftButton,
		rightButton,
		pointWrapper = wrapper.querySelector('.point-wrapper');

	if (!pointWrapper) {
		pointWrapper = document.createElement('div');
		pointWrapper.className = 'point-wrapper';
		wrapper.insertBefore(pointWrapper, elem.nextSibling);
	}

	pointWrapper.innerHTML = '<div class="left-button"></div>' + pointWrapper.innerHTML + '<div class="right-button"></div>';

	leftButton = pointWrapper.querySelector('.left-button');
	rightButton = pointWrapper.querySelector('.right-button');

	if (swipeVars.isTouchDevice) {
		leftButton.addEventListener('touchend', swipeVars.swipePagination, false);
		rightButton.addEventListener('touchend', swipeVars.swipePagination, false);
	}
	else {
		leftButton.addEventListener('click', swipeVars.swipePagination, false);
		rightButton.addEventListener('click', swipeVars.swipePagination, false);
	}
};

swipeVars.swipePagination = function () {
	var q = -1, // for right button
		swipeDiv = this.parentNode.previousSibling,
		swipeDirection = swipeDiv.getAttribute('pagination');
	if (this.className == 'left-button') q = 1; // if left button

	if (swipeDirection == 'hor') {
		swipeVars.swipePaginationHor(swipeDiv, q);
	}
	else {
		swipeVars.swipePaginationVer(swipeDiv, q);
	}

};

swipeVars.swipePaginationHor = function (swipeDiv, q) {
	var style = swipeDiv.getAttribute('style'),
		curPosX = (swipeVars.xPosition(style)) ? swipeVars.xPosition(style) : 0,
		pageSize = swipeDiv.querySelector('div').clientWidth,
		maxPage = (swipeVars.getFirstChild(swipeDiv)).length - 1,
		curPage = -Math.round(curPosX / pageSize),
		nextPage = curPage - q,
		spans = swipeDiv.nextSibling.querySelectorAll('span');
	if (nextPage >= 0 && nextPage <= maxPage) {
		swipeDiv.style[swipeVars.transition] = '0.5s all ease-out';
		swipeDiv.style[swipeVars.transform] = 'translate(' + ( -nextPage * pageSize ) + 'px,0px)';
		if (spans.length) {
			for (var i = spans.length; i--;) spans[i].className = '';
			spans[nextPage].className = 'active';
		}
	}
};

swipeVars.getFirstChild = function (parent) {
	var divs = parent.querySelectorAll('div'),
		firstChild = [],
		i;
	for (i = divs.length; i--;) {
		if (divs[i].parentNode.getAttribute('pagination')) {
			firstChild.push(divs[i]);
		}
	}
	return firstChild;
};

swipeVars.swipePaginationVer = function (swipeDiv, q) {
	var style = swipeDiv.getAttribute('style'),
		curPosY = (swipeVars.yPosition(style)) ? swipeVars.yPosition(style) : 0,
		pageSize = swipeDiv.querySelector('div').clientHeight,
		maxPage = (swipeVars.getFirstChild(swipeDiv)).length - 1,
		curPage = -Math.round(curPosY / pageSize),
		nextPage = curPage - q,
		spans = swipeDiv.nextSibling.querySelectorAll('span');

	if (nextPage >= 0 && nextPage <= maxPage) {
		swipeDiv.style[swipeVars.transition] = '0.5s all ease-out';
		swipeDiv.style[swipeVars.transform] = 'translate(0px,' + ( -nextPage * pageSize ) + 'px)';
		if (spans.length) {
			for (var i = spans.length; i--;) spans[i].className = '';
			spans[nextPage].className = 'active';
		}
	}
};

swipeVars.setActivePointHor = function (swipeDiv) {
	if (swipeDiv.nextSibling.className == 'point-wrapper') {
		var style = swipeDiv.getAttribute('style'),
			curPosX = (swipeVars.xPosition(style)) ? swipeVars.xPosition(style) : 0,
			pageSize = swipeDiv.querySelector('div').clientWidth,
			curPage = -Math.round(curPosX / pageSize),
			spans = swipeDiv.nextSibling.querySelectorAll('span');
		if (spans.length) {
			for (var i = spans.length; i--;) spans[i].className = '';
			spans[curPage].className = 'active';
		}
	}
};

swipeVars.setActivePointVer = function (swipeDiv) {
	if (swipeDiv.nextSibling.className == 'point-wrapper') {
		var style = swipeDiv.getAttribute('style'),
			curPosY = (swipeVars.yPosition(style)) ? swipeVars.yPosition(style) : 0,
			pageSize = swipeDiv.querySelector('div').clientHeight,
			curPage = -Math.round(curPosY / pageSize),
			spans = swipeDiv.nextSibling.querySelectorAll('span');
		if (spans.length) {
			for (var i = spans.length; i--;) spans[i].className = '';
			spans[curPage].className = 'active';
		}
	}
};
