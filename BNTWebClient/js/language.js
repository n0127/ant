//	截取url
	function GetQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}
	var hehe=GetQueryString("DAPPEngine")
	
	var langStart;
	
	if(localStorage.getItem("set-lan")){
		if(localStorage.getItem("set-lan")=="EN"){
			langStart=0
			qiehuan()
		}else if(localStorage.getItem("set-lan")=="CN"){
			langStart=1
			qiehuan()
		}
	}else{
		localStorage.setItem("set-lan","CN")
		langStart=1
	}
	
	
	$(".login-language").on("tap",function(){
		if(langStart==1){
			$(".login-language").text("CN")
			localStorage.setItem("set-lan","EN")
			languageArr=EN
			langStart=0
			if(hehe!=undefined){
				$(".CountrySelect>span:nth-child(1)").text(DAPPFramework.Storage.Get("EnCountry"))
				DAPPFramework.Controller.SetLanguage("en")
			}else{
				$(".CountrySelect>span:nth-child(1)").text(localStorage.getItem("EnCountry"))
			}
			qiehuan()
		}else{
			$(".login-language").text("EN")
			localStorage.setItem("set-lan","CN")
			languageArr=CN
			langStart=1
			if(hehe!=undefined){
				DAPPFramework.Controller.SetLanguage("cn")
				$(".CountrySelect>span:nth-child(1)").text(DAPPFramework.Storage.Get("Country"))
			}else{
				$(".CountrySelect>span:nth-child(1)").text(localStorage.getItem("Country"))
			}
			qiehuan()
		}
	})
	
	function qiehuan(){
		$("[data-value]").each(function(){
			var This=$(this)
			var Arr=This.attr("data-value")
			if(langStart==0){
				var t=EN[Arr]
			}else{
				var t=CN[Arr]
			}

			if(This[0].type=="password" || This[0].type=="text" || This[0].type=="textarea"){
				This.attr("placeholder",t)	
			}else if(This.attr("data-value")=="1101" || This.attr("data-value")=="1102" || This.attr("data-html")=="html"){
				This.html(t)
			}else{
				This.text(t)				
			}
		})
	}