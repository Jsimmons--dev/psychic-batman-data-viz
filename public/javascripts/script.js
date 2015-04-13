var slidergrav;
var sliderld;
var slidercharge;
var slidercd;
var codeFlower;
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
	
	CodeFlower = Backbone.View.extend({
		initialize:function(options){
			this.options = options.options;
			this.render(options.jsonData);
		},

		render: function(jsonData){
			codeFlower = new CodeFlower(this.el,800,800);
			codeFlower.update(jsonData);
		}
	});;

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

var codeFlowerOptions = {}

$.getJSON("./graph-sample/1/1.json",function(data){
	codeFlowerOptions.jsonData = data;
	console.log(data);
    codeFlower = new CodeFlower({el:"#code",options:codeFlowerOptions});
});
slidergrav = new Slider({el:"#slider-grav",options:sliderldOptions});
sliderld = new Slider({el:"#slider-ld",options:sliderldOptions});
slidercharge = new Slider({el:"#slider-c",options:sliderldOptions});
slidercd = new Slider({el:"#slider-cd",options:sliderldOptions});
});
