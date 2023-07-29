function ios(EnText,CnText){
	if(localStorage.getItem("set-lan")=="EN"){
		alert(EnText)
	}else{
		alert(CnText)
	}
}
function and(EnText,CnText){
	if(GetQueryString("language")){
		if(GetQueryString("language")=="en"){
			ANT.gameSuccess(EnText)
		}else{
			ANT.gameSuccess(CnText)
		}
	}
}
(function($) {
	var i=0;
    var methods = {
        init: function(options) {
            return this.each(function() {
                var $this = $(this)
                  , data = $this.data('eraser');
                if (!data) {
                    var width = $this.width()
                      , height = $this.height()
                      , pos = $this.offset()
                      , $canvas = $("<canvas/>")
                      , canvas = $canvas.get(0)
                      , size = (options && options.size) ? options.size : 40
                      , completeRatio = (options && options.completeRatio) ? options.completeRatio : .7
                      , completeFunction = (options && options.completeFunction) ? options.completeFunction : null
                      , parts = []
                      , colParts = Math.floor(width / size)
                      , numParts = colParts * Math.floor(height / size)
                      , n = numParts
                      , ctx = canvas.getContext("2d");
                    $this.after($canvas);
                    canvas.id = this.id;
                    canvas.className = this.className;
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(this, 0, 0, width, height);
                    $this.remove();
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.strokeStyle = 'rgba(255,0,0,255)';
                    ctx.lineWidth = size;
                    ctx.lineCap = "round";
                    $canvas.bind('mousedown.eraser', methods.mouseDown);
                    $canvas.bind('touchstart.eraser', methods.touchStart);
                    $canvas.bind('touchmove.eraser', methods.touchMove);
                    $canvas.bind('touchend.eraser', methods.touchEnd);
                    while (n--)
                        parts.push(1);
                    data = {
                        posX: pos.left,
                        posY: pos.top,
                        touchDown: false,
                        touchID: -999,
                        touchX: 0,
                        touchY: 0,
                        ptouchX: 0,
                        ptouchY: 0,
                        canvas: $canvas,
                        ctx: ctx,
                        w: width,
                        h: height,
                        source: this,
                        size: size,
                        parts: parts,
                        colParts: colParts,
                        numParts: numParts,
                        ratio: 0,
                        complete: false,
                        completeRatio: completeRatio,
                        completeFunction: completeFunction
                    };
                    $canvas.data('eraser', data);
                    $(window).resize(function() {
                        var pos = $canvas.offset();
                        data.posX = pos.left;
                        data.posY = pos.top;
                    });
                }
            });
        },
        touchStart: function(event) {
            var $this = $(this)
              , data = $this.data('eraser');
            if (!data.touchDown) {
                var t = event.originalEvent.changedTouches[0]
                  , tx = t.pageX - data.posX
                  , ty = t.pageY - data.posY;
                methods.evaluatePoint(data, tx, ty);
                data.touchDown = true;
                data.touchID = t.identifier;
                data.touchX = tx;
                data.touchY = ty;
                event.preventDefault();
            }
           
           	//彩票触发
            if(getLotteryActivityDetailArr.data.currentServerTime>=getLotteryActivityDetailArr.data.activityStartTime){
            	if(getLotteryActivityDetailArr.data.currentServerTime>=getLotteryActivityDetailArr.data.activityEndTime){
            		if(GetQueryString("language")){
						and("Activity ends","活动已结束")
	            		methods={}
					}else{
						ios("Activity ends","活动已结束")
						methods={}
					}
            	}else{
            		if(getLotteryActivityDetailArr.data.exceedUpperLimit){
	            		if(GetQueryString("language")){
							and("Scratched upper limit","已刮上限")
		            		methods={}
						}else{
							ios("Scratched upper limit","已刮上限")
							methods={}
						}
	            	}else{
	            		if(getLotteryActivityDetailArr.data.residueLotteryNotes<=0){
							if(GetQueryString("language")){
								and("Tickets sold out","彩票已售罄")
			            		methods={}
							}else{
								ios("Tickets sold out","彩票已售罄")
								methods={}
							}
			            }else{
			            	i++
				            if(i>=2){
				           	 	return false
				            }else{
				           		$(".mui-content").show()
				            }
			            }
	            	}	
            	}	
            }else{
        		if(GetQueryString("language")){
					and("Activities yet open","活动暂未开启")
            		methods={}
				}else{
					ios("Activities yet open","活动暂未开启")
					methods={}
				}
            }
        },
        touchMove: function(event) {
            var $this = $(this)
              , data = $this.data('eraser');
            if (data.touchDown) {
                var ta = event.originalEvent.changedTouches
                  , n = ta.length;
                while (n--)
                    if (ta[n].identifier == data.touchID) {
                        var tx = ta[n].pageX - data.posX
                          , ty = ta[n].pageY - data.posY;
                        methods.evaluatePoint(data, tx, ty);
                        data.ctx.beginPath();
                        data.ctx.moveTo(data.touchX, data.touchY);
                        data.touchX = tx;
                        data.touchY = ty;
                        data.ctx.lineTo(data.touchX, data.touchY);
                        data.ctx.stroke();
                        event.preventDefault();
                        break;
                    }
            }
        },
        touchEnd: function(event) {
            var $this = $(this)
              , data = $this.data('eraser');
            if (data.touchDown) {
                var ta = event.originalEvent.changedTouches
                  , n = ta.length;
                while (n--)
                    if (ta[n].identifier == data.touchID) {
                        data.touchDown = false;
                        event.preventDefault();
                        break;
                    }
            }
        },
        evaluatePoint: function(data, tx, ty) {
            var p = Math.floor(tx / data.size) + Math.floor(ty / data.size) * data.colParts;
            if (p >= 0 && p < data.numParts) {
                data.ratio += data.parts[p];
                data.parts[p] = 0;
                if (!data.complete) {
                    if (data.ratio / data.numParts >= data.completeRatio) {
                        data.complete = true;
                        if (data.completeFunction != null)
                            data.completeFunction();
                    }
                }
            }
        },
        mouseDown: function(event) {
            var $this = $(this)
              , data = $this.data('eraser')
              , tx = event.pageX - data.posX
              , ty = event.pageY - data.posY;
            methods.evaluatePoint(data, tx, ty);
            data.touchDown = true;
            data.touchX = tx;
            data.touchY = ty;
            data.ctx.beginPath();
            data.ctx.moveTo(data.touchX - 1, data.touchY);
            data.ctx.lineTo(data.touchX, data.touchY);
            data.ctx.stroke();
            $this.bind('mousemove.eraser', methods.mouseMove);
            $(document).bind('mouseup.eraser', data, methods.mouseUp);
            event.preventDefault();
            	//彩票触发
            if(getLotteryActivityDetailArr.data.currentServerTime>=getLotteryActivityDetailArr.data.activityStartTime){
            	if(getLotteryActivityDetailArr.data.currentServerTime>=getLotteryActivityDetailArr.data.activityEndTime){
            		if(GetQueryString("language")){
						and("Activity ends","活动已结束")
	            		methods={}
					}else{
						ios("Activity ends","活动已结束")
						methods={}
					}
            	}else{
            		if(getLotteryActivityDetailArr.data.exceedUpperLimit){
	            		if(GetQueryString("language")){
							and("Scratched upper limit","已刮上限")
		            		methods={}
						}else{
							ios("Scratched upper limit","已刮上限")
							methods={}
						}
	            	}else{
	            		if(getLotteryActivityDetailArr.data.residueLotteryNotes<=0){
							if(GetQueryString("language")){
								and("Tickets sold out","彩票已售罄")
			            		methods={}
							}else{
								ios("Tickets sold out","彩票已售罄")
								methods={}
							}
			            }else{
			            	i++
				            if(i>=2){
				           	 	return false
				            }else{
				           		$(".publicPas").fadeIn()
				            }
			            }
	            	}	
            	}	
            }else{
        		if(GetQueryString("language")){
					and("Activities yet open","活动暂未开启")
            		methods={}
				}else{
					ios("Activities yet open","活动暂未开启")
					methods={}
				}
            }
        },
        mouseMove: function(event) {
            var $this = $(this)
              , data = $this.data('eraser')
              , tx = event.pageX - data.posX
              , ty = event.pageY - data.posY;
            methods.evaluatePoint(data, tx, ty);
            data.ctx.beginPath();
            data.ctx.moveTo(data.touchX, data.touchY);
            data.touchX = tx;
            data.touchY = ty;
            data.ctx.lineTo(data.touchX, data.touchY);
            data.ctx.stroke();
            event.preventDefault();
        },
        mouseUp: function(event) {
            var data = event.data
              , $this = data.canvas;
            data.touchDown = false;
            $this.unbind('mousemove.eraser');
            $(document).unbind('mouseup.eraser');
            event.preventDefault();
            
        },
        clear: function() {
            var $this = $(this)
              , data = $this.data('eraser');
            if (data) {
                data.ctx.clearRect(0, 0, data.w, data.h);
                var n = data.numParts;
                while (n--)
                    data.parts[n] = 0;
                data.ratio = data.numParts;
                data.complete = true;
//              if (data.completeFunction != null)
//                  data.completeFunction();
            }
        },
        size: function(value) {
            var $this = $(this)
              , data = $this.data('eraser');
            if (data && value) {
                data.size = value;
                data.ctx.lineWidth = value;
            }
        },
        reset: function() {
		    var $this = $(this),
		    data = $this.data('eraser');
		    if (data) {
		        var image = new Image();
		        image.src = "../../img/guagua.png";
		        image.onload = function() {
		            data.ctx.globalCompositeOperation = "source-over";
		            data.ctx.drawImage(image, 0, 0, $this.width(), $this.height());
		            data.ctx.globalCompositeOperation = "destination-out";
		            var n = data.numParts;
		            while (n--) data.parts[n] = 1;
		            data.ratio = 0;
		            data.complete = false;
		        }
		    }
		}
    };
    $.fn.eraser = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not yet exist on jQuery.eraser');
        }
    }
    ;
}
)(jQuery);
