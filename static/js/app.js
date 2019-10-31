$(document).ready(function() {
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 100) {
      $('.scrolltop').fadeIn()
    } else {
      $('.scrolltop').fadeOut()
    }
  })

  setTimeout(() => {
    $('.scrolltop').on('click', function(e) {
      $('html, body').animate(
        {
          scrollTop: 0
        },
        800
      )
      e.preventDefault()
    })

    $('.scroll-down').on('click', function(e) {
      $('html, body').animate(
        {
          scrollTop: $('.section-3').offset().top
        },
        800
      )
      e.preventDefault()
    })
  }, 2000)
})
