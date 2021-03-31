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

  $(window).scroll(function(){
    var toTop = $(".about__list").offset().top + (-350)
    var toTop1 = $("#advantage").offset().top + (-350)
    var toTop2 = $("#brands").offset().top + (-350)
    var toTop3 = $(".advantage__row").offset().top + (-450)
    var toTop4 = $(".bottom-block").offset().top + (-400)
    if( $(window).scrollTop() > toTop ){
      $('.about-list__item').each(function(index, value) {
        curHeight = 0;
        autoHeight = $(this).height(),
        $(this).addClass('animate')
      });
    }
    if( $(window).scrollTop() > toTop1 ){
        $('.advantage__list li').each(function(index, value) {
          curHeight = 0;
          autoHeight = $(this).height(),
          $(this).addClass('animate')
        });
      }
      if( $(window).scrollTop() > toTop2 ){
        $('.brands__row .col').each(function(index, value) {
          curHeight = 0;
          autoHeight = $(this).height(),
          $(this).addClass('animate')
        });
      }
      if( $(window).scrollTop() > toTop3 ){
        $('.advantage__col').each(function(index, value) {
          curHeight = 0;
          autoHeight = $(this).height(),
          $(this).addClass('animate')
        });
      }
      if( $(window).scrollTop() > toTop4 ){
        $('.bottom-block form').addClass('animate');
      }
  });

  $('a.btn.step1').on('click', function(){
    $('.step1').css({'display':'none'});
    $('.step2').css({'display':'block'});
    $('.btn.step2').css({'display':'flex'});
    $('.step-1').removeClass('active');
    $('.step-2').addClass('active');
    return false;
  });
  $('a.btn.step2').on('click', function(){
    $('.step2').css({'display':'none'});
    $('.step3').css({'display':'block'});
    $('.btn.step3').css({'display':'flex'});
    $('.step-2').removeClass('active');
    $('.step-3').addClass('active');
    return false;
  });
  $('a.back.step2').on('click', function(){
    $('.step2').css({'display':'none'});
    $('.step1').css({'display':'block'});
    $('.btn.step1').css({'display':'flex'});
    $('.step-2').removeClass('active');
    $('.step-1').addClass('active');
    return false;
  });
  $('a.btn.step3').on('click', function(){
    $('.step3').css({'display':'none'});
    $('.step4').css({'display':'block'});
    $('.btn.step4').css({'display':'flex'});
    $('.step-3').removeClass('active');
    $('.step-4').addClass('active');
    return false;
  })
  $('a.back.step3').on('click', function(){
    $('.step3').css({'display':'none'});
    $('.step2').css({'display':'block'});
    $('.btn.step2').css({'display':'flex'});
    $('.step-3').removeClass('active');
    $('.step-2').addClass('active');
    return false;
  });
  $('a.back.step4').on('click', function(){
    $('.step4').css({'display':'none'});
    $('.step3').css({'display':'block'});
    $('.btn.step3').css({'display':'flex'});
    $('.step-4').removeClass('active');
    $('.step-3').addClass('active');
    return false;
  });
});