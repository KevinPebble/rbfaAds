var googletag = window.googletag || {cmd: []};

window.addEventListener('CookiebotOnConsentReady', function (e) {
    console.log("Consent received! fire the admanager!");
    window.rbfaAds = new RBFAads($, googletag).init();
    }, false);