// diary 禁止
// var test = window.location.pathname;
// var ts = test.split("/")
// for (var i =0; i < ts.length; i++) {
//     if (ts[i] == "diary") {
//         history.back()
//     }
// }


window.onload = function() {
   if (window.location.pathname == "/") {
       window.location.replace("/posts/")
   }
}

// document.addEventListener("DOMContentLoaded", function() {
//     var s = document.getElementsByClassName("code-header")
//     for(var i =0; i < s.length; i++) {
//         s[i].style.background = "black"
//     }
// })
// var code = document.getElementsByClassName("code-title")
// for (var i = 0; i < code.length; i++) {
//     // console.log(code[i])
//     console.log(code[i].parentNode)
// }
var fallback = document.getElementsByClassName("language-fallback")
for (var i = 0; i < fallback.length; i++) {
    if (fallback[i].className == "language-fallback") {
        fallback[i].style.color = "#000"    
    }
}
