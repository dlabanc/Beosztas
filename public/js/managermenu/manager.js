$(function () {


    const token = $('meta[name="csrf-token"]').attr("content");
    const ajax = new Ajax(token);
    const { ajaxGet, ajaxApiGet, ajaxApiPut, ajaxApiDelete } = ajax;
    const apivegpont = "http://localhost:8000/api";

    let article = $("article");

    class OldalKezelo {
        constructor(tarolo) {
            this.tarolo = tarolo;

            this.alkalmazottLink = $(document).find("#alkalmazottak");
            this.munkakorokLink = $(document).find("#munkakorok");
            this.statisztikaLink = $(document).find("#statisztika");
            this.faliujsagLink = $(document).find("#faliujsag");
            this.muszaktipushLink = $(document).find("#muszaktipush");
            this.muszaktipusnLink = $(document).find("#muszaktipusn");
            this.muszaktipusmLink = $(document).find("#muszaktipusm");
            this.napimunkaLink = $(document).find("#napimunka");
            this.ujbeosztasLink = $(document).find("#ujbeosztas");
            this.beoszasmodLink = $(document).find("#beosztasmod");
            this.beoszasmegLink = $(document).find("#beosztasmeg");
            this.profiladatokLink = $(document).find("#profiladatok");

            this.statisztikaa = $(document).find("#Statisztika").clone();
            this.alkalmazottak = this.tarolo.find("#Alkalmazottak").clone();
            this.faliujsagg = this.tarolo.find("#ManFaliujsag").clone();
            this.muszaktipushh = this.tarolo.find("#Muszaktipush").clone();
            this.muszaktipusnn = this.tarolo.find("#Muszaktipusn").clone();
            this.muszaktipusmm = this.tarolo.find("#Muszaktipusm").clone();
            this.napimunkaa = this.tarolo.find("#Napimunka").clone();
            this.ujbeosztass = this.tarolo.find("#Ujbeosztas").clone();
            this.beosztasmodd = this.tarolo.find("#Beosztasmod").clone();
            this.beosztasmegg = this.tarolo.find("#Beosztasmeg").clone();
            this.munkakorokk = this.tarolo.find("#Munkakorok").clone();
            this.profiladatokk = this.tarolo.find("#Profiladatok").clone();


        }

        alkalmazott() {
            this.esemenyLetrehoz(this.alkalmazottLink, this.alkalmazottak, alkalmazottTabla);
        }
        statisztika() {
            this.esemenyLetrehoz(this.statisztikaLink, this.statisztikaa, managerStatisztika);
        }
        faliujsag() {
            this.esemenyLetrehoz(this.faliujsagLink, this.faliujsagg, faliujsag);

        }
        muszaktipush() {
            this.esemenyLetrehoz(this.muszaktipushLink, this.muszaktipushh, muszakok);
        }
        muszaktipusn() {
            this.esemenyLetrehoz(this.muszaktipusnLink, this.muszaktipusnn, muszakNaphozRendelese);
        }
        muszaktipusm() {
            this.esemenyLetrehoz(this.muszaktipusmLink, this.muszaktipusmm, muszakEloszlas);
        }
        napimunka() {
            this.esemenyLetrehoz(this.napimunkaLink, this.napimunkaa, napiMin);
        }
        ujbeosztas() {
            this.esemenyLetrehoz(this.ujbeosztasLink, this.ujbeosztass, () => { });
        }
        beosztasmod() {
            this.esemenyLetrehoz(this.beoszasmodLink, this.beosztasmodd, () => { });
        }
        beosztasmeg() {
            this.esemenyLetrehoz(this.beoszasmegLink, this.beosztasmegg, () => { });
        }
        munkakor() {
            this.esemenyLetrehoz(this.munkakorokLink, this.munkakorokk, munkakorok);
        }
        profiladatok() {
            this.esemenyLetrehoz(this.profiladatokLink, this.profiladatokk, ProfilAdatok);

        }

        esemenyLetrehoz(kattintasElem, DOM, callback) {
            kattintasElem.on("click", () => {
                this.tarolo.empty();
                this.tarolo.append(DOM);
                callback();
                newPost();
            });
        }

    }

    const oldal = new OldalKezelo(article);
    oldal.alkalmazott();
    oldal.statisztika();
    oldal.munkakor();
    oldal.faliujsag();
    oldal.muszaktipush();
    oldal.muszaktipusn();
    oldal.muszaktipusm();
    oldal.napimunka();
    oldal.ujbeosztas();
    oldal.beosztasmeg();
    oldal.beosztasmod();
    oldal.profiladatok();
    article.empty();
    bejelentkezettFelhasznalo(udvozloUzenet);
    faliujsag();


    function bejelentkezettFelhasznalo(callback) {
        ajaxApiGet("http://localhost:8000/loggeduser", (adatok) => {
            let logged = adatok;
            ajaxApiGet(apivegpont + "/alkalmazott/" + logged, (adatok) => {
                callback(adatok);

            });
        });

    }

    function udvozloUzenet(adatok) {
        $(".profile-name").text("Üdvözöllek, " + adatok.nev);
        $(".profile-name").append(`<span> &#9660;</span>`);
    }




    //ajaxApiGet - Rendben
    function muszakNaphozRendelese() {
        const SZULO = $("#Muszaktipusn");
        SZULO.empty();
        muszakTipusNaphozSeged();

        const token = $('meta[name="csrf-token"]').attr("content");
        const naptar = SZULO.find(".naptar");
        const timer = $(".timer");
        const datettime = $(".datettime");

        function muszakTipusNaphozSeged() {
            SZULO.append(
                `<div class="naptar"><div class="timer-datettime"><div class="timer"></div><div class="datettime"></div></div></div>`
            );
            SZULO.append('<div class="datettime-info"></div>');

            $(".datettime-info").append(`
            <div class="dateinfo-massage-grid">
                <div class="dateinfo"></div>
                <div class="message"></div>
            </div>
            <div class="dateinfo-muszaktipus" id="selectable"></div>
            <div class="dateinfo-buttons"><button class="fas fa-check user-send-ok"></button><button class="fas fa-trash user-send-cancel"></button></div>`);
            $(".datettime-info").hide();
            $(".dateinfo-buttons").hide();
        }

        idoKiir();

        const honapok = [
            "",
            "Január",
            "Február",
            "Március",
            "Április",
            "Május",
            "Június",
            "Július",
            "Augusztus",
            "Szeptember",
            "Október",
            "November",
            "December",
        ];
        let napok = new Array();
        napok[0] = "V";
        napok[1] = "H";
        napok[2] = "K";
        napok[3] = "Sze";
        napok[4] = "Cs";
        napok[5] = "P";
        napok[6] = "Szo";

        let date = new Date();
        let aktualisEv = date.getFullYear();
        let aktualisHonap = date.getMonth() + 1;
        let honapElsoNapja = new Date(date.getFullYear(), date.getMonth(), 1);
        let honapOsszNapja = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        function ido() {
            let today = new Date();
            let hh = today.getHours();
            let min = String(today.getMinutes()).padStart(2, "0");
            let sec = String(today.getSeconds()).padStart(2, "0");
            let dd = String(today.getDate()).padStart(2, "0");

            today = aktualisEv + "." + honapok[aktualisHonap] + "." + dd + ".";
            time = hh + ":" + min + ":" + sec;
            datettime.html(`<div>${today}</div>`);
            timer.html(`<div>${time}</div>`);
        }

        function idoAtvalt(ido) {
            let time = ido;
            let dd = String(time.getDate()).padStart(2, "0");
            let mm = String(time.getMonth() + 1).padStart(2, "0");
            return aktualisEv + "-" + mm + "-" + dd;
        }

        function idoKiir() {
            setInterval(() => {
                setTimeout(ido, 1000);
            });
        }

        class Muszak {
            constructor(szulo, adat, nap) {
                this.adat = adat;
                this.nap = nap;
                this.aktiv = false;
                this.szulo = szulo;
                this.html = `<li class="muszaktipusok-info"><div class="muszaktipusok-input">
                <input type="checkbox"> 
                ${this.adat.tipus}</div><span class="muszakok-leiras">${this.adat.leiras}</span></li>`;
                this.szulo.append(this.html);
                this.elem = $(szulo).find(".muszaktipusok-info:last");
            }
        }
        class Nap {
            constructor(szulo, nap, napok, elem) {
                this.muszakok = [];
                this.szulo = szulo;
                this.nap = nap;
                this.napok = napok;
                this.napNev = idoAtvalt(
                    new Date(`${aktualisEv}/${aktualisHonap}/${this.nap}`)
                );
                this.elkuldElem = $(".user-send-ok").clone();
                this.torolElem = $(".user-send-cancel").clone();
                this.messageElem = $(".message");
                this.dateInfoElem = $(".dateinfo");
                this.infoElem = $(".datettime-info");
                this.elem = elem.text(`${this.nap}`);
                this.muszakTipusElem = $(".dateinfo-muszaktipus");

                this.elem.on("click", () => {
                    this.infoElem.hide();
                    this.infoElem.show(500);
                    $(".dateinfo-massage-grid").hide();
                    $(".dateinfo-buttons").hide();

                    this.muszakTipusElem.hide();
                    this.elemekKezelese();

                    ajax.ajaxApiGet(
                        "http://localhost:8000/api/napok/" + this.napNev,
                        (nap) => {
                            if (!nap) {
                                this.setMuszakok();
                            } else {
                                this.muszakTipusElem.empty();
                                this.dateInfoElem.html(
                                    `<div class="links links2" id=""><div>Műszakok - ${this.napNev}</div><span class="fas fa-users"></span></div>`
                                );
                                this.setMessageElemSzinSzoveg(
                                    "red",
                                    "A naphoz már rendeltél műszakokat!"
                                );
                                this.muszakTipusElem.append(
                                    '<ul class="muszakok-lista"></ul>'
                                );
                                this.muszakLista =
                                    this.muszakTipusElem.children(
                                        ".muszakok-lista"
                                    );
                                ajax.ajaxApiGet(
                                    "http://localhost:8000/api/muszaktipus/" +
                                    nap.muszaktipus,
                                    (muszak) => {
                                        this.muszakok.push(
                                            new Muszak(
                                                this.muszakLista,
                                                {
                                                    tipus: nap.muszaktipus,
                                                    leiras: muszak.leiras,
                                                },
                                                this.napNev
                                            )
                                        );
                                        this.muszakok.forEach((muszak) => {
                                            this.muszakokSzinez(muszak);
                                        });
                                    }
                                );

                                this.torolElem.on("click", () => {
                                    this.elkuldElem.show();
                                    let napok = apivegpont + "/napok";
                                    ajax.ajaxApiDelete(napok, this.napNev);
                                    ujNaptar.naptarSzinez();
                                    this.setMuszakok();
                                });

                                $(".dateinfo-massage-grid").slideDown(500);
                                this.elkuldElem.hide();
                                this.muszakTipusElem.fadeIn(500);
                                $(".dateinfo-buttons").fadeIn(500);
                            }
                        }
                    );
                });
            }

            muszakokSzinez(muszak) {
                for (
                    let i = 0;
                    i <
                    $(this.muszakLista).find(".muszaktipusok-info input")
                        .length;
                    i++
                ) {
                    let element = $(this.muszakLista)
                        .find(".muszaktipusok-info input")
                        .eq(i);
                    element.prop("checked", false);
                    element
                        .closest(".muszaktipusok-info")
                        .css("background-color", "white");
                    element.aktiv = false;
                    muszak.elem.find("input").prop("checked", true);
                    muszak.elem.css("background-color", " #FECA40");
                    muszak.aktiv = true;
                }
            }

            setMuszakok() {
                ajax.ajaxApiGet(
                    "http://localhost:8000/api/muszaktipusok",
                    (adatok) => {
                        let today =
                            aktualisEv +
                            "." +
                            honapok[aktualisHonap] +
                            "." +
                            this.nap +
                            ".";
                        this.dateInfoElem.html(
                            `<div class="links links2" id=""><div>Műszakok - ${this.napNev}</div><span class="fas fa-users"></span></div>`
                        );
                        this.setMessageElemSzinSzoveg(
                            "#2cabe3",
                            "Kérlek válaszd ki a naphoz - a műszakokat!"
                        );
                        $(".dateinfo-massage-grid").slideDown(500);

                        this.muszakTipusElem.empty();
                        this.muszakTipusElem.append(
                            '<ul class="muszakok-lista"></ul>'
                        );
                        this.muszakLista =
                            this.muszakTipusElem.children(".muszakok-lista");

                        adatok.forEach((adat) => {
                            this.muszakok.push(
                                new Muszak(this.muszakLista, adat, this.napNev)
                            );
                        });

                        this.muszakok.forEach((muszak) => {
                            muszak.elem.on("click", () => {
                                this.muszakok.forEach((m) => {
                                    m.aktiv = false;
                                });
                                this.muszakokSzinez(muszak);
                            });
                        });

                        $(".dateinfo-massage-grid").slideDown(500);
                        this.muszakTipusElem.fadeIn(500);
                        $(".dateinfo-buttons").fadeIn(500);
                        this.elkuldElem.on("click", () => {
                            let napok = apivegpont + "/napok";
                            let szurt = this.muszakok.filter((muszak) => {
                                return muszak.aktiv;
                            });
                            console.log(szurt);
                            if (szurt.length > 0) {
                                let muszaktipusa = szurt[0].adat.tipus;
                                ajax.ajaxApiPost(napok, {
                                    nap: this.napNev,
                                    muszaktipus: muszaktipusa,
                                    allapot: 0,
                                });
                                ujNaptar.naptarSzinez();
                            }
                        });

                        this.torolElem.on("click", () => {
                            let napok = apivegpont + "/napok";
                            ajax.ajaxApiDelete(napok, this.napNev);
                            ujNaptar.naptarSzinez();
                        });
                    }
                );
            }

            setMessageElemSzinSzoveg(szin, szöveg) {
                this.messageElem.css("color", szin);
                this.messageElem.text(szöveg);
            }
            elemekKezelese() {
                $(".user-send-ok").remove();
                $(".user-send-cancel").remove();
                $(".dateinfo-buttons").append(this.elkuldElem);
                $(".dateinfo-buttons").append(this.torolElem);
            }
        }

        class Naptar {
            constructor(szulo, napok, honapok) {
                this.szulo = szulo;
                this.napok = napok;
                this.honapok = honapok;
                this.elsoNap = new Date(date.getFullYear(), date.getMonth(), 1);

                this.szulo.append(`<div class="tablediv"></div>`);
                let aktualisTablazat = this.szulo.find("div:last");

                for (let index = 0; index < 7; index++) {
                    aktualisTablazat.append(
                        `<div class="days">${napok[index]}</div>`
                    );
                }

                for (let index = 0; index < honapOsszNapja + 10; index++) {
                    aktualisTablazat.append(`<div class="datedays"></div>`);
                }
                let i = 0;

                while (i < honapOsszNapja) {
                    let nap = new Nap(
                        aktualisTablazat,
                        i + 1,
                        napok,
                        aktualisTablazat
                            .find(".datedays")
                            .eq(honapElsoNapja.getDay() + i)
                    );

                    aktualisTablazat
                        .find(".datedays")
                        .eq(honapElsoNapja.getDay() + i)
                        .attr("id", nap.napNev);
                    $(`#${nap.napNev}`).css(
                        "border",
                        "0.5px solid var(--fds-gray-20)"
                    );
                    $(`#${nap.napNev}`).css("margin", ".5rem");
                    $(`#${nap.napNev}`).css("text-align", "center");
                    i++;
                }
                this.naptarSzinez();
            }
            naptarSzinez() {
                $(".datedays").removeClass("addshadow");
                $(".datedays")
                    .css({
                        opacity: "0",
                    })
                    .show()
                    .animate({ opacity: 1 });

                ajax.ajaxApiGet(
                    "http://localhost:8000/api/napokossz",
                    (adatok) => {
                        adatok.forEach((adat) => {
                            $(`#${adat.nap}`).addClass("addshadow");
                        });
                    }
                );
            }
        }
        let ujNaptar = new Naptar(naptar, napok, honapok);
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
            //szuloElem.hide();
            szuloElem.append(`<ul class="munkakor-list"></ul>`);
            szuloElem.append(`<div class="munkakor-adatok">próba tároló</div>`);
            const munkakorLista = $(".munkakor-list");
            const munkakorAdatok = $(".munkakor-adatok");


            munkakorok.forEach((elem) => {
                new Munkakor(munkakorLista, elem, ajax);
            });

        }
    }
    //ajaxApiGet - Rendben
    function muszakok() {
        ajaxApiGet(apivegpont + "/muszaktipusok", muszakBeallitas);

        function muszakBeallitas(muszakok) {
            const szuloElem = $(".muszaktipush-container");
            szuloElem.empty();
            szuloElem.append(`<table class="muszakok-table"><tr><th>Típus</th><th>Leírás</th><th></th><th></th><th></th></tr></table>`);
            const tabla = szuloElem.find(".muszakok-table");
            muszakok.forEach((elem) => {
                new MuszakHozzaAdas(tabla, elem, ajax);
            });
            MuszakHozzaAdas.hozzaAd(tabla, ajax, () => {
                ajaxApiGet(apivegpont + "/muszaktipusok", muszakBeallitas);
            });
        }


    }

    $(window).on("torolh", (event) => {
        event.detail.torles();
        muszakok();
    });

    $(window).on("MuszakModosit", (event) => {
        event.detail.modosit(muszakok);

    });

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
        for (let index = 0; index < 4; index++) {
            $(statisztikaElem).append(`<div id="Man-statisztika-elem${index}"></div>`);

        }
        const statisztikaElem1 = document.getElementById("Man-statisztika-elem0");
        const statisztikaElem2 = document.getElementById("Man-statisztika-elem1");
        const statisztikaElem3 = document.getElementById("Man-statisztika-elem2");
        const statisztikaElem4 = document.getElementById("Man-statisztika-elem3");

        let data, chart, options;

        oszlop();
        kor();
        timeLine();
        table();
        //Route::get('/api/dolgozottnapok', [StatisztikaController::class, 'dolgozottnapok']);
        //-következő
        function oszlop() {
            ajaxGet("http://localhost:8000/api/munkakorstat", (adatok) => {

                googleChartsKonyvtar("corechart", drawChart);

                function drawChart() {
                    data = new google.visualization.DataTable();
                    chart = new google.visualization.PieChart(statisztikaElem1);

                    data.addColumn("string", "munkakör");
                    data.addColumn("number", "db");

                    for (const iterator of adatok) {
                        data.addRows([[iterator.munkakor, iterator.db]]);
                    }
                    let options = {
                        height: 500,
                        legend: { position: "labeled" },



                    }
                    chart.draw(data, options);
                    $(statisztikaElem1).prepend("<div class=" + "stat-title" + ">Munkakörök</div>");
                }
            });
        }

        function kor() {
            ajaxGet("http://localhost:8000/api/hetioraszamstat", (adatok) => {
                googleChartsKonyvtar("corechart", drawChart);

                function drawChart() {
                    data = new google.visualization.DataTable();
                    chart = new google.visualization.ColumnChart(
                        statisztikaElem2
                    );

                    data.addColumn("string", "heti óraszám");
                    data.addColumn("number", "db");

                    for (const iterator of adatok) {
                        console.log(iterator);
                        data.addRows([
                            [iterator.heti_oraszam + " óra", iterator.db],
                        ]);
                    }
                    let options = {
                        height: 500,
                        bar: { groupWidth: "20%" },

                    }
                    chart.draw(data, options);
                    $(statisztikaElem2).prepend("<div class=" + "stat-title" + ">Heti óraszám</div>");
                }
            });
        }

        function timeLine() {
            ajaxGet(localhost + "szabadsagon.json", (adatok) => {
                googleChartsKonyvtar("timeline", drawChart);

                function drawChart() {
                    chart = new google.visualization.Timeline(statisztikaElem3);
                    dataTable = new google.visualization.DataTable();


                    dataTable.addColumn({ type: 'string', id: 'President' });
                    dataTable.addColumn({ type: 'string', id: 'dummy bar label' });
                    dataTable.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
                    dataTable.addColumn({ type: 'date', id: 'Start' });
                    dataTable.addColumn({ type: 'date', id: 'End' });

                    function idoAtvalt(ido) {
                        let date = new Date();
                        let aktualisEv = date.getFullYear();
                        let time = ido;
                        let dd = String(time.getDate()).padStart(2, "0");
                        let mm = String(time.getMonth() + 1).padStart(2, "0");
                        return aktualisEv + "-" + mm + "-" + dd;
                    }

                    for (const iterator of adatok) {
                        let tol = idoAtvalt(new Date(iterator.SZABADSAG[0].tól));
                        let ig = idoAtvalt(new Date(iterator.SZABADSAG[0].ig));
                        dataTable.addRows([
                            [

                                iterator.név,
                                null,
                                tol + " - " + ig,
                                new Date(iterator.SZABADSAG[0].tól),
                                new Date(iterator.SZABADSAG[0].ig),
                            ],
                        ]);
                    }
                    options = { tooltip: { isHtml: true } };
                    chart.draw(dataTable, options);
                    $(statisztikaElem3).prepend("<div class=" + "stat-title" + ">Szabadság </div>");
                }
            });


        }

        function table() {
            ajaxGet("http://localhost:8000/api/dolgozottnapok", (adatok) => {

            });

        }

        function googleChartsKonyvtar(csomag, metodus) {
            google.charts.load("current", { packages: [csomag] });
            google.charts.setOnLoadCallback(metodus);
        }




    }

    //ajaxApiGet - Rendben
    function faliujsag() {
        ajaxApiGet(apivegpont + "/faliujsagok", faliujsagBeallitas);

        function faliujsagBeallitas(muszakok) {
            const szuloElem = $(".faliujsag-container");
            szuloElem.empty();
            muszakok.forEach((elem) => {
                new Faliujsag(szuloElem, elem, ajax);

            });
            ajaxGet(
                "https://randomuser.me/api/?results=" + muszakok.length,
                (kepek, i) => {
                    kepek.results.map((ember, index) => {
                        $(".post-title")
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

        }
        $(window).on("modositf", (event) => {

            event.detail.put();
            ajaxApiGet(apivegpont + "/faliujsagok", faliujsagBeallitas);
        });

        $(window).on("torolf", () => {
            ajaxApiGet(apivegpont + "/faliujsagok", faliujsagBeallitas);
        });
    }

    function newPost() {
        const apivegpont = "http://localhost:8000/api/faliujsag/";
        const newpostElem = $("#ManFaliujsag").find("#newpost");
        const newpostForm = $("#ManFaliujsag").find("fieldset");
        const newpostMegse = $("#ManFaliujsag").find("fieldset").find(".fa-times");
        const newpostOk = $("#ManFaliujsag").find("fieldset").find(".fa-check");

        newpostElem.on("click", () => {
            newpostForm.slideDown(500);
            console.log("szaaa");
        });
        newpostMegse.on("click", () => {
            newpostForm.slideUp(500);
        });

        newpostOk.on("click", () => {

            let ma = formatDate(new Date());
            bejelentkezettFelhasznalo(
                (adatok) => {
                    console.log(adatok);
                    let obj = {

                        dolgozoi_azon: adatok.dolgozoi_azon,
                        mikor: ma,
                        cim: $("#newpost-cim").val(),
                        tartalom: $("#newpost-tartalom").val(),
                    };
                    console.log(obj)

                    ajax.ajaxApiPost(apivegpont, obj);
                    newpostForm.effect("clip", "1500");

                    ajax.ajaxApiGet(

                        "http://localhost:8000/api/faliujsagok",

                        faliujsag

                    );
                }
            );



        });

        function formatDate(date) {
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            return [year, month, day].join("-");
        }
    }

    //ajaxApiGet - Rendben
    function alkalmazottTabla() {
        $(".search").remove();
        $(".tablaAdatok").remove();
        $("#Alkalmazottak").append("<div class='tablaAdatok'>" +
            `<div class="navigacio-grid"> ` +
            "<div class=" + "navigacio-input" + ">" +
            "<label>Ugrás ide:</label><input type='number' name='oldalUgras' id='oldalUgras'" + "></div>" +
            "<p id='oldalSzamok'></p>" +
            "<div id='navigacio'></div>" +
            "</div></div>");

        let menu = "#Alkalmazottak .dropdown-content";
        $(menu).hide();
        $("#Alkalmazottak").prepend(`<input type="text" placeholder="&#x1F50E Keresés..." class="search">`);

        ajaxApiGet(apivegpont + "/alkalmazottak", alkalmazottTabla);

        function alkalmazottTabla(alkalmazottak) {

            $("#navigacio").empty();
            const szuloElem = $("#AlkalmazottakTabla");
            szuloElem.empty();
            szuloElem.append(`<tr><td>Név</td><td>Beosztás</td><td>Lakcím</td><td>Elérhetőség</td><td>E-mail</td><td ></td>
            <td ></td></tr>`);


            for (let oldalIndex = 0; oldalIndex < alkalmazottak.length; oldalIndex += 10) {
                let darabolt = alkalmazottak.slice(oldalIndex, oldalIndex + 10)
                darabolt.forEach((elem, index) => {
                    let tablaElem = new AlkalmazottTabla(szuloElem, elem, index);
                    if (oldalIndex > 1) {
                        tablaElem.elem.hide();
                    }
                });

                //$("#Alkalmazottak").find("#navigacio").append("<button>"+(oldalIndex/10+1)+"</button>")

            }

            pagination($("#Alkalmazottak"),$("#AlkalmazottakTabla"),$(".alkalmazott-sablon"));
        

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
            ajaxApiGet(apivegpont + "/munkakorok", (adatok) => {
                let select = '<select id="munkakor-alkalmazott">';
                adatok.forEach(a => {
                    select += '<option>' + a.megnevezes + '</option>';
                });
                select += '</select>';

                event.detail.clone.find("td").eq(1).html(select);
                event.detail.clone.find("select").eq(1).addClass("munkakor");
                $("#munkakor-alkalmazott").change("change", function () {
                    let ertek = this.value;
                    event.detail.clone.find("td").eq(1).html(`<input type="text" value="${ertek}"disabled> `);
                    event.detail.clone.find("input").eq(1).addClass("munkakor");
                });
            });
            $(menu).find(".tablaAl").on("click", () => {
                $(event.detail.menu).slideUp();
                event.detail.clone.fadeIn(500);
                event.detail.clone.find(".save-alkalmazott").on("click", () => {

                    let hossz = event.detail.clone.find("input").length;
                    for (let index = 0; index < hossz; index++) {
                        let kulcs = event.detail.clone.find("input").eq(index).attr("class");
                        let ertek = event.detail.clone.find("input").eq(index).val();
                        event.detail.adat[kulcs] = ertek;

                    }
                    ajax.ajaxApiPut("http://localhost:8000/api/alkalmazott", event.detail.adat.dolgozoi_azon, event.detail.adat);
                    event.detail.clone.fadeOut(500, () => {
                        ajaxApiGet(apivegpont + "/alkalmazottak", alkalmazottTabla);
                    });

                });
                event.detail.clone.find(".cancel-alkalmazott").on("click", () => {
                    event.detail.clone.fadeOut(500);
                });

            });


            if (event.detail.id >= 0) {
                $(menu).css("z-index", 1);

                $(menu).attr("id", event.detail.id);
                $(menu).find(".alkalmazott-nev span").text(event.detail.adat.nev);

            }
        });



        $(menu).on("click", () => {

        });

        $(menu)
            .find("#AlkModosit")
            .on("click", () => {

                ProfilAdatok($(menu).attr("id"));
                $(menu).attr("id", "");
            });

        $(menu).find(".fa-times").on("click", () => {
            $(".alkalmazott-sablon").remove();
            $(menu).slideUp(500);
        });


    }


    //ajaxApiGet - Hibás
    function napiMin() {

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
    function ProfilAdatok(id) {
        $("article").empty();
        $("article").append(`  <div id="Profiladatok" class="tabcontent">
        <div class="profile-head">
            <div class="profile-infos">
                <img src="" alt="kép" />
            </div>
            <div class="name-location">
                <div class="profile-nev">Labanc Dániel</div>
                <div class="profile-munkakor">Munkakör</div>
            </div>
            <div>
                <ul>

                    <li><span class="far fa-map"></span><span class="location-address">Lakhely</span>
                    </li>
                    <li><span class="fas fa-phone"></span><span class="location-phone">Telefon</span>
                    </li>
                    <li><span class="far fa-envelope"></span><span class="location-email">Email</span>
                    </li>
                </ul>
            </div>
        </div>

        <div id="tables">
            <div class="profile-title">
                <h3>Profil adatok</h3><span class="fas fa-user"></span>
            </div>
            <table id="elso"></table>

        </div>
    </div>`);
        profilAdatok = {};
        $("#elso").empty();
        $("#masodik").empty();
        $("#Profiladatok .success").hide();
        $("#Profiladatok").prepend(
            "<p class='success'>Sikeres adatmódosítás</p>"
        );
        ajax.ajaxGet(
            "https://randomuser.me/api/?results=1",
            (kep) => {

                $("#Profiladatok")
                    .find("img")
                    .attr("src", kep.results[0].picture.large);
            }
        );
        ajax.ajaxApiGet("http://localhost:8000/loggeduser", (adatok) => {
            logged = adatok;
            if (id != undefined) {
                logged = id;
                console.log(logged);
            }
            ajaxApiGet(apivegpont + "/alkalmazott/" + logged, (adatok) => {


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
                        sor +
                        " " +
                        "class=" +
                        "profile-rows" +
                        "><th class=fejlec>" +
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

                let kulcsok = [
                    "",
                    "Név",
                    "Lakcím",
                    "Születési Dátum",
                    "Adóazonosító",
                    "TAJ",
                    "Elérhetőség",
                    "E-mail",
                    "Munkakör",
                    "Heti óraszám",
                    "Munkaviszony kezdete",
                    "Munkaviszony Vége",
                ];
                $(".profile-rows .fejlec").eq(0).hide();
                $(".profile-rows .kesz").eq(0).hide();
                for (
                    let index = 1;
                    index < $(".profile-rows .fejlec").length;
                    index++
                ) {
                    const element = $(".profile-rows .fejlec").eq(index);
                    element.hide();
                    element.parent().prepend(`<th>${kulcsok[index]}</th>`);
                }

                $("#tables tr").hover(modosit);


                $(".managerinfo").fadeIn(1000, () => { });
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

    function pagination(szulo,tabla,sablon){
        szulo.find("#navigacio").append("<button class='fas fa-angle-double-left' id='hatraUgrik'>"
        +"</button><button class='fas fa-angle-left' id='hatraLepeget'></button>"
        +"<button class='fas fa-angle-right' id='eloreLepeget'></button>"
        +"<button class='fas fa-angle-double-right' id='eloreUgrik'></button>")

        szulo.find("#eloreLepeget").on("click",eloreLepeget);
        szulo.find("#hatraLepeget").on("click",hatraLepeget);
        szulo.find("#eloreUgrik").on("click",eloreUgrik);
        szulo.find("#hatraUgrik").on("click",hatraUgrik);
        oldalSzamKiir(tabla);

        let oldalUgras = szulo.find("#oldalUgras");
        oldalUgras.on("keyup", function (e) {
            if (e.key === "Enter" || e.which == 13 || e.keyCode == 13) {
                e.preventDefault();

                if (oldalUgras.val()>0 && oldalUgras.val()*10-tabla.find("tr").length<=10) {

                    sablon.remove();

                let elsoElem = (oldalUgras.val())-1;

                kiurit();

                for (let index = (elsoElem*10)+1; index < ((elsoElem*10)+1) + 10; index++) {
                    tabla.find("tr").eq(index).fadeIn(500);
                }
            } else {
                alert("Nincs ilyen oldal!")
            }

            oldalSzamKiir(tabla)
        }
        });

        

        function eloreLepeget(){
            sablon.remove();
            let utolsoElem = 0;
            for (let index = 0; index < tabla.find("tr").length; index++) {
                if (tabla.find("tr").eq(index).css("display")!="none"){
                    utolsoElem = index; 
                }
                    
            }

            if (utolsoElem+1!=tabla.find("tr").length){
                
                kiurit();

                for (let index = utolsoElem+1; index < utolsoElem+1+10; index++) {
                    tabla.find("tr").eq(index).fadeIn(500);

                }

            }
            oldalSzamKiir(tabla);
        }

        function hatraLepeget(){
            sablon.remove();
            elsoElem = 1;
            
            while (tabla.find("tr").eq(elsoElem).css("display")=="none"){
                elsoElem++;
            }

            if (elsoElem!=1){
                
                kiurit();

                for (let index = elsoElem-10; index < elsoElem; index++) {
                    tabla.find("tr").eq(index).fadeIn(500);
                }

            }
            oldalSzamKiir(tabla);
        }
            

        function eloreUgrik() {
            sablon.remove();
            
                let utolsoElem = tabla.find("tr").length;

                if ((tabla.find("tr").eq(utolsoElem-1)).css("display")=="none"){
                let megjelenitettUtolso = 1;

                while ((utolsoElem - megjelenitettUtolso) % 10 != 0) {
                    megjelenitettUtolso++;
                }

                kiurit();

                for (let index = utolsoElem - megjelenitettUtolso+1;index < utolsoElem;index++) {
                    tabla.find("tr").eq(index).fadeIn(500);
                }
            }
            oldalSzamKiir(tabla);
        }

        function hatraUgrik(){
            sablon.remove();
            elsoElem=1;

            if ((tabla.find("tr").eq(elsoElem)).css("display")=="none")
            {

            kiurit();

            for (let index = elsoElem; index < elsoElem+10; index++) {
                tabla.find("tr").eq(index).fadeIn(500);

            }
        }
        oldalSzamKiir(tabla);
        }

            function kiurit() {
                for (let index = 1; index < tabla.find("tr").length; index++) {
                    tabla.find("tr").eq(index).hide();
                }
            }

            function oldalSzamKiir(tabla) {
                let utolsoElem = 0;
    
                for (let index = 0; index < tabla.find("tr").length; index++) {
                    if (tabla.find("tr").eq(index).css("display")!="none"){
                        utolsoElem = index; 
                    }
                }
                let elsoElem = 1;
                
                while (tabla.find("tr").eq(elsoElem).css("display")=="none"){
                    elsoElem++;
                }
            $("#oldalSzamok").html(elsoElem+" - "+utolsoElem +" elem ennyiből: "+ (tabla.find("tr").length-1))
        }

    }
});
