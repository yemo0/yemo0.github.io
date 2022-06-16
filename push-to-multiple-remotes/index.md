# git push到多个远程仓库


执行`git push`同时提交到两个仓库。
<!--more-->

## 方法1
```shell
git remote set-url --add [别名] [仓库地址]
```

## 方法2
修改`.git/config`文件，类似下面这样：
```
[remote "gitlab"]
	url = git@gitlab.com:yemo0/xxx.git
	fetch = +refs/heads/*:refs/remotes/gitlab/*
    url = git@github.com:yemo0/xxx.git
```
