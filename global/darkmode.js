$(function () {
  
  

  const darkmode = new Darkmode();
  $(".btn").on("click", ()=>{darkmode.toggle()});

  $(".darkmode-user").on("click", ()=>{darkmode.toggle()});

  function megjelenites() {
    $("html").hasClass("darkmode--activated") ? 
    $(".darkmode-user").text("Sötét mód") :  $(".darkmode-user").text("Világos mód");
  }

});
