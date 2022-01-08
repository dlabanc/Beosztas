$(function () {
  const napok= [];
  const muszakok = {
    "1. Műszak": "6:00-8:00",
    "2. Műszak": "8:00-10:00",
    "3. Műszak": "10:00-12:00",
    "4. Műszak": "12:00-14:00",
    "5. Műszak": "14:00-16:00",
    "6. Műszak": "16:00-18:00",
    "7. Műszak": "18:00-20:00",
    "8. Műszak": "20:00-22:00",
  };

  
  napEsemenyek();
  napMuszakok();
  DatumBeallitas();
  maiNap();
 

  function DatumBeallitas() {
    d = new Date();
    let day = d.getDay();
    let diff = d.getDate() - day + (day == 0 ? -6 : 1);
    let zaroDate = String(d.getFullYear()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, 0) + "." + String(diff + 6).padStart(2, "0");
    let kezdoDate = String(d.getFullYear()).padStart(2, "0") +"." +String(d.getMonth() + 1).padStart(2, "0") +"." +String(diff).padStart(2, "0");
    for (const nap of napok) {
      nap.date = String(d.getFullYear()).padStart(2, "0") +"." +String(d.getMonth() + 1).padStart(2, "0") +"." +String(diff+nap.napId).padStart(2, "0");
    }
    console.log(napok);
    $("#datum").append("Jelenlegi hét:<br>"+kezdoDate + "  -  " + zaroDate);
    
  }

  function napMuszakok() {
    for (let index = 0; index < napok.length; index++) {
      for (const muszak in napok[index].muszakok) {
        $(".lapoz").eq(index).append('<div class="muszakSzam">' + muszak + "<br/>" + muszakok[muszak] + "</div>");
      }
    }
    $(".muszakSzam").on("click", ({currentTarget})=>{$(currentTarget).toggleClass("kijeloltNemErekRa")});
    
  }

  function napEsemenyek() {
   
    for (let index = 0; index < $("#napok div").length; index++) {
      napok.push({"napId":index,"név":$("#napok div").eq(index).attr("id"),"muszakok":muszakok});
      let id1 = "#" + $("#napok div").eq(index).attr("id").toLowerCase();
      let id2 = "#" + $("#napok div").eq(index).attr("id");
 
    }
    
    $("#option").on("change", function (e) {
      
      let ertek = $( "#option option:selected" ).val();
      ertek = ertek.replace(ertek.charAt(0),ertek.charAt(0).toUpperCase());
      let aktnap = napok.find(nap => nap.név == ertek);
      $(".aktdatum").html("Kiválaszott nap:<br>"+aktnap.date);
      console.log("a");
      $("#option option").css("background-color", "transparent");
     
      $("#option option:selected").css("background-color", "rgb(24, 206, 167, 0.7)");
       openPage("#"+ertek);
      
    
    });
   

  }
  
  function maiNap(){
    let d = new Date();
    let napp = String(d.getFullYear()).padStart(2, "0") +"." +String(d.getMonth() + 1).padStart(2, "0") +"." +String(d.getDate()).padStart(2, "0");
    let aktnap = napok.find(nap => nap.date == napp);
    openPage("#"+aktnap.név);
    $("#"+aktnap.név.toLowerCase()).css("background-color", "rgb(24, 206, 167, 0.7)");
    $(".aktdatum").html("Kiválaszott nap: <br>"+aktnap.date);
  } 

  function openPage(pageName) {
    for (let i = 0; i < $(".lapoz").length; i++) {
      $(".lapoz").css("display", "none");
    }
    $(pageName).css("display", "flex");
  }

});
