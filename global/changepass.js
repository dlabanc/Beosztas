$(function () {
  
  $(".passchange").on("click", () => {
    $(".password-window").css("visibility", "visible");
    $(".container").css("visibility", "hidden");
    $("#myDropdown").toggleClass("show");
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
});
