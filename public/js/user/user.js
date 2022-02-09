$(function () {
    const token = $('meta[name="csrf-token"]').attr("content");
    const ajax = new Ajax(token);
    const apivegpont = "http://localhost:8000/api";
    ajax.ajaxApiGet(apivegpont + "/faliujsagok", faliujsagUser);
   
    newPost();
    ProfilAdatok();
  

  
    function faliujsagUser(adatok) {
        class Post {
            constructor(szulo, adat, kep, alkalmazottAdatok) {
                this.szulo = szulo;
                this.kep = kep;
                if (adat != undefined) {
                    this.szulo.append(`<div class="post"><h3></h3></div>`);
                    this.adat = adat;
                    this.elem = szulo.find(".post:last");
                    this.alkalmazottAdatok = alkalmazottAdatok;
                    this.elem.find("h3").text(this.adat.cim);

                    this.elem.on("click", (e) => {
                        this.postElem = $(".post-info");
                        this.postElem.css("visibility", "visible");
                        this.postElem
                            .children(".post-info-user-data")
                            .children("p")
                            .html(adat.tartalom);

                        this.postElem
                            .children(".post-info-user-data")
                            .find("h3")
                            .html(adat.cim);
                        this.postElem
                            .find(".post-img img")
                            .attr("src", this.kep);
                        this.postElem
                            .find("section")
                            .html(
                                `${this.alkalmazottAdatok.nev}<br>${this.alkalmazottAdatok.munkakor}`
                            );
                    });
                }
            }
        }
        $(".posts-container").empty();
        $(".posts").empty();
        $(".posts").append(`<div> <h1>Faliújság</h1></div>`);
      
        const postinfoTomb = [];
        adatok.forEach((adat) => {
            ajax.ajaxApiGet(
                apivegpont + "/alkalmazott/" + adat.dolgozoi_azon,
                (a) => {
                    postinfoTomb.push(a);
                    const szulo = $(".posts-container");
                    let faliujsagPost = new Faliujsag(szulo, adat);
                    faliujsagPost.elem.find("button").remove();
                    if (postinfoTomb.length == adatok.length) {
                        const szulo = $(".posts");
                        ajax.ajaxGet(
                            "https://randomuser.me/api/?results=" +
                                adatok.length,
                            (kepek) => {
                                kepek.results.map((ember, index) => {
                                    if (index < 5) {
                                        const element = adatok[index];
                                        let kep = ember.picture.large;
                                        $(".profilepic").attr("src", kep);
                                        $(".profilepic").fadeIn(1000);

                                        $("#Profiladatok")
                                            .find("img")
                                            .attr("src", kep);

                                        let post = new Post(
                                            szulo,
                                            element,
                                            kep,
                                            postinfoTomb[index]
                                        );

                                        console.log(post);
                                    }
                                    $(".post-content")
                                        .eq(index)
                                        .find("img")
                                        .attr("src", ember.picture.large);
                                });
                            }
                        );
                    }
                }
            );
        });
        
    }

    function newPost() {
        const apivegpont = "http://localhost:8000/api/faliujsag/";
        const newpostElem = $("#newpost");
        const newpostForm = $("#Faliujsag").find("fieldset");
        const newpostMegse = $("#Faliujsag").find("fieldset").find(".fa-times");
        const newpostOk = $("#Faliujsag").find("fieldset").find(".fa-check");
        newpostElem.on("click", () => {
            newpostForm.effect("slide", "1500");
        });
        newpostMegse.on("click", () => {
            newpostForm.effect("clip", "1500");
        });
        newpostOk.on("click", () => {
            let ma = formatDate(new Date());
            let obj = {
                dolgozoi_azon: 30005,
                mikor: ma,
                cim: $("#newpost-cim").val(),
                tartalom: $("#newpost-tartalom").val(),
            };

            ajax.ajaxApiPost(apivegpont, obj);
            newpostForm.effect("clip", "1500");
            ajax.ajaxApiGet(
                "http://localhost:8000/api/faliujsagok",
                faliujsagUser
            );
        });

        function formatDate(date) {
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            return [year, month, day].join("-");
        }
    }

    function ProfilAdatok() {
        ajax.ajaxApiGet("http://localhost:8000/loggeduser", (adatok)=>{
            console.log(adatok);
        });
        $(".profilepic").hide();
        ajax.ajaxApiGet("http://localhost:8000/api/alkalmazottak", (adatok) => {
            sor = 0;
            $("#Profiladatok").find("h2").text(adatok[0].nev);
            $(".managerinfo-name").text(adatok[0].nev+", "+adatok[0].munkakor);
            for (const [key, value] of Object.entries(adatok[0])) {
                kulcs = key.replace("_", " ");
                
                if (sor < 5) {
                    $("#elso").append(
                        "<tr id=" +
                            sor +
                            "><th>" +
                            kulcs +
                            "</th><td>" +
                            value +
                            "<span class='showButton fa fa-edit'></td></tr>"
                    );
                } else {
                    $("#masodik").append(
                        "<tr id=" +
                            sor +
                            "><th>" +
                            kulcs +
                            "</th><td>" +
                            value +
                            "<span class='showButton fa fa-edit'></td></tr>"
                    );
                }
                sor++;
            }
            $(".tabcontent").eq(0).fadeIn(1000);
            $(".tabcontent").eq(0).css("visibility","visible");
        });
    }
});
