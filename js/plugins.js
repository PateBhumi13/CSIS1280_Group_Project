/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
!(function (t) {
  var e = {},
    s = {
      mode: "horizontal",
      slideSelector: "",
      infiniteLoop: !0,
      hideControlOnEnd: !1,
      speed: 500,
      easing: null,
      slideMargin: 0,
      startSlide: 0,
      randomStart: !1,
      captions: !1,
      ticker: !1,
      tickerHover: !1,
      adaptiveHeight: !1,
      adaptiveHeightSpeed: 500,
      video: !1,
      useCSS: !0,
      preloadImages: "visible",
      responsive: !0,
      slideZIndex: 50,
      touchEnabled: !0,
      swipeThreshold: 50,
      oneToOneTouch: !0,
      preventDefaultSwipeX: !0,
      preventDefaultSwipeY: !1,
      pager: !0,
      pagerType: "full",
      pagerShortSeparator: " / ",
      pagerSelector: null,
      buildPager: null,
      pagerCustom: null,
      controls: !0,
      nextText: "Next",
      prevText: "Prev",
      nextSelector: null,
      prevSelector: null,
      autoControls: !1,
      startText: "Start",
      stopText: "Stop",
      autoControlsCombine: !1,
      autoControlsSelector: null,
      auto: !1,
      pause: 4e3,
      autoStart: !0,
      autoDirection: "next",
      autoHover: !1,
      autoDelay: 0,
      minSlides: 1,
      maxSlides: 1,
      moveSlides: 0,
      slideWidth: 0,
      onSliderLoad: function () {},
      onSlideBefore: function () {},
      onSlideAfter: function () {},
      onSlideNext: function () {},
      onSlidePrev: function () {},
      onSliderResize: function () {},
    };
  t.fn.bxSlider = function (n) {
    if (0 == this.length) return this;
    if (this.length > 1)
      return (
        this.each(function () {
          t(this).bxSlider(n);
        }),
        this
      );
    var o = {},
      r = this;
    e.el = this;
    var a = t(window).width(),
      l = t(window).height(),
      d = function () {
        (o.settings = t.extend({}, s, n)),
          (o.settings.slideWidth = parseInt(o.settings.slideWidth)),
          (o.children = r.children(o.settings.slideSelector)),
          o.children.length < o.settings.minSlides &&
            (o.settings.minSlides = o.children.length),
          o.children.length < o.settings.maxSlides &&
            (o.settings.maxSlides = o.children.length),
          o.settings.randomStart &&
            (o.settings.startSlide = Math.floor(
              Math.random() * o.children.length
            )),
          (o.active = { index: o.settings.startSlide }),
          (o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1),
          o.carousel && (o.settings.preloadImages = "all"),
          (o.minThreshold =
            o.settings.minSlides * o.settings.slideWidth +
            (o.settings.minSlides - 1) * o.settings.slideMargin),
          (o.maxThreshold =
            o.settings.maxSlides * o.settings.slideWidth +
            (o.settings.maxSlides - 1) * o.settings.slideMargin),
          (o.working = !1),
          (o.controls = {}),
          (o.interval = null),
          (o.animProp = "vertical" == o.settings.mode ? "top" : "left"),
          (o.usingCSS =
            o.settings.useCSS &&
            "fade" != o.settings.mode &&
            (function () {
              var t = document.createElement("div"),
                e = [
                  "WebkitPerspective",
                  "MozPerspective",
                  "OPerspective",
                  "msPerspective",
                ];
              for (var i in e)
                if (void 0 !== t.style[e[i]])
                  return (
                    (o.cssPrefix = e[i]
                      .replace("Perspective", "")
                      .toLowerCase()),
                    (o.animProp = "-" + o.cssPrefix + "-transform"),
                    !0
                  );
              return !1;
            })()),
          "vertical" == o.settings.mode &&
            (o.settings.maxSlides = o.settings.minSlides),
          r.data("origStyle", r.attr("style")),
          r.children(o.settings.slideSelector).each(function () {
            t(this).data("origStyle", t(this).attr("style"));
          }),
          c();
      },
      c = function () {
        r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),
          (o.viewport = r.parent()),
          (o.loader = t('<div class="bx-loading" />')),
          o.viewport.prepend(o.loader),
          r.css({
            width:
              "horizontal" == o.settings.mode
                ? 100 * o.children.length + 215 + "%"
                : "auto",
            position: "relative",
          }),
          o.usingCSS && o.settings.easing
            ? r.css(
                "-" + o.cssPrefix + "-transition-timing-function",
                o.settings.easing
              )
            : o.settings.easing || (o.settings.easing = "swing"),
          f(),
          o.viewport.css({
            width: "100%",
            overflow: "hidden",
            position: "relative",
          }),
          o.viewport.parent().css({ maxWidth: p() }),
          o.settings.pager || o.viewport.parent().css({ margin: "0 auto 0px" }),
          o.children.css({
            float: "horizontal" == o.settings.mode ? "left" : "none",
            listStyle: "none",
            position: "relative",
          }),
          o.children.css("width", u()),
          "horizontal" == o.settings.mode &&
            o.settings.slideMargin > 0 &&
            o.children.css("marginRight", o.settings.slideMargin),
          "vertical" == o.settings.mode &&
            o.settings.slideMargin > 0 &&
            o.children.css("marginBottom", o.settings.slideMargin),
          "fade" == o.settings.mode &&
            (o.children.css({
              position: "absolute",
              zIndex: 0,
              display: "none",
            }),
            o.children
              .eq(o.settings.startSlide)
              .css({ zIndex: o.settings.slideZIndex, display: "block" })),
          (o.controls.el = t('<div class="bx-controls" />')),
          o.settings.captions && P(),
          (o.active.last = o.settings.startSlide == x() - 1),
          o.settings.video && r.fitVids();
        var e = o.children.eq(o.settings.startSlide);
        "all" == o.settings.preloadImages && (e = o.children),
          o.settings.ticker
            ? (o.settings.pager = !1)
            : (o.settings.pager && T(),
              o.settings.controls && C(),
              o.settings.auto && o.settings.autoControls && E(),
              (o.settings.controls ||
                o.settings.autoControls ||
                o.settings.pager) &&
                o.viewport.after(o.controls.el)),
          g(e, h);
      },
      g = function (e, i) {
        var s = e.find("img, iframe").length;
        if (0 == s) return i(), void 0;
        var n = 0;
        e.find("img, iframe").each(function () {
          t(this)
            .one("load", function () {
              ++n == s && i();
            })
            .each(function () {
              this.complete && t(this).load();
            });
        });
      },
      h = function () {
        if (
          o.settings.infiniteLoop &&
          "fade" != o.settings.mode &&
          !o.settings.ticker
        ) {
          var e =
              "vertical" == o.settings.mode
                ? o.settings.minSlides
                : o.settings.maxSlides,
            i = o.children.slice(0, e).clone().addClass("bx-clone"),
            s = o.children.slice(-e).clone().addClass("bx-clone");
          r.append(i).prepend(s);
        }
        o.loader.remove(),
          S(),
          "vertical" == o.settings.mode && (o.settings.adaptiveHeight = !0),
          o.viewport.height(v()),
          r.redrawSlider(),
          o.settings.onSliderLoad(o.active.index),
          (o.initialized = !0),
          o.settings.responsive && t(window).bind("resize", Z),
          o.settings.auto && o.settings.autoStart && H(),
          o.settings.ticker && L(),
          o.settings.pager && q(o.settings.startSlide),
          o.settings.controls && W(),
          o.settings.touchEnabled && !o.settings.ticker && O();
      },
      v = function () {
        var e = 0,
          s = t();
        if ("vertical" == o.settings.mode || o.settings.adaptiveHeight)
          if (o.carousel) {
            var n =
              1 == o.settings.moveSlides
                ? o.active.index
                : o.active.index * m();
            for (
              s = o.children.eq(n), i = 1;
              i <= o.settings.maxSlides - 1;
              i++
            )
              s =
                n + i >= o.children.length
                  ? s.add(o.children.eq(i - 1))
                  : s.add(o.children.eq(n + i));
          } else s = o.children.eq(o.active.index);
        else s = o.children;
        return (
          "vertical" == o.settings.mode
            ? (s.each(function () {
                e += t(this).outerHeight();
              }),
              o.settings.slideMargin > 0 &&
                (e += o.settings.slideMargin * (o.settings.minSlides - 1)))
            : (e = Math.max.apply(
                Math,
                s
                  .map(function () {
                    return t(this).outerHeight(!1);
                  })
                  .get()
              )),
          e
        );
      },
      p = function () {
        var t = "100%";
        return (
          o.settings.slideWidth > 0 &&
            (t =
              "horizontal" == o.settings.mode
                ? o.settings.maxSlides * o.settings.slideWidth +
                  (o.settings.maxSlides - 1) * o.settings.slideMargin
                : o.settings.slideWidth),
          t
        );
      },
      u = function () {
        var t = o.settings.slideWidth,
          e = o.viewport.width();
        return (
          0 == o.settings.slideWidth ||
          (o.settings.slideWidth > e && !o.carousel) ||
          "vertical" == o.settings.mode
            ? (t = e)
            : o.settings.maxSlides > 1 &&
              "horizontal" == o.settings.mode &&
              (e > o.maxThreshold ||
                (e < o.minThreshold &&
                  (t =
                    (e - o.settings.slideMargin * (o.settings.minSlides - 1)) /
                    o.settings.minSlides))),
          t
        );
      },
      f = function () {
        var t = 1;
        if ("horizontal" == o.settings.mode && o.settings.slideWidth > 0)
          if (o.viewport.width() < o.minThreshold) t = o.settings.minSlides;
          else if (o.viewport.width() > o.maxThreshold)
            t = o.settings.maxSlides;
          else {
            var e = o.children.first().width();
            t = Math.floor(o.viewport.width() / e);
          }
        else "vertical" == o.settings.mode && (t = o.settings.minSlides);
        return t;
      },
      x = function () {
        var t = 0;
        if (o.settings.moveSlides > 0)
          if (o.settings.infiniteLoop) t = o.children.length / m();
          else
            for (var e = 0, i = 0; e < o.children.length; )
              ++t,
                (e = i + f()),
                (i +=
                  o.settings.moveSlides <= f() ? o.settings.moveSlides : f());
        else t = Math.ceil(o.children.length / f());
        return t;
      },
      m = function () {
        return o.settings.moveSlides > 0 && o.settings.moveSlides <= f()
          ? o.settings.moveSlides
          : f();
      },
      S = function () {
        if (
          o.children.length > o.settings.maxSlides &&
          o.active.last &&
          !o.settings.infiniteLoop
        ) {
          if ("horizontal" == o.settings.mode) {
            var t = o.children.last(),
              e = t.position();
            b(-(e.left - (o.viewport.width() - t.width())), "reset", 0);
          } else if ("vertical" == o.settings.mode) {
            var i = o.children.length - o.settings.minSlides,
              e = o.children.eq(i).position();
            b(-e.top, "reset", 0);
          }
        } else {
          var e = o.children.eq(o.active.index * m()).position();
          o.active.index == x() - 1 && (o.active.last = !0),
            void 0 != e &&
              ("horizontal" == o.settings.mode
                ? b(-e.left, "reset", 0)
                : "vertical" == o.settings.mode && b(-e.top, "reset", 0));
        }
      },
      b = function (t, e, i, s) {
        if (o.usingCSS) {
          var n =
            "vertical" == o.settings.mode
              ? "translate3d(0, " + t + "px, 0)"
              : "translate3d(" + t + "px, 0, 0)";
          r.css("-" + o.cssPrefix + "-transition-duration", i / 1e3 + "s"),
            "slide" == e
              ? (r.css(o.animProp, n),
                r.bind(
                  "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                  function () {
                    r.unbind(
                      "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"
                    ),
                      D();
                  }
                ))
              : "reset" == e
              ? r.css(o.animProp, n)
              : "ticker" == e &&
                (r.css(
                  "-" + o.cssPrefix + "-transition-timing-function",
                  "linear"
                ),
                r.css(o.animProp, n),
                r.bind(
                  "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                  function () {
                    r.unbind(
                      "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"
                    ),
                      b(s.resetValue, "reset", 0),
                      N();
                  }
                ));
        } else {
          var a = {};
          (a[o.animProp] = t),
            "slide" == e
              ? r.animate(a, i, o.settings.easing, function () {
                  D();
                })
              : "reset" == e
              ? r.css(o.animProp, t)
              : "ticker" == e &&
                r.animate(a, speed, "linear", function () {
                  b(s.resetValue, "reset", 0), N();
                });
        }
      },
      w = function () {
        for (var e = "", i = x(), s = 0; i > s; s++) {
          var n = "";
          o.settings.buildPager && t.isFunction(o.settings.buildPager)
            ? ((n = o.settings.buildPager(s)),
              o.pagerEl.addClass("bx-custom-pager"))
            : ((n = s + 1), o.pagerEl.addClass("bx-default-pager")),
            (e +=
              '<div class="bx-pager-item"><a href="" data-slide-index="' +
              s +
              '" class="bx-pager-link">' +
              n +
              "</a></div>");
        }
        o.pagerEl.html(e);
      },
      T = function () {
        o.settings.pagerCustom
          ? (o.pagerEl = t(o.settings.pagerCustom))
          : ((o.pagerEl = t('<div class="bx-pager" />')),
            o.settings.pagerSelector
              ? t(o.settings.pagerSelector).html(o.pagerEl)
              : o.controls.el.addClass("bx-has-pager").append(o.pagerEl),
            w()),
          o.pagerEl.on("click", "a", I);
      },
      C = function () {
        (o.controls.next = t(
          '<a class="bx-next" href="">' + o.settings.nextText + "</a>"
        )),
          (o.controls.prev = t(
            '<a class="bx-prev" href="">' + o.settings.prevText + "</a>"
          )),
          o.controls.next.bind("click", y),
          o.controls.prev.bind("click", z),
          o.settings.nextSelector &&
            t(o.settings.nextSelector).append(o.controls.next),
          o.settings.prevSelector &&
            t(o.settings.prevSelector).append(o.controls.prev),
          o.settings.nextSelector ||
            o.settings.prevSelector ||
            ((o.controls.directionEl = t(
              '<div class="bx-controls-direction" />'
            )),
            o.controls.directionEl
              .append(o.controls.prev)
              .append(o.controls.next),
            o.controls.el
              .addClass("bx-has-controls-direction")
              .append(o.controls.directionEl));
      },
      E = function () {
        (o.controls.start = t(
          '<div class="bx-controls-auto-item"><a class="bx-start" href="">' +
            o.settings.startText +
            "</a></div>"
        )),
          (o.controls.stop = t(
            '<div class="bx-controls-auto-item"><a class="bx-stop" href="">' +
              o.settings.stopText +
              "</a></div>"
          )),
          (o.controls.autoEl = t('<div class="bx-controls-auto" />')),
          o.controls.autoEl.on("click", ".bx-start", k),
          o.controls.autoEl.on("click", ".bx-stop", M),
          o.settings.autoControlsCombine
            ? o.controls.autoEl.append(o.controls.start)
            : o.controls.autoEl
                .append(o.controls.start)
                .append(o.controls.stop),
          o.settings.autoControlsSelector
            ? t(o.settings.autoControlsSelector).html(o.controls.autoEl)
            : o.controls.el
                .addClass("bx-has-controls-auto")
                .append(o.controls.autoEl),
          A(o.settings.autoStart ? "stop" : "start");
      },
      P = function () {
        o.children.each(function () {
          var e = t(this).find("img:first").attr("title");
          void 0 != e &&
            ("" + e).length &&
            t(this).append(
              '<div class="bx-caption"><span>' + e + "</span></div>"
            );
        });
      },
      y = function (t) {
        o.settings.auto && r.stopAuto(), r.goToNextSlide(), t.preventDefault();
      },
      z = function (t) {
        o.settings.auto && r.stopAuto(), r.goToPrevSlide(), t.preventDefault();
      },
      k = function (t) {
        r.startAuto(), t.preventDefault();
      },
      M = function (t) {
        r.stopAuto(), t.preventDefault();
      },
      I = function (e) {
        o.settings.auto && r.stopAuto();
        var i = t(e.currentTarget),
          s = parseInt(i.attr("data-slide-index"));
        s != o.active.index && r.goToSlide(s), e.preventDefault();
      },
      q = function (e) {
        var i = o.children.length;
        return "short" == o.settings.pagerType
          ? (o.settings.maxSlides > 1 &&
              (i = Math.ceil(o.children.length / o.settings.maxSlides)),
            o.pagerEl.html(e + 1 + o.settings.pagerShortSeparator + i),
            void 0)
          : (o.pagerEl.find("a").removeClass("active"),
            o.pagerEl.each(function (i, s) {
              t(s).find("a").eq(e).addClass("active");
            }),
            void 0);
      },
      D = function () {
        if (o.settings.infiniteLoop) {
          var t = "";
          0 == o.active.index
            ? (t = o.children.eq(0).position())
            : o.active.index == x() - 1 && o.carousel
            ? (t = o.children.eq((x() - 1) * m()).position())
            : o.active.index == o.children.length - 1 &&
              (t = o.children.eq(o.children.length - 1).position()),
            t &&
              ("horizontal" == o.settings.mode
                ? b(-t.left, "reset", 0)
                : "vertical" == o.settings.mode && b(-t.top, "reset", 0));
        }
        (o.working = !1),
          o.settings.onSlideAfter(
            o.children.eq(o.active.index),
            o.oldIndex,
            o.active.index
          );
      },
      A = function (t) {
        o.settings.autoControlsCombine
          ? o.controls.autoEl.html(o.controls[t])
          : (o.controls.autoEl.find("a").removeClass("active"),
            o.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"));
      },
      W = function () {
        1 == x()
          ? (o.controls.prev.addClass("disabled"),
            o.controls.next.addClass("disabled"))
          : !o.settings.infiniteLoop &&
            o.settings.hideControlOnEnd &&
            (0 == o.active.index
              ? (o.controls.prev.addClass("disabled"),
                o.controls.next.removeClass("disabled"))
              : o.active.index == x() - 1
              ? (o.controls.next.addClass("disabled"),
                o.controls.prev.removeClass("disabled"))
              : (o.controls.prev.removeClass("disabled"),
                o.controls.next.removeClass("disabled")));
      },
      H = function () {
        o.settings.autoDelay > 0
          ? setTimeout(r.startAuto, o.settings.autoDelay)
          : r.startAuto(),
          o.settings.autoHover &&
            r.hover(
              function () {
                o.interval && (r.stopAuto(!0), (o.autoPaused = !0));
              },
              function () {
                o.autoPaused && (r.startAuto(!0), (o.autoPaused = null));
              }
            );
      },
      L = function () {
        var e = 0;
        if ("next" == o.settings.autoDirection)
          r.append(o.children.clone().addClass("bx-clone"));
        else {
          r.prepend(o.children.clone().addClass("bx-clone"));
          var i = o.children.first().position();
          e = "horizontal" == o.settings.mode ? -i.left : -i.top;
        }
        b(e, "reset", 0),
          (o.settings.pager = !1),
          (o.settings.controls = !1),
          (o.settings.autoControls = !1),
          o.settings.tickerHover &&
            !o.usingCSS &&
            o.viewport.hover(
              function () {
                r.stop();
              },
              function () {
                var e = 0;
                o.children.each(function () {
                  e +=
                    "horizontal" == o.settings.mode
                      ? t(this).outerWidth(!0)
                      : t(this).outerHeight(!0);
                });
                var i = o.settings.speed / e,
                  s = "horizontal" == o.settings.mode ? "left" : "top",
                  n = i * (e - Math.abs(parseInt(r.css(s))));
                N(n);
              }
            ),
          N();
      },
      N = function (t) {
        speed = t ? t : o.settings.speed;
        var e = { left: 0, top: 0 },
          i = { left: 0, top: 0 };
        "next" == o.settings.autoDirection
          ? (e = r.find(".bx-clone").first().position())
          : (i = o.children.first().position());
        var s = "horizontal" == o.settings.mode ? -e.left : -e.top,
          n = "horizontal" == o.settings.mode ? -i.left : -i.top,
          a = { resetValue: n };
        b(s, "ticker", speed, a);
      },
      O = function () {
        (o.touch = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }),
          o.viewport.bind("touchstart", X);
      },
      X = function (t) {
        if (o.working) t.preventDefault();
        else {
          o.touch.originalPos = r.position();
          var e = t.originalEvent;
          (o.touch.start.x = e.changedTouches[0].pageX),
            (o.touch.start.y = e.changedTouches[0].pageY),
            o.viewport.bind("touchmove", Y),
            o.viewport.bind("touchend", V);
        }
      },
      Y = function (t) {
        var e = t.originalEvent,
          i = Math.abs(e.changedTouches[0].pageX - o.touch.start.x),
          s = Math.abs(e.changedTouches[0].pageY - o.touch.start.y);
        if (
          (3 * i > s && o.settings.preventDefaultSwipeX
            ? t.preventDefault()
            : 3 * s > i &&
              o.settings.preventDefaultSwipeY &&
              t.preventDefault(),
          "fade" != o.settings.mode && o.settings.oneToOneTouch)
        ) {
          var n = 0;
          if ("horizontal" == o.settings.mode) {
            var r = e.changedTouches[0].pageX - o.touch.start.x;
            n = o.touch.originalPos.left + r;
          } else {
            var r = e.changedTouches[0].pageY - o.touch.start.y;
            n = o.touch.originalPos.top + r;
          }
          b(n, "reset", 0);
        }
      },
      V = function (t) {
        o.viewport.unbind("touchmove", Y);
        var e = t.originalEvent,
          i = 0;
        if (
          ((o.touch.end.x = e.changedTouches[0].pageX),
          (o.touch.end.y = e.changedTouches[0].pageY),
          "fade" == o.settings.mode)
        ) {
          var s = Math.abs(o.touch.start.x - o.touch.end.x);
          s >= o.settings.swipeThreshold &&
            (o.touch.start.x > o.touch.end.x
              ? r.goToNextSlide()
              : r.goToPrevSlide(),
            r.stopAuto());
        } else {
          var s = 0;
          "horizontal" == o.settings.mode
            ? ((s = o.touch.end.x - o.touch.start.x),
              (i = o.touch.originalPos.left))
            : ((s = o.touch.end.y - o.touch.start.y),
              (i = o.touch.originalPos.top)),
            !o.settings.infiniteLoop &&
            ((0 == o.active.index && s > 0) || (o.active.last && 0 > s))
              ? b(i, "reset", 200)
              : Math.abs(s) >= o.settings.swipeThreshold
              ? (0 > s ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto())
              : b(i, "reset", 200);
        }
        o.viewport.unbind("touchend", V);
      },
      Z = function () {
        var e = t(window).width(),
          i = t(window).height();
        (a != e || l != i) &&
          ((a = e),
          (l = i),
          r.redrawSlider(),
          o.settings.onSliderResize.call(r, o.active.index));
      };
    return (
      (r.goToSlide = function (e, i) {
        if (!o.working && o.active.index != e)
          if (
            ((o.working = !0),
            (o.oldIndex = o.active.index),
            (o.active.index = 0 > e ? x() - 1 : e >= x() ? 0 : e),
            o.settings.onSlideBefore(
              o.children.eq(o.active.index),
              o.oldIndex,
              o.active.index
            ),
            "next" == i
              ? o.settings.onSlideNext(
                  o.children.eq(o.active.index),
                  o.oldIndex,
                  o.active.index
                )
              : "prev" == i &&
                o.settings.onSlidePrev(
                  o.children.eq(o.active.index),
                  o.oldIndex,
                  o.active.index
                ),
            (o.active.last = o.active.index >= x() - 1),
            o.settings.pager && q(o.active.index),
            o.settings.controls && W(),
            "fade" == o.settings.mode)
          )
            o.settings.adaptiveHeight &&
              o.viewport.height() != v() &&
              o.viewport.animate(
                { height: v() },
                o.settings.adaptiveHeightSpeed
              ),
              o.children
                .filter(":visible")
                .fadeOut(o.settings.speed)
                .css({ zIndex: 0 }),
              o.children
                .eq(o.active.index)
                .css("zIndex", o.settings.slideZIndex + 1)
                .fadeIn(o.settings.speed, function () {
                  t(this).css("zIndex", o.settings.slideZIndex), D();
                });
          else {
            o.settings.adaptiveHeight &&
              o.viewport.height() != v() &&
              o.viewport.animate(
                { height: v() },
                o.settings.adaptiveHeightSpeed
              );
            var s = 0,
              n = { left: 0, top: 0 };
            if (!o.settings.infiniteLoop && o.carousel && o.active.last)
              if ("horizontal" == o.settings.mode) {
                var a = o.children.eq(o.children.length - 1);
                (n = a.position()), (s = o.viewport.width() - a.outerWidth());
              } else {
                var l = o.children.length - o.settings.minSlides;
                n = o.children.eq(l).position();
              }
            else if (o.carousel && o.active.last && "prev" == i) {
              var d =
                  1 == o.settings.moveSlides
                    ? o.settings.maxSlides - m()
                    : (x() - 1) * m() -
                      (o.children.length - o.settings.maxSlides),
                a = r.children(".bx-clone").eq(d);
              n = a.position();
            } else if ("next" == i && 0 == o.active.index)
              (n = r.find("> .bx-clone").eq(o.settings.maxSlides).position()),
                (o.active.last = !1);
            else if (e >= 0) {
              var c = e * m();
              n = o.children.eq(c).position();
            }
            if ("undefined" != typeof n) {
              var g = "horizontal" == o.settings.mode ? -(n.left - s) : -n.top;
              b(g, "slide", o.settings.speed);
            }
          }
      }),
      (r.goToNextSlide = function () {
        if (o.settings.infiniteLoop || !o.active.last) {
          var t = parseInt(o.active.index) + 1;
          r.goToSlide(t, "next");
        }
      }),
      (r.goToPrevSlide = function () {
        if (o.settings.infiniteLoop || 0 != o.active.index) {
          var t = parseInt(o.active.index) - 1;
          r.goToSlide(t, "prev");
        }
      }),
      (r.startAuto = function (t) {
        o.interval ||
          ((o.interval = setInterval(function () {
            "next" == o.settings.autoDirection
              ? r.goToNextSlide()
              : r.goToPrevSlide();
          }, o.settings.pause)),
          o.settings.autoControls && 1 != t && A("stop"));
      }),
      (r.stopAuto = function (t) {
        o.interval &&
          (clearInterval(o.interval),
          (o.interval = null),
          o.settings.autoControls && 1 != t && A("start"));
      }),
      (r.getCurrentSlide = function () {
        return o.active.index;
      }),
      (r.getCurrentSlideElement = function () {
        return o.children.eq(o.active.index);
      }),
      (r.getSlideCount = function () {
        return o.children.length;
      }),
      (r.redrawSlider = function () {
        o.children.add(r.find(".bx-clone")).outerWidth(u()),
          o.viewport.css("height", v()),
          o.settings.ticker || S(),
          o.active.last && (o.active.index = x() - 1),
          o.active.index >= x() && (o.active.last = !0),
          o.settings.pager &&
            !o.settings.pagerCustom &&
            (w(), q(o.active.index));
      }),
      (r.destroySlider = function () {
        o.initialized &&
          ((o.initialized = !1),
          t(".bx-clone", this).remove(),
          o.children.each(function () {
            void 0 != t(this).data("origStyle")
              ? t(this).attr("style", t(this).data("origStyle"))
              : t(this).removeAttr("style");
          }),
          void 0 != t(this).data("origStyle")
            ? this.attr("style", t(this).data("origStyle"))
            : t(this).removeAttr("style"),
          t(this).unwrap().unwrap(),
          o.controls.el && o.controls.el.remove(),
          o.controls.next && o.controls.next.remove(),
          o.controls.prev && o.controls.prev.remove(),
          o.pagerEl && o.settings.controls && o.pagerEl.remove(),
          t(".bx-caption", this).remove(),
          o.controls.autoEl && o.controls.autoEl.remove(),
          clearInterval(o.interval),
          o.settings.responsive && t(window).unbind("resize", Z));
      }),
      (r.reloadSlider = function (t) {
        void 0 != t && (n = t), r.destroySlider(), d();
      }),
      d(),
      this
    );
  };
})(jQuery);

!(function (a) {
  function c() {
    a(".crf-sm.opened").length &&
      (a(".crf-s.opened").removeClass("opened"),
      a(".crf-sm.opened").removeClass("opened").hide(),
      b.close.call());
  }
  a.fn.crfi = function () {
    this.change(function () {
      "radio" == a(this).attr("type") &&
        a("input[name=" + a(this).attr("name") + "]")
          .not(this)
          .next(".crf")
          .removeClass("checked"),
        a(this).prop("checked")
          ? a(this).next().addClass("checked")
          : a(this).next().removeClass("checked");
    }),
      this.not(".crf-i").each(function (b) {
        a(this)
          .attr("id", "crf-input-" + b)
          .css({ position: "absolute", left: "-9999em" })
          .addClass("crf-i")
          .next("label")
          .addClass("crf")
          .attr("for", "crf-input-" + b),
          a(this).prop("checked") && a(this).next().addClass("checked");
      });
  };
  var b,
    d = {
      init: function (d) {
        (b = a.extend(
          {
            select: function () {},
            done: function () {},
            open: function () {},
            close: function () {},
          },
          d
        )),
          a(document)
            .unbind("click.crfs")
            .on("click.crfs", ".crf-s", function () {
              var d = a("div[data-id=" + a(this).attr("id") + "]");
              if (d.is(":visible")) return c(), !1;
              c();
              var e = a(this).outerHeight(),
                f = a(this).find("select").attr("class"),
                g = a(this).offset(),
                h = d.show().height();
              d.css({ position: "absolute", left: "-9999em" }),
                a(this).addClass("opened"),
                d
                  .addClass("opened " + f)
                  .css({
                    left: g.left,
                    top:
                      g.top + e + h > a(document).height()
                        ? g.top - h
                        : g.top + e,
                    width: a(this).outerWidth(),
                  })
                  .show(),
                b.open.call();
            }),
          a(document).click(function (b) {
            return a(b.target).closest(".crf-sm.opened, .crf-s.opened").length >
              0
              ? !1
              : (c(), void 0);
          }),
          a(window).resize(function () {
            var b = a(".crf-s.opened");
            if (b.length) {
              var c = a(".crf-sm.opened"),
                d = b.outerHeight(),
                e = b.offset(),
                f = c.height();
              c.css({
                left: e.left,
                top:
                  e.top + d + f > a(document).height() ? e.top - f : e.top + d,
                width: b.outerWidth(),
              });
            }
          }),
          a(document).on("click.crfs", ".crf-sm li", function () {
            var d = a(this).parentsUntil(".crf-sm").parent().attr("data-id"),
              e = a("#" + d).attr("class");
            return (
              a("#" + d)
                .attr("class", "crf-s")
                .addClass(a(this).attr("class").replace("selected", ""))
                .addClass(e.replace("hided-s", "").replace("opened", ""))
                .find(".option")
                .text(a(this).text()),
              a("#" + d)
                .find("select")
                .children()
                .prop("selected", !1)
                .eq(a(this).index())
                .prop("selected", !0)
                .change(),
              a(this)
                .parentsUntil(".crf-sm")
                .parent()
                .find(".selected")
                .removeClass("selected"),
              a(this).addClass("selected"),
              c(),
              b.select.call(),
              !1
            );
          }),
          this.not(".hided-s").each(function (c) {
            a(this)
              .addClass("hided-s")
              .hide()
              .wrap(
                "<span class='crf-s " +
                  a(this).attr("class") +
                  "' id='crf-s-" +
                  c +
                  "' />"
              )
              .parent()
              .append(
                "<span class='option'>" +
                  a(this).find("option:selected").text() +
                  "</span>"
              );
            var d = a("<ul></ul>");
            a(this)
              .children()
              .each(function () {
                d.append(
                  "<li class='" +
                    (void 0 != a(this).attr("class")
                      ? a(this).attr("class") + ""
                      : "") +
                    (a(this).is(":selected") ? " selected" : "") +
                    "'><span class='link'>" +
                    a(this).text() +
                    "</span></li>"
                );
              }),
              a("<div class='crf-sm' data-id='crf-s-" + c + "'/>")
                .append(d)
                .appendTo("body"),
              b.done.call();
          });
      },
      hide: function () {
        c();
      },
    };
  a.fn.crfs = function (a) {
    return d[a]
      ? d[a].apply(this, Array.prototype.slice.call(arguments, 1))
      : "object" != typeof a && a
      ? void 0
      : d.init.apply(this, arguments);
  };
})(jQuery);

/*! jQuery UI - v1.10.4 - 2014-06-17
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.slider.js
 * Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */

(function (e, t) {
  function i(t, i) {
    var s,
      a,
      o,
      r = t.nodeName.toLowerCase();
    return "area" === r
      ? ((s = t.parentNode),
        (a = s.name),
        t.href && a && "map" === s.nodeName.toLowerCase()
          ? ((o = e("img[usemap=#" + a + "]")[0]), !!o && n(o))
          : !1)
      : (/input|select|textarea|button|object/.test(r)
          ? !t.disabled
          : "a" === r
          ? t.href || i
          : i) && n(t);
  }
  function n(t) {
    return (
      e.expr.filters.visible(t) &&
      !e(t)
        .parents()
        .addBack()
        .filter(function () {
          return "hidden" === e.css(this, "visibility");
        }).length
    );
  }
  var s = 0,
    a = /^ui-id-\d+$/;
  (e.ui = e.ui || {}),
    e.extend(e.ui, {
      version: "1.10.4",
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      },
    }),
    e.fn.extend({
      focus: (function (t) {
        return function (i, n) {
          return "number" == typeof i
            ? this.each(function () {
                var t = this;
                setTimeout(function () {
                  e(t).focus(), n && n.call(t);
                }, i);
              })
            : t.apply(this, arguments);
        };
      })(e.fn.focus),
      scrollParent: function () {
        var t;
        return (
          (t =
            (e.ui.ie && /(static|relative)/.test(this.css("position"))) ||
            /absolute/.test(this.css("position"))
              ? this.parents()
                  .filter(function () {
                    return (
                      /(relative|absolute|fixed)/.test(
                        e.css(this, "position")
                      ) &&
                      /(auto|scroll)/.test(
                        e.css(this, "overflow") +
                          e.css(this, "overflow-y") +
                          e.css(this, "overflow-x")
                      )
                    );
                  })
                  .eq(0)
              : this.parents()
                  .filter(function () {
                    return /(auto|scroll)/.test(
                      e.css(this, "overflow") +
                        e.css(this, "overflow-y") +
                        e.css(this, "overflow-x")
                    );
                  })
                  .eq(0)),
          /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        );
      },
      zIndex: function (i) {
        if (i !== t) return this.css("zIndex", i);
        if (this.length)
          for (var n, s, a = e(this[0]); a.length && a[0] !== document; ) {
            if (
              ((n = a.css("position")),
              ("absolute" === n || "relative" === n || "fixed" === n) &&
                ((s = parseInt(a.css("zIndex"), 10)), !isNaN(s) && 0 !== s))
            )
              return s;
            a = a.parent();
          }
        return 0;
      },
      uniqueId: function () {
        return this.each(function () {
          this.id || (this.id = "ui-id-" + ++s);
        });
      },
      removeUniqueId: function () {
        return this.each(function () {
          a.test(this.id) && e(this).removeAttr("id");
        });
      },
    }),
    e.extend(e.expr[":"], {
      data: e.expr.createPseudo
        ? e.expr.createPseudo(function (t) {
            return function (i) {
              return !!e.data(i, t);
            };
          })
        : function (t, i, n) {
            return !!e.data(t, n[3]);
          },
      focusable: function (t) {
        return i(t, !isNaN(e.attr(t, "tabindex")));
      },
      tabbable: function (t) {
        var n = e.attr(t, "tabindex"),
          s = isNaN(n);
        return (s || n >= 0) && i(t, !s);
      },
    }),
    e("<a>").outerWidth(1).jquery ||
      e.each(["Width", "Height"], function (i, n) {
        function s(t, i, n, s) {
          return (
            e.each(a, function () {
              (i -= parseFloat(e.css(t, "padding" + this)) || 0),
                n &&
                  (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0),
                s && (i -= parseFloat(e.css(t, "margin" + this)) || 0);
            }),
            i
          );
        }
        var a = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
          o = n.toLowerCase(),
          r = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight,
          };
        (e.fn["inner" + n] = function (i) {
          return i === t
            ? r["inner" + n].call(this)
            : this.each(function () {
                e(this).css(o, s(this, i) + "px");
              });
        }),
          (e.fn["outer" + n] = function (t, i) {
            return "number" != typeof t
              ? r["outer" + n].call(this, t)
              : this.each(function () {
                  e(this).css(o, s(this, t, !0, i) + "px");
                });
          });
      }),
    e.fn.addBack ||
      (e.fn.addBack = function (e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      }),
    e("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
      (e.fn.removeData = (function (t) {
        return function (i) {
          return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this);
        };
      })(e.fn.removeData)),
    (e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
    (e.support.selectstart = "onselectstart" in document.createElement("div")),
    e.fn.extend({
      disableSelection: function () {
        return this.bind(
          (e.support.selectstart ? "selectstart" : "mousedown") +
            ".ui-disableSelection",
          function (e) {
            e.preventDefault();
          }
        );
      },
      enableSelection: function () {
        return this.unbind(".ui-disableSelection");
      },
    }),
    e.extend(e.ui, {
      plugin: {
        add: function (t, i, n) {
          var s,
            a = e.ui[t].prototype;
          for (s in n)
            (a.plugins[s] = a.plugins[s] || []), a.plugins[s].push([i, n[s]]);
        },
        call: function (e, t, i) {
          var n,
            s = e.plugins[t];
          if (
            s &&
            e.element[0].parentNode &&
            11 !== e.element[0].parentNode.nodeType
          )
            for (n = 0; s.length > n; n++)
              e.options[s[n][0]] && s[n][1].apply(e.element, i);
        },
      },
      hasScroll: function (t, i) {
        if ("hidden" === e(t).css("overflow")) return !1;
        var n = i && "left" === i ? "scrollLeft" : "scrollTop",
          s = !1;
        return t[n] > 0 ? !0 : ((t[n] = 1), (s = t[n] > 0), (t[n] = 0), s);
      },
    });
})(jQuery);
(function (t, e) {
  var i = 0,
    s = Array.prototype.slice,
    n = t.cleanData;
  (t.cleanData = function (e) {
    for (var i, s = 0; null != (i = e[s]); s++)
      try {
        t(i).triggerHandler("remove");
      } catch (o) {}
    n(e);
  }),
    (t.widget = function (i, s, n) {
      var o,
        a,
        r,
        h,
        l = {},
        c = i.split(".")[0];
      (i = i.split(".")[1]),
        (o = c + "-" + i),
        n || ((n = s), (s = t.Widget)),
        (t.expr[":"][o.toLowerCase()] = function (e) {
          return !!t.data(e, o);
        }),
        (t[c] = t[c] || {}),
        (a = t[c][i]),
        (r = t[c][i] =
          function (t, i) {
            return this._createWidget
              ? (arguments.length && this._createWidget(t, i), e)
              : new r(t, i);
          }),
        t.extend(r, a, {
          version: n.version,
          _proto: t.extend({}, n),
          _childConstructors: [],
        }),
        (h = new s()),
        (h.options = t.widget.extend({}, h.options)),
        t.each(n, function (i, n) {
          return t.isFunction(n)
            ? ((l[i] = (function () {
                var t = function () {
                    return s.prototype[i].apply(this, arguments);
                  },
                  e = function (t) {
                    return s.prototype[i].apply(this, t);
                  };
                return function () {
                  var i,
                    s = this._super,
                    o = this._superApply;
                  return (
                    (this._super = t),
                    (this._superApply = e),
                    (i = n.apply(this, arguments)),
                    (this._super = s),
                    (this._superApply = o),
                    i
                  );
                };
              })()),
              e)
            : ((l[i] = n), e);
        }),
        (r.prototype = t.widget.extend(
          h,
          { widgetEventPrefix: a ? h.widgetEventPrefix || i : i },
          l,
          { constructor: r, namespace: c, widgetName: i, widgetFullName: o }
        )),
        a
          ? (t.each(a._childConstructors, function (e, i) {
              var s = i.prototype;
              t.widget(s.namespace + "." + s.widgetName, r, i._proto);
            }),
            delete a._childConstructors)
          : s._childConstructors.push(r),
        t.widget.bridge(i, r);
    }),
    (t.widget.extend = function (i) {
      for (var n, o, a = s.call(arguments, 1), r = 0, h = a.length; h > r; r++)
        for (n in a[r])
          (o = a[r][n]),
            a[r].hasOwnProperty(n) &&
              o !== e &&
              (i[n] = t.isPlainObject(o)
                ? t.isPlainObject(i[n])
                  ? t.widget.extend({}, i[n], o)
                  : t.widget.extend({}, o)
                : o);
      return i;
    }),
    (t.widget.bridge = function (i, n) {
      var o = n.prototype.widgetFullName || i;
      t.fn[i] = function (a) {
        var r = "string" == typeof a,
          h = s.call(arguments, 1),
          l = this;
        return (
          (a = !r && h.length ? t.widget.extend.apply(null, [a].concat(h)) : a),
          r
            ? this.each(function () {
                var s,
                  n = t.data(this, o);
                return n
                  ? t.isFunction(n[a]) && "_" !== a.charAt(0)
                    ? ((s = n[a].apply(n, h)),
                      s !== n && s !== e
                        ? ((l = s && s.jquery ? l.pushStack(s.get()) : s), !1)
                        : e)
                    : t.error(
                        "no such method '" +
                          a +
                          "' for " +
                          i +
                          " widget instance"
                      )
                  : t.error(
                      "cannot call methods on " +
                        i +
                        " prior to initialization; " +
                        "attempted to call method '" +
                        a +
                        "'"
                    );
              })
            : this.each(function () {
                var e = t.data(this, o);
                e ? e.option(a || {})._init() : t.data(this, o, new n(a, this));
              }),
          l
        );
      };
    }),
    (t.Widget = function () {}),
    (t.Widget._childConstructors = []),
    (t.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { disabled: !1, create: null },
      _createWidget: function (e, s) {
        (s = t(s || this.defaultElement || this)[0]),
          (this.element = t(s)),
          (this.uuid = i++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.options = t.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            e
          )),
          (this.bindings = t()),
          (this.hoverable = t()),
          (this.focusable = t()),
          s !== this &&
            (t.data(s, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function (t) {
                t.target === s && this.destroy();
              },
            }),
            (this.document = t(s.style ? s.ownerDocument : s.document || s)),
            (this.window = t(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          this._create(),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: t.noop,
      _getCreateEventData: t.noop,
      _create: t.noop,
      _init: t.noop,
      destroy: function () {
        this._destroy(),
          this.element
            .unbind(this.eventNamespace)
            .removeData(this.widgetName)
            .removeData(this.widgetFullName)
            .removeData(t.camelCase(this.widgetFullName)),
          this.widget()
            .unbind(this.eventNamespace)
            .removeAttr("aria-disabled")
            .removeClass(
              this.widgetFullName + "-disabled " + "ui-state-disabled"
            ),
          this.bindings.unbind(this.eventNamespace),
          this.hoverable.removeClass("ui-state-hover"),
          this.focusable.removeClass("ui-state-focus");
      },
      _destroy: t.noop,
      widget: function () {
        return this.element;
      },
      option: function (i, s) {
        var n,
          o,
          a,
          r = i;
        if (0 === arguments.length) return t.widget.extend({}, this.options);
        if ("string" == typeof i)
          if (((r = {}), (n = i.split(".")), (i = n.shift()), n.length)) {
            for (
              o = r[i] = t.widget.extend({}, this.options[i]), a = 0;
              n.length - 1 > a;
              a++
            )
              (o[n[a]] = o[n[a]] || {}), (o = o[n[a]]);
            if (((i = n.pop()), 1 === arguments.length))
              return o[i] === e ? null : o[i];
            o[i] = s;
          } else {
            if (1 === arguments.length)
              return this.options[i] === e ? null : this.options[i];
            r[i] = s;
          }
        return this._setOptions(r), this;
      },
      _setOptions: function (t) {
        var e;
        for (e in t) this._setOption(e, t[e]);
        return this;
      },
      _setOption: function (t, e) {
        return (
          (this.options[t] = e),
          "disabled" === t &&
            (this.widget()
              .toggleClass(
                this.widgetFullName + "-disabled ui-state-disabled",
                !!e
              )
              .attr("aria-disabled", e),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")),
          this
        );
      },
      enable: function () {
        return this._setOption("disabled", !1);
      },
      disable: function () {
        return this._setOption("disabled", !0);
      },
      _on: function (i, s, n) {
        var o,
          a = this;
        "boolean" != typeof i && ((n = s), (s = i), (i = !1)),
          n
            ? ((s = o = t(s)), (this.bindings = this.bindings.add(s)))
            : ((n = s), (s = this.element), (o = this.widget())),
          t.each(n, function (n, r) {
            function h() {
              return i ||
                (a.options.disabled !== !0 &&
                  !t(this).hasClass("ui-state-disabled"))
                ? ("string" == typeof r ? a[r] : r).apply(a, arguments)
                : e;
            }
            "string" != typeof r &&
              (h.guid = r.guid = r.guid || h.guid || t.guid++);
            var l = n.match(/^(\w+)\s*(.*)$/),
              c = l[1] + a.eventNamespace,
              u = l[2];
            u ? o.delegate(u, c, h) : s.bind(c, h);
          });
      },
      _off: function (t, e) {
        (e =
          (e || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace),
          t.unbind(e).undelegate(e);
      },
      _delay: function (t, e) {
        function i() {
          return ("string" == typeof t ? s[t] : t).apply(s, arguments);
        }
        var s = this;
        return setTimeout(i, e || 0);
      },
      _hoverable: function (e) {
        (this.hoverable = this.hoverable.add(e)),
          this._on(e, {
            mouseenter: function (e) {
              t(e.currentTarget).addClass("ui-state-hover");
            },
            mouseleave: function (e) {
              t(e.currentTarget).removeClass("ui-state-hover");
            },
          });
      },
      _focusable: function (e) {
        (this.focusable = this.focusable.add(e)),
          this._on(e, {
            focusin: function (e) {
              t(e.currentTarget).addClass("ui-state-focus");
            },
            focusout: function (e) {
              t(e.currentTarget).removeClass("ui-state-focus");
            },
          });
      },
      _trigger: function (e, i, s) {
        var n,
          o,
          a = this.options[e];
        if (
          ((s = s || {}),
          (i = t.Event(i)),
          (i.type = (
            e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e
          ).toLowerCase()),
          (i.target = this.element[0]),
          (o = i.originalEvent))
        )
          for (n in o) n in i || (i[n] = o[n]);
        return (
          this.element.trigger(i, s),
          !(
            (t.isFunction(a) &&
              a.apply(this.element[0], [i].concat(s)) === !1) ||
            i.isDefaultPrevented()
          )
        );
      },
    }),
    t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) {
      t.Widget.prototype["_" + e] = function (s, n, o) {
        "string" == typeof n && (n = { effect: n });
        var a,
          r = n ? (n === !0 || "number" == typeof n ? i : n.effect || i) : e;
        (n = n || {}),
          "number" == typeof n && (n = { duration: n }),
          (a = !t.isEmptyObject(n)),
          (n.complete = o),
          n.delay && s.delay(n.delay),
          a && t.effects && t.effects.effect[r]
            ? s[e](n)
            : r !== e && s[r]
            ? s[r](n.duration, n.easing, o)
            : s.queue(function (i) {
                t(this)[e](), o && o.call(s[0]), i();
              });
      };
    });
})(jQuery);
(function (t) {
  var e = !1;
  t(document).mouseup(function () {
    e = !1;
  }),
    t.widget("ui.mouse", {
      version: "1.10.4",
      options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0,
      },
      _mouseInit: function () {
        var e = this;
        this.element
          .bind("mousedown." + this.widgetName, function (t) {
            return e._mouseDown(t);
          })
          .bind("click." + this.widgetName, function (i) {
            return !0 === t.data(i.target, e.widgetName + ".preventClickEvent")
              ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"),
                i.stopImmediatePropagation(),
                !1)
              : undefined;
          }),
          (this.started = !1);
      },
      _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName),
          this._mouseMoveDelegate &&
            t(document)
              .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function (i) {
        if (!e) {
          this._mouseStarted && this._mouseUp(i), (this._mouseDownEvent = i);
          var s = this,
            n = 1 === i.which,
            a =
              "string" == typeof this.options.cancel && i.target.nodeName
                ? t(i.target).closest(this.options.cancel).length
                : !1;
          return n && !a && this._mouseCapture(i)
            ? ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  s.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(i) &&
              this._mouseDelayMet(i) &&
              ((this._mouseStarted = this._mouseStart(i) !== !1),
              !this._mouseStarted)
                ? (i.preventDefault(), !0)
                : (!0 ===
                    t.data(i.target, this.widgetName + ".preventClickEvent") &&
                    t.removeData(
                      i.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function (t) {
                    return s._mouseMove(t);
                  }),
                  (this._mouseUpDelegate = function (t) {
                    return s._mouseUp(t);
                  }),
                  t(document)
                    .bind(
                      "mousemove." + this.widgetName,
                      this._mouseMoveDelegate
                    )
                    .bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                  i.preventDefault(),
                  (e = !0),
                  !0))
            : !0;
        }
      },
      _mouseMove: function (e) {
        return t.ui.ie &&
          (!document.documentMode || 9 > document.documentMode) &&
          !e.button
          ? this._mouseUp(e)
          : this._mouseStarted
          ? (this._mouseDrag(e), e.preventDefault())
          : (this._mouseDistanceMet(e) &&
              this._mouseDelayMet(e) &&
              ((this._mouseStarted =
                this._mouseStart(this._mouseDownEvent, e) !== !1),
              this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
            !this._mouseStarted);
      },
      _mouseUp: function (e) {
        return (
          t(document)
            .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            e.target === this._mouseDownEvent.target &&
              t.data(e.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(e)),
          !1
        );
      },
      _mouseDistanceMet: function (t) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - t.pageX),
            Math.abs(this._mouseDownEvent.pageY - t.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet;
      },
      _mouseStart: function () {},
      _mouseDrag: function () {},
      _mouseStop: function () {},
      _mouseCapture: function () {
        return !0;
      },
    });
})(jQuery);
(function (t) {
  var e = 5;
  t.widget("ui.slider", t.ui.mouse, {
    version: "1.10.4",
    widgetEventPrefix: "slide",
    options: {
      animate: !1,
      distance: 0,
      max: 100,
      min: 0,
      orientation: "horizontal",
      range: !1,
      step: 1,
      value: 0,
      values: null,
      change: null,
      slide: null,
      start: null,
      stop: null,
    },
    _create: function () {
      (this._keySliding = !1),
        (this._mouseSliding = !1),
        (this._animateOff = !0),
        (this._handleIndex = null),
        this._detectOrientation(),
        this._mouseInit(),
        this.element.addClass(
          "ui-slider ui-slider-" +
            this.orientation +
            " ui-widget" +
            " ui-widget-content" +
            " ui-corner-all"
        ),
        this._refresh(),
        this._setOption("disabled", this.options.disabled),
        (this._animateOff = !1);
    },
    _refresh: function () {
      this._createRange(),
        this._createHandles(),
        this._setupEvents(),
        this._refreshValue();
    },
    _createHandles: function () {
      var e,
        i,
        s = this.options,
        n = this.element
          .find(".ui-slider-handle")
          .addClass("ui-state-default ui-corner-all"),
        a =
          "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
        o = [];
      for (
        i = (s.values && s.values.length) || 1,
          n.length > i && (n.slice(i).remove(), (n = n.slice(0, i))),
          e = n.length;
        i > e;
        e++
      )
        o.push(a);
      (this.handles = n.add(t(o.join("")).appendTo(this.element))),
        (this.handle = this.handles.eq(0)),
        this.handles.each(function (e) {
          t(this).data("ui-slider-handle-index", e);
        });
    },
    _createRange: function () {
      var e = this.options,
        i = "";
      e.range
        ? (e.range === !0 &&
            (e.values
              ? e.values.length && 2 !== e.values.length
                ? (e.values = [e.values[0], e.values[0]])
                : t.isArray(e.values) && (e.values = e.values.slice(0))
              : (e.values = [this._valueMin(), this._valueMin()])),
          this.range && this.range.length
            ? this.range
                .removeClass("ui-slider-range-min ui-slider-range-max")
                .css({ left: "", bottom: "" })
            : ((this.range = t("<div></div>").appendTo(this.element)),
              (i = "ui-slider-range ui-widget-header ui-corner-all")),
          this.range.addClass(
            i +
              ("min" === e.range || "max" === e.range
                ? " ui-slider-range-" + e.range
                : "")
          ))
        : (this.range && this.range.remove(), (this.range = null));
    },
    _setupEvents: function () {
      var t = this.handles.add(this.range).filter("a");
      this._off(t),
        this._on(t, this._handleEvents),
        this._hoverable(t),
        this._focusable(t);
    },
    _destroy: function () {
      this.handles.remove(),
        this.range && this.range.remove(),
        this.element.removeClass(
          "ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"
        ),
        this._mouseDestroy();
    },
    _mouseCapture: function (e) {
      var i,
        s,
        n,
        a,
        o,
        r,
        l,
        h,
        u = this,
        c = this.options;
      return c.disabled
        ? !1
        : ((this.elementSize = {
            width: this.element.outerWidth(),
            height: this.element.outerHeight(),
          }),
          (this.elementOffset = this.element.offset()),
          (i = { x: e.pageX, y: e.pageY }),
          (s = this._normValueFromMouse(i)),
          (n = this._valueMax() - this._valueMin() + 1),
          this.handles.each(function (e) {
            var i = Math.abs(s - u.values(e));
            (n > i ||
              (n === i &&
                (e === u._lastChangedValue || u.values(e) === c.min))) &&
              ((n = i), (a = t(this)), (o = e));
          }),
          (r = this._start(e, o)),
          r === !1
            ? !1
            : ((this._mouseSliding = !0),
              (this._handleIndex = o),
              a.addClass("ui-state-active").focus(),
              (l = a.offset()),
              (h = !t(e.target).parents().addBack().is(".ui-slider-handle")),
              (this._clickOffset = h
                ? { left: 0, top: 0 }
                : {
                    left: e.pageX - l.left - a.width() / 2,
                    top:
                      e.pageY -
                      l.top -
                      a.height() / 2 -
                      (parseInt(a.css("borderTopWidth"), 10) || 0) -
                      (parseInt(a.css("borderBottomWidth"), 10) || 0) +
                      (parseInt(a.css("marginTop"), 10) || 0),
                  }),
              this.handles.hasClass("ui-state-hover") || this._slide(e, o, s),
              (this._animateOff = !0),
              !0));
    },
    _mouseStart: function () {
      return !0;
    },
    _mouseDrag: function (t) {
      var e = { x: t.pageX, y: t.pageY },
        i = this._normValueFromMouse(e);
      return this._slide(t, this._handleIndex, i), !1;
    },
    _mouseStop: function (t) {
      return (
        this.handles.removeClass("ui-state-active"),
        (this._mouseSliding = !1),
        this._stop(t, this._handleIndex),
        this._change(t, this._handleIndex),
        (this._handleIndex = null),
        (this._clickOffset = null),
        (this._animateOff = !1),
        !1
      );
    },
    _detectOrientation: function () {
      this.orientation =
        "vertical" === this.options.orientation ? "vertical" : "horizontal";
    },
    _normValueFromMouse: function (t) {
      var e, i, s, n, a;
      return (
        "horizontal" === this.orientation
          ? ((e = this.elementSize.width),
            (i =
              t.x -
              this.elementOffset.left -
              (this._clickOffset ? this._clickOffset.left : 0)))
          : ((e = this.elementSize.height),
            (i =
              t.y -
              this.elementOffset.top -
              (this._clickOffset ? this._clickOffset.top : 0))),
        (s = i / e),
        s > 1 && (s = 1),
        0 > s && (s = 0),
        "vertical" === this.orientation && (s = 1 - s),
        (n = this._valueMax() - this._valueMin()),
        (a = this._valueMin() + s * n),
        this._trimAlignValue(a)
      );
    },
    _start: function (t, e) {
      var i = { handle: this.handles[e], value: this.value() };
      return (
        this.options.values &&
          this.options.values.length &&
          ((i.value = this.values(e)), (i.values = this.values())),
        this._trigger("start", t, i)
      );
    },
    _slide: function (t, e, i) {
      var s, n, a;
      this.options.values && this.options.values.length
        ? ((s = this.values(e ? 0 : 1)),
          2 === this.options.values.length &&
            this.options.range === !0 &&
            ((0 === e && i > s) || (1 === e && s > i)) &&
            (i = s),
          i !== this.values(e) &&
            ((n = this.values()),
            (n[e] = i),
            (a = this._trigger("slide", t, {
              handle: this.handles[e],
              value: i,
              values: n,
            })),
            (s = this.values(e ? 0 : 1)),
            a !== !1 && this.values(e, i)))
        : i !== this.value() &&
          ((a = this._trigger("slide", t, {
            handle: this.handles[e],
            value: i,
          })),
          a !== !1 && this.value(i));
    },
    _stop: function (t, e) {
      var i = { handle: this.handles[e], value: this.value() };
      this.options.values &&
        this.options.values.length &&
        ((i.value = this.values(e)), (i.values = this.values())),
        this._trigger("stop", t, i);
    },
    _change: function (t, e) {
      if (!this._keySliding && !this._mouseSliding) {
        var i = { handle: this.handles[e], value: this.value() };
        this.options.values &&
          this.options.values.length &&
          ((i.value = this.values(e)), (i.values = this.values())),
          (this._lastChangedValue = e),
          this._trigger("change", t, i);
      }
    },
    value: function (t) {
      return arguments.length
        ? ((this.options.value = this._trimAlignValue(t)),
          this._refreshValue(),
          this._change(null, 0),
          undefined)
        : this._value();
    },
    values: function (e, i) {
      var s, n, a;
      if (arguments.length > 1)
        return (
          (this.options.values[e] = this._trimAlignValue(i)),
          this._refreshValue(),
          this._change(null, e),
          undefined
        );
      if (!arguments.length) return this._values();
      if (!t.isArray(arguments[0]))
        return this.options.values && this.options.values.length
          ? this._values(e)
          : this.value();
      for (
        s = this.options.values, n = arguments[0], a = 0;
        s.length > a;
        a += 1
      )
        (s[a] = this._trimAlignValue(n[a])), this._change(null, a);
      this._refreshValue();
    },
    _setOption: function (e, i) {
      var s,
        n = 0;
      switch (
        ("range" === e &&
          this.options.range === !0 &&
          ("min" === i
            ? ((this.options.value = this._values(0)),
              (this.options.values = null))
            : "max" === i &&
              ((this.options.value = this._values(
                this.options.values.length - 1
              )),
              (this.options.values = null))),
        t.isArray(this.options.values) && (n = this.options.values.length),
        t.Widget.prototype._setOption.apply(this, arguments),
        e)
      ) {
        case "orientation":
          this._detectOrientation(),
            this.element
              .removeClass("ui-slider-horizontal ui-slider-vertical")
              .addClass("ui-slider-" + this.orientation),
            this._refreshValue();
          break;
        case "value":
          (this._animateOff = !0),
            this._refreshValue(),
            this._change(null, 0),
            (this._animateOff = !1);
          break;
        case "values":
          for (
            this._animateOff = !0, this._refreshValue(), s = 0;
            n > s;
            s += 1
          )
            this._change(null, s);
          this._animateOff = !1;
          break;
        case "min":
        case "max":
          (this._animateOff = !0),
            this._refreshValue(),
            (this._animateOff = !1);
          break;
        case "range":
          (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
      }
    },
    _value: function () {
      var t = this.options.value;
      return (t = this._trimAlignValue(t));
    },
    _values: function (t) {
      var e, i, s;
      if (arguments.length)
        return (e = this.options.values[t]), (e = this._trimAlignValue(e));
      if (this.options.values && this.options.values.length) {
        for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)
          i[s] = this._trimAlignValue(i[s]);
        return i;
      }
      return [];
    },
    _trimAlignValue: function (t) {
      if (this._valueMin() >= t) return this._valueMin();
      if (t >= this._valueMax()) return this._valueMax();
      var e = this.options.step > 0 ? this.options.step : 1,
        i = (t - this._valueMin()) % e,
        s = t - i;
      return (
        2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5))
      );
    },
    _valueMin: function () {
      return this.options.min;
    },
    _valueMax: function () {
      return this.options.max;
    },
    _refreshValue: function () {
      var e,
        i,
        s,
        n,
        a,
        o = this.options.range,
        r = this.options,
        l = this,
        h = this._animateOff ? !1 : r.animate,
        u = {};
      this.options.values && this.options.values.length
        ? this.handles.each(function (s) {
            (i =
              100 *
              ((l.values(s) - l._valueMin()) /
                (l._valueMax() - l._valueMin()))),
              (u["horizontal" === l.orientation ? "left" : "bottom"] = i + "%"),
              t(this).stop(1, 1)[h ? "animate" : "css"](u, r.animate),
              l.options.range === !0 &&
                ("horizontal" === l.orientation
                  ? (0 === s &&
                      l.range
                        .stop(1, 1)
                        [h ? "animate" : "css"]({ left: i + "%" }, r.animate),
                    1 === s &&
                      l.range[h ? "animate" : "css"](
                        { width: i - e + "%" },
                        { queue: !1, duration: r.animate }
                      ))
                  : (0 === s &&
                      l.range
                        .stop(1, 1)
                        [h ? "animate" : "css"]({ bottom: i + "%" }, r.animate),
                    1 === s &&
                      l.range[h ? "animate" : "css"](
                        { height: i - e + "%" },
                        { queue: !1, duration: r.animate }
                      ))),
              (e = i);
          })
        : ((s = this.value()),
          (n = this._valueMin()),
          (a = this._valueMax()),
          (i = a !== n ? 100 * ((s - n) / (a - n)) : 0),
          (u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%"),
          this.handle.stop(1, 1)[h ? "animate" : "css"](u, r.animate),
          "min" === o &&
            "horizontal" === this.orientation &&
            this.range
              .stop(1, 1)
              [h ? "animate" : "css"]({ width: i + "%" }, r.animate),
          "max" === o &&
            "horizontal" === this.orientation &&
            this.range[h ? "animate" : "css"](
              { width: 100 - i + "%" },
              { queue: !1, duration: r.animate }
            ),
          "min" === o &&
            "vertical" === this.orientation &&
            this.range
              .stop(1, 1)
              [h ? "animate" : "css"]({ height: i + "%" }, r.animate),
          "max" === o &&
            "vertical" === this.orientation &&
            this.range[h ? "animate" : "css"](
              { height: 100 - i + "%" },
              { queue: !1, duration: r.animate }
            ));
    },
    _handleEvents: {
      keydown: function (i) {
        var s,
          n,
          a,
          o,
          r = t(i.target).data("ui-slider-handle-index");
        switch (i.keyCode) {
          case t.ui.keyCode.HOME:
          case t.ui.keyCode.END:
          case t.ui.keyCode.PAGE_UP:
          case t.ui.keyCode.PAGE_DOWN:
          case t.ui.keyCode.UP:
          case t.ui.keyCode.RIGHT:
          case t.ui.keyCode.DOWN:
          case t.ui.keyCode.LEFT:
            if (
              (i.preventDefault(),
              !this._keySliding &&
                ((this._keySliding = !0),
                t(i.target).addClass("ui-state-active"),
                (s = this._start(i, r)),
                s === !1))
            )
              return;
        }
        switch (
          ((o = this.options.step),
          (n = a =
            this.options.values && this.options.values.length
              ? this.values(r)
              : this.value()),
          i.keyCode)
        ) {
          case t.ui.keyCode.HOME:
            a = this._valueMin();
            break;
          case t.ui.keyCode.END:
            a = this._valueMax();
            break;
          case t.ui.keyCode.PAGE_UP:
            a = this._trimAlignValue(
              n + (this._valueMax() - this._valueMin()) / e
            );
            break;
          case t.ui.keyCode.PAGE_DOWN:
            a = this._trimAlignValue(
              n - (this._valueMax() - this._valueMin()) / e
            );
            break;
          case t.ui.keyCode.UP:
          case t.ui.keyCode.RIGHT:
            if (n === this._valueMax()) return;
            a = this._trimAlignValue(n + o);
            break;
          case t.ui.keyCode.DOWN:
          case t.ui.keyCode.LEFT:
            if (n === this._valueMin()) return;
            a = this._trimAlignValue(n - o);
        }
        this._slide(i, r, a);
      },
      click: function (t) {
        t.preventDefault();
      },
      keyup: function (e) {
        var i = t(e.target).data("ui-slider-handle-index");
        this._keySliding &&
          ((this._keySliding = !1),
          this._stop(e, i),
          this._change(e, i),
          t(e.target).removeClass("ui-state-active"));
      },
    },
  });
})(jQuery);

/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!(function (a) {
  function f(a, b) {
    if (!(a.originalEvent.touches.length > 1)) {
      a.preventDefault();
      var c = a.originalEvent.changedTouches[0],
        d = document.createEvent("MouseEvents");
      d.initMouseEvent(
        b,
        !0,
        !0,
        window,
        1,
        c.screenX,
        c.screenY,
        c.clientX,
        c.clientY,
        !1,
        !1,
        !1,
        !1,
        0,
        null
      ),
        a.target.dispatchEvent(d);
    }
  }
  if (((a.support.touch = "ontouchend" in document), a.support.touch)) {
    var e,
      b = a.ui.mouse.prototype,
      c = b._mouseInit,
      d = b._mouseDestroy;
    (b._touchStart = function (a) {
      var b = this;
      !e &&
        b._mouseCapture(a.originalEvent.changedTouches[0]) &&
        ((e = !0),
        (b._touchMoved = !1),
        f(a, "mouseover"),
        f(a, "mousemove"),
        f(a, "mousedown"));
    }),
      (b._touchMove = function (a) {
        e && ((this._touchMoved = !0), f(a, "mousemove"));
      }),
      (b._touchEnd = function (a) {
        e &&
          (f(a, "mouseup"),
          f(a, "mouseout"),
          this._touchMoved || f(a, "click"),
          (e = !1));
      }),
      (b._mouseInit = function () {
        var b = this;
        b.element.bind({
          touchstart: a.proxy(b, "_touchStart"),
          touchmove: a.proxy(b, "_touchMove"),
          touchend: a.proxy(b, "_touchEnd"),
        }),
          c.call(b);
      }),
      (b._mouseDestroy = function () {
        var b = this;
        b.element.unbind({
          touchstart: a.proxy(b, "_touchStart"),
          touchmove: a.proxy(b, "_touchMove"),
          touchend: a.proxy(b, "_touchEnd"),
        }),
          d.call(b);
      });
  }
})(jQuery);

/*!
 * selectivizr v1.0.2 - (c) Keith Clark, freely distributable under the terms of the MIT license.
 * selectivizr.com
 */
(function (j) {
  function A(a) {
    return a.replace(B, h).replace(C, function (a, d, b) {
      for (var a = b.split(","), b = 0, e = a.length; b < e; b++) {
        var s = D(a[b].replace(E, h).replace(F, h)) + o,
          l = [];
        a[b] = s.replace(G, function (a, b, c, d, e) {
          if (b) {
            if (l.length > 0) {
              var a = l,
                f,
                e = s.substring(0, e).replace(H, i);
              if (e == i || e.charAt(e.length - 1) == o) e += "*";
              try {
                f = t(e);
              } catch (k) {}
              if (f) {
                e = 0;
                for (c = f.length; e < c; e++) {
                  for (
                    var d = f[e], h = d.className, j = 0, m = a.length;
                    j < m;
                    j++
                  ) {
                    var g = a[j];
                    if (
                      !RegExp("(^|\\s)" + g.className + "(\\s|$)").test(
                        d.className
                      ) &&
                      g.b &&
                      (g.b === !0 || g.b(d) === !0)
                    )
                      h = u(h, g.className, !0);
                  }
                  d.className = h;
                }
              }
              l = [];
            }
            return b;
          } else {
            if (
              (b = c
                ? I(c)
                : !v || v.test(d)
                ? { className: w(d), b: !0 }
                : null)
            )
              return l.push(b), "." + b.className;
            return a;
          }
        });
      }
      return d + a.join(",");
    });
  }
  function I(a) {
    var c = !0,
      d = w(a.slice(1)),
      b = a.substring(0, 5) == ":not(",
      e,
      f;
    b && (a = a.slice(5, -1));
    var l = a.indexOf("(");
    l > -1 && (a = a.substring(0, l));
    if (a.charAt(0) == ":")
      switch (a.slice(1)) {
        case "root":
          c = function (a) {
            return b ? a != p : a == p;
          };
          break;
        case "target":
          if (m == 8) {
            c = function (a) {
              function c() {
                var d = location.hash,
                  e = d.slice(1);
                return b ? d == i || a.id != e : d != i && a.id == e;
              }
              k(j, "hashchange", function () {
                g(a, d, c());
              });
              return c();
            };
            break;
          }
          return !1;
        case "checked":
          c = function (a) {
            J.test(a.type) &&
              k(a, "propertychange", function () {
                event.propertyName == "checked" && g(a, d, a.checked !== b);
              });
            return a.checked !== b;
          };
          break;
        case "disabled":
          b = !b;
        case "enabled":
          c = function (c) {
            if (K.test(c.tagName))
              return (
                k(c, "propertychange", function () {
                  event.propertyName == "$disabled" && g(c, d, c.a === b);
                }),
                q.push(c),
                (c.a = c.disabled),
                c.disabled === b
              );
            return a == ":enabled" ? b : !b;
          };
          break;
        case "focus":
          (e = "focus"), (f = "blur");
        case "hover":
          e || ((e = "mouseenter"), (f = "mouseleave"));
          c = function (a) {
            k(a, b ? f : e, function () {
              g(a, d, !0);
            });
            k(a, b ? e : f, function () {
              g(a, d, !1);
            });
            return b;
          };
          break;
        default:
          if (!L.test(a)) return !1;
      }
    return { className: d, b: c };
  }
  function w(a) {
    return (
      M +
      "-" +
      (m == 6 && N
        ? O++
        : a.replace(P, function (a) {
            return a.charCodeAt(0);
          }))
    );
  }
  function D(a) {
    return a.replace(x, h).replace(Q, o);
  }
  function g(a, c, d) {
    var b = a.className,
      c = u(b, c, d);
    if (c != b) (a.className = c), (a.parentNode.className += i);
  }
  function u(a, c, d) {
    var b = RegExp("(^|\\s)" + c + "(\\s|$)"),
      e = b.test(a);
    return d ? (e ? a : a + o + c) : e ? a.replace(b, h).replace(x, h) : a;
  }
  function k(a, c, d) {
    a.attachEvent("on" + c, d);
  }
  function r(a, c) {
    if (/^https?:\/\//i.test(a))
      return c.substring(0, c.indexOf("/", 8)) ==
        a.substring(0, a.indexOf("/", 8))
        ? a
        : null;
    if (a.charAt(0) == "/") return c.substring(0, c.indexOf("/", 8)) + a;
    var d = c.split(/[?#]/)[0];
    a.charAt(0) != "?" &&
      d.charAt(d.length - 1) != "/" &&
      (d = d.substring(0, d.lastIndexOf("/") + 1));
    return d + a;
  }
  function y(a) {
    if (a)
      return (
        n.open("GET", a, !1),
        n.send(),
        (n.status == 200 ? n.responseText : i)
          .replace(R, i)
          .replace(S, function (c, d, b, e, f) {
            return y(r(b || f, a));
          })
          .replace(T, function (c, d, b) {
            d = d || i;
            return " url(" + d + r(b, a) + d + ") ";
          })
      );
    return i;
  }
  function U() {
    var a, c;
    a = f.getElementsByTagName("BASE");
    for (
      var d = a.length > 0 ? a[0].href : f.location.href, b = 0;
      b < f.styleSheets.length;
      b++
    )
      if (((c = f.styleSheets[b]), c.href != i && (a = r(c.href, d))))
        c.cssText = A(y(a));
    q.length > 0 &&
      setInterval(function () {
        for (var a = 0, c = q.length; a < c; a++) {
          var b = q[a];
          if (b.disabled !== b.a)
            b.disabled
              ? ((b.disabled = !1), (b.a = !0), (b.disabled = !0))
              : (b.a = b.disabled);
        }
      }, 250);
  }
  if (!(/*@cc_on!@*/ true)) {
    var f = document,
      p = f.documentElement,
      n = (function () {
        if (j.XMLHttpRequest) return new XMLHttpRequest();
        try {
          return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (a) {
          return null;
        }
      })(),
      m = /MSIE (\d+)/.exec(navigator.userAgent)[1];
    if (!(f.compatMode != "CSS1Compat" || m < 6 || m > 8 || !n)) {
      var z = {
          NW: "*.Dom.select",
          MooTools: "$$",
          DOMAssistant: "*.$",
          Prototype: "$$",
          YAHOO: "*.util.Selector.query",
          Sizzle: "*",
          jQuery: "*",
          dojo: "*.query",
        },
        t,
        q = [],
        O = 0,
        N = !0,
        M = "slvzr",
        R = /(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*/g,
        S =
          /@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))[^;]*;/g,
        T = /\burl\(\s*(["']?)(?!data:)([^"')]+)\1\s*\)/g,
        L = /^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/,
        B = /:(:first-(?:line|letter))/g,
        C = /(^|})\s*([^\{]*?[\[:][^{]+)/g,
        G = /([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g,
        H =
          /(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g,
        P = /[^\w-]/g,
        K = /^(INPUT|SELECT|TEXTAREA|BUTTON)$/,
        J = /^(checkbox|radio)$/,
        v = m > 6 ? /[\$\^*]=(['"])\1/ : null,
        E = /([(\[+~])\s+/g,
        F = /\s+([)\]+~])/g,
        Q = /\s+/g,
        x = /^\s*((?:[\S\s]*\S)?)\s*$/,
        i = "",
        o = " ",
        h = "$1";
      (function (a, c) {
        function d() {
          try {
            p.doScroll("left");
          } catch (a) {
            setTimeout(d, 50);
            return;
          }
          b("poll");
        }
        function b(d) {
          if (
            !(d.type == "readystatechange" && f.readyState != "complete") &&
            ((d.type == "load" ? a : f).detachEvent("on" + d.type, b, !1),
            !e && (e = !0))
          )
            c.call(a, d.type || d);
        }
        var e = !1,
          g = !0;
        if (f.readyState == "complete") c.call(a, i);
        else {
          if (f.createEventObject && p.doScroll) {
            try {
              g = !a.frameElement;
            } catch (h) {}
            g && d();
          }
          k(f, "readystatechange", b);
          k(a, "load", b);
        }
      })(j, function () {
        for (var a in z) {
          var c,
            d,
            b = j;
          if (j[a]) {
            for (
              c = z[a].replace("*", a).split(".");
              (d = c.shift()) && (b = b[d]);

            );
            if (typeof b == "function") {
              t = b;
              U();
              break;
            }
          }
        }
      });
    }
  }
})(this);
