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
       
       document.getElementById("mySidenav").style.width = "240px";
     
        width = 240;
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0px";
        
        width = 0;
      }
});