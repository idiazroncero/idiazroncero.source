$(function(){
	$(window).load(function(){
		$('.idr-idi, .idr-idia, .idr-idiaz, .idr-idiaz_ro, .idr-idiaz_ron, .idr-idiaz_ronc, .idr-idiaz_ronce, .idr-idiaz_roncer, .idr-idiaz_roncero').hide();
		$('.idr-idi, .idr-idia, .idr-idiaz, .idr-idiaz_ro, .idr-idiaz_ron, .idr-idiaz_ronc, .idr-idiaz_ronce, .idr-idiaz_roncer, .idr-idiaz_roncero').show();
		$('.social-motto-log').hide();
		$('#social-log').on('mouseenter', function(){
			$('.social-motto-log').fadeIn(200);
		}).on('mouseleave', function(){
			$('.social-motto-log').fadeOut(200);
		})
	});
})