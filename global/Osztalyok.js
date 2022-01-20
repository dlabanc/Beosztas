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
  constructor(node, adat) {
    this.node = node;
    this.adat = adat;
    this.nev = this.node.children("#nev");
    this.beosztas = this.node.children("#beosztas");
    this.lakcim = this.node.children("#lakcim");
    this.elerhetoseg = this.node.children("#elerhetoseg");
    this.email = this.node.children("#email");
    this.setAdatok(this.adat);

    this.node.on("click", () => {
      this.KattintasTrigger();
    });

    this.node.on("mouseenter", () => {
      this.belepTrigger();
    });

    this.node.on("mouseleave", () => {
      this.kilepTrigger();
    });

    this.node.on("contextmenu", () => {
      this.jobbklikkTrigger();
    });
  }

  setAdatok(adat) {
    this.adat = adat;
    this.nev.text(adat.nev);
    this.beosztas.text(adat.beosztas);
    this.lakcim.text(adat.lakcim);
    this.elerhetoseg.text(adat.elerhetoseg);
    this.email.text(adat.email);
  }

  KattintasTrigger() {
    let esemeny = new CustomEvent("balklikk", { detail: this });
    window.dispatchEvent(esemeny); //azért kell, hogy a script.js-ben lássuk
  }

  belepTrigger() {
    let esemeny = new CustomEvent("belep", { detail: this });
    window.dispatchEvent(esemeny); //azért kell, hogy a script.js-ben lássuk
  }

  kilepTrigger() {
    let esemeny = new CustomEvent("kilep", { detail: this });
    window.dispatchEvent(esemeny); //azért kell, hogy a script.js-ben lássuk
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
    this.elem=$(".circle:last");
    this.elem.children("h2").text(this.adat.megnevezés.substring(0, 1).toUpperCase());
    this.szulo.children(".munkakor-content:last").children(".cimsor").children("h3").text(this.adat.megnevezés);
    this.szulo.children(".munkakor-content:last").children("p").text(this.adat.leírás);
    
  }
}

class MuszakHozzaAdas{
  constructor(szulo, adat){
    this.szulo = szulo;
    szulo.append(
      `<div class="muszaktipush-content">
      <h2>Műszak típusa</h2><p>Műszaktípus leírása</p>
      <button id="removemuszak">-</button>
      <button id="editmuszak" ><span class="fas fa-pen"></span></button>
      </div>`
    );
    this.adat = adat;
    this.elem=$(".muszaktipush-content:last");
    this.elem.children("h2").text(this.adat.típus);
    this.elem.children("p").text(this.adat.leírás);
    this.elem.children("#removemuszak").on("click",()=>{
      this.kattintasTrigger("torol");
    });
    this.elem.children("#editmuszak").on("click",()=>{
      this.kattintasTrigger("modosit");
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
    this.napokTarolo = this.elem.children(".mtc-inline-grid").children(".aktualisnapok");
    this.elem.find(".send").on("click",()=>{
      this.kattintastrigger();
    });
    this.elem.find(".delete").on("click",()=>{
      this.torles();
    });
  }
    torles(){
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
