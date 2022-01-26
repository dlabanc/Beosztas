$(function () {
    const { ajaxGet } = new Ajax();
    const localhost = "/statisztikak/";
    const statisztikaElem = document.getElementById("Man-statisztika-elem");
    let data, chart, options;

    oszlop();
    statisztikaEsemenyek();

    function oszlop() {
        ajaxGet(localhost + "munkakorDb.json", (adatok) => {
            googleChartsKonyvtar("corechart", drawChart);

            function drawChart() {
                
                data = new google.visualization.DataTable();
                chart = new google.visualization.ColumnChart(statisztikaElem);

                data.addColumn("string", "munkakör");
                data.addColumn("number", "db");

                for (const iterator of adatok) {
                    data.addRows([[iterator.munkakör, iterator.db]]);
                }
                options = statisztikaBeallitasok("Munkakörök", 1500, 500);
                chart.draw(data, options);
            }
        });
    }
    
    function kor() {
        ajaxGet(localhost + "hetioraszamDb.json", (adatok) => {
            googleChartsKonyvtar("corechart", drawChart);

            function drawChart() {
                
                 data = new google.visualization.DataTable();
                 chart = new google.visualization.PieChart(statisztikaElem);

                data.addColumn("string", "heti óraszám");
                data.addColumn("number", "db");

                for (const iterator of adatok) {
                    data.addRows([
                        [
                            iterator.heti_óraszám.toString() + " óra",
                            iterator.db,
                        ],
                    ]);
                }
                options = statisztikaBeallitasok("Heti Óraszám", 1500, 500);
                chart.draw(data, options);
            }
        });
    }
    
    function timeLine() {
        ajaxGet(localhost + "szabadsagon.json", (adatok) => {
            googleChartsKonyvtar("timeline", drawChart);

            function drawChart() {
                
                chart = new google.visualization.Timeline(statisztikaElem);
                data = new google.visualization.DataTable();

                data.addColumn({ type: "string", id: "Név" });
                data.addColumn({ type: "date", id: "Kezdete" });
                data.addColumn({ type: "date", id: "Vége" });
                for (const iterator of adatok) {
                    data.addRows([
                        [
                            iterator.név,
                            new Date(iterator.SZABADSAG[0].tól),
                            new Date(iterator.SZABADSAG[0].ig),
                        ],
                    ]);
                }
                chart.draw(data);
            }
        });
    }

    function googleChartsKonyvtar(csomag, metodus) {
        google.charts.load("current", { packages: [csomag] });
        google.charts.setOnLoadCallback(metodus);
    }

    function statisztikaBeallitasok(title, szelesseg, magassag) {
        let darkmode = $("body").hasClass("darkmode--activated");

        let options = {
            title: title,
            width: szelesseg,
            height: magassag,
            colors: ["#4dbba6"],
            backgroundColor: "transparent",
            bar: { groupWidth: "20%" },
        };

        if(darkmode){
            options.hAxis = {textStyle:{color:"#FFFFFF",titleTextStyle: {color: '#FFFFFF'}}};
            options.vAxis = {textStyle:{color:"#FFFFFF",titleTextStyle: {color: '#FFFFFF'}}};
            options.legend = {textStyle:{color:"#FFFFFF",titleTextStyle: {color: '#FFFFFF'}}};
            
        };
       
        return options;
    }

    function statisztikaEsemenyek() {
        const elemek = [
            { elem: "#pie", metodus: kor },
            { elem: "#stream", metodus: timeLine },
            { elem: "#bar", metodus: oszlop },
        ];
        elemek.forEach(({ elem, metodus }) => {
            statisztikaValt(elem, metodus);
        });
        function statisztikaValt(ID, diagram) {
            $(`${ID.toString()}`).on("click", (e) => {
                $(statisztikaElem).effect("clip", "2000", () => {
                    diagram();
                    $(statisztikaElem).fadeIn("slow");
                });
            });
        }
    }
});
