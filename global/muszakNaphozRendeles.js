

$(function () {
  const napok = [];
  let vegpont = "http://127.0.0.1:5500/json/muszaktipus.json";
  const ajax = new Ajax();
  ajax.ajaxGet(vegpont, muszakBeallitas);
  KovHetDatumBeallitas();
  

  function muszakBeallitas(objektum) {
    const szuloElem = $("#muszaktipusn-subcontainer");
    objektum.forEach((obj) => {
      new Muszak(szuloElem, obj);
    });
  }
 
  function KovHetDatumBeallitas() {
    
    class Nap{
      constructor(datum,nev,elem){
        this.datum = datum;
        this.nev = nev;
        this.elem = elem;
        
      }
        
    }
    d = new Date();
    let day = d.getDay();
    let diff = 7 - day + 1;
    for (let i = 0; i < 7; i++) {
        let aktNap = $(".muszaktipusnap").eq(i).children("h3").text();
        let datum =
        String(d.getFullYear()) +
        "." +
        String(d.getMonth() + 1).padStart(2, "0") +
        "." +
        String(d.getDate() + diff + i).padStart(2, "0");
        let nap = new Nap(datum,aktNap,$("#muszaktipusnapok-content #mnap" + (i + 1)));  
        napok.push(nap);
        $("#muszaktipusnapok-content #mnap" + (i + 1)).children("p").text(nap.datum);
    }
  }
  const elemTarolo = $("#muszaktipusnapok-content");
  $(".selectable").selectable();
  $(window).on("Torles",({detail})=>{
    detail.napok.forEach(n=>{
      n.elem.effect("fade","slow",()=>{
        elemTarolo.append(n.elem);
        n.elem.show();
      });
      
    })
    detail.napok = [];
    console.log(detail);
  });
  $(window).on("Hozzarendeles",({detail})=>{
    for (let index = 0; index < napok.length; index++) {
      const element = napok[index];
      if(element.elem.hasClass("ui-selected")){
        detail.napok.push(element);
        $( element.elem ).effect( "drop", "slow",()=>{
          detail.napokTarolo.append(element.elem);
          element.elem.show();
        } );
        
        element.elem.removeClass("ui-selected");
      }
    }
    
  })  
   

 
  
});
