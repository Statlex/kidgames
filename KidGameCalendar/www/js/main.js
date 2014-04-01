$(function(){

	lang.push(info.lang);

	templateContainer.init();

	new APP.MainMenuView();

	new APP.MainView();

	(new Calendar()).getMonthPage({year:2000, month: 1});


});