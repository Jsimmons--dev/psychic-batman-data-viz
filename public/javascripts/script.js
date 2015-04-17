var sliderPanel;
var context = {
    listeners:[]
};
var contextId;

var codeFlower;
var codeFlower2;

$(document).ready(function() {
	_.extend(context,Backbone.Events);
    $(document.body).on('click','flower',function(evt){
	   context.trigger('updateContext',this.id); 
	});
	context.on('updateContext',function(id){
	    $.each(context.listeners,function(index, listener){
		    listener.updateContext(id);
		});
	});
//function updateld(codeFlower){
//	sliderld.updateValue();
//	console.log("refreshing Flower Constants:"
//							+ "\nld: " + sliderld.value);
//	codeFlower.force.linkDistance(function(d) {
//		return (d.target._children ? 80 : 25) * (sliderld.value / 10); })
//		.start();
//}
//function updatecd(codeFlower2){
//	slidercd.updateValue();
//	console.log("refreshing Flower Constants:"
//							+ "\ncd: " + slidercd.value);
//	codeFlower2.force.chargeDistance(slidercd.value).start();
//}
//
//function updatecharge(codeFlower2){
//	slidercharge.updateValue();
//	console.log("refreshing Flower Constants:"
//							+ "\ncharge: " + slidercharge.value);
//	codeFlower2.force.charge(function(d) {
//		return (d._children ? -d.size / 100 : -40) * (slidercharge.value / 10); })
//		.start();
//}
//
//function updategrav(codeFlower2){
//	slidergrav.updateValue();
//	console.log("refreshing Flower Constants:"
//							+ "\ngrav: " + slidergrav.value);
//	codeFlower2.force.gravity(Math.atan(codeFlower.total / (5 * slidergrav.value)) / Math.PI * 0.4).start();


	var Show = Backbone.View.extend({
	    initialize:function(options){
		    context.listeners.push(this);
			console.log('show is listening to context update events');
		},
		updateContext:function(id){
		    this.$el.text(id);
			console.log('context updated to ' + id);

		}
	});

	var Slider = Backbone.View.extend({
	initialize:function(options){
		_.extend(this, Backbone.Events);
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

    var RightSidePanel = Backbone.View.extend({
	    initialize: function(options){
	        $(this.el).click(function(e) {
	        	var $parent = $(this).parent('nav');
	        	$parent.toggleClass("open");
	        	var navState = $parent.hasClass('open') ? "hide" : "show";
	        	$(this).attr("title", navState + " navigation");
	        	setTimeout(function() {
	        		$(this.el + '  > span').toggleClass("navClosed").toggleClass("navOpen");
	        	}, 200);
	        	e.preventDefault();
	        });
            this.slidercharge = new Slider({el:"#slider-c",options:sliderchargeOptions});
            this.slidercd = new Slider({el:"#slider-cd",options:slidercdOptions});
            this.slidergrav = new Slider({el:"#slider-grav",options:slidergravOptions});
           this.sliderld = new Slider({el:"#slider-ld",options:sliderldOptions});
		}
	});


	var CodeFlowerView = Backbone.View.extend({
		initialize:function(options){
			this.options = options.options;
			this.render(this.options.jsonData, this.el,this.options.x,this.options.y);
		},

		render: function(jsonData,codeFlower){
			codeFlower = new CodeFlower(this.el,this.options.x,this.options.y);
			codeFlower.update(jsonData);
		},
		updateld: function (){
        	sliderld.updateValue();
        	console.log("refreshing Flower Constants:"
        							+ "\nld: " + sliderld.value);
        	codeFlower.force.linkDistance(function(d) {
        		return (d.target._children ? 80 : 25) * (sliderld.value / 10); })
        		.start();
        }

	});


var StagedPanel = Backbone.View.extend({
	initialize:function(options){
			this.options = options;
	},
	events: {
		"click #button1":"loadAjax",
		"click #button2":"loadAjax",
		"click #button3":"loadAjax"
	},
	loadAjax: function(ev){
		$.get($(ev.currentTarget).data('url'),function(data){
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
  			this.codeFlower = new CodeFlowerView({el:'#codeflower1',options:codeFlowerOptions});
		});
	},
	render: function(){
	}
});

var sliderldOptions = { //LINK DISTANCE
	value:10,
	min:1,
	max:200,
	//slide: updateld(codeFlower2),
	//change: updateld(codeFlower2),
	animate:"fast"
}

var slidercdOptions = { //CHARGE DISTANCE
	value:500,
	min:1,
	max:1000,
	//slide: updatecd,
	//change: updatecd,
	animate:"fast"
}

var sliderchargeOptions = { //CHARGE
	value:10,
	min:1,
	max:200,
	//slide: updatecharge,
	//change: updatecharge,
	animate:"fast"
}

var slidergravOptions = { //GRAVITY
	value:10,
	min:5,
	max:15,
	//slide: updategrav,
	//change: updategrav,
	animate:"fast"
}


var codeFlowerOptions = {
	x: '400',
	y: '400'
}


var show = new Show({el:'#show'});
var rightSidePanel = new RightSidePanel({el:'#menuToggle',options:{}});
stagedOptions = {};
var stagedPanel = new StagedPanel({el:'#stagedPanel',options:stagedOptions});
});
