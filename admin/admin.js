$(function(){
    const alkalmazottak = [];
    const ajax = new Ajax(); 
    ajax.ajaxGet("http://127.0.0.1:5500/json/alkalmazott.json",alkalmazottAdmin);  
    
    
    function alkalmazottAdmin(eredmeny){
      const SZULO = $(".Alkalmazottak");
      let fej = "";
      for (const key in eredmeny[0]) {
        fej+=`<td>${key}</td>`;
      }
      fej+=`<td>munkaviszony_vége</td>`;
      $(".fejlec").html(fej); 
      
      eredmeny.forEach((e)=>{
        let alkalmazott = new Alkalmazott(SZULO,e);
        alkalmazottak.push(alkalmazott);
      });
     
    }

});