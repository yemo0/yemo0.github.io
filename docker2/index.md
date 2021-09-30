# docker2 镜像创建、管理


### docker 镜像获取

- pull from `registry` 从registry拉取
- build form `Dockekfile` 从Dockerfile构建
- load form `file` 文件导入

![docker](https://s3.jpg.cm/2021/09/25/IklijT.png)

### 镜像导出导入

#### 导出文件

```
 docker save nginx:latest -o nginx.image
```

就会在当前目录生成`nginx.image`镜像

#### 导入文件

```
docker load -i ./nginx.image
```

### 将容器保存成新镜像

```
docker container commit 容器名 保存为的镜像名
```

#### scratch

空镜像

### 使用scratch构建镜像

go代码

```go
package main

func main() {
        println("hello docker!")
}
```

生成二进制 `hello`文件

`Dockerfile`

```
FROM scratch
ADD hello /
CMD ["/hello"]
```

构建

```
docker build  -t hello .
```

### 镜像构建上下文（Context）

如果注意，会看到 `docker build` 命令最后有一个 `.`。`.` 表示当前目录，而 `Dockerfile` 就在当前目录，因此不少初学者以为这个路径是在指定 `Dockerfile` 所在路径，这么理解其实是不准确的。如果对应上面的命令格式，你可能会发现，这是在指定 **上下文路径**


