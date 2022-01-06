$(function(){
    const munkakorok={
        "1":{
            "megnevezes":"Felszolgáló",
            "leiras":"Az, aki kiviszi a kajákat és a piákat"
            },
        "2":{
            "megnevezes":"Konyhai kisegítő",
            "leiras":"Ő mos, csak fancy néven"},
        "3":{
            "megnevezes":"Leszedő",
            "leiras":"Aki leszedi az asztalt"},
        "4":{
            "megnevezes":"Pultos",
            "leiras":"Aki piákat csinál"},
        "5":{
            "megnevezes":"Sommelier",
            "leiras":"Fancy névvel, fancy munka. Ő tölti a bort"},
        "6":{
            "megnevezes":"Szakács",
            "leiras":"Aki kaját csinál"}
    };
    const munkakorTomb=[];
    munkakorBeallitas(munkakorok, munkakorTomb, munkakorLista);

      

    function munkakorLista(munkakorok) {
        const szuloElem = $(".munkakor-container");
        const sablonElem = $("#munkakor-minta");
        szuloElem.empty();
        sablonElem.show();
        munkakorok.forEach(function(elem) {
            let node = sablonElem.clone().appendTo(szuloElem);
            const obj = new Munkakor(node, elem);

        });
        sablonElem.hide();
    };

    function munkakorBeallitas(objektum, tomb, callback){
        tomb.splice(0,tomb.length);
        Object.keys(objektum).forEach(function(key) {
            tomb.push(objektum[key]);
          
          });
        callback(tomb);
    };
});