$(function(){
    

    for (let index = 0; index < $("article .tabcontent").length; index++) {
      let elem = $("article .tabcontent").eq(index);
      let id2 = "#"+elem.attr("id");
      let id1 = id2.toLowerCase();
      esemenyek(id1,id2);   
    }
 
    function esemenyek(id1,id2){
        $(id1).on("click",function(){
            openPage(id2);
        });
    }

    function openPage(pageName) {
        
        for (let i = 0; i <$(".tabcontent").length; i++) {
            $(".tabcontent").css("display","none");
        }
        $(pageName).fadeIn(1000);
        $(pageName).css("display","block");
        $(".posts").fadeOut(500,function(){
              $("aside").css("display","none");
              $(".container").css("grid-template-columns","1fr");
              
        });

        $(".container").css("opacity","1");
      
    }
});

