'use strict'

var Aevent=require("./event.js");
var router=require("./router");
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/paginator.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import Styles from "!style-loader!css-loader?modules=false!../css/main.css";

$('#pageLimit').bootstrapPaginator({
    currentPage: 1,//当前的请求页面。
    totalPages: 5,//一共多少页。
    size:"small",//应该是页眉的大小。
    bootstrapMajorVersion: 3,//bootstrap的版本要求。
    alignment:"right",
    numberOfPages:6,//一页列出多少数据。
    itemTexts: function (type, page, current) {//如下的代码是将页眉显示的中文显示我们自定义的中文。
        switch (type) {
        case "first": return "首页";
        case "prev": return "上一页";
        case "next": return "下一页";
        case "last": return "末页";
        case "page": return page;
        }
    },
    onPageClicked:function(event,originalEvent,type,page){
    	console.log(page);
    	$.ajax({
                url:"http://localhost:8080/comment/getCommentPage",
                type:'POST',
                data:{
                	'articleId': $("code").attr("articleId"),
                	'pageNum':page,
                	'pageSize':3,
                },
                dataType:'JSON',
                success:function (data) {
              
                    $(".commit-wrap").empty();
                      for (var i=0;i<data.list.length;i++) {
			    		 var commitItem=`
			            <div class="idea-comment-item">
					                <div  class="user-imge">
					                    <i class="glyphicon glyphicon-user"></i>
					                </div>
					                <span class="userName">`+CreateName()+`</span>
					                <span class="comment-content">`+data.list[i].commentContent+`</span>
					    </div>`;
			    	  $(".commit-wrap").prepend(commitItem);
		    	   
                 }
                  }
            })
    }
});


var ArticleId=1;
init();
function init() {
       $.ajax({
           url:"http://localhost:8080/article/getAll",
           type:'GET',
           success:function (data) {  //返回所有的文章标题和一篇热度最高的文章
                  for (var i=0;i<data.length;i++) {
                  	var liTemplate=``;
                  	for (var j=0;j<data[i].list.length;j++) {
                  		liTemplate+=`
                  	    <li class="ArtiCleKeyLabel"  keyword="javaArrayfrist">`+data[i].list[j].lable+`<span><i class="articleNum">`+data[i].list[j].likeNum+`</i>人 喜欢</span></li>
						`
                  	}
                  	var menuTemplate=`
	           	       <div class="menu">
							<span class="theme" isShow="false">`+data[i].lable+`<i class="small">`+data[i].list.length+`篇文章</i><i class="small">有`+data[i].likeNum+`人喜欢</i></span>
							<ul class="menu-ul">`+liTemplate+`</ul>
					</div>
           	        `;
           	        $(".blog-menu-wrap").append(menuTemplate);
                  	
                  }
	            $(".ArtiCleKeyLabel").click(function(e){
					if($(e.target).attr("keyword")==undefined) return;
					window.location.href="/#/p/"+$(e.target).attr("keyword");
				})
	            $(".menu .theme").click(function(e){
					if($(e.target).attr("isShow")=="false"){
						$(e.target).next().fadeIn();
						$(e.target).attr("isShow",true);
					}else{
						$(e.target).next().fadeOut();
						$(e.target).attr("isShow",false);
					}
	            })
           }
       }).then(function(){
	       	$.ajax({
		        url:"http://localhost:8080/blog/findBlog", //addOrdeleteLikeNum
		        type:'GET',
		        dataType:'JSON',
		        success:function (data) {
		        	$(".blog-header .isLikeNum").text("");
		           $(".blog-header .isLikeNum").text(data.likenum);
		        }
	        })
       	
       })

		$.ajax({
		    url: "http://localhost:8080/article/getOneArticle", //addOrdeleteLikeNum
		    type: 'POST',
		    data: {
		        'id':4,
		
		    },
		    dataType: 'JSON',
		    success: function(data) {
		        $(".blog-text-wrap").html(data.articleContent);
		        $("pre code").attr("articleId",data.articleId);
		        $('pre code').each(function(i, block) {
		            hljs.highlightBlock(block);
		        });
		        
		        
		    }
		}).then(function(){
			$.ajax({
		    url: "http://localhost:8080/comment/getCommentPage",
		    type: 'POST',
		    data: {
		        'articleId': $("code").attr("articleId"),
		        'pageNum':1,
                'pageSize':2,
		    },
		    dataType: 'JSON',
		    success: function(data) {
		    	 $(".commit-wrap").empty();
		    	 for (var i=0;i<data.list.length;i++) {
			    		 var commitItem=`
			            <div class="idea-comment-item">
					                <div  class="user-imge">
					                    <i class="glyphicon glyphicon-user"></i>
					                </div>
					                <span class="userName">`+CreateName()+`</span>
					                <span class="comment-content">`+data.list[i].commentContent+`</span>
					
					    </div>`;
			    	  $(".commit-wrap").prepend(commitItem);
		    	    }
		        
		        
		    }
		})
		})
}
function CreateName() {;
    return "路人"+Math.random().toString(36).substr(2);
}

