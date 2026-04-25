const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
const cookieNecessary = document.getElementById('cookieNecessary');
const lazadaFrame = document.getElementById('lazadaFrame');
const catalogStatus = document.getElementById('catalogStatus');
const consentKey = 'popstore-cookie-consent';

const easeInOutCubic = (progress) => {
  if (progress < 0.5) {
    return 4 * progress * progress * progress;
  }

  return 1 - Math.pow(-2 * progress + 2, 3) / 2;
};

const animateScrollTo = (targetY, duration = 850) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

document.querySelectorAll('a[href^="#"]').forEach((anchorLink) => {
  anchorLink.addEventListener('click', (event) => {
    const targetSelector = anchorLink.getAttribute('href');

    if (!targetSelector || targetSelector === '#') {
      return;
    }

    const targetElement = document.querySelector(targetSelector);

    if (!targetElement) {
      return;
    }

    event.preventDefault();

    const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 0;
    const targetTop = targetSelector === '#top'
      ? 0
      : targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

    if (siteNav?.classList.contains('is-open')) {
      siteNav.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    }

    window.history.replaceState(null, '', targetSelector);

    window.setTimeout(() => {
      animateScrollTo(Math.max(targetTop, 0));
    }, 60);
  });
});

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

const storedConsent = localStorage.getItem(consentKey);

if (!storedConsent && cookieBanner) {
  window.setTimeout(() => {
    cookieBanner.classList.add('is-visible');
  }, 900);
}

const setConsent = (value) => {
  localStorage.setItem(consentKey, value);
  cookieBanner?.classList.remove('is-visible');
};

cookieAccept?.addEventListener('click', () => setConsent('accepted'));
cookieNecessary?.addEventListener('click', () => setConsent('necessary'));

if (lazadaFrame) {
  lazadaFrame.addEventListener('load', () => {
    lazadaFrame.dataset.loaded = 'true';
    if (catalogStatus) {
      catalogStatus.textContent = 'หากเห็นหน้า Lazada ในกรอบด้านบน คุณสามารถเลื่อนดูสินค้าได้ทันที หากไม่แสดงผล กรุณาใช้ปุ่มเปิดหน้าร้านบน Lazada ทางด้านขวา';
    }
  });

  window.setTimeout(() => {
    if (lazadaFrame.dataset.loaded === 'true' || !catalogStatus) {
      return;
    }

    catalogStatus.textContent = 'เบราว์เซอร์หรือ Lazada อาจไม่อนุญาตให้แสดงผลผ่านกรอบในหน้านี้ กรุณาใช้ปุ่มเปิดหน้าร้านบน Lazada เพื่อดูสินค้าทั้งหมดได้ทันที';
  }, 4500);
}

window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (!header) {
    return;
  }

  if (window.scrollY > 12) {
    header.style.boxShadow = '0 12px 30px rgba(9, 34, 90, 0.08)';
  } else {
    header.style.boxShadow = 'none';
  }
}, { passive: true });
