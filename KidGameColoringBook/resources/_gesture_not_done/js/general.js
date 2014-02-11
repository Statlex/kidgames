window.onload = function() {
	getGesture();
}

function getGesture() {
	var gestureEl = document.getElementsByClassName('get-gesture')[0];
	gestureEl.addEventListener('click', getClick, false);
	gestureEl.addEventListener("gesturestart", gestureStart, false);
	gestureEl.addEventListener("gesturechange", gestureChange, false);
	gestureEl.addEventListener("gestureend", gestureEnd, false);
}

function getClick() {
	alert(this.innerHTML);
}

function gestureStart() {

	//alert(' gestureStart ' +  this.innerHTML);
}

//'scale(' + e.scale  + startScale  + ') rotate(' + e.rotation + startRotation + 'deg)';

function gestureChange() {
	this.innerHTML = event.scale + '<br>' + event.rotation;
	event.preventDefault();
}

function gestureEnd() {

}




