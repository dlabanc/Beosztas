$(function () {
  /*const alkalmazottak = {
    1: {
      nev: "Freddy Krüeger",
      beosztas: "Pincér",
      lakcim: "1079 Bp, Liszt Ferenc u. 12",
      elerhetoseg: "+36705325235",
      email: "freddyK@gmail.com",
    },
    2: {
      nev: "Normann Price",
      beosztas: "Szakács",
      lakcim: "1042 Bp, Angyal u. 23",
      elerhetoseg: "+36204235463",
      email: "normanM@gmail.com",
    },
  };*/

  /*let alkalmazottTomb = [];*/
  let menu = "#Alkalmazottak .dropdown-content";
  let tablaSor = $("#AlkalmazottakTabla tr");

  /* alkalmazottBeallitas(alkalmazottak, alkalmazottTomb, alkalmazottTablaFeltolt); */

  balKlikk();
  jobbKlikk();

  /* function alkalmazottBeallitas(objektum, tomb, callback) {
    Object.keys(objektum).forEach(function (key) {
      tomb.push(objektum[key]);

      callback(tomb);
    });
  }

  function alkalmazottTablaFeltolt(tomb) {
    const szuloElem = $("#AlkalmazottakTabla");
    const sablonElem = $(".TablaAdat");
    tomb.forEach(function (elem) {
      let node = sablonElem.clone().appendTo(szuloElem);
      const obj = new AlkalmazottTabla(node, elem);
    });

    sablonElem.remove();
  } */

  function jobbKlikk() {
    $(tablaSor).contextmenu(function (event) {
      if (event.target.id != 0) {
        console.log(event);
        event.preventDefault();
        var x = event.pageX - $("#Alkalmazottak").offset().left;
        var y = event.pageY - $("#Alkalmazottak").offset().top;

        $(menu).css("left", x + 25);
        $(menu).css("top", y);
        $(menu).css("z-index", 1);
        $(menu).removeClass("tablaDropdown");
      }
    });
  }

  function balKlikk() {
    $(tablaSor).click(function (event) {
      if (!$(menu).hasClass("tablaDropdown")) {
        for (let index = 0; index < tablaSor.length; index++) {
          $(tablaSor).removeClass("hoveredTabla");
        }
      }
      $(event.target.parentElement).addClass("hoveredTabla");
    });

    tablaSor.on("mouseenter", function () {
      if ($(menu).hasClass("tablaDropdown")) {
        $(this).addClass("hoveredTabla");
      }
    });

    tablaSor.on("mouseleave", function () {
      if ($(menu).hasClass("tablaDropdown")) {
        $(this).removeClass("hoveredTabla");
      }
    });

    $(window).click(function () {
      $(menu).addClass("tablaDropdown");
    });
  }
});
