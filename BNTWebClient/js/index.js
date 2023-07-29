//	截取url
	function GetQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
	}

//	rem布局
	var html=document.documentElement;
	var htmlWidth=html.getBoundingClientRect().width
	$("html").css("font-size",htmlWidth/20);

//	判断是app还是浏览器
	var hehe=GetQueryString("DAPPEngine")
	var AndroidApp=GetQueryString("registerType")
	
	var userId;
	var token;
	var img;
	var clientType;
	var language;
	
	if(localStorage.getItem("set-lan")=="EN"){
		language="en"
		$(".hongbao>img:nth-child(3)").attr("src","img/hongbao03En.png")
		$(".hongbao>img:nth-child(1)").attr("src","img/hongbao01En.png")
	}else{
		language="cn"
	}
	
//Dapp
	function DAPPFrameworkEngineReady(){
		DAPPFramework.View.SetHideHarline(true);
		DAPPFramework.View.SetDrawerEnable(false);

		userId=DAPPFramework.Storage.Get("userId")
		token=DAPPFramework.Storage.Get("token")
		img=DAPPFramework.SharedBoard.Get("img")
		clientType=1;
		DAPPFramework.View.SetNavgationRightItem("phone/lingdang@3x.png", "RightDisplay");
//		DAPPFramework.View.SetNavgationLeftItem("phone/hanbao@3x.png", "Display");

		getBanners(userId,token)
		RequestList()
		DAPPFramework.View.SetIdentifier( "HomePageIdentifier" );
		
		DAPPFramework.Controller.RefreshDrawer();
		
		console.log(userId,token)
	}
	
	function ActionSheetCallBackFunc(item){
		if(item=="扫码转账" || item=="Scan to transfer"){
			DAPPFramework.Camera.Scanning("ScanningCallBackFunc");
		}else if(item=="直接转账" || item == "Direct transfer"){
			DAPPFramework.View.PushView("src/index/transaction-box.html");
		}
	}
	function RightDisplay(){
		$(".Notice-con").css("top","3.555555rem")
//		$(".Notice").show()
		DAPPFramework.View.PushView("src/index/Notice.html");
	}
	$(".Notice").on("tap",function(){
		$(this).hide()
	})
	function Display(){
		DAPPFramework.View.DisplayDrawer();
	}
	
	function RequestList(){
		indexData(userId,token,clientType)
		if(indexziliao.data.envelopeCount!="0"){
			$(".redDian").css("display","block")
		}else{
			$(".redDian").hide()
		}
		//公告
		if(hehe!=undefined){
			getLatestNotice(userId,token)
			if(getLatestNoticeArr.data.content==undefined){
//				$(".lingdang").hide()
			}else{
//				$(".lingdang").show()
				if(DAPPFramework.Storage.Get("NoticeTime")){
					if(DAPPFramework.Storage.Get("NoticeTime")!=getLatestNoticeArr.data.createTime){
						DAPPFramework.Storage.Set("NoticeTime",getLatestNoticeArr.data.createTime)
//						$(".Notice-con").css("top","3.555555rem")
						$(".Notice").css("display","flex")
					}
				}else{
					DAPPFramework.Storage.Set("NoticeTime",getLatestNoticeArr.data.createTime)
					$(".Notice").css("display","flex")
				}
				lingdang666()
			}
		}else{
			getLatestNotice(userId,token)
			if(getLatestNoticeArr.data.content==undefined){
			}else{
				if(localStorage.getItem("NoticeTime")){
					if(localStorage.getItem("NoticeTime")!=getLatestNoticeArr.data.createTime){
						localStorage.setItem("NoticeTime",getLatestNoticeArr.data.createTime)
						$(".Notice").css("display","flex")
					}
				}else{
					localStorage.setItem("NoticeTime",getLatestNoticeArr.data.createTime)
					$(".Notice").css("display","flex")
				}
				lingdang666()
			}
				
		}
		
			
		
		getEveryDayRedPacket(userId,token,clientType)
		if(RedPacket.code==1){
//			$(".redDian").css("display","block")
//			$(".hongbaodian").on("tap",function(){
				$(".hongbao").css("display","flex")
				$(".hongbaoText").text(RedPacket.data.un_claim_amount)
//			})
			$(".hongbao>img:nth-child(1)").on("tap",function(){
				$(this).css("animation","zhuan 0.5s linear")
				var This=$(this)
				var huan=setTimeout(function(){
					This.css("display","none")
					$(".hongbao>img:nth-child(2)").css("display","block")
				},500)
				var huan01=setTimeout(function(){
					$(".hongbao>img:nth-child(2)").css("display","none")
					$(".hongbao>img:nth-child(3)").css("display","block")
					$(".hongbaoText").css("display","block")
				},1000)
			})
			$(".hongbao>img:nth-child(3)").on("tap",function(){
				claimEveryDayRedPacket(userId,token,RedPacket.data.id)
				$(".hongbao").css("display","none")
				$(".hongbaoText").css("display","none")
				$(".redDian").css("display","none")
				$(".hongbao>img:nth-child(1)").removeAttr("style")
				$(".hongbao>img:nth-child(1)").show().siblings().hide()
			})
		}else{
			
		}
		var user_ant=Math.floor(indexziliao.data.user_ant)
		var user_score=Math.floor(indexziliao.data.user_score)
		$(".user_ant").text(user_ant)
		$(".user_score").text(user_score)
	}
	$(".hongbaodian").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushFullView("src/index/RegionalRedEnvelope.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/RegionalRedEnvelope.html")
		}else{
			window.location.href="src/index/RegionalRedEnvelope.html"
		}
//		if(hehe!=undefined){
//			DAPPFramework.View.PushView("src/index/RedEnvelopeRecord.html?RedEnvelope=1");
//		}else{
//			window.location.href="src/index/RedEnvelopeRecord.html?RedEnvelope=1"
//		}
	})
	//公告
	function lingdang666(){
		$(".Notice-con>p").text(getLatestNoticeArr.data.title)
		var NoticeContent=getLatestNoticeArr.data.content
		NoticeContent=NoticeContent.replace(/\\n/g,"<br>");
		$(".Notice-con>div>div>div").html(NoticeContent)
	}
	
	if(AndroidApp=="Android"){
		$(".mui-bar-nav ~ .mui-content").css("margin-top","0")
		$(".header").css("display","none")
		$(".bottom-nav").css("display","none")
		$(".mui-off-canvas-wrap").removeClass("mui-draggable")
		$(".mui-scroll").css("padding-bottom","0")
	}
	
	if( hehe!=undefined) {
		$(".mui-bar-nav ~ .mui-content").css("margin-top","0")
		$(".header").css("display","none")
		$(".bottom-nav").css("display","none")
		$(".mui-off-canvas-wrap").removeClass("mui-draggable")
		$(".mui-scroll").css("padding-bottom","0")
		$(".transaction").on("tap",function(){
			if(localStorage.getItem("set-lan")=="EN"){
				DAPPFramework.Dialog.ActionSheet("","Choose transfer method",["Scan to transfer","Direct transfer","Cancel"],[0,0,2],"ActionSheetCallBackFunc")
			}else{
				DAPPFramework.Dialog.ActionSheet("","请选择转账方式",["扫码转账","直接转账","取消"],[0,0,2],"ActionSheetCallBackFunc")
			}
		})
	}else if(AndroidApp=="Android"){
		userId=ANT.getMessage("userId");
		token=ANT.getMessage("token");
		phone=ANT.getMessage("phone");
		clientType=1;
		RequestList()
	}else{
//		userId=sessionStorage.getItem("userId")
//		token=sessionStorage.getItem("token")
//		img=sessionStorage.getItem("img")
//		clientType=2;
//		RequestList()
//		
//		getUserInfo(userId,token,clientType)
//		
//		if(Number(indexziliao.data.isVip)){
//			$(".tou-img>img:nth-child(1)").css("border","2px solid #dcbe6f")
//			$(".tou-img>img:nth-child(2)").show()
//			$(".tou-text>div>div>span:nth-child(1)").css("display","inline-block")
//		}
//		
//		if(Number(indexziliao.data.isMerchant)){
//			$(".tou-text>div>div>span:nth-child(2)").css("display","inline-block")
//			$(".tou-text>div>div>span:nth-child(2)").text("Lv"+indexziliao.data.isMerchant)
//		}else{
//			$(".tou-text>div>div>span:nth-child(2)").css("display","none")
//		}
//
//
//		$(".user_name").val(getUserInfoArr.data.username)
//		$(".userId").text(getUserInfoArr.data.id)
//		$(".phone").text(getUserInfoArr.data.phone)
//		if(getUserInfoArr.data.avatar!=null){
//			$(".touxiang-img").attr("src",getUserInfoArr.data.avatar)
//		}

	}
	
	function ToUpdate(item){
		if(item=='true'){
			RequestList()
		}
	}
	


// 	监听tap事件，解决 a标签 不能跳转页面问题
	mui('body').on('tap','a',function(){document.location.href=this.href;});

	
// 汉堡菜单
	$("#cehualan,.mui-title").on("tap",function(){
		mui('.mui-off-canvas-wrap').offCanvas('show');
	})
	

//	mui滚动/自动轮播
	mui('.mui-scroll-wrapper').scroll({
		 scrollY: true, //是否竖向滚动
		 scrollX: false, //是否横向滚动
		 startX: 0, //初始化时滚动至x
		 startY: 0, //初始化时滚动至y
		 indicators: false, //是否显示滚动条
		 deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
		 bounce: false //是否启用回弹
	});
	
	
//	下拉刷新
	if(localStorage.getItem("set-lan")=="EN"){
		mui.init({
		  pullRefresh : {
		    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		    down : {
		      	callback :yi, //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		      	contentinit: 'Pull down to refresh',
                contentdown: 'Pull down to refresh',
                contentover: 'Release immediate refresh',
                contentrefresh: 'Refreshing...'
		    }
		  }
		});
	}else{
		mui.init({
		  pullRefresh : {
		    container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		    down : {
		      	callback :yi //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		    }
		  }
		});
	}
		
	
	function yi() {
	    setTimeout(function() {
	    	//业务逻辑代码，比如通过ajax从服务器获取新数据；
			RequestList()
 			//注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
	     	//没有更多内容了，endPulldown 传入true， 不再执行下拉刷新
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
		}, 1000);
	}
	

		
	


//	退出登录
	$(".removelogin").on("tap",function(){
		if(localStorage.getItem("set-lan")=="EN"){
			mui.confirm('','Whether to log out',['Cancel','Confirm'],removeLogin,'div')  
		}else{
			mui.confirm('','是否退出登录',['取消','确认'],removeLogin,'div') 
		} 
	})
	function removeLogin(item){
		if(item.index){
			window.location.href="src/login/login.html"
			sessionStorage.clear();
		}
	}
//	暂未开放
	$(".weikaifang").on("tap",function(){
		if(localStorage.getItem("set-lan")=="EN"){
			alert('Not yet open,under construction') 
		}else{
			alert('暂未开放,正在建设中') 
		} 
	})
	
	
//	pos/Dpos/节点
	$(".pos").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/posProfit.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/posProfit.html")
		}else{
			window.location="src/index/posProfit.html"
		}
	})
	$(".Dpos").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/DposProfit.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/DposProfit.html")
		}else{
			window.location="src/index/DposProfit.html"
		}
	})
	$(".node").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/myNode.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/myNode.html")
		}else{
			window.location="src/index/myNode.html"
		}
	})
	
//合约呱呱
	$(".heyue").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/Game.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/Game.html")
		}else{
			window.location="src/index/Game.html"
		}
	})
	
//	转账
	$(".transaction").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/transaction-box.html");
		}else if(AndroidApp=="Android"){
			ANT.showPopoutOneType("选择转账方式","扫码转账","直接转账")
//			ANT.newPage("src/index/transaction-box.html")
		}else{
			window.location="src/index/transaction-box.html"
			sessionStorage.setItem("user_ant",indexziliao.data.user_ant)
		}
	})
	
	function oneType(item){
		if(item=="扫码转账"){
			ANT.openScanCode()
		}else{
			ANT.newPage("src/index/transaction-box.html")
		}
	}

	function ScanningCallBackFunc(result){
		DAPPFramework.View.PushView("src/index/transaction-box.html?ReceivablesStart=1");
		DAPPFramework.SharedBoard.Set("toPhone",result)
	}
		
//收付款
	$(".saoyisao").on("tap",function(){
		if(hehe!=undefined){			
			DAPPFramework.View.PushView("src/index/Receivables.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/Receivables.html")
		}else{
			window.location.href="src/index/Receivables.html"
		}
	})
	
//资产详情
	$(".zichanxiangqing").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/AssetDetails.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/AssetDetails.html")
		}else{
			window.location.href="src/index/AssetDetails.html"
		}
	})

	
//兑换资产
	$(".duihuanzichan").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/forAssets.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/forAssets.html")
		}else{
			window.location.href="src/index/forAssets.html"
		}
	})
	
//	接点
	$(".Friends01-a").on("tap",function(){
		$(".Friends01").css("display","none")
	})
	
	$(".Friends-scroll>ul>li").on("tap",function(){
		$(".Friends01").css("display","flex")
	})
	
//邀请卡
	$(".yaoqingka").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/sidebar/sidebar.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/sidebar/sidebar.html")
		}else{
			window.location.href="src/sidebar/sidebar.html"
		}
	})
	
//社区好友
	$(".jihuohaoyou").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/Friends.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/Friends.html")
		}else{
			window.location.href="src/index/Friends.html"
		}
	})
	
//安全中心
	$(".anquanzhongxin").on("tap",function(){
		window.location="src/sidebar/SecurityCenter.html";
	})
	
//大转盘
	$(".dazhuanpan").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/WelfareDraw.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/WelfareDraw.html")
		}else{
			window.location.href="src/index/WelfareDraw.html"
		}
	})

	
//关于我们
	$(".AboutUs").on("tap",function(){
		$(".cebian-AboutUs").css("display","block")
	})
	
//蚂蚁云购
	$(".yungou").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/CloudPurchase.html");
		}else{
			window.location.href="src/index/CloudPurchase.html"
		}
	})
	
//商城
	$(".GetMall").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushFullView("src/Mall/OthersMall.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("http://malldev.fcsap.com?canGoBack=true&user_id="+userId+"&user_token="+falseToken+"&mall_key="+mall_key)
		}else{
			window.location.href="http://malldev.fcsap.com?user_id="+userId+"&user_token="+falseToken+"&mall_key="+mall_key
		}
	})
	
	
//	修改名字
	$(".xiugainame").on("tap",function(){
		if(localStorage.getItem("set-lan")=="EN"){
			mui.prompt('','Enter nickname','Modify nickname',['Cancel','Confirm'],UpUserName,'div') 
		}else{
			mui.prompt('','输入昵称','修改昵称',['取消','确认'],UpUserName,'div') 
		}
	})
	function UpUserName(item){
		if(item.index){
			var value=item.value
			updateUserInfo(userId,value,token)
			if(updateUserInfoArr.code==1){
				if(localStorage.getItem("set-lan")=="EN"){
					alert("Successful")
				}else{
					alert("修改成功")
				}
				$(".user_name").val(value)
			}else{
				alert(updateUserInfoArr.message)
			}
		}
	}
	
//联系客服
	$(".lianxikefu").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/CustomerService.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/CustomerService.html")
		}else{
			window.location.href="src/index/CustomerService.html"
		}
	})
	
//公告
	$(".lingdang").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/Notice.html");
		}else{
			window.location.href="src/index/Notice.html"
		}
	})
	
//banner转盘
	$(".zhuanpan").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/WelfareDraw.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/WelfareDraw.html")
		}else{
			window.location.href="src/index/WelfareDraw.html"
		}
	})
	
//商户收款码
	$(".shanghushoukuanma").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/index/Merchant.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/index/Merchant.html")
		}else{
			window.location.href="src/index/Merchant.html"
		}
	})
	
//首页众筹
	$(".indexzhongchou").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("wallet/src/Ruby/exchange.html");
		}else{
			window.location.href="src/wallet/src/Ruby/exchange.html"
		}
	})
	
//首页闪兑
	$(".shandui").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("wallet/src/Ruby/exchange01.html");
		}else{
			window.location.href="wallet/src/Ruby/exchange01.html"
		}
	})
	
//锦鲤红包
//	$(".RedEnvelopeEntrance").on("tap",function(){
//		if(hehe!=undefined){
//			DAPPFramework.View.PushFullView("src/index/RegionalRedEnvelope.html");
//		}else if(AndroidApp=="Android"){
//			ANT.newPage("src/index/RegionalRedEnvelope.html")
//		}else{
//			window.location.href="src/index/RegionalRedEnvelope.html"
//		}
//	})
	

//上传头像
	$(".touxiang-file").on("change",function(){
		var file=this.files[0];
		if(!/image\/\w+/.test(file.type)){ 
	        alert("请确保文件为图像类型"); 
	        return false; 
        }
		var fileDate=new FormData();
		fileDate.append("userId",userId)
		fileDate.append("token",token)
		fileDate.append("avatar",file)
		fileDate.append("timestamp",new Date().getTime())
		fileDate.append("sign",6666)
		fileDate.append("clientType",clientType)
		$.ajax({
			type:"post",
			dataType : "json",
			url:"http://bnt.yfsz.top/user/doUploadAvatar",
			async: false,
			data:fileDate,
			cache:false,         //不设置缓存
		  	processData:false,  // 不处理数据
		  	contentType:false,  // 不设置内容类型
			success:function(result){
				console.log(result)
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
				console.log(data)
			}
		})
	})
	
