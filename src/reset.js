RBFAads.prototype.reset = function reset() {
    
    for (position in this.adPositions){
        if(document.getElementById(position) !== null){
            document.getElementById(position).dataset.prepared = false;
            document.getElementById(position).id = "";
        }
    }

    googletag.destroySlots();
    googletag.pubads().clearTargeting();

    if(typeof document.getElementById("rbfaConfig")!== "undefined" && document.getElementById("rbfaConfig") !== null ){
        this.adsSiteConfig.location = document.getElementById("rbfaConfig").dataset.location;
        this.adsSiteConfig.subpage = document.getElementById("rbfaConfig").dataset.subpage || undefined;
        this.adsSiteConfig.tag = document.getElementById("rbfaConfig").dataset.tag || undefined;
    }
    this.adPositions = this.buildAdsConfig(this.adsSiteConfig.adsConfig);

    //Set everything in motion to refresh everything
    this.init();
};