# docker7 多架构和容器安全


## 1. 使用buildx构建多架构镜像

windows 和 mac桌面版自带`buildx`

安装`buildx`，[buildx下载地址](https://github.com/docker/buildx/releases/download/v0.6.3/buildx-v0.6.3.linux-amd64) 下载到`~/.docker/cli-plugins`

```
curl https://github.com/docker/buildx/releases/download/v0.6.3/buildx-v0.6.3.linux-amd64 -o ~/.docker/cli-plugins/docker-buildx
chmod a+x ~/.docker/cli-plugins/docker-buildx
```

使用

```
docker buildx build --push --platform linux/arm/v7,linux/arm64/v8,linux/amd64 -t 镜像名
```

更多命令

```
❯ docker buildx

Usage:  docker buildx [OPTIONS] COMMAND

Build with BuildKit

Options:
      --builder string   Override the configured builder instance

Management Commands:
  imagetools  Commands to work on images in registry

Commands:
  bake        Build from a file
  build       Start a build
  create      Create a new builder instance
  du          Disk usage
  inspect     Inspect current builder instance
  ls          List builder instances
  prune       Remove build cache
  rm          Remove a builder instance
  stop        Stop builder instance
  use         Set the current builder instance
  version     Show buildx version information

```

## 2. 运行环境检查

`docker-bench-security`对主机和docker镜像做评估，[docker-bench-security](https://github.com/docker/docker-bench-security)

```
git clone git@github.com:docker/docker-bench-security.git
cd /docker-bench-security
sudo ./docker-bench-security.sh
```




