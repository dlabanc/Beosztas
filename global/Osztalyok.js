class Adminelemek{
  constructor(szulo,adat){
  
    this.node = szulo;
    szulo.append("<tr></tr>");
    this.elem = this.node.children("tr:last");
    this.adat = adat;
    this.adatMegjelenit();
    
    this.elem.on("click",() => {
      this.kattintastrigger()
    });
    
  }

  kattintastrigger() {
    let esemeny = new CustomEvent("kivalaszt", { detail: this });
    window.dispatchEvent(esemeny);
    console.log(esemeny); 
  }

  adatMegjelenit(){
    
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
  
  
      this.node.on("click",()=>{
        this.KattintasTrigger();
      })
  
      this.node.on("mouseenter",()=>{
        this.belepTrigger();
      })
  
      this.node.on("mouseleave",()=>{
        this.kilepTrigger();
      })
  
      this.node.on("contextmenu",()=>{
        this.jobbklikkTrigger();
      })
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
class Munkakor{
    constructor(node, adat){
        this.node=node;
        this.adat=adat;
        this.munkakorMegnevezes=this.node.children(".cimsor").children("h3");
        this.munkakorKezdBetu=this.node.children(".cimsor").children(".circle").children("h2");
        this.munkakorLeiras=this.node.children("p");
        this.setAdat(this.adat);
    }

    setAdat(adat){
        this.adat=adat;
        this.munkakorMegnevezes.text(adat.megnevezes);
        this.munkakorKezdBetu.text(adat.megnevezes.substring(0,1).toUpperCase());
        this.munkakorLeiras.text(adat.leiras);
    }

    kattintasTrigger(gomb) {
        let esemeny = new CustomEvent(gomb, {
            detail: this.adat
        });
        window.dispatchEvent(esemeny);
    }
}
class Muszak{
    constructor(node, adat){
        this.node=node;
        this.adat=adat;
        this.muszakTipus=this.node.children("h2");
        this.muszakLeiras=this.node.children("p");
        this.setAdat(this.adat);
    }

    setAdat(adat){
        this.adat=adat;
        this.muszakTipus.text(adat.tipus);
        this.muszakLeiras.text(adat.leiras);
    }
}
class Alkalmazott extends Adminelemek{
  constructor(szulo,adat){
    super(szulo,adat);
  }
  adatMegjelenit(){
    
    for (const key in this.adat) {
      
      this.elem.append(`<td>${this.adat[key]}</td>`);
      
    }
    if(!(this.adat.hasOwnProperty('munkaviszony_vége')))
    {
      this.elem.append('<td> - </td>');
    }
    this.elem.append(`<td><button class="fas fa-ban"></button></td>`);
    this.elem.append(`<td><button class="fas fa-user-edit"></button></td>`);
  }
}
class FaliujsagPost extends Adminelemek{


}
class MunkakorA extends Adminelemek{
}
class Bejelentkezes extends Adminelemek{
 
}
class Muszaktipus extends Adminelemek{
}
class Napimunkaeroigeny extends Adminelemek{}
class Napok extends Adminelemek{}
class Beosztas extends Adminelemek{}
class Szabadsag extends Adminelemek{}
class Nemdolgozna extends Adminelemek{}