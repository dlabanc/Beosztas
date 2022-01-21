


$(function () {
  const {ajaxGet} = new Ajax();
  ajaxGet("http://127.0.0.1:5500/json/alkalmazott.json",(adatok)=>{
    
  sor = 0;

  for (const [key, value] of Object.entries(adatok[25])) {
    kulcs = key.replace("_", " ");
    
    if (sor < 5) {
      $("#elso").append(
        "<tr id=" +
          sor +
          "><th>" +
          kulcs +
          "</th><td>" +
          value +
          "<span class='showButton fa fa-edit'></td></tr>"
      );
    } else {
      $("#masodik").append(
        "<tr id=" +
          sor +
          "><th>" +
          kulcs +
          "</th><td>" +
          value +
          "<span class='showButton fa fa-edit'></td></tr>"
      );
    }
    sor++;
  }

  $("tr").hover(modosit);

  function modosit() {
    $("tr span").eq(this.id).toggleClass("showButton");
  }
  })
  
 
  
});
