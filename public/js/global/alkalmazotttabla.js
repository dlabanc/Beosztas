$(function () {
  let menu = "#Alkalmazottak .dropdown-content";

  let vegpont = "../json/alkalmazott.json";
  const ajax = new Ajax();

  ajax.ajaxGet(vegpont, alkalmazottTabla);

  function alkalmazottTabla(alkalmazottak) {
    const szuloElem = $("#AlkalmazottakTabla");
    alkalmazottak.forEach((elem) => {
      new AlkalmazottTabla(szuloElem, elem);
    });
  }

  $(window).on("jobbklikk", (event) => {
    if (event.target.id != 0) {
      console.log(event);
      
      $(menu).css("z-index", 1);
      $(menu).removeClass("tablaDropdown");
    }
  });

  $(window).click(function () {
    $(menu).addClass("tablaDropdown");
  });
});
