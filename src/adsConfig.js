var adsSiteConfig = adsSiteConfig || {};
adsSiteConfig.location = document.getElementById("rbfaConfig").dataset.location;
adsSiteConfig.subpage = document.getElementById("rbfaConfig").dataset.subpage || undefined;
adsSiteConfig.tag = document.getElementById("rbfaConfig").dataset.tag || undefined;
adsSiteConfig.adsConfig = {
    leaderboard: {
        display : true
    },
    rectangle: {
        display : true
    },
    skyscraper: {
        display : true
    },
};
adsSiteConfig.googleSizeMappingMatrix = {
    desktop : {
        "ViewportTreshold" : [1440, 0],
        "leaderboard": [[728, 90]],
        "rectangle": [[300, 250]],
        "skyscraper": [[160, 600], [120, 600]],
    },
    mobile : {
        "ViewportTreshold" : [0, 0],
        "leaderboard": [[320, 50], [300, 50]],
        "rectangle": [[300, 250]],
        "skyscraper": [],
    }
};