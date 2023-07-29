var title = $('title').text();
var android = GetQueryString("loginType");
var PrivateKeyJosn;
var privateKey666;
var Password666;
var id666;

function DAPPFrameworkEngineReady() {
	DAPPFramework.View.SetScrollEnabled(false);
	PrivateKeyJosn = JSON.parse(DAPPFramework.Storage.Get("PrivateKeyJosn"));
	id666 = DAPPFramework.Storage.Get("VurrentValue");
	Password666 = PrivateKeyJosn[id666].Password
	userId = DAPPFramework.Storage.Get("userId");
	token = DAPPFramework.Storage.Get("token");
	$(".withdraw-address,.Contracted-object").css("margin", "1rem auto 0")
	$(".detail-nav").css("top", "0")
	$(".firstUl").css("margin-top", "2rem")
	if(localStorage.getItem("set-lan") == "EN") {
		language = "EN"
		languageArr = EN
	} else {
		language = "CN"
		languageArr = CN
	}
	initWallet();
}
if(android != undefined) {
	var ip = "bnt.yfsz.top"; //192.168.0.121:80  //mobileapi.fuyer.com
	var walletJson = {};
	PrivateKeyJosn = [];
	if(title == "钱包" || title == "Wallet") {
		$(".header").hide()
		$("#refreshContainer").css({
			"margin": 0,
			"padding": 0,
		})
		$(".bottom-nav").hide()

	} else if(title == "充币" || title == "Deposit") {
		$("#qrcode").css("margin-top", "3rem")
	}

	id666 = "0";
	userId = GetQueryString("user_id");
	token = GetQueryString("user_token");
	walletJson.privateKey = ANT.getPrivatelyKey();
	walletJson.Password = ANT.getUserPwd();
	PrivateKeyJosn.push(walletJson)

	if(GetQueryString("language") == "en") {
		localStorage.setItem("set-lan", "EN")
		languageArr = EN
		langStart = 0
		qiehuan()
	} else {
		if(GetQueryString("language") == "zh") {
			localStorage.setItem("set-lan", "CN")
			languageArr = CN
			langStart = 1
			qiehuan()
		} else {
			if(localStorage.getItem("set-lan") == "EN") {
				language = "EN"
				languageArr = EN
				langStart = 0
				qiehuan()
			} else {
				localStorage.setItem("set-lan", "CN")
				languageArr = CN
				langStart = 1
				qiehuan()
			}
		}
	}
	initWallet();
}

function ScanningCallBackFunc(result) { //扫一扫
	$(".withdraw-input>input").val(result)
}

function initWallet() {
	var surroundings = "bnt.fuyer.com"; //bnt.fuyer.com  //192.168.0.116:8813/ant
	if(id666) {
		privateKey666 = PrivateKeyJosn[id666].privateKey;
		Password666 = PrivateKeyJosn[id666].Password;
		if(title === '钱包' || title === "Wallet") {
			var file = $.ajax({
				url: "js/AntToken.abi",
				async: false
			});
		} else {
			var file = $.ajax({
				url: "../js/AntToken.abi",
				async: false
			});
			if(file.status == 404) {
				file = $.ajax({
					url: "../../js/AntToken.abi",
					async: false
				});
			}
		}

		if(title === '众筹' || title === '我的锁仓(RUB)' || title === '详情(RUB)' || title === '下载(Ruby)' || title === 'Crowdfunding' || title === 'My lock(RUB)' || title === 'Details(RUB)' || title === '开通授权(RUB)' || title === '闪兑' || title === 'IEX' || title == "认购" || title === 'rengou') {
			var file1 = $.ajax({
				url: "../../js/RubyChanger.abi",
				async: false
			});
		} else if(title === '钱包' || title === "Wallet") {
			var file1 = $.ajax({
				url: "js/RubyChanger.abi",
				async: false
			});
		} else {
			var file1 = $.ajax({
				url: "../js/RubyChanger.abi",
				async: false
			});
		}
		var random = 0;//Math.round(Math.random())
		var providerArr = [
			new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/b0b1a6d88e734ab2a126d672e435a94b"),
			new ethers.providers.JsonRpcProvider("http://47.245.14.192:1107")
		];
		console.log(providerArr[random]);
		var gasLimit, gasPrice,
			contractAddress = '0x1F8bbc9E4A276D625c9488fa07d21002c511A6F8',
			contractAddress1 = '0xbd305efe520c44e16bcb21434d3010cae8288b73',
			fileText = file.responseText,
			fileText1 = file1.responseText,
			abi = eval('(' + fileText + ')'),
			abi1 = eval('(' + fileText1 + ')'),
			//provider = new ethers.providers.JsonRpcProvider("http://103.251.112.93:1107"),
			wallet = new ethers.Wallet(privateKey666, providerArr[random]),
			contract = new ethers.Contract(contractAddress, abi, providerArr[random]),
			contract1 = new ethers.Contract(contractAddress1, abi1, providerArr[random]),
			contractWithSigner = contract.connect(wallet),
			contractWithSigner1 = contract1.connect(wallet);

		providerArr[random].getBlock('latest').then(block => {
			gasLimit = block.gasLimit._hex;
		})
		providerArr[random].getGasPrice().then(gas => {
			gasPrice = gas;
		})
	}

	function convert(gas, num) {
		if(num === 1) return ethers.utils.formatEther(gas);
		return ethers.utils.formatEther(gas.mul(num).div(100).toString());
	}

	//	function tick (name, submit) {
	//		var src = $(name+">img").attr('src');
	//		$(name).click(function() {
	//			if($(this).children('img').attr('src') === src) {
	//				$(this).children('img').attr('src', '../img/tick.png');
	//				$(submit).removeAttr('disabled');
	//			} else {
	//				$(this).children('img').attr('src', src);
	//				$(submit).attr('disabled','disabled');
	//			}
	//		})
	//	}
	//	
	//	function transform (classOne, classTwo) {
	//		$(classOne).click(function() {
	//			if($(this).css('transform') === 'none') {
	//				$(this).css('transform', 'rotate(90deg)');
	//			} else {
	//				$(this).css('transform', 'none');
	//			}
	//			$(classTwo).slideToggle();
	//		})
	//	}

	function addressSlice(address, length) {
		if(length) {
			var count = address.slice(10, address.length - 10).length;
		} else {
			var count = address.slice(15, address.length - 15).length;
		}
		var str = '';
		for(var i = 0; i < 6; i++) {
			str += '*';
		}
		if(length) {
			return address.slice(0, 10) + str + address.slice(address.length - 10, address.length);
		} else {
			return address.slice(0, 15) + str + address.slice(address.length - 15, address.length);
		}
	}

	function balanceSplit(balance) {
		var arr = balance.split('.');
		return arr[0] + '.' + arr[1].slice(0, 8);
	}

	function getLocalTime(nS, flag) {
		if(parseInt(nS) == 0) {
			return '暂未释放';
		}
		var data = new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
		var time = '';
		data.split(' ')[0].split('/').forEach((item, index) => {
			if(index === 2) {
				time += item;
			} else {
				time += item + '.';
			}
		})
		if(flag === 0) {
			return time;
		} else {
			var test = data.split(' ')[1].slice(data.split(' ')[1].length - 4, data.split(' ')[1].length);
			time += ' ';
			var count = 12 - test.slice(0, 1);
			for(var i = 0; i < test.length; i++) {
				if(i == 0) {
					time += 24 - count;
				} else {
					time += test[i];
				}
			}
			return time;
		}
	}
	var GasPrice;

	function watchRange(gasPrice, gas) {
		$('.range-quantity').watch('width', function() {
			var width = $(this).width();
			var bar = parseInt($('.range-bar').width());
			if(width === 0) {
				GasPrice = convert(gasPrice, 200);
				//				$('.gasPrice').text((convert(gasPrice, 1) * gas).toFixed(8));

				$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * gas)).toFixed(8));
			} else if(width <= bar / 2) {
				GasPrice = convert(gasPrice, 250);
				//				$('.gasPrice').text((convert(gasPrice, 200) * gas).toFixed(8));
				$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * gas)).toFixed(8));
			} else {
				GasPrice = convert(gasPrice, 300);
				//				$('.gasPrice').text((convert(gasPrice, 300) * gas).toFixed(8));
				$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * gas)).toFixed(8));
			}
		})
	}

	function homeData(flag) {
		if(flag === 0) {
			var Cache = {
				home: {}
			};
		} else {
			var Cache = flag;
		}
		wallet.getBalance().then(balance => {
			var Balance = ethers.utils.formatEther(balance);
			$('.eth-balance').text(Number(balanceSplit(Balance)).toFixed(8));
			Cache.home.ethBalance = balanceSplit(Balance);
			if(android != undefined) {
				localStorage.setItem('Cache', JSON.stringify(Cache))
			} else {
				DAPPFramework.Storage.Set('Cache', JSON.stringify(Cache));
			}
			setTimeout(function() {
				mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
			}, 1000)

		}).catch(error => {
			alert("节点错误")
			setTimeout(function() {
				mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
			}, 1000)
		})
		//		contract.decimals().then(decimals => {
		//			contract.balanceOf(wallet.address).then(balance => {
		//				var Balance = (balance / Math.pow(10, decimals)).toFixed(8);
		//				$('.ant-balance').text(Balance);
		//				Cache.home.antBalance = Balance;
		//				if(android!=undefined){
		//					localStorage.setItem('Cache', JSON.stringify(Cache))
		//				}else{
		//					DAPPFramework.Storage.Set('Cache', JSON.stringify(Cache));				
		//				}
		//				mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
		//			})
		//		})
	}

	function contractMiningData(Cache) {
		Cache.contractMining = {};
		contract.decimals().then(decimals => {
			contractWithSigner.GetPosRecords().then(posRecords => {
				var lockBalance = 0;
				posRecords['amount'].forEach(record => { //我的投入
					lockBalance += record._hex / Math.pow(10, decimals);
				})
				$('.myPos').text(lockBalance.toFixed(2));
				Cache.contractMining.posRecords = posRecords;
				if(android != undefined) {
					localStorage.setItem('Cache', JSON.stringify(Cache))
				} else {
					DAPPFramework.Storage.Set('Cache', JSON.stringify(Cache));
				}
				contractWithSigner.GetLockRecords().then(lockRecords => { //获取锁仓记录
					var count = parseInt(lockRecords[0]._hex);
					if(count === 0) {
						$('.lockBalance').text(lockBalance.toFixed(2));
					} else {
						var lockSum = 0;
						for(var i = 0; i < count; i++) {
							var a = Number(lockRecords['totalAmount'][i]._hex);
							var b = Number(lockRecords['withdrawAmount'][i]._hex);
							lockSum += (a - b) / Math.pow(10, decimals);
							lockBalance += (a - b) / Math.pow(10, decimals);
						}
						$('.lockSum').text(lockSum.toFixed(2));
						$('.lockBalance').text(lockBalance.toFixed(2));
					}
					Cache.contractMining.lockRecords = lockRecords;
					if(android != undefined) {
						localStorage.setItem('Cache', JSON.stringify(Cache))
					} else {
						DAPPFramework.Storage.Set('Cache', JSON.stringify(Cache));
					}
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					$(".wodeheyue").unbind("tap")
					$(".wodeheyue").on("tap", function() {
						if(android != undefined) {
							ANT.jumpSubpage("http://" + ip + "/ant/wallet/src/MyContract.html")
						} else {
							DAPPFramework.View.PushView("wallet/src/MyContract.html");
						}
					})
				})
			})
			contract.GetCurrentPosSum().then(amount => { //pos池金额
				var Amount = (amount._hex / Math.pow(10, decimals)).toFixed(2);
				$('.slc').text(Amount);
				Cache.contractMining.posSum = Amount;
				if(android != undefined) {
					localStorage.setItem('Cache', JSON.stringify(Cache))
				} else {
					DAPPFramework.Storage.Set('Cache', JSON.stringify(Cache));
				}
			})
		})
	}

	function posRecordFunction() {
		$('.Rescission').click(function() {
			var index = $(this).attr('data-value');
			$('.publicPas').fadeToggle();
			var GasLimit;
			providerArr[random].getGasPrice().then(gasPrice => {
				contractWithSigner.estimate.RescissionPosAt(index).then(gas => {
					GasLimit = gas;
					GasPrice = convert(gasPrice, 200);
					$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * gas)).toFixed(8));
					//					$('.gasPrice').text((ethers.utils.formatEther(gasPrice) * gas).toFixed(8));
					watchRange(gasPrice, gas);
				})
			})
			$('.publicPasBut>button').click(function() {
				var password = $(".publicPasInput>input").val();
				if($(".publicPasInput>input").val() == "") {
					return alert("输入有空")
				} else if(sha256_digest(password) != Password666) {
					return alert("私钥密码错误")
				}
				$('.publicPas').fadeToggle();
				if(typeof(GasPrice) == "string") {
					GasPrice = ethers.utils.parseEther(GasPrice);
				}
				contractWithSigner.RescissionPosAt(index, {
					gasLimit: GasLimit,
					gasPrice: GasPrice,
					value: 0x0,
				}).then(unpos => {
					console.log(unpos);
					if(android != undefined) {
						contractMiningData(JSON.parse(localStorage.getItem('Cache')));
					} else {
						contractMiningData(JSON.parse(DAPPFramework.Storage.Get('Cache')));
					}
				})
			})
		})
		$('.extract').click(function() {
			var index = $(this).attr('data-value');
			$('.publicPas').fadeToggle();
			var GasLimit;
			providerArr[random].getGasPrice().then(gasPrice => {
				contractWithSigner.estimate.WithDrawPosProfit(index).then(gas => {
					GasLimit = gas;
					GasPrice = convert(gasPrice, 200);
					$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * gas)).toFixed(8));
					//					$('.gasPrice').text((ethers.utils.formatEther(gasPrice) * gas).toFixed(8));
					watchRange(gasPrice, gas);
				})
			})
			var Hax = sha256_digest($(".publicPasInput>input").val());
			$('.publicPasBut>button').click(function() {
				if($(".publicPasInput>input").val() == "") {
					return alert("输入有空")
				} else if(Hax != Password666) {
					return alert("私钥密码错误")
				}
				$('.publicPas').fadeToggle();
				if(typeof(GasPrice) == "string") {
					GasPrice = ethers.utils.parseEther(GasPrice);
				}
				contractWithSigner.WithDrawPosProfit(index, {
					gasLimit: GasLimit,
					gasPrice: GasPrice,
					value: 0x0,
				}).then(earnings => {
					console.log(earnings);
					if(android != undefined) {
						contractMiningData(JSON.parse(localStorage.getItem('Cache')));
					} else {
						contractMiningData(JSON.parse(DAPPFramework.Storage.Get('Cache')));
					}
				})
			})
		})
	}

	function lockRecordFunction() {
		$('.with').click(function() {
			var index = $(this).attr('data-value');
			$('.publicPas').fadeToggle();
			var GasLimit;
			providerArr[random].getGasPrice().then(gasPrice => {
				contractWithSigner.estimate.WithDrawLockRecordProFit(index).then(gas => {
					GasLimit = gas;
					GasPrice = convert(gasPrice, 200);
					$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * gas)).toFixed(8));
					//					$('.gasPrice').text((ethers.utils.formatEther(gasPrice) * gas).toFixed(8));
					watchRange(gasPrice, gas);
				})
			})
			var Hax = sha256_digest($(".publicPasInput>input").val());
			$('.publicPasBut>button').click(function() {
				if($(".publicPasInput>input").val() == "") {
					return alert("输入有空")
				} else if(Hax != Password666) {
					return alert("私钥密码错误")
				}
				$('.publicPas').fadeToggle();
				if(typeof(GasPrice) == "string") {
					GasPrice = ethers.utils.parseEther(GasPrice);
				}
				contractWithSigner.WithDrawLockRecordProFit(index, {
					gasLimit: GasLimit,
					gasPrice: GasPrice,
					value: 0x0,
				}).then(earnings => {
					console.log(earnings);
					if(android != undefined) {
						contractMiningData(JSON.parse(localStorage.getItem('Cache')));
					} else {
						contractMiningData(JSON.parse(DAPPFramework.Storage.Get('Cache')));
					}
				})
			})
		})
	}

	function cancellationAll() {
		$('.cancellationAll').unbind('click');
		$('.cancellationAll').click(function() {
			var GasLimit;
			providerArr[random].getGasPrice().then(gasPrice => {
				contractWithSigner.estimate.RescissionPosAll().then(gas => {
					GasLimit = gas;
					GasPrice = convert(gasPrice, 200);
					$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * gas)).toFixed(8));
					//					$('.gasPrice').text((ethers.utils.formatEther(gasPrice) * gas).toFixed(8));
					watchRange(gasPrice, gas);
				})
			})
			$('.publicPas').fadeToggle();
			var Hax = sha256_digest($(".publicPasInput>input").val());
			$('.publicPasBut>button').click(function() {
				if($(".publicPasInput>input").val() == "") {
					return alert("输入有空")
				} else if(Hax != Password666) {
					return alert("私钥密码错误")
				}
				$('.publicPas').fadeToggle();
				if(typeof(GasPrice) == "string") {
					GasPrice = ethers.utils.parseEther(GasPrice);
				}
				contractWithSigner.RescissionPosAll({
					gasLimit: GasLimit,
					gasPrice: GasPrice,
					value: 0x0,
				}).then(amount => {
					console.log(amount);
					if(android != undefined) {
						contractMiningData(JSON.parse(localStorage.getItem('Cache')));
					} else {
						contractMiningData(JSON.parse(DAPPFramework.Storage.Get('Cache')));
					}
				})
			})
		})
	}

	function extractPosAll() {
		$('.extractAll').unbind('click');
		$('.extractAll').click(function() {
			var GasLimit;
			providerArr[random].getGasPrice().then(gasPrice => {
				contractWithSigner.estimate.WithDrawPosAllProfit().then(gas => {
					GasLimit = gas;
					GasPrice = convert(gasPrice, 200);
					$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * gas)).toFixed(8));
					//					$('.gasPrice').text((ethers.utils.formatEther(gasPrice) * gas).toFixed(8));
					watchRange(gasPrice, gas);
				})
			})
			$('.publicPas').fadeToggle();
			var Hax = sha256_digest($(".publicPasInput>input").val());
			$('.publicPasBut>button').click(function() {
				if($(".publicPasInput>input").val() == "") {
					return alert("输入有空")
				} else if(Hax != Password666) {
					return alert("私钥密码错误")
				}
				$('.publicPas').fadeToggle();
				if(typeof(GasPrice) == "string") {
					GasPrice = ethers.utils.parseEther(GasPrice);
				}
				contractWithSigner.WithDrawPosAllProfit({
					gasLimit: GasLimit,
					gasPrice: GasPrice,
					value: 0x0,
				}).then(amount => {
					console.log(amount);
					if(android != undefined) {
						contractMiningData(JSON.parse(localStorage.getItem('Cache')));
					} else {
						contractMiningData(JSON.parse(DAPPFramework.Storage.Get('Cache')));
					}
				})
			})
		})
	}

	function extractLockAll() {
		$('.extractAll').unbind('click');
		$('.extractAll').click(function() {
			var GasLimit;
			providerArr[random].getGasPrice().then(gasPrice => {
				contractWithSigner.estimate.WithDrawLockRecordAllProfit().then(gas => {
					GasLimit = gas;
					GasPrice = convert(gasPrice, 200);
					$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * gas)).toFixed(8));
					//					$('.gasPrice').text((ethers.utils.formatEther(gasPrice) * gas).toFixed(8));
					watchRange(gasPrice, gas);
				})
			})
			$('.publicPas').fadeToggle();
			var Hax = sha256_digest($(".publicPasInput>input").val());
			$('.publicPasBut>button').click(function() {
				if($(".publicPasInput>input").val() == "") {
					return alert("输入有空")
				} else if(Hax != Password666) {
					return alert("私钥密码错误")
				}
				$('.publicPas').fadeToggle();
				if(typeof(GasPrice) == "string") {
					GasPrice = ethers.utils.parseEther(GasPrice);
				}
				contractWithSigner.WithDrawLockRecordAllProfit({
					gasLimit: GasLimit,
					gasPrice: GasPrice,
					value: 0x0,
				}).then(amount => {
					console.log(amount);
					if(android != undefined) {
						contractMiningData(JSON.parse(localStorage.getItem('Cache')));
					} else {
						contractMiningData(JSON.parse(DAPPFramework.Storage.Get('Cache')));
					}
				})
			})
		})
	}

	function extractAll() {
		$('.extractAll').unbind('click');
		$('.extractAll').click(function() {
			var posAllGas, lockAllGas, GasLimit;
			providerArr[random].getGasPrice().then(gasPrice => {
				contractWithSigner.estimate.WithDrawPosAllProfit().then(posGas => {
					posAllGas = ethers.utils.formatEther(gasPrice) * posGas;
					contractWithSigner.estimate.WithDrawLockRecordAllProfit().then(lockGas => {
						lockAllGas = ethers.utils.formatEther(gasPrice) * lockGas;
						var gas = posGas.add(lockGas);
						GasLimit = gas;
						GasPrice = convert(gasPrice, 200);
						$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * gas)).toFixed(8));
						//						$('.gasPrice').text((ethers.utils.formatEther(gasPrice) * gas).toFixed(8));
						watchRange(gasPrice, gas);
					})
				})
			})
			$('.publicPas').fadeToggle();
			var Hax = sha256_digest($(".publicPasInput>input").val());
			$('.publicPasBut>button').click(function() {
				if($(".publicPasInput>input").val() == "") {
					return alert("输入有空")
				} else if(Hax != Password666) {
					return alert("私钥密码错误")
				}
				$('.publicPas').fadeToggle();
				if(typeof(GasPrice) == "string") {
					GasPrice = ethers.utils.parseEther(GasPrice);
				}
				contractWithSigner.WithDrawPosAllProfit({
					gasLimit: GasLimit,
					gasPrice: GasPrice,
					value: 0x0,
				}).then(tx => {
					console.log(tx);
					contractWithSigner.WithDrawLockRecordAllProfit({
						gasLimit: GasLimit,
						gasPrice: GasPrice,
						value: 0x0,
					}).then(result => {
						console.log(result);
						if(android != undefined) {
							contractMiningData(JSON.parse(localStorage.getItem('Cache')));
						} else {
							contractMiningData(JSON.parse(DAPPFramework.Storage.Get('Cache')));
						}
					})
				})
			})
		})
	}

	function Refresh(name) {
		mui.init({
			pullRefresh: {
				container: "#refreshContainer",
				down: {
					contentdown: "下拉可以刷新",
					contentover: "释放立即刷新",
					contentrefresh: "正在刷新...",
					callback: function() {
						if(name === 'home') {

							getVirtualWallet(userId, token, 2)
							if(getVirtualWalletArr.data != undefined) {
								getVirtualWalletArr.data.forEach(function(item) {
									if(item.coinId == 2) {
										$(".Ruby-balance").text(item.balance.toFixed(8))
										if(item.address != undefined) {
											$(".RubyAddress").attr("data-address", item.address)
											$(".RubyAddress").text(addressSlice(item.address))
										}
									}
								})
							}
							if(android != undefined) {
								homeData(JSON.parse(localStorage.getItem('Cache')));
							} else {
								homeData(JSON.parse(DAPPFramework.Storage.Get('Cache')));
							}
							mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
						} else if(name === 'contract mining') {
							if(android != undefined) {
								contractMiningData(JSON.parse(localStorage.getItem('Cache')));
							} else {
								contractMiningData(JSON.parse(DAPPFramework.Storage.Get('Cache')));
							}
						}
					}
				}
			}
		});
	}
	if(title === '钱包' || title === 'Wallet') {
		Refresh('home');
		if(android != undefined) {
			localStorage.removeItem('Cache')
			var Cache = localStorage.getItem('Cache');
		} else {
			var Cache = DAPPFramework.Storage.Get('Cache');
		}
		$('.eth-address, .ant-address').text(addressSlice(wallet.address));
		if(Cache) {
			var data = JSON.parse(Cache);
			$('.eth-balance').text(Number(data.home.ethBalance).toFixed(8));
			$('.ant-balance').text(data.home.antBalance);
		} else {
			homeData(0);
		}

		function getVirtualWallet(userId, token, coinId) {
			$.ajax({
				type: "get",
				dataType: "json",
				url: "http://bnt.yfsz.top/antVirtualWallet/getVirtualWallet",
				async: false,
				crossDomain: true,
				xhrFields: {  
					withCredentials: true
				},
				data: {
					"userId": userId,
					"token": token,
					"coinId": coinId,
					"clientType": 1,
					"timestamp": new Date().getTime(),
					"sign": 6666
				},
				success: function(result) {
					getVirtualWalletArr = result
				},
				error: function(data) {
					console.log(data)
				}
			})
		}

		getVirtualWallet(userId, token, 2)
		if(getVirtualWalletArr.data != undefined) {
			$(".Ruby-balance").text(getVirtualWalletArr.data[0].balance.toFixed(8))
			getVirtualWalletArr.data.forEach(function(item) {
				if(item.coinId == 2) {
					if(item.address != undefined) {
						$(".RubyAddress").attr("data-address", item.address)
						$(".RubyAddress").text(addressSlice(item.address))
					}
				}
			})
		}

		$(".ethCopyAddress>img").on("tap", function() {
			event.stopPropagation();
			if(android != undefined) {
				ANT.clipboardSet(wallet.address)
				alert("复制成功")
			} else {
				DAPPFramework.PasteBoard.Set(wallet.address)
				if(localStorage.getItem("set-lan") == "EN") {
					alert("Copied Success")
				} else {
					alert("复制成功")
				}
			}
		})

		$(".RubyCopyAddress>img").on("tap", function() {
			event.stopPropagation();
			if(android != undefined) {
				ANT.clipboardSet($(".RubyAddress").attr("data-address"))
				alert("复制成功")
			} else {
				DAPPFramework.PasteBoard.Set($(".RubyAddress").attr("data-address"))
				if(localStorage.getItem("set-lan") == "EN") {
					alert("Copied Success")
				} else {
					alert("复制成功")
				}
			}
		})

		$('.home-ant').on('tap', function() {
			if(localStorage.getItem("set-lan") == "EN") {
				alert("Not Yet Open")
			} else {
				alert("暂未开放,正在建设中")
			}
		})

		$('.home-btc').on('tap', function() {
			if(android != undefined) {
				if(ANT.isInstallApp() == false) {
					ANT.jumpSubpage("http://" + surroundings + "/wallet/src/Ruby/RubyDownload.html")
				} else {
					ANT.jumpSubpage("http://" + surroundings + "/wallet/src/Ruby/contractMining.html")
				}
			} else {
				if(DAPPFramework.Controller.CanOpenURL("rubyChainWallet://") == false) {
					DAPPFramework.View.PushFullView("wallet/src/Ruby/RubyDownload.html");
				} else {
					DAPPFramework.View.PushFullView("wallet/src/Ruby/contractMining.html");
				}
			}
		})

		$('.Ruby-topUp,.Ruby-Withdrawal').on('tap', function() {
			event.stopPropagation();
			if(android != undefined) {
				ANT.jumpSubpage("http://" + surroundings + "/wallet/src/Ruby/RubyDownload.html")
			} else {
				DAPPFramework.View.PushFullView("wallet/src/Ruby/RubyDownload.html");
			}
		})

		$('.eth-topUp').on('tap', function() {
			event.stopPropagation();
			if(android != undefined) {
				ANT.jumpSubpage("http://" + surroundings + "/wallet/src/topUp.html")
			} else {
				DAPPFramework.View.PushView("wallet/src/topUp.html");
			}
			//			if(localStorage.getItem("set-lan")=="EN"){
			//				alert("Not Yet Open")
			//			}else{
			//				alert("暂未开放,正在建设中")
			//			}
		})
		$('.eth-Withdrawal').on('tap', function() {
			event.stopPropagation();
			if(android != undefined) {
				localStorage.setItem('price', $(this).attr('data-value'))
				ANT.jumpSubpage("http://" + surroundings + "/wallet/src/withdraw.html")
			} else {
				DAPPFramework.SharedBoard.Set('price', $(this).attr('data-value'));
				DAPPFramework.View.PushView("wallet/src/withdraw.html");
			}
			//			if(localStorage.getItem("set-lan")=="EN"){
			//				alert("Not Yet Open")
			//			}else{
			//				alert("暂未开放,正在建设中")
			//			}
		})
		$('.currency-detail').on('tap', function() {
			event.stopPropagation();
			if(android != undefined) {
				ANT.jumpSubpage("http://" + surroundings + "/wallet/src/detail.html")
			} else {
				DAPPFramework.View.PushView("wallet/src/detail.html");
			}
			//			if(localStorage.getItem("set-lan")=="EN"){
			//				alert("Not Yet Open")
			//			}else{
			//				alert("暂未开放,正在建设中")
			//			}
		})
		$('.zanweikaifang').on('tap', function() {
			if(localStorage.getItem("set-lan") == "EN") {
				alert("Not Yet Open")
			} else {
				alert("暂未开放,正在建设中")
			}
		})
	} else if(title === '合约挖矿') {
		Refresh('contract mining');
		var ocav = document.getElementById("cav");
		var ctx = ocav.getContext("2d");
		var W = 660;
		var H = 660;
		ocav.width = W;
		ocav.height = H;
		var fontsize = 25;
		var columns = Math.ceil(W / fontsize);
		var drops = [];
		var texts = "01".split("");
		for(var i = 0; i < columns; i++) {
			drops[i] = 0;
		}

		function run() {
			ctx.fillStyle = "rgba(0,0,0,0.05)";
			ctx.fillRect(0, 0, W, H);
			ctx.fillStyle = "darkgray";
			ctx.font = fontsize + "px Arial";
			for(var i = 0; i < columns; i++) {
				var text = texts[Math.floor(Math.random() * texts.length)];
				ctx.fillText(text, i * fontsize, drops[i] * fontsize);
				if(drops[i] * fontsize > H || Math.random() > 0.95) {
					drops[i] = 0;
				}
				drops[i]++;
			}
		}
		setInterval(run, 30);
		if(android != undefined) {
			var Cache = JSON.parse(localStorage.getItem('Cache'));
		} else {
			var Cache = JSON.parse(DAPPFramework.Storage.Get('Cache'));
		}
		$('.tokenBalance').text(Cache.home.antBalance);
		if(Cache.contractMining) {
			contract.decimals().then(decimals => {
				var myPos = 0,
					lockSum = 0,
					count = Cache.contractMining.lockRecords[1].length;
				Cache.contractMining.posRecords[1].forEach(amount => {
					myPos += amount._hex / Math.pow(10, decimals);
				})
				$('.myPos').text(myPos.toFixed(2));
				for(var i = 0; i < count; i++) {
					var a = Cache.contractMining.lockRecords[1][i]._hex / Math.pow(10, decimals);
					var b = Cache.contractMining.lockRecords[2][i]._hex / Math.pow(10, decimals);
					lockSum += (a - b);
				}
				$('.lockSum').text(lockSum.toFixed(2));
				$('.lockBalance').text((myPos + lockSum).toFixed(2));
			})
			$('.slc').text(Cache.contractMining.posSum);
			$(".wodeheyue").unbind("tap")
			$(".wodeheyue").on("tap", function() {
				if(android != undefined) {
					window.location.href = "MyContract.html?loginType=android"
				} else {
					DAPPFramework.View.PushView("wallet/src/MyContract.html");
				}
			})
		} else {
			contractMiningData(Cache);
		}

		$(".chongbi").on("tap", function() {
			if(android != undefined) {
				window.location.href = 'topUp.html?loginType=android'
			} else {
				DAPPFramework.View.PushView("wallet/src/topUp.html");
			}
		})
		$(".tibi").on("tap", function() {
			if(android != undefined) {
				window.location.href = 'withdraw.html?loginType=android'
			} else {
				DAPPFramework.View.PushView("wallet/src/withdraw.html");
			}
		})
		$(".qianyue").on("tap", function() {
			if(android != undefined) {
				window.location.href = 'Signing-mining.html?loginType=android'
			} else {
				DAPPFramework.View.PushView("wallet/src/Signing-mining.html");
			}
		})

		$(".jiaoyijilu").on("tap", function() {
			alert("暂未开放，正在建设中")
			//			if(android!=undefined){
			//				window.location.href='detail.html?loginType=android'
			//			}else{							
			//				DAPPFramework.View.PushView("wallet/src/detail.html");
			//			}
		})

	} else if(title === '充币' || title === 'Deposit') {
		if(GetQueryString("Ruby")) {

		}
		$('#qrcode').qrcode({
			text: wallet.address
		});
		$('.topUp-address>input').val(wallet.address);
		$(".copyAddress").on("tap", function() {
			if(android != undefined) {
				ANT.clipboardSet($('.topUp-address>input').val())
				if(localStorage.getItem("set-lan") == "EN") {
					alert("Copied Success")
				} else {
					alert("复制成功")
				}
			} else {
				DAPPFramework.PasteBoard.Set($('.topUp-address>input').val())
				if(localStorage.getItem("set-lan") == "EN") {
					alert("Copied Success")
				} else {
					alert("复制成功")
				}
			}
		})
	}else if(title === '提币' || title === 'Withdrawal') {
		if(android != undefined) {
			var price = localStorage.getItem('price');
		} else {
			var price = DAPPFramework.SharedBoard.Get('price');
		}
		var stp = document.querySelector('.js-step');
		var initStp = new Powerange(stp, {
			start: 0,
			step: 50
		});
		$('.publicPas').css('visibility', 'visible');
		$('.publicPas').hide();
		$('.withdraw-input>input').on('input', function() {
			$(this).next().show();
			if($(this).val() === '') {
				$(this).next().hide();
			}
		})
		$(".saosao").on("tap", function() {
			if(android != undefined) {
				ANT.openScan()
			} else {
				DAPPFramework.Camera.Scanning("ScanningCallBackFunc");
			}
		})

		$('.withdraw-input>img').click(function() {
			$(this).prev().val('');
			$(this).hide();
		})
		if(android != undefined) {
			var Cache = JSON.parse(localStorage.getItem('Cache'));
		} else {
			var Cache = JSON.parse(DAPPFramework.Storage.Get('Cache'));
		}
		if(price === 'eth') {
			$('.unit').text('ETH').css('color', '#7E7E7E');
			if(Cache.home.ethBalance) {
				$('.usable').text(Cache.home.ethBalance);
			} else {
				wallet.getBalance().then(balance => {
					var Balance = ethers.utils.formatEther(balance);
					$('.usable').text(parseInt(Balance).toFixed(2));
				})
			}
			$('.confirm-withdraw').on("tap", function() {
				var address = $('.withdraw-input>input').val();
				var amount = $('.withdraw-quantity input').val();
				if(address === '')
					return alert('请输入提币地址！');
				else if(amount === '')
					return alert('请输入提币数量！');

				var zhengze = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
				if(!zhengze.test(amount)) {
					return alert("请输入正确数字")
				}
				wallet.getBalance().then(balance => {
					var OnBalance = ethers.utils.formatEther(balance);
					if(amount > OnBalance) {
						return alert("已超出现有ETH")
					}
					providerArr[random].getGasPrice().then(gasPrice => {
						GasPrice = convert(gasPrice, 200);
						$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * 21000)).toFixed(8));
						//						$('.gasPrice').text((ethers.utils.formatEther(gasPrice) * 21000).toFixed(8));
						watchRange(gasPrice, 21000);
					})
					$('.publicPas').fadeIn();

					$('.publicPasBut>button').on("tap", function() {
						var password = $(".publicPasInput>input").val();
						if(android != undefined) {
							var PassWord = sha256_digest(PrivateKeyJosn[id666].Password);
						} else {
							var PassWord = PrivateKeyJosn[id666].Password;
						}
						//					console.log(password,PassWord)
						if($(".publicPasInput>input").val() == "") {
							return alert("输入有空")
						} else if(sha256_digest(password) != PassWord) {
							return alert("私钥密码错误")
						}
						if(typeof(GasPrice) == 'string') {
							GasPrice = ethers.utils.parseEther(GasPrice);
						}
						console.log(ethers.utils.formatEther(GasPrice))
						wallet.sendTransaction({
							to: address,
							value: ethers.utils.parseEther(amount),
							gasPrice: GasPrice
						}).then(function(tx) {
							console.log(tx);
							if(tx) {
								alert("成功")
								//								$(".publicPas").css("visibility","hidden")
								//								$(".publicPas").fadeOut()
								//								$(".publicPasInput>input").val("")
								if(android != undefined) {
									ANT.goThisBackPage()
								} else {
									DAPPFramework.View.PopView();
								}
							}
						}).catch(error => {
							alert(error.code)
						})
					})
				})
			})
		} else {
			$('.unit').text('ANT').css('color', '#7E7E7E');
			if(Cache.home.antBalance) {
				$('.usable').text(Cache.home.antBalance);
			} else {
				contract.balanceOf(wallet.address).then(balance => {
					var Balance = (balance / Math.pow(10, decimal)).toFixed(2);
					$('.usable').text(Balance);
				})
			}
			contract.decimals().then(decimals => {
				$('.confirm-withdraw').click(function() {
					var address = $('.withdraw-input>input').val();
					var amount = $('.withdraw-quantity input').val();
					if(address === '')
						return mui.alert('请输入提币地址！');
					else if(amount === '')
						return mui.alert('请输入提币数量！');
					var GasLimit;
					providerArr[random].getGasPrice().then(gasPrice => {
						amount = amount * Math.pow(10, decimals);
						contractWithSigner.estimate.transfer(address, amount).then(gas => {
							GasLimit = gas;
							GasPrice = convert(gasPrice, 200);
							$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * gas)).toFixed(8));
							//							$('.gasPrice').text((ethers.utils.formatEther(gasPrice) * gas).toFixed(8));
							watchRange(gasPrice, gas);
							$('.publicPas').fadeToggle();
						}).catch(err => {
							alert("地址错误")
						})
					})
					var Hax = sha256_digest($(".publicPasInput>input").val());
					$('.publicPasBut>button').click(function() {
						if($(".publicPasInput>input").val() == "") {
							return alert("输入有空")
						} else if(Hax != Password666) {
							return alert("私钥密码错误")
						}
						$('.publicPas').fadeToggle();
						contractWithSigner.transfer(address, amount, {
							gasLimit: GasLimit,
							gasPrice: GasPrice,
							value: 0x0,
						}).then(tx => {
							console.log(tx);
							history.back();
						});
					})
				})
			})
		}
		$('#all').click(function() {
			$('.withdraw-quantity input').val($('.usable').text());
		})
		$('.publicPasTitleDown').click(function() {
			$('.publicPas').fadeToggle();
		})
	} else if(title === '交易记录' || title == 'Order history') {
		var Position = $(window).width() / 12;
		$('.progress-bar').css('cssText', 'background-position-x:' + -(Position * 11) + 'px!important')
		$('.detail-nav>div').on("tap", function() {
			$(this).css({
				'background': '#00b07c',
				'color': 'white'
			}).siblings().css({
				'background': 'none',
				'color': '#101010'
			})
			switch($(this).text()) {
				case "Ruby":
					$(".detailsList").hide()
					break;
				case "ETH":
					$(".detailsList").show()
					break;
				case "全部":
					$(".detailsList").show()
					break;
			}
		})
		$.ajax({
			type: "post",
			url: "http://api-cn.etherscan.com/api?module=account&action=txlist&address=" + wallet.address + "&startblock=0&endblock=latest&page=1&offset=20&sort=desc&apikey=YourApiKeyToken",
			async: false,
			success: function(data) {
				var day, arr = [],
					count = 0;
				data.result.forEach((item, index) => {
					var time = getLocalTime(item.timeStamp, 1).split(' ');
					if(index == 0) {
						arr[time[0]] = [];
						arr[time[0]][count] = {
							data: item,
							time: time[1]
						}
						count++;
						day = time[0];
					} else {
						if(time[0] == day) {
							arr[time[0]][count] = {
								data: item,
								time: time[1]
							}
							count++;
						} else {
							count = 0;
							arr[time[0]] = [];
							arr[time[0]][count] = {
								data: item,
								time: time[1]
							}
							count++;
						}
						day = time[0];
					}
				})
				var cnt = 0;
				for(i in arr) {
					if(cnt == 0) {
						var ul = $('<ul class="firstUl"></ul>');
						cnt++;
					} else {
						var ul = $('<ul></ul>');
					}
					var time = i.split('.');
					if(android != undefined) {
						ul.append('<li>' + time[2] + '年' + time[0] + '月' + time[1] + '日</li>');
					} else {
						ul.append('<li>' + time[0] + '年' + time[1] + '月' + time[2] + '日</li>');
					}
					arr[i].forEach(item => {
						var Balance = ethers.utils.formatEther(item.data.value);
						if(item.data.from == wallet.address.toLowerCase()) {
							ul.append('<li class="recording"><div><img src="../img/expenditure.png"/><div><p>' + addressSlice(wallet.address, 1) + '</p><p class="recording-time">' + item.time + '</p></div></div><div><p class="recording-amount">-' + Balance + ' ETH</p><p class="Ok">(' + languageArr["loging2.0_217"] + ')</p></div></li>')
						} else {
							ul.append('<li class="recording"><div><img src="../img/income.png"/><div><p>' + addressSlice(wallet.address, 1) + '</p><p class="recording-time">' + item.time + '</p></div></div><div><p class="recording-amountAdd">+' + Balance + ' ETH</p><p class="Ok">(' + languageArr["loging2.0_217"] + ')</p></div></li>')
						}
					})
					$('.detailsList').append(ul);

					function sortNumber(a, b) {
						return b.data.timeStamp - a.data.timeStamp;
					}
					arr[i].sort(sortNumber);
					console.log(arr[i]);
				}

			},
			error: function(tx) {
				console.log(tx)
			}
		});

	} else if(title === '签约挖矿' || title === 'Signing mining') {
		if(android != undefined) {
			var Cache = JSON.parse(localStorage.getItem('Cache'));
		} else {
			var Cache = JSON.parse(DAPPFramework.Storage.Get('Cache'));
		}
		if(Cache.home.antBalance) {
			$('.usable').text(Cache.home.antBalance);
		} else {
			contract.balanceOf(wallet.address).then(balance => {
				var Balance = balance / Math.pow(10, decimal);
				$('.usable').text(Balance.toFixed(2));
			})
		}
		$('#all').click(function() {
			$('.withdraw-quantity input').val($('.usable').text());
		})
		var stp = document.querySelector('.js-step');
		var initStp = new Powerange(stp, {
			start: 0,
			step: 50
		});
		$('.publicPas').css('visibility', 'visible');
		$('.publicPas').hide();
		contract.decimals().then(decimals => {
			$('.confirm-withdraw').click(function() {
				var amount = $('.withdraw-quantity input').val();
				if(amount === '')
					return mui.alert('请输入签约数量！');
				var GasLimit;
				providerArr[random].getGasPrice().then(gasPrice => {
					amount = amount * Math.pow(10, decimals);
					contractWithSigner.estimate.DespoitToPos(amount).then(gas => {
						GasLimit = gas;
						GasPrice = convert(gasPrice, 200);
						$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * gas)).toFixed(8));
						//						$('.gasPrice').text((ethers.utils.formatEther(gasPrice) * gas).toFixed(8));
						watchRange(gasPrice, gas);
					})
				})
				$('.publicPas').fadeToggle();
				var Hax = sha256_digest($(".publicPasInput>input").val());
				$('.publicPasBut>button').click(function() {
					if($(".publicPasInput>input").val() == "") {
						return alert("输入有空")
					} else if(Hax != Password666) {
						return alert("私钥密码错误")
					}
					$('.publicPas').fadeToggle();
					contractWithSigner.DespoitToPos(amount, {
						gasLimit: GasLimit,
						gasPrice: GasPrice,
						value: 0x0,
					}).then(pos => {
						console.log(pos);
						history.back();
					})
				})
			})
		})
		$('.publicPasTitleDown').click(function() {
			$('.publicPas').fadeToggle();
		})
	} else if(title === '我的合约' || title === 'My contract') {
		if(android != undefined) {
			var Cache = JSON.parse(localStorage.getItem('Cache'));
		} else {
			var Cache = JSON.parse(DAPPFramework.Storage.Get('Cache'));
		}
		if(Cache.contractMining) {
			var posRecords = Cache.contractMining.posRecords;
			var lockRecords = Cache.contractMining.lockRecords;
			var posCount = parseInt(posRecords[0]._hex);
			var lockCount = parseInt(lockRecords[0]._hex);
			contract.decimals().then(decimals => {
				for(var i = 0; i < posCount; i++) {
					var posTime = getLocalTime(posRecords[2][i]._hex, 0);
					var amount = (posRecords[1][i]._hex / Math.pow(10, decimals)).toFixed(2);
					var prefix = (posRecords[4][i]._hex / Math.pow(10, decimals)).toFixed(2);
					var lastWithDrawTime = posRecords[3][i]._hex;
					if(lastWithDrawTime === '0x00') {
						var li = '<li class="mui-table-view-cell mui-transitioning posDis"><div class="mui-slider-right mui-disabled"><span data-value="' + i + '" class="mui-btn mui-icon red Rescission"><div>' +
							'<img style="width: 1.037037rem; height: 1.074074rem;" src="../img/relieve.png" /><span>解约</span></div></span><span data-value="' + i + '" class="mui-btn mui-icon green extract">' +
							'<div><img style="width: 1.222222rem; height: 1.222222rem;" src="../img/earnings.png" /><span>领取收益</span></div></span></div>' +
							'<div class="mui-slider-handle"><div class="mui-slider-handle-left"><div><img src="../img/pos.png" /><span>POS_15784512465</span></div><div>' +
							'<span>签约时间:</span><span>' + posTime + '</span></div><div><span>签约数量:</span><span><span>' + amount + '</span> ANT</span>' +
							'</div><div><span>最近提取时间:</span><span>暂未领取</span></div>' +
							'</div><div class="mui-slider-handle-right"><p>' + prefix + '</p><span>（可领取ANT）</span></div></div></li>';
					} else {
						lastWithDrawTime = getLocalTime(lastWithDrawTime, 1);
						var li = '<li class="mui-table-view-cell mui-transitioning posDis"><div class="mui-slider-right mui-disabled"><span data-value="' + i + '" class="mui-btn mui-icon red Rescission"><div>' +
							'<img style="width: 1.037037rem; height: 1.074074rem;" src="../img/relieve.png" /><span>解约</span></div></span><span data-value="' + i + '" class="mui-btn mui-icon green extract">' +
							'<div><img style="width: 1.222222rem; height: 1.222222rem;" src="../img/earnings.png" /><span>领取收益</span></div></span></div>' +
							'<div class="mui-slider-handle"><div class="mui-slider-handle-left"><div><img src="../img/pos.png" /><span>POS_15784512465</span></div><div>' +
							'<span>签约时间:</span><span>' + posTime + '</span></div><div><span>签约数量:</span><span><span>' + amount + '</span> ANT</span>' +
							'</div><div><span>最近提取时间:</span><span>' + lastWithDrawTime + '</span></div>' +
							'</div><div class="mui-slider-handle-right"><p>' + prefix + '</p><span>（可领取ANT）</span></div></div></li>';
					}
					$('.mui-table-view').append(li);

				}
				for(var i = 0; i < lockCount; i++) {
					var withdrawTime = getLocalTime(lockRecords[3][i]._hex, 0);
					var amount = (lockRecords[1][i]._hex / Math.pow(10, decimals)).toFixed(2);
					var withdrawAmount = (lockRecords[2][i]._hex / Math.pow(10, decimals)).toFixed(2);
					if(lockRecords[5][i]._hex === '0x00') {
						var li = '<li class="mui-table-view-cell mui-transitioning lockDis"><div class="mui-slider-right mui-disabled"><span data-value="' + i + '" class="mui-btn mui-icon green with">' +
							'<div><img style="width: 1.222222rem; height: 1.222222rem;" src="../img/earnings.png" /><span>领取收益</span>' +
							'</div></span></div><div class="mui-slider-handle"><div class="mui-slider-handle-left"><div><img src="../img/lock.png" />' +
							'<span>LOCK_15784512465</span></div><div><span>释放时间:</span><span>' + withdrawTime + '</span></div><div><span>锁仓数量:</span>' +
							'<span>' + amount + ' ANT</span></div><div><span>已释放总额:</span><span>' + withdrawAmount + ' ANT</span></div></div><div class="mui-slider-handle-right">' +
							'<p>0.00</p><span>（可提取ANT）</span></div></div></li>';
					} else {
						var prefix = (lockRecords[5][i]._hex / Math.pow(10, decimals)).toFixed(2);
						var li = '<li class="mui-table-view-cell mui-transitioning lockDis"><div class="mui-slider-right mui-disabled"><span data-value="' + i + '" class="mui-btn mui-icon green with">' +
							'<div><img style="width: 1.222222rem; height: 1.222222rem;" src="../img/earnings.png" /><span>领取收益</span>' +
							'</div></span></div><div class="mui-slider-handle"><div class="mui-slider-handle-left"><div><img src="../img/lock.png" />' +
							'<span>LOCK_15784512465</span></div><div><span>释放时间:</span><span>' + withdrawTime + '</span></div><div><span>锁仓数量:</span>' +
							'<span>' + amount + ' ANT</span></div><div><span>已释放总额:</span><span>' + withdrawAmount + ' ANT</span></div></div><div class="mui-slider-handle-right">' +
							'<p>' + prefix + '</p><span>（可提取ANT）</span></div></div></li>';
					}
					$('.mui-table-view').append(li);

				}
				$(".number").text("(" + $("#allRecord>li").length + ")")
				posRecordFunction();
				lockRecordFunction();
			})
		}
		var stp = document.querySelector('.js-step');
		var initStp = new Powerange(stp, {
			start: 0,
			step: 50
		});
		$('.publicPas').css('visibility', 'visible');
		$('.publicPas').hide();
		$(".MyContractState").on("tap", "li", function() {
			$(this).css({
				"color": "#fff",
				"background": "#00b07c"
			}).siblings().css({
				"color": "#101010",
				"background": "transparent"
			})
			if($(this).text() === '算力合约') {
				$('.posDis').show();
				$('.lockDis').hide();
				cancellationAll();
				extractPosAll();
			} else if($(this).text() === '众筹合约') {
				$('.posDis').hide();
				$('.lockDis').show();
				$('.cancellationAll').unbind('click');
				$('.cancellationAll').click(function() {
					alert('众筹合约不支持解约！');
				})
				extractLockAll();
			} else {
				$('.posDis').show();
				$('.lockDis').show();
				cancellationAll();
				extractAll();
			}
		})
		cancellationAll();
		extractAll();
		$('.publicPasTitleDown').click(function() {
			$('.publicPas').fadeToggle();
		})
	} else if(title == '众筹' || title === 'Crowdfunding') {
		var getFlashConvertListOffset = 0;

		shanduihuil()
		shanduiliebiao(getFlashConvertListOffset);

		var rate = getFlashConvertRateArr.data.currentRate;
		$(".exchange01>span:nth-child(2)").text("1:" + rate)
		if(android != undefined) {
			var eth = JSON.parse(localStorage.getItem("Cache"));
		} else {
			if(DAPPFramework.Storage.Get("Cache") != undefined) {
				var eth = JSON.parse(DAPPFramework.Storage.Get("Cache"));
			}
		}

		//矿工费拖动效果
		var stp = document.querySelector('.js-step');
		var initStp = new Powerange(stp, {
			start: 0,
			step: 50
		});
		//下拉列表
		//	    $(".RedemptionBox01Select").on("tap",function(){
		//	    	if($(".RedemptionBox01Select>ul").css("display")=="flex"){
		//	    		$(".RedemptionBox01Select>ul").fadeOut()
		//	    	}else{    		
		//	    		$(".RedemptionBox01Select>ul").fadeIn()
		//	    		$(".RedemptionBox01Select>ul").css("display","flex")
		//	    	}
		//	    })
		//	    $(".RedemptionBox01Select>ul>li").on("tap",function(){
		//	    	$(".RedemptionBox02>input").val("")
		//	    	mui('.xialajiazai').pullRefresh().refresh(true);
		//	    	if($(this).attr("data-index")=="1"){
		//	    		$(".RedemptionBox01Select>img").attr("src","../../img/exchangeETH-LOGO.png")
		//	    		$(".RedemptionBox01Select>img").css({
		//	    			"width":"0.888888rem",
		//	    			"height":"1.444444rem"
		//	    		})
		//	    		$(".RedemptionBox01Select>span,.RedemptionBox02>div>span").text($(this).find("span").text())
		//	    		rate=getFlashConvertRateArr.data.currentRate;
		//	    		$(".exchange01>span:nth-child(2)").text("1:"+rate)
		//	    		$(".RedemptionBox03>p>span:nth-child(1)").text(0)
		//	    		$(".RedemptionBox02>div>span").text("ETH")
		//	    		$(".RedemptionBox03>p>span:nth-child(2)").text("Ruby")
		//	    		getFlashConvertListOffset=0
		//	    		$(".exchangeList").empty()
		//	    		shanduiliebiao(getFlashConvertListOffset)
		//	    		
		//	    	}else{
		//	    		$(".RedemptionBox01Select>img").attr("src","../../img/ANT-logo.png")
		//	    		$(".RedemptionBox01Select>img").css({
		//	    			"width":"1.018518rem",
		//	    			"height":"1.018518rem"
		//	    		})
		//	    		$(".RedemptionBox01Select>span,.RedemptionBox02>div>span").text($(this).find("span").text())
		//	    		rate=getAntCashConfigureArr.data.ant_wallet_cash_rate;
		//	    		$(".exchange01>span:nth-child(2)").text("1:"+rate)
		//	    		$(".RedemptionBox03>p>span:nth-child(1)").text(0)
		//	    		$(".RedemptionBox02>div>span").text("ANT")
		//	    		$(".RedemptionBox03>p>span:nth-child(2)").text("Ruby")
		//	    		queryCashPermission(userId,token,2)
		//	    		if( queryCashPermissionArr.data.status == 2 ){
		//					if(android!=undefined){
		//						window.location.href="RubyAuthorization.html?loginType=1&user_id="+userId+"&user_token="+token
		//					}else{
		//						DAPPFramework.View.PushView("wallet/src/Ruby/RubyAuthorization.html");
		//					}
		//				}else if( queryCashPermissionArr.data.status == 0 ){
		//					return alert("等待确认中")
		//				}
		//	    		getFlashConvertListOffset01=0
		//	    		$(".exchangeList").empty()
		//	    		shanduiliebiao01(getFlashConvertListOffset01)
		//	    	}
		//	    })

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
				shanduihuil()
				$(".exchange01>span:nth-child(2)").text("1:" + rate)
				mui('.xialajiazai').pullRefresh().endPulldownToRefresh(true);
			}, 1000)
		}

		function getlotteryLogTopFor1() {
			var This = this;
			setTimeout(function() {

				if(getFlashConvertListArr.data != undefined) {
					if(getFlashConvertListArr.data.length >= 10) {
						getFlashConvertListOffset += 10;
						shanduiliebiao(getFlashConvertListOffset)
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
			var value2 = $(".RedemptionBox03>p>span:nth-child(2)").text();
			var value3 = $(".RedemptionBox02>input").val();
			$(this).find("span").text(value2)
			$(".RedemptionBox03>p>span:nth-child(2)").text(value1)
			if(value3 == null || value3 == "") {
				return false
			} else if($(this).find("span").text() == "ETH") {
				$(".RedemptionBox03>p>span:nth-child(1)").text(value3 * rate)
			} else {
				$(".RedemptionBox03>p>span:nth-child(1)").text(value3 / rate)
			}

		})
		//输入框内的逻辑
		$(".RedemptionBox02>input").on("input", function() {
			if($(".RedemptionBox02>div>span").text() == "ETH") {
				if($(this).val() == null || $(this).val() == "") {
					$(".RedemptionBox03>p>span:nth-child(1)").text("0")
				} else {
					$(".RedemptionBox03>p>span:nth-child(1)").text($(this).val() * rate)
				}
			} else {
				if($(this).val() == null || $(this).val() == "") {
					$(".RedemptionBox03>p>span:nth-child(1)").text("0")
				} else {
					$(".RedemptionBox03>p>span:nth-child(1)").text($(this).val() / rate)
				}
			}

		})
		//最近众筹的详情页跳转
		$(".exchangeList").on("tap", "li", function() {
			var exchangeListId = $(this).attr("data-id")
			if($(".RedemptionBox01Select>span").text() == "ANT") {
				if(android != undefined) {
					window.location.href = "http://" + surroundings + "/wallet/src/Ruby/RubyDetails.html?AntExchange=1&loginType=1&id=" + exchangeListId + "&user_id=" + userId + "&user_token=" + token
				} else {
					DAPPFramework.View.PushView("wallet/src/Ruby/RubyDetails.html?AntExchange=1&id=" + exchangeListId);
				}
			} else {
				if(android != undefined) {
					window.location.href = "http://" + surroundings + "/wallet/src/Ruby/RubyDetails.html?loginType=1&id=" + exchangeListId + "&user_id=" + userId + "&user_token=" + token
				} else {
					DAPPFramework.View.PushView("wallet/src/Ruby/RubyDetails.html?id=" + exchangeListId);
				}
			}
		})

		//众筹规则
		$(".exchangeguize").on("tap", function() {
			if(android != undefined) {
				window.location.href = "http://" + surroundings + "/wallet/src/Ruby/Explain.html"
			} else {
				DAPPFramework.View.PushView("wallet/src/Ruby/Explain.html");
			}
		})

		//显示密码
		var GasLimit;
		$(".RedemptionBox03>button").on("tap", function() {
			if($(".RedemptionBox02>input").val() == null || $(".RedemptionBox02>input").val() == "") {
				return alert("数量为空")
			}
			var zhengze = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
			if(!zhengze.test($(".RedemptionBox02>input").val())) {
				return alert("请输入正确数字")
			}
			
			wallet.getBalance().then(balance => {
				var Balance = ethers.utils.formatEther(balance);
				if(Number($(".RedemptionBox02>input").val()) > Number(Balance)) {
					return alert("已超出现有ETH")
				}
				if($(".RedemptionBox02>div>span").text() == "ETH") {
					var EthValue = $(".RedemptionBox02>input").val()
				} else {
					var EthValue = $(".RedemptionBox03>p>span:nth-child(1)").text()
				}
				flashConvertPrepare(userId, token, EthValue)
				if(flashConvertPrepareArr.code == 1) {
					if(Number(EthValue) >= flashConvertPrepareArr.data.eth_min_limit) {
						$(".range-handle").css("left", "0")
						$('.range-quantity').css("width", "0px")
						$(".publicPas").css("visibility", "visible")
						$(".publicPas").fadeIn()
						$(".rangeBox").show()
						providerArr[random].getGasPrice().then(gasPrice => {
							contractWithSigner1.estimate.DespositToChangeRuby({
								gasLimit: gasLimit,
								gasPrice: gasPrice,
								value: ethers.utils.parseEther(EthValue)
							}).then(result => {
								GasLimit = result;
								GasPrice = convert(gasPrice, 200);
								$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * result)).toFixed(8));
								watchRange(gasPrice, result);
							})
						})
					} else {
						alert("数额太小")
					}
					$(".RedemptionBox02>input").blur()
				} else {
					alert(flashConvertPrepareArr.message)
				}
			})
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

			if($(".RedemptionBox02>div>span").text() == "ETH") {
				var EthValue = $(".RedemptionBox02>input").val()
			} else {
				var EthValue = $(".RedemptionBox03>p>span:nth-child(1)").text()
			}

			if(Password == sha256_digest(password)) {
				if(typeof(GasPrice) != "object") {
					GasPrice = ethers.utils.parseEther(GasPrice)
				}
				console.log(GasLimit.toString(), GasPrice.toString(), EthValue)
				contractWithSigner1.DespositToChangeRuby({
					gasLimit: GasLimit,
					gasPrice: GasPrice,
					value: ethers.utils.parseEther(EthValue),
				}).then(result => {
					flashConvert(userId, token, EthValue, result.hash)
					if(flashConvertArr.code == 1) {
						$(".publicPas").css("visibility", "hidden")
						$(".publicPas").fadeOut()
						$(".publicPasInput>input").val("")

						$(".exchangeList").empty()
						getFlashConvertListOffset = 0
						shanduiliebiao(getFlashConvertListOffset)

						if(android != undefined) {
							if(localStorage.getItem("set-lan") == "EN") {
								mui.confirm("", "The transaction has been submitted, please wait for confirmation", ["Cancel", "Confirm"], "", "div")
							} else {
								mui.confirm("", "交易已提交，请等待确认", ["取消", "确定"], "", "div")
							}
						} else {
							if(localStorage.getItem("set-lan") == "EN") {
								DAPPFramework.Dialog.Alert("", "The transaction has been submitted, please wait for confirmation", ["Cancel", "Confirm"], [0, 2], "")
							} else {
								DAPPFramework.Dialog.Alert("", "交易已提交，请等待确认", ["取消", "确定"], [0, 2], "")
							}
						}
					}
					console.log(result);
				}).catch(error => {
					console.log(error)
					if(error.code == "INSUFFICIENT_FUNDS") {
						alert("ETH余额不足")
					} else {
						alert("请等待上一笔交易确认")
					}
					$(".publicPas").css("visibility", "hidden")
					$(".publicPas").fadeOut()
					$(".publicPasInput>input").val("")
				})
			} else {
				alert(languageArr["loging2.0_201"])
			}
		})
	} else if(title == "认购" || title === 'IEX') {
		$(function () { 
			$(".Gameload").remove()
		})
		
		var tokenState = 3 ,
			rate;
		
		$(".RedemptionBox01Select").on("tap",function(){
			if( $(".RedemptionBox01Select>ul").css("display") == "flex" ){
				$(".RedemptionBox01Select>ul").css("display",'none')
			}else{			
				$(".RedemptionBox01Select>ul").css("display",'flex')
			}
		})
		
		$(".RedemptionBox03Select").on("tap",function(){
			if( $(".RedemptionBox03Select>ul").css("display") == "flex" ){
				$(".RedemptionBox03Select>ul").css("display",'none')
			}else{			
				$(".RedemptionBox03Select>ul").css("display",'flex')
			}
		})
		
		$(".RedemptionBox01Select>ul>li").on("tap",function(){
			$(this).parent().parent().children("span").text($(this).children("span").text())
			if($(this).children("span").text() == "RUB"){
				tokenState = 6;
				$(".RedemptionBox02>div>span").text("RUB")
				$(".yuedeng").text("RUB")
				getAntSubscribeConfigure(userId, token , tokenState)
				exchange01Reload()
			}else{
				tokenState = 3;
				$(".RedemptionBox02>div>span").text(languageArr["Token"])
				$(".yuedeng").text("RUB")
				getAntSubscribeConfigure(userId, token , tokenState)
				exchange01Reload()
			}
		})
		
		$(".RedemptionBox03Select>ul>li").on("tap",function(){
			$(this).parent().parent().children("span").text($(this).children("span").text())
			$(this).parent().parent().children("img").attr("src",$(this).children("img").attr("src"))
			if($(this).children("span").text() == "RUB"){
				alert(languageArr["loging2.0_266"])
			}
		})
		
		var getFlashConvertListOffset02 = 0;
		
		getAntSubscribeConfigure(userId, token , 3)

		shanduiliebiao02(getFlashConvertListOffset02)

		function exchange01Reload(){
			rate = getAntSubscribeConfigureArr.data.ant_wallet_subscribe_rate;
			$('.RedemptionBox03 .Available').text(languageArr["loging2.0_269"]+Math.round(Number(getAntSubscribeConfigureArr.data.surplus_subscribe_limit))+'RUB');
			$(".exchange01>span:nth-child(2)").text(rate+":1")
		}
		exchange01Reload()

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
				getAntSubscribeConfigure(userId, token , tokenState)
				exchange01Reload()
				
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
			} else if($(this).find("span").text() == "RUB") {
				$(".RedemptionBox03 .price").text((value3 * rate).toFixed(2))
			} else {
				$(".RedemptionBox03 .price").text((value3 / rate).toFixed(2))
			}

		})

		//输入框内的逻辑
		$(".RedemptionBox02>input").on("input", function() {
			if( $(".RedemptionBox01Select>span").text() == languageArr["Token"] ){
				if($(".RedemptionBox02>div>span").text() == languageArr["Token"]) {
					if($(this).val() == null || $(this).val() == "") {
						$(".RedemptionBox03 .price").text("0")
					} else {
						$(".RedemptionBox03 .price").text( ($(this).val() * rate) )
					}
				} else {
					if($(this).val() == null || $(this).val() == "") {
						$(".RedemptionBox03 .price").text("0")
					} else {
						$(".RedemptionBox03 .price").text( ($(this).val() / rate) )
					}
				}
			}else{
				if($(".RedemptionBox02>div>span").text() == languageArr["Asset"]) {
					if($(this).val() == null || $(this).val() == "") {
						$(".RedemptionBox03 .price").text("0")
					} else {
						$(".RedemptionBox03 .price").text( ($(this).val() / rate) )
					}
				} else {
					if($(this).val() == null || $(this).val() == "") {
						$(".RedemptionBox03 .price").text("0")
					} else {
						$(".RedemptionBox03 .price").text( ($(this).val() * rate) )
					}
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
			if( ($(".RedemptionBox01Select>span").text() == languageArr["Token"] || $(".RedemptionBox01Select>span").text() == languageArr["Asset"]) && $(".RedemptionBox03Select>span").text() == "RUB") {
//				if(queryCashPermissionArr.data.status == 2) {
//					if(android != undefined) {
//						window.location.href = "RubyAuthorization.html?loginType=1&user_id=" + userId + "&user_token=" + token
//					} else {
//						DAPPFramework.View.PushView("wallet/src/Ruby/RubyAuthorization.html");
//					}
//					return alert("未开通权限")
//				} else if(queryCashPermissionArr.data.status == 0) {
//					return alert("等待确认中")
//				}
				var AntExchange01 = Number(getAntSubscribeConfigureArr.data.ant_wallet_subscribe_total_limit); //平台限制兑换量
				var AntExchange02 = Number(getAntSubscribeConfigureArr.data.surplus_subscribe_limit); //剩余可兑换量
				var AntExchange03 = Number(getAntSubscribeConfigureArr.data.ant_wallet_subscribe_max_value); //单笔兑换最大值
				var AntExchange04 = Number(getAntSubscribeConfigureArr.data.ant_wallet_subscribe_min_value); //单笔兑换最小值
				var AntExchange05 = getAntSubscribeConfigureArr.data.ant_wallet_subscribe_finish; //当前轮是否开启

//				console.log(AntExchange01, AntExchange02, AntExchange03, AntExchange04)
				if($(".RedemptionBox02>div>span").text() == languageArr["Token"] || $(".RedemptionBox02>div>span").text() == languageArr["Asset"]) {
					var RubyNumber = Number($(".RedemptionBox03 .price").text())
				} else {
					var RubyNumber = Number($(".RedemptionBox02>input").val())
				}

				if(AntExchange05 == 1) {
					return alert("本轮已结束")
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
			}else{
				alert(languageArr["loging2.0_266"])
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
				if($(".RedemptionBox01Select>span").text() == languageArr["Token"] || $(".RedemptionBox01Select>span").text() == languageArr["Asset"]) {
					if($(".RedemptionBox02>div>span").text() == languageArr["Token"] || $(".RedemptionBox02>div>span").text() == languageArr["Asset"]) {
						var RubyNumber = Number($(".RedemptionBox03 .price").text())
					} else {
						var RubyNumber = Number($(".RedemptionBox02>input").val())
					}

					var Time = new Date().getTime();
					wallet.signMessage(sha256_digest(Time + token)).then(signature => {
						antSubscribe(userId, token, RubyNumber, signature, Time , tokenState)
					})

					return
				}
			} else {
				alert(languageArr["loging2.0_201"])
			}
		})
	}  else if(title == "我的锁仓(Ruby)" || title === 'My lock(Ruby)') {
		function formatDate1(now) {　　
			var year = now.getFullYear(),
				　　month = now.getMonth() + 1,
				　　date = now.getDate(),
				　　hour = now.getHours(),
				　　minute = now.getMinutes(),
				　　second = now.getSeconds();
			if(minute < 10) {
				minute = "0" + minute
			}
			if(hour < 10) {
				hour = "0" + hour
			}　　
			return year + "-" + month + "-" + date + " " + hour + ":" + minute;
		}
		var offset = 0;
		var lockId;

		function getLockInfoFun() {
			getLockInfo(userId, token, offset)
			if(getLockInfoArr.data == undefined) {
				return false
			}
			getLockInfoArr.data.forEach(function(item) {
				withdrawTime = formatDate1(new Date(item.nextClaimUnlockTime * 1000))
				$("#allRecord").append(
					'<li class="mui-table-view-cell mui-transitioning lockDis"><div class="mui-slider-right mui-disabled">' +
					'</div><div class="mui-slider-handle"><div class="mui-slider-handle-left"><div><img src="../../img/lock.png" />' +
					'<span>LOCK_' + item.createTime + '</span></div><div><span>' + languageArr["loging2.0_239"] + '</span><span>' + withdrawTime + '</span></div><div><span>' + languageArr["loging2.0_240"] + '</span>' +
					'<span>' + item.lockTotalAmount.toFixed(8) + '</span></div><div><span>' + languageArr["loging2.0_241"] + '</span><span>' + item.unlockTotalAmount.toFixed(8) + '</span></div><div class="Rubytran"><span>' + languageArr["loging2.0_242"] + '</span><span>' + item.transactionNumber.substring(0, 32) + '</span></div></div><div class="mui-slider-handle-right">' +
					'<p>' + item.unclaimLock.toFixed(8) + '</p><span>（' + languageArr["loging2.0_243"] + '）</span></div></div></li>'
				)
			})
		}
		//			'<li class="mui-table-view-cell mui-transitioning lockDis"><div class="mui-slider-right mui-disabled"><span data-id="'+item.id+'" class="mui-btn mui-icon green with lingqusuocang">'+
		//			'<div><img style="width: 1.222222rem; height: 1.222222rem;" src="../../img/earnings.png" /><span>'+languageArr["loging2.0_244"]+'</span>'+
		//			'</div></span></div><div class="mui-slider-handle"><div class="mui-slider-handle-left"><div><img src="../../img/lock.png" />'+
		//			'<span>LOCK_'+item.createTime+'</span></div><div><span>'+languageArr["loging2.0_239"]+'</span><span>'+withdrawTime+'</span></div><div><span>'+languageArr["loging2.0_240"]+'</span>'+
		//			'<span>'+item.lockTotalAmount.toFixed(8)+'</span></div><div><span>'+languageArr["loging2.0_241"]+'</span><span>'+item.unlockTotalAmount.toFixed(8)+'</span></div><div class="Rubytran"><span>'+languageArr["loging2.0_242"]+'</span><span>'+item.transactionNumber.substring(0,32)+'</span></div></div><div class="mui-slider-handle-right">'+
		//			'<p>'+item.unclaimLock.toFixed(8)+'</p><span>（'+languageArr["loging2.0_243"]+'）</span></div></div></li>'
		getLockInfoFun()
		offset += 10
		getLockInfoFun()
		//		function getLockInfoFunFor(){
		//			getLockInfoFun()
		//			if(getLockInfoArr.data.length>=10){
		//				offset+=10;
		//				getLockInfoFun()
		//				getLockInfoFunFor()
		//			}
		//		}
		//		getLockInfoFunFor()

		$("li").on("tap", ".lingqusuocang", function() {
			//本地json PrivateKeyJosn  
			//key     id666
			lockId = $(this).attr("data-id")
			$(".publicPas").css("visibility", "visible")
			$(".publicPas").fadeIn()
			//			drawLockWarehouse(userId,token,lockId,sourceStr,secretKey,Time)
		})

		$(".MyContractBottom>p").on("tap", function() {
			lockId = ""
			$(".publicPas").css("visibility", "visible")
			$(".publicPas").fadeIn()
		})

		$(".publicPasTitleDown").on("tap", function() {
			$(".publicPas").css("visibility", "hidden")
			$(".publicPas").fadeOut()
			$(".publicPasInput>input").val("")
		})

		$(".publicPasBut>button").on("tap", function() {
			var password = $(".publicPasInput>input").val();
			if(android != undefined) {
				var Password = sha256_digest(PrivateKeyJosn[id666].Password);
			} else {
				var Password = PrivateKeyJosn[id666].Password;
			}
			var privateKey = PrivateKeyJosn[id666].privateKey;
			var Time = new Date().getTime();
			var TimeToken = Time + token;

			if(Password == sha256_digest(password)) {
				var walletData = new ethers.Wallet(privateKey);
				walletData.signMessage(sha256_digest(TimeToken)).then(signature => {
					drawLockWarehouse(userId, token, 2, lockId, signature, Time)
					if(drawLockWarehouseArr.code == 1) {
						alert("领取成功")
					} else {
						alert(drawLockWarehouseArr.message)
						$(".publicPas").css("visibility", "hidden")
						$(".publicPas").fadeOut()
						$(".publicPasInput>input").val("")
					}
					console.log(drawLockWarehouseArr)
				})

			} else {
				alert(languageArr["loging2.0_201"])
			}
		})

		console.log(getLockInfoArr)
	} else if(title == "详情(RUB)" || title === 'Details(RUB)' || title == "详情(WBC)") {
		function formatDate1(now) {　　
			var year = now.getFullYear(),
				　　month = now.getMonth() + 1,
				　　date = now.getDate(),
				　　hour = now.getHours(),
				　　minute = now.getMinutes(),
				　　second = now.getSeconds();
			if(minute < 10) {
				minute = "0" + minute
			}
			if(hour < 10) {
				hour = "0" + hour
			}　　
			return year + "-" + month + "-" + date + " " + hour + ":" + minute;
		}
		if(GetQueryString("AntExchange")=="1") {
			getCashInfo(userId, token, GetQueryString("id"))
			$(".RubyDetailsBox>img").attr("src", "../../img/RubyDetails02.png")
			$(".RubyDetailsBox>p").text(languageArr["loging2.0_217"])
			$(".RubyDetails01").text(formatDate1(new Date(getCashInfoArr.data.createTime * 1000)))
			$(".RubyDetails02").text(getCashInfoArr.data.convertAmount)
			$(".RubyDetails03").text(getCashInfoArr.data.targetAmount)
			$(".RubyDetails07").text("ANT")
			$(".RubyDetails08,.RubyDetails09,.RubyDetails10").hide()
			console.log(getCashInfoArr)
			return
		}else if(GetQueryString("AntExchange")=="2"){
			getSubscribeInfo(userId, token, GetQueryString("id"))
			if(getSubscribeInfoArr.data.sourceCoinName == "SCORE"){
				var sourceCoinName = languageArr["Asset"]
			}else{
				var sourceCoinName = languageArr["Token"]
			}
			$(".loginTitle").text("详情(RUB)")
			$(".RubyDetailsBox>img").attr("src", "../../img/RubyDetails02.png")
			$(".RubyDetailsBox>p").text(languageArr["loging2.0_217"])
			$(".RubyDetails01").text(formatDate1(new Date(getSubscribeInfoArr.data.createTime * 1000)))
			$(".RubyDetails02").text(getSubscribeInfoArr.data.convertAmount)
			$(".RubyDetails03").text(getSubscribeInfoArr.data.targetAmount)
			$(".RubyDetails07").html("&nbsp"+sourceCoinName)
			$(".RubyDetails11").html("&nbspRUB")
			$(".RubyDetails08,.RubyDetails09,.RubyDetails10").hide()
			return
		}
		getFlashConvertInfo(userId, token, GetQueryString("id"))
		if(getFlashConvertInfoArr.data.status == 1 || getFlashConvertInfoArr.data.status == 10 || getFlashConvertInfoArr.data.status == 20) {
			$(".RubyDetailsBox>img").attr("src", "../../img/RubyDetails02.png")
			$(".RubyDetailsBox>p").text(languageArr["loging2.0_217"])
		} else {
			$(".RubyDetailsBox>p").text(languageArr["loging2.0_216"])
		}
		$(".RubyDetails01").text(formatDate1(new Date(getFlashConvertInfoArr.data.createTime * 1000)))
		$(".RubyDetails02").text(getFlashConvertInfoArr.data.sourceAmount)
		$(".RubyDetails03").text(getFlashConvertInfoArr.data.targetAmount)
		$(".RubyDetails04").text(getFlashConvertInfoArr.data.fromAddress)
		$(".RubyDetails05").text(getFlashConvertInfoArr.data.toAddress)
		$(".RubyDetails06").text(getFlashConvertInfoArr.data.transactionNumber)
	} else if(title === '下载(Ruby)') {
		$("button").on("tap", function() {
			switch($(this).attr("data-status")) {
				case "download":
					if(android != undefined) {
						if(ANT.isInstallApp() == true) {
							return alert(languageArr["loging2.0_271"])
						}
					} else {
						if(DAPPFramework.Controller.CanOpenURL("rubyChainWallet://") == true) {
							return alert(languageArr["loging2.0_271"])
						}
					}
					$(".RubyDownload01,.RubyDownload02").remove()
					if(android != undefined) {
						ANT.downloadApp("http://rubychain.org/download/latest/ruby/rubychain.wallet.apk")
					} else {
						window.location.href = "itms-services://?action=download-manifest&url=https://download.rubychain.org/download/latest/ruby/rubychain.wallet.plist"
					}
					$(".RubyDownloadBox").prepend("<span class='RubyDownload03'>"+languageArr["loging2.0_271"]+"</span>")
					$(this).text(languageArr["loging2.0_273"])
					$(this).attr("data-status", "trust")
					break;
				case "trust":
					if(android != undefined) {
						if(ANT.isInstallApp() == false) {
							return alert(languageArr["loging2.0_274"])
						}
					} else {
						if(DAPPFramework.Controller.CanOpenURL("rubyChainWallet://") == false) {
							return alert(languageArr["loging2.0_274"])
						}
					}
					$(".RubyDownload03").remove()
					$(".RubyDownloadBox").prepend("<input class='RubyDownload05' type='text' onfocus='inputFocus()' id='dom' placeholder='address' data-value="+languageArr["loging2.0_278"]+" />")
					$(".RubyDownloadBox").prepend("<p class='RubyDownload04'>"+languageArr["loging2.0_277"]+":</p>")
					$(this).text(languageArr["loging2.0_276"])
					$(this).attr("data-status", "BinDing")
					break;
				case "BinDing":
					if($(".RubyDownload05").val() == undefined || $(".RubyDownload05").val() == "" || $(".RubyDownload05").val() == null) {
						return alert(languageArr["loging2.0_275"])
					}
					allotVirtualAddress(userId, token, 2, 0, $(".RubyDownload05").val())
					if(allotVirtualAddressArr.code == 1) {
						$(".PublicMask").css("display", "flex")
						setTimeout(function() {
							if(android != undefined) {
								ANT.openApp()
								ANT.goThisBackPage()
							} else {
								DAPPFramework.Controller.OpenURL("rubyChainWallet://")
								DAPPFramework.View.PopView();
							}
						}, 1000)
					} else {
						alert(allotVirtualAddressArr.message)
					}
					break;
			}
		})

		$(".PublicMask").on("tap", function() {
			if(android != undefined) {
				ANT.goThisBackPage()
			} else {
				DAPPFramework.View.PopView();
			}
		})

		if(android != undefined) {
			if(ANT.isInstallApp() == true) {
				getVirtualAddress(userId, token, 2, 0)
				if(getVirtualAddressArr.data == undefined) {
					$(".RubyDownload01,.RubyDownload02,.RubyDownload03").remove()
					$(".RubyDownloadBox").prepend("<input class='RubyDownload05' type='text' onfocus='inputFocus()' id='dom' placeholder='address'  data-value="+languageArr["loging2.0_278"]+" />")
					$(".RubyDownloadBox").prepend("<p class='RubyDownload04'>"+languageArr["loging2.0_277"]+":</p>")
					$("button").text(languageArr["loging2.0_276"])
					$("button").attr("data-status", "BinDing")
				} else {
					ANT.openApp()
					ANT.goThisBackPage()
				}
			}
		} else {
			if(DAPPFramework.Controller.CanOpenURL("rubyChainWallet://") == true) {
				getVirtualAddress(userId, token, 2, 0)
				if(getVirtualAddressArr.data == undefined) {
					$(".RubyDownload01,.RubyDownload02,.RubyDownload03").remove()
					$(".RubyDownloadBox").prepend("<input class='RubyDownload05' type='text' onfocus='inputFocus()' placeholder='address'  data-value="+languageArr["loging2.0_278"]+" />")
					$(".RubyDownloadBox").prepend("<p class='RubyDownload04'>"+languageArr["loging2.0_277"]+":</p>")
					$("button").text(languageArr["loging2.0_276"])
					$("button").attr("data-status", "BinDing")
				} else {
					DAPPFramework.Controller.OpenURL("rubyChainWallet://")
					DAPPFramework.View.PopView();
				}
			}
		}

	} else if(title === '开通授权(RUB)') {
		var file2 = $.ajax({
			url: "../../js/AntChangerAuth.abi",
			async: false
		});
		contractAddress2 = '0x5ed0b2015d482e82a4e021f17f02a6123b031710',
			fileText2 = file2.responseText,
			abi2 = eval('(' + fileText2 + ')'),
			//provider = new ethers.providers.JsonRpcProvider("http://103.251.112.93:1107"),
			wallet = new ethers.Wallet(privateKey666, providerArr[random]),
			contract2 = new ethers.Contract(contractAddress2, abi2, providerArr[random]),
			contractWithSigner2 = contract2.connect(wallet);

		//矿工费拖动效果
		var stp = document.querySelector('.js-step');
		var initStp = new Powerange(stp, {
			start: 0,
			step: 50
		});

		console.log(contractWithSigner2)

		//密码消失按钮
		$(".publicPasTitle>p").on("tap", function() {
			$(".publicPas").fadeOut()
			$(".publicPasInput>input").val("")
		})

		$(".RubyAuthorization>button").on("tap", function() {
			alert("激活功能暂时关闭")
//			contractWithSigner2.CheckAuth(wallet.address).then(data => {
//				if(data == false) {
//					$(".publicPas").css("visibility", "visible")
//					$(".publicPas").fadeIn()
//					providerArr[random].getGasPrice().then(gasPrice => {
//						contractWithSigner2.GetMinLimit().then(data => {
//							contractWithSigner2.estimate.ApplyExchangeAuth({
//								gasLimit: gasLimit,
//								gasPrice: gasPrice,
//								value: data
//							}).then(result => {
//								GasLimit = result;
//								GasPrice = convert(gasPrice, 200);
//								$('.gasPrice').text(Number(ethers.utils.formatEther(ethers.utils.parseEther(GasPrice) * result)).toFixed(8));
//								watchRange(gasPrice, result);
//							})
//						})
//					})
//				} else {
//					alert("本地址已开通权限")
//				}
//			})
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
				if(typeof(GasPrice) != "object") {
					GasPrice = ethers.utils.parseEther(GasPrice)
				}

				contractWithSigner2.GetMinLimit().then(data => {
					console.log( GasLimit.toString(), GasPrice.toString(), Number(data) )
					contractWithSigner2.ApplyExchangeAuth({
						gasLimit: GasLimit,
						gasPrice: GasPrice,
						value: data,
					}).then(result => {
						console.log(result)
						applyCashPermission(userId, token, 2, result.hash)
						if(applyCashPermissionArr.code == 1) {
							alert("等待确认中")
							if(android != undefined) {
								ANT.goThisBackPage()
							} else {
								DAPPFramework.View.PopView();
							}
						} else {
							alert(applyCashPermissionArr.message)
						}
					}).catch(error => {
						if(error.code == "INSUFFICIENT_FUNDS") {
							alert("ETH余额不足")
						} else {
							alert(error.code)
						}
					})
				})
				//				contractWithSigner1.DespositToChangeRuby({
				//					gasLimit: GasLimit,
				//					gasPrice: GasPrice,
				//					value: ethers.utils.parseEther(EthValue),
				//				}).then(result => {					
				//					flashConvert(userId,token,EthValue,result.hash)
				//					if(flashConvertArr.code==1){
				//						$(".publicPas").css("visibility","hidden")
				//						$(".publicPas").fadeOut()
				//						$(".publicPasInput>input").val("")
				//						
				//						$(".exchangeList").empty()
				//						getFlashConvertListOffset=0
				//						shanduiliebiao(getFlashConvertListOffset)
				//						
				//						if(android!=undefined){
				//							if(localStorage.getItem("set-lan")=="EN"){
				//								mui.confirm("","The transaction has been submitted, please wait for confirmation",["Cancel","Confirm"],"","div")
				//							}else{
				//								mui.confirm("","交易已提交，请等待确认",["取消","确定"],"","div")
				//							}		
				//						}else{							
				//							if(localStorage.getItem("set-lan")=="EN"){
				//								DAPPFramework.Dialog.Alert("","The transaction has been submitted, please wait for confirmation",["Cancel","Confirm"],[0,2],"")
				//							}else{
				//								DAPPFramework.Dialog.Alert("","交易已提交，请等待确认",["取消","确定"],[0,2],"")
				//							}	
				//						}
				//					}
				//					console.log(result);
				//				}).catch(error=>{
				//					console.log(error)
				//					if(error.code=="INSUFFICIENT_FUNDS"){
				//						alert("ETH余额不足")
				//					}else{
				//						alert("请等待上一笔交易确认")
				//					}
				//					$(".publicPas").css("visibility","hidden")
				//					$(".publicPas").fadeOut()
				//					$(".publicPasInput>input").val("")
				//				})
			} else {
				alert(languageArr["loging2.0_201"])
			}
		})

	}
}
//DAPPFramework.SharedBoard.Set=DAPPFramework.SharedBoard.Set
//DAPPFramework.Storage.Set=DAPPFramework.Storage.Set()