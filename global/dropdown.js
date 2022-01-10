$(function () {
  $(".dropbtn1").on("click", dropDownMenu);
  $(".dropbtn2").on("click", dropDownMenu2);
  $(".dropbtn3").on("click", dropDownMenu3);
  $(".dropbtn4").on("click", dropDownMenu4);
  $(".dropbtn1 aside").click(dropDownMenu());
  $(".dropdown-content1 a").on("click", ()=>  {
       $(".dropdown-content1").removeClass("show");
       
  });
  $(".dropdown-content1").removeClass("show");
  $(document).click(function(e) {
    if (!$(e.target).is('a, ul, span, button'))
    {
      $(".dropdown-content1").removeClass("show");
    }
    
  });

  function dropDownMenu() {
    $("#myDropdown1").toggleClass("show");
    dropDownOpen(1);
    
  }
  function dropDownMenu2() {
    $("#myDropdown2").toggleClass("show");
    dropDownOpen(2);
  }

  function dropDownMenu3() {
    $("#myDropdown3").toggleClass("show");
    dropDownOpen(3);
  }

  function dropDownMenu4() {
    $("#myDropdown4").toggleClass("show");
    dropDownOpen(4);
  }
 
  function dropDownOpen(id){
    window.onclick = function (event) {
      if (!event.target.matches(".dropbtn"+id)) {
        let dropdowns = $(".dropdown-content"+id);
        let i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
  }

  
});
