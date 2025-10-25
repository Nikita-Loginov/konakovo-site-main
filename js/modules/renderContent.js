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
                  <img src="/img/icons/personsIcon.svg" alt="иконка людей" />
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
            <button type="button" class="button button--noBg button--noBg-white">
              Смотреть прайс
            </button>

            ${
              linkBrone
                ? `
              <a href="${linkBrone}" title="Забронировать" aria-label="Перейти к бронированию" class="button button--white">
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
