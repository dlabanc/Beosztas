$(function () {
    const token = $('meta[name="csrf-token"]').attr("content");
    const ajax = new Ajax(token);
    const { ajaxGet, ajaxApiGet, ajaxApiPut, ajaxApiDelete } = ajax;
    const apivegpont = "http://localhost:8000/api";
    muszakNaphozRendelese();
    munkakorok();
    muszakok();
    muszakEloszlas();
    managerStatisztika();
    alkalmazottTabla();
    napiMin();
    faliujsag();
    ProfilAdatok();
    ProfilGomb();

    //ajaxApiGet - Rendben
    function muszakNaphozRendelese() {
        const napok = [];
        const muszakok = [];
        let napokApi = apivegpont + "/napok";

        KovHetDatumBeallitas();
        ajaxApiGet(apivegpont + "/muszaktipusok", muszakBeallitas);

        function muszakBeallitas(objektum) {
            const szuloElem = $("#muszaktipusn-subcontainer");
            objektum.forEach((obj) => {
                let muszak = new Muszak(szuloElem, obj);
                muszakok.push(muszak);
            });
            ajaxApiGet(apivegpont + "/napokossz", (adatok) => {
                adatok.forEach((aktualisNap) => {
                    let datum = aktualisNap.nap;
                    let muszak = aktualisNap.muszaktipus;
                    console.log(muszak);
                    muszakok.forEach((m) => {
                        if (muszak == m.adat.tipus) {
                            napok.forEach((n) => {
                                if (datum == n.datum) {
                                    m.napokTarolo.append(n.elem);
                                }
                            });
                        }
                    });
                });
            });

            $("#muszaktipushsave").on("click", () => {
                muszakok.forEach((m) => {
                    if (m.napok.length > 0) {
                        for (const nap in m.napok) {
                            let uj = {
                                nap: m.napok[nap].datum,
                                muszaktipus: m.adat.tipus,
                                allapot: 0,
                            };
                            ajax.ajaxApiPost(napokApi, uj);
                        }
                    }
                });
            });
        }

        function KovHetDatumBeallitas() {
            class Nap {
                constructor(datum, nev, elem) {
                    this.datum = datum;
                    this.nev = nev;
                    this.elem = elem;
                }
            }
            let d = new Date();
            let day = d.getDay();
            let diff = 7 - day + 1;
            for (let i = 0; i < 7; i++) {
                let aktNap = $(".muszaktipusnap").eq(i).children("h3").text();
                let datum =
                    String(d.getFullYear()) +
                    "-" +
                    String(d.getMonth() + 1).padStart(2, "0") +
                    "-" +
                    String(d.getDate() + diff + i).padStart(2, "0");
                let nap = new Nap(
                    datum,
                    aktNap,
                    $("#muszaktipusnapok-content #mnap" + (i + 1))
                );
                napok.push(nap);
                $("#muszaktipusnapok-content #mnap" + (i + 1))
                    .children("p")
                    .text(nap.datum);
            }
        }

        const elemTarolo = $("#muszaktipusnapok-content");
        $(".selectable").selectable();
        $(window).on("Torles", ({ detail }) => {
            let l = detail.elem.find(".aktualisnapok").children().length;
            if (detail.napok.length < 1) {
                for (let index = 0; index < l; index++) {
                    ajax.ajaxApiDelete(
                        napokApi,
                        detail.elem
                            .find(".aktualisnapok")
                            .children()
                            .eq(index)
                            .find("p")
                            .text()
                    );
                }
            }
            detail.napok.forEach((n) => {
                n.elem.effect("fade", "slow", () => {
                    elemTarolo.append(n.elem);
                    n.elem.show();
                });
            });
            detail.napok = [];
        });
        $(window).on("Hozzarendeles", ({ detail }) => {
            for (let index = 0; index < napok.length; index++) {
                const element = napok[index];
                if (element.elem.hasClass("ui-selected")) {
                    detail.napok.push(element);
                    $(element.elem).effect("drop", "slow", () => {
                        detail.napokTarolo.append(element.elem);
                        element.elem.show();
                    });

                    element.elem.removeClass("ui-selected");
                }
            }
        });
    }
    //ajaxApiGet - Rendben
    function munkakorok() {
        ajaxApiGet(apivegpont + "/munkakorok", munkakorBeallitas);

        const munkakorApi = "http://localhost:8000/api/munkakor";
        const szuloElem = $(".munkakor-container");

        $(window).on("MunkakorTorles", ({ detail }) => {
            detail.ajax.ajaxApiDelete(detail.api, detail.adat.megnevezes);
            ajaxApiGet(apivegpont + "/munkakorok", munkakorBeallitas);
        });

        function munkakorBeallitas(munkakorok) {
            szuloElem.empty();
            szuloElem.hide();
            let sablon = `<div class="munkakor-content munkakor-content-sablon">
            <div class="label-input">
            <label>Megnevezés:</label>
            <input type="text" name="megnevezes">
            </div>
            <div class="label-input">
            <label>Leírás:</label>
            <input type="text" name="leiras">
            </div> 
            <div class="manager-new-buttons">
            <button class="fas fa-check manager-new-ok"></button>
            <button class="fas fa-times manager-new-megse"></button>
            </div>
            </div>`;

            szuloElem.append(sablon);
            let sablonElem = szuloElem.find(".munkakor-content-sablon");
            sablonElem.find(".manager-new-ok").on("click", () => {
                let adatok = {};
                for (
                    let index = 0;
                    index < sablonElem.find(".label-input input").length;
                    index++
                ) {
                    let ertek = sablonElem
                        .find(".label-input input")
                        .eq(index)
                        .val();
                    let kulcs = sablonElem
                        .find(".label-input input")
                        .eq(index)
                        .attr("name");
                    adatok[kulcs] = ertek;
                }
                ajax.ajaxApiPost(munkakorApi, adatok);

                ajaxApiGet(apivegpont + "/munkakorok", munkakorBeallitas);
                sablonElem.fadeOut("1000");
            });
            sablonElem.find(".manager-new-megse").on("click", () => {
                sablonElem.fadeOut("1000");
            });
            munkakorok.forEach((elem) => {
                new Munkakor(szuloElem, elem, ajax);
            });
            szuloElem.slideDown(1000);
            $("#newmunkakor").on("click", () => {
                sablonElem.effect("slide", "1000");
            });
        }
    }
    //ajaxApiGet - Rendben
    function muszakok() {
        ajaxApiGet(apivegpont + "/muszaktipusok", muszakBeallitas);

        function muszakBeallitas(muszakok) {
            const szuloElem = $(".muszaktipush-container");
            muszakok.forEach((elem) => {
                new MuszakHozzaAdas(szuloElem, elem);
            });

            $(window).on("torolh", (event) => {
                console.log(event.detail.tipus);
            });

            $(window).on("modosith", (event) => {
                console.log(event.detail.tipus);
            });
        }
    }
    //ajaxApiGet - Hibás
    function muszakEloszlas() {
        ajaxApiGet(apivegpont + "/muszakeloszlasok", muszakeloszlasBeallitas);

        function muszakeloszlasBeallitas(muszakok) {
            const szuloElem = $(".muszaktipusm-container");
            muszakok.forEach((elem) => {
                new MuszakEloszlas(szuloElem, elem);
            });
        }

        $(window).on("torolm", (event) => {
            console.log(event.detail.tipus);
        });

        $(window).on("modositm", (event) => {
            console.log(event.detail.tipus);
        });
    }
    //ajaxApiGet - View kell
    function managerStatisztika() {
        const localhost = "/statisztikak/";
        const statisztikaElem = document.getElementById("Man-statisztika-elem");
        let data, chart, options;

        oszlop();
        statisztikaEsemenyek();

        function oszlop() {
            ajaxGet("http://localhost:8000/api/munkakorstat", (adatok) => {
                googleChartsKonyvtar("corechart", drawChart);

                function drawChart() {
                    data = new google.visualization.DataTable();
                    chart = new google.visualization.ColumnChart(
                        statisztikaElem
                    );

                    data.addColumn("string", "munkakör");
                    data.addColumn("number", "db");

                    for (const iterator of adatok) {
                        data.addRows([[iterator.munkakor, iterator.db]]);
                    }
                    options = statisztikaBeallitasok("Munkakörök", 1500, 500);
                    chart.draw(data, options);
                }
            });
        }

        function kor() {
            ajaxGet("http://localhost:8000/api/hetioraszamstat", (adatok) => {
                googleChartsKonyvtar("corechart", drawChart);

                function drawChart() {
                    data = new google.visualization.DataTable();
                    chart = new google.visualization.ColumnChart(
                        statisztikaElem
                    );

                    data.addColumn("string", "heti óraszám");
                    data.addColumn("number", "db");

                    for (const iterator of adatok) {
                        console.log(iterator);
                        data.addRows([
                            [iterator.heti_oraszam + " óra", iterator.db],
                        ]);
                    }
                    options = statisztikaBeallitasok("Heti Óraszám", 1500, 500);
                    chart.draw(data, options);
                }
            });
        }

        function timeLine() {
            ajaxGet(localhost + "szabadsagon.json", (adatok) => {
                googleChartsKonyvtar("timeline", drawChart);

                function drawChart() {
                    chart = new google.visualization.Timeline(statisztikaElem);
                    data = new google.visualization.DataTable();

                    data.addColumn({ type: "string", id: "Név" });
                    data.addColumn({ type: "date", id: "Kezdete" });
                    data.addColumn({ type: "date", id: "Vége" });
                    for (const iterator of adatok) {
                        data.addRows([
                            [
                                iterator.név,
                                new Date(iterator.SZABADSAG[0].tól),
                                new Date(iterator.SZABADSAG[0].ig),
                            ],
                        ]);
                    }
                    chart.draw(data);
                }
            });
        }

        function googleChartsKonyvtar(csomag, metodus) {
            google.charts.load("current", { packages: [csomag] });
            google.charts.setOnLoadCallback(metodus);
        }

        function statisztikaBeallitasok(title, szelesseg, magassag) {
            let darkmode = $("body").hasClass("darkmode--activated");

            let options = {
                title: title,
                width: szelesseg,
                height: magassag,
                colors: ["#4dbba6"],
                backgroundColor: "transparent",
                bar: { groupWidth: "20%" },
            };

            if (darkmode) {
                options.hAxis = {
                    textStyle: {
                        color: "#FFFFFF",
                        titleTextStyle: { color: "#FFFFFF" },
                    },
                };
                options.vAxis = {
                    textStyle: {
                        color: "#FFFFFF",
                        titleTextStyle: { color: "#FFFFFF" },
                    },
                };
                options.legend = {
                    textStyle: {
                        color: "#FFFFFF",
                        titleTextStyle: { color: "#FFFFFF" },
                    },
                };
            }

            return options;
        }

        function statisztikaEsemenyek() {
            const elemek = [
                { elem: "#pie", metodus: kor },
                { elem: "#stream", metodus: timeLine },
                { elem: "#bar", metodus: oszlop },
            ];
            elemek.forEach(({ elem, metodus }) => {
                statisztikaValt(elem, metodus);
            });
            function statisztikaValt(ID, diagram) {
                $(`${ID.toString()}`).on("click", (e) => {
                    $(statisztikaElem).effect("clip", "2000", () => {
                        diagram();
                        $(statisztikaElem).fadeIn("slow");
                    });
                });
            }
        }
    }

    //ajaxApiGet - Rendben
    function faliujsag() {
        ajaxApiGet(apivegpont + "/faliujsagok", faliujsagBeallitas);

        function faliujsagBeallitas(muszakok) {
            const szuloElem = $(".faliujsag-container");
            muszakok.forEach((elem) => {
                new Faliujsag(szuloElem, elem);
            });
            ajaxGet(
                "https://randomuser.me/api/?results=" + muszakok.length,
                (kepek, i) => {
                    kepek.results.map((ember, index) => {
                        $(".post-content")
                            .eq(index)
                            .find("img")
                            .attr("src", ember.picture.large);
                        $(".profilepic").attr("src", ember.picture.large);
                        $(".profilepic").fadeIn(1000);
                        $("#Profiladatok")
                            .find("img")
                            .attr("src", ember.picture.large);
                    });
                }
            );
            $(window).on("modositf", (event) => {
                console.log(event.detail.azonosito);
            });

            $(window).on("torolf", (event) => {
                console.log(event.detail.azonosito);
            });
        }
    }
    //ajaxApiGet - Rendben
    function alkalmazottTabla() {
        let menu = "#Alkalmazottak .dropdown-content";
        $("#Alkalmazottak").prepend(
            `<input type="text" placeholder="Keresés..." class="search">`
        );

        ajaxApiGet(apivegpont + "/alkalmazottak", alkalmazottTabla);

        function alkalmazottTabla(alkalmazottak) {
            const szuloElem = $("#AlkalmazottakTabla");
            szuloElem.empty();
            new AlkalmazottTabla(szuloElem, () => {});
            alkalmazottak.forEach((elem, index) => {
                new AlkalmazottTabla(szuloElem, elem, index);
            });
        }

        $(".search").keyup(function (e) {
            let ertek = $(this).val();
            console.log(ertek);
            ajaxApiGet(
                apivegpont + "/alkalmazott/search?q=" + ertek,
                alkalmazottTabla
            );
        });

        $(window).on("klikk", (event) => {
            if (event.detail.id >= 0) {
                $(menu).css("z-index", 1);
                $(menu).toggleClass("tablaDropdown");
                $(menu).attr("id", event.detail.id);
            }
        });

        // $(window).click(function () {
        //   $(menu).addClass("tablaDropdown");
        //});
        $(menu).on("click", () => {
            $(menu).toggleClass("tablaDropdown");
        });

        $(menu)
            .find("#AlkModosit")
            .on("click", () => {
                $("#Alkalmazottak").css("display", "none");
                $("#Profiladatok").fadeIn(1000);
                $("#Profiladatok").css("visibility", "visible");
                ProfilAdatok($(menu).attr("id"));
            });
    }

    function ProfilGomb() {
        $("#profiladatok").on("click", () => {
            ProfilAdatok(0);
        });
    }

    //ajaxApiGet - Hibás
    function napiMin() {

        ajaxApiGet(apivegpont+"/napi")


        /*
        let vegpont = "../json/napiMin.json";

        ajaxGet("../json/napok.json", ujHivas);
        let napokTomb = [];

        function ujHivas(napok) {
            napokTomb.push(napok);
            ajaxGet(vegpont, napiMinBeallitas);
        }

        function napiMinBeallitas(napiMin) {
            const szuloElem = $("#Napimunka");
            for (let index = 0; index < napokTomb[0].length; index++) {
                new NapiMin(szuloElem, napiMin, napokTomb[0][index].nap);
            }
        }
        */


    }

    //ajaxApiGet - Rendben
    function ProfilAdatok() {
        $(".profilepic").hide();
        profilAdatok = {};
        $("#elso").empty();
        $("#masodik").empty();
        $("#Profiladatok .success").hide();
        $("#Profiladatok").prepend(
            "<p class='success'>Sikeres adatmódosítás</p>"
        );
        ajax.ajaxApiGet("http://localhost:8000/loggeduser", (adatok) => {
            logged = adatok;
            ajaxApiGet(apivegpont + "/alkalmazott/"+logged, (adatok) => {
                $(".profile-name").text("Üdvözöllek, "+adatok.nev);
                
                $(".profile-nev").text(adatok.nev);
                $(".profile-munkakor").text(adatok.munkakor);
                $(".location-address").text(adatok.lakcim);
                $(".location-phone").text(adatok.elerhetoseg);
                $(".location-email").text(adatok.email);
                let sor = 0;

                

                for (const [key, value] of Object.entries(adatok)) {
                    $("#Profiladatok").find("h2").text(adatok.nev);

                    $(".managerinfo-name").text(
                        adatok.nev + ", " + adatok.munkakor
                    );
                    let kulcs = key.replace("_", " ");

                    let adatmutat =
                        "<tr id=" +
                        sor +" " +"class="+"profile-rows"+ "><th class=fejlec>" +
                        kulcs +
                        "</th>" +
                        "<td class='kesz'>" +
                        value +
                        "<span class='modosit showButton fa fa-edit'></td>";

                    let adatszerkeszt =
                        "<td class='adatok szerkeszt'>" +
                        "<input type='text'>" +
                        "<button class='fas fa-check manager-mod-ok'>" +
                        "<button class='fas fa-times manager-mod-megse'>" +
                        "</td>" +
                        "</tr>";
                    $("#elso").append(adatmutat + adatszerkeszt);
                  
                  
                    sor++;
                }
                
                let kulcsok = ["","Név","Lakcím","Születési Dátum","Adóazonosító","TAJ","Elérhetőség","E-mail","Munkakör","Heti óraszám","Munkaviszony kezdete","Munkaviszony Vége"];
                $(".profile-rows .fejlec").eq(0).hide();
                for (let index = 1; index < $(".profile-rows .fejlec").length; index++) {
                    const element =$(".profile-rows .fejlec").eq(index);
                    element.hide();
                    element.parent().prepend(`<th>${kulcsok[index]}</th>`);
                  
                }

                $("#tables tr").hover(modosit);
                $(".tabcontent").eq(0).fadeIn(1000);
                $(".tabcontent").eq(0).css("visibility", "visible");

                $(".managerinfo").fadeIn(1000, () => {});
                $(".managerinfo").css("display", "grid");
                function modosit() {
                    $("#tables tr")
                        .eq(this.id)
                        .find(".modosit")
                        .toggleClass("showButton");
                }

                $("#tables .kesz").on("click", function () {
                    if (
                        !$("#tables td")
                            .parent()
                            .find($(".kesz"))
                            .hasClass("szerkeszt")
                    ) {
                        $(".success").removeClass("visszaigazolas");
                        $(this)
                            .parent()
                            .find("input")
                            .css("width", $(this).width() + 10);
                        if (
                            $(this).parent().find("th").text() !=
                            "dolgozoi azon"
                        ) {
                            $(this).parent().find("input").val($(this).text());
                            $(this).toggleClass("szerkeszt");
                            $(this)
                                .parent()
                                .find(".adatok")
                                .toggleClass("szerkeszt");
                        } else {
                            alert("Nem módosítható!");
                        }
                    } else {
                        alert(
                            "Előbb mentse el, vagy zárja be a korábbi szerkesztést!"
                        );
                    }
                });

                $(".manager-mod-ok").on("click", function () {
                    $(this)
                        .parent()
                        .parent()
                        .find(".kesz")
                        .html(
                            $(this).parent().find("input").val() +
                                "<span class='modosit fa fa-edit'>"
                        );

                    modositAblak($(this));

                    for (
                        let index = 0;
                        index < $("#tables tr").length;
                        index++
                    ) {
                        let kulcs = $(".fejlec")
                            .eq(index)
                            .text()
                            .replace(" ", "_");
                        let ertek = $(".kesz").eq(index).text();
                        if (ertek == "null") {
                            ertek = "";
                        }
                        profilAdatok[kulcs] = ertek;
                    }

                    ajax.ajaxApiPut(
                        apivegpont + "/alkalmazott",
                        profilAdatok.dolgozoi_azon,
                        profilAdatok,
                        visszaigazolas()
                    );
                });

                $(".manager-mod-megse").on("click", function () {
                    modositAblak($(this));
                });

                function modositAblak(adat) {
                    adat.parent()
                        .parent()
                        .find(".kesz")
                        .toggleClass("szerkeszt");
                    adat.parent().toggleClass("szerkeszt");
                }

                function visszaigazolas() {
                    $(".success").addClass("visszaigazolas");
                }
            });
        });
    }
});
