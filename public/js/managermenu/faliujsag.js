$(function () {
    let vegpont = "../json/faliujsag.json";
    const ajax = new Ajax();
    ajax.ajaxGet(vegpont, faliujsagBeallitas);

    function faliujsagBeallitas(muszakok) {
        const szuloElem = $(".faliujsag-container");
        muszakok.forEach((elem) => {
            
            new Faliujsag(szuloElem, elem);
        });
        ajax.ajaxGet(
            "https://randomuser.me/api/?results=" + muszakok.length,
            (kepek, i) => {
                kepek.results.map((ember, index) => {
                    $(".post-content").eq(index).find("img").attr("src",(ember.picture.large));
                });
            }
        );
        $(window).on("modositf", (event) => {
            console.log(event.detail.azonosito);
        });

        $(window).on("torolf", (event) => {
            console.log(event.detail.azonosito);
        });
    }
});
