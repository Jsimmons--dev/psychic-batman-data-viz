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
	updateValue: function(){
		this.value = $(this.el).slider("option","value");
		console.log("updated value of " + this.el + ": " + this.value);
	},
	render: function(){
		$(this.el).slider(this.options);
	},
});

	CodeFlowerView = Backbone.View.extend({
		initialize:function(options){
			this.options = options.options;
			this.render(this.options.jsonData);
		},

		render: function(jsonData){
			codeFlower = new CodeFlower(this.el,2000,2000);
			codeFlower.update(jsonData);
		}
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

var sliderldOptions = { //LINK DISTANCE
	value:10,
	min:1,
	max:200,
	slide: updateld,
	change: updateld,
	animate:"fast"
}

var slidercdOptions = { //CHARGE DISTANCE
	value:50000,
	min:1,
	max:1000000,
	slide: updatecd,
	change: updatecd,
	animate:"fast"
}

var sliderchargeOptions = { //CHARGE
	value:10,
	min:1,
	max:200,
	slide: updatecharge,
	change: updatecharge,
	animate:"fast"
}

var slidergravOptions = { //GRAVITY
	value:10,
	min:5,
	max:15,
	slide: updategrav,
	change: updategrav,
	animate:"fast"
}

function updateld(){
	sliderld.updateValue();
	console.log("refreshing Flower Constants:"
							+ "\nld: " + sliderld.value);
	codeFlower.force.linkDistance(function(d) {
		return (d.target._children ? 80 : 25) * (sliderld.value / 10); })
		.start();
}

function updatecd(){
	slidercd.updateValue();
	console.log("refreshing Flower Constants:"
							+ "\ncd: " + slidercd.value);
	codeFlower.force.chargeDistance(slidercd.value).start();
}

function updatecharge(){
	slidercharge.updateValue();
	console.log("refreshing Flower Constants:"
							+ "\ncharge: " + slidercharge.value);
	codeFlower.force.charge(function(d) {
		return (d._children ? -d.size / 100 : -40) * (slidercharge.value / 10); })
		.start();
}

function updategrav(){
	slidergrav.updateValue();
	console.log("refreshing Flower Constants:"
							+ "\ngrav: " + slidergrav.value);
	codeFlower.force.gravity(Math.atan(codeFlower.total / (5 * slidergrav.value)) / Math.PI * 0.4).start();
}

var codeFlowerOptions = {}

$.get("/1/3.json",function(data){
  codeFlowerOptions.jsonData = data;
	$.each(codeFlowerOptions.jsonData.routines,function(index, routine) {
			routine.size = 0;
			var newSize = 0;
			$.each(routine.blocks, function(index, block) {
				newSize += block.instructions.length;
			});
			routine.size += newSize;
			if (routine.callees) routine.children = routine.callees;
			routine.name = routine.tag;


			delete routine.tag;
			delete routine.label;
			delete routine.type;
			delete routine.callees;
		});
  //codeFlower = new CodeFlowerView({el:"#code",options:codeFlowerOptions});
  codeFlower2 = new CodeFlowerView({el:"#code2",options:codeFlowerOptions});
});
sliderld = new Slider({el:"#slider-ld",options:sliderldOptions});
slidercharge = new Slider({el:"#slider-c",options:sliderchargeOptions});
slidercd = new Slider({el:"#slider-cd",options:slidercdOptions});
slidergrav = new Slider({el:"#slider-grav",options:slidergravOptions});

});
