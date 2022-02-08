$(function(){

  sideNav();
  changePage();
  changePass();
  compactMode();
  postAll();
  dropDownMenus();



  const options = {
    bottom: '64px', // default: '32px'
    right: 'unset', // default: '32px'
    left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#F0F2F5',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }
  
  const darkmode = new Darkmode(options);
  darkmode.showWidget();
 

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
      $(".password-window").slideDown(1000);
      
     
    });
    $(".passwordOk").on("click", function () {
     
      $(".password-window").slideUp(1000);

    });
    $(".passwordNo").on("click", function () {
      $(".password-window").slideUp(1000);
      
      $(".password-notification").slideUp(1000);
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
  
        $(".password-notification").slideUp(1000);
      } else {
        $(".password-notification").slideDown(1000);
  
        $(btn).attr("disabled", true);
      }
    });
  }
  
  function compactMode(){
    $(".btn").on("click",function(){
      megjelenites();
      $("*").toggleClass("compact-mode");
      function megjelenites() {
        $("html").hasClass("compact-mode") ? 
        $(".btn").text("Kompakt mód") :  $(".btn").text("Normál mód");
      }
    });
    
    $(".darkmode-user").on("click",function(){
      megjelenites();
      $("*").toggleClass("compact-mode");
      function megjelenites() {
        $("html").hasClass("compact-mode") ? 
        $(".darkmode-user span").text("Kompakt mód") :  $(".darkmode-user span").text("Normál mód");
      }
    });
    
  }
  
 
  
  function postAll(){
    $(".closeinfo").on("click",  postClose);
   
    postCloseIfVisible();
  
  
    function postClose() {
      $(".post-info").css("visibility", "hidden");
      $("article").css("opacity", "1");
    }
    function postCloseIfVisible(){
     $(document.body).click(function(e) {
        if($('.closeinfo').is(':visible') && e.target.matches('header,footer,body,article,aside,div'))
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


