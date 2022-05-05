# Hugo使用

## hugo安装

hugo的安装与美化
<!--more-->

```bash
//ubuntu
sudo apt install hugo
//mac
brew install hugo
```

## 使用主题
```
//下载
git clone https://github.com/dillonzq/LoveIt.git themes/LoveIt
//配置文件
cp themes/LoveIt/exampleSite/config.toml .
```

##Console报错找不到 site.webmanifest
解决方法
- [site.webmanifest](https://www.bahuangshanren.tech/hugo-loveit%E4%BC%98%E5%8C%96%E8%AE%B0/)

## 文档
- [LoveIt文档](https://hugoloveit.com/zh-cn/theme-documentation-basics/)
- [loveIt美化文档](https://lewky.cn/posts/hugo-3.html/#%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B%E5%92%8C%E6%95%88%E6%9E%9C%E5%B1%95%E7%A4%BA)
- [好看的博客](https://akilar.top/)
- [参考文章](https://www.bahuangshanren.tech/hugo-loveit%E4%BC%98%E5%8C%96%E8%AE%B0/#%E9%83%A8%E7%BD%B2%E6%96%B9%E5%BC%8F)

## hugo常用命令
```
// 编译 
hugo
// --buildFuture include content with publishdate in the future
hugo server -F
```
