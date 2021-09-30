# docker3 dockerfile


## RUN

`RUN`执行命令，两种格式

- shell 格式：`RUN <命令>`

```
RUN pwd
```

- exec 格式：`RUN ["可执行文件", "参数1", "参数2"]`

### 注意RUN 写法

dockerfile中每一个指令都会建立一层，`RUN`也不例外

每一行的RUN命令都会产生一层image layer, 导致镜像的臃肿。

```
FROM ubuntu:21.04
RUN apt-get update
RUN apt-get install -y wget
RUN wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz
RUN tar zxf ipinfo_2.0.1_linux_amd64.tar.gz
RUN mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo
RUN rm -rf ipinfo_2.0.1_linux_amd64.tar.gz
```

### 改进

```
FROM ubuntu:21.04
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz && \
    tar zxf ipinfo_2.0.1_linux_amd64.tar.gz && \
    mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_2.0.1_linux_amd64.tar.gz
```

## COPY 复制文件

`COPY <src> <dest>`

复制本地主机的 <src> (为 Dockerfile 所在目录的相对路径，文件或目录) 为容器中的 <dest>。目标路径不存在时，会自动创建。当使用本地目录为源目录时，推荐使用 COPY。

```
COPY package.json /usr/src/app/
```

`<src>`可以是多个，甚至是通配符。其通配符规则要满足 Go 的 [`filepath.Match`](https://golang.org/pkg/path/filepath/#Match) 规则，如：

```
COPY hom* /mydir/
COPY hom?.txt /mydir/
```

在使用该指令的时候还可以加上 `--chown=<user>:<group>` 选项来改变文件的所属用户及所属组。

```
COPY --chown=55:mygroup files* /mydir/
COPY --chown=bin files* /mydir/
COPY --chown=1 files* /mydir/
COPY --chown=10:11 files* /mydir/
```

## ADD 复制文件

`ADD` 指令和 `COPY` 的格式和性质基本一致。但是在 `COPY` 基础上增加了一些功能。

`<src>`是一个`URL`时，docker引擎会试图下载，并放到``目标目录，如果是一个压缩文件，压缩格式为 `gzip`, `bzip2` 以及 `xz` 的情况下`ADD` 指令将会自动解压缩这个压缩文件到 `<目标路径>` 去。

## WORKDIR 指定工作目录

格式为 `WORKDIR <工作目录路径>`。

使用 `WORKDIR` 指令可以来指定工作目录（或者称为当前目录），以后各层的当前目录就被改为指定的目录，如该目录不存在，`WORKDIR` 会帮你建立目录。

## 构建参数和环境变量

```
FROM ubuntu:21.04
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-2.0.1/ipinfo_2.0.1_linux_amd64.tar.gz && \
    tar zxf ipinfo_2.0.1_linux_amd64.tar.gz && \
    mv ipinfo_2.0.1_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_2.0.1_linux_amd64.tar.gz
```

### ENV

```
FROM ubuntu:21.04
ENV VERSION=2.0.1
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-${VERSION}/ipinfo_${VERSION}_linux_amd64.tar.gz && \
    tar zxf ipinfo_${VERSION}_linux_amd64.tar.gz && \
    mv ipinfo_${VERSION}_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_${VERSION}_linux_amd64.tar.gz
```

### ARG

```
FROM ubuntu:21.04
ARG VERSION=2.0.1
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/ipinfo/cli/releases/download/ipinfo-${VERSION}/ipinfo_${VERSION}_linux_amd64.tar.gz && \
    tar zxf ipinfo_${VERSION}_linux_amd64.tar.gz && \
    mv ipinfo_${VERSION}_linux_amd64 /usr/bin/ipinfo && \
    rm -rf ipinfo_${VERSION}_linux_amd64.tar.gz
```

### 区别

![](https://s3.bmp.ovh/imgs/2021/09/17612ca9465a0dbb.png)

## CMD 容器启动命令

```
shell` 格式：`CMD <命令>
exec` 格式：`CMD ["可执行文件", "参数1", "参数2"...]
```

- 容器启动时默认执行的命令
- 如果docker container run启动容器时指定了其它命令，则CMD命令会被忽略
- 如果定义了多个CMD，只有最后一个会被执行。

```
CMD ["cd app"] # 容器启动自动执行cd
CMD []	# 在命令行后面输入命令
```

# ENTRYPOINT 入口点

- `ENTRYPOINT` 和 `CMD` 可以联合使用，`ENTRYPOINT` 设置执行的命令，CMD传递参数

## EXPOSE暴露端口

告诉 Docker 服务，容器需要暴露的端口号，供互联系统使用。在启动容器时需要通过 -P 参数让 Docker 主机分配一个端口转发到指定的端口。使用 -p 参数则可以具体指定主机上哪个端口映射过来。

```
EXPOSE 8
```



## dockerignore

忽略掉文件或文件夹

使用命令构建hello镜像

```
docker image build -t hello .
```

再`docker build`过程中，首先会将上下文目录打包传递给`docker引擎`，但有些文件不需要就可以使用`.dockerignore`忽略掉。

## 多阶段构建

[多阶段构建文章](https://yeasy.gitbook.io/docker_practice/image/multistage-builds)


