function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2])
	}
	return null
}
const url = "bnt.yfsz.top";
const href = "http://bnt.fuyer.com/src/Mall/TransactionPayment.html"
var DappEngineInited = false;
var ANT = {
	PaymentOrder: function(order_no, mall_key) {
		try {
			ANTAndroid.PaymentOrder(order_no, mall_key)
		} catch(e) {
			window.location.href = href+"?order_no=" + order_no + "&mall_key=" + mall_key
		}
	},
	VerifyUser: function(user_id, user_token, mall_key) {
		try {
			if(!ANTAndroid.VerifyUser(user_id, user_token)) {
				ANTAndroid.JumpLogin()
			}
		} catch(e) {
			$.ajax({
				type: "post",
				dataType: "json",
				url: "http://"+url+"/antShopUser/checkTokenFromThirdParty",
				async: false,
				data: {
					"user_id": user_id,
					"user_token": user_token,
					"mall_key": mall_key,
					"timestamp": new Date().getTime(),
					"reqType": 1,
					"sign": 6666
				},
				success: function(result) {
					console.log(result)
					if(result.code != 1) {
						alert("用户过期");
//						window.location.href = "http://fcsap.com/src/login/login.html"
					}
				},
				error: function(data) {
					alert("用户过期");
//					window.location.href = "http://fcsap.com/src/login/login.html"
				}
			})
		}
	}
};

function GetPlatform() {
	var userAgentInfo = navigator.userAgent;
	if(userAgentInfo.match("AntDapp") == "AntDapp") {
		return "Dapp"
	}
}

function BackToAntApp() {
	if(GetPlatform() == "Dapp") {
		try {
			ANTAndroid.jumpHome()
		} catch(e) {
			DAPPFramework.View.PopView()
		}
	}
}

function DAPPFrameworkEngineReady() {
	DappEngineInited = true;
	DAPPFramework.View.SetIdentifier("SuccessfulTrade")
}
