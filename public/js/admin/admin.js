$(function () {
    const token = $('meta[name="csrf-token"]').attr("content");
    console.log(token);
    const ajax = new Ajax(token);
    const local = "../json/";
    const apivegpont = "http://localhost:8000/api";
    UjelemEsemenyek();
    ajaxHivasok();

    $(document).ajaxStop(function () {
        $(".loading").fadeOut(1000, () => {});
    });

    $(".Alkalmazottak")
        .closest(".tabcontent")
        .prepend(`<input type="text" placeholder="Keresés..." class="search">`);
    $(".search").keyup(function (e) {
        let ertek = $(this).val();
        ajax.ajaxApiGet(
            apivegpont + "/alkalmazott/search?q=" + ertek,
            alkalmazottAdmin
        );
    });

    infoAblak();

    function alkalmazottAdmin(eredmeny) {
        beallitasok(eredmeny, ".Alkalmazottak", Alkalmazott);
    }
    function faliujsagAdmin(eredmeny) {
        beallitasok(eredmeny, ".Faliujsag", FaliujsagPost);
    }
    function munkakorAdmin(eredmeny) {
        beallitasok(eredmeny, ".Munkakorok", MunkakorA);
    }
    function bejelenetkezesekAdmin(eredmeny) {
        beallitasok(eredmeny, ".Bejelentkezési-adatok", Bejelentkezes);
    }
    function muszakTipusAdmin(eredmeny) {
        beallitasok(eredmeny, ".Muszaktipus", Muszaktipus);
    }
    function napiMunkaEroIgenyAdmin(eredmeny) {
        beallitasok(eredmeny, ".Napimunkaeroigeny", Napimunkaeroigeny);
    }
    function napokAdmin(eredmeny) {
        beallitasok(eredmeny, ".Napok", Napok);
    }
    function beosztasAdmin(eredmeny) {
        beallitasok(eredmeny, ".Beosztas", Beosztas);
    }
    function nemdolgoznaAdmin(eredmeny) {
        beallitasok(eredmeny, ".Nemdolgozna", Nemdolgozna);
    }
    function szabadsagAdmin(eredmeny) {
        beallitasok(eredmeny, ".Szabadsag", Szabadsag);
    }

    function beallitasok(eredmeny, szulo, osztaly) {
        const SZULO = $(szulo);
        const fejlec = SZULO.find(".fejlec").clone();
        SZULO.empty();

        let fej = "";
        let i = 0;
        for (const key in eredmeny[0]) {
            kulcs = key.replace("_", " ");
            fej += `<td>${kulcs}</td>`;
            i++;
        }
        fej += `<td></td><td></td>`;
        SZULO.prepend(fejlec);
        $(`${szulo} .fejlec`).html(fej);

        eredmeny.forEach((e, index) => {
            let objektum = new osztaly(SZULO, e, ajax);
        });
    }

    function infoAblak() {
        ajax.ajaxApiGet(apivegpont + "/alkalmazottak", (adatok) => {
            $(".stat1value").html(`${adatok.length}`);
        });
        ajax.ajaxApiGet(apivegpont + "/alkalmazottak", (adatok) => {
            $(".stat2value").html(`${adatok[adatok.length - 1].nev}`);
        });
        ajax.ajaxGet(local + "bejelentkezesi_adatok.json", (adatok) => {
            $(".stat4value").html(`${adatok.length}`);
        });
        ajax.ajaxApiGet(apivegpont + "/faliujsagok", (adatok) => {
            let d = new Date();
            let db = 0;
            let nap =
                String(d.getFullYear()) +
                "-" +
                String(d.getMonth() + 1).padStart(2, "0") +
                "-" +
                String(d.getDate()).padStart(2, "0");

            adatok.forEach((a) => {
                if (a.mikor === nap) {
                    db++;
                }
            });
            $(".stat3value").html(`${db}`);
        });
    }

    function UjelemEsemenyek() {
        $(".tabcontent")
            .parent()
            .find("h3").after(`<button class="fas fa-plus uj"></button><div class="ujmezo"></div>`);

        ujFelvetele(".Nemdolgozna",nemDolgoznaInput,"Új Nem dolgozna felvétele");
        ujFelvetele(".Szabadsag",szabadsagInput,"Új Szabadság felvétele");
        ujFelvetele(".Beosztas",beosztasInput,"Új Beosztás felvétele");
        ujFelvetele(".Napok",napokInput,"Új Nap felvétele");
        ujFelvetele(".Napimunkaeroigeny",napimunkaeroigenyInput,"Új Napi Munkaerőígény felvétele");
        ujFelvetele(".Muszaktipus",muszaktipusInput,"Új Műszaktípus felvétele");
        ujFelvetele(".Faliujsag",faliujsagInput,"Új Faliújság felvétele");
        ujFelvetele(".Bejelentkezési-adatok",bejelentkezesekInput,"Új Bejelentkezés felvétele");
        ujFelvetele(".Munkakorok",munkakorInput,"Új Munkakör felvétele");
        ujFelvetele(".Alkalmazottak",alkalmazottInput,"Új Alkalmazott felvétele");
    }

    function ujFelvetele(elem,inputok,cim) {
        $(elem)
            .parent()
            .find(".uj")
            .on("click", () => {
                tablazat = $(elem);
                add(tablazat, inputok,cim );
            });
    }

    function add(tablazat, input,cim) {
        tablazat.hide();
        tablazat
            .parent()
            .find(".ujmezo")
            .html(`<fieldset><legend>${cim}</legend></fieldset>`);
        let mezo = tablazat.parent().find(".ujmezo fieldset");
        input(mezo);
        mezo.append('<div class="admin-new-buttons"></div>');
        mezo.find(".admin-new-buttons").append(
            `<button class="fas fa-check admin-new-ok"></button>`
        );
        mezo.find(".admin-new-buttons").append(
            `<button class="fas fa-times admin-new-megse"></button>`
        );
        mezo.slideDown(1000);
        mezo.find(".admin-new-megse").on("click", () => {
            mezo.slideUp(1000);
            mezo.empty();
            tablazat.show();
        });
        mezo.find(".admin-new-ok").on("click", () => {
            mezo.slideUp(1000);
            mezo.empty();
            tablazat.show();
        });
    }
    function alkalmazottInput(mezo) {
        mezo.append(`<div class="label-input"><label>Dolgozói azonosító:</label><input type="text" placeholder="Dolgozói Azonosító..."></div>`);
        mezo.append(`<div class="label-input"><label>Név:</label><input type="text" placeholder="Név..."></div>`);
        mezo.append(`<div class="label-input"><label>Munkakör:</label><input type="text" placeholder="Munkakör..."></div>`);
        mezo.append(`<div class="label-input"><label>Adóazonosító:</label><input type="number" placeholder="Adóazonosító"></div>`);
        mezo.append(`<div class="label-input"><label>Taj:</label><input type="number" placeholder="Taj..."></div>`);
        mezo.append(`<div class="label-input"><label>Elérhetőség:</label><input type="phone" placeholder="+20 111 11 11"></div>`);
        mezo.append(`<div class="label-input"><label>Email:</label><input type="email" placeholder="pelda@chillout.hu..."></div>`);
        mezo.append(`<div class="label-input"><label>Heti óraszám:</label><input type="number" placeholder="Heti óraszám"></div>`);
        mezo.append(`<div class="label-input"><label>Lakcím:</label><input type="text" placeholder="Lakcím"></div>`);
        mezo.append(`<div class="label-input"><label>Munkaviszony kezdete:</label><input type="date"></div>`);
        mezo.append(`<div class="label-input"><label>Munkaviszony vége:</label><input type="date"></div>`);
    }
    function munkakorInput(mezo) {
        mezo.append(`<div class="label-input"><label>Megnevezés:</label><input type="text" placeholder="Megnevezés..."></div>`);
        mezo.append(`<div class="label-input"><label>Leírás:</label><input type="text" placeholder="Leírás"></div>`);
        mezo.append(`<div class="label-input"><label>Munkafőnök:</label><input type="number" placeholder="Munkafőnök száma"></div>`);
    }

    function bejelentkezesekInput(mezo) {
        mezo.append(`<div class="label-input"><label>Alkalmazott:</label><input type="text" placeholder="Alkalmazott..."></div>`);
        mezo.append(`<div class="label-input"><label>Alkalmazott:</label><input type="password"></div>`);
    }

    function faliujsagInput(mezo) {
        mezo.append(`<div class="label-input"><label>Dolgozói azonosító:</label><input type="text" placeholder="Dolgozói Azonosító..."></div>`);
        mezo.append(`<div class="label-input"><label>Tartalom:</label><input type="text" placeholder="Tartalom..."></div>`);
        mezo.append(`<div class="label-input"><label>Cím:</label><input type="textarea" placeholder="Cím..."></div>`);
        mezo.append(`<div class="label-input"><label>Mikor:</label><input type="date""></div>`);
    }

    function muszaktipusInput(mezo) {
        mezo.append(`<div class="label-input"><label>Műszaktípus:</label><input type="text" placeholder="Műszaktípus..."></div>`);
        mezo.append(`<div class="label-input"><label>Leírás:</label><input type="textarea" placeholder="Műszaktípus..."></div>`);
       
    }

    function napimunkaeroigenyInput(mezo) {
        mezo.append(`<div class="label-input"><label>Dátum:</label><input type="date""></div>`);
        mezo.append(`<div class="label-input"><label>Műszakszám:</label><input type="text" placeholder="Műszakszám..."></div>`);
        mezo.append(`<div class="label-input"><label>Munkakör:</label><input type="text" placeholder="Munkakör..."></div>`);
        mezo.append(`<div class="label-input"><label>Darab:</label><input type="number" ></div>`);
        mezo.append(`<div class="label-input"><label>Műszaktípus:</label><input type="text" placeholder="Műszaktípus..."></div>`);
       
    }
    function napokInput(mezo) {
        
        mezo.append(`<div class="label-input"><label>Nap:</label><input type="date""></div>`);
        mezo.append(`<div class="label-input"><label>Műszaktípus:</label><input type="text" placeholder="Műszaktípus..."></div>`);
        mezo.append(`<div class="label-input"><label>Állapot:</label><input type="text" placeholder="1 vagy 0..."></div>`);
    }

    function nemDolgoznaInput(mezo) {
        mezo.append(`<div class="label-input"><label>Alkalmazott:</label><input type="text" placeholder="Alkalmazott..."></div>`);
        mezo.append(`<div class="label-input"><label>Dátum:</label><input type="date""></div>`);
        mezo.append(`<div class="label-input"><label>Műszaktípus:</label><input type="text" placeholder="Műszaktípus..."></div>`);
        mezo.append(`<div class="label-input"><label>Műszakszám:</label><input type="text" placeholder="Műszakszám..."></div>`);
    }
    function szabadsagInput(mezo) {
        mezo.append(`<div class="label-input"><label>Alkalmazott:</label><input type="text" placeholder="Alkalmazott..."></div>`);
        mezo.append(`<div class="label-input"><label>Tól:</label><input type="date""></div>`);
        mezo.append(`<div class="label-input"><label>Ig:</label><input type="date""></div>`);
        mezo.append(`<div class="label-input"><label>Szabadságtípus:</label><input type="text" placeholder="Szabaságtípus..."></div>`);
    }
    function beosztasInput(mezo) {
        mezo.append(`<div class="label-input"><label>Dátum:</label><input type="date""></div>`);
        mezo.append(`<div class="label-input"><label>Műszakszám:</label><input type="text" placeholder="Műszakszám..."></div>`);
        mezo.append(`<div class="label-input"><label>Munkakör:</label><input type="text" placeholder="Munkakör..."></div>`);
        mezo.append(`<div class="label-input"><label>Alkalmazott:</label><input type="text" placeholder="Alkalmazott..."></div>`);
        mezo.append(`<div class="label-input"><label>Műszaktípus:</label><input type="text" placeholder="Műszaktípus..."></div>`);
        
    }

    //Modosit

    $(window).on("Mentes", ({ detail }) => {
        for (const key in detail.adat) {
            let ertek = detail.clone.find(`.${key}`).val();
            if (ertek == "null") {
                ertek = "";
            }
            detail.adat[key] = ertek;
        }

        detail.put();
        detail.node.find("tr").remove();

        if (detail instanceof Alkalmazott) {
            ajax.ajaxApiGet(detail.apivegpont, alkalmazottAdmin);
        } else if (detail instanceof Muszaktipus) {
            ajax.ajaxApiGet(detail.apivegpont, muszakTipusAdmin);
        } else if (detail instanceof MunkakorA) {
            ajax.ajaxApiGet(detail.apivegpont, munkakorAdmin);
        } else if (detail instanceof Bejelentkezes) {
        } else if (detail instanceof FaliujsagPost) {
            ajax.ajaxApiGet(detail.apivegpont, faliujsagAdmin);
        } else if (detail instanceof Napimunkaeroigeny) {
            ajax.ajaxApiGet(detail.apivegpont, napiMunkaEroIgenyAdmin);
        } else if (detail instanceof Napok) {
            ajax.ajaxApiGet(detail.apivegpont, napokAdmin);
        } else if (detail instanceof Beosztas) {
            ajax.ajaxApiGet(detail.apivegpont, beosztasAdmin);
        } else if (detail instanceof Nemdolgozna) {
            ajax.ajaxApiGet(detail.apivegpont, nemdolgoznaAdmin);
        } else if (detail instanceof Szabadsag) {
            ajax.ajaxApiGet(detail.apivegpont, szabadsagAdmin);
        }
    });
    //Torles

    $(window).on("torles", ({ detail }) => {
        detail.delete();
        detail.node.find("tr").remove();
        delete detail;

        if (detail instanceof Alkalmazott) {
            ajax.ajaxApiGet(detail.apivegpont, alkalmazottAdmin);
        } else if (detail instanceof Muszaktipus) {
            ajax.ajaxApiGet(detail.apivegpont, muszakTipusAdmin);
        } else if (detail instanceof MunkakorA) {
            ajax.ajaxApiGet(detail.apivegpont, munkakorAdmin);
        } else if (detail instanceof Bejelentkezes) {
        } else if (detail instanceof FaliujsagPost) {
            ajax.ajaxApiGet(detail.apivegpont, faliujsagAdmin);
        } else if (detail instanceof Napimunkaeroigeny) {
            ajax.ajaxApiGet(detail.apivegpont, napiMunkaEroIgenyAdmin);
        } else if (detail instanceof Napok) {
            ajax.ajaxApiGet(detail.apivegpont, napokAdmin);
        } else if (detail instanceof Beosztas) {
            ajax.ajaxApiGet(detail.apivegpont, beosztasAdmin);
        } else if (detail instanceof Nemdolgozna) {
            ajax.ajaxApiGet(detail.apivegpont, nemdolgoznaAdmin);
        } else if (detail instanceof Szabadsag) {
            ajax.ajaxApiGet(detail.apivegpont, szabadsagAdmin);
        }
    });

    function ajaxHivasok() {
        ajax.ajaxApiGet(apivegpont + "/alkalmazottak", alkalmazottAdmin);
        ajax.ajaxApiGet(apivegpont + "/faliujsagok", faliujsagAdmin);
        ajax.ajaxApiGet(apivegpont + "/munkakorok", munkakorAdmin);
        ajax.ajaxGet(
            local + "bejelentkezesi_adatok.json",
            bejelenetkezesekAdmin
        );
        ajax.ajaxApiGet(apivegpont + "/muszaktipusok", muszakTipusAdmin);
        ajax.ajaxApiGet(
            apivegpont + "/napimunkaeroigenyek",
            napiMunkaEroIgenyAdmin
        );
        ajax.ajaxApiGet(apivegpont + "/napokossz", napokAdmin);
        ajax.ajaxApiGet(apivegpont + "/beosztasok", beosztasAdmin);
        ajax.ajaxApiGet(apivegpont + "/nemdolgoznaossz", nemdolgoznaAdmin);
        ajax.ajaxApiGet(apivegpont + "/szabadsagok", szabadsagAdmin);
    }
});
