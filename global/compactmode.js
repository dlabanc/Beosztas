$(function(){
    $(".compactmode").on("click",function(){
      megjelenites();
      $("*").toggleClass("compact-mode");
    
    });
    function megjelenites() {
      $("html").hasClass("compact-mode") ? 
      $(".compactmode").text("Kompakt mód") :  $(".compactmode").text("Normál mód");
    }
});