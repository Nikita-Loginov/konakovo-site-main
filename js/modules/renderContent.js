export function renderImgs(item) {
  const arr = [];

  if (item) {
    item?.imgs.forEach((img) => {
      const html = `<div class="swiper-slide">
                              <picture>
                                <source
                                  srcset="
                                    ${img}.${item?.imgFormat}   1x,
                                  "
                                />
                                <img
                                  src=${img}.${item?.imgFormat}
                                  alt="${item.name}"
                                />
                              </picture>
                            </div>`;

      arr.push(html);
    });
  }

  return arr;
}

export function renderTags(tags) {
  const arr = [];

  if (tags) {
    tags.forEach((text) => {
      const html = `<div class="swiper-slide">
                                    <div class="tags__content">
                                      ${text}
                                    </div>
                                  </div>`;

      arr.push(html);
    });
  }

  return arr;
}

export function renderDescrGood(testArr) {
  const arr = [];

  if (testArr) {
    testArr.forEach((text) => {
      const html = `<p>${text}</p>`;

      arr.push(html);
    });
  }

  return arr;
}

export function renderBtn() {
  return '<button class="button button--gray more-buuton" type="button">показать все</button>';
}

export function initSwiper(swiperName, options) {
  new Swiper(swiperName, options);
}

export const getHtmlProgrammCard = (data) => {
  if (!data) return "";

  const {
    name,
    texts,
    links,
    important,
    color,
    price,
    guests,
    linkBrone,
    images,
    imgFormat = "webp",
  } = data;

  const generateImagesHTML = () => {
    if (!images || images.length === 0) {
      return `
        <div class="swiper-slide">
          <div class="card-presentation__img">
            <picture>
              <source srcset="/img/programs/one.webp 1x, /img/programs/one.webp 2x" />
              <img src="/img/programs/one.webp" alt="фотография программы" />
            </picture>
          </div>
        </div>`;
    }

    return images
      .map(
        (image) => `
      <div class="swiper-slide">
        <div class="card-presentation__img">
          <picture>
            <source srcset="${image}.${imgFormat} 1x, ${image}2x.${imgFormat} 2x" />
            <img src="${image}.${imgFormat}" alt="фотография программы" />
          </picture>
        </div>
      </div>
    `
      )
      .join("");
  };

  const generateTextsHTML = () => {
    if (!texts || texts.length === 0) return "";

    return texts
      .map(
        (text) => `
      <p>${text}</p>
    `
      )
      .join("");
  };

  const generateLinksHTML = () => {
    if (!links || links.length === 0) return "";

    return links
      .map(
        (link) => `
      <li class="list-big-circle__link">
        <span class="list-big-circle__icon p1 libel-font uppercase-text" style="color: #964611"></span>
        <span class="p1 libel-font uppercase-text">${link}</span>
      </li>
    `
      )
      .join("");
  };

  const html = ` 
    <div class="card-presentation card-presentation--big ${color || ""}">
      <div class="card-presentation__img-swipers">
        <div class="swiper swiper--card-presentation-img">
          <div class="swiper-wrapper">
            ${generateImagesHTML()}
          </div>

         <div class="swiper-arrows-box swiper-arrows-box--absolute">
  <button class="arrow-swiper prev">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.2097 1.19393C4.48563 0.93188 4.92882 0.935912 5.19961 1.20294L10.3833 6.31464L10.3993 6.33284C11.2227 7.26839 11.197 8.66148 10.3385 9.5672L10.33 9.57619L5.20727 14.7894C4.94086 15.0605 4.49779 15.0713 4.21763 14.8135C3.93748 14.5557 3.92633 14.1269 4.19274 13.8558L9.31054 8.64744C9.68224 8.2513 9.69751 7.6413 9.34739 7.22742L4.20039 2.1519C3.92961 1.88488 3.93378 1.45598 4.2097 1.19393Z"
        fill="white"
      />
    </svg>
  </button>

  <button class="arrow-swiper next">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.2097 1.19393C4.48563 0.93188 4.92882 0.935912 5.19961 1.20294L10.3833 6.31464L10.3993 6.33284C11.2227 7.26839 11.197 8.66148 10.3385 9.5672L10.33 9.57619L5.20727 14.7894C4.94086 15.0605 4.49779 15.0713 4.21763 14.8135C3.93748 14.5557 3.92633 14.1269 4.19274 13.8558L9.31054 8.64744C9.68224 8.2513 9.69751 7.6413 9.34739 7.22742L4.20039 2.1519C3.92961 1.88488 3.93378 1.45598 4.2097 1.19393Z"
        fill="white"
      />
    </svg>
  </button> 
</div>
        </div>
      </div>

      <div class="card-presentation__content">
        <header class="card-presentation__header">
          ${name ? `<p class="h4 uppercase-text libel-font">${name}</p>` : ""}

          <div class="card-presentation__tags">
            ${
              guests
                ? `
              <div class="tag-card tag-card--border">
                <span class="tag-card__icon icon">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0205 12.6543C19.1215 12.6543 22.5146 15.9511 23.8086 20.3994L22.8486 20.6787C21.6336 16.5018 18.5334 13.6543 15.0205 13.6543C14.9329 13.6543 14.8457 13.6557 14.7588 13.6592L14.7188 12.6602C14.819 12.6561 14.9196 12.6543 15.0205 12.6543ZM8.78809 12.6523C12.889 12.6525 16.2822 15.9492 17.5762 20.3975L16.6152 20.6768C15.4003 16.4999 12.3009 13.6525 8.78809 13.6523C5.27515 13.6523 2.17497 16.4998 0.959961 20.6768L0 20.3975C1.29396 15.9491 4.68708 12.6523 8.78809 12.6523ZM8.78516 2C11.0468 2.00024 12.7215 3.98596 12.7217 6.23047C12.7217 8.47511 11.0469 10.4617 8.78516 10.4619C6.52321 10.4619 4.84766 8.47525 4.84766 6.23047C4.84782 3.98582 6.52332 2 8.78516 2ZM14.7236 2.03809C16.7479 2.03809 18.2891 3.87102 18.2891 6C18.2889 8.12883 16.7478 9.96094 14.7236 9.96094V8.96094C16.0846 8.96094 17.2889 7.69438 17.2891 6C17.2891 4.30545 16.0847 3.03809 14.7236 3.03809C14.4102 3.0381 14.1101 3.10324 13.832 3.22266L13.4375 2.30371C13.8361 2.13256 14.2701 2.0381 14.7236 2.03809ZM8.78516 3C7.16315 3 5.84781 4.4463 5.84766 6.23047C5.84766 8.01479 7.16305 9.46191 8.78516 9.46191C10.4071 9.46167 11.7217 8.01463 11.7217 6.23047C11.7215 4.44645 10.407 3.00025 8.78516 3Z" fill="white"/>
</svg>

                </span>
                <div class="tag-card__content">
                  <p class="libel-font">${guests}</p>
                </div>
              </div>
            `
                : ""
            }

            ${
              price
                ? `
              <div class="tag-card tag-card--border tag-card--white">
                <div class="tag-card__content">
                  <p class="libel-font">${price}</p>
                </div>
              </div>
            `
                : ""
            }
          </div>
        </header>

        <div class="card-presentation__info">
          ${
            texts && texts.length > 0
              ? `
            <div class="textbox">
              ${generateTextsHTML()}
            </div>
          `
              : ""
          }

          ${
            links && links.length > 0
              ? `
            <ul class="list-big-circle">
              ${generateLinksHTML()}
            </ul>
          `
              : ""
          }

          ${
            important
              ? `
            <div class="textbox">
              <p>${important}</p>
            </div>
          `
              : ""
          }
        </div>

        <footer class="card-presentation__footer">
          <div class="card-presentation__btns">
            <button type="button" class="button button--noBg button--noBg-white modal-open" data-modal="imgsSwiperModal">
              Смотреть прайс
            </button>

            ${
              linkBrone
                ? `
              <a href="${linkBrone}" target="_blank" title="Забронировать" aria-label="Перейти к бронированию" class="button button--white">
                Забронировать
              </a>
            `
                : ""
            }
          </div>
        </footer>
      </div>
    </div>`;

  return html;
};
