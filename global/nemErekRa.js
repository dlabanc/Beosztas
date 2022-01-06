$(function () {
  const muszakok = [
    {
      "1. Műszak": "6:00-8:00",
      "2. Műszak": "8:00-10:00",
      "3. Műszak": "10:00-12:00",
      "4. Műszak": "12:00-14:00",
      "5. Műszak": "14:00-16:00",
      "6. Műszak": "16:00-18:00",
      "7. Műszak": "18:00-20:00",
      "8. Műszak": "20:00-22:00",
    },
    {
      "1. Műszak": "6:00-8:00",
      "2. Műszak": "8:00-10:00",
      "3. Műszak": "10:00-12:00",
      "4. Műszak": "12:00-14:00",
      "5. Műszak": "14:00-16:00",
      "6. Műszak": "16:00-18:00",
      "7. Műszak": "18:00-20:00",
      "8. Műszak": "20:00-22:00",
    },
    {
      "1. Műszak": "6:00-8:00",
      "2. Műszak": "8:00-10:00",
      "3. Műszak": "10:00-12:00",
      "4. Műszak": "12:00-14:00",
      "5. Műszak": "14:00-16:00",
      "6. Műszak": "16:00-18:00",
      "7. Műszak": "18:00-20:00",
      "8. Műszak": "20:00-22:00",
    },
    {
      "1. Műszak": "6:00-8:00",
      "2. Műszak": "8:00-10:00",
      "3. Műszak": "10:00-12:00",
      "4. Műszak": "12:00-14:00",
      "5. Műszak": "14:00-16:00",
      "6. Műszak": "16:00-18:00",
      "7. Műszak": "18:00-20:00",
      "8. Műszak": "20:00-22:00",
    },
    {
      "1. Műszak": "8:00-10:00",
      "2. Műszak": "10:00-12:00",
      "3. Műszak": "12:00-14:00",
      "4. Műszak": "14:00-16:00",
      "5. Műszak": "16:00-18:00",
      "6. Műszak": "18:00-20:00",
    },
    {
      "1. Műszak": "8:00-10:00",
      "2. Műszak": "10:00-12:00",
      "3. Műszak": "12:00-14:00",
      "4. Műszak": "14:00-16:00",
      "5. Műszak": "16:00-18:00",
      "6. Műszak": "18:00-20:00",
    },
    {
      "1. Műszak": "8:00-10:00",
      "2. Műszak": "10:00-12:00",
      "3. Műszak": "12:00-14:00",
      "4. Műszak": "14:00-16:00",
      "5. Műszak": "16:00-18:00",
      "6. Műszak": "18:00-20:00",
    },
  ];

  esemenyek("#hetfo", "#Hetfo");
  esemenyek("#kedd", "#Kedd");
  esemenyek("#szerda", "#Szerda");
  esemenyek("#csutortok", "#Csutortok");
  esemenyek("#pentek", "#Pentek");
  esemenyek("#szombat", "#Szombat");
  esemenyek("#vasarnap", "#Vasarnap");

  function openPage(pageName) {
    for (let i = 0; i < $(".lapoz").length; i++) {
      $(".lapoz").css("display", "none");
    }

    $(pageName).css("display", "flex");
  }

  function esemenyek(id1, id2) {
    $(id1).on("click", function () {
      for (let i = 0; i < $(".nap").length; i++) {
        $(".nap").css("background-color", "transparent");
      }
      $(id1).css("background-color", "rgb(24, 206, 167, 0.7)");
      openPage(id2);
    });
  }

  //Dátum beállítása
  d = new Date();
  var day = d.getDay();
  var diff = d.getDate() - day + (day == 0 ? -6 : 1);

  var kezdoDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + diff;
  var zaroDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (diff + 6);
  $("#datum").append(kezdoDate + "  -  " + zaroDate);

  //feltöltés

  for (let index = 0; index < muszakok.length; index++) {
    for (const [key, value] of Object.entries(muszakok[index])) {
      $(".lapoz").eq(index).append('<div class="muszakSzam">' + key + "<br/>" + value + "</div>");
    }
  }

  // Kattintásesemény - színez

  $(".muszakSzam").on("click", nemErekRa);

  function nemErekRa() {
    console.log($(this));
    $(this).toggleClass("kijeloltNemErekRa");
  }

  // Következő nap gomb

  $("#kovetkezoNap").on("click", tovabbLep);
  $("#elozoNap").on("click", visszaLep);

  console.log();

  function tovabbLep(ertek) {
    for (let index = 0; index < $(".lapoz").length; index++) {
      if ($(".lapoz").eq(index).css("display") === "flex") {
        $(".lapoz").eq(index).css("display", "none");
        var valtozas = index;
      }
    }
    console.log(valtozas);
    if (valtozas<6) {
      $(".lapoz").eq(valtozas + 1).css("display", "flex");
      $(".nap").eq(valtozas + 1).css("background-color", "rgb(24, 206, 167, 0.3)");
    } else {
      $(".lapoz").eq(0).css("display", "flex");
      $(".nap").eq(0).css("background-color", "rgb(24, 206, 167, 0.3)");
    }
    
    $(".nap").eq(valtozas).css("background-color", "transparent");

  }

  function visszaLep() {
    for (let index = 0; index < $(".lapoz").length; index++) {
      if ($(".lapoz").eq(index).css("display") === "flex") {
        $(".lapoz").eq(index).css("display", "none");
        var valtozas = index;
      }
    }
    console.log(valtozas);
    if (valtozas>0) {
      $(".lapoz").eq(valtozas - 1).css("display", "flex");
      $(".nap").eq(valtozas - 1).css("background-color", "rgb(24, 206, 167, 0.3)");
    } else {
      $(".lapoz").eq(6).css("display", "flex");
      $(".nap").eq(6).css("background-color", "rgb(24, 206, 167, 0.3)");
    }
    
    $(".nap").eq(valtozas).css("background-color", "transparent");

  }
});
