$(function () {
  let vegpont = "../json/napiMin.json";
  const ajax = new Ajax();
  ajax.ajaxGet("../json/napok.json", ujHivas);
  napokTomb = [];

  function ujHivas(napok) {
    napokTomb.push(napok);
    ajax.ajaxGet(vegpont, napiMinBeallitas);
  }

  function napiMinBeallitas(napiMin) {
    const szuloElem = $("#Napimunka");
    for (let index = 0; index < napokTomb[0].length; index++) {
      new NapiMin(szuloElem, napiMin, napokTomb[0][index].nap);
    }
  }

  
});
