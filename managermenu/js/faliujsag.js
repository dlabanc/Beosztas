$(function(){
    let vegpont="http://127.0.0.1:5500/json/faliujsag.json";
    const ajax=new Ajax();
    ajax.ajaxGet(vegpont, faliujsagBeallitas);

    function faliujsagBeallitas(muszakok) {
        const szuloElem=$(".faliujsag-container");
        muszakok.forEach((elem)=> {
            new Faliujsag(szuloElem,elem);
        });

        $(window).on("modositf",(event)=>{            
            console.log(event.detail.azonosito);
        });

        $(window).on("torolf",(event)=>{            
            console.log(event.detail.azonosito);
        });
    }
});