	var token;
	var userId;
	var phone;
	var clientType;
	var language;
	if(localStorage.getItem("set-lan")=="EN"){
		language="en"
	}else{
		language="cn"
	}
//	var img;

	document.documentElement.style.webkitUserSelect='none';
	document.documentElement.style.webkitTouchCallout='none';
	var AndroidApp=GetQueryString("registerType")
	
//	rem布局
	function DAPPFrameworkEngineReady(){
		var htmlWidth=DAPPFramework.View.Width;
		$("html").css("font-size",htmlWidth/20);
		userId=DAPPFramework.Storage.Get("userId")
		token=DAPPFramework.Storage.Get("token")
		phone=DAPPFramework.SharedBoard.Get("phone")
		clientType=1
		
		$(".removelogin").on("tap",function(){
			if(localStorage.getItem("set-lan")=="EN"){
				DAPPFramework.Dialog.Alert("","Whether to log out",["Cancel","Confirm"],[0,2],"RemoveLogin")
			}else{
				DAPPFramework.Dialog.Alert("","是否退出登录",["取消","确定"],[0,2],"RemoveLogin")
			}
		})
		getuser()
	}
	
	function twoType(arg){
		if(arg=='确定' || arg=='Confirm'){
			ANT.removeKey("userId")
			ANT.removeKey("token")
			ANT.finishAll()
		}
	}
	
	if(AndroidApp=="Android"){
		userId=ANT.getMessage("userId");
		token=ANT.getMessage("token");
		phone=ANT.getMessage("phone");
		clientType=1;
		$(".removelogin").on("tap",function(){
			if(localStorage.getItem("set-lan")=="EN"){
				ANT.showPopoutTwoType('Whether to log out',"Cancel","Confirm")
			}else{
				ANT.showPopoutTwoType('是否退出登录','取消','确定')
			}
		})
		getuser()
	}
	
	function oneType(item){
		if(item=="扫码转账"){
			ANT.openScanCode()
		}else{
			ANT.newPage("src/index/transaction-box.html")
		}
	}
	
	function cameraResult(item){
		if(item){
			ANT.newPage("src/index/transaction-box.html","&AndPhone="+item)
		}
	}
	
	
	function getuser(){
		indexData(userId,token,clientType)
		getUserInfo(userId,token,clientType)
		$(".user_name").val(getUserInfoArr.data.username)
		$(".phone").text(getUserInfoArr.data.phone)
		$(".userId").text(getUserInfoArr.data.id)
		if(getUserInfoArr.data.avatar!=null){
			$(".touxiang-img").attr("src",getUserInfoArr.data.avatar)
		}
		if(Number(indexziliao.data.isVip)){
			$(".tou-img>img:nth-child(1)").css("border","2px solid #dcbe6f")
			$(".tou-img>img:nth-child(2)").show()
			$(".tou-text>div>div>span:nth-child(1)").css("display","inline-block")
		}
		if(Number(indexziliao.data.isMerchant)){
			$(".tou-text>div>div>span:nth-child(2)").css("display","inline-block")
			$(".tou-text>div>div>span:nth-child(2)").text("Lv"+indexziliao.data.isMerchant)
		}else{
			$(".tou-text>div>div>span:nth-child(2)").css("display","none")
		}
		
	}
	function RemoveLogin(item){
		if(item=="确定"||item=="Confirm"){
			DAPPFramework.Storage.Remove("userId")
			DAPPFramework.SharedBoard.Remove("selectCode")
			DAPPFramework.Storage.Remove("token")
			DAPPFramework.Storage.Remove("VurrentValue")
			DAPPFramework.Controller.JumpToStartPage();
			DAPPFramework.Controller.SetNextStartPage("Start");
		}
	}

//	暂未开放
	$(".weikaifang").on("tap",function(){
		if(localStorage.getItem("set-lan")=="EN"){
			alert('Not Yet Open') 
		}else{
			alert('暂未开放,正在建设中') 
		}
	})

//	url取值
	function GetQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}
	
//	判断是否app
	var hehe=GetQueryString("DAPPEngine")
	if(hehe!=undefined){
		$(".public-header").css("display","none")
	}

//	修改名字
	$(".xiugainame").on("tap",function(){
		if(hehe!=undefined){
			$(".tou-text>input").removeAttr("disabled")
			$(".tou-text>input").css("background","#1d2d35")			
		}else{
			ANT.showPopoutThreeType("修改昵称","确定","取消")
		}
	})
	function threeType(item){
		if(item){
			updateUserInfo(userId,item,token)
			if(updateUserInfoArr.code==1){
				$(".user_name").val(item)
				if(localStorage.getItem("set-lan")=="EN"){
					alert("Successful")
				}else{
					alert("修改成功")
				}
			}else{
				alert(updateUserInfoArr.message)
				$(".user_name").val(getUserInfoArr.data.username)
			}
		}
	}
	$(".tou-text>input").on("blur",function(event){
		var value=$(this).val()
		$(".tou-text>input").attr("disabled","disabled")
		$(".tou-text>input").css("background","transparent")
		updateUserInfo(userId,value,token)
		if(updateUserInfoArr.code==1){
			if(localStorage.getItem("set-lan")=="EN"){
				alert("Successful")
			}else{
				alert("修改成功")
			}
		}else{
			alert(updateUserInfoArr.message)
			$(".user_name").val(getUserInfoArr.data.username)
		}
	})
	
	
	
//邀请卡
	$(".yaoqingka").on("tap",function(){
		if(hehe!=undefined){			
			DAPPFramework.View.PresentView("src/sidebar/sidebar.html?Push=0");
		}else{
			ANT.newPage("src/sidebar/sidebar.html")
		}
	})
	
//安全中心
	$(".cebian03").on("tap",function(){
		if(hehe!=undefined){			
			DAPPFramework.View.PresentView("src/sidebar/Key/PrivateKeyManagement.html");
		}else{
			ANT.newPage("src/sidebar/Key/PrivateKeyManagement.html")
		}
	})

//关于我们
	$(".AboutUs").on("tap",function(){
		if(hehe!=undefined){			
			DAPPFramework.View.PresentView("src/sidebar/cebian-AboutUs.html");
		}else{
			ANT.newPage("src/sidebar/cebian-AboutUs.html")
		}
	})

		
//上传头像

	function convertBase64UrlToBlob(urlData) {
	   const bytes = window.atob(urlData.split(',')[1]);        // 去掉url的头，并转换为byte
	   // 处理异常,将ascii码小于0的转换为大于0
	   const ab = new ArrayBuffer(bytes.length);
	   const ia = new Uint8Array(ab);
	   for (let i = 0; i < bytes.length; i++) {
	       ia[i] = bytes.charCodeAt(i);
	   }
	   return new Blob([ab], { type: 'image/png' });
	}
	$(".tou-img").on("tap",function(){
		DAPPFramework.Camera.Album(512, "AlbumCallBackFunc");
//		var file=this.files[0];
//		if(!/image\/\w+/.test(file.type)){ 
//	        alert("请确保文件为图像类型"); 
//	        return false; 
//      }
		
	})
	function AlbumCallBackFunc(item){
		var fileDate=new FormData();
		fileDate.append("userId",userId)
		fileDate.append("token",token)
		fileDate.append("avatar",convertBase64UrlToBlob(item))
		fileDate.append("timestamp",new Date().getTime())
		fileDate.append("sign",6666)
		fileDate.append("clientType",clientType)
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://bnt.yfsz.top/user/doUploadAvatar",//192.168.31.135:80
			async: false,
			data:fileDate,
			cache:false,         //不设置缓存
		  	processData:false,  // 不处理数据
		  	contentType:false,  // 不设置内容类型
			success:function(result){
				if(result.code==1){
					updateUserInfo01(userId,token,result.data,getUserInfoArr.data.username)
					if(updateUserInfo01Arr.code==1){
						alert("上传成功")
						getUserInfo(userId,token,clientType)
						if(getUserInfoArr.code==1){
							$(".touxiang-img").attr("src",getUserInfoArr.data.avatar)
						}
					}else{
						alert(updateUserInfo01Arr.message)
					}
				}else{
					alert(result.message)
				}
			},
			error:function(data){
				alert(data)
			}
		})
	}
	