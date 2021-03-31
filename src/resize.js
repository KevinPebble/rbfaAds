function debounce(func) {
    let timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 500, event);
    };
  }
  window.addEventListener("resize", debounce(function (e) {
    console.log("end of resizing");
    console.log(e);
    var newDeviceMode = window.innerWidth > rbfaAds.adsSiteConfig.breakpoint ? "desktop" : "mobile";
    if (newDeviceMode !== rbfaAds.deviceMode){
        console.log("performing reset");
        rbfaAds.deviceMode = newDeviceMode;
        rbfaAds.reset();
    }else{
        console.log("No need to reset");
    }
    // Reset ads
  }));