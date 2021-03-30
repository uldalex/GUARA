// const ready = require('./utils/documentReady.js');

// ready(function(){
//   console.log('DOM героически построен!');
// });

 const { css } = require('jquery');
const $ = require('jquery');

 
 $( document ).ready(function() {
      // параллакс 
function parallaxTop(){
    var scrolled = $(window).scrollTop();
    var iconRotate = $('.icon-rotate img');
    maxScroll = $(document).height()-$(window).height();
    $('.parallax').css('margin-top', +(scrolled * 0.2) + 'px');
    $('.parallax1').css('margin-top', +(scrolled * 0.4) + 'px');
    $('.parallax1--1').css('margin-top', +(scrolled * 0.33) + 'px');
    $('.parallax2').css('margin-bottom', +(scrolled * 0.5) + 'px');
    $('.parallax3').css('margin-top', +(scrolled * 0.4) + 'px');
    $('.parallax4').css('margin-top', +(scrolled * 0.2) + 'px');
    $('.parallax5').css('margin-top', +(scrolled * 0.2) + 'px');
    $('.parallax6').css('margin-top', +(scrolled * 0.4) + 'px');
    $('.parallax6--1').css('margin-top', +(scrolled * 0.36) + 'px');
    $('.parallax7').css('margin-top', +(scrolled * 0.3) + 'px');
         	
}

$(window).scroll(function(e){
	parallaxTop();
  })

  // плавная прокрутка к якорю
$page = $('html, body');
$('a.main-nav__link[href*="#"]').click(function () {
  $page.animate({
    scrollTop: $($.attr(this, 'href'))
      .offset()
      .top
  }, 600);
});

$(window).scroll(function() {
    if ($(".page-header").length) {
       let sticky = $(".page-header")[0].offsetTop;
       let open = 300;
       if (window.pageYOffset > 300) {
         $(".page-header").addClass("page-header--open");
 
       }
       else if (window.pageYOffset > 100) {
         $(".page-header").addClass("page-header--fixed");
 
       } else {
         $(".page-header").removeClass("page-header--fixed");
         $(".page-header").removeClass("page-header--open");
  
       }
    }
  });

  // Activate progress animation on scroll
  $('svg.radial-progress').each(function( index, value ) { 
    // If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
    if ( 
        $(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
        $(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
    ) {
        // Get percentage of progress
        percent = $(value).data('percentage');
        // Get radius of the svg's circle.complete
        radius = $(this).find($('circle.complete')).attr('r');
        // Get circumference (2πr)
        circumference = 2 * Math.PI * radius;
        // Get stroke-dashoffset value based on the percentage of the circumference
        strokeDashOffset = circumference - ((percent * circumference) / 100);
        // Transition progress for 1.25 seconds
        $(this).find($('circle.complete')).animate({'stroke-dashoffset': strokeDashOffset}, 1250);
    }
});
});