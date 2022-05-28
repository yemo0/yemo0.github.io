document.querySelector(".language").remove()
var article = document.querySelectorAll("article")

if (location.pathname == "/") {
    article.forEach((e) => {
        e.setAttribute("class", e.getAttribute("class") + " _article")
    })
    article.forEach((e) => {
        e.onmouseover = function () {
            this.style.cursor = "pointer"
        }
        e.onmousedown = function () {
            location.assign(location.href + e.querySelector("a").getAttribute("href"))
        }
    })
}