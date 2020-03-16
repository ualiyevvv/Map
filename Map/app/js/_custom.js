document.addEventListener("DOMContentLoaded", function() {

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
	$('.leaflet-control-zoom-in').after('<a class="reset-zoom" ><i class="fas fa-globe"></i></a>')
});
