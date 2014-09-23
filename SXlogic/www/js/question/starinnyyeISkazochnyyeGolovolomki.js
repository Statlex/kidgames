(function (win) {

	"use strict";
	/*global window */

	win.sections = win.sections || {};

	win.sections.starinnyyeISkazochnyyeGolovolomki = {
		name: 'Старинные и сказочные головоломки',
		lang: 'ru',
		questions: [
			{
				title: 'Основание Карфагена',

				text: 'Об основании города Карфагена существует древнее предание. Дидона, дочь тирского царя, потеряв мужа, убитого ее братом, бежала в Африку. Там она купила у нумидийского царя столько земли, "сколько охватит воловья шкура". Когда сделка состоялась, Дидона разрезала воловью шкуру на тонкие ремешки и благодаря такой уловке охватила участок земли, достаточный для сооружения крепости. Так будто бы возникла крепость Карфаген, а впоследствии был построен и город._!_Попробуйте приблизительно определить, какую площадь могла, согласно этому преданию, занять крепость, если считать, что размер воловьей шкуры 4 кв. м., а ширина ремешков, на которые Дидона ее разрезала, 1 мм.',
				hint: '',
				answer: 'Если площадь воловьей шкуры 4 кв. м. (или 4 млн. кв. мм.), а ширина ремешков 1 мм., то общая длина вырезанного ремня (Дидона, надо думать, вырезала его спирально) - 4 миллиона миллиметров, или 4000 метров, т.е. 4 км. Таким ремнем можно окружить квадратный участок 1 кв. км. и круглый - в 1,3 кв. км.'

			},
			{
				title: 'Стая уток',

				text: 'Летела стая уток. Одна впереди, две позади; одна позади и две впереди; одна между двумя и три в ряд. Сколько летело уток.',
				hint: '',
				answer: 'Летели одна за другой три утки'

			},
			{
				title: 'Влезет или нет?',

				text: 'Это старинная головоломка. Вырежьте в листе плотной бумаги круглую дырку и предложите кому-нибудь просунуть в нее монетку, бОльшую по диаметру. Надрывать бумагу или каким-то образом сгибать и ломать, а также распиливать монету - нельзя.',
				hint: '',
				answer: 'Сложите лист бумаги "кульком", дыра должна находиться в самом низу. Затем возьмите бумагу обеими руками и попросите кого-нибудь бросить монетку в "кулек" - пусть она упадет прямо на дно и выглянет нижним концом из дырки. После этого слегка приподнимите углы "кулька" - этого окажется достаточно, чтобы отверстие увеличилось и монетка через секунду-другую вывалилась в дырку. При этом бумага осталась неповрежденной.'

			},
			{
				title: 'Безопасная переправа',

				text: 'Крестьянину нужно перевезти через реку волка, козу и капусту. Лодка небольшая: в ней может поместиться крестьянин, а с ним или только коза, или только волк, или только капуста. Но если оставить волка с козой, то волк сьест козу, а если оставить козу с капустой, то коза сьест капусту. Как перевез свой груз крестьянин?',
				hint: '',
				answer: 'Ясно, что начинать приходится с козы. Крестьянин, перевезя козу, возвращается и берет волка, которого перевозит на другой берег, где его и оставляет, но зато берет и везет обратно на первый берег козу. Здесь он оставляет ее и перевозит к волку капусту. Вслед за тем, возвратившись, он перевозит козу, и переправа оканчивается благополучно'

			},
			{
				title: 'Два отца и два сына',

				text: 'Говорят, что два отца и два сына нашли на дороге, ведущей в Бомбей, три рупии (серебряные монеты) и быстро поделили их между собой, причем каждому досталось по монете. Как им удалось справиться с задачей?',
				hint: '',
				answer: 'Путники смогли разделить находку поровну, потому что их было трое: дед, отец и сын (или по-другому - два отца и два сына)'

			},
			{
				title: 'Семья маляров',

				text: 'У трех маляров был брат Иван, а у Ивана братьев не было. Как это могло случиться?',
				hint: '',
				answer: 'Маляры были сестрами'

			},
			{
				title: 'Головоломка в стихах',

				text: 'Это русская народная потешка, а в ней интересная загадка.<br>Прилетели галки,<br>Сели на палки.<br>Если на каждой палке<br>Сядет по одной галке,<br>То для одной галки<br>Не хватит палки.<br>Если же на каждой палке<br>Сядет по две галки,<br>То одна из палок<br>Будет без галок.<br>Сколько было галок?<br>Сколько было палок?',
				hint: '',
				answer: 'Четыре галки, три палки'

			},
			{
				title: 'Сколько было яиц?',

				text: 'Это старинная народная задача. Крестьянка пришла на базар продавать яйца. Первая покупательница купила у нее половину всех яиц и еще пол-яйца. Вторая покупательница приобрела половину оставшихся яиц и еще пол-яйца. Третья купила всего одно яйцо. После этого у крестьянки не осталось ничего. Сколько яиц она принесла на базар?',
				hint: '',
				answer: 'Задачу решают с конца. После того как вторая покупательница приобрела половину оставшихся яиц и еще пол-яйца, у крестьянки осталось только одно яйцо. Значит, полтора яйца составляют вторую половину того, что осталось после первой продажи. Ясно, что полный остаток составляет три яйца. Прибавив пол-яйца, получим половину того, что имелось у крестьянки первоначально. Итак, число яиц, принесенных ею на базар, семь'

			},
			{
				title: 'Как поделить?',

				text: 'Как разделить 5 яблок между пятью лицами так, чтобы каждый получил по яблоку и одно яблоко осталось в корзине',
				hint: '',
				answer: 'Один человек берет яблоко вместе с корзиной'

			},
			{
				title: 'Разделить по справедливости',

				text: 'Трое крестьян: Иван, Петр и Николай - за выполненную работу получили мешок зерна. На беду под рукой не оказалось мерки и пришлось делить зерно на глазок. Старший среди крестьян - Иван - рассыпал зерно на три кучи, как он считал, поровну:<br>- Первую кучу возьми ты, Петр, вторая достанется Николаю, а третья мне.<br>- Я не согласен на это, - возразил Николай, - моя куча зерна ведь самая маленькая.<br>Поспорили крестьяне. Чуть до ссоры не дошло. Пересыпают зерно из одной кучи в другую, из другой в третью и никак к согласию не придут, обязательно кто-нибудь недоволен.<br>- Будь мы вдвоем, я да Петр, - вскричал в сердцах Иван, я бы мигом разделил. Рассыпал бы зерно на две равные кучи и предложил бы Петру выбрать любую, а оставшуюся взял бы себе. Оба мы были бы довольны. А тут не знаю, как и быть. Задумались крестьяне, как же разделить зерно, чтоб все были довольны, чтоб каждый был уверен, что получил не меньше трети. И придумали.<br>Придумайте и вы.',
				hint: '',
				answer: 'Иван предложил делить зерно так: - Я рассыпаю зерно на три кучи, на мой взгляд, поровну и отхожу в сторону. Мне подойдет любая из куч. Пусть затем Петр укажет наименьшую, по его мнению, кучу зерна. Если Николай также посчитает, что зерна в этой куче меньше трети, то отдайте ее мне, а остаток зерна делите между собой известным уже способом. Если же Николай решит, что в указанной куче не меньше трети зерна, пусть возьмет ее себе. Петр возьмет наибольшую, по его мнению, кучу, а оставшаяся достанется мне. Крестьяне последовали предложению Ивана, разделили зерно и, довольные, разошлись'

			},
			{
				title: 'Задача Диофанта',

				text: 'Найдите три числа, которые при попарном сложении дают в сумме двадцать, тридцать и сорок',
				hint: '',
				answer: 'Числа 5, 15 и 25'

			},
			{
				title: 'Кролики Фибоначчи',

				text: 'Эта задача придумана итальянским ученым Фибоначчи, жившим в 13-м веке.<br>Некто приобрел пару кроликов и поместил их в огороженный со всех сторон загон. Сколько кроликов будет через год, если считать, что каждый месяц пара дает в качестве приплода новую пару кроликов, которые со второго месяца жизни также начинают приносить приплод?',
				hint: '',
				answer: '377 пар. В первый месяц кроликов окажется уже 2 пары: 1 первоначальная пара, давшая приплод, и 1 родившаяся пара. Во второй месяц кроликов будет 3 пары: 1 первоначальная, снова давшая приплод, 1 растущая и 1 родившаяся. В третьем месяце - 5 пар: 2 пары, давшие приплод, 1 растущая и 2 родившиеся. В четвертом месяце - 8 пар: 3 пары, давшие приплод, 2 растущие пары, 3 родившишиеся пары. Продолжая рассмотрение по месяцам, можно установить связь между количествами кроликов в текущий месяц и в два предыдущих. Если обозначить количество пар через N, а через m - порядковый номер месяца, то Nm = Nm-1 + Nm-2 . С помощью этого выражения рассчитывают количество кроликов по месяцам года: 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377'

			},
			{
				title: 'Дед и внуки',

				text: 'Эта задача из книги "Арифметика" Леонтия Магницкого.<br>Чтобы порадовать внуков, дед купил для них орехи. Но прежде чем разрешить внукам полакомиться, дед попросил внуков поделить орехи на две части, чтобы меньшая часть, увеличенная в четыре раза, была бы равна большей части, уменьшенной в три раза. Что за части?',
				hint: '',
				answer: '1 и 12 орехов. Также правильным ответом будет любая пара целых чисел с соотношением 12 к 1'

			},
			{
				title: '100 учеников',

				text: 'Еще одна задача из книги "Арифметика" Леонтия Магницкого.<br>Отец решил отдать сына в учебу и спросил учителя: "Скажи, сколько учеников у тебя в классе?" Учитель ответил: "Если придет еще учеников столько же, сколько имею, и полстолько, и четвертая часть, и твой сын, тогда будет у меня сто учеников". Сколько же учеников было в классе?',
				hint: '',
				answer: '36 учеников'

			},
			{
				title: 'Трудное наследство',

				text: 'Итальянец Тарталья, который первым обнаружил способ нахождения корней кубического уравнения, придумал задачу о семнадцати лошадях.<br>В завещании умершего отца семейства говорилось, что имевшихся в хозяйстве семнадцать лошадей следовало поделить между тремя наследниками в отношении одна вторая к одной третьей к одной девятой. Как выполнить завещание?',
				hint: '',
				answer: '2, 6 и 9 лошадей. Сам Тарталья предложил следующее решение. Для раздела имеющихся лошадей необходимо заимствовать еще одну, после чего их общее количество станет 18. Раздел этого количества даст 2, 6 и 9 лошадей, которых в сумме окажется 17. Одна лошадь из 18 оказалась как бы "лишней" - это заимствованная лошадь, которую следует вернуть владельцу после раздела имущества. Проще решить головоломку иначе: пропорцию 1\\2 : 1\\3 : 1\\9 достаточно домножить на 18 и получится тот же результат'

			},
			{
				title: 'Странный дом',

				text: 'Сооружено сее жильё всего из одного камня, либо из досок деревянных двух. Есть у дома сего ограда, цветник, подвал. Живёт в сеём жилище всего один человек, стар или млад. Но не выходит человек этот из подвала, ни чтобы цветником полюбоваться, ни чтобы иное дело сделать. Не двигается и не ест и не пьёт человек сей. Вопрос: почему?',
				hint: '',
				answer: '"Жилец" - покойник. Камень - надгробие, две доски - крест, цветник - высаженные цветы'

			},
			{
				title: 'Задача для репетитора',

				text: 'В рассказе А. П. Чехова "Репетитор" гимназист Егор Зиберов не сумел решить арифметическую задачу, а отец репетируемого ученика, отставной губернский секретарь Удодов, пощелкав на счетах, получил правильный ответ. Решите и Вы эту задачу арифметически. Интересно, умеют ли решать подобные задачи современные репетиторы. Вот она.<br>Купец купил 138 аршин черного и синего сукна за 540 руб. Спрашивается, сколько аршин купил он и того и другого, если синее стоило 5 руб. за аршин, а черное - 3 руб.?',
				hint: '',
				answer: 'Если бы купец приобрел сукно одного типа, например синее, то он заплатил бы 138*5 = 690 руб. Образовавшаяся разность в 150 руб. получена за счет того, что черное сукно повышено в цене на 2 руб. Значит, черного сукна было 150:2 = 75 аршин, а синего было 138-75 = 63 аршина'

			},
			{
				title: 'Стая гусей',

				text: 'Летела стая гусей, а навстречу им летит один гусь и говорит: "Здравствуйте, сто гусей!" "Нас не сто гусей,- отвечает ему вожак стада,- если бы нас было столько, сколько теперь, да еще столько, да полстолька, да четверть столька, да еще ты, гусь, с нами, так тогда нас было бы сто гусей". Сколько было в стае гусей?',
				hint: '',
				answer: 'В стае было 36 гусей. 36+36+18+9+1 = 100'

			},
			{
				title: 'Пчелы',

				text: 'Вот одна задача из древнего индийского трактата:<br>- если 1/5 пчелиного роя полетела на цветы лаванды, 1/3 – на цветы липы, утроенная разность этих чисел полетела на дерево, а одна пчела продолжала летать между ароматными кетаки и малати, то сколько всего было пчел?',
				hint: '',
				answer: 'Всего было 15 пчел. Любой современный школьник легко решит эту задачу с помощью уравнения, но попробуйте решить арифметически'

			}

		]

	};

}(window));