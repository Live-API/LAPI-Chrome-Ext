

chrome.browserAction.onClicked.addListener(function(tab) {
  // console.log("without bang", $('#lapiChromeExtensionContainer'));
  // console.log("with bang", !!$('#lapiChromeExtensionContainer'));
  // if (!!$('#lapiChromeExtensionContainer')!=true) {
  chrome.tabs.executeScript(null, {file: "bundles/contentscripts.bundle.js"});
  // }
  // chrome.tabs.executeScript(null, {file: "bundles/contentscripts.bundle.js"});
});

// var elementExists = document.getElementById("find-me");