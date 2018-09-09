function route(){
	this.routeArr={};
	//所有已经注册过了的hash
	this.routeUrl='';
	//当前地址的hash
	window.addEventListener('load',this.refresh.bind(this),false);
	window.addEventListener('hashchange',this.refresh.bind(this),false);
}
route.prototype.refresh=function(){
	this.routeUrl=location.hash.slice(1)||'/';
	if(this.routeUrl=='/'||this.routeUrl=='/p') return;
	this.routeArr[this.routeUrl]=this.route(this.routeUrl,findArticle(this.routeUrl));
};
route.prototype.route=function(url,callback){
	this.routeArr[url]=callback||function(){};
};
let routeMain=new route();
routeMain.route("/",function(){
	
});
function findArticle(url){
	$.ajax({
		url: "http://localhost:8080/article/getOneArticle", //addOrdeleteLikeNum
		type: 'POST',
		data: {
		        'keyword':url.slice(url.lastIndexOf("/")+1),
		 },
		 success:function(data){
		 	
		 }
	})
}
