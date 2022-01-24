$(function(){

  sideNav();
  changePage();
  changePass();
  compactMode();
  postAll();
  dropDownMenus();
  darkMode();
  function sideNav(){
    let width = 0;
    $(".openbtn").on("click", function () {
    $("#mySidenav").css("width", width ? closeNav : openNav);
    });
    $(".closebtn").on("click", closeNav);
    $("#mySidenav a").on("click", closeNav);
    $(document).click(function (e) {
      if (!$(e.target).is("a, ul, span, button")) {
        closeNav();
      }
    });
    function openNav() {
      document.getElementById("mySidenav").style.width = "300px";
      document.getElementById("mySidenav").style.visibility = "visible";
  
    }
  
    function closeNav() {
      if(document.getElementById("mySidenav")){
      document.getElementById("mySidenav").style.width = "0px";
      document.getElementById("mySidenav").style.visibility = "hidden";

    }
     
    }
  }
  
  function changePage(){
     
  
    for (let index = 0; index < $("article .tabcontent").length; index++) {
      let elem = $("article .tabcontent").eq(index);
      let id2 = "#"+elem.attr("id");
      let id1 = id2.toLowerCase();
      esemenyek(id1,id2);   
    }
  
    function esemenyek(id1,id2){
        $(id1).on("click",function(){
            openPage(id2);
        });
    }
  
    function openPage(pageName) {
        
        for (let i = 0; i <$(".tabcontent").length; i++) {
            $(".tabcontent").css("display","none");
        }
        $(pageName).fadeIn(1000);
        $(pageName).css("visibility","visible");
        $(".posts").fadeOut(500,function(){
              $("aside").css("display","none");
              $(".container").css("grid-template-columns","1fr");
              
        });
  
        $(".container").css("opacity","1");
      
    }
  }
  
  function changePass(){
      
    $(".passchange").on("click", () => {
      $(".password-window").css("visibility", "visible");
      $(".container").css("visibility", "hidden");
     
    });
    $(".passwordOk").on("click", function () {
      $(".password-window").css("visibility", "hidden");
      $(".container").css("visibility", "visible");
    });
    $(".passwordNo").on("click", function () {
      $(".password-window").css("visibility", "hidden");
      $(".container").css("visibility", "visible");
      $(".password-notification").css("visibility", "hidden");
      $("#pass-first").val("");
      $("#pass-second").val("");
      
    });
  
    window.onkeyup = (function () {
      let passfirst = $("#pass-first").val();
      let passsecond = $("#pass-second").val();
      let btn = $(".passwordOk");
      if (
        passfirst == passsecond 
       
      ) {
        btn.removeAttr("disabled");
  
        $(".password-notification").css("visibility", "hidden");
      } else {
        $(".password-notification").css("visibility", "visible");
  
        $(btn).attr("disabled", true);
      }
    });
  }
  
  function compactMode(){
    $(".compactmode").on("click",function(){
      megjelenites();
      $("*").toggleClass("compact-mode");
    
    });
    function megjelenites() {
      $("html").hasClass("compact-mode") ? 
      $(".compactmode").text("Kompakt mód") :  $(".compactmode").text("Normál mód");
    }
  }
  
  function darkMode(){
    const darkmode = new Darkmode();
    $(".btn").on("click", ()=>{darkmode.toggle()});
  
    $(".darkmode-user").on("click", ()=>{darkmode.toggle()});
  
    function megjelenites() {
      $("html").hasClass("darkmode--activated") ? 
      $(".darkmode-user").text("Sötét mód") :  $(".darkmode-user").text("Világos mód");
    }
  }
  
  function postAll(){
    $(".closeinfo").on("click",  postClose);
    $(".post").on("click", function (event) {postOpen(event);});
    postCloseIfVisible();
  
    function postOpen(event) {
      let adat = event.currentTarget.children;
      console.log(adat);
      $(".post-info").css("visibility", "visible");
     
      $(".post-info")
        .children(".post-info-user-data")
        .children("p")
        .html(adat[2].childNodes[0].data);
      $(".post-info")
        .children(".post-img")
        .children("img")
        .attr("src", adat[1].currentSrc);
      $(".post-info")
        .children(".post-info-user-data")
        .children("h3")
        .html(adat[0].childNodes[0].data);
    }
  
    function postClose() {
      $(".post-info").css("visibility", "hidden");
      $("article").css("opacity", "1");
    }
    function postCloseIfVisible(){
     $(document.body).click(function(e) {
        if($('.closeinfo').is(':visible') && e.target.matches('header,footer,body,article,aside'))
        {   
            postClose();
        }
     })
    }
  }

  function dropDownMenus(){
     
  $(".dropbtn3").on("click", dropDownMenu3);
  $(".dropbtn4").on("click", dropDownMenu4);



  function dropDownMenu3() {
    $("#myDropdown3").toggleClass("show");
    dropDownOpen(3);
  }

  function dropDownMenu4() {
    $("#myDropdown4").toggleClass("show");
    dropDownOpen(4);
  }
 
  function dropDownOpen(id){
    window.onclick = function (event) {
      if (!event.target.matches(".dropbtn"+id)) {
        let dropdowns = $(".dropdown-content"+id);
        let i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
  }
  }
});


