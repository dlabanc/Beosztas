$(function(){
    esemenyek("#nemerekra","#Nemerekra");
    esemenyek("#statisztika","#Statisztika");
    esemenyek("#faliujsag","#Faliujsag");
    esemenyek("#beosztas","#Beosztas");
    
    function openPage(pageName) {

        for (let i = 0; i <$(".tabcontent").length; i++) {
            $(".tabcontent").css("display","none");
        }
        $(pageName).fadeIn(1000);
        $(pageName).css("display","block");
        $(".container").css("opacity","1");
      
    }
    function esemenyek(id1,id2){
        $(id1).on("click",function(){
            openPage(id2);
        });
    }


});

