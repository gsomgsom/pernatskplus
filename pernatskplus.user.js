// ==UserScript==
// @name        pernatskPlus
// @description Добавляет плюшечки и рюшечки
// @author      zhelneen@yandex.ru
// @license     MIT
// @domain      https://pernatsk.ru/*
// @namespace   https://pernatsk.ru/*
// @include     https://pernatsk.ru/*
// @match       https://pernatsk.ru/*
// @version     0.1.4 beta
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

	// Барахолка
	if (addr = '/location/fleamarket/index/type/all/currency/all/auction/mix/sort/price/order/asc') {
		$('.list-view > .items').each(function(e){
			// @TODO - получать данные о продавце и добавлять значок стаи, название стаи и ссылку на неё
			console.log(e);
		});
	}

});
