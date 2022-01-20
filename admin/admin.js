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

    const ajax = new Ajax(); 
    const local = "http://127.0.0.1:5500/json/";

    ajax.ajaxGet(local+"alkalmazott.json",alkalmazottAdmin);  
    ajax.ajaxGet(local+"faliujsag.json",faliujsagAdmin);
    ajax.ajaxGet(local+"munkakor.json",munkakorAdmin);
    ajax.ajaxGet(local+"bejelentkezesi_adatok.json",bejelenetkezesekAdmin);
    ajax.ajaxGet(local+"muszaktipus.json",muszakTipusAdmin);
    ajax.ajaxGet(local+"napimunkaeroigeny.json",napiMunkaEroIgenyAdmin);
    ajax.ajaxGet(local+"napok.json",napokAdmin);
    ajax.ajaxGet(local+"napok.json",beosztasAdmin);
    ajax.ajaxGet(local+"napok.json",nemdolgoznaAdmin);
    ajax.ajaxGet(local+"napok.json",szabadsagAdmin);
    
    function alkalmazottAdmin(eredmeny){
     alkalmazottBeallitasok(eredmeny,".Alkalmazottak",Alkalmazott,alkalmazottak);
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
      for (const key in eredmeny[0]) {
        fej+=`<td>${key}</td>`;
      }
      fej+=`<td></td><td></td>`;
      $(`${szulo} .fejlec`).html(fej); 
      eredmeny.forEach((e)=>{
        let objektum = new osztaly(SZULO,e);
      
        osztalyTomb.push(objektum);
      });
    }

    function alkalmazottBeallitasok(eredmeny,szulo,osztaly,osztalyTomb){
      const SZULO = $(szulo);
      let fej = "";
      for (const key in eredmeny[0]) {
        fej+=`<td>${key}</td>`;
      }
      fej+=`<td>Munkaviszony_vége</td><td></td><td></td>`;
      $(`${szulo} .fejlec`).html(fej); 
      eredmeny.forEach((e)=>{
        let objektum = new osztaly(SZULO,e);
      
        osztalyTomb.push(objektum);
      });
    }

});