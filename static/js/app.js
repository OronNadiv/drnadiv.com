$(document).ready(function() {
  setTimeout(() => {
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
