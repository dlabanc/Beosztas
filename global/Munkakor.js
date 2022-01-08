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