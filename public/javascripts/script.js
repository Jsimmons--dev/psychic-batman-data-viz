$(document).ready(function() {
	Slider = Backbone.View.extend({
	initialize:function(options){
		this.options = options.options;
		this.render();
		this.value = $(this.el).slider("option","value");
	},

	render: function(){
		$(this.el).slider(this.options);
	},
});
	$('#menuToggle').click(function(e) {
		var $parent = $(this).parent('nav');
		$parent.toggleClass("open");
		var navState = $parent.hasClass('open') ? "hide" : "show";
		$(this).attr("title", navState + " navigation");
		// Set the timeout to the animation length in the CSS.
		setTimeout(function() {
			//console.log("timeout set");
			$('#menuToggle > span').toggleClass("navClosed").toggleClass("navOpen");
		}, 200);
		e.preventDefault();
	});
	//$("#slider-grav").slider();
	//$("#slider-ld").slider();

var sliderldOptions = {
	value:11,
	min:10,
	max:20,
	animate:"fast"
}

var slidergrav = new Slider({el:"#slider-grav",options:sliderldOptions});
var sliderld = new Slider({el:"#slider-ld",options:sliderldOptions});
var slidercharge = new Slider({el:"#slider-c",options:sliderldOptions});
var slidercd = new Slider({el:"#slider-cd",options:sliderldOptions});
});