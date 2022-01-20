$(function(){
    let vegpont="http://127.0.0.1:5500/json/munkakor.json";
    const ajax=new Ajax();
    ajax.ajaxGet(vegpont, munkakorBeallitas);

    function munkakorBeallitas(munkakorok) {
        const szuloElem=$(".munkakor-container");
        munkakorok.forEach((elem)=> {
            new Munkakor(szuloElem,elem);
        });
    }
});