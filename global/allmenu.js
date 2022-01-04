$(function(){
  let width = 0;
  $(".openbtn").on('click', function() {
    $('#mySidenav').css("width", width ? closeNav : openNav);
    
});
    $(".closebtn").on("click",closeNav);
    $("#mySidenav a").on("click",closeNav);
    $(document).click(function(e) {
      if (!$(e.target).is('a, ul, span, button'))
      {
        closeNav();
      }
      
    }); 
    function openNav() {
        let screen = window.matchMedia("(max-width:600)");
       document.getElementById("mySidenav").style.width = "240px";
        $(".container").css("opacity","0.3");
        width = 240;
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0px";
        $(".container").css("opacity","1");
        width = 0;
      }
});