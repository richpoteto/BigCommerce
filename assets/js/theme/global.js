import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import adminBar from './global/adminBar';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';

export default class Global extends PageManager {
    onReady() {
        const {
            channelId, cartId, productId, categoryId, secureBaseUrl, maintenanceModeSettings, adminBarLanguage, showAdminBar,
        } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
		if ($('#tab-related').length) {
        carousel(this.context);
		}
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        if (showAdminBar) {
            adminBar(secureBaseUrl, channelId, maintenanceModeSettings, JSON.parse(adminBarLanguage), productId, categoryId);
        }
        loadingProgressBar();
        svgInjector();

        /* BundleB2B */
        $('body').append('<script src="https://cdn.bundleb2b.net/bundleb2b.3.3.0.js"></script>');

        window.b3themeConfig = window.b3themeConfig || {};

        window.b3themeConfig.useJavaScript = {
            login: {
                callback() {
                    $('.body').show();
                },
            },
        };

        window.b3themeConfig.useContainers = {
            'tpa.container': '.page .page-content',
            'shoppinglists.container': '.page .page-content',
            'addressBook.container': '.page .page-content',
            'shoppinglist.container': '.page .page-content',
            'buyAgain.container': '.page .page-content',
            'userManagement.container': '.page .page-content',
            'quotesList.container': '.page .page-content',
            'orderDetail.container': '.page .page-content',
            'dashboard.container': '.page .page-content',
            'dashboard.endMasquerade.container': '.tio-blue-row',
        };
        /* BundleB2B */
		
		
		$('.navPage-subMenu-item').on('mouseenter', event => {
		const $target = $(event.currentTarget);
		let NavLevel2Content = $target.find('.level2-nav').html();
		let Img = $target.find('a.navPage-subMenu-action').attr('data-img');
		let cName = $target.find('a.navPage-subMenu-action').attr('aria-label');
		console.log('Img=' + Img)
		
		
		
let href = $target.find('a.navPage-subMenu-action').attr('href');
if (Img != '') {
			$('.promo-banner a').attr('href', href);
			$('.promo-banner a img').attr('src', Img);
			$('.promo-banner a img').attr('srcset', Img);
			$('.promo-banner a img').attr('alt', cName);
			$('.promo-banner a img').attr('title', cName);
		}
		
		
		$('.level2').html(NavLevel2Content);
		$('.navPage-subMenu-item').removeClass('active');
		$target.addClass('active');
		
		});

		
		
		
    }
}



