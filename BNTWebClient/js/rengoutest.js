else if(title == "认购" || title === 'rengou') {
		var getFlashConvertListOffset02 = 0;
		queryCashPermission(userId, token, 2)

//		shanduihuil01()
		getAntSubscribeConfigure(userId, token)

		shanduiliebiao02(getFlashConvertListOffset02)

		var rate = getAntSubscribeConfigureArr.data.ant_wallet_subscribe_rate;
		$('.RedemptionBox03 .Available').text('本轮剩余兑换量: '+Math.round(Number(getAntSubscribeConfigureArr.data.surplus_subscribe_limit))+' RUB');
		$('.gerenduihuanliang').text('已兑换量: '+getAntSubscribeConfigureArr.data.ant_wallet_subscribe_personal_amount+' RUB')
		$(".exchange01>span:nth-child(2)").text("1:" + rate)

		//矿工费拖动效果
		var stp = document.querySelector('.js-step');
		var initStp = new Powerange(stp, {
			start: 0,
			step: 50
		});

		//上拉 下拉
		mui(".xialajiazai").pullRefresh({
			up: {
				contentinit: languageArr["loging2.0_218"],
				contentdown: languageArr["loging2.0_218"],
				contentrefresh: languageArr["loging2.0_219"],
				contentnomore: languageArr["loging2.0_220"],
				callback: getlotteryLogTopFor1
			},
			down: {
				callback: getlotteryLogTopFor2,
				contentdown: languageArr["loging2.0_221"],
				contentover: languageArr["loging2.0_222"],
				contentrefresh: languageArr["loging2.0_223"],
			}
		})

		function getlotteryLogTopFor2() {
			setTimeout(function() {
				getAntSubscribeConfigure(userId, token)
				var rate = getAntSubscribeConfigureArr.data.ant_wallet_subscribe_rate;
				$('.RedemptionBox03 .Available').text('本轮剩余兑换量: '+Math.round(Number(getAntSubscribeConfigureArr.data.surplus_subscribe_limit))+'RUB');
				$('.gerenduihuanliang').text('已兑换量: '+getAntSubscribeConfigureArr.data.ant_wallet_subscribe_personal_amount+'RUB')
				$(".exchange01>span:nth-child(2)").text("1:" + rate)
				mui('.xialajiazai').pullRefresh().endPulldownToRefresh(true);
			}, 1000)
		}

		function getlotteryLogTopFor1() {
			var This = this;
			setTimeout(function() {
				if(getSubscribeListArr.data != undefined) {
					if(getSubscribeListArr.data.length >= 10) {
						getFlashConvertListOffset02 += 10;
						shanduiliebiao02(getFlashConvertListOffset02)
						This.endPullupToRefresh(false);
					} else {
						This.endPullupToRefresh(true);
					}
				} else {
					This.endPullupToRefresh(true);
				}
			}, 1000)
		}

		//密码消失按钮
		$(".publicPasTitle>p").on("tap", function() {
			$(".publicPas").fadeOut()
			$(".publicPasInput>input").val("")
		})

		//切换ETH
		$(".RedemptionBox02>div").on("tap", function() {
			var value1 = $(this).find("span").text();
			var value2 = $(".RedemptionBox03 .yuedeng").text();
			var value3 = $(".RedemptionBox02>input").val();
			$(this).find("span").text(value2)
			$(".RedemptionBox03 .yuedeng").text(value1)
			if(value3 == null || value3 == "") {
				return false
			} else if($(this).find("span").text() == "ANT") {
				$(".RedemptionBox03 .price").text(value3 * rate)
			} else {
				$(".RedemptionBox03 .price").text(value3 / rate)
			}

		})

		//输入框内的逻辑
		$(".RedemptionBox02>input").on("input", function() {
			if($(".RedemptionBox02>div>span").text() == "ANT") {
				if($(this).val() == null || $(this).val() == "") {
					$(".RedemptionBox03 .price").text("0")
				} else {
					$(".RedemptionBox03 .price").text($(this).val() * rate)
				}
			} else {
				if($(this).val() == null || $(this).val() == "") {
					$(".RedemptionBox03 .price").text("0")
				} else {
					$(".RedemptionBox03 .price").text($(this).val() / rate)
				}
			}
		})

		//最近众筹的详情页跳转
		$(".exchangeList").on("tap", "li", function() {
			var exchangeListId = $(this).attr("data-id")
			if(android != undefined) {
				window.location.href = "http://" + surroundings + "/wallet/src/Ruby/RubyDetails.html?AntExchange=2&loginType=1&id=" + exchangeListId + "&user_id=" + userId + "&user_token=" + token
			} else {
				DAPPFramework.View.PushView("wallet/src/Ruby/RubyDetails.html?AntExchange=2&id=" + exchangeListId);
			}
		})

		//众筹规则
		$(".exchangeguize").on("tap", function() {
			if(android != undefined) {
				window.location.href = "http://" + surroundings + "/wallet/src/Ruby/Explain02.html"
			} else {
				DAPPFramework.View.PushView("wallet/src/Ruby/Explain02.html");
			}
		})

		//显示密码
		var GasLimit;
		$(".RedemptionBox03>button").on("tap", function() {
			//			if(getAntCashConfigureArr.data.ant_wallet_cash_switch!=1){//是否开放
			//				return alert("暂未开放")
			//			}
			if($(".RedemptionBox02>input").val() == null || $(".RedemptionBox02>input").val() == "") {
				return alert("数量为空")
			}
			var zhengze = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
			if(!zhengze.test($(".RedemptionBox02>input").val())) {
				return alert("请输入正确数字")
			}
			if($(".RedemptionBox01Select>span").text() == "ANT") {
				var AntExchange01 = Number(getAntSubscribeConfigureArr.data.ant_wallet_subscribe_total_limit); //平台限制兑换量
				var AntExchange02 = Number(getAntSubscribeConfigureArr.data.surplus_cash_limit); //剩余可兑换量
				var AntExchange03 = Number(getAntSubscribeConfigureArr.data.ant_wallet_subscribe_max_value); //单笔兑换最大值
				var AntExchange04 = Number(getAntSubscribeConfigureArr.data.ant_wallet_subscribe_min_value); //单笔兑换最小值
				var AntExchange05 = getAntSubscribeConfigureArr.data.ant_wallet_subscribe_finish; //当前轮是否开启

//				console.log(AntExchange01, AntExchange02, AntExchange03, AntExchange04)
				if($(".RedemptionBox02>div>span").text() == "ANT") {
					var RubyNumber = Number($(".RedemptionBox03 .price").text())
				} else {
					var RubyNumber = Number($(".RedemptionBox02>input").val())
				}

				if(AntExchange05 == 1) {
					return alert("本轮额度已兑完，请等待下轮开启。")
				}
				if(RubyNumber > AntExchange02) {
					return alert("已超出您的剩余可兑换量,您的剩余可兑换量还剩" + AntExchange02)
				} else if(RubyNumber > AntExchange03) {
					return alert("已超出单笔兑换最大值")
				} else if(RubyNumber < AntExchange04) {
					return alert("低于兑换最小值")
				}
				$(".rangeBox").hide()
				$(".publicPas").css("visibility", "visible")
				$(".publicPas").fadeIn()
				return
			}
		})

		$(".publicPasBut>button").on("tap", function() {
			var password = $(".publicPasInput>input").val();
			if(android != undefined) {
				var Password = sha256_digest(PrivateKeyJosn[id666].Password);
			} else {
				var Password = PrivateKeyJosn[id666].Password;
			}
			if(password == null || password == "") {
				return alert("私钥密码为空")
			}

			if(Password == sha256_digest(password)) {
				if($(".RedemptionBox01Select>span").text() == "ANT") {
					if($(".RedemptionBox02>div>span").text() == "ANT") {
						var RubyNumber = Number($(".RedemptionBox03 .price").text())
					} else {
						var RubyNumber = Number($(".RedemptionBox02>input").val())
					}

					var Time = new Date().getTime();
					wallet.signMessage(sha256_digest(Time + token)).then(signature => {
						antSubscribe(userId, token, RubyNumber, signature, Time)
					})

					return
				}
			} else {
				alert(languageArr["loging2.0_201"])
			}
		})
	}