var pos = 0;
var intv;
var flippedElement;
var opcionesHoteles = [
      {opciones: [
      		{opcion: 'Cuarto individual'},
      		{opcion: 'Alberca privada'},
      		{opcion: 'Jacuzi con burbujas'}
      	],
      	costo:'100',
      	paquete:'individual'
      },
      { opciones: [
      		{opcion: 'Cuarto doble'},
      		{opcion: 'Alberca privada'},
      		{opcion: 'Jacuzi de oro'}
      	],
      	costo:'200',
      	paquete:'doble'
      },
      { opciones: [
      		{opcion: 'Cuarto triple'},
      		{opcion: 'Alberca privada'},
      		{opcion: 'Jacuzi'}
      	],
      	costo:'300',
      	paquete:'premiun'
      }];

$(document).on('ready', function(){
	init();
});

function init(){
	$('.slider_controls li').on('click', handleClick);
	$(document).on('click','.ver-mas', flipElement);

	var width = $('.slider_container').width();

	$('.slide').each(function(i,e){
		addBackground(e,width, true);
	});

	$('.image_food').on('click',changeViewPort);

	$('.image_food').each(function(i,e){
		addBackground(e, false);
		if($(e).hasClass('viewport')) return true;
		$(e).data('top',((i)*100));
		$(e).css({
			'top': $(e).data('top')+'px'
		});
	});
	//clearInterval(int);
	int = setInterval(handleClick, 10000);
}
google.maps.event.addDomListener(window,'load',drawMap);


function drawMap(){
	/*var mapOptions = {
	    center: new google.maps.LatLng(-34.397, 150.644),
	    zoom: 8,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	  var map = new google.maps.Map(document.getElementById("google_canvas"),
	      mapOptions);
	google.maps.event.addDomListener(window, 'load', initialize);
	*/

	var mapa;
	var opcionesMapa = {
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	mapa = new google.maps.Map(document.getElementById('google_canvas'),opcionesMapa);
	debugger;
	navigator.geolocation.getCurrentPosition(function(posicion){
		var geolocalizacion = new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude);
		mapa.setCenter(geolocalizacion);
	});
}

function addBackground(element, width, setSize){
	if(width) width=$('html').width();
	if(setSize){
		$(element).css({
			'width': width,
			'heigth': $('html').heigth
		});
	}
	var image = $(element).data('background');
	$(element).css('background-image','url('+(image+'.jpg')+')');
}
function changeViewPort(){
	var e= $('.viewport');
	e.css('top',$(e).data('top'));
	e.removeClass('viewport');
	$(this).addClass('viewport');
	$(this).css('top',0);
}

function flipElement(){
	if(flippedElement != null){
		$(flippedElement).revertFlip();
		flippedElement = null;
	}
	$(flippedElement).remove();

	$('#precioTemplate').template("CompiledTemplate");
	var padre= $(this).parent()
	flippedElement = padre;
	padre.flip({
		direction: 'rl',
		speed: 500,
		content: $('#precioTemplate').tmpl(opcionesHoteles[$(this).data('number')]).html(),
		color: '#f7f7f7',
		onEnd: function(){
			$('#regresar-ventana').on('click', function(){
				$(flippedElement).revertFlip();
				flippedElement = null
			});
		}
	});
}

function handleClick(){
	if($(this).parent().hasClass('slider_controls')){
		slide_target = $(this).index();
		pos = slide_target;
		clearInterval(int);
		int = setInterval(handleClick, 10000);
	} else {
		pos++;
		if(pos >= $('.slide').length){
			pos = 0;
		}
		slide_target =  pos;
	}
	$('.slideContainer').fadeOut('slow', function(){
		$(this).animate({
			'margin-left':-(slide_target * $('.slider_container').width())+ 'px'
		}, 'slow', function(){
			$(this).fadeIn();
		});
	});
}

