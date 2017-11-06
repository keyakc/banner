var translate_line=document.getElementById("translate_line");
var img_units=translate_line.getElementsByTagName("div");
var translate=document.getElementById("translate");
var cursors=document.getElementById("cursor").getElementsByTagName("a");
var cursorsLength=cursors.length;
var vis_window=document.getElementById("vis_window");
//获取 css width
var vis_window_width=getStyle(vis_window,"width").match(/(\d+)/)[0];
var slideOffset;//整体偏移

//取余和文件名差异匹配
function reg(offset,n) {
	if(Math.abs(offset)%n==0) return n;
	if(offset<0){
	return n+offset%n;
	}else{
	return offset%n;
	}
}
//取摸
function mod(m,n) {
	if(m>=0) return m%n;
	if(m<0) {
		if(m%n==0) {
			return 0;
		}else{
		return n+m%n;
		}
	}
}
var clickHandler=function(page) {
		return function(){
			picChange(page,0);
		}
	};
//各页码注册事件
for(q=1,p=cursorsLength;q<=p-2;q++){
	cursors[q].onclick=clickHandler(q);
}

function picChange(n,T){
	var transOffset=-n;
	if(T==null) T=0.5;
	var trans="transform:translateX("+transOffset+"00%) translateZ(0px);transition:"+T+"s;";
	translate_line.setAttribute("style",trans);
	//重置位置
	console.log("n= "+n)
	img_units[mod(n-1,3)].style.left=(n-1)+"00%";
	img_units[mod(n,3)].style.left=n+"00%";
	img_units[mod(n+1,3)].style.left=(n+1)+"00%";
	// console.log(img_units[mod(n-1,3)].getElementsByTagName("img")[0].src);
	//重置图样
	img_units[mod(n-1,3)].getElementsByTagName("img")[0].setAttribute("src","img-2/images/work_0"+reg(n-1,cursorsLength-2)+".jpg");	
	img_units[mod(n,3)].getElementsByTagName("img")[0].setAttribute("src","img-2/images/work_0"+reg(n,cursorsLength-2)+".jpg");
	img_units[mod(n+1,3)].getElementsByTagName("img")[0].setAttribute("src","img-2/images/work_0"+reg(n+1,cursorsLength-2)+".jpg");
	button_class(reg(n,cursorsLength-2));
	slide_class(mod(n,img_units.length));
}
cursors[cursorsLength-1].onclick=function(){
	//获取样式
	var trans=translate_line.getAttribute("style");
	slideOffset=Number(trans.slice(trans.indexOf("(")+1,trans.indexOf("%")))/100;
	console.log(slideOffset)	
	slideOffset*=-1;
	slideOffset++;
	picChange(slideOffset);
	
}
cursors[0].onclick=function() {
	//获取样式
	var trans=translate_line.getAttribute("style");
	slideOffset=Number(trans.slice(trans.indexOf("(")+1,trans.indexOf("%")))/100;	
	slideOffset*=-1;
	slideOffset--;

	picChange(slideOffset);	
}
//拖拽部分
var downFlag,clientX,pxOffset;
translate_line.onmousedown=function(event){
	downFlag=1;
	event.preventDefault();
	var trans=translate_line.getAttribute("style");
	slideOffset=Number(trans.slice(trans.indexOf("(")+1,trans.indexOf("%")))/100;
		//以视口宽度为加权获取起始偏移
	pxOffset=slideOffset*vis_window_width;
	// console.log(slideOffset);
	clientX=event.clientX;
	clientY=event.clientY;
}
translate_line.onmousemove=function(event){	
	if(downFlag==1){
		var offsetX=pxOffset+event.clientX-clientX;
		var str;	
		str="transform:translateX("+offsetX+"px) translateZ(0px);transition:"+0+"s;";
		translate_line.setAttribute("style",str);
		if((event.clientX-clientX)>=vis_window_width/3){
			downFlag=0;
			slideOffset*=-1;
			slideOffset--;
			picChange(slideOffset);
		}
		if((event.clientX-clientX)<=-vis_window_width/3){
			downFlag=0;
			slideOffset*=-1;
			slideOffset++;
			picChange(slideOffset);
		}
	};
}
translate_line.onmouseup=function(){
	if(downFlag!=0) {
		slideOffset*=-1
		picChange(slideOffset);
	}	
	downFlag=0;
}
function slide_class(n) {
	for(i=0,j=img_units.length;i<j;i++){
		img_units[i].className='';
	}
	img_units[n].className='slide_active';
}
//按钮样式切换
function button_class(n){
	for(i=0;i<cursorsLength;i++){
		cursors[i].className='';
	}
	cursors[n].className='active';	
}
// 获取元素当前样式
	function getStyle(element,cssPropertyName){
	    if(window.getComputedStyle){
	        //优先使用W3C规范
	       return window.getComputedStyle(element).getPropertyValue(cssPropertyName);
	       //getPropertyValue方法可直接使用CSS属性名称，不需要转换成驼峰模式；
	    }else{
	        //针对IE9以下兼容
	        return element.currentStyle.getAttribute(camelize(cssPropertyName));
	        //IE9以下使用getAttribute方法，而且属性名必须改为驼峰模式；
	    }
	}
	//camelize 实现将属性名改成驼峰模式；
	function camelize(attr) {
	    return attr.replace(/-(\w)/g, function(match, p1) {
	        return p1.toUpperCase();
	    });
	}
