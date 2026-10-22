const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const heroVideo = document.querySelector('.hero-video');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const isSmallScreen = window.matchMedia('(max-width: 680px)').matches;
const isSlowConnection = Boolean(connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType));

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú');
  });
});

const useStaticHero = reducedMotion.matches || isSmallScreen || isSlowConnection;
if (heroVideo && useStaticHero) {
  document.documentElement.classList.add('static-hero');
  heroVideo.pause();
  heroVideo.removeAttribute('autoplay');
  heroVideo.querySelector('source')?.removeAttribute('src');
  heroVideo.load();
} else if (heroVideo) {
  heroVideo.addEventListener('playing', () => document.documentElement.classList.add('video-ready'), { once: true });
  heroVideo.addEventListener('error', () => document.documentElement.classList.add('static-hero'), { once: true });
  heroVideo.play().catch(() => document.documentElement.classList.add('static-hero'));
}

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  let lenis;
  if (window.Lenis && !reducedMotion.matches) {
    lenis = new Lenis({
      autoRaf: false,
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  if (!reducedMotion.matches) {
    gsap.fromTo('.hero-content',
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: 1.15, delay: 0.12, ease: 'power3.out' },
    );

    gsap.fromTo('.hero-media',
      { scale: 1.04, yPercent: 0 },
      {
        scale: 1.13,
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.7 },
      },
    );

    gsap.utils.toArray('[data-reveal]').forEach((element) => {
      gsap.fromTo(element,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: { trigger: element, start: 'top 88%', end: 'top 64%', scrub: 0.65 },
        },
      );
    });

    gsap.fromTo('.service-card',
      { autoAlpha: 0, y: 64, scale: 0.94 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ease: 'none',
        stagger: 0.13,
        scrollTrigger: { trigger: '.service-grid', start: 'top 84%', end: 'bottom 55%', scrub: 0.8 },
      },
    );

    gsap.fromTo('.gallery-card',
      { autoAlpha: 0, y: 54, scale: 0.96 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        ease: 'none',
        stagger: 0.16,
        scrollTrigger: { trigger: '.gallery-grid', start: 'top 84%', end: 'bottom 54%', scrub: 0.8 },
      },
    );

    gsap.fromTo('.process-step',
      { autoAlpha: 0, y: 38 },
      {
        autoAlpha: 1,
        y: 0,
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: { trigger: '.process-list', start: 'top 84%', end: 'bottom 58%', scrub: 0.7 },
      },
    );
  }

  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
