$(function(){
  
 $(".darkmode-user").on("click",function(){
  $("html").toggleClass(" dark-mode");
  $('body').toggleClass("dark-mode-container");
  $('.dropdown-content').toggleClass("dark-mode");
  $('.dropdown-content2').toggleClass("dark-mode-container");
  $(".dropbtn aside").toggleClass("dark-mode-icons");
  $(".dropbtn2").toggleClass("dark-mode-container");
  $(".dropbtn2").toggleClass("dark-mode-a");
  $(".dropbtn").toggleClass("dark-mode-container");
  $(".dropbtn").toggleClass("dark-mode-icons");
  $(".dropbtn section").toggleClass("dark-mode-section");
  $("header a").toggleClass("dark-mode-a");
  $("header h3").toggleClass("dark-mode-icons");
  $(".post").toggleClass("dark-mode");
  $(".openbtn").toggleClass("dark-mode-icons");
  $(".sidenav").toggleClass("dark-mode-container");
  $(".post-info").toggleClass("dark-mode");
  $(".info").toggleClass("dark-mode-container");
})


  $(".btn").on("click",myFunction);
  function myFunction() {
   
    $('.login').toggleClass("dark-mode");
    $('.container').toggleClass("dark-mode-container");
    $('.icons').toggleClass("dark-mode-icons");
    $('.label').toggleClass("dark-mode-labels");
    $('a').toggleClass("dark-mode-footer");
    $('a').toggleClass("dark-mode-links");
    $('.inputs .field input').toggleClass("dark-mode-inputs");
    $(".rememberme label").toggleClass("dark-mode-ck-label");

    
 }
});



