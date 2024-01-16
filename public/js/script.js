$(document).ready(function () {
    $('.likeButton').click(function () {
        let postId = $(this).data('post-id');
        let likedId = $(this).data('post-liked');
        let img = $(this).find("img");
        let likeCount = $('#likeCount' + postId);
        let currentLikes = parseInt(likeCount.text());
        let newLikes;
        if(!likedId){
            newLikes = currentLikes + 1;
            $(this).data('post-liked', true);
            img.attr("src", "img/liked.png");
        }else{
            newLikes = currentLikes - 1;
            $(this).data('post-liked', false);
            img.attr("src", "img/heart.svg")
        }
        likeCount.text(newLikes + " Likes");
    });
    $('.commentButton').click(function (){
        
    })
});
