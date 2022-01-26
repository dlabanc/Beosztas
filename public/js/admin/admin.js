$(function(){
    const alkalmazottak = [];
    const faliujsagok = [];
    const munkakorok = [];
    const bejelenetkezesek = [];
    const muszaktipusok = [];
    const napimunkaeroigenyek = [];
    const napok = [];
    const beosztasok = [];
    const nemdolgoznanak = [];
    const szabadsagok = [];
    const token=$('meta[name="csrf-token"]').attr('content');
    const ajax = new Ajax(token); 
    const local = "../json/";
    const apivegpont = 'http://localhost:8000/api/alkalmazottak';

    ajax.ajaxApiGet(apivegpont, alkalmazottAdmin);
    //ajax.ajaxGet(local+"alkalmazott.json",alkalmazottAdmin);  
    ajax.ajaxGet(local+"faliujsag.json",faliujsagAdmin);
    ajax.ajaxGet(local+"munkakor.json",munkakorAdmin);
    ajax.ajaxGet(local+"bejelentkezesi_adatok.json",bejelenetkezesekAdmin);
    ajax.ajaxGet(local+"muszaktipus.json",muszakTipusAdmin);
    ajax.ajaxGet(local+"napimunkaeroigeny.json",napiMunkaEroIgenyAdmin);
    ajax.ajaxGet(local+"napok.json",napokAdmin);
    ajax.ajaxGet(local+"napok.json",beosztasAdmin);
    ajax.ajaxGet(local+"napok.json",nemdolgoznaAdmin);
    ajax.ajaxGet(local+"napok.json",szabadsagAdmin);

    infoAblak();

    function alkalmazottAdmin(eredmeny){
     beallitasok(eredmeny,".Alkalmazottak",Alkalmazott,alkalmazottak);
    }
    function faliujsagAdmin(eredmeny){
      beallitasok(eredmeny,".Faliujsag",FaliujsagPost,faliujsagok);
    }
    function munkakorAdmin(eredmeny){
      beallitasok(eredmeny,".Munkakorok",MunkakorA,munkakorok);
    }
    function bejelenetkezesekAdmin(eredmeny){
      beallitasok(eredmeny,".Bejelentkezési-adatok",Bejelentkezes,bejelenetkezesek);
    }
    function muszakTipusAdmin(eredmeny){
      beallitasok(eredmeny,".Muszaktipus",Muszaktipus,muszaktipusok);
    }
    function napiMunkaEroIgenyAdmin(eredmeny){
      beallitasok(eredmeny,".Napimunkaeroigeny",Napimunkaeroigeny,napimunkaeroigenyek);
    }
    function napokAdmin(eredmeny){
      beallitasok(eredmeny,".Napok",Napok,napok);
    }
    function beosztasAdmin(eredmeny){
      beallitasok(eredmeny,".Beosztas",Beosztas,beosztasok);
    }
    function nemdolgoznaAdmin(eredmeny){
      beallitasok(eredmeny,".Nemdolgozna",Nemdolgozna,nemdolgoznanak);
    }
    function szabadsagAdmin(eredmeny){
      beallitasok(eredmeny,".Szabadsag",Szabadsag,szabadsagok);
    }

    function beallitasok(eredmeny,szulo,osztaly,osztalyTomb){
      const SZULO = $(szulo);
      let fej = "";
      let i = 0;
      for (const key in eredmeny[0]) {
        kulcs = key.replace("_", " ");
        fej+=`<td>${kulcs}</td>`;
        i++;
      }
      fej+=`<td></td><td></td>`;
      $(`${szulo} .fejlec`).html(fej); 
      eredmeny.forEach((e,index)=>{
        let objektum = new osztaly(SZULO,e);
        
        osztalyTomb.push(objektum);
      });
    }

    function infoAblak(){
      ajax.ajaxGet(local+"alkalmazott.json",(adatok)=>{$(".stat1value").html(`${adatok.length}`)});
      ajax.ajaxGet(local+"alkalmazott.json",(adatok)=>{$(".stat2value").html(`${adatok[adatok.length-1].név}`)});
      ajax.ajaxGet(local+"bejelentkezesi_adatok.json",(adatok)=>{$(".stat4value").html(`${adatok.length}`)});
      ajax.ajaxGet(local+"faliujsag.json",(adatok)=>{
        let d = new Date();
        let db = 0;
        let nap =
        String(d.getFullYear()) +
        "-" +
        String(d.getMonth()+1 ).padStart(2, "0") +
        "-" +
        String(d.getDate() ).padStart(2, "0");
        console.log(nap);
        adatok.forEach((a)=>{
          if(a.mikor === nap){
            db++;
          }
        })
        $(".stat3value").html(`${db}`)
      });
    }

    $(window).on("torles",({detail})=>{
      
      
      if(detail instanceof Alkalmazott){
        let api = "http://localhost:8000/api/alkalmazott";
        ajax.ajaxApiDelete(api,detail.adat.dolgozoi_azon);
      }
      else if(detail instanceof Muszaktipus)
      {
        console.log(detail.tipus);
       // ajax.ajaxApiDelete(api,detail.adat.dolgozoi_azon);
      }
    })

});