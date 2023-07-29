	var title = $('title').text();
	var android=GetQueryString("loginType");
	
	function DAPPFrameworkEngineReady(){
		DAPPFramework.View.SetScrollEnabled(false);
		PrivateKeyJosn=JSON.parse(DAPPFramework.Storage.Get("PrivateKeyJosn"));	
		id666=DAPPFramework.Storage.Get("VurrentValue");
		userId=DAPPFramework.Storage.Get("userId");
		token=DAPPFramework.Storage.Get("token");
//		$(".withdraw-address,.Contracted-object").css("margin","1rem auto 0")
//		$(".detail-nav").css("top","0")
//		$(".firstUl").css("margin-top","2rem")
		Ruby();
	}
	
	if(android!=undefined){
		userId=GetQueryString("user_id");
		token=GetQueryString("user_token");
		Ruby()
	}
	
	function Ruby(){
		if(title == '合约挖矿(Ruby)'){
			getVirtualWallet(userId,token,2)
			if(getVirtualWalletArr.data!=undefined){				
				$(".tokenBalance").text(getVirtualWalletArr.data[0].balance.toFixed(8))
				$(".lockBalance").text(getVirtualWalletArr.data[0].freezeBalance.toFixed(8))
			}else{
				var yuer=0;
				$(".tokenBalance").text(yuer.toFixed(8))
				$(".lockBalance").text(yuer.toFixed(8))
			}
			
			
			mui.init({
		  pullRefresh : {
		    container:"#refreshContainer",
		    down : {
		      contentdown : "下拉可以刷新",
		      contentover : "释放立即刷新",
		      contentrefresh : "正在刷新...",
		      callback : function () {
		  		setTimeout(function(){
			      	getVirtualWallet(userId,token,2)
					if(getVirtualWalletArr.data!=undefined){				
						$(".tokenBalance").text(getVirtualWalletArr.data[0].balance.toFixed(8))
						$(".lockBalance").text(getVirtualWalletArr.data[0].freezeBalance.toFixed(8))
					}else{
						var yuer=0;
						$(".tokenBalance").text(yuer.toFixed(8))
						$(".lockBalance").text(yuer.toFixed(8))
					}
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh(true);
		  		},1000)
		      }
		    }
		  }
		});
			
			$(".RubyContractMiningPush01").on("tap",function(){
				if(android!=undefined){
					window.location.href="RubyDownload.html?loginType=1&user_id="+userId+"&user_token="+token
				}else{							
					DAPPFramework.View.PushFullView("wallet/src/Ruby/RubyDownload.html");
				}
			})
			
			$(".RubyContractMiningPush02").on("tap",function(){
				if(android!=undefined){
					window.location.href="RubyDownload.html?loginType=1&user_id="+userId+"&user_token="+token
				}else{							
					DAPPFramework.View.PushFullView("wallet/src/Ruby/RubyDownload.html");
				}
			})
			
			$(".RubyContractMiningPush03").on("tap",function(){
				if(android!=undefined){
					window.location.href="exchange.html?loginType=1&user_id="+userId+"&user_token="+token
				}else{							
					DAPPFramework.View.PushView("wallet/src/Ruby/exchange.html");
				}
			})
			
			$(".RubyContractMiningPush04").on("tap",function(){
				if(android!=undefined){
					window.location.href="../detail.html?loginType=1&user_id="+userId+"&user_token="+token
				}else{							
					DAPPFramework.View.PushView("wallet/src/detail.html");
				}
			})
			
			$(".RubyContractMiningPush05").on("tap",function(){
				if(android!=undefined){
					window.location.href="MyContract.html?loginType=1&user_id="+userId+"&user_token="+token
				}else{							
					DAPPFramework.View.PushView("wallet/src/Ruby/MyContract.html");
				}
			})
			
			$(".RubyContractMiningPush06").on("tap",function(){
				if(android!=undefined){
					window.location.href="RubyIndex.html?loginType=1&status=1&user_id="+userId+"&user_token="+token
				}else{							
					DAPPFramework.View.PushView("wallet/src/Ruby/RubyIndex.html?status=1");
				}
			})
			
			$(".RubyContractMiningPush07").on("tap",function(){
				if(android!=undefined){
					window.location.href="RubyIndex.html?loginType=1&status=2&user_id="+userId+"&user_token="+token
				}else{							
					DAPPFramework.View.PushView("wallet/src/Ruby/RubyIndex.html?status=2");
				}
			})
			
			$(".RubyContractMiningPush08").on("tap",function(){
				if(android!=undefined){
					window.location.href="RubyIndex.html?loginType=1&status=3&user_id="+userId+"&user_token="+token
				}else{							
					DAPPFramework.View.PushView("wallet/src/Ruby/RubyIndex.html?status=3");
				}
			})
			
			$(".RubyContractMiningPush09").on("tap",function(){
				if(android!=undefined){
					window.location.href="exchange01.html?loginType=1&status=3&user_id="+userId+"&user_token="+token
				}else{							
					DAPPFramework.View.PushView("wallet/src/Ruby/exchange01.html");
				}
			})
			
		}
	}
