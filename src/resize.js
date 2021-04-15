RBFAads.prototype.resizeEvent = function(){
    function debounce(func) {
      let timer;
      return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 500, event);
      };
    }
    window.addEventListener("resize", debounce(function (e) {
      var newDeviceMode = window.innerWidth > rbfaAds.adsSiteConfig.breakpoint ? "desktop" : "mobile";
      if (newDeviceMode !== rbfaAds.deviceMode){
          rbfaAds.deviceMode = newDeviceMode;
          rbfaAds.reset();
      }
    }));
};