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
});