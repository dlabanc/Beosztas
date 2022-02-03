$(function(){
    const ajax = new Ajax();
    const local = "../json/";
    const apivegpont = 'http://localhost:8000/api';
    const faliujsagok = [];
    ajax.ajaxApiGet(apivegpont+"/faliujsagok",faliujsagUser);
    

    
    
    //ajaxApiGet - Működik
    function faliujsagUser(adatok){
    //Faliujsag posztok//
        class Post{
            constructor(szulo,adat,kep,alkalmazottAdatok){
                this.szulo = szulo;
                this.kep = kep;
                if(adat != undefined){
                this.szulo.append(`<div class="post"><h3></h3></div>`);
                this.adat = adat;
                this.elem = szulo.find(".post:last");
                this.alkalmazottAdatok = alkalmazottAdatok;
                this.elem.find("h3").text(this.adat.cim);
                
                this.elem.on("click",(e)=>{
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
                 this.postElem.find(".post-img img").attr("src",this.kep);
                 this.postElem.find("section").html(`${this.alkalmazottAdatok.nev}<br>${this.alkalmazottAdatok.munkakor}`);
                });
                }
               
            }
            
            
        }

        
        const postinfoTomb = [];
        adatok.forEach((adat)=>{
            
            ajax.ajaxApiGet(apivegpont+"/alkalmazott/"+adat.dolgozoi_azon,(a)=>{
                postinfoTomb.push(a);
                const szulo = $(".posts-container");
                let faliujsagPost = new Faliujsag(szulo,adat);
                faliujsagPost.elem.find("button").remove();
                if(postinfoTomb.length==adatok.length){
                    const szulo = $(".posts");
                    ajax.ajaxGet(
                        "https://randomuser.me/api/?results=" + adatok.length,
                        (kepek) => {
                            
                            kepek.results.map((ember, index) => {
                                
                                if(index<5){
                                    const element = adatok[index];
                                    let kep = ember.picture.large;
                                    let post = new Post(szulo,element,kep,postinfoTomb[index]);
                                    
                                    console.log(post);
                                }
                                $(".post-content").eq(index).find("img").attr("src",(ember.picture.large));
                               
                            });
                        }
                    );
                }
            });
            
            
        });
        
    
    }
})