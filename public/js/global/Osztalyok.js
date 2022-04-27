class Adminelemek {
    
    constructor(szulo, adat, ajax) {
        this.node = szulo;
        this.ajax = ajax;
        szulo.append("<tr class="+"mutat"+"></tr>");
        this.elem = this.node.children("tr:last");
        szulo.append(`<tr class="mod"></tr>`);
        this.clone = this.node.children(".mod:last");
        this.adat = adat;
        this.adatMegjelenit();
        
        this.elem.on("click", () => {
            this.modosit();
        });
        this.elem.find(".admin-torol").on("click", (event) => {
            this.torol();
        });
        this.clone.find(".admin-mod-ok").on("click", () => {
            this.mentes();
        });

    }


    torol() {
        let esemeny = new CustomEvent("torles", { detail: this });
        window.dispatchEvent(esemeny);
    }

    modosit() {
        let esemeny = new CustomEvent("modosit", { detail: this });
        window.dispatchEvent(esemeny);

        this.clone.fadeIn(1000);
        this.clone.find(".admin-mod-ok").on("click", () => {});
        this.clone.find(".admin-mod-megse").on("click", () => {
            this.clone.fadeOut(1000);
        });
    }
    mentes() {
        let esemeny = new CustomEvent("Mentes", { detail: this });
        window.dispatchEvent(esemeny);
    }
    post(adat){
        this.ajax.ajaxApiPost(this.api,adat);
    }
   



    adatMegjelenit() {
        const TILOS = [
            "tipus",
            "dolgozoi_azon",
            "user_login",
            "datum",
            "muszakszam",
            "munkakor",
            "alkalmazott",
            "muszaktipus",
            "tol",
            "ig",
            "megnevezes",
            "azonosito",
            "nap",
            "allapot",
            "jelszo",
        ];
        for (const key in this.adat) {
            this.elem.append(`<td>${this.adat[key]}</td>`);

            if (TILOS.includes(key)) {
                this.clone.append(
                    `<td><label>${key}</label><br><input type="text" value="${this.adat[key]}" class="${key}" disabled></td>`
                );
            } else {
                this.clone.append(
                    `<td><label>${key}</label><br><input type="text" value="${this.adat[key]}" class="${key}"></td>`
                );
            }
        }
        
        this.clone.append(
            `<td><button class="fas fa-check admin-mod-ok"></button></td>`
        );
        this.clone.append(
            `<td><button class="fas fa-times admin-mod-megse"></button></td>`
        );
        this.elem.append(
            `<td><button class="fas fa-ban admin-torol"></button></td>`
        );
        $(".Alkalmazottak").find(".munkakor").prop("disabled", false);
        this.clone.hide();
    }
}

class AlkalmazottTabla {
    constructor(szulo, adat, index) {
        this.szulo = szulo;
        this.szulo.append(
        `<tr class='alkalmazottElem'>
          <td class='nev'>Név</td>
          <td class='beosztas'>Beosztás</td>
          <td class='lakcim'>Lakcím</td>
          <td class='elerhetoseg'>Elérhetőség</td>
          <td class='email'>E-mail</td>
          <td ></td>
          <td ></td>
        </tr>`
        );

        this.adat = adat;
        this.id = index; 
        
        this.elem = $("#Alkalmazottak tr:last");
        this.elem.find(".nev").text(this.adat.nev);
        this.elem.find(".beosztas").text(this.adat.munkakor);
        this.elem.find(".lakcim").text(this.adat.lakcim);
        this.elem.find(".elerhetoseg").text(this.adat.elerhetoseg);
        this.elem.find(".email").text(this.adat.email);
        this.menu = "#Alkalmazottak .dropdown-content";
         

        this.elem.on("click", (e) => {
            
            $(".alkalmazott-sablon").remove();
            $(this.menu).hide();
            this.elem.after(`<tr class="alkalmazott-sablon"></tr>`);
            this.clone = szulo.find(".alkalmazott-sablon:last");
            this.clone.hide();
            for (let index = 0; index < this.elem.children("td").length-2; index++) {
                this.clone.append(`<td><input type="text" value="${this.elem.children("td").eq(index).text()}" name=""">
                </td>`);   
            }
            this.clone.find("input").eq(0).addClass("nev");
            this.clone.find("input").eq(1).addClass("munkakor");
            this.clone.find("input").eq(2).addClass("lakcim");
            this.clone.find("input").eq(3).addClass("elerhetoseg");
            this.clone.find("input").eq(4).addClass("email");
            this.clone.append(`<td><button class="fas fa-check save-alkalmazott"></td></button><td><button class="fas fa-times cancel-alkalmazott"></button></td>`);
            this.klikkTrigger();
            $(this.menu).slideDown(500);
            $(this.menu).attr("id",this.adat.dolgozoi_azon);
            this.x = e.clientX;
            this.y = e.clientY;
            $(this.menu).css("left", this.x);
            $(this.menu).css("top", this.y);
            
            
        });
    }

    klikkTrigger() {
        let esemeny = new CustomEvent("klikk", { detail: this});

        window.dispatchEvent(esemeny);
    }
}
class Munkakor {
    
    constructor(szulo, adat, ajax) {
        this.api = "/api/munkakor";
        this.ajax = ajax;
        this.szulo = szulo;
        this.adat = adat;
        szulo.append(
            `<li class="munkakor-listitem">
            <span class="munkakor-megnevezes">${this.adat.megnevezes}</span>
            <div class="details">Részletek</div>
            </li>`
        );
        ajax.ajaxApiGet ("/api/alkalmazottak",(adatok)=>{

        this.munkakorAlkalmazottai = adatok.filter(alkalmazott=>{
            return alkalmazott.munkakor == this.adat.megnevezes;
        });

        });
        this.elem = szulo.find(".munkakor-listitem:last");
        this.elem.find(".details").on("click",()=>{
                const munkakorAdatok = $(".munkakor-adatok");
                munkakorAdatok.empty();
                munkakorAdatok.parent().append(` <div class="loading">
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>`);
                munkakorAdatok.hide();
                munkakorAdatok.append(`
                <div class="munkakor-adatok-title">
                <div class="munkakor-adatok-megnev">${this.adat.megnevezes}</div>
                <div class="munkakor-munkafonok">${this.adat.munkafonok==null ? "Munkafőnök: Nincs ":"Munkafőnök: "+this.adat.munkafonok}</div>
                <div class="munkakor-adatok-leiras">${this.adat.leiras}</div>
                </div>`);

                munkakorAdatok.append(`<div class="munkakor-dolgozo"></div>`);
                munkakorAdatok.append(`<div class="munkakor-dolgozo-adatok">Válassz az alkalmazottak képei közül!</div>`);
                if( this.munkakorAlkalmazottai==undefined|| this.munkakorAlkalmazottai.length<=0){
                    $(".loading").hide();
                    munkakorAdatok.slideDown(500);
                    munkakorAdatok.find(".munkakor-dolgozo-adatok").html(`<div class="munkakor-dolgozo-adatok nincs-dolgozo">Ehhez a munkakörhöz még nincs hozzárendelve dolgozó!</div>`);
                }
                else{
                    this.munkakorAlkalmazottai.forEach(alkalmazott=>{
                   
                        let munkakorDolgozok = munkakorAdatok.find(".munkakor-dolgozo");
                        ajax.ajaxApiGet("https://randomuser.me/api/?results=1",(adat)=>{
    
                            munkakorDolgozok.append(`<img alt="p">`);
                            let dolgozoElem = munkakorDolgozok.find("img:last");
                            let fenykep = adat.results[0].picture.large;
                            new MunkakorAlkalmazott(fenykep,alkalmazott,dolgozoElem);
    
                           
                        });
                        $(document).ajaxStop(()=>{
                            $(".loading").hide();
                            munkakorAdatok.slideDown(500);
                        });
                          
                    });
                }
               
                console.log(this.munkakorAlkalmazottai);
               
                
            
        });
    }

  
    munkakorTorles(){
        let esemeny = new CustomEvent("MunkakorTorles",{detail:this});
        window.dispatchEvent(esemeny);
    }
    
}

class MunkakorAlkalmazott{
        constructor(kep,adat,elem)
        {
            this.elem = elem;
            this.kep = kep;
            this.adat = adat;
            this.elem.attr("src",this.kep);
            this.elem.on("click",()=>{
                
                $(".munkakor-dolgozo-adatok").html(`
                <div>
                <img src="${this.kep}" alt="">
                </div>
                <div class="munkakor-dolgozo-adatai">
                <div class="fas fa-user"><span> ${this.adat.nev}</span></div>
                <div class="fas fa-phone"><span> ${this.adat.elerhetoseg}</span></div>
                <div class="fas fa-envelope"><span> ${this.adat.email}</span></div>
                </div>
               `);
               $(".munkakor-dolgozo-adatok").children().hide();
               $(".munkakor-dolgozo-adatok").children().slideDown(500);
              

            });
            
        }
       
}

class MuszakEloszlas {
    constructor(szulo,adat,ajax){
        this.ajax = ajax;
        this.szulo=szulo;
        this.adat = adat;
        this.muszakeloazon = this.adat.muszakelo_azon;
        this.muszakszam = this.adat.muszakszam;
        this.muszakOratol = this.adat.oratol;
        this.muszakOraig = this.adat.oraig;
        this.szulo.find(".table-header").text(this.adat.muszaktipus);
        this.szulo.append(`<div class="muszakeloszlas-elem"></div>`);
        this.elem = this.szulo.find("div:last"); 
        this.elem.append('<div class="times"></div>');
        Object.keys(this.adat).forEach(kulcs=>{
            
            if(kulcs=="muszakelo_azon" || kulcs=="muszaktipus") return;
            if(kulcs=="oratol" || kulcs == "oraig"){

                this.elem.find(".times").append(`<div class="${kulcs}">${this.adat[kulcs]}:00</div>`);
            }
            else{
                this.elem.append(`<div class="muszaknev">${this.adat[kulcs]}. műszak</div>`); 
            }    
        });
       
        this.szulo.append
        (`
        <div class="muszakelo-clone">
        <input type="number"  placeholder="${this.muszakOratol}:00" > - <input type="number"   placeholder="${this.muszakOraig}:00">
        <input type="number"  placeholder="${this.muszakszam}. műszak">
        <button class="fas fa-check muszakelo-clone-ok"></button>
        <button class="muszakelo-clone-cancel" >Mégse</button>
        <button class="fas fa-trash muszakelo-clone-delete"></button>
        </div>
        `);
        this.clone = this.szulo.find(".muszakelo-clone:last");  
        this.clone.hide();
        this.elem.on("click",()=>{
            this.clone.slideDown(300);
        });
        this.clone.find(".muszakelo-clone-delete").on("click",()=>{
            
            this.torlesTrigger(); 
        });
        this.clone.find(".muszakelo-clone-cancel").on("click",()=>{
              
               this.clone.slideUp(300); 
        });    
        this.clone.find(".muszakelo-clone-ok").on("click",()=>{
            this.kattintasTrigger();
        });   
        this.hoverEffect();
    }

    kattintasTrigger(){
        let esemeny = new CustomEvent("MuszakEloszlasValtozas",{detail:this});
        window.dispatchEvent(esemeny);
    }

    torlesTrigger(){
        let esemeny = new CustomEvent("MuszakEloszlasTorles",{detail:this});
        window.dispatchEvent(esemeny);
    }

    put(){
        this.adat.oratol = this.clone.find("input").eq(0).val();
        this.adat.oraig = this.clone.find("input").eq(1).val();
        this.adat.muszakszam = this.clone.find("input").eq(2).val();
       
            ///api/muszakeloszlas/{muszakelo_azon}
        this.ajax.ajaxApiPut("/api/muszakeloszlas",this.muszakeloazon,this.adat);
    }

    delete(){
        this.ajax.ajaxApiDelete("/api/muszakeloszlas",this.muszakeloazon);
    }

    hoverEffect(){
        this.elem.hover(
            function() {
              $( this ).addClass( "hover" );
            }, function() {
              $( this ).removeClass( "hover" );
            }
          );
    }
   

    
}

class MuszakHozzaAdas {
    constructor(szulo, adat, ajax) {
        this.click = 1;
        this.api = "/api/muszaktipus";
        this.ajax = ajax;
        this.szulo = szulo;
        this.szulo.append(`<tr class="muszak-sorok"></tr>`);
        this.torlesEsemeny = this.torles;
        this.adat = adat;
        this.elem = $(".muszak-sorok:last");
        this.elem.append(`<td class="muszaklista-tipus">${adat.tipus}</td><td>${adat.leiras}</td>`);
        this.elem.append('<td><button  class="fas fa-trash removemuszak"></button></td>');
        this.elem.append('<td><button  class="fas fa-edit editmuszak"></button></td>');
        this.elem.append('<td class="showmuszak"></td>');
        this.torolElem = this.elem.find(".removemuszak");
        this.szerkesztElem = this.elem.find(".editmuszak") ;
        this.reszletekElem = this.elem.find(".showmuszak");
        this.szulo.append(`<tr class="details"></tr>`);
        this.reszletek = this.szulo.find('.details:last');

        this.szerkesztElem.on("click",()=>{
            this.kattintasTrigger("MuszakModosit");
        });

        this.torolElem.on("click",()=>{
            this.kattintasTrigger("torolh");
        });
        
        
        this.reszletekMutat();
        
    }

    reszletekMutat(){
        this.details();
       
    }

    static hozzaAd(szulo,ajax,callback){
        
        szulo.parent().prepend(`<button class="newmuszak">Új</button>`);
        $(".newmuszak").on("click",()=>{
            $(".sablon").remove();
            let ujMuszak = new MuszakHozzaAdas(szulo,{tipus:"",leiras:""},ajax);
            ujMuszak.elem.hide();
            ujMuszak.elem.children("td").eq(0).html('<input type="text" name="tipus" id="tipus" placeholder="Tipus..."/>');
            ujMuszak.elem.children("td").eq(1).html('<input type="text" name="leiras" id="leiras" placeholder="Leírás..."/>');
            ujMuszak.torolElem.parent().remove();
            ujMuszak.szerkesztElem.parent().remove();
            
            ujMuszak.reszletekElem.before(`<td><button  class="fas fa-times nosavemuszak"></button></td>`);
            ujMuszak.reszletekElem.before(`<td><button  class="fas fa-check savemuszak"></button></td>`);
            ujMuszak.mentesElem = ujMuszak.elem.find(".savemuszak");
            ujMuszak.megseElem = ujMuszak.elem.find(".nosavemuszak");
            ujMuszak.elem.addClass("sablon");
            ujMuszak.elem.fadeIn(500);
            ujMuszak.mentesElem.on("click",()=>{
                let muszaktipus = ujMuszak.elem.find("#tipus").val();
                let leiras = ujMuszak.elem.find("#leiras").val();
                ujMuszak.adat.tipus = muszaktipus;
                ujMuszak.adat.leiras = leiras;
                ajax.ajaxApiPost("/api/muszaktipus",ujMuszak.adat);
                callback();
            });
            ujMuszak.megseElem.on("click",()=>{
                ujMuszak.elem.remove();
                Object.keys(ujMuszak).forEach(kulcs=>{
                    delete ujMuszak[kulcs];
                });
                
                callback();
            });
        });

    }
    modosit(callback){
        this.elem.hide();
        this.torolElem.parent().remove();
        this.szerkesztElem.parent().remove();
        this.elem.children("td").eq(0).html(`<input type="text" name="tipus" id="tipus" placeholder="Tipus..." value="${this.adat.tipus}" disabled/>`);
        this.elem.children("td").eq(1).html(`<input type="text" name="leiras" id="leiras" placeholder="Leírás..." value="${this.adat.leiras}"/>`);
        
        this.reszletekElem.before(`<td><button  class="fas fa-times nosavemuszak"></button></td>`);
        this.reszletekElem.before(`<td><button  class="fas fa-check savemuszak"></button></td>`);
        this.mentesElem = this.elem.find(".savemuszak");
        this.megseElem = this.elem.find(".nosavemuszak");
        this.elem.fadeIn(500);
        this.mentesElem.on("click",()=>{
                let muszaktipus = this.elem.find("#tipus").val();
                let leiras = this.elem.find("#leiras").val();
                this.adat.tipus = muszaktipus;
                this.adat.leiras = leiras;
                this.ajax.ajaxApiPut("/api/muszaktipus",muszaktipus,this.adat);
                this.reszletekElem.show();
                this.reszletek.show();
                callback();
        });
        this.megseElem.on("click",()=>{
            
            callback();
        })

    }

    torles(){
        this.ajax.ajaxApiDelete(this.api,this.adat.tipus);
    }

    details(){
        
        this.reszletek.empty();
        this.reszletek.append('<ul class="reszletek-lista"></ul>');
        this.reszletek.children("ul").hide();
        this.ajax.ajaxApiGet("/api/muszakeloszlasok",(adatok)=>{
            console.log(adatok);
                let szurt = adatok.filter(eloszlas=>{
                    return eloszlas.muszaktipus==this.adat.tipus;
                })
                if(szurt.length==0){
                    this.reszletek.children("ul").append(`<li>Még nincsenek meghatározva műszakok ehhez a típushoz!</li>`);
                }
                szurt.forEach(adat => {
                    let reszlet = "";
                    let tipus = adat.muszaktipus;
                    let muszakszam = adat.muszakszam;
                    let oratol = adat.oratol;
                    let oraig = adat.oraig;
                    Object.keys(adat).forEach( kulcs => {
                        reszlet += adat[kulcs]+" ";
                    });
                    
                    this.reszletek.children("ul").append(`<li><span class="muszaklista-muszakszam">${muszakszam}. műszak</span><span class="muszaklista-tol-ig"> ${oratol}:00 - ${oraig}:00</span></li>`);
                    
                   
                });            
            
            this.reszletek.children("ul").slideDown(500);
        });
    }

    kattintasTrigger(gomb) {
        let esemeny = new CustomEvent(gomb, {
            detail: this,
        });
        window.dispatchEvent(esemeny);
    }
}

class Muszak {
    constructor(szulo, adat) {
        this.node = szulo;

        szulo.append(
            `<div class="muszaktipusn-content">
      <div class="muszaktipusn-text">
      <h2>Műszak típusa</h2>
      <p>Műszaktípus leírása</p>
      </div>
      <div class="mtc-inline-grid">
      <div class="aktualisnapok"></div>
      <div>
      <button class="send fas fa-plus"></button>  
      <button class="delete fas fa-trash"></button>
      </div> 
      </div>          
      </div>`
        );
        this.elem = this.node.children(".muszaktipusn-content:last");
        this.adat = adat;
        this.napok = [];
        this.elem.children("div").children("p").text(this.adat.leiras);
        this.elem.children("div").children("h2").text(this.adat.tipus);
        this.napokTarolo = this.elem
            .children(".mtc-inline-grid")
            .children(".aktualisnapok");
        this.elem.find(".send").on("click", () => {
            this.kattintasTrigger("Hozzarendeles");
        });
        this.elem.find(".delete").on("click", () => {
            this.kattintasTrigger("Torles");
        });
    }
    kattintasTrigger(gomb) {
        let esemeny = new CustomEvent(gomb, { detail: this });
        window.dispatchEvent(esemeny);
    }
}

class Faliujsag {
    constructor(szulo, adat, ajax) {
        this.szulo = szulo;
        this.ajax = ajax;
        this.clickcounter = 0;
        this.api = "/api/faliujsag";
        szulo.append(`
          <tr class="post-title"><td><img src="" alt="" /></td><td><h3></h3></   td><td class="details">Részletek</td></tr>    
          <tr class="post-content">
          <td><p class="post-content-text"></p>     
          <h4></h4></td>     
          <td><button class="removefaliujsagm"><span class="fa fa-minus"></span></button></td>     
          <td><button class="editfaliujsagm" ><span class="fas fa-pen"></span></button></td>     
        
      </tr>`
        );
       
        this.adat = adat;
        this.elem = $(".post-content:last");
        this.titleElem = $(".post-title:last");
        this.detailElem = $(".details:last");
        this.titleElem.find("h3").text(this.adat.cim); 
        this.elem.find("p").text(this.adat.tartalom);
        this.elem.find("h4").text(this.adat.mikor);
        this.options = this.getMeretek(this.elem.find("p"));

        this.elem.find(".removefaliujsagm").on("click", () => {
            
            ajax.ajaxApiDelete(this.api,this.adat.faliu_azonosito);
            this.kattintasTrigger("torolf");
        });
        
        this.elem.find(".editfaliujsagm").on("click", () => {
         
            this.elem.find("p").html(`
            <textarea class="post-content-text-input">${this.adat.tartalom}</textarea>
            <div class="post-content-buttons">
            <button class="edit-faliujsagm fas fa-check"></button>
            <button class="cancel-faliujsagm fas fa-times"></button>
            </div>`);

            this.cancelFaliujsagMod = this.elem.find(".cancel-faliujsagm");
            this.editFaliujsagMod = this.elem.find(".edit-faliujsagm");
            this.elem.find(".removefaliujsagm").parent().hide();
            this.elem.find(".editfaliujsagm").parent().hide()
            this.titleElem.find("h3").html(`<input type="text" class="post-content-text-input2" value="${this.adat.cim}" >`); 

            let ujinput = this.elem.find(".post-content-text-input");
            
            ujinput.css("width",this.options.width);
            ujinput.css("height",this.options.height);  
            ujinput.closest(".post-content").addClass("post-content-nobuttons");
           
            this.cancelFaliujsagMod.on("click",()=>{
                this.elem.removeClass("post-content-nobuttons");
                this.elem.find(".removefaliujsagm").parent().show();
                this.elem.find(".editfaliujsagm").parent().show();
                this.elem.find("p").text(this.adat.tartalom);
                this.titleElem.find("h3").text(this.adat.cim); 
            });

            this.editFaliujsagMod.on("click",()=>{
                let text = this.elem.find(".post-content-text-input").val();
                let title = this.titleElem.find(".post-content-text-input2").val();
                this.adat.tartalom = text;
                this.adat.cim = title;
                this.kattintasTrigger("modositf");
            });
             
            
        });

        
        this.elem.hide();

        this.detailElem.on("click",()=>{
            this.elemKattintas();
        });
    }

    put(){
        this.ajax.ajaxApiPut(this.api, this.adat.faliu_azonosito, this.adat);
    }
  

    getMeretek(fieldId){
        let meretek = {width:0,height:0}; 
        let szel= $(fieldId).width();
        let hossz = $(fieldId).height();
        meretek.width = szel;
        meretek.height = hossz 
        return meretek;
    }   

    elemKattintas(){
        if(this.clickcounter==0){
            this.elem.slideDown(500);
            this.clickcounter=1;
        }
        else{
            this.elem.slideUp(500);
            this.clickcounter=0;
        }
    }

    kattintasTrigger(gomb) {
        let esemeny = new CustomEvent(gomb, { detail: this });
        window.dispatchEvent(esemeny);
    }
}

class NapiMin {
    constructor(szulo, adat, datum) {
        this.szulo = szulo;
        this.adat = adat;
        this.muszak = [];
        this.munkakor = [];
        this.datum = datum;
        this.szulo.append(
            `<div class='napiMin'>
      <h2>datum</h2>
      <table class='tablaLatszik'>
      <tr></tr>
      </table>
    </div>`
        );

        this.tabla = this.szulo.children(".napiMin:last");
        this.tabla.children("h2").html(this.datum);
        this.tablaAdat = this.tabla.children("table").children("tbody");

    
    }
    
}

class Alkalmazott extends Adminelemek {
    constructor(szulo, adat, ajax) {
        super(szulo, adat, ajax);
        this.api = "/api/alkalmazott";
        this.apivegpont = "/api/alkalmazottak";
    }
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.adat.dolgozoi_azon);
    }
    put() {
        this.ajax.ajaxApiPut(this.api, this.adat.dolgozoi_azon, this.adat);
    }
}
class FaliujsagPost extends Adminelemek {
    constructor(szulo, adat, ajax) {
        super(szulo, adat, ajax);
        this.api = "/api/faliujsag";
        this.apivegpont = "/api/faliujsagok";
  
    }
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.adat.faliu_azonosito);
    }
    put() {
        this.ajax.ajaxApiPut(this.api, this.adat.faliu_azonosito, this.adat);
    }
   
}
class MunkakorA extends Adminelemek {
    constructor(szulo, adat, ajax) {
        super(szulo, adat, ajax);
        this.api = "/api/munkakor";
        this.apivegpont = "/api/munkakorok";
    }
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.adat.megnevezes);
    }
    put() {
        this.ajax.ajaxApiPut(this.api, this.adat.megnevezes, this.adat);
    }
}
class Bejelentkezes extends Adminelemek {
    constructor(szulo, adat, ajax) {
        super(szulo, adat, ajax);
        this.api = "/api/bejelentkezesiadat";
        this.apivegpont = "/api/bejelentkezesiadatok";
    }
    put() {
        this.ajax.ajaxApiPut(this.api, this.adat.tipus, this.adat);
    }
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.adat.user_login);
    }
}
class Muszaktipus extends Adminelemek {
    constructor(szulo, adat, ajax) {
        super(szulo, adat, ajax);
        this.api = "/api/muszaktipus";
        this.apivegpont = "/api/muszaktipusok";
    }
    put() {
        this.ajax.ajaxApiPut(this.api, this.adat.tipus, this.adat);
    }
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.adat.tipus);
    }
}

class Napimunkaeroigeny extends Adminelemek {
    //Route::put('/api/napimunkaeroigeny/{napim_azonosito}', [NapiMunkaeroIgenyController::class, 'update']);
    //Route::post('/api/napimunkaeroigeny', [NapiMunkaeroIgenyController::class, 'store']);
    constructor(szulo, adat, ajax) {
       
        super(szulo, adat, ajax);
        this.api = "/api/napimunkaeroigeny";
        this.apivegpont = "/api/napimunkaeroigenyek";
        this.id = `${this.adat.napim_azonosito}`;
      
    }
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.id);
    }
    put() {
        this.ajax.ajaxApiPut(this.api, this.id, this.adat);
    }
}
class Napok extends Adminelemek {
    constructor(szulo, adat, ajax) {
        super(szulo, adat, ajax);
        this.api = "/api/napok";
        this.apivegpont = "/api/napokossz";
        this.id = this.adat.nap;
    }
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.id);
    }
}
class Beosztas extends Adminelemek {
    constructor(szulo, adat, ajax) {
        super(szulo, adat, ajax);
        this.api = "/api/beosztas";
        this.apivegpont = "/api/beosztasok";
        this.id =this.adat.beo_azonosito;
    }
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.id);
    }
    put() {
        this.ajax.ajaxApiPut(this.api, this.id, this.adat);
    }
}
class Szabadsag extends Adminelemek {
    
    constructor(szulo, adat, ajax) {
        super(szulo, adat, ajax);
        this.api = "/api/szabadsag";
        this.apivegpont = "/api/szabadsagok";
        this.id = `${this.adat.szabadsag_azonosito}/`;
    }
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.id);
    }
    put() {
        this.ajax.ajaxApiPut(this.api, this.id, this.adat);
    }
}
class Nemdolgozna extends Adminelemek {
    constructor(szulo, adat, ajax) {
        super(szulo, adat, ajax);
        this.api = "/api/nemdolgozna";
        this.apivegpont = "/api/nemdolgoznaossz";
        this.id = this.adat.nemdolgozna_azon;
        
    }
    
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.id);
    }
    put() {
        this.ajax.ajaxApiPut(this.api, this.id, this.adat);
    }

    
}
