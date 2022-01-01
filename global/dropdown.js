$(function () {
  $(".dropbtn").on("click", dropDownMenu);
  $(".dropbtn2").on("click", dropDownMenu2);
  
  function dropDownMenu() {
    $("#myDropdown").toggleClass("show");
  }

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      let dropdowns = $(".dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
      
    }
  };

  function dropDownMenu2() {
    $("#myDropdown2").toggleClass("show");
  }

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn2")) {
      let dropdowns = $(".dropdown-content2");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
});
