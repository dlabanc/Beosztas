$(function () {
    const token = $('meta[name="csrf-token"]').attr("content");
    console.log(token);
    const ajax = new Ajax(token);
    UjelemEsemenyek();
    ajaxHivasok();
    let oldalhossz = 9;
    

    $(document).ajaxStop(function () {
        $(".loading").fadeOut(1000, () => {});

    });

    $(".Alkalmazottak")
        .closest(".tabcontent")
        .prepend(`<input type="text" placeholder="Keresés..." class="search">`);
        
    $(".search").keyup(function (e) {
        let ertek = $(this).val();
        ajax.ajaxApiGet(
            "/api/alkalmazott/search?q=" + ertek,
            alkalmazottAdmin
        );
    });

    infoAblak();

    function pagination(szulo,tabla,sablon,elem,elemPerOldal){
        szulo.find(".tablaAdatok").remove();

        szulo.append("<div class='tablaAdatok'>" +
            "<div id='navigacio'></div>" +
            "</div>");

            szulo.find("#navigacio").empty();

            szulo.find(".tablaAdatok").prepend(
                `<div class="navigacio-grid"> ` +
                
                "<label>Ugrás ide:</label><input type='number' name='oldalUgras' id='oldalUgras'" + ">" +
                "<p id='oldalSzamok'></p>" +
                "<p id='oldalSzam'></p></div>")

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

                if (oldalUgras.val()>0 && oldalUgras.val()*elemPerOldal-tabla.find(elem).length<=elemPerOldal) {
                    sablon.remove();

                let elsoElem = (oldalUgras.val())-1;

                kiurit();

                for (let index = elsoElem*elemPerOldal; index < (elsoElem*elemPerOldal) + elemPerOldal; index++) {
                    tabla.find(elem).eq(index).fadeIn(500);
                }
            } else {
                alert("Nincs ilyen oldal!")
            }

            oldalSzamKiir(tabla)
            oldalSzamol(tabla);
        }
        });

        

        function eloreLepeget(){
            sablon.remove();
            let utolsoElem = 0;
            for (let index = 0; index < tabla.find(elem).length; index++) {
                if (tabla.find(elem).eq(index).css("display")!="none"){
                    utolsoElem = index; 
                }
                    
            }

            if (utolsoElem+1!=tabla.find(elem).length){
                
                kiurit();

                for (let index = utolsoElem+1; index < utolsoElem+1+elemPerOldal; index++) {
                    tabla.find(elem).eq(index).fadeIn(500);

                }

            }
            oldalSzamKiir(tabla);
        }

        function hatraLepeget(){
            sablon.remove();
            elsoElem = 0;
            
            while (tabla.find(elem).eq(elsoElem).css("display")=="none"){
                elsoElem++;
            }

            if (elsoElem!=0){
                
                kiurit();

                for (let index = elsoElem-elemPerOldal; index < elsoElem; index++) {
                    tabla.find(elem).eq(index).fadeIn(500);
                }

            }
            oldalSzamKiir(tabla);
        }
            

        function eloreUgrik() {
            sablon.remove();
            
                let utolsoElem = tabla.find(elem).length;

                if ((tabla.find(elem).eq(utolsoElem-1)).css("display")=="none"){ 
                let megjelenitettUtolso = 1; 

                while ((utolsoElem - megjelenitettUtolso) % elemPerOldal != 0) {
                    megjelenitettUtolso++;
                }

                kiurit();

                for (let index = utolsoElem - megjelenitettUtolso;index < utolsoElem;index++) {
                    tabla.find(elem).eq(index).fadeIn(500);
                }
            }
            oldalSzamKiir(tabla);
        }

        function hatraUgrik(){
            sablon.remove();
            elsoElem=0;

            if ((tabla.find(elem).eq(elsoElem)).css("display")=="none")
            {

            kiurit();

            for (let index = elsoElem; index < elsoElem+elemPerOldal; index++) {
                tabla.find(elem).eq(index).fadeIn(500);

            }
        }
        oldalSzamKiir(tabla);
        }

            function kiurit() {
                for (let index = 0; index < tabla.find(elem).length; index++) {
                    tabla.find(elem).eq(index).hide();
                }
            }

            function oldalSzamKiir(tabla) {
                let utolsoElem = 0;
    
                for (let index = 0; index < tabla.find(elem).length; index++) {
                    if (tabla.find(elem).eq(index).css("display")!="none"){
                        utolsoElem = index; 
                    }
                }
                let elsoElem = 0;
                
                while (tabla.find(elem).eq(elsoElem).css("display")=="none"){
                    elsoElem++;
                }
                szulo.find("#oldalSzamok").html((elsoElem+1)+" - "+(utolsoElem+1) +" elem ennyiből: "+ (tabla.find(elem).length))
                szulo.find("#oldalSzam").html(Math.ceil(elsoElem/elemPerOldal+1)+ ". / " + (Math.ceil(tabla.find(elem).length/elemPerOldal) + " oldal"))
        }

    }

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
        for (const key in eredmeny[0]) {
            kulcs = key.replace("_", " ");
            fej += `<td>${kulcs}</td>`;
        }
        fej += `<td></td>`;
        SZULO.prepend(fejlec);
        SZULO.find(".fejlec").html(fej);

        

            for (let oldalIndex = 0; oldalIndex < eredmeny.length; oldalIndex += oldalhossz) {
                let darabolt = eredmeny.slice(oldalIndex, oldalIndex + oldalhossz)
                darabolt.forEach(elem => {
                    let obj = new osztaly(SZULO, elem, ajax);
                     if (oldalIndex > 1) {
                        obj.elem.hide();
                    } 
                });
            }

            pagination(SZULO.parent(),SZULO,$(""),SZULO.find(".mutat"),10)
    }

    function infoAblak() {
        ajax.ajaxApiGet("/api/alkalmazottak", (adatok) => {
            $(".stat1value").html(`${adatok.length}`);
        });
        ajax.ajaxApiGet("/api/alkalmazottak", (adatok) => {
            if (adatok.length > 0) {
                $(".stat2value").html(`${adatok[adatok.length - 1].nev}`);
            }
        });
        ajax.ajaxGet("/api/bejelentkezesiadatok", (adatok) => {
            $(".stat4value").html(`${adatok.length}`);
        });
        ajax.ajaxApiGet("/api/faliujsagok", (adatok) => {
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
            .find("h3")
            .after(
                `<button class="uj">Hozzáadás</button><div class="ujmezo"></div>`
            );

        ujFelvetele(
            ".Nemdolgozna",
            nemDolgoznaInput,
            "Új Nem dolgozna felvétele",
            Nemdolgozna
        );
        ujFelvetele(
            ".Szabadsag",
            szabadsagInput,
            "Új Szabadság felvétele",
            Szabadsag
        );
        ujFelvetele(
            ".Beosztas",
            beosztasInput,
            "Új Beosztás felvétele",
            Beosztas
        );
        ujFelvetele(".Napok", napokInput, "Új Nap felvétele", Napok);
        ujFelvetele(
            ".Napimunkaeroigeny",
            napimunkaeroigenyInput,
            "Új Napi Munkaerőígény felvétele",
            Napimunkaeroigeny
        );
        ujFelvetele(
            ".Muszaktipus",
            muszaktipusInput,
            "Új Műszaktípus felvétele",
            Muszaktipus
        );
        ujFelvetele(
            ".Faliujsag",
            faliujsagInput,
            "Új Faliújság felvétele",
            FaliujsagPost
        );
        ujFelvetele(
            ".Bejelentkezési-adatok",
            bejelentkezesekInput,
            "Új Bejelentkezés felvétele",
            Bejelentkezes
        );
        ujFelvetele(
            ".Munkakorok",
            munkakorInput,
            "Új Munkakör felvétele",
            MunkakorA
        );
        ujFelvetele(
            ".Alkalmazottak",
            alkalmazottInput,
            "Új Alkalmazott felvétele",
            Alkalmazott
        );
    }

    function ujFelvetele(elem, inputok, cim, osztaly) {
        $(elem)
            .parent()
            .find(".uj")
            .on("click", () => {
                tablazat = $(elem);
                add(tablazat, inputok, cim, osztaly);
            });
    }

    function add(tablazat, input, cim, osztaly) {
        tablazat.hide();
        tablazat
            .parent()
            .find(".ujmezo")
            .html(`<fieldset><legend>${cim}</legend></fieldset>`);
        let mezo = tablazat.parent().find(".ujmezo fieldset");
        input(mezo, () => {
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
                let adatok = {};
                for (
                    let index = 0;
                    index < mezo.find(".label-input input").length;
                    index++
                ) {
                    let ertek = mezo.find(".label-input input").eq(index).val();
                    let kulcs = mezo
                        .find(".label-input input")
                        .eq(index)
                        .attr("name");
                    adatok[kulcs] = ertek;
                }
                
                let obj = new osztaly(tablazat, adatok, ajax);
                obj.post(adatok);
                mezo.slideUp(1000);
                mezo.empty();
                
                ajax.ajaxApiGet(obj.apivegpont, ki);

                function ki(eredmeny) {
                    beallitasok(eredmeny, tablazat, osztaly);
                }

                tablazat.show();
                infoAblak();
            });
        });
    }

    //Kész
    function alkalmazottInput(mezo, callback) {
        ajax.ajaxApiGet("/api/munkakorok", munkakorSelect);
        function munkakorSelect(eredmeny) {
            let select =
                '<select id="munkakors"><option>Válassz az munkakörök közül...</option>';
            eredmeny.forEach((e) => {
                select += `<option value="${e.megnevezes}">${e.megnevezes}</option>`;
            });
            select += "</select>";

            mezo.append(
                `<div class="label-input"><label>Név:</label><input type="text" placeholder="Név..." name="nev"></div>`
            );
            mezo.append(
                `<div class="label-input label-span"><label>Munkakör:</label>${select}<input type="text" placeholder="Munkakör..." name="munkakor" id="munkakor-input"></div>`
            );
            $("#munkakors").change("change", function () {
                $("#munkakor-input").attr("value", this.value);
            });
            mezo.append(
                `<div class="label-input"><label>Adóazonosító:</label><input type="number" placeholder="Adóazonosító" name="adoazonosito"></div>`
            );
            mezo.append(
                `<div class="label-input"><label>Taj:</label><input type="number" placeholder="Taj..." name="taj"></div>`
            );
            mezo.append(
                `<div class="label-input"><label>Elérhetőség:</label><input type="phone" placeholder="+20 111 11 11" name="elerhetoseg"></div>`
            );
            mezo.append(
                `<div class="label-input"><label>Email:</label><input type="email" placeholder="pelda@chillout.hu..." name="email"></div>`
            );
            mezo.append(
                `<div class="label-input"><label>Heti óraszám:</label><input type="number" placeholder="Heti óraszám" name="heti_oraszam"></div>`
            );
            mezo.append(
                `<div class="label-input"><label>Lakcím:</label><input type="text" placeholder="Lakcím" name="lakcim"></div>`
            );
            mezo.append(
                `<div class="label-input"><label>Születési dátum:</label><input type="date" name="szuletesi_datum"></div>`
            );
            mezo.append(
                `<div class="label-input"><label>Munkaviszony kezdete:</label><input type="date" name="munkaviszony_kezdete"></div>`
            );
            mezo.append(
                `<div class="label-input"><label>Munkaviszony vége:</label><input type="date" name="munkaviszony_vege"></div>`
            );
            callback();
        }
    }

    //Kész
    function munkakorInput(mezo, callback) {
        mezo.append(
            `<div class="label-input"><label>Megnevezés:</label><input type="text" placeholder="Megnevezés..." name="megnevezes"></div>`
        );
        mezo.append(
            `<div class="label-input"><label>Leírás:</label><input type="text" placeholder="Leírás" name="leiras"></div>`
        );
        mezo.append(
            `<div class="label-input"><label>Munkafőnök:</label><input type="text" placeholder="Munkafőnök száma" name="munkafonok"></div>`
        );
        callback();
    }
    //Kész
    function bejelentkezesekInput(mezo, callback) {
        ajax.ajaxApiGet("/api/alkalmazottak", bejelentkezesekSelect);
        function bejelentkezesekSelect(eredmeny) {
            let select =
                '<select id="dolgozos2"><option>Válassz az alkalmazottak közül...</option>';
            eredmeny.forEach((e) => {
                select += `<option value="${e.dolgozoi_azon}">${e.nev} - ${e.dolgozoi_azon}</option>`;
            });
            select += "</select>";

            mezo.append(
                `<div class="label-input label-span"><label>Alkalmazott:</label>${select}<input type="text" placeholder="Alkalmazott..." name="user_login" id="dolgozoi-azon-input2"></div>`
            );

            $("#dolgozos2").change("change", function () {
                $("#dolgozoi-azon-input2").attr("value", this.value);
            });

            mezo.append(
                `<div class="label-input"><label>Jelszó:</label><input type="password" name="jelszo" value="$2a$10$bADXh6Zh1Mnks0JStERP6.M3HZ2Zp8.r5/q7.nb/kvHQdlv.hZnii" disabled></div>`
            );
            callback();
        }
    }
    //Kész
    function faliujsagInput(mezo, callback) {
        ajax.ajaxApiGet("/api/alkalmazottak", dolgozokSelect);
        function dolgozokSelect(eredmeny) {
            let select =
                '<select id="dolgozos"><option>Válassz az alkalmazottak közül...</option>';
            eredmeny.forEach((e) => {
                select += `<option value="${e.dolgozoi_azon}">${e.nev} - ${e.dolgozoi_azon}</option>`;
            });
            select += "</select>";

            mezo.append(
                `<div class="label-input label-span"><label>Dolgozói azonosító:</label>${select}<input type="text" placeholder="Dolgozói Azonosító..." name="dolgozoi_azon" id="dolgozoi-azon-input"></div>`
            );

            $("#dolgozos").change("change", function () {
                $("#dolgozoi-azon-input").attr("value", this.value);
            });
            mezo.append(
                `<div class="label-input"><label>Mikor:</label><input type="date"" name="mikor"></div>`
            );
            mezo.append(
                `<div class="label-input"><label>Cím:</label><input type="textarea" placeholder="Cím..." name="cim"></div>`
            );
            mezo.append(
                `<div class="label-input"><label>Tartalom:</label><input type="text" placeholder="Tartalom..." name="tartalom" ></div>`
            );
            callback();
        }
    }
    //Kész
    function muszaktipusInput(mezo, callback) {
        mezo.append(
            `<div class="label-input"><label>Műszaktípus:</label><input type="text" placeholder="Műszaktípus..." name="tipus"></div>`
        );
        mezo.append(
            `<div class="label-input"><label>Leírás:</label><input type="textarea" placeholder="Leírás..." name="leiras"></div>`
        );
        callback();
    }
    //Kész
    function napimunkaeroigenyInput(mezo, callback) {
        ajax.ajaxApiGet(
            "/api/muszakeloszlasok",
            muszakeloszlasokSelect
        );

        function muszakeloszlasokSelect(eredmeny) {
            let select =
                '<select id="muszakeloszlasok"><option>Válassz a műszakeloszlások közül...</option>';
            eredmeny.forEach((e) => {
                select += `<option value="${e.muszakelo_azon}">Műszaktípus: ${e.muszaktipus} : ${e.oratol}:00 - ${e.oraig}:00</option>`;
            });
            select += "</select>";

            mezo.append(
                `<div class="label-input"><label>Dátum:</label><input type="date"" name="datum"></div>`
            );
            mezo.append(
                `<div class="label-input label-span"><label>Műszakeloszlások</label>${select}<input type="number" placeholder="Műszakeloszlások azonosító..." name="muszakelo_azon" id="muszakeloszlasok-input"></div>`
            );
            $("#muszakeloszlasok").change("change", function () {
                console.log(this.value);
                console.log(
                    $("#muszakeloszlasok-input").attr("value", this.value)
                );
                $("#muszakeloszlasok-input").attr("value", this.value);
            });
            mezo.append(
                `<div class="label-input"><label>Munkakör:</label><input type="text" placeholder="Munkakör..." name="munkakor"></div>`
            );
            mezo.append(
                `<div class="label-input"><label>Darab:</label><input type="number" name="db"></div>`
            );
            callback();
        }
    }
    //Kész
    function napokInput(mezo, callback) {
        mezo.append(
            `<div class="label-input"><label>Nap:</label><input type="date"" name="nap"></div>`
        );
        mezo.append(
            `<div class="label-input"><label>Műszaktípus:</label><input type="text" placeholder="Műszaktípus..." name="muszaktipus"></div>`
        );
        mezo.append(
            `<div class="label-input"><label>Állapot:</label><input type="text" placeholder="1 vagy 0..." name="allapot"></div>`
        );
        callback();
    }

    //Kész
    function nemDolgoznaInput(mezo, callback) {
        ajax.ajaxApiGet("/api/alkalmazottak", bejelentkezesekSelect);
        function bejelentkezesekSelect(eredmeny) {
            let select =
                '<select id="dolgozos4"><option>Válassz az alkalmazottak közül...</option>';
            eredmeny.forEach((e) => {
                select += `<option value="${e.dolgozoi_azon}">${e.nev} - ${e.dolgozoi_azon}</option>`;
            });
            select += "</select>";

            mezo.append(
                `<div class="label-input label-span"><label>Alkalmazott:</label>${select}<input type="text" placeholder="Alkalmazott..." name="alkalmazott" id="dolgozoi-azon-input4"></div>`
            );

            $("#dolgozos4").change("change", function () {
                $("#dolgozoi-azon-input4").attr("value", this.value);
            });
            
            mezo.append(
                `<div class="label-input"><label>Dátum:</label><input type="date"" name="datum"></div>`
            );
            ajax.ajaxApiGet(
                "/api/muszakeloszlasok",
                muszakeloszlasokSelect
            );

            function muszakeloszlasokSelect(eredmeny) {
                let select =
                    '<select id="muszakeloszlasok"><option>Válassz a műszakeloszlások közül...</option>';
                eredmeny.forEach((e) => {
                    select += `<option value="${e.muszakelo_azon}">${e.muszaktipus}: ${e.oratol}:00 ${e.oraig}:00</option>`;
                });
                select += "</select>";
                mezo.append(
                    `<div class="label-input label-span"><label>Műszakeloszlások</label><span>${select}</span><input type="number" placeholder="Műszakeloszlások azonosító..." name="muszakelo_azon" id="muszakeloszlasok-input"></div>`
                );
                $("#muszakeloszlasok").change("change", function () {
                    console.log(this.value);
                    console.log(
                        $("#muszakeloszlasok-input").attr("value", this.value)
                    );
                    $("#muszakeloszlasok-input").attr("value", this.value);
                });

                callback();
            }
        }
    }

    //Kész
    function szabadsagInput(mezo, callback) {
        mezo.append(
            `<div class="label-input"><label>Alkalmazott:</label><input type="text" placeholder="Alkalmazott..." name="alkalmazott"></div>`
        );
        mezo.append(
            `<div class="label-input"><label>Tól:</label><input type="date"" name="tol"></div>`
        );
        mezo.append(
            `<div class="label-input"><label>Ig:</label><input type="date"" name="ig"></div>`
        );
        mezo.append(
            `<div class="label-input"><label>Szabadságtípus:</label><input type="text" placeholder="Szabaságtípus..." name="szabadsagtipus"></div>`
        );
        callback();
    }

    //Kész
    function beosztasInput(mezo, callback) {
        let napigenyek = [];
        ajax.ajaxApiGet("/api/napokossz", (eredmeny) => {
            let select =
                '<select id="napok"><option>Válassz a napok közül!</option>';
            eredmeny.forEach((e) => {
                select += `<option value="${e.nap}">${e.nap} </option>`;
            });
            select += "</select>";
            mezo.append(select);

            ajax.ajaxApiGet(
                "/api/napimunkaeroigenyek",
                beosztasokSelect
            );
        });

        function beosztasokSelect(eredmeny) {
            let napiMunkaTomb = [];
            mezo.append(`<select type="text" id="dolgozos3"></select></div>`);
            mezo.append(
                `<div class="label-input label-input2"><input type="text" placeholder="Kiválaszott Munkaerőigény" name="napim_azonosito" id="napim_azonosito" disabled><input type="text" placeholder="Kiválasztott Alkalmazott..." name="alkalmazott" id="alkalmazott" disabled>`
            );

            eredmeny.forEach((e) => {
                napigenyek.push(e);
            });

            $("#napok").change("change", function () {
                napiMunkaTomb = [];
                $("#napimunkaeroigeny-table").remove();
                $(".deletable").remove();
                let szurt = napigenyek.filter((nap) => {
                    return nap.datum == this.value && nap.db > 0;
                });

                let select =
                    '<div class="napimunkaeroigeny-grid"><table id="napimunkaeroigeny-table"><th>napim_azonosito</th><th>datum</th><th>Műszak</th><th>munkakor</th><th>db</th></table></div>';
                mezo.append(select);
                $(".label-input2").after(`<div class="box deletable"></div>`);
                $(".deletable").hide();
                const tabla = $("#napimunkaeroigeny-table");
                $(".loading").fadeIn(1000);

                    szurt.forEach((e) => {
                    let obj = new NapiMunkaSorok(tabla, e);
                   
                    ajax.ajaxApiGet(
                            "/api/muszakeloszlas/" +
                            obj.adat.muszakelo_azon,
                        (adat) => {
                            obj.tol = adat.oratol;
                            obj.ig = adat.oraig;
                            obj.setElem();
                            napiMunkaTomb.push(obj);
                        }
                    );
                });

                tabla
                .find("tr")
                .css({
                    opacity: "0",
                    display: "table-row",
                    margin: "auto",
                })
                .show()
                .animate({ opacity: 1 });

                
               
        });

            class NapiMunkaSorok {
                constructor(szulo, adat) {
                    this.node = szulo;
                    this.adat = adat;
                    this.node.append(`<tr></tr>`);
                    this.elem = this.node.find("tr:last");
                }
                setElem() {
                    this.elem.append(
                        `<td>${this.adat.napim_azonosito}</td><td>${this.adat.datum}</td><td>${this.tol} - ${this.ig}</td><td>${this.adat.munkakor}</td><td>${this.adat.db}</td>`
                    );
                    this.azon = this.adat.napim_azonosito;
                    this.elem.on("click", () => {
                        console.log(this.adat);
                        $("#alkalmazott").attr("value", null);
                        let munkakor = this.adat.munkakor;
                        $("#napim_azonosito").attr(
                            "value",
                            this.adat.napim_azonosito
                        );
                        $(".ujmezo  .box").html(`<div>${this.adat.datum} ${this.tol}:00 - ${this.ig}:00 </div><div class="box-infos"></div>`);    
                        ajax.ajaxApiGet(
                            "/api/alkalmazottak",
                            alkalmazottLista
                        );

                        function alkalmazottLista(eredmeny) {
                            let ujEredmeny = eredmeny.filter((alkalmazott) => {
                                return alkalmazott.munkakor == munkakor;
                            });
                            let selectElem = $("#dolgozos3");
                            selectElem.empty();
                            selectElem.slideDown(500);
                            selectElem.append(
                                `<option>Válassz a(z) ${munkakor} dolgozók közül...</option>`
                            );
                            ujEredmeny.forEach((e) => {
                                selectElem.append(
                                    `<option value="${e.dolgozoi_azon}">${e.nev}</option>`
                                );
                            });
                            let dolgozoi_azon;
                            selectElem.change("change", function () {
                                $("#alkalmazott").attr("value", this.value);
                                dolgozoi_azon = this.value;
                                ajax.ajaxApiGet("/api/alkalmazott/"+dolgozoi_azon, alkalmazott=>{
                                    
                                    let text = `${alkalmazott.nev} ${alkalmazott.munkakor}`;
                                    $(".ujmezo .box .box-infos").html(text);
                                    $(".deletable").show();
                                    $(".ujmezo .box div").slideDown(500);
                                });

                                
                            });
                            
                        }
                    });
                }
            }
            callback();
        }
    }



    $(window).on("Mentes", ({ detail }) => {
        for (const key in detail.adat) {
            let ertek = detail.clone.find(`.${key}`).val();
            console.log(detail);
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
            ajax.ajaxApiGet(detail.apivegpont, bejelenetkezesekAdmin);
        } else if (detail instanceof FaliujsagPost) {
            ajax.ajaxApiGet("/api/faliujsagok", faliujsagAdmin);
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
        infoAblak();
    });

    function ajaxHivasok() {
        ajax.ajaxApiGet("/api/alkalmazottak", alkalmazottAdmin);
        ajax.ajaxApiGet("/api/faliujsagok", faliujsagAdmin);
        ajax.ajaxApiGet("/api/munkakorok", munkakorAdmin);
        ajax.ajaxGet("/api/bejelentkezesiadatok", bejelenetkezesekAdmin);
        ajax.ajaxApiGet("/api/muszaktipusok", muszakTipusAdmin);
        ajax.ajaxApiGet("/api/napimunkaeroigenyek", napiMunkaEroIgenyAdmin);
        ajax.ajaxApiGet("/api/napokossz", napokAdmin);
        ajax.ajaxApiGet("/api/beosztasok", beosztasAdmin);
        ajax.ajaxApiGet("/api/nemdolgoznaossz", nemdolgoznaAdmin);
        ajax.ajaxApiGet("/api/szabadsagok", szabadsagAdmin);
    }
    infoAblak();
});