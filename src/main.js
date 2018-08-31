var Aevent=require("./event.js");
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/paginator.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import Styles from "!style-loader!css-loader?modules=false!../css/main.css";

$('#pageLimit').bootstrapPaginator({
    currentPage: 1,//当前的请求页面。
    totalPages: 20,//一共多少页。
    size:"small",//应该是页眉的大小。
    bootstrapMajorVersion: 3,//bootstrap的版本要求。
    alignment:"right",
    numberOfPages:4,//一页列出多少数据。
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
    	$.ajax({
                url:"",
                type:'POST',
                data:{'page':page},
                dataType:'JSON',
                success:function (callback) {
                        $('.commt-wrap').empty();
                    }
            })
    }
});


var ArticleId=0;
init();
function init() {
    $.ajax({
        url:"getAllArticlesLabel",
        type:'GET',
        success:function (data) {  //返回所有的文章标题和一篇热度最高的文章

        }
    }).then(function () {
        $.ajax({
            url:"getCommits",
            type:'POST',
            success:function (data) {  //返回

            }
        })
    })
}






var Str="王瑞睿\n"+
"public class JavaDay001_1 {\n"+
"public static void main(String[] args) {\n"+
							 
"   System.out.println(args);\n"+
"}\n"+
"}\n";


$(".blog-text-wrap pre code").text(Str);

