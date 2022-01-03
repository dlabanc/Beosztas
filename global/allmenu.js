$(function(){
    $(".openbtn").on("click",openNav);
    $(".closebtn").on("click",closeNav);
    $("#mySidenav a").on("click",closeNav);
    $(document).click(function(e) {
      if (!$(e.target).is('a, ul, span, button'))
      {
        closeNav();
      }
      
    }); 
    function openNav() {
        document.getElementById("mySidenav").style.width = "240px";
        $(".container").css("opacity","0.3");
        
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0px";
        $(".container").css("opacity","1");
      }
});