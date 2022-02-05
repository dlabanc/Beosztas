$(function () {
    const token = $('meta[name="csrf-token"]').attr("content");
    const ajax = new Ajax(token);
    const { ajaxGet, ajaxApiGet, ajaxApiDelete } = ajax;
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

    $("#Alkalmazottak").prepend(
        `<input type="text" placeholder="Keresés..." class="search">`
    );
    $(".search").keyup(function (e) {
        let ertek = $(this).val();

        ajaxApiGet(
            apivegpont + "/alkalmazott/search?q=" + ertek,
            alkalmazottTabla
        );

        function alkalmazottTabla(alkalmazottak) {
            const szuloElem = $("#AlkalmazottakTabla");
            szuloElem.empty();
            alkalmazottak.forEach((a) => {
                let b = new AlkalmazottTabla(szuloElem, a);
            });
        }
    });

    //ajaxApiGet - Rendben
    function muszakNaphozRendelese() {
        const napok = [];

        ajaxApiGet(apivegpont + "/muszaktipusok", muszakBeallitas);
        KovHetDatumBeallitas();

        function muszakBeallitas(objektum) {
            const szuloElem = $("#muszaktipusn-subcontainer");
            objektum.forEach((obj) => {
                new Muszak(szuloElem, obj);
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
                    "." +
                    String(d.getMonth() + 1).padStart(2, "0") +
                    "." +
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
            detail.napok.forEach((n) => {
                n.elem.effect("fade", "slow", () => {
                    elemTarolo.append(n.elem);
                    n.elem.show();
                });
            });
            detail.napok = [];
            console.log(detail);
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
            ajaxGet(localhost + "munkakorDb.json", (adatok) => {
                googleChartsKonyvtar("corechart", drawChart);

                function drawChart() {
                    data = new google.visualization.DataTable();
                    chart = new google.visualization.ColumnChart(
                        statisztikaElem
                    );

                    data.addColumn("string", "munkakör");
                    data.addColumn("number", "db");

                    for (const iterator of adatok) {
                        data.addRows([[iterator.munkakör, iterator.db]]);
                    }
                    options = statisztikaBeallitasok("Munkakörök", 1500, 500);
                    chart.draw(data, options);
                }
            });
        }

        function kor() {
            ajaxGet(localhost + "hetioraszamDb.json", (adatok) => {
                googleChartsKonyvtar("corechart", drawChart);

                function drawChart() {
                    data = new google.visualization.DataTable();
                    chart = new google.visualization.PieChart(statisztikaElem);

                    data.addColumn("string", "heti óraszám");
                    data.addColumn("number", "db");

                    for (const iterator of adatok) {
                        data.addRows([
                            [
                                iterator.heti_óraszám.toString() + " óra",
                                iterator.db,
                            ],
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

        ajaxApiGet(apivegpont + "/alkalmazottak", alkalmazottTabla);

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
    }
    //ajaxApiGet - Hibás
    function napiMin() {
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
    }

    //ajaxApiGet - Rendben
    function ProfilAdatok() {
        ajaxApiGet(apivegpont + "/alkalmazottak", (adatok) => {
            let sor = 0;

            for (const [key, value] of Object.entries(adatok[0])) {
                let kulcs = key.replace("_", " ");
                $("#Profiladatok").find("h2").text(adatok[0].nev);
                $(".managerinfo-name").text(
                    adatok[0].nev + ", " + adatok[0].munkakor
                );

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
            $(".tabcontent").eq(0).fadeIn(1000);
            $(".tabcontent").eq(0).css("visibility", "visible");
        });
    }
});
