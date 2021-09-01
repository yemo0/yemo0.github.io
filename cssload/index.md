# js获取到数组但无法获取length


js获取到数组但无法获取length
<!--more-->

### js代码
```js
var code = document.getElementsByClassName("code-header")
console.log(code)

// 获取结果
// HTMLCollection []
// 0: div.code-header.language-fallback
// 1: div.code-header.language-fallback
// 2: div.code-header.language-fallback
// 3: div.code-header.language-go
// length: 4

console.log(code.leng) // 0
```

### 因为页面没加载完毕就执行了js
```js
// 等加载完毕执行
window.onload = function() {
    var code = document.getElementsByClassName("code-header")
    console.log(code.length)
}
```

### 页面文档加载解析完毕执行
```js
// 当页面文档加载并解析完毕之后会马上触发 DOMContentLoaded 事件
document.addEventListener("DOMContentLoaded", function() {
   var code = document.getElementsByClassName("code-header")
    console.log(code.length)
})
```
