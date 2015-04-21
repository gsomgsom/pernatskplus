// ==UserScript==
// @name        pernatskPlus
// @description Добавляет плюшечки и рюшечки
// @author      zhelneen@yandex.ru
// @license     MIT
// @domain      https://pernatsk.ru/*
// @namespace   https://pernatsk.ru/*
// @include     https://pernatsk.ru/*
// @match       https://pernatsk.ru/*
// @version     0.1.5 beta
// ==/UserScript==

$(function(){
	var addr = location.pathname;
	var lvl = parseInt($('div [title="уровень"] > b:last').text()); // уровень
	var coinsToKarma = 0;

	// Тотемный столб
	if (addr = '/square/totemic') {

		// Подсчёт оставшихся монет для столба
		$('.karma-append').remove();
		var karma = parseInt($('.karma').find('b:last').text().replace(/\s/g, ''));
		coinsToKarma = ((1000-karma)*5*lvl);
		if (karma < 1000) {
			$('.karma').append('<span class="karma-append">, осталось пожертвовать '+coinsToKarma+' <b title="монеты" class="g18_icons i_coin"><span>{coins}</span></b> <b id="add-full-karma" title="Положить остаток" class="inbox-plus">+</b></span>');
		}
		else {
			$('.karma').append('<span class="karma-append">, сегодня больше жертвовать не надо.</span>');
		}

	}
	// Положить денег до максимума крамы
	$('#add-full-karma').unbind('click').click(function(){
		$('#totemic-money').val(coinsToKarma);
		$('#res')[0].checked = true;
	});

	// Тастики - расшифровка
	var tasticQuest = $('.tastic-q').text();
	var tasticDescription = '<strong>Загадка ;)</strong>';

	if (tasticQuest.indexOf('Бей врагов и – вот сюрприз – ставь зубастый механизм.')) {
		tasticDescription = 'Необходимо установить капкан и поймать сколько указано птиц.';
	}
	else
	if (tasticQuest.indexOf('Бей и грабь, копи добро: злато или серебро.')) {
		tasticDescription = 'Необходимо стащить количество монет, указанное в тастике.';
	}
	else
	if (tasticQuest.indexOf('Бей статую, бей по глазу, выполняй мои заказы.')) {
		tasticDescription = 'Успешно метнуть в солевиков кувалду сколько указано раз.';
	}
	else
	if (tasticQuest.indexOf('Бой, бюро иль злыдничи: зелёных пазлов получи.')) {
		tasticDescription = 'Набрать указанное количество опыта.';
	}
	else
	if (tasticQuest.indexOf('Бой, другой, и ты страдаешь, ведь здоровье ты теряешь.')) {
		tasticDescription = 'Потерять указанное количество здоровья.';
	}
	else
	if (tasticQuest.indexOf('Вещь покупай, с нею летай; она надевается, прочность снижается.')) {
		tasticDescription = 'Использовать уник указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Враг твой терпит поражение, без здоровья нет движения.')) {
		tasticDescription = 'Нанести количество урона, указанное в тастике.';
	}
	else
	if (tasticQuest.indexOf('Выгодное дельце предлагает часто, если не лениться - вмиг обогатишься!')) {
		tasticDescription = 'Бюро - получить указанное количество монет.';
	}
	else
	if (tasticQuest.indexOf('Говорят, что с ним азарт вовсе бесполезен, пять колод краплёных карт, да и сам не особо любезен.')) {
		tasticDescription = 'Сыграть в блек птиц.';
	}
	else
	if (tasticQuest.indexOf('Даже если есть сноровка, арендуй экипировку...')) {
		tasticDescription = 'Арендовать экипировку в лабиринте (покупка не считается).';
	}
	else
	if (tasticQuest.indexOf('Дождись награды регулярной, что получает всяк пернатый.')) {
		tasticDescription = 'Получить военное пособие.';
	}
	else
	if (tasticQuest.indexOf('Есть разных видов и цветов... Их отыщи и будь таков!')) {
		tasticDescription = 'Найти пуговки (?)';
	}
	else
	if (tasticQuest.indexOf('Есть у каждого из нас дятлов статуи простые. Мой указ - продлить одну, какую - безразлично.')) {
		tasticDescription = 'Арендовать или продлить любого дятла';
	}
	else
	if (tasticQuest.indexOf('Зайцы будут очень рады, еще ближе ты к награде.')) {
		tasticDescription = 'Продать на барахолке указанное количество предметов.';
	}
	else
	if (tasticQuest.indexOf('Злыдничам по клюву бей, собирай златой трофей.')) {
		tasticDescription = 'Собрать указанное количество золотых шишек.';
	}
	else
	if (tasticQuest.indexOf('Злые птицы в лесу обитают, пернатых грабят и горя не знают.')) {
		tasticDescription = 'Победить указанное количество злыдничей.';
	}
	else
	if (tasticQuest.indexOf('К бурундуку иди-ка смело: появилось супер-дело.')) {
		tasticDescription = 'Выполнить указанное количество контрактов в бюро.';
	}
	else
	if (tasticQuest.indexOf('К петуху в кусты иди, под хвост дозу получи.')) {
		tasticDescription = 'Попытаться пробраться в поместье Ефремыча и проиграть.';
	}
	else
	if (tasticQuest.indexOf('К Филу отправляйся, яро ты сражайся.')) {
		tasticDescription = 'Победить в сражалке указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('К Хоббе снова возвращайся и с вещицами прощайся.')) {
		tasticDescription = 'Утилизировать указанное количество вещей.';
	}
	else
	if (tasticQuest.indexOf('Капкан, звезда, адреналин.')) {
		tasticDescription = 'Активировать любой гаджет.';
	}
	else
	if (tasticQuest.indexOf('Коль любитель приключений, получи в лесу по перьям!')) {
		tasticDescription = 'Заблудись в лесу, на развилке) и отхвати там....';
	}
	else
	if (tasticQuest.indexOf('Летают по Пернатску птицы, используют редкие вещицы.')) {
		tasticDescription = 'Активировать любой редлик.';
	}
	else
	if (tasticQuest.indexOf('Может сильно сдаться, что можешь ты поддаться.')) {
		tasticDescription = 'Проиграть в сражалке указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('На пеньке, где поляна, ты найдёшь часть павлина.')) {
		tasticDescription = 'Получить перо (либо продлить медальон, либо разбить солевика, либо найти перо в разведке/бюро).';
	}
	else
	if (tasticQuest.indexOf('На шее болтаются, птицам очень нравятся, улучшай-улучшай и с прокачанным летай')) {
		tasticDescription = 'Улучшить любую ожерелку.';
	}
	else
	if (tasticQuest.indexOf('Найди же то, из чего делают лечебные мази, добывают ценное масло и что засахаривают в меду на зиму.')) {
		tasticDescription = 'Найти количество шишек, указанное в тастике';
	}
	else
	if (tasticQuest.indexOf('Не мильён и не копейка – справедлива лотерейка.')) {
		tasticDescription = 'Выйграть в лотерею указанное число раз.';
	}
	else
	if (tasticQuest.indexOf('Не настолько тяжко бремя с бурундуком потратить время.')) {
		tasticDescription = 'Провести указанное время в бюро (в минутах).';
	}
	else
	if (tasticQuest.indexOf('Ну… в лесу ты заблудись… выбрав путь, домой вернись.')) {
		tasticDescription = 'Попасть на развилку указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Нужно здесь терять ресурсы, спроси зайцев: они в курсе.')) {
		tasticDescription = 'Купить на барахолке указанное количество предметов.';
	}
	else
	if (tasticQuest.indexOf('Нужно круче тебе стать, чтобы премию набрать...')) {
		tasticDescription = 'Прокачать единицу пернатости.';
	}
	else
	if (tasticQuest.indexOf('Он деньги всем даёт, кто контракты в срок сдаёт.')) {
		tasticDescription = 'Заработать указанное количество монет в бюро.';
	}
	else
	if (tasticQuest.indexOf('Он железный, и он птиц, перебил он много лиц.')) {
		tasticDescription = 'Провести успешно с Железным Птицем указанное количество боев.';
	}
	else
	if (tasticQuest.indexOf('Он стриж, а может быть енот, приобрети его услуги, без лишних забот.')) {
		tasticDescription = 'Заказать прогноз погоды (можно и бесплатный).';
	}
	else
	if (tasticQuest.indexOf('Очень весело и быстро по пещере прокатись-ка.')) {
		tasticDescription = 'Снести санками иммунитет любому солевику.';
	}
	else
	if (tasticQuest.indexOf('По наводке двух хорьков шишки поищи')) {
		tasticDescription = 'Провести в разведке указанное количество минут.';
	}
	else
	if (tasticQuest.indexOf('Поблукай в лесу немного там, где желтая дорога')) {
		tasticDescription = 'Отправиться в лабиринт';
	}
	else
	if (tasticQuest.indexOf('Под землёй стоит статуя, у статуи нету')) {
		tasticDescription = 'Разместить солевик в пещере.';
	}
	else
	if (tasticQuest.indexOf('Подойди-ка ты к столбу, вознеси-ка ты мольбу.')) {
		tasticDescription = 'Помолиться тотему указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Покажи, что ты не жмот, выиграй, но наоборот.')) {
		tasticDescription = 'Потерять в сражалке указанное количество монет.';
	}
	else
	if (tasticQuest.indexOf('Поставил противник ловушку, поймает тебя – закатит пирушку.')) {
		tasticDescription = 'Попасть в капкан указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Редкие вещи повсюду ищи, несколько штук и мне покажи.')) {
		tasticDescription = 'Найти указанное количество редликов.';
	}
	else
	if (tasticQuest.indexOf('Сделай для себя заметку, чтоб отправиться в разведку.')) {
		tasticDescription = 'Успешно слетать в разведку указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Сделай с вещами то, не знаю что: не надеть, не продать')) {
		tasticDescription = 'Выкинуть указанное количество вещей.';
	}
	else
	if (tasticQuest.indexOf('Собери бумажек пачку, обменяй их на заначку')) {
		tasticDescription = 'Обменять сертификаты.';
	}
	else
	if (tasticQuest.indexOf('То, что падает в лесу, собери-ка ты в бою.')) {
		tasticDescription = 'Выбить в сражалке указанное количество шишек.';
	}
	else
	if (tasticQuest.indexOf('Тут без стаи трудно жить, надо б шишечек вложить')) {
		tasticDescription = 'Положить в кубышку указанное количество шишек.';
	}
	else
	if (tasticQuest.indexOf('Ты, похоже, сам не свой, отдыхать иди, малой.')) {
		tasticDescription = 'Отправиться в спячку.';
	}
	else
	if (tasticQuest.indexOf('У Бублика игра есть непростая, играй, по шишкам возрастая.')) {
		tasticDescription = 'Выйграть в весышку указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Условие простое – перчатки натянул, противника в бою нагнул.')) {
		tasticDescription = 'Выйграть на ринге указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Хватит терять блестящий металл: нычки спасут родной капитал!')) {
		tasticDescription = 'Продлить нычку на монеты.';
	}
	else
	if (tasticQuest.indexOf('Чтоб за всеми уследить, надо вовремя платить!')) {
		tasticDescription = 'Продлить или нанять партизан (синиц или воробьев).';
	}
	else
	if (tasticQuest.indexOf('Чтоб на рынке торговать, нужно денежку отдать!')) {
		tasticDescription = 'Купить или продлить аренду палатки';
	}
	else
	if (tasticQuest.indexOf('Чтоб хилыми крылами не махать, ты должен их тренировать.')) {
		tasticDescription = 'Прокачать указанное количество характеристик (включая выносливость и интеллект).';
	}
	else
	if (tasticQuest.indexOf('Эти вещицы в бою попадаются, те, что даст тотем, совсем не считаются.')) { // ok
		tasticDescription = 'Найти столько колекционных предметов, сколько указано.';
	}
	else
	if (tasticQuest.indexOf('Этот крепкий инструмент разбивает соль в момент.')) {
		tasticDescription = 'Найти кувалду.';
	}

	$('.tastic-description').remove();
	$('.tastic-q').after('<div class="tastic-q tastic-description"><b class="gt">Описание:</b>'+tasticDescription+'</div>');

	// Барахолка
	if (addr = '/location/fleamarket/index/type/all/currency/all/auction/mix/sort/price/order/asc') {
		$('.list-view > .items').each(function(e){
			// @TODO - получать данные о продавце и добавлять значок стаи, название стаи и ссылку на неё
			console.log(e);
		});
	}

});
