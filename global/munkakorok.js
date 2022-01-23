$(function(){
    let vegpont="../json/munkakor.json";
    const ajax=new Ajax();
    ajax.ajaxGet(vegpont, munkakorBeallitas);

    function munkakorBeallitas(munkakorok) {
        const szuloElem=$(".munkakor-container");
        munkakorok.forEach((elem)=> {
            new Munkakor(szuloElem,elem);
        });
    }
});