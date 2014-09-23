(function (win) {

	"use strict";
	/*global window */

	win.langs = win.langs || {};

	win.langs.ru = {
		language: 'язык',
		languageName: 'Русский',
		// <-- rate us
		rateUs: {
			rateUs: 'Оценить приложение',
			pleaseRateUs: 'Пожалуйста, оцените приложение :)',
			stars: ['none', 'Ужасно', 'Плохо', 'Неплохо', 'Хорошо', 'Отлично'],
			stillNotRated: 'Пока нет оценки',
			writeFeedBackHere: 'Написать отзыв...',
			sendFeedback: 'Оценить',
			rateUsOnGooglePlay: 'Оценить на Google Play',
			rateUsOnAppStore: 'Оценить на App Store',
			notNow: 'Не сейчас'
		},

		mailSendingIsSuccessful: 'Спасибо за Ваш отзыв!',
		mailSendingIsFailed: 'Письмо НЕ было отпралено,\nпроверьте соединение с интернетом.'
		// /--> rate us
	};

}(window));