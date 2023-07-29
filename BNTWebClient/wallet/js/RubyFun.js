	function shanduihuil(){
		function formatDate1(now) {
		  　　var year = now.getFullYear(),
		  　　month = now.getMonth() + 1,
		  　　date = now.getDate(),
		  　　hour = now.getHours(),
		  　　minute = now.getMinutes(),
		  　　second = now.getSeconds();
		  	if(minute<10){
		  		minute="0"+minute
		  	}
		  	if(hour<10){
		  		hour="0"+hour
		  	}
		  　　return month + "/" + date;
		}
		
		getFlashConvertRate(userId,token,0,2,1,1)
		
		xAxisData=[];
		seriesData=[];
		getFlashConvertRateArr.data.rateTrend.forEach(function(item){
			seriesData.unshift(item.rate)
			xAxisData.unshift(formatDate1(new Date(item.time*1000)))
		})
		// 基于准备好的dom，初始化echarts实例
	    var myChart = echarts.init(document.getElementById('exchange'));

	    // 指定图表的配置项和数据
	    var option = {
	        tooltip: {
	        	trigger: 'axis'
	        },
	        xAxis: {
	            data: xAxisData,
	            axisLabel:{
	            	interval: 0,
//	            	formatter:function(value){
//                      var result = "";//拼接加\n返回的类目项
//                      var maxLength = 5;//每项显示文字个数
//                      var valLength = value.length;//X轴类目项的文字个数
//                      var rowNumber = Math.ceil(valLength / maxLength); //类目项需要换行的行数
//                      if (rowNumber > 1)//如果文字大于3,
//                      {
//                          for (var i = 0; i < rowNumber ; i++) {
//                              var temp = "";//每次截取的字符串
//                              var start = i * maxLength;//开始截取的位置
//                              var end = start + maxLength;//结束截取的位置
//                              temp = value.substring(start, end) + "\n";
//                              result += temp; //拼接生成最终的字符串
//                          }
//                          return result ;
//                      }
//                      else {
//                          return value;
//                      }
//                  }
	            }
	        },
	        yAxis: {},
	        series: [{
	            name: '汇率',
	            type: 'line',
	            data: seriesData,
	        }],
	        grid:{
	            x:50,
	            y:10,
	            x2:15,
	            y2:45,
	            borderWidth:1
	       	},
	    };
		
	    // 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
	}
	
	function shanduihuil01(){
		function formatDate1(now) {
		  　　var year = now.getFullYear(),
		  　　month = now.getMonth() + 1,
		  　　date = now.getDate(),
		  　　hour = now.getHours(),
		  　　minute = now.getMinutes(),
		  　　second = now.getSeconds();
		  	if(minute<10){
		  		minute="0"+minute
		  	}
		  	if(hour<10){
		  		hour="0"+hour
		  	}
		  　　return month + "/" + date;
		}
		getFlashConvertRate(userId,token,0,1,4,2)
		xAxisData=[];
		seriesData=[];
		getFlashConvertRateArr.data.rateTrend.forEach(function(item){
			seriesData.unshift(item.price)
			xAxisData.unshift(formatDate1(new Date(item.time*1000)))
		})
		
		// 基于准备好的dom，初始化echarts实例
	    var myChart = echarts.init(document.getElementById('exchange'));
	    // 指定图表的配置项和数据
	    var option = {
	        tooltip: {
	        	trigger: 'axis'
	        },
	        xAxis: {
	            data: xAxisData,
	            axisLabel:{
	            	interval: 0
	            }
	        },
	        yAxis: {},
	        series: [{
	            name: '价格',
	            type: 'line',
	            data: seriesData,
	        }],
	        grid:{
	            x:50,
	            y:10,
	            x2:15,
	            y2:45,
	            borderWidth:1
	       	},
	    };
	
	    // 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
	}
	
	function shanduiliebiao(getFlashConvertListOffset){
		function formatDate1(now) {
		  　　var year = now.getFullYear(),
		  　　month = now.getMonth() + 1,
		  　　date = now.getDate(),
		  　　hour = now.getHours(),
		  　　minute = now.getMinutes(),
		  　　second = now.getSeconds();
		  	if(minute<10){
		  		minute="0"+minute
		  	}
		  	if(hour<10){
		  		hour="0"+hour
		  	}
		  　　return month + "-" + date+" " +hour+":"+minute;
		}
		getFlashConvertList(userId,token,getFlashConvertListOffset)
		if(getFlashConvertListArr.data!=undefined){			
			getFlashConvertListArr.data.forEach(function(item){
				if(item.status==1 || item.status==10 || item.status==20){
					status="exchangegreen"
					statusyiwancheng=languageArr["loging2.0_217"]
					time=formatDate1(new Date(item.affirm1Time*1000))
				}else{
					status="exchangeRed"
					time=formatDate1(new Date(item.createTime*1000))
					statusyiwancheng=languageArr["loging2.0_216"]
				}
				$(".exchangeList").append(
					"<li data-id="+item.id+">"+
						"<p class='"+status+"'>"+statusyiwancheng+"</p>"+
						"<div>"+
							"<div>"+															
								"<img src='../../img/exchangeduihuan.png' />"+
								"<div>"+
									"<div><span>ETH</span><span>"+item.sourceAmount+"</span></div>"+
									"<div><span>RUB</span><span>"+item.targetAmount+"</span></div>"+
								"</div>"+
							"</div>"+
							"<img src='../../img/exchangefanhui.png' />"+
						"</div>"+
						"<span>"+time+"</span>"+
					"</li>"
				)
			})
		}
	}
	
	
	function shanduiliebiao01(getFlashConvertListOffset01){
		function formatDate1(now) {
		  　　var year = now.getFullYear(),
		  　　month = now.getMonth() + 1,
		  　　date = now.getDate(),
		  　　hour = now.getHours(),
		  　　minute = now.getMinutes(),
		  　　second = now.getSeconds();
		  	if(minute<10){
		  		minute="0"+minute
		  	}
		  	if(hour<10){
		  		hour="0"+hour
		  	}
		  　　return month + "-" + date+" " +hour+":"+minute;
		}
		getCashList(userId,token,2,getFlashConvertListOffset01)
		if(getCashListArr.data!=undefined){			
			getCashListArr.data.forEach(function(item){
				status="exchangegreen"
				statusyiwancheng=languageArr["loging2.0_217"]
				time=formatDate1(new Date(item.createTime*1000))
				$(".exchangeList").append(
					"<li data-id="+item.id+">"+
						"<p class='"+status+"'>"+statusyiwancheng+"</p>"+
						"<div>"+
							"<div>"+															
								"<img src='../../img/exchangeduihuan.png' />"+
								"<div>"+
									"<div><span>ANT</span><span>"+item.convertAmount+"</span></div>"+
									"<div><span>RUB</span><span>"+item.targetAmount+"</span></div>"+
								"</div>"+
							"</div>"+
							"<img src='../../img/exchangefanhui.png' />"+
						"</div>"+
						"<span>"+time+"</span>"+
					"</li>"
				)
			})
		}
	}
	
	function shanduiliebiao02(getFlashConvertListOffset02){
		function formatDate1(now) {
		  　　var year = now.getFullYear(),
		  　　month = now.getMonth() + 1,
		  　　date = now.getDate(),
		  　　hour = now.getHours(),
		  　　minute = now.getMinutes(),
		  　　second = now.getSeconds();
		  	if(minute<10){
		  		minute="0"+minute
		  	}
		  	if(hour<10){
		  		hour="0"+hour
		  	}
		  　　return month + "-" + date+" " +hour+":"+minute;
		}
		getSubscribeList(userId,token,getFlashConvertListOffset02)
		if(getSubscribeListArr.data!=undefined){			
			getSubscribeListArr.data.forEach(function(item){
				status="exchangegreen"
				if(item.sourceCoinName == "SCORE"){
					var sourceCoinName = languageArr["Asset"]		
				}else{
					var sourceCoinName = languageArr["Token"]
				}
				statusyiwancheng = languageArr["loging2.0_217"]
				time=formatDate1(new Date(item.createTime*1000))
				$(".exchangeList").append(
					"<li data-id="+item.id+">"+
						"<p class='"+status+"'>"+statusyiwancheng+"</p>"+
						"<div>"+
							"<div>"+															
								"<img src='../../img/exchangeduihuan.png' />"+
								"<div>"+
									"<div><span>"+sourceCoinName+"</span><span>"+item.sourceAmount+"</span></div>"+
									"<div><span>积分</span><span>"+item.targetAmount+"</span></div>"+
								"</div>"+
							"</div>"+
							"<img src='../../img/exchangefanhui.png' />"+
						"</div>"+
						"<span>"+time+"</span>"+
					"</li>"
				)
			})
		}
	}

	