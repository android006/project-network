//login登录弹窗
function login(){
	var oWrap = document.getElementById("wrap");
	var oBtn = document.getElementById("btn");
	var oBox = document.getElementById("box");
	var oClose = document.getElementById("close");
	var oW=0,oH=0;
	
	oBtn.onclick=function(){
		oWrap.style.display='block';
		msg()
	}
	
	window.onresize=function(){
		msg()
	};
	
	oClose.onclick=function(){
		oWrap.style.display='none';
	};
			
	function msg(){
		oW= document.documentElement.clientWidth;
		oH= document.documentElement.clientHeight;
		oBox.style.left =( oW-oBox.offsetWidth)/2+'px';
		oBox.style.top =( oH-oBox.offsetHeight)/2+'px';
	}
}
login();


//顶部购物车的显示隐藏
function toggle(){
	var oTopLi=document.getElementById("top_right_li")
	var oIco = document.getElementById("ico");
	var oToggle=document.getElementById("Top_toggle")
	var oUl = document.getElementById("input_ul")
	var oIco1 = document.getElementById("ico1")
	var oLis=oUl.getElementsByTagName('li');
	var oSeach = document.getElementById("Logo_searh")
	var oInput = document.getElementById("input_txt")
	
	oTopLi.onclick=function(ev){
		var ev = ev || event;
		oToggle.style.display = 'block'
		oIco.style.backgroundPositionY=-38+'px'
		ev.cancelBubble = true;
	}
	oSeach.onclick=function(ev){
		var ev = ev || event
		ev.cancelBubble=true;
		oInput.style.display='block'
		oIco1.style.backgroundPositionY=-38+'px'
	}
	document.body.onclick=click;
	function click(){
		document.onclick=function(){
		oInput.style.display='none'
		oIco1.style.backgroundPositionY=-30+'px'
		}
		oToggle.style.display = 'none'
		oIco.style.backgroundPositionY=-30+'px'
	}
}
toggle();



//banner图的滚动
function banner(){
	var oView = document.getElementById("view");
	var oBanNav = document.getElementById("banner_nav");
	var oBtnL = document.getElementById("btn_L");
	var oBtnR = document.getElementById("btn_R");
	var oUl = oView.getElementsByTagName('ul')[0];
	var aLis = oUl.children;
	var oOl = document.getElementsByTagName('ol')[0];
	var oBnts = oOl.children;
	var oW= 0;
	oUl.innerHTML+=oUl.innerHTML;
	var oLiWidth = aLis[0].offsetWidth;
	oUl.style.width = aLis[0].offsetWidth*aLis.length + 'px';
	oW= document.documentElement.clientWidth;
	var iNum=0;
	var timer = null;
	//计算轮播图居中
	oView.style.left = -(oView.offsetWidth - oW)/2 +'px';
	
	//当窗口改变的时候重新计算轮播图居中
	window.onresize=function(){
		oW= document.documentElement.clientWidth;
		oView.style.left = -(oView.offsetWidth - oW)/2 +'px';
	};
	oBtnR.onclick=autoPlay;
	timer = setInterval(autoPlay,3000);
	function autoPlay(){
			iNum++;
			if(iNum==aLis.length/2+1){
				oUl.style.left = oUl.offsetLeft + oUl.offsetWidth/2+'px'
				iNum=1;
			}
			for(var i=0; i<oBnts.length;i++){
				oBnts[i].className='';
			};
			if(iNum==aLis.length/2){
				oBnts[0].className='active';
			}else{
				oBnts[iNum].className='active';
			}
		animate(oUl,{'left': -iNum*oLiWidth});
	}
	oBtnL.onclick=function(){
			iNum--;
			if(iNum<0){
				oUl.style.left =- oUl.offsetWidth/2+'px'
				iNum=aLis.length/2-1;
			};
			for(var i=0; i<oBnts.length;i++){
				oBnts[i].className='';
			};
			oBnts[iNum].className='active';
			animate(oUl,{'left': -iNum*oLiWidth});
	};
	for(var i =0; i<oBnts.length;i++){
		oBnts[i].index=i;
		oBnts[i].onclick=function(){
			for(var i =0; i<oBnts.length;i++){
				oBnts[i].className='';
			}
			oBnts[this.index].className='active';
			iNum=this.index;
			animate(oUl,{'left': -this.index*oLiWidth});
		}
	};
	oBanNav.onmouseover=function(){
		clearInterval(timer)
	}
	oBanNav.onmouseout=function(){
		timer = setInterval(autoPlay,3000)
	}
}
banner()

//banner图左侧导航栏
function leftNav(){
	var oBanNav = document.getElementById('banner_ul');
	var alis = oBanNav.getElementsByTagName("li");
	var oSub = getClass(document,"banner_sub")
	for (var i=0; i <alis.length;i++) {
		alis[i].index=i
		alis[i].onmouseover=function(){
			for (var i=0; i <alis.length;i++) {
				oSub[i].style.display='none'
			}
			oSub[this.index].style.display='block'
			alis[this.index].onmouseout=function(){
				oSub[this.index].style.display='none'
			}
		}
	}	
}
leftNav();

//施工团队选项卡
function select(){
	var oTeam = document.getElementById("team")
	var oTeamUl = document.getElementById("team_ul")
	var oUl = oTeamUl.children;
	var oTeamContent = getClass(oTeam,"team_content")
	oTeamContent[0].style.display='block';
	for (var i=0;i<oUl.length;i++) {
		oUl[i].index=i;
		oUl[i].onclick=function(){
			for (var i=0;i<oUl.length;i++){
				oUl[i].className='';
				oTeamContent[i].style.display='none';
			}
			oUl[this.index].className='team_ul_active';
			oTeamContent[this.index].style.display='block';
		}
	}
}
select();

//返回顶部及顶部导航栏的滑出
function backTop(){
	var oTopP = document.getElementById("top");
	var oBtn = document.getElementById("back");
	var oTop = 0;
	var timer = null;
	var off = true;
	window.onscroll=function(){
		oTop = document.documentElement.scrollTop || document.body.scrollTop;
		
		//顶部导航栏的滑出
		if(oTop>50){
			animate(oTopP,{'top':0})
		}else{
			animate(oTopP,{'top':-35})
		};
		
		//返回顶部按钮
		if(oTop>300){
			oBtn.style.display='block'
		}else{
			oBtn.style.display='none'
		};
		
		if(!off){
			clearInterval(timer)
		}
		off=false;
		
	};
	oBtn.onclick=function(){
		timer=setInterval(function(){
			var backTop = Math.floor(oTop/7);
			if(backTop == 0){
				clearInterval(timer)
				document.documentElement.scrollTop = document.body.scrollTop=0
			}else {
				if (document.documentElement.scrollTop) {
					document.documentElement.scrollTop-=backTop
				} else{
					document.body.scrollTop-=backTop;
				}
				off=true;
			}
		},30)
	}
}
backTop();

//无缝轮播
function AutoPlay(){
	var oRushV= document.getElementById("rush_view");
	var oUl = oRushV.getElementsByTagName("ul")[0];
	var aLis = oUl.getElementsByTagName("li");
	var timer = null;
	var i=3;
	
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width = aLis[0].offsetWidth*aLis.length+'px';
	
	timer =setInterval(play,30)
	function play(){
		if(oUl.offsetLeft==-(oUl.offsetWidth/2)){
			oUl.style.left=0;
		}else if(oUl.offsetLeft>0){
			oUl.style.left=-(oUl.offsetWidth/2)+'px';
		}
		oUl.style.left = oUl.offsetLeft+i+'px';	
	}
	oRushV.onmouseover=function(){
		clearInterval(timer);
	}
	oRushV.onmouseout=function(){
		timer=setInterval(play,30)
	}
}
AutoPlay();
