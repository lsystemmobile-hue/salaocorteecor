(function () {
  "use strict";

  const content = window.salaoContent;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector("#site-nav");

  function firstName(name) {
    const cleaned = name.replace(/[♥♪]/g, "").trim();
    return cleaned.split(/\s+/)[0] || "Cliente";
  }

  function updateHeader() {
    if (header) header.classList.toggle("is-stuck", window.scrollY > 36);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const hero = document.querySelector("#inicio");
  const finalCta = document.querySelector("#final-cta");
  const siteFooter = document.querySelector(".site-footer");
  const floatingBooking = document.querySelector("[data-floating-booking]");
  if (hero && floatingBooking) {
    const setFloatingVisibility = function (visible) {
      floatingBooking.classList.toggle("is-visible", visible);
    };
    if ("IntersectionObserver" in window) {
      const visibility = { hero: true, finalCta: false, footer: false };
      const updateFloatingVisibility = function () {
        setFloatingVisibility(!visibility.hero && !visibility.finalCta && !visibility.footer);
      };
      const floatingObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.target === hero) visibility.hero = entry.isIntersecting;
          if (entry.target === finalCta) visibility.finalCta = entry.isIntersecting;
          if (entry.target === siteFooter) visibility.footer = entry.isIntersecting;
        });
        updateFloatingVisibility();
      }, { threshold: 0 });
      floatingObserver.observe(hero);
      if (finalCta) floatingObserver.observe(finalCta);
      if (siteFooter) floatingObserver.observe(siteFooter);
    } else {
      const syncFloatingVisibility = function () {
        const finalCtaVisible = finalCta && finalCta.getBoundingClientRect().top < window.innerHeight && finalCta.getBoundingClientRect().bottom > 0;
        const footerVisible = siteFooter && siteFooter.getBoundingClientRect().top < window.innerHeight && siteFooter.getBoundingClientRect().bottom > 0;
        setFloatingVisibility(window.scrollY > hero.offsetHeight - 8 && !finalCtaVisible && !footerVisible);
      };
      window.addEventListener("scroll", syncFloatingVisibility, { passive: true });
      syncFloatingVisibility();
    }
  }

  const heroDeck = document.querySelector("[data-hero-deck]");
  const heroCards = heroDeck ? Array.from(heroDeck.querySelectorAll("[data-hero-card]")) : [];
  const heroServiceOrder = ["Ddwrv7ZIKLT", "DeN2fFHoJHp", "DdeOWFoIESN", "DdKYQlCoOpx", "DdpdXF6IPko"];
  const heroServices = Array.isArray(content?.gallery)
    ? heroServiceOrder.map(function (id) {
        return content.gallery.find(function (group) { return group.id === id; });
      }).filter(function (group) { return group?.images?.[0]; })
    : [];

  if (heroDeck && heroCards.length === 5 && heroServices.length === 5) {
    let cardOrder = heroCards.slice();
    let nextHeroIndex = 0;
    let heroDelay = null;
    let heroTween = null;
    let heroPaused = false;
    let heroAnimating = false;
    const heroRotationDelay = 1500;
    const compactHeroMotion = window.matchMedia("(max-width: 760px)").matches;
    const heroFan = compactHeroMotion
      ? { x: [-32, -16, 0, 16, 32], rotation: [-10, -5, 0, 5, 10], scale: [.93, .97, 1, .97, .93], opacity: [.66, .86, 1, .86, .66], zIndex: [1, 2, 5, 3, 1] }
      : { x: [-50, -25, 0, 25, 50], rotation: [-16, -8, 0, 8, 16], scale: [.93, .97, 1, .97, .93], opacity: [.66, .86, 1, .86, .66], zIndex: [1, 2, 5, 3, 1] };

    const preloadHeroImages = function () {
      heroServices.forEach(function (group) {
        const preload = new Image();
        preload.src = group.images[0].src;
      });
    };

    const updateHeroAccessibility = function () {
      cardOrder.forEach(function (card, position) {
        card.setAttribute("aria-hidden", String(position !== 1));
        card.classList.toggle("is-center", position === 1);
      });
      heroDeck.setAttribute("aria-label", `Destaque de ${cardOrder[2].alt.replace(" no Salão Corte E Cor", "")}`);
    };

    const setHeroContent = function (card, index) {
      const image = heroServices[index].images[0];
      card.src = image.src;
      card.alt = image.alt;
      card.loading = "eager";
      card.decoding = "async";
      if (card === cardOrder[2]) card.setAttribute("fetchpriority", "high");
      else card.removeAttribute("fetchpriority");
    };

    const setFanPosition = function (card, position, immediate) {
      const properties = {
        x: heroFan.x[position],
        rotation: heroFan.rotation[position],
        scale: heroFan.scale[position],
        autoAlpha: heroFan.opacity[position],
        zIndex: heroFan.zIndex[position]
      };
      if (immediate) gsap.set(card, properties);
      else gsap.to(card, { ...properties, duration: .5, ease: "back.out(1.4)", overwrite: "auto" });
    };

    const setFanInstant = function () {
      cardOrder.forEach(function (card, position) { setFanPosition(card, position, true); });
      updateHeroAccessibility();
    };

    const clearHeroDelay = function () {
      if (heroDelay) heroDelay.kill();
      heroDelay = null;
    };

    const scheduleHeroRotation = function () {
      clearHeroDelay();
      if (!heroPaused && !document.hidden && window.gsap) heroDelay = gsap.delayedCall(heroRotationDelay / 1000, rotateHero);
    };

    const rotateHero = function () {
      if (heroPaused || heroAnimating || document.hidden || !window.gsap) return;
      heroAnimating = true;
      const incomingIndex = nextHeroIndex;
      nextHeroIndex = (nextHeroIndex + 1) % heroServices.length;
      heroTween = gsap.timeline({
        defaults: { overwrite: "auto" },
        onComplete: function () {
          const oldLeftCard = cardOrder[0];
          cardOrder = cardOrder.slice(1).concat(oldLeftCard);
          setHeroContent(oldLeftCard, incomingIndex);
          setFanInstant();
          heroAnimating = false;
          heroTween = null;
          scheduleHeroRotation();
        }
      });
      cardOrder.forEach(function (card, position) {
        const nextPosition = position === 0 ? heroFan.x.length - 1 : position - 1;
        heroTween.to(card, {
          x: heroFan.x[nextPosition],
          rotation: heroFan.rotation[nextPosition],
          scale: heroFan.scale[nextPosition],
          autoAlpha: heroFan.opacity[nextPosition],
          zIndex: heroFan.zIndex[nextPosition],
          duration: .5,
          ease: "back.out(1.4)"
        }, 0);
      });
    };

    const pauseHeroRotation = function () {
      heroPaused = true;
      clearHeroDelay();
      if (heroTween && heroAnimating) heroTween.pause();
    };

    const resumeHeroRotation = function () {
      heroPaused = false;
      if (heroTween && heroAnimating) heroTween.resume();
      else scheduleHeroRotation();
    };

    cardOrder.forEach(function (card, index) { setHeroContent(card, index); });
    if (!reduceMotion && window.gsap) {
      setFanInstant();
      heroDeck.addEventListener("mouseenter", pauseHeroRotation);
      heroDeck.addEventListener("mouseleave", resumeHeroRotation);
      heroDeck.addEventListener("focusin", pauseHeroRotation);
      heroDeck.addEventListener("focusout", function (event) {
        if (!heroDeck.contains(event.relatedTarget)) resumeHeroRotation();
      });
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) pauseHeroRotation();
        else resumeHeroRotation();
      });
      scheduleHeroRotation();
    } else {
      if (window.gsap) setFanInstant();
      else updateHeroAccessibility();
    }
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      siteNav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.setAttribute("aria-expanded", "false");
        siteNav.classList.remove("is-open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  const whatsappIconPaths = '<path d="M20.4 11.6a8.4 8.4 0 0 1-12.3 7.5L4 20l1-4a8.4 8.4 0 1 1 15.4-4.4Z"></path><path d="M9 8.2c.3-.3.7-.2.9.1l1.1 1.7c.2.3.1.6-.1.8l-.6.5c.5 1 1.2 1.7 2.3 2.2l.5-.6c.2-.3.6-.3.9-.1l1.7 1c.3.2.4.6.1.9l-.5.6c-.4.5-1 .7-1.6.5-2.5-.8-4.4-2.7-5.3-5.2-.2-.6 0-1.2.4-1.6Z"></path>';
  document.querySelectorAll(".service-booking .whatsapp-icon").forEach(function (icon) {
    icon.innerHTML = whatsappIconPaths;
  });

  function stars(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }

  const reviewCarousel = document.querySelector("#reviews-carousel");

  if (content && reviewCarousel) {
    reviewCarousel.innerHTML = "";
    const featuredReviews = content.reviews.filter(function (review) { return review.featured; });
    const reviewsToShow = (featuredReviews.length ? featuredReviews : content.reviews.filter(function (review) { return review.text && !review.text.startsWith("Sem texto"); })).slice(0, 6);
    const track = document.createElement("div");
    track.className = "reviews-track";

    function createReviewSet() {
      const set = document.createElement("div");
      set.className = "reviews-set";
      reviewsToShow.forEach(function (review, index) {
        const article = document.createElement("article");
        article.className = "google-review-card";
        const reviewerName = review.name.replace(/[♥♪]/g, "").trim() || "Cliente";
        const avatarClass = ["review-avatar-blue", "review-avatar-gold", "review-avatar-rose"][index % 3];
        const profile = review.profile || "Avaliação pública";
        const sourceUrl = review.sourceUrl || "https://www.google.com/search?q=Sal%C3%A3o+Corte+E+Cor+Cerquilho+SP";
        article.innerHTML = `
          <header class="google-review-head">
            <span class="review-avatar ${avatarClass}">${escapeHTML(firstName(reviewerName).charAt(0).toUpperCase())}</span>
            <div><strong>${escapeHTML(reviewerName)}</strong><span>${escapeHTML(profile)}</span></div>
          </header>
          <div class="google-review-meta">
            <span class="review-stars" aria-label="${escapeHTML(review.rating)} de 5 estrelas">${stars(review.rating)}</span>
            <time>${escapeHTML(review.date)}</time>
          </div>
          <p class="google-review-text">&quot;${escapeHTML(review.text)}&quot;</p>
          <footer class="google-review-foot"><span class="google-verified"><span aria-hidden="true">✓</span> Postado no Google</span><a href="${escapeHTML(sourceUrl)}" target="_blank" rel="noopener">Ver avaliação ↗</a></footer>
        `;
        set.appendChild(article);
      });
      return set;
    }

    track.appendChild(createReviewSet());
    if (!reduceMotion) track.appendChild(createReviewSet());
    reviewCarousel.appendChild(track);
    if (!reduceMotion) reviewCarousel.style.overflowX = "hidden";

    let animationFrame = null;
    let lastFrameTime = 0;
    let offset = 0;
    let loopDistance = 0;
    let isPaused = false;

    const measureLoop = function () {
      const firstSet = track.querySelector(".reviews-set");
      const gap = Number.parseFloat(window.getComputedStyle(track).gap) || 0;
      loopDistance = (firstSet?.getBoundingClientRect().width || 0) + gap;
      if (loopDistance > 0) offset %= loopDistance;
    };
    const animateCarousel = function (timestamp) {
      if (!lastFrameTime) lastFrameTime = timestamp;
      const elapsed = timestamp - lastFrameTime;
      lastFrameTime = timestamp;
      if (!isPaused && loopDistance > 0) {
        offset = (offset + elapsed * .05) % loopDistance;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
      animationFrame = window.requestAnimationFrame(animateCarousel);
    };
    const stopAutoScroll = function () { isPaused = true; };
    const startAutoScroll = function () { isPaused = false; };
    measureLoop();
    window.addEventListener("resize", measureLoop, { passive: true });
    if (!reduceMotion) animationFrame = window.requestAnimationFrame(animateCarousel);
    reviewCarousel.addEventListener("mouseenter", stopAutoScroll);
    reviewCarousel.addEventListener("mouseleave", startAutoScroll);
    reviewCarousel.addEventListener("focusin", stopAutoScroll);
    reviewCarousel.addEventListener("focusout", function (event) {
      if (!reviewCarousel.contains(event.relatedTarget)) startAutoScroll();
    });
    reviewCarousel.addEventListener("pointerdown", stopAutoScroll);
    reviewCarousel.addEventListener("pointerup", startAutoScroll);
    reviewCarousel.addEventListener("pointercancel", startAutoScroll);
  }

  function initFaqAccordion() {
    const items = Array.from(document.querySelectorAll(".faq-content details"));
    if (!items.length) return;

    let isBusy = false;

    const setExpanded = function (item, expanded) {
      item.querySelector("summary")?.setAttribute("aria-expanded", String(expanded));
    };

    const waitForHeightTransition = function (element) {
      if (reduceMotion) return Promise.resolve();
      return new Promise(function (resolve) {
        let finished = false;
        let timeoutId;
        const onTransitionEnd = function (event) {
          if (event.propertyName === "height") finish();
        };
        const finish = function () {
          if (finished) return;
          finished = true;
          window.clearTimeout(timeoutId);
          element.removeEventListener("transitionend", onTransitionEnd);
          resolve();
        };
        element.addEventListener("transitionend", onTransitionEnd);
        timeoutId = window.setTimeout(finish, 450);
      });
    };

    const openFaq = function (item) {
      const answer = item.querySelector(".faq-answer");
      if (!answer) return Promise.resolve();
      item.open = true;
      setExpanded(item, true);
      if (reduceMotion) {
        answer.style.height = "auto";
        answer.style.opacity = "1";
        return Promise.resolve();
      }
      answer.style.height = "0px";
      answer.style.opacity = "0";
      const transition = waitForHeightTransition(answer);
      window.requestAnimationFrame(function () {
        answer.style.height = `${answer.scrollHeight}px`;
        answer.style.opacity = "1";
      });
      return transition.then(function () {
        answer.style.height = "auto";
      });
    };

    const closeFaq = function (item) {
      if (!item) return Promise.resolve();
      const answer = item.querySelector(".faq-answer");
      if (!answer || !item.open) return Promise.resolve();
      setExpanded(item, false);
      if (reduceMotion) {
        item.open = false;
        answer.style.height = "";
        answer.style.opacity = "";
        return Promise.resolve();
      }
      answer.style.height = `${answer.scrollHeight}px`;
      answer.style.opacity = "1";
      const transition = waitForHeightTransition(answer);
      window.requestAnimationFrame(function () {
        answer.style.height = "0px";
        answer.style.opacity = "0";
      });
      return transition.then(function () {
        item.open = false;
        answer.style.height = "";
        answer.style.opacity = "";
      });
    };

    items.forEach(function (item) {
      const answer = item.querySelector(".faq-answer");
      setExpanded(item, item.open);
      if (item.open && answer) {
        answer.style.height = "auto";
        answer.style.opacity = "1";
      }
      item.querySelector("summary")?.addEventListener("click", function (event) {
        event.preventDefault();
        if (isBusy) return;
        isBusy = true;
        const action = item.open
          ? closeFaq(item)
          : closeFaq(items.find(function (entry) { return entry !== item && entry.open; })).then(function () { return openFaq(item); });
        Promise.resolve(action).finally(function () { isBusy = false; });
      });
    });
  }

  initFaqAccordion();

  const bookingDialog = document.querySelector("#booking-dialog");
  const bookingForm = document.querySelector("#booking-form");
  const bookingServices = document.querySelector("#booking-services");
  const bookingPreview = document.querySelector("#booking-preview");
  const bookingTriggers = document.querySelectorAll("[data-booking-trigger]");
  const serviceBookingTriggers = document.querySelectorAll("[data-service-booking]");

  if (content && bookingDialog && bookingForm && bookingServices) {
    content.services.forEach(function (service, index) {
      const id = `booking-service-${index + 1}`;
      const label = document.createElement("label");
      label.className = "booking-option";
      label.setAttribute("for", id);
      label.innerHTML = `
        <input id="${id}" type="checkbox" name="service" value="${escapeHTML(service.name)}">
        <span class="booking-option-mark" aria-hidden="true"></span>
        <span>${escapeHTML(service.name)}</span>
      `;
      bookingServices.appendChild(label);
    });

    const selectedServices = function () {
      return Array.from(bookingServices.querySelectorAll("input:checked")).map(function (input) { return input.value; });
    };

    const updateBookingPreview = function () {
      const selected = selectedServices();
      if (bookingPreview) {
        bookingPreview.textContent = selected.length
          ? `Selecionado${selected.length > 1 ? "s" : ""}: ${selected.join(", ")}.`
          : "Selecione pelo menos um serviço para continuar.";
      }
    };

    const openBooking = function (event) {
      event.preventDefault();
      const requestedService = event.currentTarget.getAttribute("data-service-booking");
      bookingServices.querySelectorAll("input").forEach(function (input) {
        input.checked = requestedService ? input.value === requestedService : false;
      });
      updateBookingPreview();
      if (typeof bookingDialog.showModal === "function") bookingDialog.showModal();
      else bookingDialog.setAttribute("open", "");
      const requestedInput = requestedService
        ? Array.from(bookingServices.querySelectorAll("input")).find(function (input) { return input.value === requestedService; })
        : bookingServices.querySelector("input");
      requestedInput?.focus();
    };

    const closeBooking = function () {
      if (typeof bookingDialog.close === "function" && bookingDialog.open) bookingDialog.close();
      else bookingDialog.removeAttribute("open");
    };

    bookingTriggers.forEach(function (trigger) { trigger.addEventListener("click", openBooking); });
    serviceBookingTriggers.forEach(function (trigger) { trigger.addEventListener("click", openBooking); });
    bookingServices.addEventListener("change", updateBookingPreview);
    document.querySelector("[data-booking-close]")?.addEventListener("click", closeBooking);
    bookingDialog.addEventListener("click", function (event) {
      if (event.target === bookingDialog) closeBooking();
    });
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const selected = selectedServices();
      if (!selected.length) {
        updateBookingPreview();
        bookingServices.querySelector("input")?.focus();
        return;
      }
      const phone = String(content.business.phoneHref || content.business.phone || "").replace(/\D/g, "");
      const message = `Olá, gostaria de agendar um horário para ${selected.join(", ")}. Poderia confirmar os horários disponíveis?`;
      closeBooking();
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    });
  }

  const dialog = document.querySelector("#image-dialog");
  const dialogImage = document.querySelector("#dialog-image");
  const dialogCaption = document.querySelector("#dialog-caption");
  const dialogCounter = document.querySelector("#dialog-counter");
  const dialogPrevious = document.querySelector("[data-gallery-prev]");
  const dialogNext = document.querySelector("[data-gallery-next]");
  const dialogClose = document.querySelector("[data-dialog-close]");
  let activeGalleryLinks = [];
  let activeGalleryIndex = 0;
  let pointerStartX = null;

  function closeDialog() {
    if (dialog && dialog.open) dialog.close();
  }

  function updateGalleryImage(index) {
    if (!activeGalleryLinks.length || !dialogImage) return;
    activeGalleryIndex = (index + activeGalleryLinks.length) % activeGalleryLinks.length;
    const activeLink = activeGalleryLinks[activeGalleryIndex];
    const group = activeLink.closest(".gallery-group");
    const title = group?.querySelector(".gallery-heading h3")?.textContent.trim()
      || activeLink.dataset.caption
      || "Trabalho do salão";
    dialogImage.src = activeLink.href;
    dialogImage.alt = activeLink.querySelector("img")?.alt || title;
    if (dialogCaption) dialogCaption.textContent = title;
    if (dialogCounter) {
      dialogCounter.textContent = `${String(activeGalleryIndex + 1).padStart(2, "0")} / ${String(activeGalleryLinks.length).padStart(2, "0")}`;
    }
  }

  function moveGallery(delta) {
    if (dialog?.open) updateGalleryImage(activeGalleryIndex + delta);
  }

  document.querySelectorAll("[data-gallery]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (!dialog || !dialogImage) return;
      event.preventDefault();
      activeGalleryLinks = Array.from(link.closest(".gallery-group")?.querySelectorAll("[data-gallery]") || [link]);
      activeGalleryIndex = activeGalleryLinks.indexOf(link);
      updateGalleryImage(activeGalleryIndex);
      if (typeof dialog.showModal === "function") dialog.showModal();
    });
  });

  if (dialogPrevious) dialogPrevious.addEventListener("click", function () { moveGallery(-1); });
  if (dialogNext) dialogNext.addEventListener("click", function () { moveGallery(1); });
  if (dialogClose) dialogClose.addEventListener("click", closeDialog);
  if (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeDialog();
    });
  }
  document.addEventListener("keydown", function (event) {
    if (!dialog?.open) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); moveGallery(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); moveGallery(1); }
  });
  if (dialogImage) {
    dialogImage.addEventListener("pointerdown", function (event) {
      pointerStartX = event.clientX;
      dialogImage.classList.add("is-dragging");
      dialogImage.setPointerCapture?.(event.pointerId);
    });
    dialogImage.addEventListener("pointerup", function (event) {
      if (pointerStartX === null) return;
      const delta = event.clientX - pointerStartX;
      pointerStartX = null;
      dialogImage.classList.remove("is-dragging");
      if (Math.abs(delta) > 45) moveGallery(delta < 0 ? 1 : -1);
    });
    dialogImage.addEventListener("pointercancel", function () {
      pointerStartX = null;
      dialogImage.classList.remove("is-dragging");
    });
  }

  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".site-header", { y: -20, opacity: 0, duration: .8, ease: "power2.out" });
    gsap.from(".hero-copy > *", { y: 24, opacity: 0, duration: .85, stagger: .1, delay: .15, ease: "power3.out" });
    gsap.from(".hero-art", { scale: .94, opacity: 0, duration: 1.1, delay: .25, ease: "power3.out" });
    gsap.utils.toArray(".reveal-up").forEach(function (element) {
      const isServiceCard = element.classList.contains("service-card");
      const isGalleryGroup = element.classList.contains("gallery-group");
      const isSideColumn = element.classList.contains("intro-note") || element.classList.contains("contact-panel");
      const motion = isServiceCard
        ? { y: 18, duration: .6, ease: "power2.out" }
        : isGalleryGroup
          ? { y: 24, duration: .75, ease: "power3.out" }
          : isSideColumn
            ? { x: 24, y: 0, duration: .85, ease: "power2.out" }
            : { y: 28, duration: .8, ease: "power2.out" };
      gsap.from(element, {
        opacity: 0,
        ...motion,
        scrollTrigger: { trigger: element, start: "top 88%", once: true }
      });
    });
    gsap.utils.toArray(".gallery-item").forEach(function (element) {
      gsap.from(element, {
        y: 18,
        opacity: 0,
        duration: .6,
        scrollTrigger: { trigger: element, start: "top 92%", once: true }
      });
    });
  } else {
    document.querySelectorAll(".reveal-up, .reveal-scale").forEach(function (element) {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
  }
})();
