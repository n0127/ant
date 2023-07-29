	var languageArr;

	
//	截取url
	function GetQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}
	
	if(localStorage.getItem("set-lan")=="EN"){
		$(".login-language").text("CN")
		language="en"
		languageArr=EN
	}else{
		$(".login-language").text("EN")
		language="cn"
		languageArr=CN
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
		var weiyi01=666;
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
		var isOldVersion=false;
		
		try{
			$(".VersionNumber").text(DAPPFramework.Application.Version)
		}catch(e){
			isOldVersion = true;
		}
		
		getVersi()
		//	版本升级
		if( isOldVersion || DAPPFramework.Application.Version!=getVersiArr.data.versionNumber){
			$(".Version").show()
			$(".VersionNumber01").text(getVersiArr.data.versionNumber)
			$(".VersionNumber02").text(formatDate(new Date(getVersiArr.data.createTime*1000)))
			$(".VersionNumber03").text(getVersiArr.data.packetSize+"MB")
			value = getVersiArr.data.releaseNotes.replace(/\\n/g,"<br>"); 
			$(".VersionNumber04").html(value)
			window.location.href=getVersiArr.data.versionUrl
		}else{
			$(".Version").hide()
		}
		
		//国家选择
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
		
//		DAPPFramework.Storage.Remove("PrivateKeyJosn")
		//判断本地有么有私钥 
		if(DAPPFramework.Storage.Get("PrivateKeyJosn")){
			var PrivateKeyJosn=JSON.parse(DAPPFramework.Storage.Get("PrivateKeyJosn"));
			var i=0;
			PrivateKeyJosn.forEach(function(item){
				if(item.ImgUrl){
					itemImg=item.ImgUrl
				}else{
					itemImg="../../img/Node-title.png"
				}
				$(".PrivateKeyListFor").append(
					"<div class='PrivateKeyList'>"+
						"<div class='PrivateKeyListBox' data-value='"+i+"'>"+
							"<img src='"+itemImg+"' />"+
							"<div>"+
								"<span>"+item.username+"</span>"+
								"<span>"+item.userId+"</span>"+
								"<p>"+item.address+"</p>"+
							"</div>"+
							"<p class='Rightjiantou'></p>"+
						"</div>"+
					"</div>"
				)
				i++;
			})
			console.log(PrivateKeyJosn)
		}else{
			var PrivateKeyJosn=[];
			DAPPFramework.Storage.Set("PrivateKeyJosn",JSON.stringify(PrivateKeyJosn))
			window.location.href="NewLogin.html?DAPPEngine=1"
		}
		
		$(".PrivateKeyListBox").on("tap",function(){
			$(this).find(".Rightjiantou").css("background","url(../../img/loding.png)")
			$(this).find(".Rightjiantou").css("background-size","0.666666rem 0.666666rem")
			$(this).find(".Rightjiantou").css("animation-name","RotateTop")
			var This=$(this)
			setTimeout(function(){
				var dataValue=This.attr("data-value")
				var PrivateKeyJosn=JSON.parse(DAPPFramework.Storage.Get("PrivateKeyJosn"));
				var privateKey=PrivateKeyJosn[dataValue].privateKey;
				var Time="0x"+new Date().getTime().toString(16);
				var wallet=new ethers.Wallet(privateKey);
				wallet.signMessage(Time).then(signature => {
					walletLogin(Time,signature)
					if(walletLoginArr.data.avatar){						
						PrivateKeyJosn[dataValue].ImgUrl=walletLoginArr.data.avatar
						DAPPFramework.Storage.Set("PrivateKeyJosn",JSON.stringify(PrivateKeyJosn))
					}
					DAPPFramework.Storage.Set("VurrentValue",dataValue)
				})
			},1000)
		})
		
		
		$(".PrivateKeyDropDown").on("keyup","input",function(e){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			console.log(e.keyCode)
			if(e && e.keyCode==13){
				var dataValue=$(this).parent().parent().siblings().attr("data-value")
				var PrivateKeyJosn=JSON.parse(DAPPFramework.Storage.Get("PrivateKeyJosn"));
				var keystore=PrivateKeyJosn[dataValue].keystore;
				var privateKey=PrivateKeyJosn[dataValue].privateKey;
				var value=$(this).val();
				var Time="0x"+new Date().getTime().toString(16);
				console.log(new Date().getTime())
				console.log(Time)
				$(".loadingBox").css("display","flex")
				var wallet=new ethers.Wallet(privateKey);
				wallet.signMessage(Time).then(signature => {
					$(".loadingBox").hide()
					walletLogin(Time,signature)
				})
//				ethers.Wallet.fromEncryptedJson(keystore, value).then(function(data) {
//					console.log(data)
//					data.signMessage(Time).then(signature => {
//						$(".loadingBox").hide()
//						walletLogin(Time,signature)
//					})
//			    }, function (error) {
//					if (error === 'invalid wallet JSON') {
//						mui.alert('请输入正确的keystore！');
//					}else {
//						mui.alert('keystore密码错误！');
//					}
//			    });
			}
			
		})
		
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
				if(loginArr.code==1){
					if(hehe!=undefined){
						DAPPFramework.SharedBoard.Set("userId",loginArr.data.id)
						DAPPFramework.SharedBoard.Set("token",loginArr.data.token)
						DAPPFramework.SharedBoard.Set("username",loginArr.data.username)
						isExistWallet(loginArr.data.id,loginArr.data.token,1)
					}else{
						window.location.href = "../../index.html"
						sessionStorage.setItem("userId",loginArr.data.id)
						sessionStorage.setItem("phone",loginArr.data.phone)
						sessionStorage.setItem("token",loginArr.data.token)
						sessionStorage.setItem("img",loginArr.data.avatar)
					}
				}else{
//					if(loginArr.code== -12053){
//						getUserPrivateKey(yaoqing,yaoqing1,worldCode)
//						if(getUserPrivateKeyArr.code==1){
//							window.location.href="../../wallet/src/importWallet.html?LoginPrivateKey="+getUserPrivateKeyArr.data;
//						}else{
//							alert(getUserPrivateKeyArr.message)
//						}
//					}else{
						alert(loginArr.message)
//					}
				}
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
//					$(".register01").css("display","none")
//					$(".register02").css("display","block")
					
					DAPPFramework.SharedBoard.Set("registeredStatus","1")
					DAPPFramework.SharedBoard.Set("phone",yaoqing1)
					DAPPFramework.SharedBoard.Set("registeredWorld",worldCode)
					
					window.location.href="protocol.html"
				}else{
					alert(registerNewUserArr01.message)
				}
				
			}
		}
	})
	
//	$(".xiayibu03").click(function(){
//		if(localStorage.getItem("set-lan")=="EN"){
//			language="en"
//		}else{
//			language="cn"
//		}
//		var yaoqing=$(".register-ipt04").val();
//		var yaoqing1=$(".register-ipt05").val();
//		var yaoqing2=$(".register-ipt02").val();
//		var worldCode=$(".registerCode>span:nth-child(2)").text().substring(1)
//		
//		if(yaoqing == "" || yaoqing == null || yaoqing == undefined){
//			if(localStorage.getItem("set-lan")=="EN"){
//				alert("Enter password")
//			}else{
//				alert("请输入登录密码")
//			}
//		}else{
//			if(yaoqing1 == "" || yaoqing1 == null || yaoqing1 == undefined){
//				if(localStorage.getItem("set-lan")=="EN"){
//					alert("Enter confirmation password")
//				}else{
//					alert("请输入确认密码")
//				}
//			}else{
//				if(yaoqing==yaoqing1){
//					registerSetLoginPassword(yaoqing2,yaoqing,clientType,worldCode)
//					if(registerSetLoginPasswordArr.code==1){
//						$(".register02").css("display","none")
//						$(".register03").css("display","block")
//					}else{
//						alert(registerSetLoginPasswordArr.message)
//					}
//				}else{
//					if(localStorage.getItem("set-lan")=="EN"){
//						alert("The passwords do not match")
//					}else{
//						alert("两次密码不一致")
//					}
//				}
//				
//			}
//		}
//	})
//	
//	$(".xiayibu04").click(function(){
//		if(localStorage.getItem("set-lan")=="EN"){
//			language="en"
//		}else{
//			language="cn"
//		}
//		var yaoqing=$(".register-ipt06").val();
//		var yaoqing1=$(".register-ipt07").val();
//		var yaoqing2=$(".register-ipt02").val();
//		var worldCode=$(".registerCode>span:nth-child(2)").text().substring(1)
//		if(yaoqing == "" || yaoqing == null || yaoqing == undefined){
//			if(localStorage.getItem("set-lan")=="EN"){
//				alert("Enter payment password")
//			}else{
//				alert("请输入交易密码")
//			}
//		}else{
//			if(yaoqing1 == "" || yaoqing1 == null || yaoqing1 == undefined){
//				if(localStorage.getItem("set-lan")=="EN"){
//					alert("Enter confirmation password")
//				}else{
//					alert("请输入确认密码")
//				}
//			}else{
//				if(yaoqing==yaoqing1){
//					registerSetTradePassword(yaoqing2,worldCode,yaoqing,clientType)
//				}else{
//					if(localStorage.getItem("set-lan")=="EN"){
//						alert("The passwords do not match")
//					}else{
//						alert("两次密码不一致")
//					}
//				}
//				
//			}
//		}
//	})
	
	
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