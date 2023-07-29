function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2])
	}
	return null
}
var DappEngineInited = false;
var hehe = GetQueryString("DAPPEngine");
var Mall_Login;
var ANT = {
	PaymentOrder: function(order_no, mall_key) {
		try {
			jumpSubpage("http://ipfs.fuyer.com/ipns/Qma5JwPPYmHEGSdxwvF8dQDrFxe4z2uHUSBZB4WAdv5Crc/src/Mall/TransactionPayment.html?order_no=" + order_no + "&mall_key=" + mall_key + "&type=1")
//			ANTAndroid.PaymentOrder(order_no, mall_key)
		} catch(e) {
			window.location.href = "http://ipfs.fuyer.com/ipns/Qma5JwPPYmHEGSdxwvF8dQDrFxe4z2uHUSBZB4WAdv5Crc/src/Mall/TransactionPayment.html?order_no=" + order_no + "&mall_key=" + mall_key
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
				url: "http://mobileapi.fuyer.com/antShopUser/checkTokenFromThirdParty",
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
	},
	login: function(phone, loginPassword, worldCode) {
		$.ajax({
			type: "post",
			dataType: "json",
			url: "http://mobileapi.fuyer.com/sso/login",
			async: false,
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			data: {
				"phone": phone,
				"loginPassword": loginPassword,
				"clientType": 10,
				"worldCode": worldCode,
				"timestamp": new Date().getTime()
			},
			success: function(result) {
				if(result.code == 1) {
					Mall_Login = result
				} else {
					alert(result.message)
				}
			},
			error: function(data) {
				console.log(data)
			}
		})
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
