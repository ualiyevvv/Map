document.addEventListener("DOMContentLoaded", function() {

	// PRELOADER CODE

	// setTimeout(function() {
	// 	let preloader = document.getElementById('preloader');
	// 	if(!preloader.classList.contains('done')) {
	// 		preloader.classList.add('done')
	// 	}
	// },1000);

	// ------------------------

	var center = [51.222269, 51.401335];
	var mbUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	// var mbUrl = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
	var streets = L.tileLayer(mbUrl, {
		id: 'mapbox.streets',
		attribution: '&copy; <a href="http://osm.org/copyright">TOO "IT Group"</a>'
	});

	var mapboxUrl_2 = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieGNoamp2ZyIsImEiOiJjazd1YmwyOHowMXQwM29tb2dzaHF4c3o3In0.0TsgUa5BnaPGlx5mcGPVFg'

	var mapboxUrl_1 = 'https://api.mapbox.com/styles/v1/xchjjvg/ck7uc3ulg485a1irylexz4vag.html?fresh=true&title=view&access_token=pk.eyJ1IjoieGNoamp2ZyIsImEiOiJjazd1YmwyOHowMXQwM29tb2dzaHF4c3o3In0.0TsgUa5BnaPGlx5mcGPVFg'

	var MBaccessToken = 'pk.eyJ1IjoieGNoamp2ZyIsImEiOiJjazd1YmwyOHowMXQwM29tb2dzaHF4c3o3In0.0TsgUa5BnaPGlx5mcGPVFg';

	//---------смена спутника----------
	$('.main-satellite-list__item').click(function() {
		localStorage.setItem('mapboxUrl', $(this).data('mapbox'));
		location.reload();
	});

	var mapboxUrl = localStorage.getItem('mapboxUrl') ?? mapboxUrl_1; 
	
	$('.main-satellite-list__item').removeClass('active');

	var mapbox = localStorage.getItem('mapboxUrl') ?? mapboxUrl_1;

	$('[data-mapbox="' + mapbox + '"]').addClass('active');

	//----------------------------------

	var statllite = L.tileLayer(mapboxUrl, {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.satellite',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: MBaccessToken
	});	

	var map = L.map('map', {
		center: center,
		zoom: 11,
		layers: [streets,statllite],
	});

	L.marker(center).addTo(map);
	
//----печать
	$('#print_map').click(function() {
		print();
	});

//----title для приюлижения и отдаления
	$('.leaflet-control-zoom-in').attr('title','Приблизить')
	$('.leaflet-control-zoom-out').attr('title','Отдалить')

//----добавлние кнопки сброса зума
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
//---------------------------------------------------------
	$('.main-layers-list__item').click(function() {
		let temp = $(this).find('.main-layers-list__item_arrow').hasClass('active');

		$(".main-layers-list__item_arrow").removeClass('active');

		if(!temp) {
			$(this).find('.main-layers-list__item_arrow').addClass('active');
		}

	});
//------------------------------------------------------------
  $("#main-layers-list").accordion({
		collapsible: true,
		active: false,
  });
//--------------Всплывающее окно поиска-------------------
	$('#open_search').on('input', function() {
		if($(this).val() != '') {
			$('.main-search-results').addClass('active');
		}	else {
			$('.main-search-results').removeClass('active');
		}
	});
//---------------------Ползунок слоев----------------------
	$('.main-layers-list__range_slider').on('input', function() {
		$(this).parent().find('.main-layers-list__range_result').text($(this).val());	
	});
//----------------------------------------------------
	$('.main-languages-list__item').click(function() {
		let current = $('.main-languages-list__item.active');

		current.removeClass('active');
		$(this).addClass('active');

		localStorage.setItem('language', $(this).data('language'));

		$('#out_languages').text($(this).data('language').slice(0,3))
	});

	$('.main-languages-list__item').removeClass('active');

	var language = localStorage.getItem('language') ?? 'Русский';

	$('[data-language="' + language + '"]').addClass('active');
	$('#out_languages').text(language.slice(0,3))
//-----------------------------------------------------------
	$('#open_languages').click(function(){
		$('.show').removeClass('show')
		$('#main-languages').addClass('show')
	});

	$('#close_languages').click(function(){
		$('#main-languages').removeClass('show')
		$('.active-btns').removeClass('active-btns')
	});

	$('.main-layers-list__range').css("height","auto");

//-----------------------Табы авторизации----------------------
	$('.auth-container-tabs__btn').on('click', function() {
		var tabName = $(this).data('tab'),
			tab = $('.auth-container-box[data-tab="'+tabName+'"]');
		
		$('.auth-container-tabs__btn.active').removeClass('active');
		$(this).addClass('active');
		
		$('.auth-container-box.active').removeClass('active');
		tab.addClass('active');
	});
//------------------------------------------------------------
	$('#open_panel').click(function(){
		$('#main-panel').addClass('show-menu');
	});

	$('#close_panel').click(function(){
		$('#main_panel').removeClass('show-menu')
	});

});
