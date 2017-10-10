var translate_line=document.getElementById("translate_line");
var imgs=translate_line.getElementsByTagName("img");
var translate=document.getElementById("translate");
var courses=document.getElementById("course").getElementsByTagName("a");
var slideOffset;

function reg(offset,n) {
	if(Math.abs(offset)%n==0) return n;//取余和文件名差异匹配
	if(offset<0){
	return n+offset%n;
	}else{
	return offset%n;
	}
}

courses[1].onclick=function(){
	picChange(1,0);
}
courses[2].onclick=function(){
	picChange(2,0);
}
courses[3].onclick=function(){
	picChange(3,0);
}
courses[5].onclick=function(){
	picChange(5,0);
}
courses[4].onclick=function(){
	picChange(4,0);
}

function picChange(n,T){
	var transOffset=-n;
	if(T==null) T=0.5;
	var trans="transform:translateX("+transOffset+"00%) translateZ(0px);transition:"+T+"s;";
	translate_line.setAttribute("style",trans);
	//重置位置
	imgs[mod(n-1,3)].style.left=(n-1)+"00%";
	imgs[mod(n,3)].style.left=n+"00%";//中间位置→中间序号→两侧序号&两侧位置
	imgs[mod(n+1,3)].style.left=(n+1)+"00%";
	//重置图样
	imgs[mod(n-1,3)].setAttribute("src","img-2/images/work_0"+reg(n-1,5)+".jpg");	
	imgs[mod(n,3)].setAttribute("src","img-2/images/work_0"+reg(n,5)+".jpg");
	imgs[mod(n+1,3)].setAttribute("src","img-2/images/work_0"+reg(n+1,5)+".jpg");
	button_class(reg(n,5));
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
courses[6].onclick=function(){
	var trans=translate_line.getAttribute("style");
	slideOffset=Number(trans.slice(trans.indexOf("(")+1,trans.indexOf("%")))/100;	
	slideOffset*=-1;
	slideOffset++;
	picChange(slideOffset);
	
}
courses[0].onclick=function() {
	var trans=translate_line.getAttribute("style");
	slideOffset=Number(trans.slice(trans.indexOf("(")+1,trans.indexOf("%")))/100;	
	slideOffset*=-1;
	slideOffset--;
	picChange(slideOffset);	
}
var downFlag,clientX,pxOffset;
translate_line.onmousedown=function(event){
	console.log("down");
	downFlag=1;
	event.preventDefault();
	var trans=translate_line.getAttribute("style");
	slideOffset=Number(trans.slice(trans.indexOf("(")+1,trans.indexOf("%")))/100;
	pxOffset=slideOffset*400;
	console.log(slideOffset);
	clientX=event.clientX;
	clientY=event.clientY;
}
translate_line.onmousemove=function(event){	
	if(downFlag==1){
		var offsetX=pxOffset+event.clientX-clientX;
		var str;	
		str="transform:translateX("+offsetX+"px) translateZ(0px);transition:"+0+"s;";
		translate_line.setAttribute("style",str);
		if((event.clientX-clientX)>=100){
			downFlag=0;
			slideOffset*=-1;
			slideOffset--;
			picChange(slideOffset);
		}
		if((event.clientX-clientX)<=-100){
			downFlag=0;
			slideOffset*=-1;
			slideOffset++;
			picChange(slideOffset);
		}
	};
}
function button_class(n){
	for(i=0;i<courses.length;i++){
		courses[i].className='';
	}
	courses[n].className='active';	
}
translate_line.onmouseup=function(){
	if(downFlag!=0) picChange(-slideOffset);	
	downFlag=0;
}