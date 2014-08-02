(function (win) {

	"use strict";
	/*global window */

	win.langs = win.langs || {};

	win.langs.ru = {
		language: 'language',
		languageName: 'english',
		// <-- rate us
		rateUs: {
			rateUs: 'Оценить приложение',
			pleaseRateUs: 'Пожалуйста, оцените приложение :)',
			stars: ['none', 'Ужасно', 'Плохо', 'Неплохо', 'Хорошо', 'Отлично'],
			stillNotRated: 'Пока нет оценки',
			writeFeedBackHere: 'Написать отзыв...',
			sendFeedback: 'Отправить отзыв разработчикам',
			rateUsOnGooglePlay: 'Оценить приложение на Google Play',
			notNow: 'Не сейчас'
		},

		mailSendingIsSuccessful: 'Письмо успешно отправлено!',
		mailSendingIsFailed: 'Письмо НЕ было отпралено,\nпроверьте соединение с интернетом.'
		// /--> rate us
	};

}(window));