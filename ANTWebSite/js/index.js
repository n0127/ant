$(document).ready(function() {
	var headerBanner = document.querySelector(".header-banner");
	headerBanner.style.height = document.documentElement.clientHeight + "px";
	var header = document.querySelector(".header");
	var hanbaonav = document.querySelector(".hanbao-nav");
	header.style.height = document.documentElement.clientHeight + "px";
	var html = document.documentElement;
	var htmlWidth = html.getBoundingClientRect().width;
	var keshiWidth = 1920;
	$(".app-box").css("font-size", htmlWidth / 20);
	$("#a1,#a2,#a3,#a4,#a6,#a8,.headerButton,#a6,#b2,#b3,#b4,#b7,#top").click(function() {
		if(location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $("[name=" + this.hash.slice(1) + "]");
			if($target.length) {
				var targetOffset = $target.offset().top;
				$("html,body").animate({
					scrollTop: targetOffset - 100
				}, 800);
				return false
			}
		}
	});
	$(".advantage-but01>li").click(function() {
		var index = $(this).index();
		$(".advantage-text").eq(index).css("display", "block").siblings().css("display", "none");
		$(this).children(".advantage01").css("display", "block").parent().siblings().children(".advantage01").css("display", "none")
	});
	$(window).resize(function() {
		var keshiWidth = $(window).width();
		if(keshiWidth >= 1080) {
			$(".phone-nav").addClass("forceNone");
			$(".fixed-phoneNav").addClass("forceNone")
		}
		if(keshiWidth <= 1080) {
			$(".phone-nav").removeClass("forceNone");
			$(".fixed-phoneNav").removeClass("forceNone")
		}
	});
	$(window).scroll(function() {
		var scrollPos = $(window).scrollTop();
		if(scrollPos >= 100) {
			$(".header-nav").css("position", "fixed");
			$(".header-nav").css("background", "#1d2d35");
			$(".header-nav").css("z-index", "10000");
			$(".header-nav").css("width", "100%");
			$('#top').show()
		}
		if(scrollPos <= 100) {
			$(".header-nav").css("position", "absolute");
			$(".header-nav").css("background", "transparent");
			$(".header-nav").css("width", "1200px");
			$('#top').hide()
		}
		var onTop = $(".on").offset().top - 100;
		var appTop = $("#app").offset().top - 150;
//		var YLBTop = $("#YLB").offset().top - 150;
		var contactTop = $("#contact").offset().top - 200;
		var tokenTop = $("#token").offset().top - 150;
		if(scrollPos < onTop) {
			$("#a2").addClass("header-navclick");
			$("#a2").parent().siblings().children().removeClass("header-navclick")
		}
		if(scrollPos >= onTop) {
			$("#a3").addClass("header-navclick");
			$("#a3").parent().siblings().children().removeClass("header-navclick")
		}
		if(scrollPos >= tokenTop) {
			$("#a4").addClass("header-navclick");
			$("#a4").parent().siblings().children().removeClass("header-navclick")
		}
		if(scrollPos >= appTop) {
			$("#a6").addClass("header-navclick");
			$("#a6").parent().siblings().children().removeClass("header-navclick")
		}
//		if(scrollPos >= YLBTop) {
//			$("#a7").addClass("header-navclick");
//			$("#a7").parent().siblings().children().removeClass("header-navclick")
//		}
		if(scrollPos >= contactTop) {
			$("#a8").addClass("header-navclick");
			$("#a8").parent().siblings().children().removeClass("header-navclick")
		}
	});
	$(".hamburger,.hamburger01").click(function() {
		$(this).toggleClass("is-active")
	});
	var qiehuan = 1;
	$(".hamburger01").click(function() {
		if(qiehuan == 1) {
			qiehuan = 2;
			$(".hanbao-nav").css("transition", "all 1s ease-in-out");
			$(".hanbao-nav").css("transform", "translateX(0%)");
			$(".fixed-phoneNav").addClass("header-active");
			return
		}
		if(qiehuan == 2) {
			qiehuan = 1;
			$(".hanbao-nav").css("transform", "translateX(-100%)");
			$(".fixed-phoneNav").removeClass("header-active")
		}
	});
	
	$(".yuyan").click(function() {
		$(".yuyan01").toggle()
	});
	
	$('.EWM-box').css({
		'position':'relative',
		'left':'10rem',
		'bottom':'16rem'
	})
});