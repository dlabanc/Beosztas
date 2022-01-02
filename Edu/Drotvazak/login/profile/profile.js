$(function () {
  const adatok = {
    Azonosító: 123456,
    Munkakör: "Felszolgáló",
    Adóazonosító: 12345678,
    TAJ: 523634346,
    Elérhetőség: "+36706429127",
    Email: "sajtoskenyer@chill-out.hu",
    Név: "Labanc Dániel",
    Lakcím: "1066 Bp, Lakos u. 5",
    Születési_dátum: "1997-08-19",
    Munkaviszony_kezdete: "2020.04.05",
  };

  sor = 0;

  for (const [key, value] of Object.entries(adatok)) {
    kulcs = key.replace("_", " ");
    if (sor < 5) {
      $("#elso").append(
        "<tr id=" +
          sor +
          "><th>" +
          kulcs +
          "</th><td>" +
          value +
          "<span class='showButton fa fa-edit'></td></tr>"
      );
    } else {
      $("#masodik").append(
        "<tr id=" +
          sor +
          "><th>" +
          kulcs +
          "</th><td>" +
          value +
          "<span class='showButton fa fa-edit'></td></tr>"
      );
    }
    sor++;
  }

  $("tr").hover(modosit);

  function modosit() {
    $("tr span").eq(this.id).toggleClass("showButton");
  }
});
