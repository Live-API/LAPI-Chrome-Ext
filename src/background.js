

chrome.browserAction.onClicked.addListener(function(tab) {
  // if (!$('#lapiChromeExtensionContainer')) {
  // chrome.tabs.executeScript(null, {file: "bundles/contentscripts.bundle.js"});
  // }
  chrome.tabs.executeScript(null, {file: "bundles/contentscripts.bundle.js"});
  
});