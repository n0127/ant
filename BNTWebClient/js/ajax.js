var ip="bnt.yfsz.top";//192.168.31.136  //bnt.yfsz.top

//	截取url
	function GetQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}
	
	var AndroidApp=GetQueryString("registerType")
	var hehe=GetQueryString("DAPPEngine");
	
	//	封装登录
	var loginArr;
	function login(phone,loginPassword,phoneKey,clientType,worldCode){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/sso/login",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"phone":phone,
				"loginPassword":loginPassword,
				"phoneKey":phoneKey,
				"clientType":clientType,
				"worldCode":worldCode,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"language":language
			},
			success:function(result){
				loginArr=result
				
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	var isExistWalletArr;
	function isExistWallet(userId,token,clientType){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/wallet/isExistWallet",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"clientType":clientType,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				isExistWalletArr=result
				if(isExistWalletArr.data==0){
					DAPPFramework.SharedBoard.Set("registeredStatus","0")
					window.location.href="protocol.html"
				}else{
					alert("此用户已创建钱包")
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	
//	获取私钥
	var getUserPrivateKeyArr;
	function getUserPrivateKey(phone,loginPassword,worldCode){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/sso/getUserPrivateKey",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"phone":phone,
				"loginPassword":loginPassword,
				"worldCode":worldCode,
				"phoneKey":666,
				"clientType":clientType,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				console.log(result)
				getUserPrivateKeyArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	
//	登录之后首页资料
	var indexziliao={};
	function indexData(userId,token,clientType){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antCapital/getAntAccountInfo",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType
			},
			success:function(result){
				console.log(result)
				if(hehe!=undefined){
					DAPPFramework.SharedBoard.Set("username",result.data.username)
				}else{
					sessionStorage.setItem("username",result.data.username)
				}
				indexziliao=result
			},
			error:function(data){
				console.log(data)
				alert("验证已过期")
				if(hehe!=undefined){
					DAPPFramework.Controller.JumpToStartPage();
					DAPPFramework.Controller.SetNextStartPage("Start");
				}else if(AndroidApp=="Android"){
					ANT.newPage("src/login/login.html")
				}else{
					window.location.href="src/login/login.html"
				}
			}
		})
	}

//	封装验证码
	var antdata="";
	function ant(phone,loginType,type,phoneKey,clientType,worldCode){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/sms/send",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"phoneNum":phone,
				"loginType":loginType,
				"type":type,
				"phoneKey":phoneKey,
				"clientType":clientType,
				"worldCode":worldCode,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				//console.log(result)
				if(result.code==1){
					if(localStorage.getItem("set-lan")=="EN"){
						alert("Send Success")
					}else{
						alert("发送成功")
					}
				}else{
					alert(result.message)
				}
				antdata=result.code
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	修改登录密码
	function modifyLoginPassword(userId,oldLoginPassword,newLoginPassword,token){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/user/modifyLoginPassword",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"oldLoginPassword":oldLoginPassword,
				"newLoginPassword":newLoginPassword,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"language":language
			},
			success:function(result){
				if(result.code==1){
					if(localStorage.getItem("set-lan")=="EN"){
						alert("Successful")
					}else{
						alert("修改成功")
					}   
					if(hehe!=undefined){
						DAPPFramework.Storage.Remove("userId")
						DAPPFramework.Storage.Remove("token")
						DAPPFramework.Controller.JumpToStartPage();
					}else if(AndroidApp=="Android"){
						ANT.newPage("src/login/login.html")
					}else{
						window.location.href="../login/login.html"
					} 
				}else{
					alert(result.message) 
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	注册第一步
	var registerNewUserArr01;
	function registerNewUser(phone,phoneKey,introducer,code,clientType,worldCode){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/user/registerNewUser",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"phone":phone,
				"phoneKey":phoneKey,
				"introducer":introducer,
				"code":code,
				"clientType":clientType,
				"worldCode":worldCode,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"language":language
			},
			success:function(result){
//				alert(result.code)
				registerNewUserArr01=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	注册第二步
	var registerSetLoginPasswordArr;
	function registerSetLoginPassword(phone,loginPassword,clientType,worldCode){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/user/registerSetLoginPassword",
			xhrFields:{
			    withCredentials:true
			},
			async: false,
			data:{
				"phone":phone,
				"loginPassword":loginPassword,
				"worldCode":worldCode,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"language":language
			},
			success:function(result){
				registerSetLoginPasswordArr=result;
				console.log(result)
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	注册第三步
	var registerSetTradePasswordArr;
	function registerSetTradePassword(phone,worldCode,tradePassword,clientType){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/user/registerSetTradePassword",
			xhrFields:{
			    withCredentials:true
			},
			async: false,
			data:{
				"phone":phone,
				"worldCode":worldCode,
				"tradePassword":tradePassword,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"language":language
			},
			success:function(result){
				console.log(result)
				if(result.code==1){
//					if(localStorage.getItem("set-lan")=="EN"){
//						alert("Registration success")
//					}else{
//						alert("注册成功")
//					}
//					if(hehe!=undefined){
//						DAPPFramework.View.Reload();
//					}else{
//						window.location.href="login.html"
//					}
					registerSetTradePasswordArr=result
				}else{
					alert(result.message)
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	

//	找回登录密码
	function forgetLoginPassword(phone,code,newLoginPassword,worldCode,isDeletePrivateKey){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/user/forgetLoginPassword",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"phone":phone,
				"code":code,
				"newLoginPassword":newLoginPassword,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"worldCode":worldCode,
				"language":language,
				"isDeletePrivateKey":isDeletePrivateKey
			},
			success:function(result){
				if(result.code==1){
					alert("成功")
					window.location.href="NewLogin.html?DAPPEngine=1"
				}else{
					alert(result.message)
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	

//	修改支付密码
	function modifyPaymentPassword(userId,oldTradePassword,newTradePassword,token){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antAccount/modifyTradePassword",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"oldTradePassword":oldTradePassword,
				"newTradePassword":newTradePassword,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"language":language
			},
			success:function(result){
				if(result.code==1){
					if(localStorage.getItem("set-lan")=="EN"){
						alert("Successful")
					}else{
						alert("修改成功")
					} 
					if(hehe!=undefined){
						DAPPFramework.Controller.JumpToMainPage();
					}else if(AndroidApp=="Android"){
						ANT.newPage("src/login/login.html")
					}else{
						window.location.href="../../index.html"
					} 
				}else{
					alert(result.message) 
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	修改手机认证
	function modifyPhone(userId,oldPhone,newPhone,code,tradePassword,loginPassword,token,oldWorldCode,newWorldCode){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/user/modifyPhone",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"oldPhone":oldPhone,
				"newPhone":newPhone,
				"code":code,
				"tradePassword":tradePassword,
				"loginPassword":loginPassword,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"oldWorldCode":oldWorldCode,
				"newWorldCode":newWorldCode,
				"language":language
			},
			success:function(result){
				if(result.code==1){
					if(localStorage.getItem("set-lan")=="EN"){
						alert("Successful")
					}else{
						alert("修改成功")
					}
					if(hehe!=undefined){
						DAPPFramework.Controller.JumpToStartPage();
					}else{
						window.location.href="../login/login.html"
					} 
				}else{
					alert(result.message) 
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	找回支付密码
	function forgetTradePassword(phone,code,newTradePassword,token,worldCode){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antAccount/forgetTradePassword",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"phone":phone,
				'code':code,
				'newTradePassword':newTradePassword,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"worldCode":worldCode,
				"language":language
				
			},
			success:function(result){
				if(result.code==1){
					if(localStorage.getItem("set-lan")=="EN"){
						alert("Successful")
					}else{
						alert("修改成功")
					}
					if(hehe!=undefined){
						DAPPFramework.Controller.JumpToMainPage();
					}else{
						window.location.href="../../index.html"
					} 
				}else{
					alert(result.message)
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//资产详情
	var getAntBananceLogTop10Arr=[];
	function getAntBananceLogTop10(userId,token,pageNum){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antBanance/getAntBananceLogTop10",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"pageSize":"10",
				"pageNum":pageNum,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"language":language
			},
			success:function(result){
				//console.log(result)
				getAntBananceLogTop10Arr=result.data
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	

//资产详情01
	var getAntLogScoreTop10Arr=[];
	function getAntLogScoreTop10(userId,token,pageNum){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antScore/getAntLogScoreTop10",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"pageSize":"10",
				"pageNum":pageNum,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"language":language
			},
			success:function(result){
				//console.log(result)
				getAntLogScoreTop10Arr=result.data
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//Pos权益
	var getAntBananceLogListArr=[];
	var getAntBananceLogListArr01=[];
	function getAntBananceLogList(userId,token,type,pageNum,pageSize){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antBanance/getAntBananceLogList",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"type":type, //1为pos,2为dpos,3为节点奖励
				"pageNum":pageNum,
				"pageSize":pageSize,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType
			},
			success:function(result){
				//console.log(result)
				getAntBananceLogListArr=result
				getAntBananceLogListArr01=result.data.lists
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	版本信息
	var getVersiArr={};
	function getVersi(){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/sat/getVersion",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"model":1,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"language":language
			},
			success:function(result){
				console.log(result)
				getVersiArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}

//获取我的节点
	var getMyNodeArr={};
	var getMyNodeArr1=[];
	function getMyNode(userId,token){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antIntroducer/getMyNode",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType
			},
			success:function(result){
				console.log(result)
				getMyNodeArr=result;
				getMyNodeArr1=result.data.lists
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//获取红包
	var RedPacket={};
	function getEveryDayRedPacket(userId,token,clientType){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/redPacket/getEveryDayRedPacket",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType
			},
			success:function(result){
				//console.log(result)
				RedPacket=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//拿到手红包
//	var claimEveryDayRedPacketArr;
	function claimEveryDayRedPacket(userId,token,redPacketId){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/redPacket/claimEveryDayRedPacket",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"redPacketId":redPacketId,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType
			},
			success:function(result){
//				claimEveryDayRedPacket=result.code
				if(result.code==1){
					window.location.reload()
					if(localStorage.getItem("set-lan")=="EN"){
						alert("Receive success")
					}else{
						alert("领取成功")
					}
				}else{
					alert(result.message)
				}
				
				//console.log(result)
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//兑换资产
	var banance2scoreArr;
	function banance2score(userId,token,amount,tradePassword,secretKey,Time){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antBanance/banance2score",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"amount":amount,
				"tradePassword":tradePassword,
				"timestamp":Time,
				"sign":6666,
				"clientType":clientType,
				"language":language,
				"secretKey":secretKey
			},
			success:function(result){
				//console.log(result)
				banance2scoreArr=result.code;
				if(result.code!=1){
					alert(result.message) 
				}else{
					if(hehe!=undefined){
						DAPPFramework.Controller.SendMessage( "HomePageIdentifier", "ToUpdate", "true" );
						DAPPFramework.View.PopView();
//						DAPPFramework.View.Reload();
					}else if(AndroidApp=="Android"){
						ANT.newPage("main.html")
					}else{
						window.location.href="../../index.html"
					}
					if(localStorage.getItem("set-lan")=="EN"){
						alert("Successful")
					}else{
						alert("兑换成功")
					}
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	

//	转账
	function transferAntPerpare(toPnone,toWorldCode,amount,token,userId,memo){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antBanance/transferAntPerpare",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"toPnone":toPnone,
				"toWorldCode":toWorldCode,
				"amount":amount,
				"userId":userId,
				"token":token,
				"clientType":clientType,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"language":language,
				"memo":memo
			},
			success:function(result){
				console.log(result)
				if (result.code==1) {
					if(hehe!=undefined){
						DAPPFramework.SharedBoard.Set("tradeData",JSON.stringify(result))
						DAPPFramework.SharedBoard.Set("tradeId",result.data.tradeId)
						DAPPFramework.View.PushView("src/index/transactionConfirmation.html");
					}else if(AndroidApp=="Android"){
						userId=ANT.setMessage("tradeData",JSON.stringify(result));
						token=ANT.setMessage("tradeId",result.data.tradeId);
						ANT.newPage("src/index/transactionConfirmation.html")
					}else{
						sessionStorage.setItem("tradeData",JSON.stringify(result))
						sessionStorage.setItem("tradeId",result.data.tradeId)
						window.location.href='transactionConfirmation.html';
					}
					
				}else {
					alert(result.message)
				}
				//13758865454
				//13670229298
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	交易确认
	function transferAntCommit(userId,tradeId,tradePassword,token,secretKey,Time){
		var flag;
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antBanance/transferAntCommit",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"tradeId":tradeId,
				"tradePassword":tradePassword,
				"userId":userId,
				"token":token,
				"clientType":clientType,
				"timestamp":Time,
				"sign":6666,
				"language":language,
				"secretKey":secretKey
			},
			success:function(result){
				if (result.code==1) {
					flag=true;
					if(localStorage.getItem("set-lan")=="EN"){
						alert("Success")
					}else{
						alert("转账成功")
					}
					if(hehe!=undefined){						
						DAPPFramework.Controller.SendMessage( "HomePageIdentifier", "ToUpdate", "true" );
					}
				}else{
					flag=false;
					alert(result.message)
				}
//				window.location.href='../../index.html';
				//console.log(result)
			},
			error:function(data){
				flag=false;
				console.log(data)
			}
		})
		return flag;
	}
	
//社区好友
	var getMyIntroduceArr={};
	function getMyIntroduce(userId,pageNum,pageSize,token){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antIntroducer/getMyIntroduce",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"pageNum":pageNum,
				"pageSize":pageSize,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType
			},
			success:function(result){
				//console.log(result)
				getMyIntroduceArr=result;
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//好友详情
	var getInsertPointInfoArr;
	function getInsertPointInfo(userId,insertPoint,token){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antIntroducer/getInsertPointInfo",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"insertPoint":insertPoint,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType
			},
			success:function(result){
				//console.log(result)
				getInsertPointInfoArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//交易详情
	var getAntBananceLogDetailArr={};
	function getAntBananceLogDetail(userId,logId,token){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antBanance/getAntBananceLogDetail",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"logId":logId,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"language":language
			},
			success:function(result){
				//console.log(result)
				getAntBananceLogDetailArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//资产详情-资产
	var getAntLogScoreDetailArr={};
	function getAntLogScoreDetail(userId,logId,token){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antScore/getAntLogScoreDetail",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"logId":logId,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"language":language
			},
			success:function(result){
				//console.log(result)
				getAntLogScoreDetailArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}

//默认分配节点
	function allotNode(userId,notBoundId,token){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antIntroducer/allotNode",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"notBoundId":notBoundId,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType
			},
			success:function(result){
				//console.log(result)
				if(result.code==1){
					if(localStorage.getItem("set-lan")=="EN"){
						alert("Allocation Success")
					}else{	
						alert("分配成功")
					}
					
					if(hehe!=undefined){
						DAPPFramework.View.PushView("src/index/Friends03.html");
						DAPPFramework.SharedBoard.Set("Iid",result.data)
					}else if(AndroidApp=="Android"){
						ANT.newPage("src/index/Friends03.html")
						ANT.setMessage("Iid",result.data)
					}else{
						window.location.href="Friends03.html"
						sessionStorage.setItem("Iid",result.data)
					}
				}else{
					alert(result.message)
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//手动分配节点
	function allotNode01(userId,notBoundId,insertPoint,token){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antIntroducer/allotNode",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"notBoundId":notBoundId,
				"insertPoint":insertPoint,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType
			},
			success:function(result){
				//console.log(result)
				if(result.code!=1){
					alert(result.message) 
				}else{
					alert("分配成功")
					if(hehe!=undefined){
						DAPPFramework.View.PopView();
//						DAPPFramework.View.Reload();
						DAPPFramework.Controller.SendMessage( "fenpei", "allotNodeStart", "true" );
					}else{
						window.location.href="Friends.html"
					}
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}

//修改姓名
	var updateUserInfoArr;
	function updateUserInfo(userId,username,token){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/user/updateUserInfo",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"username":username,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType,
				"language":language
			},
			success:function(result){
				//console.log(result)
				updateUserInfoArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//上传头像第二步
	var updateUserInfo01Arr;
	function updateUserInfo01(userId,token,avatar,username){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/user/updateUserInfo",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"avatar":avatar,
				"username":username,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType
			},
			success:function(result){
				//console.log(result)
				updateUserInfo01Arr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}

//更新头像
	var getUserInfoArr;
	function getUserInfo(userId,token,clientType){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/user/getUserInfo",
			async: false,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":clientType
			},
			success:function(result){
				//console.log(result)
				getUserInfoArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	

//维护
	var serverstateArr;
	function serverstate(){
		$.ajax({
			type:"get",
//			dataType : "json",
			url:"http://"+ip+"/serverstate",
//			async: false,
			success:function(result){
				if(typeof result != "object"){
					result=JSON.parse(result.toString())
				}
				console.log(result)
				if(result.data.state=="running"){
					$(".Maintain").hide()
				}else{
					$(".Maintain").css("display","flex")
					$(".Maintain-Con>span").text("预计时间为："+formatDate(new Date(result.data.openingtime*1000)))
					MainCen=result.data.info.replace(/\n/g,"<br>")
					$(".MaintainAnnouncementText>div").html(MainCen)
				}
				return false
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//拉去订单信息
	var selectOrderDetailArr;
	function selectOrderDetail(userId,token,mall_key,order_no,clientType){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antShopPay/selectOrderDetail",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"user_id":userId,
				"user_token":token,
				"mall_key":mall_key,
				"order_no":order_no,
				"timestamp":new Date().getTime(),
				"reqType":1,
				"clientType":clientType,
				"sign":6666
			},
			async: false,
			success:function(result){
				console.log(result)
				if(result.code == 1){
					selectOrderDetailArr=result;					
				}else{
					alert(result.message)
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//支付
	var payArr;
	function pay(userId,token,mall_key,order_no,clientType,timestamp,secretKey){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antShopPay/pay",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"user_id":userId,
				"user_token":token,
				"mall_key":mall_key,
				"order_no":order_no,
				"timestamp":timestamp,
				"clientType":clientType,
				"sign":6666,
				"reqType":1,
				"secretKey":secretKey,
			},
			success:function(result){
				console.log(result)
				if(result.code==1){
					alert("支付成功")
					try{
						ANT.finishThis()
					}catch(e){
						window.location.href="http://mall.fcsap.com/index.php?route=account/order"
					}
				}else{
					alert(result.message)
					$(".publicPasInput>input").val("");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				console.log(XMLHttpRequest)
				console.log(textStatus)
				console.log(errorThrown)
			}
		})
	}
	
//公告
	var getLatestNoticeArr;
	function getLatestNotice(userId,token){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/notice/getLatestNotice",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language
			},
			async: false,
			success:function(result){
				console.log(result)
				getLatestNoticeArr=result;
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//公告列表
	var getNoticeByTopArr;
	function getNoticeByTop(userId,token,pageNum,clientType,language){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/notice/getNoticeByTop",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"offset":pageNum,
				"limit":10,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language
			},
			async: false,
			success:function(result){
				console.log(result)
				getNoticeByTopArr=result;
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//公告列表
	var getNoticeDetailArr;
	function getNoticeDetail(userId,token,noticeId,clientType,language){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/notice/getNoticeDetail",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"noticeId":noticeId,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language
			},
			async: false,
			success:function(result){
				console.log(result)
				getNoticeDetailArr=result;
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	

//刮彩票
	var scrapeLotteryArr;
	function scrapeLottery(userId,token,clientType,language,tradePassword,md5,Time,secretKey){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/lottery/scrapeLottery",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":Time,
				"clientType":clientType,
				"sign":6666,
				"language":language,
				"tradePassword":tradePassword,
				"md5":md5,
				"secretKey":secretKey
			},
			async: false,
			success:function(result){
				console.log(result)
				scrapeLotteryArr=result
			},
			error:function(data){
				console.log(data)
				alert("验证已过期")
				window.location.href="../login/login.html"
			}
		})
	}
	
//领彩票
	var claimLotteryArr;
	function claimLottery(userId,token,clientType,language,lotteryId){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/lottery/claimLottery",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language,
				"lotteryId":lotteryId 
			},
			async: false,
			success:function(result){
				console.log(result)
				claimLotteryArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//广播
	var getLatstLotteryRecordArr;
	function getLatstLotteryRecord(userId,token,clientType,language){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/lottery/getLatstLotteryRecord",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language
			},
			async: false,
			success:function(result){
				console.log(result)
				getLatstLotteryRecordArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}

//刮刮乐记录
	var getlotteryLogTopArr;
	function getlotteryLogTop(userId,token,clientType,language,pageNum){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/lottery/getlotteryLogTop",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language,
				"offset":pageNum,
				"limit":10
			},
			async: false,
			success:function(result){
				console.log(result)
				getlotteryLogTopArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//刮刮乐状态
	var getLotteryActivityDetailArr;
	function getLotteryActivityDetail(userId,token,clientType,language){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/lottery/getLotteryActivityDetail",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language
			},
			async: false,
			success:function(result){
				console.log(result)
				getLotteryActivityDetailArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//转盘状态
	var getDailActivityDetailArr;
	function getDailActivityDetail(userId,token,clientType,language){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antDial/getDailActivityDetail",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language
			},
			async: false,
			success:function(result){
				console.log(result)
				getDailActivityDetailArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//转盘抽奖
	var dailTwistArr;
	function dailTwist(userId,token,clientType,language){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antDial/dailTwist",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language
			},
			async: false,
			success:function(result){
				console.log(result)
				dailTwistArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//转盘纪录
	var getDailLogTopArr;
	function getDailLogTop(userId,token,clientType,language,offset){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antDial/getDailLogTop",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language,
				"offset":offset,
				"limit":10,
				"personal":"1"
			},
			async: false,
			success:function(result){
				console.log(result)
				getDailLogTopArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//拉取云购列表
	var getActivityListArr;
	function getActivityList(userId,token,clientType,language,pageNum,status){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antYunGouActivity/getActivityList",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"isFinish":status,
				"language":language,
				"offset":pageNum,
				"size":10
			},
			async: false,
			success:function(result){
				console.log(result)
				getActivityListArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//拉取云购详细
	var getActivityDetailArr;
	function getActivityDetail(userId,token,clientType,language,activityId){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antYunGouActivity/getActivityDetail",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"activityId":activityId,
				"language":language,
			},
			async: false,
			success:function(result){
				console.log(result)
				getActivityDetailArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//云购购买
	var buyArr;
	function buy(userId,token,clientType,language,activityId,quantity,tradePassword){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antYunGouAward/buy",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"activityId":activityId,
				"language":language,
				"quantity":quantity,
				"tradePassword":tradePassword
			},
			async: false,
			success:function(result){
				console.log(result)
				buyArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//开奖
	var getClearingResultArr;
	function getClearingResult(userId,token,clientType,language,activityId){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antYunGouAward/getClearingResult",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"activityId":activityId,
				"language":language,
			},
			async: false,
			success:function(result){
				console.log(result)
				getClearingResultArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//开奖
	var getBuyListArr;
	function getBuyList(userId,token,clientType,language,offset){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antYunGouAward/getBuyList",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language,
				"offset":offset,
				"size":10
			},
			async: false,
			success:function(result){
				console.log(result)
				getBuyListArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	var getEnvelopeAreaArr;
	function getEnvelopeArea(clientType,userId,token,language){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antRedEnvelope/getEnvelopeArea",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language
			},
			async: false,
			success:function(result){
				console.log(result)
				getEnvelopeAreaArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	红包配置
	var getEnvelopeConfigInfoArr;
	function getEnvelopeConfigInfo(userId,token,clientType,language,envelopeType){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antRedEnvelope/getEnvelopeConfigInfo",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language,
				"envelopeType":envelopeType
			},
			async: false,
			success:function(result){
				console.log(result)
				getEnvelopeConfigInfoArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}

	//	锦鲤红包
	var sendSingleEnvelopeArr;
	function sendSingleEnvelope(userId,token,clientType,language,accept_phone,accept_wordCode,envelope_type,totoal_score,memo,tradePassword,Time){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antRedEnvelope/sendSingleEnvelope",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":Time,
				"clientType":clientType,
				"sign":6666,
				"language":language,
				"accept_phone":accept_phone,
				"accept_wordCode":accept_wordCode,
				"envelope_type":envelope_type,
				"totoal_score":totoal_score,
				"memo":memo,
				"secretKey":tradePassword
			},
			async: false,
			success:function(result){
				console.log(result)
				sendSingleEnvelopeArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	区域红包
	var sendPeopleQuantityEnvelopeArr;
	function sendPeopleQuantityEnvelope(userId,token,clientType,language,isFixedAmount,quantity,nation,province,city,memo,tradePassword,totoal_score,Time){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antRedEnvelope/sendPeopleQuantityEnvelope",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":Time,
				"clientType":clientType,
				"sign":6666,
				"language":language,
				"isFixedAmount":isFixedAmount,
				"quantity":quantity,
				"nation":nation,
				"province":province,
				"city":city,
				"memo":memo,
				"secretKey":tradePassword,
				"totoal_score":totoal_score
			},
			async: false,
			success:function(result){
				console.log(result)
				sendPeopleQuantityEnvelopeArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	领取区域红包
	var drawPeopleEnvelopeArr;
	function drawPeopleEnvelope(userId,token,clientType,language,longitude,latitude){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antRedEnvelope/drawPeopleEnvelope",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language,
				"longitude":longitude,
				"latitude":latitude
			},
			async: false,
			success:function(result){
				console.log(result)
				drawPeopleEnvelopeArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	区域红包列表
	var getRedEnvelopeRecordListArr;
	function getRedEnvelopeRecordList(userId,token,clientType,language,isSingle,offset){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antRedEnvelope/getRedEnvelopeRecordList",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language,
				"isPrivate":1,
				"isSingle":isSingle,
				"offset":offset,
				"size":10,
			},
			async: false,
			success:function(result){
				console.log(result)
				getRedEnvelopeRecordListArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	单人红包列表
	var geSingleEnvelopeListArr;
	function geSingleEnvelopeList(userId,token,clientType,language,offset,status){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antRedEnvelope/geSingleEnvelopeList",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language,
				"offset":offset,
				"size":10,
				"status":status
			},
			async: false,
			success:function(result){
				console.log(result)
				geSingleEnvelopeListArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	领取单人红包
	var drawSingleEnvelopeArr;
	function drawSingleEnvelope(userId,token,clientType,language,envelopeIds){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antRedEnvelope/drawSingleEnvelope",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"timestamp":new Date().getTime(),
				"clientType":clientType,
				"sign":6666,
				"language":language,
				"envelopeIds":envelopeIds
			},
			async: false,
			success:function(result){
				console.log(result)
				drawSingleEnvelopeArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	创建钱包
	var createWalletArr;
	function createWallet(userId,token,wallet_name,wallet_address,pub_key,keystore,keystore_password){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/wallet/createWallet",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"wallet_name":wallet_name,
				"wallet_address":wallet_address,
				"pub_key":pub_key,
				"keystore":keystore,
				"keystore_password":keystore_password,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":1
			},
			async: false,
			success:function(result){
				console.log(result)
				createWalletArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	私钥登录
	var walletLoginArr;
	function walletLogin(sourceStr,signStr){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/sso/walletLogin",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"sourceStr":sourceStr,
				"signStr":signStr,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":1
			},
			async: false,
			success:function(result){
//				console.log(result)
				walletLoginArr=result
				if(walletLoginArr.code==1){
					DAPPFramework.Storage.Set("userId",walletLoginArr.data.id)
					DAPPFramework.Storage.Set("token",walletLoginArr.data.token)
					DAPPFramework.Storage.Set("phone",walletLoginArr.data.phone)
					DAPPFramework.Storage.Set("worldCode",walletLoginArr.data.worldCode)
					DAPPFramework.Controller.JumpToMainPage()
					DAPPFramework.Controller.SetNextStartPage("Main");
					alert(languageArr["loging2.0_65"])
				}else{
					alert(walletLoginArr.message)
				}
				
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	导入私钥登录
	var walletLoginArr01;
	function walletLogin01(sourceStr,signStr){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/sso/walletLogin",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"sourceStr":sourceStr,
				"signStr":signStr,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":1
			},
			async: false,
			success:function(result){
				console.log(result)
				walletLoginArr01=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	验证是否ant钱包用户
	var checkWalletArr;
	function checkWallet(wallet_address){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/wallet/checkWallet",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"wallet_address":wallet_address,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":2
			},
			async: false,
			success:function(result){
				console.log(result)
				checkWalletArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	众筹列表
	var getZhongChouListArr;
	function getZhongChouList(userId,token,status,offset){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/zhongchou/getZhongChouList",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"status":status,
				"sourceType":1,
				"targetType":2,
				"offset":offset,
				"size":10,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":2
			},
			async: false,
			success:function(result){
				console.log(result)
				getZhongChouListArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	众筹详细
	var getZhongChouDetailArr;
	function getZhongChouDetail(userId,token,itemId,language){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/zhongchou/getZhongChouDetail",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"itemId":itemId,
				"language":language,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":2
			},
			async: false,
			success:function(result){
				console.log(result)
				getZhongChouDetailArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	众筹记录
	var getMyZhongChouBuyRecordArr;
	function getMyZhongChouBuyRecord(userId,token,offset){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/zhongchou/getMyZhongChouBuyRecord",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"offset":offset,
				"size":10,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":2
			},
			async: false,
			success:function(result){
				console.log(result)
				getMyZhongChouBuyRecordArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	释放记录
	var getZhongChouReleaseRecordArr;
	function getZhongChouReleaseRecord(userId,token,offset){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/zhongchou/getZhongChouReleaseRecord",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"offset":offset,
				"size":10,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"clientType":2
			},
			async: false,
			success:function(result){
				console.log(result)
				getZhongChouReleaseRecordArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}

	//	购买众筹
	var buyZhongChouArr;
	function buyZhongChou(userId,token,itemId,amount,tradePassword,Time){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/zhongchou/buyZhongChou",
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"itemId":itemId,
				"amount":amount,
				"secretKey":tradePassword,
				"timestamp":Time,
				"sign":6666,
				"clientType":2
			},
			async: false,
			success:function(result){
				console.log(result)
				buyZhongChouArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	

//	上传私钥
	var uploadPrivateKeyArr;
	function uploadPrivateKey(userId,token,clientType,pub_key){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/wallet/uploadPrivateKey",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"clientType":clientType,
				"pub_key":pub_key,
				"keystore":"",
				"keystore_password":"",
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				uploadPrivateKeyArr=result
				if(result.code==1){
					alert("上传成功")
				}else{
					alert(result.message)
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	获取钱包信息
	var getVirtualWalletArr;
	function getVirtualWallet(userId,token,coinId){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antVirtualWallet/getVirtualWallet",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"coinId":coinId,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				getVirtualWalletArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	获取闪兑汇率列表
	var getFlashConvertRateetArr;
	function getFlashConvertRate(userId,token,offset,type,sourceCoinId,targetCoinId){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antVirtualConvert/getFlashConvertRate",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"offset":offset,
				"size":10,
				"sourceCoinId":sourceCoinId,
				"targetCoinId":2,
				"type":type,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				getFlashConvertRateArr=result
				
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	获取闪兑列表
	var getFlashConvertListArr;
	function getFlashConvertList(userId,token,offset){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antVirtualConvert/getFlashConvertList",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"offset":offset,
				"size":10,
				"sourceCoinId":1,
				"targetCoinId":2,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				getFlashConvertListArr=result
				
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	获取闪兑信息
	var getFlashConvertInfoArr;
	function getFlashConvertInfo(userId,token,convertId){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antVirtualConvert/getFlashConvertInfo",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"convertId":convertId,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				getFlashConvertInfoArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	获取闪兑准备
	var flashConvertPrepareArr;
	function flashConvertPrepare(userId,token,convertAmount){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antVirtualConvert/flashConvertPrepare",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"convertAmount":convertAmount,
				"sourceCoinId":1,
				"targetCoinId":2,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				flashConvertPrepareArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	 闪兑提交 
	var flashConvertArr;
	function flashConvert(userId,token,convertAmount,transactionHash){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antVirtualConvert/flashConvert",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"convertAmount":convertAmount,
				"transactionHash":transactionHash,
				"sourceCoinId":1,
				"targetCoinId":2,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				flashConvertArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	 获取锁仓信息
	var getLockInfoArr;
	function getLockInfo(userId,token,offset){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antVirtualLock/getLockInfo",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"offset":offset,
				"coinId":2,
				"size":10,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				getLockInfoArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	 领取锁仓
	var drawLockWarehouseArr;
	function drawLockWarehouse(userId,token,coinId,lockId,secretKey,Time){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antVirtualLock/drawLockWarehouse",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"coinId":coinId,
				"lockId":lockId,
				"secretKey":secretKey,
				"size":10,
				"clientType":1,
				"timestamp":Time,
				"sign":6666
			},
			success:function(result){
				drawLockWarehouseArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	 检测是否绑定钱包
	var getVirtualAddressArr;
	function getVirtualAddress(userId,token,coinId,type){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/antVirtualWallet/getVirtualAddress",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"coinId":coinId,
				"type":type,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				getVirtualAddressArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	 绑定Ruby钱包地址
	var allotVirtualAddressArr;
	function allotVirtualAddress(userId,token,coinId,isWithdraw,address){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antVirtualWallet/allotVirtualAddress",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"coinId":coinId,
				"isWithdraw":isWithdraw,
				"address":address,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				allotVirtualAddressArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	查询兑换权限
	var queryCashPermissionArr;
	function queryCashPermission(userId,token,coinId){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/cash/queryCashPermission",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"coinId":coinId,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				queryCashPermissionArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	申请兑换权限
	var applyCashPermissionArr;
	function applyCashPermission(userId,token,coinId,hash){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/cash/applyCashPermission",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"coinId":coinId,
				"hash":hash,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				applyCashPermissionArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	 ANT兑换Ruby配置
	var getAntCashConfigureArr;
	function getAntCashConfigure(userId,token,coinId){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/cash/getAntCashConfigure",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"coinId":coinId,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				getAntCashConfigureArr=result
//				console.log(getAntCashConfigureArr)
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	 兑换
	var antCashArr;
	function antCash(userId,token,coinId,amount,secretKey,Time){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/cash/antCash",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"coinId":coinId,
				"amount":amount,
				"secretKey":secretKey,
				"parnterId":1,
				"clientType":1,
				"timestamp":Time,
				"sign":6666
			},
			success:function(result){
				if(result.code==1){
					alert("成功")
					$(".publicPas").css("visibility","hidden")
					$(".publicPas").fadeOut()
					$(".publicPasInput>input").val("")
					
					$(".publicPasInput>input").blur()
					
					$(".exchangeList").empty()
					getFlashConvertListOffset01=0
					shanduiliebiao01(getFlashConvertListOffset01)
					
					if(android!=undefined){
						window.location.href="http://bnt.fuyer.com/wallet/src/Ruby/RubyDetails.html?AntExchange=1&loginType=1&id="+getCashListArr.data[0].id+"&user_id="+userId+"&user_token="+token
					}else{							
						DAPPFramework.View.PushView("wallet/src/Ruby/RubyDetails.html?AntExchange=1&id="+getCashListArr.data[0].id);
					}
				}else{
					alert(result.message)
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	 ANT众筹记录
	var getCashListArr;
	function getCashList(userId,token,coinId,offset){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/cash/getCashList",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"coinId":coinId,
				"offset":offset,
				"size":10,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				getCashListArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	ANT众筹详情
	var getCashInfoArr;
	function getCashInfo(userId,token,cashId){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/cash/getCashInfo",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"cashId":cashId,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				getCashInfoArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	

//	申请商家
	var merchantApplyArr;
	function merchantApply(userId,token){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/merchantApply/merchantApply",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				merchantApplyArr=result
				if(result.code==1){
					alert("申请成功,请等待审核")
					DAPPFramework.Controller.SendMessage( "ShenQing", "ShenQingFun", "true" );
					DAPPFramework.View.PopView();
				}else{
					alert(result.message)
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	查看申请状态
	var queryMerchantApplyStatusArr;
	function queryMerchantApplyStatus(userId,token){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/merchantApply/queryMerchantApplyStatus",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				queryMerchantApplyStatusArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	查询虚拟币支付状态
	function checkVirtualCoinPayStatus(userId,token,mall_key,order_no){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/antShopPay/checkVirtualCoinPayStatus",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"user_id":userId,
				"user_token":token,
				"clientType":1,
				"mall_key":mall_key,
				"order_no":order_no,
				"reqType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				if(result.data==1){
					alert("支付成功")
					try{
						ANT.finishThis()
					}catch(e){
						window.location.href="http://mall.fcsap.com/index.php?route=account/order"
					}
				}else{
					alert("正在确认中,请不要重复支付")
					$(".MallTranType>li:nth-child(2)>span").text("正在确认")
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	

//	生成URL签名
	function generateUrlSignature(userId,token,url){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/sso/generateUrlSignature",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"clientType":1,
				"url":url,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				if(result.code==1){
					if(android=="android"){
						ANT.openApp(result.data.source+"&signture="+result.data.signture)
					}else{
						DAPPFramework.Controller.OpenURL(result.data.source+"&signture="+result.data.signture)
					}
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
//	获取首页banner图
	function getBanners(userId,token){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/sat/getBanners",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"offset":0,
				"size":10
			},
			success:function(result){
				console.log(result)
				console.log(result.data[0].imgurl)
				$(".mui-slider-loop").append('<div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img src="'+result.data[result.data.length-1].imgurl+'" /></a></div>')
				result.data.forEach(function(item){
					$(".mui-slider-loop").append(' <div class="mui-slider-item"><a href="#"><img src="'+item.imgurl+'" /></a></div>')
				})
				$(".mui-slider-loop").append('<div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img src="'+result.data[0].imgurl+'" /></a></div>')
				var gallery = mui('.mui-slider');
					gallery.slider({
					  interval:5000
					});
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	拉取认购配置
	var getAntSubscribeConfigureArr;
	function getAntSubscribeConfigure(userId,token,sourceCoinId){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/subscribe/getAntSubscribeConfigure",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"sourceCoinId":sourceCoinId,
				"targetCoinId":5,
			},
			success:function(result){
				getAntSubscribeConfigureArr=result
				console.log(result)
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	认购
	function antSubscribe(userId,token,targetAmount,secretKey,Time,sourceCoinId){
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://"+ip+"/subscribe/antSubscribe",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"clientType":1,
				"timestamp":Time,
				"sign":6666,
				"targetAmount":targetAmount,
				"secretKey":secretKey,
				"sourceCoinId":sourceCoinId,
				"targetCoinId":5
				
			},
			success:function(result){
				console.log(result)
				if(result.code==1){
					alert(languageArr["SFA"])
					$(".publicPas").css("visibility","hidden")
					$(".publicPas").fadeOut()
					$(".publicPasInput>input").val("")
					
					$(".publicPasInput>input").blur()
					$(".RedemptionBox02>input").blur()
					
					$(".exchangeList").empty()
					getFlashConvertListOffset02=0
					shanduiliebiao02(getFlashConvertListOffset02)
					
					getAntSubscribeConfigure(userId, token , sourceCoinId)
					$('.RedemptionBox03 .Available').text('本轮剩余兑换量: '+Math.round(Number(getAntSubscribeConfigureArr.data.surplus_subscribe_limit))+'WBC');
//					
//					if(android!=undefined){
//						window.location.href="http://bnt.fuyer.com/wallet/src/Ruby/RubyDetails.html?AntExchange=1&loginType=1&id="+getCashListArr.data[0].id+"&user_id="+userId+"&user_token="+token
//					}else{							
//						DAPPFramework.View.PushView("wallet/src/Ruby/RubyDetails.html?AntExchange=1&id="+getCashListArr.data[0].id);
//					}
				}else{
					alert(result.message)
				}
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	
	//	 认购列表
	var getSubscribeListArr;
	function getSubscribeList(userId,token,offset){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/subscribe/getSubscribeList",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"offset":offset,
				"size":10,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666,
				"targetCoinId":5
			},
			success:function(result){
				getSubscribeListArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	//	 认购详情
	var getSubscribeInfoArr;
	function getSubscribeInfo(userId,token,subscribeId){
		$.ajax({
			type:"get",
			dataType : "json",
			url:"http://"+ip+"/subscribe/getSubscribeInfo",
			async: false,
			crossDomain: true,
			xhrFields:{
			    withCredentials:true
			},
			data:{
				"userId":userId,
				"token":token,
				"coinId":5,
				"subscribeId":subscribeId,
				"clientType":1,
				"timestamp":new Date().getTime(),
				"sign":6666
			},
			success:function(result){
				getSubscribeInfoArr=result
			},
			error:function(data){
				console.log(data)
			}
		})
	}
	
	