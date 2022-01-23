$(function () {
  const { ajaxGet } = new Ajax();
  const localhost = "../managermenu/statisztikak/";
  const statisztikaElem = document.getElementById("Man-statisztika-elem");
    oszlop();
    statisztikaEsemenyek();



  function oszlop() {
    ajaxGet(localhost + "munkakorDb.json", (adatok) => {
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);
      
      function drawChart() {
        let elem = statisztikaElem;
        let data = new google.visualization.DataTable();
        let chart = new google.visualization.ColumnChart(elem);

        data.addColumn("string", "munkakör");
        data.addColumn("number", "db");

        for (const iterator of adatok) {
          data.addRows([[iterator.munkakör, iterator.db]]);
        }
        var options = {
          title: "Munkakörök",
          width: 1500,
          height: 500,
          colors: ["#4dbba6"],
          backgroundColor: "transparent",
          bar: { groupWidth: "20%" },
        };
        chart.draw(data, options);
      }
    });
  }
  function kor() {
    ajaxGet(localhost + "hetioraszamDb.json", (adatok) => {
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);
      
      
      function drawChart() {
        let elem = statisztikaElem;
        let data = new google.visualization.DataTable();
        let chart = new google.visualization.PieChart(elem);

        data.addColumn("string", "heti óraszám");
        data.addColumn("number", "db");

        for (const iterator of adatok) {
          data.addRows([
            [iterator.heti_óraszám.toString() + " óra", iterator.db],
          ]);
        }
        var options = {
          title: "Heti Óraszám",
          width: 900,
          height: 500,
          colors: ["#4dbba6"],
          backgroundColor: "transparent",
        };
        chart.draw(data, options);
      }
    });
  }
  function timeLine(){

    ajaxGet(localhost + "szabadsagon.json", (adatok) => {
        console.log(adatok);
        google.charts.load('current', {'packages':['timeline']});
        google.charts.setOnLoadCallback(drawChart);
        
        function drawChart() {
          let elem = statisztikaElem;
          let chart = new google.visualization.Timeline(elem);
          let data = new google.visualization.DataTable();
      
          data.addColumn({ type: 'string', id: 'Név' });
          data.addColumn({ type: 'date', id: 'Kezdete' });
          data.addColumn({ type: 'date', id: 'Vége' });
         
          for (const iterator of adatok) {
            data.addRows([[iterator.név, new Date(iterator.SZABADSAG[0].tól), new Date(iterator.SZABADSAG[0].ig)]]);
          }
          
          chart.draw(data);
        }
      });
  }
  function statisztikaEsemenyek(){  

    $("#pie").on("click", (e) => {
      $(statisztikaElem).effect("clip","2000",()=>{
          kor();
          $(statisztikaElem).fadeIn("slow");
      });
    });
    $("#bar").on("click", () => {
      $(statisztikaElem).effect("clip","2000",()=>{
          oszlop();
          $(statisztikaElem).fadeIn("slow");
      });
    });
    $("#stream").on("click", () => {
      $(statisztikaElem).effect("clip","2000",()=>{
          timeLine();
          $(statisztikaElem).fadeIn("slow");
      });
    });
  }
});
