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
  const swiper = new Swiper(swiperName, options);
}
