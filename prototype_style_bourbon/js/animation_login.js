'use strict';
window.addEventListener("DOMContentLoaded", function () {
  const sonne = document.querySelector('.sonne');
  const wolken = document.querySelector('.wolken');
  const wolkeL = document.querySelector('.wolkeL');
  const wolkeR = document.querySelector('.wolkeR');
  const allwolken = [wolkeR, wolkeL];
  const blitzRand = document.querySelectorAll('.blitz1');
  const blitzInner = document.querySelectorAll('.blitz2');
  const blitze = document.querySelector('.blitze');
  const regen = document.querySelector('.regen');
  const tropfen1 = document.querySelector('.tropfen1');
  const tropfen2 = document.querySelector('.tropfen2');
  const tropfen3 = document.querySelector('.tropfen3');
  const tropfen4 = document.querySelector('.tropfen4');
  const tropfen = [tropfen1, tropfen2, tropfen3, tropfen4];

  const svg = document.querySelector('.login-icon-wrapper');
  const form = document.querySelector('.formular');
  const nameI = document.querySelector('.formular__input--name');
  const pw = document.querySelector('.formular__input--pw');
  const b = document.querySelector('.button');
  const button = document.querySelector('.button-wrapper');
  const input = document.querySelectorAll('.formular__input-wrapper');
  const val = document.querySelector('.formular__validation');
  const titleS = document.querySelector('.title-page-title');
  const titelL = document.querySelector('.title-h2');
  const titleRegular = document.querySelector('.title--regular');
  const titleBold = document.querySelector('.title--bold');
  const all = document.querySelector('body');
  const label = document.querySelectorAll('.formular label');

  const tlb = new TimelineMax();
  const tlr = new TimelineMax();
  const tls = new TimelineMax();
  const tlss = new TimelineMax();
  const tlw = new TimelineMax();

  TweenMax.set(sonne, {y: '38px'});

  let errorText = 'Invalid e-mail or password. Please try again.';
  let errorTextempty = 'Fields cannot be empty';
  let count = 0;

  function spanText(text, className) {
    return "<div class='char'>" + text
      .split("")
      .join("<\/div><div class='" + className + "'>") + "<\/div>";
  }

  function addAnchor(el, className, classNameAnchor, txt) {

    el
      .classList
      .add(className);
    const innerDiv = document.createElement('a');
    innerDiv.className = classNameAnchor;
    el
      .appendChild(innerDiv)
      .innerHTML = txt;
  }

  function aniWind() {
    val.innerHTML = 'Forgot your password?';
    addAnchor(val, 'validationPW', 'val-link', 'Request a new password');

    TweenLite.set(".validationPW", {
      opacity: 0,
      display: 'none'
    });
    let text = titleBold.innerHTML;
    let text2 = titleRegular.innerHTML;
    text = text.replace(/ /g, '\u00a0');
    text2 = text2.replace(/ /g, '\u00a0');
    titleBold.innerHTML = spanText(text, 'char');
    titleRegular.innerHTML = spanText(text2, 'char2');

    tls
      .add('twiggle')
      .staggerTo('.char', 0.2, {
        rotation: 360,
        ease: 'easeIn',
        y: -5,
        x: 500,
        opacity: 0
      }, 'twiggle')
      .staggerTo('.char2', 0.1, {
        rotation: 360,
        ease: 'easeIn',
        y: -5,
        x: 500,
        opacity: 0
      }, 'twiggle+=.5')
      .to([
        b, input, titleS, svg
      ], .5, {
        backgroundColor: 'transparent',
        rotation: 360,
        ease: 'easeIn',
        y: -5,
        x: 500,
        opacity: 0
      }, 'twiggle+=.5')
      .to([
        b, input, titleS, titelL, svg
      ], .1, {
        display: 'none'
      }, '+=.8')
      .to(".validationPW", 0.2, {
        display: 'block',
        opacity: 1
      });
    reload('.validationPW');
  }

  function aniRain() {
    tlr
      .add('start')
      .to(sonne, .2, {
        opacity: 0,
        y: '40px'
      }, 'start')
      .to([
        wolkeL, wolkeR
      ], .2, {
        opacity: 0,
        y: '40px'
      }, 'start')
      .fromTo(regen, 0.5, {
        opacity: 0,
        y: '20px'
      }, {
        opacity: 1,
        y: '0px'
      })
      .staggerFrom(tropfen, 0.2, {
        opacity: 0
      }, -0.1)
      .staggerTo(tropfen, 0.1, {
        opacity: 0
      }, -0.1)
      .staggerTo(tropfen, 0.2, {
        opacity: 1
      }, -0.1)
      .staggerTo(tropfen, 0.1, {
        opacity: 0
      }, -0.1)
      .to(regen, 0.2, {
        opacity: 0,
        y: '20px'
      })
      .to(sonne, 0.2, {
        opacity: 1,
        y: '5px'
      })
      .to(wolkeL, .2, {
        opacity: 1,
        y: '10px'
      })
      .to(wolkeR, .1, {
        opacity: 1,
        y: '15px'
      });
  }

  function aniStorm() {
    TweenLite.set([
      regen, sonne, wolkeL, wolkeR
    ], {opacity: 0});
    tlb.add('hideShow');
    tlb.to([
      titleS,
      titelL,
      form,
      val,
      wolkeL,
      wolkeR,
      sonne
    ], 0.1, {
      opacity: 0
    }, 'hideShow').to(all, 0.53, {
      backgroundColor: '#000'
    }, 'hideShow').to([
      titleS, label
    ], 0.1, {
      backgroundColor: 'transparent'
    }, 'hideShow').fromTo([blitze], .2, {
      opacity: 0
    }, {
      opacity: 1
    }, 'hideShow+=0.1').to([blitze], 0.2, {
      opacity: 0
    }, 'hideShow+=0.3').to([blitze], .1, {
      opacity: 1
    }, 'hideShow+=0.4').to([blitze], .2, {
      opacity: 0
    }, 'hideShow+=0.5').fromTo([
      titleS, titelL, form
    ], 0.5, {
      opacity: 1
    }, {
      opacity: 0
    }, 'hideShow+=0.3').to(all, 0.1, {
      backgroundColor: '#000'
    }, 'hideShow+=0.4').to(all, 0.3, {
      backgroundColor: '#fff'
    }, 'hideShow+=0.5').to(all, 0.1, {
      backgroundColor: '#000'
    }, 'hideShow+=0.6').to(all, 0.1, {
      backgroundColor: 'transparent'
    }, 'hideShow+=0.6').to([
      titleS, label
    ], 0.1, {backgroundColor: '#fff'}).to([
      titleS,
      titelL,
      form,
      sonne,
      wolkeL,
      wolkeR
    ], 0.5, {opacity: 1})
      .to(val, 0.1, {opacity: 1})
      .add('hideShowEnd');
  }

  function aniSuccess() {
    val.innerHTML = 'You are logged in!';
    addAnchor(val, 'success', 'val-link', 'rerun Pen');
    TweenLite.set(regen, {opacity: 0});
    TweenLite.set(val, {opacity: 0});
    tlss.add('start');
    tlss.to([
      titleS, titelL, form, wolkeL, wolkeR
    ], .5, {
      opacity: 0,
      display: 'none'
    }).to(sonne, .5, {
      transform: 'scale(2)',
      transformOrign: '50% 50%'
    }, 'start+=.2').to(sonne, .5, {
      y: '30px',
      x: '-15px'
    }, 'start+=.2').to(val, .5, {opacity: 1});
    reload('.success');
  }

  function reload(el) {
    const reloadLink = document.querySelector(el);
    reloadLink.addEventListener('click', function () {
      window.location.href = window.location.href;
    });
  }

  function validation(n, p) {
    console.log(count);
    if (n.length == 0 || p.length == 0) {
      val.innerHTML = errorTextempty;
      form
        .classList
        .add("formular--error");
    } else if (n != 'test' || p != 'test') {
      if (count == 0) {
        aniRain();
        val.innerHTML = errorText;
      } else if (count == 1) {
        aniStorm();
        val.innerHTML = errorText;
      } else if (count == 2) {
        aniWind();
        count = 0;
      }
      form
        .classList
        .add("formular--error");
    } else {
      aniSuccess();
      count = 0;
    }
  }

  function tipping(e) {
    const nameLength = e.target.value;
    if (nameLength.length < 2) {
      TweenMax.fromTo(sonne, .5, {
        opacity: 1,
        y: '38px'
      }, {
        opacity: 1,
        y: '33px'
      });
    } else if (nameLength.length < 3) {
      TweenMax.to(sonne, .5, {y: '15'});
    } else if (nameLength.length < 4) {
      TweenMax.to(sonne, .5, {y: '10'});
    } else {
      TweenMax.to(sonne, .5, {y: '0'});
    }
    e
      .target
      .parentNode
      .classList
      .add('input-target');
    val.innerHTML = '';
  }

  function tippingBlur(e) {
    if (!e.target.value) {
      TweenMax.to(sonne, .5, {y: '38'});
      e
        .target
        .parentNode
        .classList
        .remove('input-target');
    }
  }

  function onTipping(e) {
    const nameLength = e.target.value;
    if (form.classList.contains("formular--error")) {
      form
        .classList
        .remove("formular--error");
      val.innerHTML = '';
    }
    if (nameLength.length < 2) {
      TweenMax.to(sonne, .5, {y: '23'});
    } else if (nameLength.length < 3) {
      TweenMax.to(sonne, .5, {y: '15'});
    } else if (nameLength.length < 4) {
      TweenMax.to(sonne, .5, {y: '10'});
    } else {
      TweenMax.to(sonne, .5, {y: '0'});
    }
  }

  function pwTipping(e) {
    if (form.classList.contains("formular--error")) {
      form
        .classList
        .remove("formular--error");
      val.innerHTML = '';
    }
    TweenMax.set(wolkeL, {x: '5px'});
    TweenMax.set(wolkeR, {x: '10px'});
    TweenMax.staggerFromTo(allwolken, 0.5, {
      opacity: 0,
      y: '50px',
      scaleY: 0,
      scaleX: 0,
      transformOrigin: '0 0'
    }, {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      transformOrigin: '50% 50%'
    });
    TweenMax.to(wolkeL, 0.5, {
      y: '10px'
    }, '-=0.4');
    TweenMax.to(wolkeR, 0.5, {
      y: '15px'
    }, '-=0.4');
    e
      .target
      .parentNode
      .classList
      .add('input-target');
  }

  function pwTippingBlur(e) {
    TweenMax.staggerFromTo(allwolken, 0.5, {
      opacity: 1,
      scaleY: 1,
      scaleX: 1
    }, {
      opacity: 0,
      scaleY: 0,
      scaleX: 0
    });
    TweenMax.to(wolkeL, 0.5, {
      y: '50px',
      x: '0px'
    }, '-=0.4');
    TweenMax.to(wolkeR, 0.5, {
      y: '55px',
      x: '0px'
    }, '-=0.4');
    if (!e.target.value) {
      e
        .target
        .parentNode
        .classList
        .remove('input-target');
    }
  }

  nameI.addEventListener('focus', tipping);
  nameI.addEventListener('blur', tippingBlur);
  nameI.addEventListener('input', onTipping);
  pw.addEventListener('focus', pwTipping);
  pw.addEventListener('blur', pwTippingBlur);
  b.addEventListener('click', function (e) {
    validation(nameI.value, pw.value);
    if (nameI.value.length == 0 || pw.value.length == 0) {
      count;
    } else {
      count++;
    }
  });
}, false);