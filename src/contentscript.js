import React from 'react';
import ReactDOM from 'react-dom';

var url = chrome.extension.getURL('toolbar.html');
let height = "35px";

var iframe = "<div src='"+ url + "' id='lapiChromeExtensionToolbar' style='height:"+height+"'></div>";

$('body').append(iframe);

$('body').css({
    '-webkit-transform': 'translateY('+height+')'
});

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('lapiChromeExtensionToolbar')
);