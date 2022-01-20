$(function () {
  let menu = "#Alkalmazottak .dropdown-content";

  let vegpont = "http://127.0.0.1:5500/json/alkalmazott.json";
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
      event.preventDefault;
      var x = event.pageX - $("#Alkalmazottak").offset().left;
      var y = event.pageY - $("#Alkalmazottak").offset().top;

      $(menu).css("left", x + 25);
      $(menu).css("top", y);
      $(menu).css("z-index", 1);
      $(menu).removeClass("tablaDropdown");
    }
  });

  $(window).click(function () {
    $(menu).addClass("tablaDropdown");
  });
});
