var con=document.getElementById('cas');
var context=cas.getContext("2d");
var radius=20; //涂抹的半径
var _w=cas.width;
var _h=cas.height;
var moveX;
var moveY;
var isMouseDown=false;
//表示鼠标的状态，是否按下false,按下true

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
	context.beginPath();
	context.fillStyle="red";
	context.arc(moveX,moveY,radius,0,2*Math.PI);
	context.fill();
	context.restore();
}
//在canvas画布上监听自定义事件"mousedown",调用drawPoint函数
cas.addEventListener("mousedown",function(evt){
		isMouseDown=true;
		var event= evt || window.event;
		//获取鼠标在视口的坐标，传递参数到drawPoint
		moveX=event.clientX;
		moveY=event.clientY;
		drawarc(context,moveX,moveY);
		cas.addEventListener("mousemove",fn1,false);
	
},false);
	
	
	

	function fn1(evt){
		if(isMouseDown===true){
			var event= evt || window.event;
			//获取鼠标在视口的坐标，传递参数到drawPoint
			var	x2=event.clientX;
			var	y2=event.clientY;
			drawLine(context,moveX,moveY,x2,y2);
			//每次结束的点变成下一次划线的开始点
			moveX=x2;
			moveY=y2;
		}
	
	}
	

cas.addEventListener("mouseup",function(){
	isMouseDown=false;
	if(getTransparencyPercent(context)>50){
		alert("超过了50%的面积");
		clearRect(context);
	}
	// cas.removeEventListener("mousemove",fn1,false);
},false);
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