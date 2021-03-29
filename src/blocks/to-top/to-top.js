/* global document window performance requestAnimationFrame */

const ready = require('../../js/utils/documentReady.js');
const $ = require('jquery');
ready(function(){

  var progressPath = document.querySelector('.to-top-wrap path');
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
  }
  updateProgress();
  $(window).scroll(updateProgress);	
  var offset = 50;
  var duration = 550;
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > offset) {
      $('.to-top-wrap').addClass('active-progress');
    } else {
      $('.to-top-wrap').removeClass('active-progress');
    }
  });				
  $('.to-top-wrap').on('click', function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, duration);
    return false;
  })
  
  
});



