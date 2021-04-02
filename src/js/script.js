// const ready = require('./utils/documentReady.js');

// ready(function(){
//   console.log('DOM героически построен!');
// });

 const { css } = require('jquery');
const $ = require('jquery');

 /*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(factory) {
  "function" == typeof define && define.amd ? define([ "jquery" ], factory) : factory("object" == typeof exports ? require("jquery") : jQuery);
}(function($) {
  var caretTimeoutId, ua = navigator.userAgent, iPhone = /iphone/i.test(ua), chrome = /chrome/i.test(ua), android = /android/i.test(ua);
  $.mask = {
      definitions: {
          "9": "[0-9]",
          a: "[A-Za-z]",
          "*": "[A-Za-z0-9]"
      },
      autoclear: !0,
      dataName: "rawMaskFn",
      placeholder: "_"
  }, $.fn.extend({
      caret: function(begin, end) {
          var range;
          if (0 !== this.length && !this.is(":hidden")) return "number" == typeof begin ? (end = "number" == typeof end ? end : begin, 
          this.each(function() {
              this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(), 
              range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), 
              range.select());
          })) : (this[0].setSelectionRange ? (begin = this[0].selectionStart, end = this[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
          begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length), 
          {
              begin: begin,
              end: end
          });
      },
      unmask: function() {
          return this.trigger("unmask");
      },
      mask: function(mask, settings) {
          var input, defs, tests, partialPosition, firstNonMaskPos, lastRequiredNonMaskPos, len, oldVal;
          if (!mask && this.length > 0) {
              input = $(this[0]);
              var fn = input.data($.mask.dataName);
              return fn ? fn() : void 0;
          }
          return settings = $.extend({
              autoclear: $.mask.autoclear,
              placeholder: $.mask.placeholder,
              completed: null
          }, settings), defs = $.mask.definitions, tests = [], partialPosition = len = mask.length, 
          firstNonMaskPos = null, $.each(mask.split(""), function(i, c) {
              "?" == c ? (len--, partialPosition = i) : defs[c] ? (tests.push(new RegExp(defs[c])), 
              null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1), partialPosition > i && (lastRequiredNonMaskPos = tests.length - 1)) : tests.push(null);
          }), this.trigger("unmask").each(function() {
              function tryFireCompleted() {
                  if (settings.completed) {
                      for (var i = firstNonMaskPos; lastRequiredNonMaskPos >= i; i++) if (tests[i] && buffer[i] === getPlaceholder(i)) return;
                      settings.completed.call(input);
                  }
              }
              function getPlaceholder(i) {
                  return settings.placeholder.charAt(i < settings.placeholder.length ? i : 0);
              }
              function seekNext(pos) {
                  for (;++pos < len && !tests[pos]; ) ;
                  return pos;
              }
              function seekPrev(pos) {
                  for (;--pos >= 0 && !tests[pos]; ) ;
                  return pos;
              }
              function shiftL(begin, end) {
                  var i, j;
                  if (!(0 > begin)) {
                      for (i = begin, j = seekNext(end); len > i; i++) if (tests[i]) {
                          if (!(len > j && tests[i].test(buffer[j]))) break;
                          buffer[i] = buffer[j], buffer[j] = getPlaceholder(j), j = seekNext(j);
                      }
                      writeBuffer(), input.caret(Math.max(firstNonMaskPos, begin));
                  }
              }
              function shiftR(pos) {
                  var i, c, j, t;
                  for (i = pos, c = getPlaceholder(pos); len > i; i++) if (tests[i]) {
                      if (j = seekNext(i), t = buffer[i], buffer[i] = c, !(len > j && tests[j].test(t))) break;
                      c = t;
                  }
              }
              function androidInputEvent() {
                  var curVal = input.val(), pos = input.caret();
                  if (oldVal && oldVal.length && oldVal.length > curVal.length) {
                      for (checkVal(!0); pos.begin > 0 && !tests[pos.begin - 1]; ) pos.begin--;
                      if (0 === pos.begin) for (;pos.begin < firstNonMaskPos && !tests[pos.begin]; ) pos.begin++;
                      input.caret(pos.begin, pos.begin);
                  } else {
                      for (checkVal(!0); pos.begin < len && !tests[pos.begin]; ) pos.begin++;
                      input.caret(pos.begin, pos.begin);
                  }
                  tryFireCompleted();
              }
              function blurEvent() {
                  checkVal(), input.val() != focusText && input.change();
              }
              function keydownEvent(e) {
                  if (!input.prop("readonly")) {
                      var pos, begin, end, k = e.which || e.keyCode;
                      oldVal = input.val(), 8 === k || 46 === k || iPhone && 127 === k ? (pos = input.caret(), 
                      begin = pos.begin, end = pos.end, end - begin === 0 && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1), 
                      end = 46 === k ? seekNext(end) : end), clearBuffer(begin, end), shiftL(begin, end - 1), 
                      e.preventDefault()) : 13 === k ? blurEvent.call(this, e) : 27 === k && (input.val(focusText), 
                      input.caret(0, checkVal()), e.preventDefault());
                  }
              }
              function keypressEvent(e) {
                  if (!input.prop("readonly")) {
                      var p, c, next, k = e.which || e.keyCode, pos = input.caret();
                      if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {
                          if (pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end), shiftL(pos.begin, pos.end - 1)), 
                          p = seekNext(pos.begin - 1), len > p && (c = String.fromCharCode(k), tests[p].test(c))) {
                              if (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), android) {
                                  var proxy = function() {
                                      $.proxy($.fn.caret, input, next)();
                                  };
                                  setTimeout(proxy, 0);
                              } else input.caret(next);
                              pos.begin <= lastRequiredNonMaskPos && tryFireCompleted();
                          }
                          e.preventDefault();
                      }
                  }
              }
              function clearBuffer(start, end) {
                  var i;
                  for (i = start; end > i && len > i; i++) tests[i] && (buffer[i] = getPlaceholder(i));
              }
              function writeBuffer() {
                  input.val(buffer.join(""));
              }
              function checkVal(allow) {
                  var i, c, pos, test = input.val(), lastMatch = -1;
                  for (i = 0, pos = 0; len > i; i++) if (tests[i]) {
                      for (buffer[i] = getPlaceholder(i); pos++ < test.length; ) if (c = test.charAt(pos - 1), 
                      tests[i].test(c)) {
                          buffer[i] = c, lastMatch = i;
                          break;
                      }
                      if (pos > test.length) {
                          clearBuffer(i + 1, len);
                          break;
                      }
                  } else buffer[i] === test.charAt(pos) && pos++, partialPosition > i && (lastMatch = i);
                  return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val() && input.val(""), 
                  clearBuffer(0, len)) : writeBuffer() : (writeBuffer(), input.val(input.val().substring(0, lastMatch + 1))), 
                  partialPosition ? i : firstNonMaskPos;
              }
              var input = $(this), buffer = $.map(mask.split(""), function(c, i) {
                  return "?" != c ? defs[c] ? getPlaceholder(i) : c : void 0;
              }), defaultBuffer = buffer.join(""), focusText = input.val();
              input.data($.mask.dataName, function() {
                  return $.map(buffer, function(c, i) {
                      return tests[i] && c != getPlaceholder(i) ? c : null;
                  }).join("");
              }), input.one("unmask", function() {
                  input.off(".mask").removeData($.mask.dataName);
              }).on("focus.mask", function() {
                  if (!input.prop("readonly")) {
                      clearTimeout(caretTimeoutId);
                      var pos;
                      focusText = input.val(), pos = checkVal(), caretTimeoutId = setTimeout(function() {
                          input.get(0) === document.activeElement && (writeBuffer(), pos == mask.replace("?", "").length ? input.caret(0, pos) : input.caret(pos));
                      }, 10);
                  }
              }).on("blur.mask", blurEvent).on("keydown.mask", keydownEvent).on("keypress.mask", keypressEvent).on("input.mask paste.mask", function() {
                  input.prop("readonly") || setTimeout(function() {
                      var pos = checkVal(!0);
                      input.caret(pos), tryFireCompleted();
                  }, 0);
              }), chrome && android && input.off("input.mask").on("input.mask", androidInputEvent), 
              checkVal();
          });
      }
  });
});
 $( document ).ready(function() {


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
  $('.step-1').on('click', function(){
    $(this).addClass('active');
    $('.step-2, .step-3, .step-4').removeClass('active');
    $('.step1').css({'display':'block'});
    $('.btn.step1').css({'display':'flex'});
    $('.step2, .step3, .step4').css({'display':'none'});
  });
  $('.step-2').on('click', function(){
    $(this).addClass('active');
    $('.step-1, .step-3, .step-4').removeClass('active');
    $('.step2').css({'display':'block'});
    $('.btn.step2').css({'display':'flex'});
    $('.step1, .step3, .step4').css({'display':'none'});
  });
  $('.step-3').on('click', function(){
    $(this).addClass('active');
    $('.step-2, .step-1, .step-4').removeClass('active');
    $('.step3').css({'display':'block'});
    $('.btn.step3').css({'display':'flex'});
    $('.step2, .step1, .step4').css({'display':'none'});
  });
  $('.step-4').on('click', function(){
    $(this).addClass('active');
    $('.step-2, .step-3, .step-1').removeClass('active');
    $('.step4').css({'display':'block'});
    $('.btn.step4').css({'display':'flex'});
    $('.step2, .step3, .step1').css({'display':'none'});
    
  });
  $("input[type=tel]").mask("+7(999) 999-99-99");

  $(".form").submit(function () { // ID формы
		var formID = $(this).attr('id');
		var formNm = $('#' + formID);
		$.ajax({
			type: "POST",
			url: 'send.php',// адрес обработчика
			data: formNm.serialize(),
			success: function (data) {
				$(formNm).html(data);
			},
			error: function (jqXHR, text, error) {
				$(formNm).html(error);
			}
		}); return false;
	});
  $(".form-calc").submit(function () { // ID формы
		var formID = $(this).attr('id');
		var formNm = $('#' + formID);
		$.ajax({
			type: "POST",
			url: 'send-calc.php',// адрес обработчика
			data: formNm.serialize(),
			success: function (data) {
				$(formNm).html(data);
			},
			error: function (jqXHR, text, error) {
				$(formNm).html(error);
			}
		}); return false;
	});
  $(".form-1").submit(function () { // ID формы
		var formID = $(this).attr('id');
		var formNm = $('#' + formID);
		$.ajax({
			type: "POST",
			url: 'send-calc.php',// адрес обработчика
			data: formNm.serialize(),
			success: function (data) {
				$(formNm).html(data);
			},
			error: function (jqXHR, text, error) {
				$(formNm).html(error);
			}
		}); return false;
	});
});

