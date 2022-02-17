class Adminelemek {
    
    constructor(szulo, adat, ajax) {
        this.node = szulo;
        this.ajax = ajax;
        szulo.append("<tr></tr>");
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
        `<tr>
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
            this.elem.after(`<tr class="alkalmazott-sablon">Ez itt egy próba sor</tr>`);
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
        this.api = "http://localhost:8000/api/munkakor";
        this.ajax = ajax;
        this.szulo = szulo;
        szulo.append(
            `<div class="munkakor-content">
      <div class="cimsor">
      <div class="circle"><h2>Munkakör első betűje</h2></div>
      <h3>Munkakör megnevezése</h3>
      </div>
      <p>Munkakör leírása</p>`
        );
        this.adat = adat;
        this.elem = $(".circle:last");
        this.elem
            .children("h2")
            .text(this.adat.megnevezes.substring(0, 1).toUpperCase());
        this.szulo
            .children(".munkakor-content:last")
            .children(".cimsor")
            .children("h3")
            .text(this.adat.megnevezes);
        this.szulo
            .children(".munkakor-content:last")
            .children("p")
            .text(this.adat.leiras);
        this.szulo.find(".munkakor-content:last").prepend('<button class="fas fa-times torles"></button>');   
        this.szulo.find(".torles:last").on("click",()=>{
                 this.munkakorTorles();
        });
    }
    munkakorTorles(){
        let esemeny = new CustomEvent("MunkakorTorles",{detail:this});
        window.dispatchEvent(esemeny);
    }
}

class MuszakEloszlas {
    constructor(szulo, adat) {
        this.szulo = szulo;
        szulo.append(
            `<div class="muszaktipusm-content">
        <h3></h3>  
        <table>
            <tr>
              <th>Műszakszám</th>
              <th>Órától</th>
              <th>Óráig</th>
              <th>Szerkesztés</th>
              <th>Törlés</th>
            </tr>
        </table>
    </div>`
        );
        this.adat = adat;
        this.elem = $(".muszaktipusm-content:last");
        this.elem.children("h3").text(this.adat.muszaktipus);
        this.tabla = this.elem.children("table");

        for (const key in this.adat.muszakok) {
            this.tabla.append("<tr></tr>");
            this.tablaElem = this.tabla.children("tbody").children("tr:last");
            this.tablaElem.append(
                "<td>" + this.adat.muszakok[key].muszakszam + "</td>"
            );
            this.tablaElem.append(
                "<td>" + this.adat.muszakok[key].oratól + "</td>"
            );
            this.tablaElem.append(
                "<td>" + this.adat.muszakok[key].oraig + "</td>"
            );
            this.tablaElem.append(
                '<td><button class="editmuszakm" ><span class="fas fa-pen"></span></button></td>'
            );
            this.tablaElem.append(
                '<td><button class="removemuszakm"><span class="fas fa-minus"></span></button></td>'
            );
        }

        this.elem.children(".removemuszakm").on("click", () => {
            this.kattintasTrigger("torolm");
        });
        this.elem.children(".editmuszakm").on("click", () => {
            this.kattintasTrigger("modositm");
        });
    }

    kattintasTrigger(gomb) {
        let esemeny = new CustomEvent(gomb, {
            detail: this.adat,
        });
        window.dispatchEvent(esemeny);
    }
}

class MuszakHozzaAdas {
    constructor(szulo, adat, ajax) {
        this.click = 1;
        this.api = "http://localhost:8000/api/muszaktipus";
        this.ajax = ajax;
        this.szulo = szulo;
        this.szulo.append(`<tr class="muszak-sorok"></tr>`);
        this.torlesEsemeny = this.torles;
        this.adat = adat;
        this.elem = $(".muszak-sorok:last");
        this.elem.append(`<td>${adat.tipus}</td><td>${adat.leiras}</td>`);
        this.elem.append('<td><button  class="fas fa-trash removemuszak"></button></td>');
        this.elem.append('<td><button  class="fas fa-edit editmuszak"></button></td>');
        this.elem.append('<td class="showmuszak">Részletek</td>');
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
        
        this.reszletekElem.on('click',()=>{
            if(this.click==1) {
                this.click = 0;
                this.details();
                
              }
            else {
                this.click = 1;
                this.reszletek.children("ul").slideUp(500);
            }
        });
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
                ajax.ajaxApiPost("http://localhost:8000/api/muszaktipus",ujMuszak.adat);
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
                this.ajax.ajaxApiPut("http://localhost:8000/api/muszaktipus",muszaktipus,this.adat);
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
        this.ajax.ajaxApiGet("http://localhost:8000/api/muszakeloszlasok",(adatok)=>{
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
                    
                    this.reszletek.children("ul").append(`<li><span>${muszakszam}. műszak:</span> ${oratol}:00 ${oraig}:00</li>`);
                    
                   
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
    constructor(szulo, adat) {
        this.szulo = szulo;
        szulo.append(
        `<li class="post-content">
        <img src="" alt="" />
        <div>
          <h3></h3>              
          <p></p>
          <h4></h4>
          <button id="removefaliujsagm"><span class="fa fa-minus"></span></button>
          <button id="editfaliujsagm" ><span class="fas fa-pen"></span></button>
        </div>
      </li>`
        );
        this.adat = adat;
        this.elem = $(".post-content:last div");
        this.szulo
            .children("div")
            .children("img")
            .attr(
                "src",
                "/pictures/christopher-campbell-rDEOVtE7vOs-unsplash.jpg"
            );
        this.elem.children("h3").text(this.adat.cim);
        this.elem.children("p").text(this.adat.tartalom);
        this.elem.children("h4").text(this.adat.mikor);
        this.elem.children("#removefaliujsagm").on("click", () => {
            this.kattintasTrigger("torolf");
        });

        this.elem.children("#editfaliujsagm").on("click", () => {
            this.kattintasTrigger("modositf");
        });
    }

    kattintasTrigger(gomb) {
        let esemeny = new CustomEvent(gomb, { detail: this.adat });
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
        this.api = "http://localhost:8000/api/alkalmazott";
        this.apivegpont = "http://localhost:8000/api/alkalmazottak";
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
        this.api = "http://localhost:8000/api/faliujsag";
        this.apivegpont = "http://localhost:8000/api/faliujsagok";
  
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
        this.api = "http://localhost:8000/api/munkakor";
        this.apivegpont = "http://localhost:8000/api/munkakorok";
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
        this.api = "http://localhost:8000/api/bejelentkezesiadat";
        this.apivegpont = "http://localhost:8000/api/bejelentkezesiadatok";
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
        this.api = "http://localhost:8000/api/muszaktipus";
        this.apivegpont = "http://localhost:8000/api/muszaktipusok";
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
        this.api = "http://localhost:8000/api/napimunkaeroigeny";
        this.apivegpont = "http://localhost:8000/api/napimunkaeroigenyek";
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
        this.api = "http://localhost:8000/api/napok";
        this.apivegpont = "http://localhost:8000/api/napokossz";
        this.id = this.adat.nap;
    }
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.id);
    }
}
class Beosztas extends Adminelemek {
    constructor(szulo, adat, ajax) {
        super(szulo, adat, ajax);
        this.api = "http://localhost:8000/api/beosztas";
        this.apivegpont = "http://localhost:8000/api/beosztasok";
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
        this.api = "http://localhost:8000/api/szabadsag";
        this.apivegpont = "http://localhost:8000/api/szabadsagok";
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
        this.api = "http://localhost:8000/api/nemdolgozna";
        this.apivegpont = "http://localhost:8000/api/nemdolgoznaossz";
        this.id = this.adat.nemdolgozna_azon;
        
    }
    
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.id);
    }
    put() {
        this.ajax.ajaxApiPut(this.api, this.id, this.adat);
    }

    
}
