$(function(){
    const muszakok={
        "1":{
            "tipus":"A",
            "leiras":"Hétköznapi, normál munkarend"
        },
        "2":{
            "tipus":"B",
            "leiras":"Hétvégi munkarend"
        },
        "3":{
            "tipus":"C",
            "leiras":"Rendkívüli munkarend"
        },
    };

    const muszakTomb=[];
    muszakBeallitas(muszakok, muszakTomb, muszakLista);

      

    function muszakLista(muszakok) {
        const szuloElem = $(".muszaktipush-container");
        const sablonElem = $("#muszaktipush-minta").children();
        szuloElem.empty();
        sablonElem.show();
        muszakok.forEach(function(elem) {
            let node = sablonElem.clone().appendTo(szuloElem);
            const obj = new Muszak(node, elem);

        });
        sablonElem.hide();
    };

    function muszakBeallitas(objektum, tomb, callback){
        tomb.splice(0,tomb.length);
        Object.keys(objektum).forEach(function(key) {
            tomb.push(objektum[key]);
          
          });
        callback(tomb);
    };
});