// diary 禁止
var test = window.location.pathname;
var ts = test.split("/")
for (var i =0; i < ts.length; i++) {
    if (ts[i] == "diary") {
        history.back()
    }
}

// window.onload = function() {
//     var s = document.getElementsByClassName("code-header")
//     for(var i =0; i < s.length; i++) {
//         s[i].style.background = "black"
//     }
// }

// document.addEventListener("DOMContentLoaded", function() {
//     var s = document.getElementsByClassName("code-header")
//     for(var i =0; i < s.length; i++) {
//         s[i].style.background = "black"
//     }
// })