// 1. Hamburger Toggle.

$(".fa-bars").on("click", function(e) {
  $(".icons").slideToggle()
  e.preventDefault()
})


$(document).ready(function() {
  // 2. Check to see if the window is top if not then display button

  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 100) {
      $(".scrolltop").fadeIn()
    } else {
      $(".scrolltop").fadeOut()
    }
  })

  // 3. Click event to scroll to top

  $(".scrolltop").on("click", function(e) {
    $("html, body").animate({
      scrollTop: 0,
    }, 800)
    e.preventDefault()
  })

  // 4. Scroll to content JS

  $(".bumps").on("click", function(e) {
    $("html, body").animate({
      scrollTop: $(".section-1").offset().top,
    }, 800)
    e.preventDefault()
  })

  $(".out").on("click", function(e) {
    $("html, body").animate({
      scrollTop: $(".section-3").offset().top,
    }, 800)
    e.preventDefault()
  })

  $(".day").on("click", function(e) {
    $("html, body").animate({
      scrollTop: $(".section-4").offset().top,
    }, 800)
    e.preventDefault()
  })

  $(".scroll-down").on("click", function(e) {
    $("html, body").animate({
      scrollTop: $(".section-1").offset().top,
    }, 800)
    e.preventDefault()
  })
})
