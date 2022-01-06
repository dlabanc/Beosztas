$(function () {
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
});
