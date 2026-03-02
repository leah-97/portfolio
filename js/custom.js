$(function () {
  let timer;

  function slide() {
    if ($(window).width() <= 600) {
      $(".curtainSlide")
        .stop()
        .animate({ top: "-100%" }, 2000, function () {
          $(".curtainSlide").append($(".curtainSlide li").first());
          $(".curtainSlide").css({ top: 0 });
        });
    } else {
      $(".curtainSlide")
        .stop()
        .animate({ left: "-100%" }, 2000, function () {
          $(".curtainSlide").append($(".curtainSlide li").first());
          $(".curtainSlide").css({ left: 0 });
        });
    }
  }
  function startSlide() {
    timer = setInterval(slide, 3000);
  }

  function stopSlide() {
    clearInterval(timer);
  }

  startSlide();

  $(".curtain")
    .on("mouseenter", function () {
      stopSlide();
    })
    .on("mouseleave", function () {
      startSlide();
    });

  let chageIndex = 0;
  const changeImg = $(".change img");
  const imgCount = changeImg.length;

  changeImg.hide().eq(0).show();

  function change() {
    changeImg.eq(chageIndex).stop().fadeOut(2000);
    chageIndex = (chageIndex + 1) % imgCount;
    changeImg.eq(chageIndex).stop().fadeIn(2000);
  }

  setInterval(change, 3000);
});
