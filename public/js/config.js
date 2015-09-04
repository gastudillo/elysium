function setVariables() {

	Renderer = function(canvas) {
		var canvas = $(canvas).get(0)
		var ctx = canvas.getContext("2d");
		var particleSystem = null;

		var palette = {
			"Africa" : "#D68300",
			"Asia" : "#4D7A00",
			"Europe" : "#6D87CF",
			"North America" : "#D4E200",
			"Oceania" : "#4F2170",
			"South America" : "#CD2900"
		};

		var that = {
			init : function(system) {
				//
				// the particle system will call the init function once, right
				// before the
				// first frame is to be drawn. it's a good place to set up the
				// canvas and
				// to pass the canvas size to the particle system
				//
				// save a reference to the particle system for use in the
				// .redraw() loop
				particleSystem = system

				// inform the system of the screen dimensions so it can map
				// coords for us.
				// if the canvas is ever resized, screenSize should be called
				// again with
				// the new dimensions
				// particleSystem.screenSize(canvas.width, canvas.height)
				// particleSystem.screenPadding(80) // leave an extra 80px of
				// whitespace per side

				particleSystem.screen({
					padding : [ 100, 60, 60, 60 ], // leave some space at the
					// bottom for the param
					// sliders
					step : .02
				}) // have the ‘camera’ zoom somewhat slowly as the graph
				// unfolds
				$(window).resize(that.resize)
				that.resize()

				// set up some event handlers to allow for node-dragging
				that.initMouseHandling()
			},

			redraw : function() {
				// 
				// redraw will be called repeatedly during the run whenever the
				// node positions
				// change. the new positions for the nodes can be accessed by
				// looking at the
				// .p attribute of a given node. however the p.x & p.y values
				// are in the coordinates
				// of the particle system rather than the screen. you can either
				// map them to
				// the screen yourself, or use the convenience iterators
				// .eachNode (and .eachEdge)
				// which allow you to step through the actual node objects but
				// also pass an
				// x,y point in the screen's coordinate system
				// 

				if (particleSystem === null)
					return;

				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.strokeStyle = "#d3d3d3";
				ctx.lineWidth = 1;
				ctx.beginPath();

				particleSystem
						.eachEdge(function(edge, pt1, pt2) {
							// edge: {source:Node, target:Node, length:#,
							// data:{}}
							// pt1: {x:#, y:#} source position in screen coords
							// pt2: {x:#, y:#} target position in screen coords

							// draw a line from pt1 to pt2
							/*
							 * ctx.strokeStyle = "rgba(0,0,0, .333)"
							 * ctx.lineWidth = 1 ctx.beginPath()
							 * ctx.moveTo(pt1.x, pt1.y) ctx.lineTo(pt2.x, pt2.y)
							 * ctx.stroke()
							 */
							var weight = null; // Math.max(1,edge.data.border/100)
							var color = null; // edge.data.color
							if (!color || ("" + color).match(/^[ \t]*$/))
								color = null;

							if (color !== undefined || weight !== undefined) {
								ctx.save();
								ctx.beginPath();

								if (!isNaN(weight))
									ctx.lineWidth = weight;

								if (edge.source.data.region == edge.target.data.region) {
									ctx.strokeStyle = palette[edge.source.data.region];
								}

								// if (color) ctx.strokeStyle = color
								ctx.fillStyle = null;

								ctx.moveTo(pt1.x, pt1.y);
								ctx.lineTo(pt2.x, pt2.y);
								ctx.stroke();
								ctx.restore();
							} else {
								// draw a line from pt1 to pt2
								ctx.moveTo(pt1.x, pt1.y);
								ctx.lineTo(pt2.x, pt2.y);
							}

						});

				particleSystem.eachNode(function(node, pt) {
					// node: {mass:#, p:{x,y}, name:"", data:{}}
					// pt: {x:#, y:#} node position in screen coords

					// draw a rectangle centered at pt
					// var w = 10
					// ctx.fillStyle = (node.data.alone) ? "orange" : "black"
					// ctx.fillRect(pt.x-w/2, pt.y-w/2, w,w)

					// determine the box size and round off the coords if we'll
					// be
					// drawing a text label (awful alignment jitter
					// otherwise...)

					var tipo = node.data.tipo;
					
					var w = ctx.measureText(node.name || "").width + 6
					var label = node.name
					if (!(label || "").match(/^[ \t]*$/)) {
						pt.x = Math.floor(pt.x)
						pt.y = Math.floor(pt.y)
					} else {
						label = null
					}

					// clear any edges below the text label
					// ctx.fillStyle = 'rgba(255,255,255,.6)'
					// ctx.fillRect(pt.x-w/2, pt.y-7, w,14)

					ctx.clearRect(pt.x - w / 2, pt.y - 7, w, 14)

					// draw the text
					if (label) {
						
						if (tipo == 'trama') {
							ctx.font = "bold 16px Arial";
							ctx.textAlign = "center";
							ctx.fillStyle = "black";
							ctx.fillText(label || "", pt.x, pt.y + 4);							
						} else {
							ctx.font = "bold 11px Arial";
							ctx.textAlign = "center";
							ctx.fillStyle = "#888888";
							ctx.fillText(label || "", pt.x, pt.y + 4);				
						}

					}

				})
			},

			resize : function() {
				var w = $(window).width(), h = $(window).height();
				canvas.width = w;
				canvas.height = h // resize the canvas element to fill the
				// screen
				particleSystem.screenSize(w, h) // inform the system so it can
				// map coords for us
				that.redraw()
			},

			initMouseHandling : function() {

				// no-nonsense drag and drop (thanks springy.js)
				selected = null;
				nearest = null;
				var dragged = null;
				var oldmass = 1

				$(canvas).mousedown(function(e) {
					var pos = $(this).offset();
					var p = {
						x : e.pageX - pos.left,
						y : e.pageY - pos.top
					}
					selected = nearest = dragged = particleSystem.nearest(p);

					if (selected.node !== null) {
						// dragged.node.tempMass = 10000
						dragged.node.fixed = true
					}
					return false
				});

				$(canvas).mousemove(function(e) {
					var old_nearest = nearest && nearest.node._id
					var pos = $(this).offset();
					var s = {
						x : e.pageX - pos.left,
						y : e.pageY - pos.top
					};

					nearest = particleSystem.nearest(s);
					if (!nearest)
						return;

					if (dragged !== null && dragged.node !== null) {
						var p = particleSystem.fromScreen(s)
						dragged.node.p = {
							x : p.x,
							y : p.y
						}
						// dragged.tempMass = 10000
					}

					return false
				});

				$(window).bind('mouseup', function(e) {
					if (dragged === null || dragged.node === undefined)
						return;

					dragged.node.fixed = false
					dragged.node.tempMass = 100
					dragged = null;
					selected = null
					return false
				});

			},

		}
		return that;
	}

}