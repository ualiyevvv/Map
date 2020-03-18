document.addEventListener("DOMContentLoaded", function() {
	
	// PRELOADER CODE

	// setTimeout(function() {
	// 	let preloader = document.getElementById('preloader');
	// 	if(!preloader.classList.contains('done')) {
	// 		preloader.classList.add('done')
	// 	}
	// },1000);

	// ------------------------

	var mbAttr = ' <a href="#"></a>',
			mbUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
			//mbUrl = 'http://{s}.google.com/vt/&key=AIzaSyAiQJ6AdIJaG0JMJ0mgYsY33mVs_JvkgmQ';

	var grayscale = L.tileLayer(mbUrl, {
		id: 'mapbox.light',
		attribution: mbAttr
	}),
	streets = L.tileLayer(mbUrl, {
		id: 'mapbox.streets',
		attribution: mbAttr
	});

	var map = L.map('map', {
		attribution: '&copy; <a href="http://osm.org/copyright">TOO "IT Group"</a> contributors',
		editable: true,
		drawControl: true,
		center: [51.222269, 51.401335],
		zoom: 11,
		layers: [streets]
	});

	
//----печать
	$('#print_map').click(function() {
		print();
	});

//----title для приюлижения и отдаления
	$('.leaflet-control-zoom-in').attr('title','Приблизить')
	$('.leaflet-control-zoom-out').attr('title','Отдалить')

//----добавлние общего вида
	$('.leaflet-control-zoom-in').after('<a class="reset-zoom" title="Сбросить зум"><i class="fas fa-globe"></i></a>')

	const defaultZoom = 11;

	$('.reset-zoom').click(function() {
		let lat = map._lastCenter.lat
		let lng = map._lastCenter.lng
		map.setView([lat,lng],defaultZoom)
	});

	$('#filter_map').click(function(){
		$('.show').removeClass('show');
		$('.main-filter').addClass('show');
	});

	$('#close_filter-map').click(function(){
		$('.main-filter').removeClass('show');
		$('.active-btns').removeClass('active-btns');
	});
//-----------------------------------------------------
	$('#open_feedback').click(function(){	
		$('#main-feedback').addClass('show-popup')
		$('.main-feedback__overlay').addClass('show-popup')
	});

	$('#close_message-map').click(function(){	
		$('#main-feedback').removeClass('show-popup')
		$('.main-feedback__overlay').removeClass('show-popup')
		$('.active-btns').removeClass('active-btns');
	});
//-----------------------------------------------------
	$('#open_satellites').click(function(){	
		$('.show').removeClass('show');
		$('#main-satellite').addClass('show');
	});

	$('#close_satellite').click(function(){ 
		$('#main-satellite').removeClass('show');
		$('.active-btns').removeClass('active-btns');
	});
//---------------------------------------------------------
	 $('.main-satellite-list__item').click(function() {
		let current = $('.main-satellite-list__item.active');
		current.removeClass('active');
		$(this).addClass('active');
	});

	$('.main-controls a, .main-controls button').click(function() {
		let current = $('.main-controls a, .main-controls button');

		current.removeClass('active-btns');
		$(this).addClass('active-btns');
	});
//---------------------------------------------------------
	$('#open_signs').click(function(){
		$('.show').removeClass('show')
		$('#main-signs').addClass('show')
	});	

	$('#close_signs').click(function(){
		$('#main-signs').removeClass('show')
		$('.active-btns').removeClass('active-btns')
	});
//--------------------------------------------------------
	$('#open_layers').click(function(){
		$('.show').removeClass('show')
		$('#main-layers').addClass('show')
	});

	$('#close_layers').click(function(){
		$('#main-layers').removeClass('show')
		$('.active-btns').removeClass('active-btns')
	});
});
