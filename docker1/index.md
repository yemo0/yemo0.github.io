# docker1 安装、加速


### 镜像加速
直接修改 /etc/docker/daemon.json
```
{"registry-mirrors": ["https://registry.cn-hangzhou.aliyuncs.com"]}
```
镜像地址
```
腾讯云 docker hub mirror
https://mirror.ccs.tencentyun.com

华为云
https://05f073ad3c0010ea0f4bc00b7105ec20.mirror.swr.myhuaweicloud.com

网易
http://hub-mirror.c.163.com
```

### docker 安装

[参考文档](https://yeasy.gitbook.io/docker_practice/install)

### 容器常用操作

查找镜像

```docker
docker search xxx
```

下载镜像

```
docker pull xxx:TAG
// TAG表示版本，不写默认最新版latest
```

查找镜像

```
docker images
```

删除镜像

```
docker rmi -f 镜像ID或镜像名(有版本号需要带版本号)
# 删除指定本地镜像
# -f 强制删除
# ID可以不用填写完
```

删除元信息

```
docker inspect 镜像ID或镜像名(有版本号带版本号)
# 获取镜像的元信息,详情信息
```

### 容器常用操作

运行

```
docker run --name 容器名 -i -t -p 主机端口:容器端口 -d -v 主机目录:容器目录:ro 镜像ID或镜像名:TAG
# --name 指定容器名, 不指定自动命名
# -i 以交互模式运行容器
# -t 分配一个伪终端(命令行), 通常-it组合使用
# -p 指定端口 主机端口映射到容器端口
# -d 后台运行容器
# -v 指定挂载主机到容器目录, 默认为rw读写模式, ro表示只读
# --rm t
```

容器列表

```
docker ps -a -q
# docker ps 查看正在运行的容器
# -a 查看使用容器(运行中、未运行)
# -q 只查看容器ID
```

启动容器

```
docker start 容器ID或容器名
```

停止容器

```
docker stop 容器ID或容器名
```

删除容器

```
docker rm -f 容器ID或容器名
# -f 强制删除
```

以交互模式执行容器内

```
docker exec -it 容器ID或容器名 /bin/bash
# 进入正在运行的容器并且开启交互模式终端
# /bin/bash 固有写法, 作用是因为docker后台必须运行一个进程，否则容器就会退出，在这里表示启动容器后启动
bash
# 也可以用docker exec在运行中的容器执行命令
```

拷贝文件

```
docker cp 主机文件路径 容器ID或容器名:容器路径 #主机中文件拷贝到容器中
docker cp 容器ID或容器名:容器路径 主机文件路径 #容器中文件拷贝到主机中
```

删除停掉的容器

```
docker system prune -f
```



### 更多操作

`docker help`

```
 docker help

Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default "/home/yemo/.docker")
  -c, --context string     Name of the context to use to connect to the daemon (overrides DOCKER_HOST env var and default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default "/home/yemo/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default "/home/yemo/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default "/home/yemo/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  builder     Manage builds
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.

To get more help with docker, check out our guides at https://docs.docker.com/go/guides/
```

### docker 批量操作

```
# 列出所有容器ID
docker ps -aq
8c10a849e208
7e2ad94e8a1e
8c5974b7c381
ff000a994e6f
374e9a214ca6
aa72625b2981
# 停止所有容器
docker stop $(docker p)
```


