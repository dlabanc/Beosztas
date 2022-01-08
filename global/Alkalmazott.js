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
