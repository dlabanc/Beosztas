$(function () {
    const token = $('meta[name="csrf-token"]').attr("content");
    const ajax = new Ajax(token);
    ajax.ajaxApiGet("/api/faliujsagok", faliujsagUser);
    let logged ;

    $(".post-info").hide();
    ProfilAdatok();
    newPost();
    nemErekRaUser();
    userBeosztas();


    $(document).ajaxStop(function () {
        $(".loading").fadeOut(1000, () => {});
       
    });

    function faliujsagUser(adatok) {
        class Post {
            constructor(szulo, adat, kep, alkalmazottAdatok) {
                this.szulo = szulo;
                this.kep = kep;
                if (adat != undefined) {
                    this.szulo.append(`<div class="post"><img src="${kep}"><h3></h3></div>`);
                    this.adat = adat;
                    this.elem = szulo.find(".post:last");
                    this.alkalmazottAdatok = alkalmazottAdatok;
                    this.elem.find("h3").text(this.adat.cim);
                    this.postElem = $(".post-info");
                    
                    this.elem.on("click", (e) => {
                        
                        this.postElem.hide(0,()=>{
                            this.postElem.fadeIn(500);
                        });
                        
                        
                        this.postElem.children(".post-info-user-data").children("p").html(adat.tartalom);
                        
                        this.postElem
                            .children(".post-info-user-data")
                            .find("h3")
                            .html(adat.cim);
                        this.postElem
                            .find(".post-img img")
                            .attr("src", this.kep);
                        this.postElem
                            .find("section")
                            .html(
                                `${this.alkalmazottAdatok.nev}<br>${this.alkalmazottAdatok.munkakor}`
                            );
                    });
                }
            }
        }

        
       
        $(".posts-container").empty();
        
        $(".posts").empty();
        $(".posts").append(`<div> <h1>Faliújság</h1></div>`);
       
        const postinfoTomb = [];
        let oldalhossz = 5;
        let i = 1;

        pagiJobbBal($(".posts-grid"),$(".faliujsag-container"),$(""),".post-title",oldalhossz)
        
        for (let oldalIndex = 0; oldalIndex < adatok.length; oldalIndex += oldalhossz) {
            let darabolt = adatok.slice(oldalIndex, oldalIndex + oldalhossz)
            darabolt.forEach((adat) => {
                
                ajax.ajaxApiGet("/api/alkalmazott/" + adat.dolgozoi_azon, (a) => 
                {
                    
                        postinfoTomb.push(a);
                        const szulo = $(".faliujsag-container");
                        let faliujsagPost = new Faliujsag(szulo, adat,ajax);

                        if(oldalIndex>0){
                            faliujsagPost.titleElem.hide();
                        }

                        faliujsagPost.elem.find("button").remove();
                        if (postinfoTomb.length == darabolt.length-i+oldalIndex) {
                            const szulo = $(".posts");
                            ajax.ajaxGet(
                                "https://randomuser.me/api/?results=" + darabolt.length+oldalIndex, (kepek) => {
                                    kepek.results.map((ember, index) => {
                                            const element = darabolt[index];
                                            let kep = ember.picture.large;
                                            $(".profilepic").attr("src", kep);
                                            $(".profilepic").fadeIn(1000);
                                            $(".post-title")
                                            .eq(index+oldalIndex)
                                            .find("img")
                                            .attr("src", ember.picture.large);
                                            $("#Profiladatok")
                                                .find("img")
                                                .attr("src", kep);
    
                                            let post = new Post(
                                                szulo,
                                                element,
                                                kep,
                                                postinfoTomb[index+oldalIndex]
                                            );

                                            
                                        
                                        $(".post-content")
                                            .eq(index+oldalIndex)
                                            .find("img")
                                            .attr("src", ember.picture.large);

                                            if(oldalIndex>0 && post.elem!=undefined){
                                                post.elem.hide();
                                            }
                                    });
                                    if (oldalIndex>0) {
                                    pagiJobbBal($(".posts"),$(".posts"),$(""),".post",oldalhossz)
                                    }
                                    
                                }
                            );
                            i--;
                        }
                       
                    });
                    
            });
            
        }
         
    }

    function newPost() {
        const apivegpont = "/api/faliujsag/";
        const newpostElem = $("#newpost");
        const newpostForm = $("#Faliujsag").find("fieldset");
        const newpostMegse = $("#Faliujsag").find("fieldset").find(".fa-times");
        const newpostOk = $("#Faliujsag").find("fieldset").find(".fa-check");
        newpostElem.on("click", () => {
            newpostForm.slideDown(500);
        });
        newpostMegse.on("click", () => {
            newpostForm.slideUp(500);
        });
        newpostOk.on("click", () => {
          
            let ma = formatDate(new Date());
            let obj = {
                dolgozoi_azon: logged,
                mikor: ma,
                cim: $("#newpost-cim").val(),
                tartalom: $("#newpost-tartalom").val(),
            };

            ajax.ajaxApiPost(apivegpont, obj);
            newpostForm.effect("clip", "1500");
            
            ajax.ajaxApiGet(

                "/api/faliujsagok",
               
               
                faliujsagUser
                
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

    function ProfilAdatok() {
        
        ajax.ajaxApiGet("/loggeduser", (adatok)=>{
            logged = adatok;
            ajax.ajaxApiGet("/api/alkalmazott/"+logged, (adatok) => {
                
                sor = 0;
                $(".profile-name").text("Üdvözöllek, "+adatok.nev);
                
                $(".profile-nev").text(adatok.nev);
                $(".profile-munkakor").text(adatok.munkakor);
                $(".location-address").text(adatok.lakcim);
                $(".location-phone").text(adatok.elerhetoseg);
                $(".location-email").text(adatok.email);

                let kulcsok = ["Név","Lakcím","Születési Dátum","Adóazonosító","TAJ","Elérhetőség","E-mail","Munkakör","Heti óraszám","Munkaviszony kezdete","Munkaviszony Vége"];
                let i = 0;
                Object.keys(adatok).forEach((kulcs)=>{
                    
                    if((kulcs!="dolgozoi_azon"))
                    {
                        if (adatok[kulcs]==null){
                            adatok[kulcs]="-"
                        }
                       sorFeltolt(kulcsok[i],adatok[kulcs]);
                       i++;
                    }
            
                });

                function sorFeltolt(kulcs,ertek){
                    $("#elso").append(
                        "<tr id=" +sor + " class="+"profile-rows"+"><td class="+"r1"+">" +kulcs +":</td><td>" +ertek +
                            "</td><span class='showButton fa fa-edit'></span></tr>"
                    );
                }

                $(".tabcontent").eq(0).fadeIn(1000);
                $(".tabcontent").eq(0).css("visibility","visible");
            });
        });
        $(".profilepic").hide();
       
    }
    function nemErekRaUser(){
        const SZULO = $("#Nemerekra");
        nemErekSegedElemek();
       
    
        const nemDolgoznaApi = "/api/nemdolgozna/";
        const token = $('meta[name="csrf-token"]').attr("content");
        const ajax = new Ajax(token);
        const naptar = SZULO.find(".naptar");
        const timer = $(".timer");
        const datettime = $(".datettime");
    
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
        let aktualisHonap = date.getMonth()+1 ;
        let honapElsoNapja = (new Date(date.getFullYear(), date.getMonth(), 1));
        let honapOsszNapja = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    
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
    
        function nemErekSegedElemek(){
            
    
            SZULO.append(
                `<div class="naptar"><div class="timer-datettime"><div class="timer"></div><div class="datettime"></div></div></div>`
            );
            SZULO.append('<div class="datettime-info"></div>');
        
            $(".datettime-info").append(`
            <div class="dateinfo-massage-grid">
                <div class="dateinfo">Melyik nap nem jó neked?</div>
                <div class="message">Válassz a naptár napjaiból!</div>
            </div>
            <div class="dateinfo-muszaktipus" id="selectable"></div>
            <div class="dateinfo-buttons"><button class="fas fa-check user-send-ok"></button><button class="fas fa-trash user-send-cancel"></button></div>`);
            $(".dateinfo-buttons").hide();
            
        }
    
        class Nap {
            constructor(szulo, nap, napok, elem) {
                this.api = "/api/napok/";
                this.muszakEloszlasokApi =
                    "/api/muszakeloszlasok";
                this.szulo = szulo;
                this.nap = nap;
                this.napok = napok;
                this.napNev = idoAtvalt(
                    new Date(`${aktualisEv}/${aktualisHonap}/${this.nap}`)
                );
                this.nemKivantMuszakok = [];
                this.infoElem = $(".datettime-info");
                this.messageElem = $(".message");
                this.dateInfoElem = $(".dateinfo");
                this.muszakTipusElem = $(".dateinfo-muszaktipus");
                this.elkuldElem = $(".user-send-ok").clone();
                this.torolElem = $(".user-send-cancel").clone();
    
                this.elem = elem.text(`${this.nap}`);
                this.elem.on("click", () => {
                    this.infoElem.show(500);
                    this.elemekKezelese();
                    let logged;
                    ajax.ajaxApiGet("/loggeduser",(adatok) => {logged=adatok});
                    
                            
                    
                    let today = aktualisEv + "." + honapok[aktualisHonap] + "." + this.nap + ".";
                    this.dateInfoElem.text(today);
    
                    ajax.ajaxApiGet(this.api + this.napNev, (nap) => {
                        $(".dateinfo-massage-grid").slideDown(500);
                        if (nap.length == 0) {
                            this.setMessageElemSzinSzoveg("#2cabe3", "Ehhez a naphoz még nincs műszakeloszlás beállítva!");
                        } 
                        else {
                            this.setMessageElemSzinSzoveg("#2cabe3", "Válaszd ki melyik műszakokban nem szeretnél jönni!");
                            this.muszaktipus = nap.muszaktipus;
    
                            ajax.ajaxApiGet(this.muszakEloszlasokApi, (adatok) => {
                                this.muszakTipusElem.empty();
    
                                let szurt = adatok.filter((adat) => {
                                    return adat.muszaktipus == this.muszaktipus;
                                });
                                szurt.forEach((sor) => {
                                    this.muszakTipusElem.append(
                                        `<div class="nap-inputs"><input type="checkbox" id="${sor.muszakelo_azon}" > <label>${sor.oratol}:00 - ${sor.oraig}:00</label></div>`
                                    );
                                });
                                this.muszakokKihuzasa(logged);
                                
    
                                
    
                                this.muszakTipusElem.fadeIn(500);
                                $(".dateinfo-buttons").fadeIn(500);
                            });
                        }
    
                        this.elkuldElem.on("click", () => {
                                    
                            let elem;
                            this.nemKivantMuszakok.splice(0,this.nemKivantMuszakok.length);
                            let hossz = this.muszakTipusElem.find(`input[type="checkbox"]:checked`).length;
                            
                            for (let index = 0; index < hossz; index++) {
                                elem = this.muszakTipusElem.find(`input[type="checkbox"]:checked`).eq(index);
                                if(!(elem.parent().hasClass("deletable"))){
                                this.nemKivantMuszakok.push({id: elem.attr("id"),nap: this.napNev});
                                }
                            }
    
                                                    
                            let obj = {};
                            this.nemKivantMuszakok.forEach((muszak) => {
                                obj.alkalmazott = logged;
                                obj.datum = muszak.nap;
                                obj.muszakelo_azon = muszak.id;
                                ajax.ajaxApiPost(nemDolgoznaApi,obj);
                                this.muszakokFeltoltes();
                                }
                            );
                            ujNaptar.naptarSzinez();
    
                        });
    
                        this.torolElem.on("click",()=>{
                                    
                            
                            ajax.ajaxApiGet("/api/nemdolgoznaossz",(adatok) => {
                               
                                let muszakelo_azonTomb = [];
                              // adatok.filter((nemdolgozna)=>{return nemdolgozna.alkalmazott == logged && nemdolgozna.datum == this.napNev && nemdolgozna.muszakelo_azon == element.attr("id"); });
                                let torolhetoElemek = $('.deletable input[type="checkbox"]:checked');
                                for (let index = 0; index < torolhetoElemek.length; index++) {
                                    
                                    const element = torolhetoElemek.eq(index);
                                    muszakelo_azonTomb.push(element.attr("id"));
                                    
                                    
                                }
                                let veglegTorolheto = [];
                                for (let index = 0; index < muszakelo_azonTomb.length; index++) {
                                    const element = muszakelo_azonTomb[index];
                                    let torolhetoNemdDolgozna  = adatok.find((adat,index)=>{
                                        return adat.alkalmazott == logged && adat.datum == this.napNev && adat.muszakelo_azon == element;
                                    });
    
                                    veglegTorolheto.push(torolhetoNemdDolgozna);
                                    
                                }
                                
                                veglegTorolheto.forEach((adat)=>{ajax.ajaxApiDelete("/api/nemdolgozna",adat.nemdolgozna_azon)
    
                                this.muszakokFeltoltes();
                                ujNaptar.naptarSzinez();
                                });
                                
                            });
                        
                           
                    });
                    });
                });
            }
    
            elemekKezelese(){
                    $(".user-send-ok").remove();
                    $(".user-send-cancel").remove();
                    $(".dateinfo-buttons").append(this.elkuldElem);
                    $(".dateinfo-buttons").append(this.torolElem);
                    $(".dateinfo-massage-grid").hide();
                    $(".dateinfo-buttons").hide();
    
                    this.muszakTipusElem.hide();
                    
                    
            }
    
            setMessageElemSzinSzoveg(szin,szöveg){
                this.messageElem.css("color", szin);
                this.messageElem.text(szöveg);
            }
    
            muszakokKihuzasa(logged){
                
                ajax.ajaxApiGet("/api/nemdolgoznaossz",(adatok) => {
                        if (adatok.length > 0) {
                            
                            let szurt = adatok.filter((adat) => {return ( adat.alkalmazott == logged && adat.datum == this.napNev);});
                            szurt = szurt.map((adat) => {
                                return adat.muszakelo_azon;
                            });
                            
                            szurt.forEach((id) => {
                                let kihuz = this.muszakTipusElem.find(`#${id}`);
                                kihuz.parent().css("text-decoration","line-through");
                                kihuz.parent().css("text-decoration-color","red");
                                kihuz.parent().addClass("deletable");
                                
                                
                            });
                            
                        }
                  
                    }
    
                )
            }
    
            muszakokFeltoltes(){
               
                ajax.ajaxApiGet(
                    this.muszakEloszlasokApi,
                    (adatok) => {
                        this.muszakTipusElem.empty();
                        
                        let szurt = adatok.filter(
                            (adat) => {
                                return (
                                    adat.muszaktipus ==
                                    this.muszaktipus
                                );
                            }
                        );
                        szurt.forEach((sor) => {
                            this.muszakTipusElem.append(
                                `<div class="nap-inputs ui-widget-content"><input type="checkbox" id="${sor.muszakelo_azon}" > <label>${sor.oratol}:00 - ${sor.oraig}:00</label></div>`
                            );
                           
                        });
                        
                        this.muszakokKihuzasa(logged);
                        
                    }
                );
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
                   aktualisTablazat.append(`<div class="days">${napok[index]}</div>`);
                    
                }
               
               
                for (let index = 0; index < honapOsszNapja+10; index++) {
                    aktualisTablazat.append(`<div class="datedays"></div>`);
                }
                let i = 0;

                
                while(i<honapOsszNapja){
                    
                    let nap = new Nap(aktualisTablazat,i+1,napok,aktualisTablazat.find(".datedays").eq(honapElsoNapja.getDay()+i));
                    aktualisTablazat.find(".datedays").eq(honapElsoNapja.getDay()+i).attr("id",nap.napNev);
                    $(`#${nap.napNev}`).css("border",  "0.5px solid var(--fds-gray-20)");    
                    $(`#${nap.napNev}`).css("margin",  ".5rem");    
                    $(`#${nap.napNev}`).css("text-align",  "center");   
                    
                    i++;
                }
               this.naptarSzinez();
                
            }
    
            
            naptarSzinez(){
                $(".datedays").removeClass("addshadow");
                $(".datedays").css({
                    opacity: "0",
                }).show().animate({ opacity: 1 });
                let dolgozo;
                ajax.ajaxApiGet("/loggeduser",(adatok) => {
                    dolgozo=adatok;
                    ajax.ajaxApiGet("/api/nemdolgoznaossz",(adatok) => {
                    let szurtAdatok = adatok.filter(adat=>{return adat.alkalmazott==dolgozo});
                    szurtAdatok.forEach(adat=>{
                        
                        $(`#${adat.datum}`).addClass("addshadow");
                    })
                   
                })
                });
                
            }
        }
    
        let ujNaptar = new Naptar(naptar, napok, honapok);
    }

    function pagiJobbBal(szulo,tabla,sablon,elem,elemPerOldal) {
        szulo.append("<div id='navigacio'></div>");
        $("#navigacio").empty();

        szulo.find("#navigacio").append(
         "</button><button class='fas fa-angle-left' id='hatraLepeget'></button>"
        +"<button class='fas fa-angle-right' id='eloreLepeget'></button>")

        szulo.find("#eloreLepeget").on("click",eloreLepeget);
        szulo.find("#hatraLepeget").on("click",hatraLepeget);

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
        }

        function kiurit() {
            for (let index = 0; index < tabla.find(elem).length; index++) {
                tabla.find(elem).eq(index).hide();
            }
        }
    }

    function userBeosztas(){

        
        const beosztasHelye = $(".BeosztasTabla");
      
        const loggeduser = "/loggeduser";
        const beosztasok = "/api/beosztasok/expand";
        const muszakeloszlas = "/api/muszakeloszlas/";
        const beosztasNapjai = new Set(); 

        ajax.ajaxGet(loggeduser,(adatok)=>{

            const bejelentkezettFelhasznalo = adatok;
            
            ajax.ajaxApiGet(beosztasok,(beosztasok)=>{
                ajax.ajaxApiGet("/api/muszakeloszlasok",(muszakeloszlasok)=>{
                    console.log(muszakeloszlasok)
                    ajax.ajaxApiGet("/api/napokossz",(napok)=>{
                        
                        bejelentkezettBeosztasa = beosztasok.filter(beosztas=>{
                            return beosztas.alkalmazott == logged;
                        });
        
                        bejelentkezettBeosztasa.forEach((beosztas)=>{
                        beosztasNapjai.add(beosztas.napimunkaeroigeny[0].datum); 
                        });
                        
                        beosztasNapjai.forEach(nap=>{
                            
                            $(".Datumok").append(`<li>${nap}</li>`);
                            let sorElem = $(".Datumok").find("li:last");
                            let kivalasztottNap = nap;
                            sorElem.on("click",()=>{
                                let tabla = napok.filter(nap=>{
                                    return nap.nap == kivalasztottNap;
                                });
                                for (let index = 0; index < $(".Datumok li").length; index++) {
                                    $(".Datumok li").eq(index).removeClass("focus");
                                    
                                }
                                sorElem.addClass("focus");
                                let tipusok = muszakeloszlasok.filter(eloszlas=>{
                                    return eloszlas.muszaktipus==tabla[0].muszaktipus;
                                });
                              
                                beosztasHelye.empty();
                           
                               
                                let kivalasztottBeosztas = bejelentkezettBeosztasa.filter((beosztas)=>{
                                    return beosztas.napimunkaeroigeny[0].datum == kivalasztottNap;
                                });
        
                                tipusok.forEach(tipus=>{
                                    beosztasHelye.append(`<div class="${tipus.muszakelo_azon} sor"><div class="ido"><span>${tipus.oratol+":00"}</span><span>${tipus.oraig+":00"}</span></div><span class="jelol"></span></div>`);
                                })
                                
                                kivalasztottBeosztas.forEach(beo=>{
                                    ajax.ajaxApiGet(muszakeloszlas+beo.napimunkaeroigeny[0].muszakelo_azon,(muszakelo)=>{
                                            beosztasHelye.find(`.${muszakelo.muszakelo_azon} .jelol`).css("background","var(--bs-teal)");
                                            
                                    });
                                });
                            });
                        })
                    });
                }); 
                 
              
                
            });


        });

         
    }
});
