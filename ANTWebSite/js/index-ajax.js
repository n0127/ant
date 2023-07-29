$(document).ready(function() {
	var html = document.documentElement;
	var htmlWidth = html.getBoundingClientRect().width;
	$("html").css("font-size", htmlWidth / 20);

	function is_weixn() {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == "micromessenger") {
			$(".vx").css("display", "flex");
			$(".logo").css("padding-top", "0")
		} else {
			$(".vx").css("display", "none");
			$(".logo").css("padding-top", "padding-top: 2.314814rem")
		}
	}
	is_weixn();

	function formatDate(now) {
		var year = now.getFullYear(),
			month = now.getMonth() + 1,
			date = now.getDate(),
			hour = now.getHours(),
			minute = now.getMinutes(),
			second = now.getSeconds();
		return year + "年" + month + "月" + date + "日"
	}
	
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isAndroid) {
		$.ajax({
			type: "get",
			dataType: "jsonp",
			url: "http://bmobileapi.fuyer.com/sat/getVersion",
			data: {
				"model": "0"
			},
			success: function(result) {
				console.log(result);
				$(".Edition").text("版本：" + result.data.versionNumber);
				$(".size").text("大小：" + result.data.packetSize + result.data.sizeUnit);
				$(".button>a").attr("href", result.data.versionUrl);
				var time01 = result.data.createTime;
				var time = formatDate(new Date(time01 * 1000));
				$(".Update-time").text("更新时间：" + time);
				var txts = result.data.releaseNotes;
				txts = txts.replace(/\\n/g, "<br>");
				$(".xiazaiUl").html("<li>" + txts + "</li>");
				$(".dow001").attr("href", result.data.versionUrl)
			},
			error: function(data) {
				console.log(data)
			}
		})
	}else if (isiOS) {
		$.ajax({
			type: "get",
			dataType: "jsonp",
			url: "http://bmobileapi.fuyer.com/sat/getVersion",
			data: {
				"model": "1"
			},
			success: function(result) {
				console.log(result);
				$(".Edition").text("版本：" + result.data.versionNumber);
				$(".size").text("大小：" + result.data.packetSize + result.data.sizeUnit);
				$(".button>a").attr("href", result.data.versionUrl);
				var time01 = result.data.createTime;
				var time = formatDate(new Date(time01 * 1000));
				$(".Update-time").text("更新时间：" + time);
				var txts = result.data.releaseNotes;
				txts = txts.replace(/\\n/g, "<br>");
				$(".xiazaiUl").html("<li>" + txts + "</li>");
				$(".dow001").attr("href", result.data.versionUrl)
			},
			error: function(data) {
				console.log(data)
			}
		})
		$('.ant>img').attr('src','../img/iphone.png');
		$('.ant>img').css({'width':'1.1rem'});
	}
});
