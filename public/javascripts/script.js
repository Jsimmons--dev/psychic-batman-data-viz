var sliderPanel;
var oldID;
var next = 1;
var displays = {
    id:[],
	display:[]
};
var instant = false;
var Context = {
    listeners:[]
};
var currentContext;

var codeFlower;
var codeFlower2;
var getDisplay = function(id){
    var divsel = "#"+id;
    return displays.display[displays.id.indexOf(divsel)];

};

$(document).ready(function() {

 var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
    $('#layout').w2layout({
        name: 'layout',
        panels: [
            { type: 'top', size: '50%', resizable: true, hidden: true, style: pstyle, content: 'top' },
            { type: 'left', size: 200, resizable: true, hidden: true, style: pstyle, content: 'left' },
            { type: 'main', style: pstyle, content: '<div id="eventList"></div>' },
            { type: 'preview', size: '50%', resizable: true, hidden: true, style: pstyle, content: 'preview' },
            { type: 'right', size: 200, resizable: true, hidden: true, style: pstyle, content: 'right' },
            { type: 'bottom', size: 50, resizable: true, hidden: true, style: pstyle, content: 'bottom' }
        ]
    });
    w2ui['layout'].on('*', function (event) {
        var log = $('#eventList').html();
        $('#eventList').html( log + (log != '' ? '<br>' : '') + event.type + ': '+ event.target);
    });

var LayoutView = Backbone.View.extend({});

    /**
	 * makes the EventHandler 'Context' fire when any <context> element is clicked
	 * @param {Context} the context switch handler
	 */
	_.extend(Context,Backbone.Events);
    $(document.body).on('click','display',function(evt){
	   Context.trigger('updateContext',this.id); 
	});
	Context.on('updateContext',function(id){
//		currentContext.svg.style("fill", "#FFF");
		d3.select('#'+oldID).select("rect").style("fill","#000");
		oldID = id;
	    currentContext = getDisplay(id);
		d3.select('#'+id).select("rect").style("fill","#222");
	    $.each(Context.listeners,function(index, listener){
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
		    Context.listeners.push(this);
		},
		updateContext:function(id){
		    this.$el.text(id);

		}
	});

//	var Slider = Backbone.View.extend({
//    	initialize:function(options){
//    		this.options = options;
//			this.options.change = function(event,ui){
//			    
//					console.log("i changed to " + ui.value);
//
//			}
//			Context.listeners.push(this);
//    		this.render();
//			this.context;
//    		this.value = $(this.el).slider("option","value");
//    	},
//    	updateContext: function(id){
//				this.context = displays.display.indexOf(id);
//
//    	},
//    	render: function(){
//    		this.$el.slider(this.options);
//    	},
//    });
    var rerenderCharge = function(event,ui){
 		currentContext.force.charge(function(d) { return (d._children ? -d.size / 100 : -40) * (ui.value / 10); }).start();
	};

	var SliderCharge = Backbone.View.extend({
	    initialize:function(options){
//			this.context = displays.display[0];
            this.options = options;
			this.options.slide = function(event,ui){
				rerenderCharge(event,ui);
 			        };
			this.render();
		},
		render: function(){
            this.$el.slider(this.options);
		}
	});
    var rerenderChargeDis = function(event,ui){
        currentContext.force.chargeDistance(ui.value).start();
	};

	var SliderChargeDis = Backbone.View.extend({
	    initialize:function(options){
//			this.context = displays.display[0];
            this.options = options;
			this.options.slide = function(event,ui){
				rerenderChargeDis(event,ui);
 			        };
			this.render();
		},
		render: function(){
            this.$el.slider(this.options);
		}
	});
   


    var RightSidePanel = Backbone.View.extend({
	    initialize: function(options){
				this.options = options.options;
				
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
            this.slidercharge = new SliderCharge({el:"#slider-c",options:this.options.sliderchargeOptions});
            this.slidercd = new SliderChargeDis({el:"#slider-cd",options:this.options.slidercdOptions});
//            this.slidergrav = new Slider({el:"#slider-grav",options:this.options.slidergravOptions});
//           this.sliderld = new Slider({el:"#slider-ld",options:this.options.sliderldOptions});
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
			var divsel = this.options.myDiv
			if(getDisplay(divsel) == null){
					console.log(divsel);
				displays.id.push(divsel);
				displays.display.push(codeFlower);
			}
        }

	});


    var StagedPanel = Backbone.View.extend({
    	initialize:function(options){
    			this.options = options.options;
    
    	},
    	events: {
    		"click #button1":"loadAjax",
    		"click #button2":"loadAjax",
    		"click #button3":"loadAjax"
    	},
    	loadAjax: function(ev){
    		var codeFlowerID = this.options.myDiv;
			codeFlowerID += next;
    		$.get($(ev.currentTarget).data('url'),function(data){
    		  codeFlowerOptions.jsonData = data;
			  codeFlowerOptions.myDiv = codeFlowerID;
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
				
				console.log(this.el);
				
      			this.codeFlower = new CodeFlowerView({el:(codeFlowerID),options:codeFlowerOptions});
				console.log("new display pushed! @: "+codeFlowerID)
    		next++;
			});
    	},
    	render: function(){
    	}
    });
    
    var codeFlowerOptions = {
    	x: '400',
    	y: '400'
    }
    var sliderOptions = {
	 sliderldOptions : SliderVals.ldOptions,
     slidercdOptions : SliderVals.cdOptions, 
     sliderchargeOptions : SliderVals.chargeOptions, 
     slidergravOptions : SliderVals.gravOptions 
	}
    
    var rightSidePanel = new RightSidePanel({el:'#menuToggle',options:sliderOptions});
    var show = new Show({el:'#show'});
    var stagedOptions = {myDiv:'#codeflower'};
    var stagedPanel = new StagedPanel({el:'#stagedPanel',options:stagedOptions});
});
