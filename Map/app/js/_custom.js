document.addEventListener("DOMContentLoaded", function() {

	// PRELOADER CODE

	// setTimeout(function() {
	// 	let preloader = document.getElementById('preloader');
	// 	if(!preloader.classList.contains('done')) {
	// 		preloader.classList.add('done')
	// 	}
	// },1000);

	// ------------------------

	// jquery toggle whole attribute
  $.fn.toggleAttr = function(attr, val) {
    var test = $(this).attr(attr);
    if ( test ) { 
      // if attrib exists with ANY value, still remove it
      $(this).removeAttr(attr);
    } else {
      $(this).attr(attr, val);
    }
    return this;
  };

  // jquery toggle just the attribute value
  $.fn.toggleAttrVal = function(attr, val1, val2) {
    var test = $(this).attr(attr);
    if ( test === val1) {
      $(this).attr(attr, val2);
      return this;
    }
    if ( test === val2) {
      $(this).attr(attr, val1);
      return this;
    }
    // default to val1 if neither
    $(this).attr(attr, val1);
    return this;
  };

	// перевод рисовалки на русский язык
  const drawToolbar = {
		actions: {
			title: "Отменить рисование",
			text: "Отмена",
		},
		finish: {
			title: "Завершить рисование",
			text: "Завершить",
		},
		undo: {
			title: "Удалить последнюю нарисованную точку",
			text: "Удалить последнюю точку",
		},
		buttons: {
			polyline: "Нарисовать полилинию",
			polygon: "Нарисовать полигон",
			rectangle: "Нарисовать прямоугольник",
			circle: "Нарисовать круг",
			marker: "Нарисовать точку",
			circlemarker: "Нарисовать точку(в виде круга)",
		},
		};
	
		const drawHandlers = {
		circle: {
			tooltip: {
				start: "Кликните и перетащите для того, чтобы нарисовать круг.",
			},
			radius: "Радиус",
		},
		circlemarker: {
			tooltip: {
				start: "Кликните на карту для установки точки.",
			},
		},
		marker: {
			tooltip: {
				start: "Кликните на карту для установки точки.",
			},
		},
		polygon: {
			tooltip: {
				start: "Кликните, чтобы начать рисовать контур.",
				cont: "Кликните, чтобы завершить рисовать контур.",
				end: "Кликните на первую точку, чтобы завершить рисование контура.",
			},
		},
		polyline: {
			error: "<strong>Ошибка:</strong> линия не может самопересекаться!",
			tooltip: {
				start: "Кликните, чтобы начать рисовать линию.",
				cont: "Кликните, чтобы завершить рисование линии.",
				end: "Кликните на последнюю точку, чтобы завершить рисование линии.",
			},
		},
		rectangle: {
			tooltip: {
				start: "Кликните и перетащите, чтобы нарисовать прямоугольник.",
			},
		},
		simpleshape: {
			tooltip: {
				end: "Отпустите кнопку мыши для завершения рисования.",
			},
		},
		};
	
		const editToolbar = {
		actions: {
			save: {
			title: "Сохранить изменения.",
			text: "Сохранить",
			},
			cancel: {
			title: "Отменить редактирование, откатить все изменения.",
			text: "Отмена",
			},
			clearAll: {
			title: "Очистить все редактируемые слои.",
			text: "Очистить всё",
			},
		},
		buttons: {
			edit: "Редактировать.",
			editDisabled: "Нет слоёв для редактирования.",
			remove: "Удалить.",
			removeDisabled: "Нет слоёв для удаления.",
		},
		};
	
		const editHandlers = {
			edit: {
				tooltip: {
				text: "Перетащите вершины или точки для редактирования фигуры.",
				subtext: 'Нажмите "Отмена", чтобы откатить изменения.',
				},
			},
			remove: {
				tooltip: {
				text: "Кликните на фигуру для удаления",
				},
			},
		};
	
		L.drawLocal = {
			draw: {
				toolbar: drawToolbar,
				handlers: drawHandlers,
			},
			edit: {
				toolbar: editToolbar,
				handlers: editHandlers,
			},
		};
	//----перевод закончился----
	
	var center = [51.222269, 51.401335];
	var mbUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	// var mbUrl = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
	var streets = L.tileLayer(mbUrl, {
		id: 'mapbox.streets',
	});

	var mapboxUrl = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieGNoamp2ZyIsImEiOiJjazd1YmwyOHowMXQwM29tb2dzaHF4c3o3In0.0TsgUa5BnaPGlx5mcGPVFg'

	var MBaccessToken = 'pk.eyJ1IjoieGNoamp2ZyIsImEiOiJjazd1YmwyOHowMXQwM29tb2dzaHF4c3o3In0.0TsgUa5BnaPGlx5mcGPVFg';

	//---------смена спутника----------

	$('.street').click(function() {
		if (map.hasLayer(streets)) {
			map.removeLayer(streets)
			map.addLayer(streets);
		}
		else{
			map.addLayer(streets);
		};
	});

	$('.satellite').click(function() {
		if (map.hasLayer(satellite)){
			map.removeLayer(satellite),
			map.addLayer(satellite);
		}
		else {
			map.addLayer(satellite);
		};
	});

//----------------------------------

	var satellite = L.tileLayer(mapboxUrl, {
		maxZoom: 18,
		id: 'mapbox.satellite',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: MBaccessToken
	});	

	var map = L.map('map', {
		center: center,
		zoom: 11,
		layers: [streets],
	});

	L.marker(center).addTo(map);

	//инициализируем слой на котором содержатся нарисованные обьекты, чтобы появилась возможность редактировать и удалять объекты	
	var editableLayers = new L.FeatureGroup();
	map.addLayer(editableLayers);

	//настройки рисовалки
	var drawPluginOptions = {
		position: 'topright',

		draw: {
			polyline: {
			metric: true
		},
			polygon: {

			showArea: true,
					shapeOptions: {
						color: '#97009c',
					},
					allowIntersection: false, // Restricts shapes to simple polygons
					drawError: {
					color: '#e1e100', // Color the shape will turn when intersects
					message: '<strong>Вы не можете рисовать так' // Message that will show when intersect
				},

			},

			},
		edit: {
			featureGroup: editableLayers, //REQUIRED!!
			remove: true,
		}
	};
//-----настройки рисовалки закончились-----


	// инициализируем котроллер рисовалки
	var drawControl = new L.Control.Draw(drawPluginOptions);
	map.addControl(drawControl);


// события рисовалки: "после создания"
	map.on('draw:created', function(e) {
		var type = e.layerType,
			layer = e.layer;

		if (type === 'marker') {
			layer.bindPopup('A popup!');
		}

		editableLayers.addLayer(layer);

		var geojson = editableLayers.toGeoJSON();
		console.log(geojson)
	});


	//события рисовалки "после редактирования"
	map.on('draw:edited', function (e) {
		var layers = e.layers;
		var countOfEditedLayers = 0;
		layers.eachLayer(function(layer) {
			countOfEditedLayers++;
		});
		console.log("Edited " + countOfEditedLayers + " layers");
		var geojson = editableLayers.toGeoJSON();
			console.log(geojson)
	});	

	L.control.scale().addTo(map);
	
//----печать
	$('#print_map').click(function() {
		$('main, .leaflet-right, .leaflet-left').addClass('no-print');
		print();
	});

	$('#print_block').click(function() {
		$('main').removeClass('no-print');
		$('.leaflet-right, .leaflet-left, .main-search, .auth-container, .main-controls').addClass('no-print');
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
		heightStyle: "content"
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
	$('.main-layers-list-box__range_slider').on('input', function() {
		$(this).parent().find('.main-layers-list-box__range_result').text($(this).val());	
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

	$(document).keydown(function(e) {
		e.preventDefault;

		if(e.key == 'm' || e.key == 'ь') {
			$('#main-panel').toggleClass('show-menu');
		}
	})

	$('#close_panel').click(function(){
		$('#main-panel').removeClass('show-menu')
	});
//-------------------------------------------------------------
	$('#open_auth').click(function(){
		$('.auth').addClass('show-auth')
	});

	$('#close_auth').click(function(){
		$('.auth').removeClass('show-auth')
	});	

	$('#phone').mask('+7 999 999 99 99');

	$('.layers-checkbox').click(function() {
		$('[data-range="'+ $(this).data('checkbox') +'"]').toggleClass('active').find('.main-layers-list-box__range_slider').toggleAttr('disabled','disabled');
	});

	$('.main-panel-container__box_header').click(function() {
		$(this).toggleClass('show');
		$(this).parent().find('.main-panel-container__box-list').slideToggle('fast');
		$(this).find('.fas.fa-sort-down').toggleClass('active');
	});

//--------------------------------------------------------------------------

	if($('.main-panel-container__box-list__item').children('ul').length > 0){
		$(this).find('.children-icon').addClass('fas fa-caret-right');
	}

	$('.main-panel-container__box-list__item').click(function() {
		$(this).toggleClass('show');
		$(this).find('ul').slideToggle('fast');
		$(this).find('.children-icon').toggleClass('active');
	});

//--------------------------------------------------------------------------

 $('.leaflet-control-scale').parent().removeClass('leaflet-left');
 
//------------------ADMIN---------------------

$('#stats').click(function(){
	$('#admin-content-table').removeClass('show');
	$('#admin-content-table__stats').addClass('show');
	
});

//------------------ADMIN---------------------


});
