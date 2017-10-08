var translate_line=document.getElementById("translate_line");
var imgs=translate_line.getElementsByTagName("img");
var translate=document.getElementById("translate");
var courses=document.getElementById("course").getElementsByTagName("a");
var slideOffset=0;

function reg(offset,n) {
	if(Math.abs(offset)%n==0) return n;
	if(offset<0){
	return n+offset%n;
	}else{
	return offset%n;
	}
}

courses[1].onclick=function(){
	picChange(1);
}
courses[2].onclick=function(){
	picChange(2);
}
courses[3].onclick=function(){
	picChange(3);
}
courses[5].onclick=function(){
	picChange(5);
}
courses[4].onclick=function(){
	picChange(4);
}

function picChange(n){
	var transOffset=-n;
	var trans="transform:translateX("+transOffset+"00%);";
	translate_line.setAttribute("style",trans);
	//重置位置
	console.log("n is "+n);
	console.log("mod(n-1,3) is "+mod(n-1,3));
	imgs[mod(n-1,3)].style.left=(n-1)+"00%";
	imgs[mod(n,3)].style.left=n+"00%";
	imgs[mod(n+1,3)].style.left=(n+1)+"00%";
	//重置图样
	imgs[mod(n-1,3)].setAttribute("src","img-2/images/work_0"+reg(n-1,5)+".jpg");
	imgs[mod(n+1,3)].setAttribute("src","img-2/images/work_0"+reg(n+1,5)+".jpg");
	imgs[mod(n,3)].setAttribute("src","img-2/images/work_0"+reg(n,5)+".jpg");
}
//实现取摸
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