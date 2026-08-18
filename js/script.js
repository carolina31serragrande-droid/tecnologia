// =========================================================
// ORBYTE — script.js
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 480);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Fecha o menu mobile ao clicar em um link ---------- */
  const navCollapse = document.getElementById('navMain');
  if (navCollapse) {
    document.querySelectorAll('#navMain .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
        }
      });
    });
  }

  /* ---------- Validação do formulário de contato ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const successBox = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Validação extra: telefone (apenas dígitos, espaços, parênteses e hífen)
      const phoneField = document.getElementById('phone');
      if (phoneField && phoneField.value.trim()) {
        const phonePattern = /^[\d\s()+-]{8,20}$/;
        phoneField.setCustomValidity(phonePattern.test(phoneField.value) ? '' : 'invalido');
      }

      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        const firstInvalid = contactForm.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      contactForm.classList.add('was-validated');

      // Simulação de envio (sem back-end real neste projeto escolar)
      if (successBox) {
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });

    // Limpa validação customizada do telefone ao digitar
    const phoneField = document.getElementById('phone');
    if (phoneField) {
      phoneField.addEventListener('input', () => phoneField.setCustomValidity(''));
    }
  }

  /* ---------- Lightbox da galeria ---------- */
  const lightbox = document.getElementById('orbyteLightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCap = lightbox.querySelector('.lb-cap');
    const lbClose = lightbox.querySelector('.lb-close');

    document.querySelectorAll('[data-gallery-item]').forEach(item => {
      item.addEventListener('click', () => {
        const imgEl = item.querySelector('img');
        const capEl = item.querySelector('.cap');
        lbImg.src = imgEl.src.replace(/w=\d+/, 'w=1400').replace(/q=\d+/, 'q=85');
        lbImg.alt = imgEl.alt;
        lbCap.textContent = capEl ? capEl.textContent : imgEl.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

});
