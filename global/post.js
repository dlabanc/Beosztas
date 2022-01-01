$(function(){
 $(".closeinfo").on("click",function(){
    $(".post-info").css("visibility","hidden");
    $("article").css("opacity","1");
 });  
 $(".post").on("click",function(event){
     let adat = event.currentTarget.children;
    $(".post-info").css("visibility","visible");
    $("article").css("opacity","0.3");
    $(".post-info").children(".post-info-user-data").children("p").html(adat[2].childNodes[0].data);
    $(".post-info").children(".post-img").children("img").attr("src",adat[1].currentSrc);
    $(".post-info").children(".post-info-user-data").children("h3").html(adat[0].childNodes[0].data);
    
 });
});