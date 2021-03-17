RBFAads.prototype.reset = function reset() {

    googletag.destroySlots();
    googletag.pubads().clearTargeting();

    if(typeof document.getElementById("rbfaConfig")!== "undefined" && document.getElementById("rbfaConfig") !== null ){
        this.adsSiteConfig.location = document.getElementById("rbfaConfig").dataset.location;
        this.adsSiteConfig.subpage = document.getElementById("rbfaConfig").dataset.subpage || undefined;
        this.adsSiteConfig.tag = document.getElementById("rbfaConfig").dataset.tag || undefined;
    }
    this.adPositions = this.buildAdsConfig(adsSiteConfig.adsConfig);

    //Set everything in motion to refresh everything
    this.init();
};