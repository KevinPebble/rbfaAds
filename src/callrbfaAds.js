var googletag = window.googletag || {cmd: []};
var InitAdserver = function(__tcfapi){
  __tcfapi('addEventListener', 2, function(tcData, success){
    if(success && (tcData.eventStatus === 'tcloaded' || tcData.eventStatus === 'useractioncomplete') ) {
        window.rbfaAds = new RBFAads($, googletag, tcData.tcString).init();
        // remove the ourself to not get called more than once
        __tcfapi('removeEventListener', 2, (success) => {}, tcData.listenerId);

    }       
  });
}
if(typeof __tcfapi !== "undefined"){
  InitAdserver(__tcfapi);
}else{
  setTimeout(function(){
    if(typeof __tcfapi !== "undefined"){
      InitAdserver(__tcfapi);
    }
  }, 1000);
}
