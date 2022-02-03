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
    constructor(szulo, adat) {
        this.szulo = szulo;
        szulo.append(
            `<tr>
          <td id='nev'>Név</td>
          <td id='beosztas'>Beosztás</td>
          <td id='lakcim'>Lakcím</td>
          <td id='elerhetoseg'>Elérhetőség</td>
          <td id='email'>E-mail</td>
        </tr>`
        );

        this.adat = adat;
        this.elem = $("tr:last");
        this.elem.children("#nev").text(this.adat.nev);
        this.elem.children("#beosztas").text(this.adat.munkakor);
        this.elem.children("#lakcim").text(this.adat.lakcim);
        this.elem.children("#elerhetoseg").text(this.adat.Elerhetoseg);
        this.elem.children("#email").text(this.adat.Email);
        this.menu = "#Alkalmazottak .dropdown-content";

        this.elem.on("contextmenu", (e) => {
            this.jobbklikkTrigger();
            document.addEventListener("contextmenu", (event) =>
                event.preventDefault()
            );
            this.x = e.clientX;
            this.y = e.clientY;
            $(this.menu).css("left", this.x);
            $(this.menu).css("top", this.y);
        });
    }

    jobbklikkTrigger() {
        let esemeny = new CustomEvent("jobbklikk", { detail: this });

        window.dispatchEvent(esemeny); //azért kell, hogy a script.js-ben lássuk
    }
}
class Munkakor {
    constructor(szulo, adat) {
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
    constructor(szulo, adat) {
        this.szulo = szulo;
        szulo.append(
            `<div class="muszaktipush-content">
      <div class="muszaktipush-info">
      <h2>Műszak típusa</h2><p>Műszaktípus leírása</p>
      </div>
      <div>
      <button id="removemuszakh"><span class="fa fa-minus"></span></button>
      <button id="editmuszakh" ><span class="fas fa-pen"></span></button>
      </div>
      </div>`
        );
        this.adat = adat;
        this.elem = $(".muszaktipush-content:last");
        this.elem.find(".muszaktipush-info h2").text(this.adat.tipus);
        this.elem.find(".muszaktipush-info p").text(this.adat.leiras);
        this.elem.find("#removemuszakh").on("click", () => {
            this.kattintasTrigger("torolh");
        });
        this.elem.find("#editmuszakh").on("click", () => {
            this.kattintasTrigger("modosith");
        });
    }

    kattintasTrigger(gomb) {
        let esemeny = new CustomEvent(gomb, {
            detail: this.adat,
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
            `<div class="post-content">
        <img src="" alt="" />
        <div>
          <h3></h3>              
          <p></p>
          <h4></h4>
          <button id="removefaliujsagm"><span class="fa fa-minus"></span></button>
          <button id="editfaliujsagm" ><span class="fas fa-pen"></span></button>
        </div>
      </div>`
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
        szulo.append(
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

        for (const elem in adat) {
            if (!this.munkakor.includes(adat[elem].munkakör)) {
                this.munkakor.push(adat[elem].munkakör);
            }
            for (const tombElem in adat[elem]) {
                if (tombElem == "MUSZAKELOSZLAS") {
                    for (const kisAdat in adat[elem][tombElem]) {
                        const tolIg =
                            adat[elem][tombElem][kisAdat].órától +
                            " - " +
                            adat[elem][tombElem][kisAdat].óráig;
                        if (!this.muszak.includes(tolIg))
                            this.muszak.push(tolIg);
                    }
                }
            }
        }

        this.tablaAdat.children("tr:last").append("<td></td>");

        this.muszak.forEach((elem) => {
            this.tablaAdat.children("tr:last").append("<td>" + elem + "</td>");
        });

        this.munkakor.forEach((elem) => {
            this.tablaAdat.append(
                "<tr class='" + elem + "'><td>" + elem + "</td></tr>"
            );
            for (let index = 0; index < this.muszak.length; index++) {
                this.tablaAdat
                    .children("tr:last")
                    .append(
                        "<td class='" +
                            this.muszak[index] +
                            "'><input type='number' min='0'></td>"
                    );
            }
        });

        this.tabla.children("h2").on("click", () => {
            this.tabla.children("table").toggleClass("tablaLatszik");
        });
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
        this.ajax.ajaxApiDelete(this.api, this.adat.azonosito);
    }
    put() {
        this.ajax.ajaxApiPut(this.api, this.adat.azonosito, this.adat);
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
        this.ajax.ajaxApiDelete(this.api, this.adat.tipus);
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
    constructor(szulo, adat, ajax) {
        super(szulo, adat, ajax);
        this.api = "http://localhost:8000/api/napimunkaeroigeny";
        this.apivegpont = "http://localhost:8000/api/napimunkaeroigenyek";
        this.id = `${this.adat.datum}/${this.adat.muszaktipus}/${this.adat.muszakszam}/${this.adat.munkakor}`;
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
        this.id = `${this.adat.datum}/${this.adat.muszaktipus}/${this.adat.muszakszam}/${this.adat.munkakor}/${this.adat.alkalmazott}`;
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
        this.id = `${this.adat.alkalmazott}/${this.adat.tol}/${this.adat.ig}/`;
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
        this.id = `${this.adat.alkalmazott}/${this.adat.datum}/${this.adat.muszaktipus}/${this.adat.muszakszam}/`;
        
    }
    
    delete() {
        this.ajax.ajaxApiDelete(this.api, this.id);
    }
    put() {
        this.ajax.ajaxApiPut(this.api, this.id, this.adat);
    }

    
}
