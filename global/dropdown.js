$(function () {
  $(".dropbtn").on("click", dropDownMenu);
  $(".dropbtn2").on("click", dropDownMenu2);
  $(".dropbtn3").on("click", dropDownMenu3);
  $(".dropbtn4").on("click", dropDownMenu4);
  $(".dropbtn aside").on("click", () => {dropDownMenu});
 
  
  function dropDownMenu() {
    $("#myDropdown").toggleClass("show");
    dropDownOpen();
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
