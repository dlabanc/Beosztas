$(function () {
    const SZULO = $("#Nemerekra");
    nemErekSegedElemek();
   

    const nemDolgoznaApi = "http://localhost:8000/api/nemdolgozna/";
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
            <div class="dateinfo"></div>
            <div class="message"></div>
        </div>
        <div class="dateinfo-muszaktipus" id="selectable"></div>
        <div class="dateinfo-buttons"><button class="fas fa-check user-send-ok"></button><button class="fas fa-trash user-send-cancel"></button></div>`);
        $(".dateinfo-buttons").hide();
        $(".datettime-info").hide();
    }

    class Nap {
        constructor(szulo, nap, napok, elem) {
            this.api = "http://localhost:8000/api/napok/";
            this.muszakEloszlasokApi =
                "http://localhost:8000/api/muszakeloszlasok";
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
                ajax.ajaxApiGet("http://localhost:8000/loggeduser",(adatok) => {logged=adatok});
                
                        
                
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
                            this.muszakokKihuzasa();
                            

                            

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
                                
                        
                        ajax.ajaxApiGet("http://localhost:8000/api/nemdolgoznaossz",(adatok) => {
                           
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
                            
                            veglegTorolheto.forEach((adat)=>{ajax.ajaxApiDelete("http://localhost:8000/api/nemdolgozna",adat.nemdolgozna_azon)

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

        muszakokKihuzasa(){
            
            ajax.ajaxApiGet("http://localhost:8000/api/nemdolgoznaossz",(adatok) => {
                    if (adatok.length > 0) {
                        let szurt = adatok.filter((adat) => {return ( adat.alkalmazott == 30001 && adat.datum == this.napNev);});
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
                    
                    this.muszakokKihuzasa();
                    
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
            console.log(this.elsoNap);
            
            this.szulo.append(`<div class="tablediv"></div>`);
            let aktualisTablazat = this.szulo.find("div:last");
            
            for (let index = 0; index < 7; index++) {
               aktualisTablazat.append(`<div class="days">${napok[index]}</div>`);
                
            }
           
           
            for (let index = 0; index < honapOsszNapja+10; index++) {
                aktualisTablazat.append(`<div class="datedays"></div>`);
            }
            let i = 0;
            console.log(honapElsoNapja);
            console.log(honapOsszNapja);
            
            while(i<honapOsszNapja){
                
                let nap = new Nap(aktualisTablazat,i+1,napok,aktualisTablazat.find(".datedays").eq(honapElsoNapja.getDay()+i));
                aktualisTablazat.find(".datedays").eq(honapElsoNapja.getDay()+i).attr("id",nap.napNev);
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
            ajax.ajaxApiGet("http://localhost:8000/loggeduser",(adatok) => {
                dolgozo=adatok;
                ajax.ajaxApiGet("http://localhost:8000/api/nemdolgoznaossz",(adatok) => {
                let szurtAdatok = adatok.filter(adat=>{return adat.alkalmazott==dolgozo});
                szurtAdatok.forEach(adat=>{
                    
                    $(`#${adat.datum}`).addClass("addshadow");
                })
               
            })
            });
            
        }
    }

    let ujNaptar = new Naptar(naptar, napok, honapok);
});
