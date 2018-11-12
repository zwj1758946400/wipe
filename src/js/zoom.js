//created:2018/5/30
//coder:lxy
//ver 1.0 版本控制
//找对象
var smallpic = document.getElementById('smallpic');
var bigpic = document.getElementById("bigpic");
var zoom = document.getElementById('zoom');
var leftimg = document.getElementById('leftimg');
var rightimg = document.getElementById('rightimg');
// 放大比例:大图宽度/小图宽度
var rate = 0
console.log(rate);
// 为smallPic添加mousemove事件
smallpic.onmousemove=function(evt) {
	var event = evt || window.event;
    //获取浏览器下滚动的高度
    var _scrollTop = document.documentElement.scrollTop ||document.body.scrollTop
    //获取浏览器左滚动的距离
    var _scrollLeft = document.documentElement.scrollLeft ||document.body.scrollLeft
    //计算放大镜图片的实际定位
    //event.clientX  减所有水平方向上的偏移，再减去zoom宽度的一半再加上浏览器滚动距离
 	var x = (event.clientX - getAllOffsetLeft(smallpic))- zoom.offsetWidth/2 + _scrollLeft;
    //event.clientY  减所有垂直方向上的偏移,再减去zoom高度的一半，再加上浏览器滚动的高度
    var y = (event.clientY - getAllOffsetTop(smallpic)) - zoom.offsetHeight/2 + _scrollTop;
    //对放大图片的定位极限值得判断
    //如果垂直方向小于0，则等于0
    if(y<0){
    	y=0;
    }
    //如果水平方向小于0，则等于0
    if (x<0) {
    	x=0;
    }
    //如果垂直方向大于smallPic的高度减去zoom高度，则
    if (y > smallpic.clientHeight - zoom.offsetHeight) {
    	y = smallpic.clientHeight - zoom.offsetHeight;
    }
    //如果水平方向大于smallPic的宽度减去zoom宽度，则
    if (x > smallpic.clientWidth - zoom.offsetWidth) {
    	x = smallpic.clientWidth - zoom.offsetWidth;
    }
    console.log("x" +x);
    console.log("y" + y);
    //修改放大镜图片的top和left属性
    zoom.style.top = y + "px";
    zoom.style.left = x + "px";
    //为左侧放大图片添加滚动效果
    //bigPic.scrollLeft等于zoom.offsetLeft乘放大比例
    bigpic.scrollLeft = zoom.offsetLeft*rate;
    //bigPic.scrollTop等于zoom.offsetTop乘放大比例
     bigpic.scrollTop = zoom.offsetTop*rate;
}
//当鼠标进入smallPic显示
smallpic.addEventListener("mouseover",function(){
		zoom.style.display = "block";
		bigpic.style.display = "block";
		//大图宽度/放大镜图片的移动距离（小图的内尺寸宽度-放大镜的外尺寸宽度）
		rate = rightimg.clientWidth/leftimg.offsetWidth;
	},false);
//当鼠标离开smallPic隐藏
smallpic.addEventListener("mouseout",function(){
		zoom.style.display = "none";
		bigpic.style.display = "none";
	},false)
//封装一个函数getAllTop()函数，找到元素所有垂直方向的偏移
function getAllOffsetLeft(element){
		var allLeft = 0;//用来保存所有的offsetLeft之和;
		while(element){
			//将对象的offsetLeft属性保存到allLeft中
			allLeft +=element.offsetLeft;
			//找到对象的offsetParent，将其重新赋值个element,实现逐级向上查找功能，一直到body结束
			element = element.offsetParent;
		}
		return allLeft;	
	}
//封装一个函数getAllLeft()函数，找到元素所有垂直方向的偏移
function getAllOffsetTop(element){
		var allTop = 0;
		while(element){
			allTop += element.offsetTop;
			element = element.offsetParent;
		}
		return allTop;
	}
//tab切换
var tabqh = document.getElementById('tabqh');
var lis = tabqh.getElementsByTagName("li");
// 第一种方法：使用for循环为所有li标签添加mouseover事件。
// 当鼠标移入到某个li标签上后，将li标签内的img标签的src属性赋值给leftimg.src 和 rightimg.src
// for (var i = 0; i < lis.length; i++) {
// 	lis[i].onmouseover = function(){
// 		for(var k =0; k<lis.length;k++){
// 			if (this == lis[k]) {
// 				console.log(lis[k]);
// 				lis[k].firstElementChild.getAttribute("src");
// 				leftimg.src = event.target.getAttribute("src");
// 				rightimg.src = event.target.getAttribute("src");
// 			}
// 		}
// 	}
	
// }
//第二种方法：使用事件代理，为ul添加一个mouseover事件，
//利用event.target将li标签内的img标签的src属性赋值给leftimg.src 和 rightimg.src
tabqh.onmouseover = function(evt){
	var a = evt ||window.event;
	event.target.getAttribute("src");
	console.log(event.target);
	if (event.target.nodeName.toLowerCase()=="img") {
		leftimg.src = event.target.getAttribute("src");
	rightimg.src = event.target.getAttribute("src");
	}
	
}
// 缩略图轮播
var prev = document.getElementsByClassName('left-arrow')[0];
var next = document.getElementsByClassName('right-arrow')[0];

var index = 0;//保存步数
var offset = 55; //每次的偏移量，这里是指缩略图的宽度
var maxStep = lis.length - 5; //最大的步数

//点击上一个箭头按钮，实现#tabqh 右移，到达最后一张图片后停下来
prev.onclick =function(){
	index--;
	if (index<0) {
		index = 0;
	}
	animate(index);
}
//点击下一个箭头按钮，实现#tabqh 左移，到达第一张图片后停下来
next.onclick = function(){
	index++;
	if (index > maxStep) {
		index = maxStep;
	}
	animate(index)
}
//封装函数，实现#tabqh 的移动，每次移动offset像素
function animate(stepNum){
	var newLeft = -offset* stepNum; 
	tabqh.style.left = newLeft + "px";
}