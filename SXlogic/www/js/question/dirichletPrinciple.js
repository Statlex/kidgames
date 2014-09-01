(function (win) {

	"use strict";
	/*global window */

	win.sections = win.sections || {};

	win.sections.dirichletPrinciple = {
		name: 'Принцип Дирихле',
		questions: [
			{
				title: 'Футбольный турнир',
				
				text: 'Несколько футбольных команд проводят турнир в один круг. Докажите, что в любой момент турнира найдутся две команды, сыгравшие одинаковое число раз',
				
				answer: 'Утверждение следует из того, что возможное число сыгранных матчей меньше числа команд (исключая сначала команды, не сыгравшие ни одного матча). Здесь "кролики" - команды, "клетки" - число матчей, сыгранных одной командой'

			},
			{
				title: 'Сплошные единицы',
				
				text: 'Докажите, что найдется число, записываемое одними единицами и делящееся на 1999',
				
				answer: 'Рассмотрим последовательность чисел 1, 11, 111, ... Допустим, что ни одно из них не делится на 1999. Поскольку остатки от деления этих чисел на 1999 могут равняться числам от 1 до 1998, то найдутся среди последовательности два числа, дающие при делении на 1999 одинаковые остатки. Тогда их разность делится на 1999. Откинув в этой разности нули, т.е. разделив на степень 10 - число, взаимно простое с 1999, получим число из одних единиц, делящееся на 1999'

			},
			{
				title: '11 чисел',
				
				text: 'Имеется 11 различных натуральных чисел, не больших 20. Докажите, что из них можно выбрать два числа, одно из которых делится на другое',
				
				answer: 'Возьмем все четные числа среди 11 выбранных и разделим каждое на максимальную степень двойки, чтобы в частном получилось нечетное число. Имеем теперь 11 нечетных чисел меньше 20. Среди них есть равные (всего нечетных чисел 10). Отсюда следует утверждение задачи'

			},
			{
				title: 'Многогранники и многоугольники',
				
				text: 'Докажите, что у любого многогранника найдутся по крайней мере две грани, являющиеся многоугольниками с равным числом сторон',
				
				answer: 'Пусть n - наибольшее число сторон у некоторой грани. Тогда к соответствующей грани прилегает n граней с числом сторон, большим, чем три, и меньшим, чем n. Среди них будут хотя бы две с равным числом сторон'

			},
			{
				title: 'Разрез доски',
				
				text: 'Квадратная доска 6x6 заполнена костяшками домино 1x2. Докажите, что можно провести вертикальный или горизонтальный разрез этой доски, не пересекающий ни одной из костяшек домино',
				
				answer: 'Данную доску можно разрезать на два прямоугольника 10 способами (5 вертикальных разрезов и 5 горизонтальных). Если при этом задеваются всякий раз костяшки домино, то при каждом разрезе мы должны разрезать хотя бы две костяшки. При этом различными разрезами разрезаем различные костяшки, т. е. число разрезаемых костяшек будет 10*2 = 20, а всего костяшек - 18. Противоречие. Значит, хотя бы один разрез не задевает ни одной костяшки домино'

			}

		]

	};

}(window));