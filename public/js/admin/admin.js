$(function () {
    const token = $('meta[name="csrf-token"]').attr("content");
    console.log(token);
    const ajax = new Ajax(token);
    const local = "../json/";
    const apivegpont = "http://localhost:8000/api";
   
    ajaxHivasok();

    $(document).ajaxStop(function () {
        $(".loading").fadeOut(1000, () => {});
        
        
    });
  
    
    $(".Alkalmazottak").closest(".tabcontent").prepend(`<input type="text" placeholder="Keresés..." class="search">`);
        $( ".search" ).keyup(function(e) {
            let ertek = $(this).val();
            console.log(ertek);        
            ajax.ajaxApiGet(apivegpont + "/alkalmazott/search?q="+ertek, alkalmazottAdmin);
    });

    infoAblak();

    function alkalmazottAdmin(eredmeny) {
        beallitasok(eredmeny, ".Alkalmazottak", Alkalmazott);
    }
    function faliujsagAdmin(eredmeny) {
        beallitasok(eredmeny, ".Faliujsag", FaliujsagPost);
    }
    function munkakorAdmin(eredmeny) {
        beallitasok(eredmeny, ".Munkakorok", MunkakorA);
    }
    function bejelenetkezesekAdmin(eredmeny) {
        beallitasok(eredmeny, ".Bejelentkezési-adatok", Bejelentkezes);
    }
    function muszakTipusAdmin(eredmeny) {
        beallitasok(eredmeny, ".Muszaktipus", Muszaktipus);
    }
    function napiMunkaEroIgenyAdmin(eredmeny) {
        beallitasok(eredmeny, ".Napimunkaeroigeny", Napimunkaeroigeny);
    }
    function napokAdmin(eredmeny) {
        beallitasok(eredmeny, ".Napok", Napok);
    }
    function beosztasAdmin(eredmeny) {
        beallitasok(eredmeny, ".Beosztas", Beosztas);
    }
    function nemdolgoznaAdmin(eredmeny) {
        beallitasok(eredmeny, ".Nemdolgozna", Nemdolgozna);
    }
    function szabadsagAdmin(eredmeny) {
        beallitasok(eredmeny, ".Szabadsag", Szabadsag);
    }

    function beallitasok(eredmeny, szulo, osztaly) {
        
        const SZULO = $(szulo);
        const fejlec = SZULO.find(".fejlec").clone();
        SZULO.empty(); 
        
        let fej = "";
        let i = 0;
        for (const key in eredmeny[0]) {
            kulcs = key.replace("_", " ");
            fej += `<td>${kulcs}</td>`;
            i++;
        }
        fej += `<td></td><td></td>`;
        SZULO.prepend(fejlec);
        $(`${szulo} .fejlec`).html(fej);
        eredmeny.forEach((e, index) => {
            let objektum = new osztaly(SZULO, e, ajax);
      
        });
        
    }

    function infoAblak() {
        ajax.ajaxApiGet(apivegpont + "/alkalmazottak", (adatok) => {
            $(".stat1value").html(`${adatok.length}`);
        });
        ajax.ajaxApiGet(apivegpont + "/alkalmazottak", (adatok) => {
           
            $(".stat2value").html(`${adatok[adatok.length - 1].nev}`);
        });
        ajax.ajaxGet(local + "bejelentkezesi_adatok.json", (adatok) => {
            $(".stat4value").html(`${adatok.length}`);
        });
        ajax.ajaxApiGet(apivegpont + "/faliujsagok", (adatok) => {
            let d = new Date();
            let db = 0;
            let nap =
                String(d.getFullYear()) +
                "-" +
                String(d.getMonth() + 1).padStart(2, "0") +
                "-" +
                String(d.getDate()).padStart(2, "0");
         
            adatok.forEach((a) => {
                if (a.mikor === nap) {
                    db++;
                }
            });
            $(".stat3value").html(`${db}`);
        });
    }

    //Modosit
  
    $(window).on("Mentes", ({ detail }) => {
        for (const key in detail.adat) {
            let ertek = detail.clone.find(`.${key}`).val();
            if(ertek=="null"){ertek=""}
            detail.adat[key] = ertek;
            
        }
        
        detail.put();
        detail.node.find("tr").remove();
        
        if (detail instanceof Alkalmazott) {
          ajax.ajaxApiGet(detail.apivegpont, alkalmazottAdmin);
      } else if (detail instanceof Muszaktipus) {
          ajax.ajaxApiGet(detail.apivegpont, muszakTipusAdmin);
      } else if (detail instanceof MunkakorA) {
          ajax.ajaxApiGet(detail.apivegpont, munkakorAdmin);
      } else if (detail instanceof Bejelentkezes) {
      } else if (detail instanceof FaliujsagPost) {
          ajax.ajaxApiGet(detail.apivegpont, faliujsagAdmin);
      } else if (detail instanceof Napimunkaeroigeny) {
          ajax.ajaxApiGet(detail.apivegpont, napiMunkaEroIgenyAdmin);
      } else if (detail instanceof Napok) {
          ajax.ajaxApiGet(detail.apivegpont, napokAdmin);
      } else if (detail instanceof Beosztas) {
          ajax.ajaxApiGet(detail.apivegpont, beosztasAdmin);
      } else if (detail instanceof Nemdolgozna) {
          ajax.ajaxApiGet(detail.apivegpont, nemdolgoznaAdmin);
      } else if (detail instanceof Szabadsag) {
          ajax.ajaxApiGet(detail.apivegpont, szabadsagAdmin);
      }
    });
    //Torles
   
    $(window).on("torles", ({ detail }) => {
        
        detail.delete();
        detail.node.find("tr").remove();
        delete detail;
       

        if (detail instanceof Alkalmazott) {
            ajax.ajaxApiGet(detail.apivegpont, alkalmazottAdmin);
        } else if (detail instanceof Muszaktipus) {
            ajax.ajaxApiGet(detail.apivegpont, muszakTipusAdmin);
        } else if (detail instanceof MunkakorA) {
            ajax.ajaxApiGet(detail.apivegpont, munkakorAdmin);
        } else if (detail instanceof Bejelentkezes) {
        } else if (detail instanceof FaliujsagPost) {
            ajax.ajaxApiGet(detail.apivegpont, faliujsagAdmin);
        } else if (detail instanceof Napimunkaeroigeny) {
            ajax.ajaxApiGet(detail.apivegpont, napiMunkaEroIgenyAdmin);
        } else if (detail instanceof Napok) {
            ajax.ajaxApiGet(detail.apivegpont, napokAdmin);
        } else if (detail instanceof Beosztas) {
            ajax.ajaxApiGet(detail.apivegpont, beosztasAdmin);
        } else if (detail instanceof Nemdolgozna) {
            ajax.ajaxApiGet(detail.apivegpont, nemdolgoznaAdmin);
        } else if (detail instanceof Szabadsag) {
            ajax.ajaxApiGet(detail.apivegpont, szabadsagAdmin);
        }
        
    });

    function ajaxHivasok() {
        ajax.ajaxApiGet(apivegpont + "/alkalmazottak", alkalmazottAdmin);
        ajax.ajaxApiGet(apivegpont + "/faliujsagok", faliujsagAdmin);
        ajax.ajaxApiGet(apivegpont + "/munkakorok", munkakorAdmin);
        ajax.ajaxGet(
            local + "bejelentkezesi_adatok.json",
            bejelenetkezesekAdmin
        );
        ajax.ajaxApiGet(apivegpont + "/muszaktipusok", muszakTipusAdmin);
        ajax.ajaxApiGet(
            apivegpont + "/napimunkaeroigenyek",
            napiMunkaEroIgenyAdmin
        );
        ajax.ajaxApiGet(apivegpont + "/napokossz", napokAdmin);
        ajax.ajaxApiGet(apivegpont + "/beosztasok", beosztasAdmin);
        ajax.ajaxApiGet(apivegpont + "/nemdolgoznaossz", nemdolgoznaAdmin);
        ajax.ajaxApiGet(apivegpont + "/szabadsagok", szabadsagAdmin);
    }
});
