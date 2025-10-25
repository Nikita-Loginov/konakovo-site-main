function openModal() {
  document.addEventListener('click', (e) => {
    const modalBtn = e.target.closest('.modal-open');
    
    if (!modalBtn) return;

    const nameModal = modalBtn.dataset.modal;
    if (!nameModal) return;

    const modalBlock = document.querySelector(`.${nameModal}`);
    if (!modalBlock) return;

    const modals = document.querySelectorAll('.modalBlock');
    
    modals.forEach((modal) => {
      modal.classList.remove('open');
    });

    if (modalBlock.classList.contains('modalBlockTwo')) {
      getImgSrc(modalBtn, modalBlock);
    }

    if (modalBlock.classList.contains('videoModal')) {
      getVideoSrc(modalBtn, modalBlock);
    }

    modalBlock.classList.add('open');
    document.body.classList.add('open-modal');
    document.documentElement.classList.add('open-modal');
  });
}

function getImgSrc(btn, modalBlock) {
  const img = btn.querySelector('.modal-img');

  console.log(img);

  if (img) {
    const src = img.getAttribute('src');
    setImgSrc(src, modalBlock);
  }
}

const getVideoSrc = (btn, modalBlock) => {
  if (!btn) return;

  const link = btn.dataset.linkVideo;
  setVideoSrc(link, modalBlock);
};

function setImgSrc(src, modalBlock) {
  const imgModalBlock = modalBlock.querySelector('.modalBlockTwo__img');
  imgModalBlock.textContent = '';

  const html = `
            <picture>
              <source srcset="${src} 1x, ${src} 2x">
              <img src=${src} alt="фотография здания">
            </picture>
            `;

  imgModalBlock.insertAdjacentHTML('beforeend', html);
}

const setVideoSrc = (src, modalBlock) => {
  if (!src) return;

  const blockVideo = modalBlock.querySelector('.videoModal__video');
  blockVideo.innerHTML = '';

  const html = ` <iframe
                width="720"
                height="405"
                src=${src}
                frameborder="0"
                allow="clipboard-write; autoplay"
                webkitAllowFullScreen
                mozallowfullscreen
                allowfullscreen
              ></iframe>`;

  blockVideo.insertAdjacentHTML('beforeend', html);
};

function closeModal() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modalBlock') || e.target.closest('.modal-close')) {
      const modalRelative = e.target.closest('.modalBlock');
      modalRelative.classList.remove('open');

      if (document.querySelector('.modalBlock.open')) return;
      document.body.classList.remove('open-modal');
      document.documentElement.classList.remove('open-modal');
    }
  });
}

const checkStartOpen = () => {
  const modals = document.querySelectorAll('.modalBlock');

  modals.forEach((modal) => {
    if (modal.classList.contains('open') || modal.classList.contains('openFinish')) {
      document.body.classList.add('open-modal');
      document.documentElement.classList.add('open-modal');

      if (modal.classList.contains('openFinish')) {
        modal.classList.add('open');
      }
    }
  });
};

export function initModal() {
  checkStartOpen();
  openModal();
  closeModal();
}