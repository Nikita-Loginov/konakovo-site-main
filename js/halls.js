import { venuesCards } from "./data/goods.js";
import { initContentMore } from "./functions.js";

const getHtmlList = (links) => {
  const html = [];

  links.forEach((link) => {
    const li = `<li class="card-place__link">${link}</li>`;
    html.push(li);
  });

  return html;
};

initContentMore({
  containerSelector: ".moreContent__items.moreContent__items--bigVenues",
  data: [...venuesCards],
  showCount: 4,
  showCountMobile: 2,
  maxWidthInitMobile: 650,
  buttonTexts: {
    expanded: "показать меньше",
    collapsed: "показать еще",
  },
  maxWidthInit: 13300000,
  functions: {
    getHtmlItem: (item) => {
      return `<div class="card-place moreContent__item">
                        <div class="card-place__img">
                          <picture>
                            <source
                              srcset="
                                ${item.imgSrc}.${item.imgFormat}   1x,
                                 ${item.imgSrc}2x.${item.imgFormat} 2x
                              "
                            />
                            <img
                              src="${item.imgSrc}.${item.imgFormat}"
                              alt="фотография зала"
                            />
                          </picture>
                        </div>

                        <div class="card-place__content">
                          <header class="card-place__head">
                            <h4 class="card-place__name">${item.name || ""}</h4>

                            <div class="card-place__massa">
                              <p>${item.massa || ""}</p>
                            </div>
                          </header>

                          <ul
                            class="card-place__list"
                            aria-label="список информации про зал"
                          >
                            ${getHtmlList(item.list).join("")}
                          </ul>
                        </div>
                      </div>`;
    },
  },
});
