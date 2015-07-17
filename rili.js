
try{
	rili();
}catch (e){
	console.log(e)	
}


function rili()
{
	var oRiliBox=getByClass(document,'calendarBox')[0];
	var oHead=getByClass(oRiliBox,'head')[0];
	var oDay=getByClass(oRiliBox,'day')[0];
	var oHeadDay=getByClass(oRiliBox,'head_day')[0];
	var oDayDate=getByClass(oRiliBox,'dayDate')[0];
	
	var oPrev=getByClass(oRiliBox,'prevx')[0];
	var oNext=getByClass(oRiliBox,'nextx')[0];
	var arrWeek=['日','一','二','三','四','五','六'];
	iNow=0;
	function setDay() //将日期先调到下个月，再将天数调为0 回到上个月最后一天
	{
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		oDate.setMonth((oDate.getMonth()+1));
		oDate.setDate(0);
		return oDate.getDate();
	}
	// 上个月
   function prevDays()
   {
	   var oDate=new Date();
	   oDate.setMonth(oDate.getMonth()+iNow);
	   oDate.setMonth(oDate.getMonth(),0); 
	   return oDate.getDate();
   };
	function nextDays()
	{
		var oDate=new Date();
		
		oDate.setMonth(oDate.getMonth()+iNow+1);
		oDate.setMonth(oDate.getMonth()+2,0); 
		
		return oDate.getDate();
	};
   
	// 算出本月第一天是星期几
	function firstDay()
	{
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		oDate.setDate(1);
		return oDate.getDay();
		 // 0-6   星期天是0
	};
	// 算出下个月第一天是星期几
	function lastDay()
	{
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow+1);
		oDate.setDate(1);
		return oDate.getDay();
		 // 0-6   星期天是0
	};
	// 得到一个数组 数组里面是上个月余下的天数如[27,28,29,30,31];
	
	function getDaysNum(alldays,daynum,type){ // 获取需要补充的天数
		var nums=[];
		for(var i=0; i<alldays; i++){
			nums.push(i+1)
		};
		
		if(type===0){
			nums=nums.splice(nums.length-daynum,daynum);
			 //alert()
		}else if(type===1){
			nums=nums.splice(0,7-daynum);
		}
		
		return nums;
	}
	
	DayTime();
	function DayTime()
	{
		oDay.innerHTML='';

		var oDaynum=setDay();
		
		
		//接收本月第一天是星期几
	    var firstWeek=firstDay();
	    if(firstWeek==0)firstWeek=7;
	    firstWeek--;
		var prevdays=prevDays();//
		var getLsatDays=getDaysNum(prevdays,firstWeek,0);
		// 处理一个月之前的天数
	    for(var i=0;i<firstWeek;i++)
		{
			var oLi=document.createElement('li');
			oLi.innerHTML=getLsatDays[i];
			addClass(oLi,'ccc');
			oDay.appendChild(oLi);
		}
		
		
		
		//接收本月有几天
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		var d=oDate.getDate();	
		
		var days=setDay();
		//根据本月有多少天创建LI
		for(var i=0;i<days;i++)
		{
			var oLi=document.createElement('li');
			oLi.innerHTML=tozero(i+1);
			
			addClass(oLi,'nowMonth');
			oDay.appendChild(oLi);
		};

		
	   // 在本月补充下个月的天数 
	   var lastDays=lastDay();
	   if(lastDays==0)lastDays=7;
	   lastDays--;
	   var oNextDays=nextDays();

	    var getoNextDays=getDaysNum(oNextDays,lastDays,1);
	
	    for(var i=0;i<7-lastDays;i++)
		{
			var oLilast=document.createElement('li');

			oLilast.innerHTML=getoNextDays[i]; 
			
			//oLilast.className='ccc';
			addClass(oLilast,'ccc');
			oDay.insertBefore(oLilast,oDay.children[oDay.children.length]);
			
		};
		
		var oMonth=getByClass(document,'today')[0];
		oMonth.innerHTML=tozero(oDate.getMonth()+1);
		var oYears=getByClass(document,'nowYear')[0];
		oYears.innerHTML=oDate.getFullYear();

		var aLi=oDay.getElementsByTagName('li');
		
		
		var oNowMonth=getByClass(oDayDate,'nowMonth');
		
		if(iNow<0)
		{
			for(var i=0; i<aLi.length; i++)
			{
				addClass(aLi[i],'smallDay');
			}
		}else if(iNow==0)
		{
			for(var i=0; i<oNowMonth.length; i++)
			{
				if(i==d-1)
				{
					addClass(oNowMonth[i],'red');
				}else if(i<d-1)
				{
					addClass(oNowMonth[i],'ccc');
					//addClass(oNowMonth[i],'smallDay');
				}else if(i%7==6|| i%7==5)
				{
					addClass(aLi[i],'sunday');
				}

			}
		}else
		{
			for(var i=0; i<aLi.length; i++)
			{
				if(i%7==6|| i%7==5)
				{
					addClass(aLi[i],'sunday');
					
				}
				
			}
		};
		
		var aJson='[{"tagid":1,"title":"谁会不厌其烦的安慰那无知的少年","time":"2015-07-1"},{"tagid":0,"title":"董小姐 你可知道我说够了再见","time":"2015-7-29"},{"tagid":0,"title":"爱上一匹野马 可我的家里没有草原","time":"2015-8-29"},{"tagid":1,"title":"你才不是一个没有故事的女同学","time":"2015-8-28"}]';
		
		
		var oData=eval('('+aJson+')');
		//
		
		
		for(var j=0; j<oData.length; j++){
			
			var oYears=oData[j].time.split('-')[0];
			var Month=tozero(parseInt(oData[j].time.split('-')[1]));
			var oDayS=tozero(parseInt(oData[j].time.split('-')[2]));

			if(oData[j].tagid==0){
				for(var i=0; i<oNowMonth.length; i++){
					if(oDate.getFullYear()==oYears && tozero(oDate.getMonth()+1)==Month && oNowMonth[i].innerHTML==oDayS){
						oNowMonth[i].innerHTML+="<div class='center_block'><span><b><em>"+oData[j].title+"</em></b><i></i></span></div>";
						//oNowMonth[i].className='xuanjianghui tiphover';
						addClass(oNowMonth[i],'xuanjianghui tiphover');
					};
				};
			}else if(oData[j].tagid==1){
				for(var i=0; i<oNowMonth.length; i++){
					if(oDate.getFullYear()==oYears && tozero(oDate.getMonth()+1)==Month && oNowMonth[i].innerHTML==oDayS){
						
						oNowMonth[i].innerHTML+="<div class='center_block'><span><b><em>"+oData[j].title+"</em></b><i></i></span></div>";
						
						addClass(oNowMonth[i],'zhaoph tiphover');
					};
				};
			}
		}
		
		
		
		// 接收参数
		
		var oXjh=getByClass(document,'tiphover');
		
		for(var i=0; i<oXjh.length; i++){
			oXjh[i].onmouseover=function(){
				var oDiv=this.getElementsByTagName('div')[0];
				oDiv.style.display='block';
			}
			oXjh[i].onmouseout=function(){
				var oDiv=this.getElementsByTagName('div')[0];
				oDiv.style.display='none';
			}
		};
		
		
		
	};
	
	
	oPrev.onclick=function()
	{
		iNow--;
		DayTime();
	};
	oNext.onclick=function()
	{
		iNow++;
		DayTime();
	};
	
};
// 方法
function tozero(n){
	return n<10?'0'+n:n;
};

function getByClass(parent,sClass)
{
	if(document.getElementsByClassName)
	{
		return document.getElementsByClassName(sClass);
	}
	
	var aEle=parent.getElementsByTagName('*');
	var re=new RegExp('\\b'+sClass+'\\b');
	
	var result=[];
	for(var i=0; i<aEle.length; i++)
	{
		if(re.test(aEle[i].className))
		{
			result.push(aEle[i]);
		}
	}
	return result;
};


function addClass(obj,sClass){
	if(!obj.className){
		obj.className=sClass;
	}
	var oldClass=obj.className.replace(/^\s+|\s+$/g,' ').replace(/\s+/g,' ');

	var str=oldClass.split(' ');
	
	for(var i=0; i<str.length; i++){
		if(str[i]==sClass){
			return false;	
		};
	};
	obj.className+=' '+sClass;	
};


function removeClass(obj,sClass){
	
	if(!obj.className)return;
	
	var oldClass=obj.className.replace(/^\s+|\s+$/g,' ').replace(/\s+/g,' ');

	var str=oldClass.split(' ');
	
	for(var i=0; i<str.length; i++){
		if(str[i]==sClass){
			str.splice(i,1);
			obj.className=str.join(' '); // 数组转为字符串
			return;
		}
	};
};


function ready(fn){
	if(document.getElementsByClassName){
		document.addEventListener('DOMContentLoaded',fn,false);	
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState=='complete'){
				fn();	
			}
		});	
	}
};











//-------------------------我是分割线------------------------------


// 效果
