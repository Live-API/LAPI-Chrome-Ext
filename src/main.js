// // let isOn = ($('#lapiChromeExtensionContainer').length > 0); 
// // if (isOn) {
  
//   // Logic for getting the DOM Path for a selected HTML Element
// // Finds the parents of the selected element
//   // Adds classes, id, and index

// $.fn.fullSelector = function () {
//     // returns an array of DOM path
//     var path = this.parents().addBack();
//     // add parents
//     // adds the child, reverses order of the parents (?)
//     var quickCss = path.get().map(function (item) {
//         // add class, id, index
//         var self = $(item),
//             id = item.id ? '#' + item.id : '',
//             // gets all the classes for an item, and chains them together
//             clss = item.classList.length ? item.classList.toString().split(' ').map(function (c) {
//                 return '.' + c;
//             }).join('') : '',
//             name = item.nodeName.toLowerCase(),
//             index = self.siblings(name).length ? ':nth-child(' + (self.index() + 1) + ')' : '';
//         // Check if the name is html or body, which are returned immediately
//         if (name === 'html' || name === 'body') {
//             return name;
//         }
//         // Other elements are returned with their index, id, and classes
//         return name + index + id + clss;
//     // Shows parent-child relationship
//     }).join('>');
//     return quickCss;
// };

// // $(document).on('mouseenter', '*', function(e) {
// //   // $(this).stop().animate({'border': '3px solid yellow'});
// //   $(this).addClass('liveAPI-border-yellow');
// //   e.stopImmediatePropagation();
// // })

// // $(document).on('mouseleave', '*', function(e) {
// //   $(this).removeClass('liveAPI-border-yellow');
// //   // $(this).stop().animate('border', 'none');
// //   e.stopImmediatePropagation();
// // })

// // click on part of the page to see the CSS selector
// $(document).on('click','*', function(){
//     console.log('DOM Path', $(this).fullSelector() );
//     return false;
// });

// /* Avoid selection of parent elements
//     - select div elements that do not have child divs
//     - extract a, li elements

//     Select all elements w/ the same path
//       - upon x, remove extra elements selected
// */

// // Highlighting functionality for a selected HTML element
// // Create a div "overlay" that contains original text and exit button

// $(document).on('click', '.liveAPI-highlight', function(e) {
//   e.stopImmediatePropagation();
// });

// $(document).on('click', '.liveAPI-highlight-wrapper', function(e) {
//   e.stopImmediatePropagation();
// });

// $(document).on('click', '.liveAPI-highlight-button', function(e) {
//   $(this).parent().remove();
//   // prevents other listeners of the same event from being called
//   e.stopImmediatePropagation();
// })

// // #lapiChromeExtensionContainer

// $(document).on('click', '*', function() {
//   let children = $(this).children().map((i, ele) => {
//     return ele.nodeName.toLowerCase();
//   }).get();
//   let path = $(this).parents().addBack().get().map((ele, i) => {
//     return ele.id;
//   })
//   if ($(this)[0].nodeName.toLowerCase() === 'div' && children.includes('div')) return false;
//   if (path.includes('lapiChromeExtensionContainer')) return false;
//   let styles = $(this).css([
//     "width", "height", "font-size", "font-weight", "font-family", "font-variant", "font-stretch", "line-height", "text-transform", "text-align", "padding-top", "padding-bottom", "padding-left", "padding-right", "letter-spacing"]
//   );
  
//   const position = cumulativeOffset(this);
//   $('#lapiChromeExtensionContainer').append(
//     $('<div/>')
//     .offset({top: position.top, left: position.left})

//     // Assign div element the CSS properties of the HTML Element
//     .css({"font-size": styles["font-size"], "font-family": styles["font-family"], "font-variant": styles["font-variant"], "font-stretch": styles["font-stretch"], "line-height": styles["line-height"], "text-transform": styles["text-transform"], "text-align": styles["text-align"], "letter-spacing": styles["letter-spacing"]})
    
//     // Add highlight and ignore classes
//     .addClass('liveAPI-highlight liveAPI-yellow liveAPI-ignore')
//     .append(
//       $('<div/>')
//       .addClass('liveAPI-highlight-wrapper liveAPI-ignore')
//       .css({
//         "max-width": styles["width"], "height": styles["height"],"padding-right": styles["padding-right"]
//       })
//       // .text(cleanWhiteSpace($(this).getText()))
//       .text(cleanWhiteSpace($(this).text()))
//     )
//     .append(
//       $('<a/>')
//       .addClass('liveAPI-highlight-button')
//       .text('x')
//     )
//   );
//   // console.log(cleanWhiteSpace($(this).text()));
// });

// // Remove white space when creating div element
// function cleanWhiteSpace(text) {
//   // Remove whitespace before or after text
//   let revisedText = text.replace(/^\s+|\s+$/, "");
//   // Remove extra spaces between words
//   revisedText = revisedText.replace(/\s\s+/g, " ");
//   return revisedText;
// }

// // $.fn.getText = function() {
// //   let text = this.text();
// //   let childLength = this.children().text().length;
// //   // console.log('childLength', childLength);
// //   // console.log('slice', text.slice(0, text.length - childLength));
// //   // console.log('finished');
// //   return text.slice(0, text.length - childLength);
// // }

// function cumulativeOffset(element) {
//   let top = 0
//   let left = 0;
//   do {
//     top += element.offsetTop  || 0;
//     left += element.offsetLeft || 0;
//     element = element.offsetParent;
//   } while (element);

//   return {
//     top: top + 165,
//     left: left
//   };
// };

// /*
// https://stackoverflow.com/questions/10619445/the-preferred-way-of-creating-a-new-element-with-jquery

// https://stackoverflow.com/questions/11634770/get-position-offset-of-element-relative-to-a-parent-container
// */
// // }



// // Create Event Listeners for Different Element Types
// // Add Helper Functions
// // Bind (this), and execute