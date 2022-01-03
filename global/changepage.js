$(function(){
    
    esemenyek("#nemerekra","#Nemerekra");
    esemenyek("#statisztika","#Statisztika");
    esemenyek("#faliujsag","#Faliujsag");
    esemenyek("#beosztas","#Beosztas");

    esemenyek("#muszaktipush","#Muszaktipush");
    esemenyek("#muszaktipusn","#Muszaktipusn");
    esemenyek("#muszaktipusm","#Muszaktipusm");
    esemenyek("#munkakorok","#Munkakorok");
    esemenyek("#alkamazottak","#Alkalmazottak");
    esemenyek("#manstatisztika","#ManStatisztika");
    esemenyek("#manfaliujsag","#ManFaliujsag");
    esemenyek("#napimunka","#Napimunka");
    esemenyek("#ujbeosztas","#Ujbeosztas");
    esemenyek("#beosztasmod","#Beosztasmod");
    esemenyek("#beosztasmeg","#Beosztasmeg");
    esemenyek("#profiladatok","#Profiladatok");
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

