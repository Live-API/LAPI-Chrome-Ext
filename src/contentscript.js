import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import "./configure-webpack.js";
import 'semantic-ui-css/semantic.css';
import $ from '../jquery.js';

//turn on main.js
// chrome.browserAction.onClicked.addListener(function(tab) {
// chrome.tabs.executeScript(null, {file: "main.js"});
// });

let existsAlready = !($('#lapiChromeExtensionContainer').length === 0);
if (existsAlready!=true) {
    // chrome.tabs.executeScript(null, {file: "contentscript.js"});

    // var url = chrome.extension.getURL('container.html');
    //let height = "35px";
    let height = "165px";

    // var iframe = "<iframe src='"+ url + "' id='lapiChromeExtensionContainer' style='height:"+height+"'></iframe>";

    var containerDiv = "<div id='lapiChromeExtensionContainer' style='height:"+height+"'></div>";

    // var containerDivSpacer = "<div id='lapiChromeExtensionContainerSpacer' style='height:"+height+"'></div>";

    
    // grab old body, place into targetBodyContainer
    // console.log("above clone", ($('#targetBodyContainer').length===0))
    var allBody;
    if ($('#targetBodyContainer').length === 0) { 
      allBody = $('body').clone();
    } else if ($('#targetBodyContainer').length === 1){
      allBody = $('#targetBodyContainer').clone();
    }

    // remove contents of body
    $('body').addClass('liveAPI-body').empty();

    // append chrome ext div
    $('body').append(containerDiv);

    
    if ($('#targetBodyContainer').length === 0) {
    //add targetBodyContainer to body, fill with variable containing old body
    var targetBodyContainer = "<div id='targetBodyContainer'></div>";
    $('body').append(targetBodyContainer);
    $('#targetBodyContainer').append(allBody);
    console.log("running from inside")
    }

    

    // $('body').css({
    //     '-ms-transform': 'translateY(165px)',
    //     '-webkit-transform': 'translateY(165px)',
    //     'transform': 'translateY(165px)'
    // });




    ReactDOM.render(<App />, document.getElementById('lapiChromeExtensionContainer'));
    // console.log("2nd without bang", $('#lapiChromeExtensionContainer'));
    // console.log("2nd with bang", !!$('#lapiChromeExtensionContainer'));
    console.log("2nd without bang", $('#targetBodyContainer'));
    console.log("2nd with one bang", !$('#targetBodyContainer'));
    console.log("2nd with bang", !!$('#targetBodyContainer'));
    console.log("arr length", $('#targetBodyContainer').length);
}
