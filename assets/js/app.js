__webpack_public_path__ = window.__webpack_public_path__; // eslint-disable-line
import EmblaCarousel from 'embla-carousel'
import Global from './theme/global';
import React from 'react'
import App from './components/App';
import ReactDOM from 'react-dom'

const getAccount = () => import('./theme/account');
const getLogin = () => import('./theme/auth');
const noop = null;

const pageClasses = {
    account_orderstatus: getAccount,
    account_order: getAccount,
    account_addressbook: getAccount,
    shippingaddressform: getAccount,
    account_new_return: getAccount,
    'add-wishlist': () => import('./theme/wishlist'),
    account_recentitems: getAccount,
    account_downloaditem: getAccount,
    editaccount: getAccount,
    account_inbox: getAccount,
    account_saved_return: getAccount,
    account_returns: getAccount,
    account_paymentmethods: getAccount,
    account_addpaymentmethod: getAccount,
    account_editpaymentmethod: getAccount,
    login: getLogin,
    createaccount_thanks: getLogin,
    createaccount: getLogin,
    getnewpassword: getLogin,
    forgotpassword: getLogin,
    blog: noop,
    blog_post: noop,
    brand: () => import('./theme/brand'),
    brands: noop,
    cart: () => import('./theme/cart'),
    category: () => import('./theme/category'),
    compare: () => import('./theme/compare'),
    page_contact_form: () => import('./theme/contact-us'),
    error: noop,
    404: noop,
    giftcertificates: () => import('./theme/gift-certificate'),
    giftcertificates_balance: () => import('./theme/gift-certificate'),
    giftcertificates_redeem: () => import('./theme/gift-certificate'),
    default: noop,
    page: noop,
    product: () => import('./theme/product'),
    amp_product_options: () => import('./theme/product'),
    search: () => import('./theme/search'),
    rss: noop,
    sitemap: noop,
    newsletter_subscribe: noop,
    wishlist: () => import('./theme/wishlist'),
    wishlists: () => import('./theme/wishlist'),
};

const customClasses = {};

/**
 * This function gets added to the global window and then called
 * on page load with the current template loaded and JS Context passed in
 * @param pageType String
 * @param contextJSON
 * @returns {*}
 */
window.stencilBootstrap = function stencilBootstrap(pageType, contextJSON = null, loadGlobal = true) {
    const context = JSON.parse(contextJSON || '{}');

    return {
        load() {
            $(() => {
                // Load globals
                if (loadGlobal) {
                    Global.load(context);
                }

                const importPromises = [];

                // Find the appropriate page loader based on pageType
                const pageClassImporter = pageClasses[pageType];
                if (typeof pageClassImporter === 'function') {
                    importPromises.push(pageClassImporter());
                }

                // See if there is a page class default for a custom template
                const customTemplateImporter = customClasses[context.template];
                if (typeof customTemplateImporter === 'function') {
                    importPromises.push(customTemplateImporter());
                }

                // Wait for imports to resolve, then call load() on them
                Promise.all(importPromises).then(imports => {
                    imports.forEach(imported => {
                        imported.default.load(context);
                    });
                });
            });
        },
    };
};

const setupPrevNextBtns = (prevBtn, nextBtn, embla) => {
    prevBtn.addEventListener('click', embla.scrollPrev, false);
    nextBtn.addEventListener('click', embla.scrollNext, false);
  };
  
const disablePrevNextBtns = (prevBtn, nextBtn, embla) => {
    return () => {
        if (embla.canScrollPrev()) prevBtn.removeAttribute('disabled');
        else prevBtn.setAttribute('disabled', 'disabled');

        if (embla.canScrollNext()) nextBtn.removeAttribute('disabled');
        else nextBtn.setAttribute('disabled', 'disabled');
    };
};
const setupDotBtns = (dotsArray, embla) => {
    dotsArray.forEach((dotNode, i) => {
      dotNode.addEventListener("click", () => embla.scrollTo(i), false);
    });
};
  
const generateDotBtns = (dots, embla) => {
    const template = document.getElementById("embla-dot-template").innerHTML;
    dots.innerHTML = embla.scrollSnapList().reduce(acc => acc + template, "");
    return [].slice.call(dots.querySelectorAll(".embla__dot"));
};

const selectDotBtn = (dotsArray, embla) => () => {
    const previous = embla.previousScrollSnap();
    const selected = embla.selectedScrollSnap();
    dotsArray[previous].classList.remove("is-selected");
    dotsArray[selected].classList.add("is-selected");
};

const wrap = document.querySelectorAll(".embla");
wrap.forEach(
    (item) => {

        const slidesToScroll = window.innerWidth > 800 ? 3 : 1
        const viewPort = item.querySelector(".embla__viewport");
        const prevBtn = item.querySelector(".embla__button--prev");
        const nextBtn = item.querySelector(".embla__button--next");
        const dots = item.querySelector(".embla__dots");
        const embla = EmblaCarousel(viewPort, { loop: false, skipSnaps: false, align: "start", slidesToScroll: slidesToScroll });
        window.addEventListener("resize", () => {
            const slidesToScroll = window.innerWidth > 800 ? 3 : 1
            embla.reInit({slidesToScroll})
        })

        // const dotsArray = generateDotBtns(dots, embla);
        // const setSelectedDotBtn = selectDotBtn(dotsArray, embla);
        const disablePrevAndNextBtns = disablePrevNextBtns(prevBtn, nextBtn, embla);
        // setupPrevNextBtns(prevBtn, nextBtn, embla);
        // setupDotBtns(dotsArray, embla);

        // embla.on("select", setSelectedDotBtn);
        // embla.on("select", disablePrevAndNextBtns);
        // embla.on("init", setSelectedDotBtn);
        // embla.on("init", disablePrevAndNextBtns);

    }
)

const root = document.querySelector("#app")

ReactDOM.render(<App />, root)
