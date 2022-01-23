class Adminelemek {
  constructor(szulo, adat) {
    this.node = szulo;
    szulo.append("<tr></tr>");
    this.elem = this.node.children("tr:last");
    this.adat = adat;
    this.adatMegjelenit();

    this.elem.on("click", () => {
      this.kattintastrigger();
    });
  }

  kattintastrigger() {
    let esemeny = new CustomEvent("kivalaszt", { detail: this });
    window.dispatchEvent(esemeny);
    console.log(esemeny);
  }

  adatMegjelenit() {
    for (const key in this.adat) {
      this.elem.append(`<td>${this.adat[key]}</td>`);
    }

    this.elem.append(`<td><button class="fas fa-ban"></button></td>`);
    this.elem.append(`<td><button class="fas fa-edit"></button></td>`);
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
    this.elem.children("#nev").text(this.adat.név);
    this.elem.children("#beosztas").text(this.adat.munkakör);
    this.elem.children("#lakcim").text(this.adat.lakcím);
    this.elem.children("#elerhetoseg").text(this.adat.Elérhetőség);
    this.elem.children("#email").text(this.adat.Email);
    this.menu =  "#Alkalmazottak .dropdown-content";
    
    this.elem.on("contextmenu", (e) => {
      this.jobbklikkTrigger();
      document.addEventListener('contextmenu', event => event.preventDefault());
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
      .text(this.adat.megnevezés.substring(0, 1).toUpperCase());
    this.szulo
      .children(".munkakor-content:last")
      .children(".cimsor")
      .children("h3")
      .text(this.adat.megnevezés);
    this.szulo
      .children(".munkakor-content:last")
      .children("p")
      .text(this.adat.leírás);
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
    this.elem.children("h3").text(this.adat.műszaktipus);
    this.tabla = this.elem.children("table");

    for (const key in this.adat.műszakok) {
      this.tabla.append("<tr></tr>");
      this.tablaElem = this.tabla.children("tbody").children("tr:last");
      this.tablaElem.append(
        "<td>" + this.adat.műszakok[key].műszakszám + "</td>"
      );
      this.tablaElem.append("<td>" + this.adat.műszakok[key].órától + "</td>");
      this.tablaElem.append("<td>" + this.adat.műszakok[key].óráig + "</td>");
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
      <h2>Műszak típusa</h2><p>Műszaktípus leírása</p>
      <button id="removemuszak"><span class="fa fa-minus"></span></button>
      <button id="editmuszak" ><span class="fas fa-pen"></span></button>
      </div>`
    );
    this.adat = adat;
    this.elem = $(".muszaktipush-content:last");
    this.elem.children("h2").text(this.adat.típus);
    this.elem.children("p").text(this.adat.leírás);
    this.elem.children("#removemuszakh").on("click", () => {
      this.kattintasTrigger("torolh");
    });
    this.elem.children("#editmuszakh").on("click", () => {
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
    this.elem.children("div").children("p").text(this.adat.leírás);
    this.elem.children("div").children("h2").text(this.adat.típus);
    this.napokTarolo = this.elem
      .children(".mtc-inline-grid")
      .children(".aktualisnapok");
    this.elem.find(".send").on("click", () => {
      this.kattintastrigger();
    });
    this.elem.find(".delete").on("click", () => {
      this.torles();
    });
  }
  torles() {
    let esemeny = new CustomEvent("Torles", { detail: this });
    window.dispatchEvent(esemeny);
  }
  kattintastrigger() {
    let esemeny = new CustomEvent("Hozzarendeles", { detail: this });
    window.dispatchEvent(esemeny);
  }
}

class Alkalmazott extends Adminelemek {
  constructor(szulo, adat) {
    super(szulo, adat);
  }
  adatMegjelenit() {
    for (const key in this.adat) {
      this.elem.append(`<td>${this.adat[key]}</td>`);
    }
    if (!this.adat.hasOwnProperty("munkaviszony_vége")) {
      this.elem.append("<td> - </td>");
    }
    this.elem.append(`<td><button class="fas fa-ban"></button></td>`);
    this.elem.append(`<td><button class="fas fa-user-edit"></button></td>`);
  }
}
class FaliujsagPost extends Adminelemek {}
class MunkakorA extends Adminelemek {}
class Bejelentkezes extends Adminelemek {}
class Muszaktipus extends Adminelemek {}
class Napimunkaeroigeny extends Adminelemek {}
class Napok extends Adminelemek {}
class Beosztas extends Adminelemek {}
class Szabadsag extends Adminelemek {}
class Nemdolgozna extends Adminelemek {}
