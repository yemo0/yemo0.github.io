# git 基础使用


## 配置git

```
$ git config --global user.name "yemo"    // 用户名和账号名一致
$ git config --global user.email "10000@qq.com"    // 邮箱
```

查看是否配置成功

```
 git config -l
```

## 初始化版本库

```
git init
```

## 添加暂存区 & 本地库

```
git add <file> // 添加到缓存区
git add . // 全部提交到暂存区
```

## 查看版本信息

```
git reflog
1dexxxx (HEAD -> master, origin/master, origin/HEAD) HEAD@{0}: clone: from git@github.com:yemo0/blog.git

# 查看更详细的版本
git log
```

## 版本切换

```
git reset --HEAD [ 版本号]
```

## 分支

```
// 创建分支
git branch [版本名称]

// 查看分支
git branch -v

// 查看全部分支
git branch -a

// 切换分支
git checkout [分支名称]

// 吧指定的分支合并到当前分支
git merge [分支名称]

// 删除本地分支
git branch -d [分支名称]

// 强制删除本地分支
git branch -D [分支名称]

// 删除远程分支
git push origin --delete [分支名称]
```

## 远程仓库

```
git remote add [别名] [仓库链接]

// 查看
git remote -v

// 默认
git push -u [别名] [分支]
// 列
git push -u origin master 
```

## ssh

```
ssh-keygen
    -t：指定要创建的密钥类型。
    -b 指定密钥长度，通常是2048位，也就1024 * 2
    -e：读取openssh的私钥或者公钥文件； 
    -C：添加注释； 
    -f：指定用来保存密钥的文件名； 
    -i：读取未加密的ssh-v2兼容的私钥/公钥文件，然后在标准输出设备上显示openssh兼容的私钥/公钥； 
    -l：显示公钥文件的指纹数据； 
    -N：提供一个新密语； 
    -P：提供（旧）密语；
    -q：静默模式； 
```



## 使用bfg删除敏感信息

[bfg官网](https://rtyley.github.io/bfg-repo-cleaner/)，下载使用bfg.jar

```
java -jar bfg.jar
```

使用文章 [腾讯云](https://cloud.tencent.com/developer/article/1490209)
