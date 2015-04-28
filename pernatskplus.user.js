// ==UserScript==
// @name        pernatskPlus
// @description Улучшает и без того хорошую игру "Пернатск".
// @author      zhelneen@yandex.ru
// @license     MIT
// @domain      https://pernatsk.ru/*
// @namespace   https://pernatsk.ru/*
// @include     https://pernatsk.ru/*
// @match       https://pernatsk.ru/*
// @version     0.2.3
// ==/UserScript==

$(function(){
	var addr = location.pathname; // алиас относительного пути
	var lvl = parseInt($('div [title="уровень"] > b:last').text()); // уровень
	var coinsToKarma = 0; // монет до полной кармы
	
	var clanIcons = true; // показывать значки стай

	// Загружаем настройки
	if (supportsLocalStorage()) {
		if (typeof localStorage["pernatskPlus.clanIcons"] == "undefined") {
			localStorage["pernatskPlus.clanIcons"] = clanIcons;
		}
		clanIcons = (localStorage["pernatskPlus.clanIcons"] == "true");
	}

	// Проверяет, можно ли пользоваться local storage
	function supportsLocalStorage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			console.log('localStorage не работает.');
			return false;
		}
	}

	// Подгружает иконки стай птицам в контейнере t
	function getBirdsClans (t) {
		if (!clanIcons) {
			console.log('Значки стай отключены в настройках.');
			return false;
		}

		var href = $(t).parent().parent().attr('href');
		if (typeof href === "undefined") {
			href = $(t).parent().attr('href');
		}
		var bird = t;
		$(t).parent().find('img').remove();
		$.ajax({
			type: 'GET',
			cache: true,
			url: href,
			success: function (data) {
				var img = $(data).find('.name-line .clan');
				var clan = $(img).parent().find('b').text();
				if (img.length == 0) {
					clan = $(data).find('.clan > a > b:last').text();
					if (clan.length > 0) {
						img = $('<b class="g18_icons i-clan"></b>');
					}
				}
				$(img).attr('title', clan);
				$(bird).after($(img));
			}
		});
	}

	// Проставим значок стаи всем птицам, засветившимся в "коротких сообщениях" в левом сайдбаре
	$('#actions-0').find('[title="уровень"]').each(function(){getBirdsClans(this)});

	// Настройки
	if (addr == '/nest/bird/settings') {
		// форма с настройками юзерскрипта
		var settingsFormPlus = 
		'<div id="settingsFormPlus">'+
		'	<div class="stat-ct">pernatskPlus</div>'+
		'	<div class="set-3">'+
		//'		<div class="set-action">'+
		//'			<b>Кэширование персонажей</b>:'+
		//'			<br>'+
		//'			<select id="configPlusCache" name="configPlusCache">'+
		//'				<option selected="selected" value="0">Не кэшируем</option>'+
		//'				<option value="1">1 час</option>'+
		//'				<option value="3">3 часа</option>'+
		//'				<option value="6">6 часов</option>'+
		//'			</select>'+
		//'		</div>'+
		'		<b class="g18_icons i-clan" title="Значки стай"></b>'+
		'		<input id="configPlusClanIcons" type="checkbox" value="1" name="configPlusClanIcons">'+
		'		Включить <b>Значки стай</b>'+
		'		<div class="separator"></div>'+
		'		<div class="set-action">'+
		'			<button class="butt_action butt_mid butt_save_plus_config">Сохранить</button>'+
		'		</div>'+
		'	</div>'+
		'</div>';

		$('#settingsFormPlus').remove();
		$('.pl-sub-cont > .pl-sub-ct table tr:first td:last').prepend(settingsFormPlus);
		
		if (clanIcons) {
			$('#configPlusClanIcons').attr('checked', 'checked');
		}
		else {
			$('#configPlusClanIcons').removeAttr('checked');
		}

		$('.butt_save_plus_config').unbind('click').click(function() {
			if (!supportsLocalStorage()) { return false; }
			clanIcons = ($('#configPlusClanIcons').attr('checked') == 'checked');
			console.log('Сохраняем настройки. ' + clanIcons);
			localStorage["pernatskPlus.clanIcons"] = clanIcons;
		});

	}

	// Тотемный столб
	if (addr == '/square/totemic') {

		// Подсчёт оставшихся монет для столба
		$('.karma-append').remove();
		var karma = parseInt($('.karma').find('b:last').text().replace(/\s/g, ''));
		coinsToKarma = ((1000-karma)*5*(lvl+1));
		if (karma < 1000) {
			$('.karma').append('<span class="karma-append">, осталось пожертвовать '+coinsToKarma+' <b title="монеты" class="g18_icons i_coin"><span>{coins}</span></b> <b id="add-full-karma" title="Положить остаток" class="inbox-plus">+</b></span>');
		}
		else {
			$('.karma').append('<span class="karma-append">, сегодня больше жертвовать не надо.</span>');
		}

	}
	// Положить денег до максимума кармы
	$('#add-full-karma').unbind('click').click(function(){
		$('#totemic-money').val(coinsToKarma);
		$('#res')[0].checked = true;
	});

	// Тастики - расшифровка
	var tasticQuest = $('.tastic-q').text();
	var tasticDescription = '<strong>Загадка ;)</strong>';

	if (tasticQuest.indexOf('Бей врагов и – вот сюрприз – ставь зубастый механизм.') > 0) {
		tasticDescription = 'Необходимо установить капкан и поймать сколько указано птиц.';
	}
	else
	if (tasticQuest.indexOf('Бей и грабь, копи добро: злато или серебро.') > 0) {
		tasticDescription = 'Необходимо стащить количество монет, указанное в тастике.';
	}
	else
	if (tasticQuest.indexOf('Бей статую, бей по глазу, выполняй мои заказы.') > 0) {
		tasticDescription = 'Успешно метнуть в солевиков кувалду сколько указано раз.';
	}
	else
	if (tasticQuest.indexOf('Бой, бюро иль злыдничи: зелёных пазлов получи.') > 0) {
		tasticDescription = 'Набрать указанное количество опыта.';
	}
	else
	if (tasticQuest.indexOf('Бой, другой, и ты страдаешь, ведь здоровье ты теряешь.') > 0) {
		tasticDescription = 'Потерять указанное количество здоровья.';
	}
	else
	if (tasticQuest.indexOf('Вещь покупай, с нею летай; она надевается, прочность снижается.') > 0) {
		tasticDescription = 'Использовать уник указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Враг твой терпит поражение, без здоровья нет движения.') > 0) {
		tasticDescription = 'Нанести количество урона, указанное в тастике.';
	}
	else
	if (tasticQuest.indexOf('Выгодное дельце предлагает часто, если не лениться - вмиг обогатишься!') > 0) {
		tasticDescription = 'Бюро - получить указанное количество монет.';
	}
	else
	if (tasticQuest.indexOf('Говорят, что с ним азарт вовсе бесполезен, пять колод краплёных карт, да и сам не особо любезен.') > 0) {
		tasticDescription = 'Сыграть в блек птиц.';
	}
	else
	if (tasticQuest.indexOf('Даже если есть сноровка, арендуй экипировку...') > 0) {
		tasticDescription = 'Арендовать экипировку в лабиринте (покупка не считается).';
	}
	else
	if (tasticQuest.indexOf('Дождись награды регулярной, что получает всяк пернатый.') > 0) {
		tasticDescription = 'Получить военное пособие.';
	}
	else
	if (tasticQuest.indexOf('Есть разных видов и цветов... Их отыщи и будь таков!') > 0) {
		tasticDescription = 'Найти пуговки (?)';
	}
	else
	if (tasticQuest.indexOf('Есть у каждого из нас дятлов статуи простые. Мой указ - продлить одну, какую - безразлично.') > 0) {
		tasticDescription = 'Арендовать или продлить любого дятла';
	}
	else
	if (tasticQuest.indexOf('Зайцы будут очень рады, еще ближе ты к награде.') > 0) {
		tasticDescription = 'Продать на барахолке указанное количество предметов.';
	}
	else
	if (tasticQuest.indexOf('Злыдничам по клюву бей, собирай златой трофей.') > 0) {
		tasticDescription = 'Собрать указанное количество золотых шишек.';
	}
	else
	if (tasticQuest.indexOf('Злые птицы в лесу обитают, пернатых грабят и горя не знают.') > 0) {
		tasticDescription = 'Победить указанное количество злыдничей.';
	}
	else
	if (tasticQuest.indexOf('К бурундуку иди-ка смело: появилось супер-дело.') > 0) {
		tasticDescription = 'Выполнить указанное количество контрактов в бюро.';
	}
	else
	if (tasticQuest.indexOf('К петуху в кусты иди, под хвост дозу получи.') > 0) {
		tasticDescription = 'Попытаться пробраться в поместье Ефремыча и проиграть.';
	}
	else
	if (tasticQuest.indexOf('К Филу отправляйся, яро ты сражайся.') > 0) {
		tasticDescription = 'Победить в сражалке указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('К Хоббе снова возвращайся и с вещицами прощайся.') > 0) {
		tasticDescription = 'Утилизировать указанное количество вещей.';
	}
	else
	if (tasticQuest.indexOf('Капкан, звезда, адреналин.') > 0) {
		tasticDescription = 'Активировать любой гаджет.';
	}
	else
	if (tasticQuest.indexOf('Коль любитель приключений, получи в лесу по перьям!') > 0) {
		tasticDescription = 'Заблудись в лесу, на развилке) и отхвати там....';
	}
	else
	if (tasticQuest.indexOf('Летают по Пернатску птицы, используют редкие вещицы.') > 0) {
		tasticDescription = 'Активировать любой редлик.';
	}
	else
	if (tasticQuest.indexOf('Может сильно сдаться, что можешь ты поддаться.') > 0) {
		tasticDescription = 'Проиграть в сражалке указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('На пеньке, где поляна, ты найдёшь часть павлина.') > 0) {
		tasticDescription = 'Получить перо (либо продлить медальон, либо разбить солевика, либо найти перо в разведке/бюро).';
	}
	else
	if (tasticQuest.indexOf('На шее болтаются, птицам очень нравятся, улучшай-улучшай и с прокачанным летай') > 0) {
		tasticDescription = 'Улучшить любую ожерелку.';
	}
	else
	if (tasticQuest.indexOf('Найди же то, из чего делают лечебные мази, добывают ценное масло и что засахаривают в меду на зиму.') > 0) {
		tasticDescription = 'Найти количество шишек, указанное в тастике';
	}
	else
	if (tasticQuest.indexOf('Не мильён и не копейка – справедлива лотерейка.') > 0) {
		tasticDescription = 'Выйграть в лотерею указанное число раз.';
	}
	else
	if (tasticQuest.indexOf('Не настолько тяжко бремя с бурундуком потратить время.') > 0) {
		tasticDescription = 'Провести указанное время в бюро (в минутах).';
	}
	else
	if (tasticQuest.indexOf('Ну… в лесу ты заблудись… выбрав путь, домой вернись.') > 0) {
		tasticDescription = 'Попасть на развилку указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Нужно здесь терять ресурсы, спроси зайцев: они в курсе.') > 0) {
		tasticDescription = 'Купить на барахолке указанное количество предметов.';
	}
	else
	if (tasticQuest.indexOf('Нужно круче тебе стать, чтобы премию забрать') > 0) {
		tasticDescription = 'Прокачать единицу пернатости.';
	}
	else
	if (tasticQuest.indexOf('Он деньги всем даёт, кто контракты в срок сдаёт.') > 0) {
		tasticDescription = 'Заработать указанное количество монет в бюро.';
	}
	else
	if (tasticQuest.indexOf('Он железный, и он птиц, перебил он много лиц.') > 0) {
		tasticDescription = 'Провести успешно с Железным Птицем указанное количество боев.';
	}
	else
	if (tasticQuest.indexOf('Он стриж, а может быть енот, приобрети его услуги, без лишних забот.') > 0) {
		tasticDescription = 'Заказать прогноз погоды (можно и бесплатный).';
	}
	else
	if (tasticQuest.indexOf('Очень весело и быстро по пещере прокатись-ка.') > 0) {
		tasticDescription = 'Снести санками иммунитет любому солевику.';
	}
	else
	if (tasticQuest.indexOf('По наводке двух хорьков шишки поищи') > 0) {
		tasticDescription = 'Провести в разведке указанное количество минут.';
	}
	else
	if (tasticQuest.indexOf('Поблукай в лесу немного там, где желтая дорога') > 0) {
		tasticDescription = 'Отправиться в лабиринт';
	}
	else
	if (tasticQuest.indexOf('Под землёй стоит статуя, у статуи нету') > 0) {
		tasticDescription = 'Разместить солевик в пещере.';
	}
	else
	if (tasticQuest.indexOf('Подойди-ка ты к столбу, вознеси-ка ты мольбу.') > 0) {
		tasticDescription = 'Помолиться тотему указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Покажи, что ты не жмот, выиграй, но наоборот.') > 0) { // ok
		tasticDescription = 'Потерять в сражалке указанное количество монет.';
	}
	else
	if (tasticQuest.indexOf('Поставил противник ловушку, поймает тебя – закатит пирушку.') > 0) {
		tasticDescription = 'Попасть в капкан указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Редкие вещи повсюду ищи, несколько штук и мне покажи.') > 0) {
		tasticDescription = 'Найти указанное количество редликов.';
	}
	else
	if (tasticQuest.indexOf('Садоводством занимайся, ковыряй и улыбайся.') > 0) {
		tasticDescription = 'Наковырять под тотемным столбом указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Сделай для себя заметку, чтоб отправиться в разведку.') > 0) {
		tasticDescription = 'Успешно слетать в разведку указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Сделай с вещами то, не знаю что: не надеть, не продать') > 0) {
		tasticDescription = 'Выкинуть указанное количество вещей.';
	}
	else
	if (tasticQuest.indexOf('Собери бумажек пачку, обменяй их на заначку') > 0) {
		tasticDescription = 'Обменять сертификаты.';
	}
	else
	if (tasticQuest.indexOf('То, что падает в лесу, собери-ка ты в бою.') > 0) {
		tasticDescription = 'Выбить в сражалке указанное количество шишек.';
	}
	else
	if (tasticQuest.indexOf('Тут без стаи трудно жить, надо б шишечек вложить') > 0) { // ok
		tasticDescription = 'Положить в кубышку указанное количество шишек.';
	}
	else
	if (tasticQuest.indexOf('Ты, похоже, сам не свой, отдыхать иди, малой.') > 0) {
		tasticDescription = 'Отправиться в спячку.';
	}
	else
	if (tasticQuest.indexOf('У Бублика игра есть непростая, играй, по шишкам возрастая.') > 0) {
		tasticDescription = 'Выйграть в весышку указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Условие простое – перчатки натянул, противника в бою нагнул.') > 0) {
		tasticDescription = 'Выйграть на ринге указанное количество раз.';
	}
	else
	if (tasticQuest.indexOf('Хватит терять блестящий металл: нычки спасут родной капитал!') > 0) {
		tasticDescription = 'Продлить нычку на монеты.';
	}
	else
	if (tasticQuest.indexOf('Чтоб за всеми уследить, надо вовремя платить!') > 0) {
		tasticDescription = 'Продлить или нанять партизан (синиц или воробьев).';
	}
	else
	if (tasticQuest.indexOf('Чтоб на рынке торговать, нужно денежку отдать!') > 0) {
		tasticDescription = 'Купить или продлить аренду палатки';
	}
	else
	if (tasticQuest.indexOf('Чтоб хилыми крылами не махать, ты должен их тренировать.') > 0) {
		tasticDescription = 'Прокачать указанное количество характеристик (включая выносливость и интеллект).';
	}
	else
	if (tasticQuest.indexOf('Эти вещицы в бою попадаются, те, что даст тотем, совсем не считаются.') > 0) { // ok
		tasticDescription = 'Найти столько колекционных предметов, сколько указано.';
	}
	else
	if (tasticQuest.indexOf('Этот крепкий инструмент разбивает соль в момент.') > 0) {
		tasticDescription = 'Найти кувалду.';
	}

	$('.tastic-description').remove();
	$('.tastic-q').after('<div class="tastic-q tastic-description"><b class="gt">Описание:</b>'+tasticDescription+'</div>');

	// Барахолка
	if (addr.indexOf('location/fleamarket') > 0) {

		// Проставим значок стаи всем продавцам и покупателям, сделавшим ставки
		$('.list-view > .items').find('[title="уровень"]').each(function(){getBirdsClans(this)});
	}

});
