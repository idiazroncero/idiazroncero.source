$(function(){
	$(window).on('load', function(){

		// Asegura que no se da el error de pre-renderizado en id.r
		$('.idr-idi, .idr-idia, .idr-idiaz, .idr-idiaz_ro, .idr-idiaz_ron, .idr-idiaz_ronc, .idr-idiaz_ronce, .idr-idiaz_roncer, .idr-idiaz_roncero').hide();
		$('.idr-idi, .idr-idia, .idr-idiaz, .idr-idiaz_ro, .idr-idiaz_ron, .idr-idiaz_ronc, .idr-idiaz_ronce, .idr-idiaz_roncer, .idr-idiaz_roncero').show();
		$('.social-motto-log').hide();

		// Muestra y oculta el changelog
		$('#social-log').on('mouseenter', function(){
			$('.social-motto-log').fadeIn(200);
		}).on('mouseleave', function(){
			$('.social-motto-log').fadeOut(200);
		})

		// Twitter Fetcher: último tweet
		var config1 = {
		  "id": '621271209704095744',
		  "domId": 'twitter-fetcher',
		  "maxTweets": 3,
		  "showUser": false,
		  "showTime": false,
		  "showImages": false,
		  "lang": 'es',
		  "enableLinks": true,
		  // "customCallback": initSlider
		};

		twitterFetcher.fetch(config1);

		$(document).on('mouseenter', '.twitter-close, .twitter-open', function(){
			$(this).addClass('hover');
		}).on('mouseleave', '.twitter-close, .twitter-open', function(){
			$(this).removeClass('hover');
		});

        // setTimeout(function(){
        // 	console.log('ahora');
        //     slider = $('#twitter-fetcher ul').bxSlider();
        // },400);

        // $('#twitter-fetcher').click(function(){
        // 	console.log('click');
        // 	$(this).children('ul').bxSlider();
        // })
	});
})