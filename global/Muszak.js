class Muszak{
    constructor(node, adat){
        this.node=node;
        this.adat=adat;
        this.muszakTipus=this.node.children(".muszaktipush-content").children("h3");
        this.muszakLeiras=this.node.children(".muszaktipush-content").children("p");
        this.setAdat(this.adat);
    }

    setAdat(adat){
        this.adat=adat;
        this.muszakTipus.text(adat.tipus);
        this.muszakLeiras.text(adat.leiras);
    }
}