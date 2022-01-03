$(function () {
  //mindenmas
  let s = 0;
  $(".darkmode-user").on("click", function () {
    megjelenites();
    $("html").toggleClass("dark-mode");
    $("body").toggleClass("dark-mode-container");
    $(".dropdown-content1").toggleClass("dark-mode");
    $(".dropdown-content2").toggleClass("dark-mode-container");
    $(".dropdown-content3").toggleClass("dark-mode");
    $(".dropdown-content4").toggleClass("dark-mode");
    $(".dropbtn1 aside").toggleClass("dark-mode-icons");
    $(".dropbtn2").toggleClass("dark-mode-container");
    $(".dropbtn2").toggleClass("dark-mode-a");
    $(".dropbtn3").toggleClass("dark-mode-container");
    $(".dropbtn3").toggleClass("dark-mode-a");
    $(".dropbtn4").toggleClass("dark-mode-container");
    $(".dropbtn4").toggleClass("dark-mode-a");
    $(".dropbtn1").toggleClass("dark-mode-container");
    $(".dropbtn1").toggleClass("dark-mode-icons");
    $(".dropbtn1 section").toggleClass("dark-mode-section");
    $("header a").toggleClass("dark-mode-a");
    $("header h3").toggleClass("dark-mode-icons");
    $(".post").toggleClass("dark-mode");
    $(".openbtn").toggleClass("dark-mode-icons");
    $(".sidenav").toggleClass("dark-mode-container");
    $(".post-info").toggleClass("dark-mode");
    $(".info").toggleClass("dark-mode-container");
    $(".tabcontent").toggleClass("dark-mode-white");
    $(".password-window").toggleClass("dark-mode");
    $(".password-window-bg").toggleClass("dark-mode-password");
    $(".password-window-bg input").toggleClass("dark-mode-inputs");
    $(".password-buttons button").toggleClass("dark-mode-buttons");
  });

  function megjelenites() {
    $("html").hasClass("dark-mode") ? 
    $(".darkmode-user").text("Sötét mód") :  $(".darkmode-user").text("Világos mód");
  }

  //login
  $(".btn").on("click", myFunction);
  function myFunction() {
    $(".login").toggleClass("dark-mode");
    $(".container").toggleClass("dark-mode-container");
    $(".icons").toggleClass("dark-mode-icons");
    $(".label").toggleClass("dark-mode-labels");
    $("a").toggleClass("dark-mode-footer");
    $("a").toggleClass("dark-mode-links");
    $(".inputs .field input").toggleClass("dark-mode-inputs");
    $(".rememberme label").toggleClass("dark-mode-ck-label");
  }
});
