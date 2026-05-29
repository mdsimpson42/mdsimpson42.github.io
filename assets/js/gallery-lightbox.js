document.addEventListener('DOMContentLoaded', function () {
  var galleryImages = document.querySelectorAll('.page-gallery img');
  var activeSourceImage = null;

  if (!galleryImages.length) return;

  var lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('aria-hidden', 'true');

  var content = document.createElement('div');
  content.className = 'gallery-lightbox-content';

  var closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'gallery-lightbox-close';
  closeButton.setAttribute('aria-label', 'Close image preview');
  closeButton.textContent = 'x';

  var modalImage = document.createElement('img');
  modalImage.className = 'gallery-lightbox-image';
  modalImage.alt = '';
  modalImage.decoding = 'async';

  content.appendChild(closeButton);
  content.appendChild(modalImage);
  lightbox.appendChild(content);
  document.body.appendChild(lightbox);

  function setModalImageSource(sourceImage) {
    var viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var modalPadding = viewportWidth > 767 ? 48 : 24;
    var targetWidth = Math.max(320, Math.min(1200, viewportWidth - modalPadding));

    if (sourceImage.hasAttribute('srcset')) {
      modalImage.setAttribute('srcset', sourceImage.getAttribute('srcset'));
      modalImage.setAttribute('sizes', Math.round(targetWidth) + 'px');
    } else {
      modalImage.removeAttribute('srcset');
      modalImage.removeAttribute('sizes');
    }

    modalImage.src = sourceImage.currentSrc || sourceImage.src;
  }

  function openLightbox(sourceImage) {
    activeSourceImage = sourceImage;
    setModalImageSource(sourceImage);
    modalImage.alt = sourceImage.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-lightbox-open');
    closeButton.focus();
  }

  function closeLightbox() {
    activeSourceImage = null;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-lightbox-open');
    modalImage.removeAttribute('src');
    modalImage.removeAttribute('srcset');
    modalImage.removeAttribute('sizes');
  }

  galleryImages.forEach(function (img) {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', (img.alt || 'Gallery image') + '. Open larger preview');

    img.addEventListener('click', function () {
      openLightbox(img);
    });

    img.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  window.addEventListener('resize', function () {
    if (activeSourceImage && lightbox.classList.contains('is-open')) {
      setModalImageSource(activeSourceImage);
    }
  });
});
