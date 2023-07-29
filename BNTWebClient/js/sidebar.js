	
	$(".anquanzhongxin04").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/sidebar/modifyLoginPass.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/sidebar/modifyLoginPass.html")
		}else{
			window.location.href="modifyLoginPass.html";
		}
	})
	$(".anquanzhongxin05").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/sidebar/modifyPaymentPass.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/sidebar/modifyPaymentPass.html")
		}else{
			window.location.href="modifyPaymentPass.html";
		}
	})
	$(".anquanzhongxin06").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/sidebar/modifyPhone.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/sidebar/modifyPhone.html")
		}else{
			window.location.href="modifyPhone.html";
		}
	})
	$(".anquanzhongxin07").on("tap",function(){
		if(hehe!=undefined){
			DAPPFramework.View.PushView("src/sidebar/retrievePaymentPass.html");
		}else if(AndroidApp=="Android"){
			ANT.newPage("src/sidebar/retrievePaymentPass.html")
		}else{
			window.location.href="retrievePaymentPass.html";
		}
	})
	function DAPPFrameworkEngineReady(){
		DAPPFramework.View.SetNavgationLeftItem("phone/return@3x.png", "leftItemClick");
		DAPPFramework.View.SetScrollEnabled(false);
	}
	function leftItemClick(){
		DAPPFramework.View.DismissView();
	}
	//返回上一页
//	$(".return").on("tap",function(){
//		history.back()
//	})