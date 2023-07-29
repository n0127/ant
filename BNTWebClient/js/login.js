//	截取url
	function GetQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}
	
	if(localStorage.getItem("set-lan")=="EN"){
		$(".login-language").text("CN")
		language="en"
	}else{
		$(".login-language").text("EN")
		language="cn"
	}
	
	
	
//	时间戳
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
	
	
//	rem布局
	var html=document.documentElement;
	var htmlWidth=html.getBoundingClientRect().width
	$("html").css("font-size",htmlWidth/20);
	
//	var AndFontSize=$("html").css("font-size");
//	
//	if((htmlWidth/20)!=AndFontSize){
//		$("html").css("font-size",htmlWidth/20+"!important");
//	}
	
//	维护
	serverstate()

	
	
//	判断是哪个状态
	$(".login-state>ul>li").on("tap",function(){
		$(this).addClass("login-stateActive").siblings().removeClass("login-stateActive")
		var value=$(this).text();
		switch (value){
			case "登录":
				$(".login").css("display","block").siblings().css("display","none")		
				break;
			case "注册":
				$(".register").css("display","block").siblings().css("display","none")
				break;
			case "找回密码":
				$(".retrievePass").css("display","block").siblings().css("display","none")
				break;
			case "Login":
				$(".login").css("display","block").siblings().css("display","none")		
				break;
			case "Register":
				$(".register").css("display","block").siblings().css("display","none")
				break;
			case "Forgot":
				$(".retrievePass").css("display","block").siblings().css("display","none")
				break;
		}
	})
	var yaoqing666=GetQueryString("yaoqing");
	var CodeState=GetQueryString("CodeState");
	switch (CodeState){
		case "1":
			$(".login-state>ul>li:nth-child(1)").addClass("login-stateActive").siblings().removeClass("login-stateActive")
			$(".login").css("display","block").siblings().css("display","none")		
			break;
		case "2":
			$(".login-state>ul>li:nth-child(2)").addClass("login-stateActive").siblings().removeClass("login-stateActive")
			$(".register").css("display","block").siblings().css("display","none")
			$(".register-ipt01").val(yaoqing666);
			$(".registerInvitation").css("display","none")
			$(".register01").css("display","block")
			break;
		case "3":
			$(".login-state>ul>li:nth-child(3)").addClass("login-stateActive").siblings().removeClass("login-stateActive")
			$(".retrievePass").css("display","block").siblings().css("display","none")		
			break;
	}
	
	
	var AndroidApp=GetQueryString("registerType")
	var hehe=GetQueryString("DAPPEngine");
	if(hehe!=undefined){
		var weiyi01=123666;
		var clientType=1
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
			else if(browser.versions.presto){
				var ver = uu.match(/Presto\/([\d.]+)/)[1];
				return {type:"Presto",ver:ver}
			}else{
				return {type:"buzhisuocuo",ver:"686989"}
			}
		}
		var weiyi01=weiyi().type+weiyi().ver;
		var clientType=2;
	}

//	国家选择
	if(hehe==undefined){//判断网页端是否存了这个数据
		if(localStorage.getItem("worldCode")==undefined || localStorage.getItem("worldCode")=="undefined"){
			localStorage.setItem("Country","中国");
			localStorage.setItem("EnCountry","China");
			localStorage.setItem("worldCode","86");
			var Country=localStorage.getItem("Country");
			var EnCountry=localStorage.getItem("EnCountry");
			var worldCode=localStorage.getItem("worldCode");
		}else{
			var Country=localStorage.getItem("Country");
			var EnCountry=localStorage.getItem("EnCountry");
			var worldCode=localStorage.getItem("worldCode");
		}
		
		worldCode01(Country,worldCode,EnCountry)
		$(".Version").hide()
	}
	
	function DAPPFrameworkEngineReady(){
		
		if(localStorage.getItem("set-lan")==undefined){
			setTimeout(function(){DAPPFramework.Controller.SetLanguage("cn")},1000)	
		}
		
		DAPPFramework.View.SetScrollEnabled(false);
//		$(".Version").hide()
		var isOldVersion=false;
		
		try{
			$(".VersionNumber").text(DAPPFramework.Application.Version)
		}catch(e){
			isOldVersion = true;
		}
		
		getVersi()
		//	版本升级
		if( isOldVersion || DAPPFramework.Application.Version!=getVersiArr.data.versionNumber){
				$(".VersionNumber01").text(getVersiArr.data.versionNumber)
				$(".VersionNumber02").text(formatDate(new Date(getVersiArr.data.createTime*1000)))
				$(".VersionNumber03").text(getVersiArr.data.packetSize+"MB")
				value = getVersiArr.data.releaseNotes.replace(/\\n/g,"<br>"); 
				$(".VersionNumber04").html(value)
				window.location.href=getVersiArr.data.versionUrl
		}else{
			$(".Version").hide()
		}
		
		if(DAPPFramework.Storage.Get("worldCode")=="undefined"||DAPPFramework.Storage.Get("worldCode")==undefined){
			DAPPFramework.Storage.Set("Country","中国")
			DAPPFramework.Storage.Set("EnCountry","China")
			DAPPFramework.Storage.Set("worldCode","86")
			var Country=DAPPFramework.Storage.Get("Country")
			var EnCountry=DAPPFramework.Storage.Get("EnCountry")
			var worldCode=DAPPFramework.Storage.Get("worldCode")
		}else{
			var Country=DAPPFramework.Storage.Get("Country")
			var EnCountry=DAPPFramework.Storage.Get("EnCountry")
			var worldCode=DAPPFramework.Storage.Get("worldCode")
		}
		worldCode01(Country,worldCode,EnCountry)
	}
	

	function worldCode01(Country,worldCode,EnCountry){
		if(localStorage.getItem("set-lan")=="EN"){
			$(".CountrySelect>span:nth-child(1)").text(EnCountry)
		}else{
			$(".CountrySelect>span:nth-child(1)").text(Country)
		}
		$(".CountrySelect>span:nth-child(2)").text("+"+worldCode)
	}
	
	$(".registerCode").on("tap",function(){
		var yaoqing=$(".register-ipt01").val();
		if(hehe!=undefined){
			window.location.href="../../indexList.html?DAPPEngine=1&CodeState=2&yaoqing="+yaoqing
		}else if(AndroidApp=="Android"){
			ANT.newPage("indexList.html","&CodeState=2&yaoqing="+yaoqing)
		}else{
			window.location.href="../../indexList.html?CodeState=2&yaoqing="+yaoqing
		}
	})
	
	$(".loginCode").on("tap",function(){
		var yaoqing=$(".register-ipt01").val();
		if(hehe!=undefined){
			window.location.href="../../indexList.html?DAPPEngine=1&CodeState=1&yaoqing="+yaoqing
		}else if(AndroidApp=="Android"){
			ANT.newPage("indexList.html","&CodeState=1")
		}else{
			window.location.href="../../indexList.html?CodeState=1&yaoqing="+yaoqing
		}
	})
	
	$(".retrievePassCode").on("tap",function(){
		var yaoqing=$(".register-ipt01").val();
		if(hehe!=undefined){
			window.location.href="../../indexList.html?DAPPEngine=1&CodeState=3&yaoqing="+yaoqing
		}else if(AndroidApp=="Android"){
			ANT.newPage("indexList.html","&CodeState=3&yaoqing="+yaoqing)
		}else{
			window.location.href="../../indexList.html?CodeState=3&yaoqing="+yaoqing
		}
	})

//	登录
	
	$(".denglu01").on("tap",function(){
		if(localStorage.getItem("set-lan")=="EN"){
			language="en"
		}else{
			language="cn"
		}
		var yaoqing=$(".login-denglu01").val();
		var yaoqing1=$(".login-denglu02").val();
		var worldCode=$(".loginCode>span:nth-child(2)").text().substring(1)
		if(yaoqing == "" || yaoqing == null || yaoqing == undefined){
			if(localStorage.getItem("set-lan")=="EN"){
				alert("Enter Account")
			}else{
				alert("请输入账号")
			}
		}else{
			if(yaoqing1 == "" || yaoqing1 == null || yaoqing1 == undefined){
				if(localStorage.getItem("set-lan")=="EN"){
					alert("Enter password")
				}else{
					alert("请输入密码")
				}
			}else{
				_hmt.push(["_trackEvent", "登录","登录"]);
				login(yaoqing,yaoqing1,weiyi01,clientType,worldCode)
			}
		}
	})

	
//	注册流程
	$(".xiayibu01").click(function(){
		var yaoqing=$(".register-ipt01").val();
		
		if(yaoqing == "" || yaoqing == null || yaoqing == undefined){
			if(localStorage.getItem("set-lan")=="EN"){
				alert("Enter referral ID")
			}else{
				alert("请输入邀请码")
			}
		}else{
			$(".registerInvitation").css("display","none")
			$(".register01").css("display","block")
		}
	})
	
	$(".yanzhengma01").on("tap",function(){
		var yaoqing1=$(".register-ipt02").val();
		var worldCode=$(".registerCode>span:nth-child(2)").text().substring(1)
		if(yaoqing1 == "" || yaoqing1 == null || yaoqing1 == undefined){
			if(localStorage.getItem("set-lan")=="EN"){
				alert("Enter sms")
			}else{
				alert("请输入验证码")
			}
		}else{
			ant(yaoqing1,1,0,weiyi01,clientType,worldCode)
			if(antdata!=1){
				if(localStorage.getItem("set-lan")=="EN"){
					alert("Phone number is irregular")
				}else{
					alert("手机号码不规则")
				}
			}else{
				var i=60;
				$(".yanzhengma01").attr("disabled","disabled")
				var yanzhengSet=setInterval(function(){
					$(".yanzhengma01").text(i)
					i--;
					if(i<0){
						clearInterval(yanzhengSet);
						if(localStorage.getItem("set-lan")=="EN"){
							$(".yanzhengma01").text("Send SMS")
						}else{
							$(".yanzhengma01").text("获取验证码")
						}
			      		$(".yanzhengma01").removeAttr("disabled")
					}
				},1000)
			}
		}
	})
	
	$(".xiayibu02").click(function(){
		if(localStorage.getItem("set-lan")=="EN"){
			language="en"
		}else{
			language="cn"
		}
		var yaoqing=$(".register-ipt01").val();
		var yaoqing1=$(".register-ipt02").val();
		var yaoqing2=$(".register-ipt03").val();
		var worldCode=$(".registerCode>span:nth-child(2)").text().substring(1)
		if(yaoqing1 == "" || yaoqing1 == null || yaoqing1 == undefined){
			if(localStorage.getItem("set-lan")=="EN"){
				alert("Enter phone number")
			}else{
				alert("请输入手机号码")
			}
		}else{
			if(yaoqing2 == "" || yaoqing2 == null || yaoqing2 == undefined){
				if(localStorage.getItem("set-lan")=="EN"){
					alert("Enter sms")
				}else{
					alert("请输入验证码")
				}
			}else{
				registerNewUser(yaoqing1,weiyi01,yaoqing,yaoqing2,clientType,worldCode)
				if(registerNewUserArr01.code==1){
					$(".register01").css("display","none")
					$(".register02").css("display","block")
				}else{
					alert(registerNewUserArr01.message)
				}
				
			}
		}
	})
	
	$(".xiayibu03").click(function(){
		if(localStorage.getItem("set-lan")=="EN"){
			language="en"
		}else{
			language="cn"
		}
		var yaoqing=$(".register-ipt04").val();
		var yaoqing1=$(".register-ipt05").val();
		var yaoqing2=$(".register-ipt02").val();
		var worldCode=$(".registerCode>span:nth-child(2)").text().substring(1)
		
		if(yaoqing == "" || yaoqing == null || yaoqing == undefined){
			if(localStorage.getItem("set-lan")=="EN"){
				alert("Enter password")
			}else{
				alert("请输入登录密码")
			}
		}else{
			if(yaoqing1 == "" || yaoqing1 == null || yaoqing1 == undefined){
				if(localStorage.getItem("set-lan")=="EN"){
					alert("Enter confirmation password")
				}else{
					alert("请输入确认密码")
				}
			}else{
				if(yaoqing==yaoqing1){
					registerSetLoginPassword(yaoqing2,yaoqing,clientType,worldCode)
					if(registerSetLoginPasswordArr.code==1){
						$(".register02").css("display","none")
						$(".register03").css("display","block")
					}else{
						alert(registerSetLoginPasswordArr.message)
					}
				}else{
					if(localStorage.getItem("set-lan")=="EN"){
						alert("The passwords do not match")
					}else{
						alert("两次密码不一致")
					}
				}
				
			}
		}
	})
	
	$(".xiayibu04").click(function(){
		if(localStorage.getItem("set-lan")=="EN"){
			language="en"
		}else{
			language="cn"
		}
		var yaoqing=$(".register-ipt06").val();
		var yaoqing1=$(".register-ipt07").val();
		var yaoqing2=$(".register-ipt02").val();
		var worldCode=$(".registerCode>span:nth-child(2)").text().substring(1)
		if(yaoqing == "" || yaoqing == null || yaoqing == undefined){
			if(localStorage.getItem("set-lan")=="EN"){
				alert("Enter payment password")
			}else{
				alert("请输入交易密码")
			}
		}else{
			if(yaoqing1 == "" || yaoqing1 == null || yaoqing1 == undefined){
				if(localStorage.getItem("set-lan")=="EN"){
					alert("Enter confirmation password")
				}else{
					alert("请输入确认密码")
				}
			}else{
				if(yaoqing==yaoqing1){
					registerSetTradePassword(yaoqing2,worldCode,yaoqing,clientType)
//					$(".register03").css("display","none")
//					window.location.reload()
				}else{
					if(localStorage.getItem("set-lan")=="EN"){
						alert("The passwords do not match")
					}else{
						alert("两次密码不一致")
					}
				}
				
			}
		}
	})
	
	
//	找回密码
	$(".yanzhengma").click(function(){
		var a=$(".retrieve-ipt01").val();
		var a1=$(".yanzhengText").val()
		var worldCode=$(".retrievePassCode>span:nth-child(2)").text().substring(1)
		if(a == "" || a == null || a == undefined){
			if(localStorage.getItem("set-lan")=="EN"){
				alert("Enter phone number")
			}else{
				alert("请输入手机号码")
			}
		}else{
			ant(a,1,2,weiyi01,clientType,worldCode)
			if(antdata!=1){
				if(localStorage.getItem("set-lan")=="EN"){
					alert("Phone number is irregular")
				}else{
					alert("手机号码不规则")
				}
			}else{
				var i=60;
				$(".yanzhengma").attr("disabled","disabled")
				var yanzhengSet=setInterval(function(){
					$(".yanzhengma").text(i)
					i--;
					if(i<0){
						clearInterval(yanzhengSet);
						if(localStorage.getItem("set-lan")=="EN"){
							$(".yanzhengma01").text("Send SMS")
						}else{
							$(".yanzhengma01").text("获取验证码")
						}
			      		$(".yanzhengma").removeAttr("disabled")
					}
				},1000)
			}
			
		}
	})
	$(".retrievePass-but01").on("tap",function(){
		var a=$(".retrieve-ipt01").val();
		var a1=$(".yanzhengText").val();
		
		if(a == "" || a == null || a == undefined){
			if(localStorage.getItem("set-lan")=="EN"){
				alert("Enter phone number")
			}else{
				alert("请输入手机号码")
			}
		}else{
			if(a1 == "" || a1 == null || a1 == undefined){
				if(localStorage.getItem("set-lan")=="EN"){
					alert("Enter sms")
				}else{
					alert("请输入验证码")
				}
			}else{
				$(".retrievePass01").css("display","none")
				$(".retrievePass02").css("display","block")
			}
		}
	})
	$(".retrievePass-but02").on("tap",function(){
		if(localStorage.getItem("set-lan")=="EN"){
			language="en"
		}else{
			language="cn"
		}
		var a=$(".retrieve-ipt02").val();
		var a1=$(".retrieve-ipt03").val();
		var a2=$(".retrieve-ipt01").val();
		var a3=$(".yanzhengText").val();
		var worldCode=$(".retrievePassCode>span:nth-child(2)").text().substring(1)
		
		if(a == "" || a == null || a == undefined){
			if(localStorage.getItem("set-lan")=="EN"){
				alert("Enter password")
			}else{
				alert("请输入登录密码")
			}
		}else{
			if(a1 == "" || a1 == null || a1 == undefined){
				if(localStorage.getItem("set-lan")=="EN"){
					alert("Enter confirmation password")
				}else{
					alert("请输入确认密码")
				}
			}else{
				if(a==a1){
					forgetLoginPassword(a2,a3,a,worldCode)
//					window.location.href="login.html"
				}else{
					if(localStorage.getItem("set-lan")=="EN"){
						alert("The passwords do not match")
					}else{
						alert("新密码与确认密码不一致")
					}
				}
			}
		}
	})