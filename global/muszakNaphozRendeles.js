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

    const kovhetNapok=[];
    const muszakTomb=[];
    let vegpont="http://127.0.0.1:5500/json/muszaktipus.json";
    muszakBeallitas(muszakok, muszakTomb, muszakLista);
    KovHetDatumBeallitas();

    function muszakLista(muszakok) {
        const szuloElem = $("#muszaktipusn-subcontainer");
        const sablonElem = $("#muszaktipusn-minta").children();
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


    function KovHetDatumBeallitas() {
        d = new Date();
        let day = d.getDay();
        let diff = (7-day)+1;
        for (let i = 0; i < 7; i++) {
            kovhetNapok[i]=String(d.getFullYear()) +"." +String(d.getMonth() + 1).padStart(2, "0") +"." +String(d.getDate()+diff+i).padStart(2, "0");   
        }
    }

    for (let i = 0; i < 7; i++) {
        $("#muszaktipusnapok-content #mnap"+(i+1)).children("p").text(kovhetNapok[i]);
    }

    let count = $("#muszaktipusn-minta").find("*").length;
    for (let i = 0; i < count; i++) {
        let element="";
        if (i==1) {
            element=" h2";
        }
        else if (i==2) {
            element= " p";
        }
        else if (i==3){
            element= " .aktualisnapok";
        }
        $(".muszaktipusn-content"+element).on("drop", function(event){
            event.preventDefault();
            let data = event.originalEvent.dataTransfer.getData("text");
            switch (i) {
                case 1:
                    $(event.target).parent().children(".aktualisnapok").append(document.getElementById(data));
                    break;
                case 2:
                    $(event.target).parent().children(".aktualisnapok").append(document.getElementById(data));
                    break;
                case 3:
                    event.target.closest(".aktualisnapok").append(document.getElementById(data));
                    break;
                default:
                    $(event.target).children(".aktualisnapok").append(document.getElementById(data));
                    break;
            }    
        });
    
        $(".muszaktipusn-content"+element).on("dragover", function(event){
            event.preventDefault();
        });
    }
    

    $("#muszaktipusnapok-content").on("drop", function(event){
        event.preventDefault();
        let data = event.originalEvent.dataTransfer.getData("text");
        $("#muszaktipusnapok-content").append(document.getElementById(data));
    });

    $("#muszaktipusnapok-content").on("dragover", function(event){
        event.preventDefault();
    });

    for (let i = 1; i < 8; i++) {
        $("#muszaktipusnapok-content #mnap"+i).on("dragstart",function(event){
            event.originalEvent.dataTransfer.setData("text", event.target.id);
        });
    }
    
});