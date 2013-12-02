(function () {

	window.KG = window.KG || {};

	KG.message = function (text) {
	   	var messageClone = document.getElementById('message-clone'),
		    wrapperButton = document.getElementById('wrapper-button'),
			messageBg = document.getElementById('message-bg');
		if (messageClone) {
			messageClone.parentNode.removeChild(messageClone);
			wrapperButton.style.display = 'block';
			messageBg.style.display = 'none';
		}
		else {
			var message = document.getElementById('message'),
				cloneNode = message.cloneNode(true),
				innerText = cloneNode.querySelector('.message-text'),
				body = document.querySelector('body');
			messageBg.style.display = 'block';
			innerText.innerHTML = text;
			cloneNode.id = 'message-clone';
			cloneNode.className = 'visible';
			body.appendChild(cloneNode);
			wrapperButton.style.display = 'none';
			setButton();
		}
	};

	var setButton = function() {
		var button = document.querySelector('#message-clone .OK'),
			close = function() {
				var wrapper = document.getElementById('message-clone'),
					wrapperButton = document.getElementById('wrapper-button'),
					messageBg = document.getElementById('message-bg');
				messageBg.style.display = 'none';
				wrapperButton.style.display = 'block';
				wrapper.parentNode.removeChild(wrapper);
		};
		if ('ontouchstart' in document.documentElement) {
			button.addEventListener('touchstart', close, false);
		}
		else {
			button.addEventListener('click', close, false);
		}
	};

	var setBg = function() {
		var messageBg = document.getElementById('message-bg'),
			wrapperButton = document.getElementById('wrapper-button'),
			messageClone,
			close = function() {
				messageBg.style.display = 'none';
				wrapperButton.style.display = 'block';
				messageClone = document.getElementById('message-clone');
				messageClone.parentNode.removeChild(messageClone);
			};
		if ('ontouchstart' in document.documentElement) {
			messageBg.addEventListener('touchstart', close, false);
		}
		else {
			messageBg.addEventListener('click', close, false);
		}
	};

	window.addEventListener('load', setBg, false);

}());