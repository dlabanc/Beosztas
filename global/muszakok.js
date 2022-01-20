$(function(){
    let vegpont="http://127.0.0.1:5500/json/muszaktipus.json";
    const ajax=new Ajax();
    ajax.ajaxGet(vegpont, muszakBeallitas);

    function muszakBeallitas(muszakok) {
        const szuloElem=$(".muszaktipush-container");
        muszakok.forEach((elem)=> {
            new MuszakHozzaAdas(szuloElem,elem);
        });

        $(window).on("torol",(event)=>{            
            console.log(event.detail.típus);
        });

        $(window).on("modosit",(event)=>{            
            console.log(event.detail.típus);
        });
    }
});