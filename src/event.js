var Islike=true;
var articleId=100;
$(".blog-header .isLike").click(function(){
	if(Islike){
		$(".blog-header .isLikeNum").text(parseInt($(".blog-header .isLikeNum").text())+1);
		Islike=false;
	}else{
		$(".blog-header .isLikeNum").text(parseInt($(".blog-header .isLikeNum").text())-1);
		Islike=true;
	}
});
$(".isLike").click(function () {
	let IsLikethis=0;
	if ($(this).attr("isLike")=="false"){
        IsLikethis=1;
        $(this).css({
            color:"white",
            background:"red",
		});
        $(".isLikeBlog").animate({
            'opacity': '1',
		})
        $(".isLikeBlog").text("喜欢我,必然不会让你失望");
        $(this).attr("isLike","true");
	}else{
        $(this).css({
            color:"black",
            background:"rgb(221,221,221)",
        });
		$(".isLikeBlog").text("确定不点个赞再走？");
        $(".isLikeBlog").animate({
            'opacity': '0',
        },500,function () {
            $(".isLikeBlog").animate({
                'opacity': '1',})
        })
        $(this).attr("isLike","false");
	}
    $.ajax({
        url:"", //addOrdeleteLikeNum
        type:'POST',
        data:{
            'IsLikethis':IsLikethis,

        },
        dataType:'JSON',
        success:function (data) {

        }
    })
})
$(".LikeArticle").click(function () {
	$(this).css({
		color:"white",
		background:"red",
	});
	$(".LikeNumAddOne").css({
        'opacity': '1',
	})
	$(".LikeNumAddOne").animate({
		"bottom":'35px',
        'opacity': '0',
	},500,function () {
        $(".LikeNumAddOne").css({
            "bottom":'2px',
        })
    });

})
$(".idea-comment-item .commit-likeNum").click(function(e){
	let islike=0;
	if($(this).children(".isLikeNum").attr("Islike")=="true"){
		islike=1;
		$(this).children(".isLikeNum").text(parseInt($(this).children(".isLikeNum").text())+1);
		$(this).children(".isLikeNum").attr("Islike",false);
	}else{
		$(this).children(".isLikeNum").text(parseInt($(this).children(".isLikeNum").text())-1);
		$(this).children(".isLikeNum").attr("Islike",true);
	}
    $.ajax({
        url:"", //addOrdeleteLikeNum
        type:'POST',
        data:{
            'IsLike':islike,

        },
        dataType:'JSON',
        success:function (data) {

        }
    })
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
$(".raiseCommit").click(function(){
    $.ajax({
        url:"", //addcommit
        type:'POST',
        data:{
        	'commitContent':$(".commmit").val(),
			'articleId':articleId,
		},
        dataType:'JSON',
        success:function (data) {
           var commitItem=`
            <div class="idea-comment-item">
		                <div  class="user-imge">
		                    <i class="glyphicon glyphicon-user"></i>
		                </div>
		                <span class="userName">`+CreateName()+"  在"+`</span>
		                <span class="comment-time">`+(new Date()).toLocaleDateString()+" 评论了"+`</span>
		                <span class="comment-content">`+$(".commmit").val()+`</span>
		                <span class="commit-likeNum"><i class="glyphicon glyphicon-heart"></i><span class="badge isLikeNum" Islike="true">`+data.commitLikeNum+`</span></span>
		
		    </div>`;
           $(".commit-wrap").prepend(commitItem);
        }
    })
})

function CreateName() {;
    return "路人"+Math.random().toString(36).substr(2);
}

module.exports=function(){
	console.log("exports");
};
