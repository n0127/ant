	function GetQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}
	var hehe=GetQueryString("DAPPEngine")
	var AndroidApp=GetQueryString("registerType")
	
	if(hehe!=undefined){
		$(".public-header").css("display","none")
		$(".mui-bar-nav ~ .mui-content").css("margin-top","0")
		$(".header").css("display","none")
		$(".bottom-nav").css("display","none")
		$(".mui-off-canvas-wrap").removeClass("mui-draggable")
		$(".SecurityCenter-scroll-wrapper").css("top",0)
//		$(".transaction-box, .transactionConfirmation, .AssetDetails, .forAssets, .Friends, .SecurityCenter, .modifyLoginPass, .modifyPaymentPass, .modifyPhone, .retrievePaymentPass, .posProfit, .DposProfit, .nodeProfit, .Explain, .InvitingCard, .myNode, .cebian-AboutUs, .Friends01, .hongbao").css("background","transparent")
	}
	
	if(AndroidApp=="Android"){
//		$(".public-header").css("display","none")
		$(".mui-bar-nav ~ .mui-content").css("margin-top","0")
		$(".header").css("display","none")
		$(".bottom-nav").css("display","none")
		$(".mui-off-canvas-wrap").removeClass("mui-draggable")
//		$(".SecurityCenter-scroll-wrapper").css("top",0)
//		$(".mui-scroll").css("padding-bottom","0")
	}
	
// 	监听tap事件，解决 a标签 不能跳转页面问题
	mui('body').on('tap','a',function(){document.location.href=this.href;});
	
	function formatDate(now) {
	  　　var year = now.getFullYear(),
	  　　month = now.getMonth() + 1,
	  　　date = now.getDate(),
	  　　hour = now.getHours(),
	  　　minute = now.getMinutes(),
	  　　second = now.getSeconds();
	  	if(minute<10){
	  		minute="0"+minute
	  	}
	  	if(hour<10){
	  		hour="0"+hour
	  	}
	  　　return year+"/"+month + "/" + date+","+hour+":"+minute;
	}
	
	
	function inputFocus(){
		var dom=document.getElementById('dom')
		setTimeout(function(){
            dom.scrollIntoView(true);
	    	dom.scrollIntoViewIfNeeded(); 
       	}, 500); 
	}
	
//	if( /Android [4-6]/.test(navigator.appVersion)) {
//	   window.addEventListener("resize", function() {
//	      if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
//	         window.setTimeout(function() {
//	            document.activeElement.scrollIntoViewIfNeeded();
//	         },0);
//	      }
//	   })
//	}
	
//	mui滚动/自动轮播
	mui('.mui-scroll-wrapper').scroll({
		 scrollY: true, //是否竖向滚动
		 scrollX: false, //是否横向滚动
		 startX: 0, //初始化时滚动至x
		 startY: 0, //初始化时滚动至y
		 indicators: false, //是否显示滚动条
		 deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
		 bounce: false, //是否启用回弹
	});
	
//	rem布局
	var html=document.documentElement;
	var htmlWidth=html.getBoundingClientRect().width
	$("html").css("font-size",htmlWidth/20);
	
//返回上一页
	$(".return").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PopView("src/index/transaction-box.html?ReceivablesStart=1");
		}else if(GetQueryString("loginType")!=undefined){
			ANT.goThisBackPage()
		}else{
			history.back()
		}
	})
	

	if(hehe!=undefined){
		var weiyi01=123666;
	}else{
		var browser={//获取浏览器
		    versions:function(){
		       	var u = navigator.userAgent;
		       	return {//移动终端浏览器版本信息
		            trident: u.indexOf('Trident') > -1, //IE内核
		            presto: u.indexOf('Presto') > -1, //opera内核
		            webKit: u.indexOf('Chrome') > -1, //苹果、谷歌内核
		            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器|| u.indexOf('Mac') > -1
		            iPad: u.indexOf('iPad') > -1, //是否iPad
		        };
		   	}()
		}

		function weiyi(){//判断是哪种浏览器
			var uu=navigator.userAgent;
			//IE内核
			if(browser.versions.trident){
				var ver = uu.match(/Trident\/([\d.]+)/)[1];
				return {type:"Trident",ver:ver}
			}
			//谷歌内核
			else if(browser.versions.webKit){
				var ver = uu.match(/Chrome\/([\d.]+)/)[1];
				return {type:"Chrome",ver:ver}
			}
			//苹果
			else if(browser.versions.iPhone){
				var ver = uu.match(/Version\/([\d.]+)/)[1];
				return {type:"Safari",ver:ver}
			}
			//火狐
			else if(browser.versions.gecko){
				var ver = uu.match(/Gecko\/([\d.]+)/)[1];
				return {type:"Gecko",ver:ver}
			}
			//opera
			else{
				return {type:"buzhisuocuo",ver:"686989"}
			}
		}
		try{
			var weiyi01=weiyi().type+weiyi().ver;
		}catch(e){
			var weiyi01=123666;
		}
	}
	
	$(".weikaifang").on("tap",function(){
		if(localStorage.getItem("set-lan")=="EN"){
			alert("Not Yet Open")
		}else{
			alert("暂未开放,正在建设中")
		}
	})


	
//安全中心
	$(".anquanzhongxin").on("tap",function(){
		window.location="src/sidebar/SecurityCenter.html";
	})

// 汉堡菜单
	$("#cehualan,.mui-title").on("tap",function(){
		mui('.mui-off-canvas-wrap').offCanvas('show');
	})