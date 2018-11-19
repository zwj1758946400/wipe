var con=document.getElementById('cas');
var context=cas.getContext("2d");
var radius=20; //涂抹的半径
var _w=cas.width;
var _h=cas.height;
var moveX;
var moveY;
var isMouseDown=false;
//表示鼠标的状态，是否按下false,按下true

//device保存设备类型，如果是移动端则为true，pc端为false
var device = (/android|webos|iPhone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
console.log(navigator.userAgent);
console.log(device);
var clickEvtName=device ? "touchstart" : "mousedown";
var moveEvt=device ? "touchstart" : "mousemove";
var endEvt=device ? "touchstart" : "mouseup";

//在canvas画布上监听自定义事件"clickEvtName",调用drawPoint函数
cas.addEventListener(clickEvtName,function(evt){
		isMouseDown=true;
		var event= evt || window.event;
		//获取手指在视口的坐标，传递参数到drawPoint
		moveX=device ? event.touches[0].clientX : event.clientX;
		moveY=device ? event.touches[0].clientY : event.clientY;
		drawT(context,moveX,moveY);
},false);


cas.addEventListener(moveEvt,function(evt){
		if(isMouseDown===true){
			var event= evt || window.event;
			//获取鼠标在视口的坐标，传递参数到drawPoint
			event.preventDefault();
			var x2=device ? event.touches[0].clientX : event.clientX;
			var y2=device ? event.touches[0].clientY : event.clientY;
			drawT(context,moveX,moveY,x2,y2);
			//每次结束的点变成下一次划线的开始点
			moveX=x2;
			moveY=y2;
		}

},false);

cas.addEventListener(endEvt,fn3,false);





function drawMask(context){
	context.beginPath();
	context.fillStyle="#666";
	context.fillRect(0,0,_w,_h);
	context.fill();
	context.globalCompositeOperation="destination-out";

}
//在画布上画半径为30的圆
function drawarc(context,moveX,moveY){
	context.beginPath();
	context.fillStyle="red";
	context.arc(moveX,moveY,radius,0,2*Math.PI);
	context.fill();
	context.restore();
}
//在画布上画线
function drawLine(context,x1,y1,x2,y2){
	console.log("传递的实参个数"+arguments.length);
		//保存当前绘图状态
		context.save();
		
		//向右下方平移
		context.lineCap="round";
		context.lineWidth=radius*2;
		context.beginPath();
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		//连接点改成圆角效果
		context.lineJoin="round";
		context.stroke();
		context.restore();
	}
function drawarc(context,moveX,moveY){
	console.log("传递的实参个数"+arguments.length);
	context.beginPath();
	context.fillStyle="red";
	context.arc(moveX,moveY,radius,0,2*Math.PI);
	context.fill();
	context.restore();
}

//画点画线
function drawT(context,x1,y1,x2,y2){
	if(arguments.length===3){
		//调用的是画点
		context.beginPath();
		context.fillStyle="red";
		context.arc(moveX,moveY,radius,0,2*Math.PI);
		context.fill();
		context.restore();
	}else if(arguments.length===5){
		//调用的是 画线
		//保存当前绘图状态
		context.save();
		
		//向右下方平移
		context.lineCap="round";
		context.lineWidth=radius*2;
		context.beginPath();
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		//连接点改成圆角效果
		context.lineJoin="round";
		context.stroke();
		context.restore();
	}else{

	}
}





//在canvas画布上监听自定义事件"mousedown",调用drawPoint函数
/*cas.addEventListener("mousedown",function(evt){
		isMouseDown=true;
		var event= evt || window.event;
		//获取鼠标在视口的坐标，传递参数到drawPoint
		moveX=event.clientX;
		moveY=event.clientY;
		drawT(context,moveX,moveY);
		cas.addEventListener("mousemove",fn2,false);
	
},false);*/
//在canvas画布上监听自定义事件"touchstart",调用drawPoint函数
/*cas.addEventListener("touchstart",function(evt){
		isMouseDown=true;
		var event= evt || window.event;
		//获取手指在视口的坐标，传递参数到drawPoint
		moveX=event.touches[0].clientX;
		moveY=event.touches[0].clientY;
		drawT(context,moveX,moveY);
		cas.addEventListener("touchmove",fn1,false);
	
},false);*/
// cas.addEventListener("mouseup",fn3,false);	
// cas.addEventListener("touchend",fn3,false);	
	
	
//手指触碰调用的函数
	/*function fn1(evt){
		if(isMouseDown===true){
			var event= evt || window.event;
			//获取鼠标在视口的坐标，传递参数到drawPoint
			event.preventDefault();
			var	x2=event.touches[0].clientX;
			var	y2=event.touches[0].clientY;
			drawT(context,moveX,moveY,x2,y2);
			//每次结束的点变成下一次划线的开始点
			moveX=x2;
			moveY=y2;
		}
	
	}*/
//鼠标事件的调用
	/*function fn2(evt){
		if(isMouseDown===true){
			var event= evt || window.event;
			//获取鼠标在视口的坐标，传递参数到drawPoint
			event.preventDefault();
			var	x2=event.clientX;
			var	y2=event.clientY;
			drawT(context,moveX,moveY,x2,y2);
			//每次结束的点变成下一次划线的开始点
			moveX=x2;
			moveY=y2;
		}
	
	}*/
	


function fn3(){
	isMouseDown=false;
	if(getTransparencyPercent(context)>50){
		alert("超过了50%的面积");
		clearRect(context);
	}
	// cas.removeEventListener("mousemove",fn1,false);
}
function getTransparencyPercent(context){
	var t=0;
	var imgData=context.getImageData(0,0,_w,_h);
	for(var i=0; i<imgData.data.length; i+=4){
		var a=imgData.data[i+3];
		if (a===0) {
			t++;
		}
	}
	var percent=(t/(_w*_h))*100;
	console.log("透明的点个数是"+t);
	console.log("占总面积的"+Math.ceil(percent)+"%");
	// return percent.toFixed(2);
	return Math.round(percent);
}
function clearRect(context){
	context.clearRect(0,0,_w,_h);
}
window.onload=function(){
	drawMask(context);
	drawarc(context);
	drawLine(context);
};