$(function(){
    let vegpont="../json/muszakeloszlas.json";
    const ajax=new Ajax();
    ajax.ajaxGet(vegpont, muszakeloszlasBeallitas);

    function muszakeloszlasBeallitas(muszakok) {
        const szuloElem=$(".muszaktipusm-container");
        muszakok.forEach((elem)=> {
            new MuszakEloszlas(szuloElem,elem);
        });
    }

    $(window).on("torolm",(event)=>{            
        console.log(event.detail.típus);
    });

    $(window).on("modositm",(event)=>{            
        console.log(event.detail.típus);
    });
});