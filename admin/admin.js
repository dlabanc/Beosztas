$(function(){
    const alkalmazottak = [];
    const faliujsagok = [];
    const ajax = new Ajax(); 
    const local = "http://127.0.0.1:5500/json/";
    ajax.ajaxGet(local+"alkalmazott.json",alkalmazottAdmin);  
    ajax.ajaxGet(local+"faliujsag.json",faliujsagAdmin);
    
    function alkalmazottAdmin(eredmeny){
      const SZULO = $(".Alkalmazottak");
      let fej = "";
      for (const key in eredmeny[0]) {
        fej+=`<td>${key}</td>`;
      }
      fej+=`<td>munkaviszony_vége</td>`;
      $(".Alkalmazottak .fejlec").html(fej); 
      
      eredmeny.forEach((e)=>{
        let alkalmazott = new Alkalmazott(SZULO,e);
        alkalmazottak.push(alkalmazott);
      });
    }

    function faliujsagAdmin(eredmeny){
      const SZULO = $(".Faliujsag");
      let fej = "";
      for (const key in eredmeny[0]) {
        fej+=`<td>${key}</td>`;
      }
      
      $(".Faliujsag .fejlec").html(fej); 
      eredmeny.forEach((e)=>{
        let faliujsag = new FaliujsagPost(SZULO,e);
        faliujsagok.push(faliujsag);
      });
    }  

});