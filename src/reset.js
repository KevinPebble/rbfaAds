RBFAads.prototype.reset = function reset() {

    googletag.destroySlots();
    googletag.pubads().clearTargeting();

    if(typeof document.getElementById("rbfaConfig")!== "undefined" && document.getElementById("rbfaConfig") !== null ){
        this.adsSiteConfig.location = document.getElementById("rbfaConfig").dataset.location;
        this.adsSiteConfig.subpage = document.getElementById("rbfaConfig").dataset.subpage.split(";") || undefined;
        this.adsSiteConfig.tag = document.getElementById("rbfaConfig").dataset.tag.split(";") || undefined;
    }
    this.adPositions = this.buildAdsConfig(adsSiteConfig.adsConfig);

    //Set everything in motion to refresh everything
    this.init();
};