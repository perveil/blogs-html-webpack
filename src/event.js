var Islike=false;
$(".blog-header .isLike").click(function(){
	if(Islike){
		Islike=false;
		 prompt("一定更加努力");
	}else{
		Islike=true;
		 prompt("多谢喜欢");
	}
	$.ajax({
        url:"http://localhost:8080/blog/likeBlog", //addOrdeleteLikeNum
        type:'POST',
        data:{
            'IsLikethis':Islike,

        },
        dataType:'JSON',
        success:function (data) {
		    $(".blog-header .isLikeNum").text(data.likenum);
		   
        }
    })
});
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
    $.ajax({
    url: "http://localhost:8080/article/likeArticle", //addOrdeleteLikeNum
    type: 'POST',
    data: {
        'articleId': "1",

    },
    success: function(data) {
    	 prompt("多谢喜欢");
    }
    })
})

$(".raiseCommit").click(function(){
    $.ajax({
        url:"http://localhost:8080/comment/addComment",
        type:'POST',
        data:{
        	'commitContent':$(".commmit").val(),
			'articleId':1,
			
		},
        dataType:'JSON',
        success:function (data) {
        	if(data.state!=-3){
	        	var commentItem=`
	            <div class="idea-comment-item">
			                <div  class="user-imge">
			                    <i class="glyphicon glyphicon-user"></i>
			                </div>
			                <span class="userName">`+CreateName()+" "+`</span>
			                <span class="comment-content">`+$(".commmit").val()+`</span>
			                <span class="commit-likeNum"><i class="glyphicon glyphicon-heart"></i><span class="badge isLikeNum" Islike="true">`+0+`</span></span>
			
			    </div>`;
			    	
	           $(".commit-wrap").prepend(commentItem);
	           prompt("评论成功");
          }else{
          	prompt(data.msg);
        }
       }
    })
})



function CreateName() {;
    return "路人"+Math.random().toString(36).substr(2);
}
function  prompt(str){
	$(".prompt .prompt-text").text(str);
          	$(".prompt").animate({
          		'top':"20px",
          		'opacity':"1",
          	},1000,function(){
          		$(".prompt").animate({
          		'top':"-170px",
          		'opacity':"0",},3000);
    })
}

module.exports=function(){
	console.log("exports");
};
