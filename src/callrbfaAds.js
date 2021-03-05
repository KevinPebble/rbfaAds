var googletag = window.googletag || {cmd: []};

window.addEventListener('CookiebotOnConsentReady', function (e) {
    window.rbfaAds = new RBFAads($, googletag, adsSiteConfig).init();
    }, false);