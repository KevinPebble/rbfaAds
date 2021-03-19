function RBFAads($, googletag, adsSiteConfig) {

    'use strict';

    if (!(this instanceof RBFAads)) {
        throw new Error('RBFAads is a constructor. It is mandatory to call it with the new operator.');
    }

    // Don't display ads if the noads param is specified in the page url
    if (location.href.match(/(\?|&)noads($|&|=)/)) {
        return;
    }

    this.adsSiteConfig = adsSiteConfig;
    this.adPositions = this.buildAdsConfig(adsSiteConfig.adsConfig);
};

RBFAads.prototype.init = function(){
    this.LoadGoogle();
    this.videoURL = this.GetVideoURL();
    return this;
};

RBFAads.prototype.isHidden = function(elem){
    var bounding = elem.getBoundingClientRect();
    if (typeof bounding.x !== "undefined" && typeof bounding.y !== "undefined"){
        return (bounding.x === 0 && bounding.y ===0 && bounding.width === 0 && bounding.height ===0)
    }else if (typeof bounding.left !== "undefined" && typeof bounding.top !== "undefined"){
        return (bounding.top === 0 && bounding.left ===0 && bounding.width === 0 && bounding.height ===0)
    }else{
        return !( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
    }
 };

RBFAads.prototype.buildAdsConfig = function buildAdsConfig(adsConfig) {
    var adPositions = {};
    this.adCounter = {};
    // Extend adsConfig with default values
    for (var formatName in adsConfig) {

        if (!adsConfig.hasOwnProperty(formatName)) {
            continue;
        }

        var NodelistSrc = document.getElementsByClassName(formatName);
        var Nodelist = Array.prototype.slice.call(NodelistSrc);
        if (Nodelist.length !== 0){
            for (x=0; x < Nodelist.length ;x++){
                    if (this.isHidden(Nodelist[x])){
                        continue;
		        	}
                    //count the new position.
                    this.adCounter[formatName] = typeof this.adCounter[formatName] === "undefined" ? 1 : this.adCounter[formatName]+1;
                    //make the destination ID unique.
                    Nodelist[x].id = formatName+this.adCounter[formatName]
                    // save destination and ID in adpositions
                    adPositions[Nodelist[x].id] = {};
                    adPositions[Nodelist[x].id].positionName = Nodelist[x].id;
                    adPositions[Nodelist[x].id].positionCount = this.adCounter[formatName];
                    adPositions[Nodelist[x].id].container = Nodelist[x];
                    adPositions[Nodelist[x].id].formatName = formatName;
            }
        }
    }

    return adPositions;

};

RBFAads.prototype.LoadGoogle = function() {
    this.GoogleAds = {};
    var that = this;
    googletag.cmd.push(function() {
        for (position in that.adPositions){
            that.GoogleAds[position] = googletag.defineSlot("/22273444627/"+that.adsSiteConfig.location, [[999, 999]], position)
                .addService(googletag.pubads())
            var mapping = googletag.sizeMapping()
                .addSize(that.adsSiteConfig.googleSizeMappingMatrix.desktop.ViewportTreshold, that.adsSiteConfig.googleSizeMappingMatrix.desktop[that.adPositions[position].formatName])
                .addSize(that.adsSiteConfig.googleSizeMappingMatrix.mobile.ViewportTreshold, that.adsSiteConfig.googleSizeMappingMatrix.mobile[that.adPositions[position].formatName])
                .build();
            that.GoogleAds[position].defineSizeMapping(mapping);
        }
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.pubads().enableLazyLoad({
            // Fetch slots within 5 viewports.
            fetchMarginPercent: 500,
            // Render slots within 2 viewports.
            renderMarginPercent: 100,
            // Double the above values on mobile, where viewports are smaller
            // and users tend to scroll faster.
            mobileScaling: 2.0
        });
         if (that.adsSiteConfig.subpage !== undefined && that.adsSiteConfig.subpage !== ""){
            googletag.pubads().setTargeting('Subpage', that.adsSiteConfig.subpage);
        };
        if (that.adsSiteConfig.tag !== undefined && that.adsSiteConfig.tag !== ""){
            googletag.pubads().setTargeting('tag', that.adsSiteConfig.tag);
        };
        googletag.enableServices();
        googletag.display(Object.keys(that.GoogleAds)[0]);
    });
};

RBFAads.prototype.GetVideoURL = function() {
    var videoURL = "https://pubads.g.doubleclick.net/gampad/ads?iu=/22273444627/";
    videoURL += this.adsSiteConfig.location;
    videoURL += "&description_url="+document.location.href;
    videoURL += "&cust_params=";
    videoURL += this.adsSiteConfig.subpage !== undefined && this.adsSiteConfig.subpage !== "" ? "Subpage%3D"+this.adsSiteConfig.subpage.replace(/;/g, '%2C'): "";
    videoURL += this.adsSiteConfig.tag !== undefined && this.adsSiteConfig.tag !== "" ? "%26tag%3D"+this.adsSiteConfig.tag.replace(/;/g, '%2C') : "";
    videoURL += "&tfcd=0&npa=0&sz=640x360&max_ad_duration=30000&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=&nofb=1&vad_type=linear";
    return videoURL;
}