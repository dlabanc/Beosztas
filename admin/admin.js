$(function(){
    const alkalmazottak = [];
    const faliujsagok = [];
    const ajax = new Ajax(); 
    const local = "http://127.0.0.1:5500/json/";
    ajax.ajaxGet(local+"alkalmazott.json",alkalmazottAdmin);  
    ajax.ajaxGet(local+"faliujsag.json",faliujsagAdmin);
    
    function alkalmazottAdmin(eredmeny){
     beallitasok(eredmeny,".Alkalmazottak",Alkalmazott,alkalmazottak);
    }

    function faliujsagAdmin(eredmeny){
      beallitasok(eredmeny,".Faliujsag",FaliujsagPost,faliujsagok);
    }
    
    function beallitasok(eredmeny,szulo,osztaly,osztalyTomb){
      const SZULO = $(szulo);
      let fej = "";
      for (const key in eredmeny[0]) {
        fej+=`<td>${key}</td>`;
      }
      
      $(".Faliujsag .fejlec").html(fej); 
      eredmeny.forEach((e)=>{
        let faliujsag = new osztaly(SZULO,e);
        osztalyTomb.push(faliujsag);
      });
    }

});