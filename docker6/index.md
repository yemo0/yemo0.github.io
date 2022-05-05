# docker6 compose

## 1. 介绍

`Compose`项目是Docker官方开源的项目，负责实现对 Docker 容器集群的快速编排。用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。

`Compose` 中有两个重要的概念：

- 服务 (`service`)：一个应用的容器，实际上可以包括若干运行相同镜像的容器实例。
- 项目 (`project`)：由一组关联的应用容器组成的一个完整业务单元，在 `docker-compose.yml` 文件中定义。

## 2. 安装

`mac` 和 `windows`不需要单独安装

### linux 安装

compose v2 下载地址 [projiect release page](https://github.com/docker/compose/releases)

1. Run the following command to download the current stable release of Docker Compose:

   ```
    mkdir -p ~/.docker/cli-plugins/
    curl -SL https://github.com/docker/compose/releases/download/v2.0.0/docker-compose-linux-amd64 -o ~/.docker/cli-plugins/docker-compose
   ```

   如果为所有用户安装将`~/.docker/cli-plugins` 替换为 `/usr/local/lib/docker/cli-plugins `.

2. Apply executable permissions to the binary

   ```
   chmod +x ~/.docker/cil-plugins/docker-compose
   ```

3. Test installation

   ```
   docker compose version
   ```

## 3. 基础语法和使用

```
version: "3.8"

services: 			# 容器
  servicename: 		# 服务名字，这个名字也是内部 bridge网络可以使用的 DNS name
    image: 			# 镜像的名字
    command: 		# 可选，如果设置，则会覆盖默认镜像里的 CMD命令
    environment: 	# 可选，相当于 docker run里的 --env
    volumes: 		# 可选，相当于docker run里的 -v
    networks: 		# 可选，相当于 docker run里的 --network
    ports: 			# 可选，相当于 docker run里的 -p
    build:			# 可选，build dockerfile
  servicename2:
	volumes: 		# 可选，相当于 docker volume create
	networks: 		# 可选，相当于 docker network create
```

### 命令和选项

```
Docker Compose
Options:
      --ansi string                Control when to print ANSI control characters ("never"|"always"|"auto") (default "auto")
      --compatibility              Run compose in backward compatibility mode
      --env-file string            Specify an alternate environment file.
  -f, --file stringArray           Compose configuration files
      --profile stringArray        Specify a profile to enable
      --project-directory string   Specify an alternate working directory
                                   (default: the path of the Compose file)
  -p, --project-name string        Project name

Commands:
  build       Build or rebuild services
  convert     Converts the compose file to platform's canonical format
  cp          Copy files/folders between a service container and the local filesystem
  create      Creates containers for a service.
  down        Stop and remove containers, networks
  events      Receive real time events from containers.
  exec        Execute a command in a running container.
  images      List images used by the created containers
  kill        Force stop service containers.
  logs        View output from containers
  ls          List running compose projects
  pause       pause services
  port        Print the public port for a port binding.
  ps          List containers
  pull        Pull service images
  push        Push service images
  restart     Restart containers
  rm          Removes stopped service containers
  run         Run a one-off command on a service.
  start       Start services
  stop        Stop services
  top         Display the running processes
  unpause     unpause services
  up          Create and start containers
```

### 启动一个compose

文件`docker-compose.yml`当前目录`/home/yemo/dockerTest` 。如需后台运行使用`docker compose up -d` 

```
❯ docker compose up
[+] Running 7/7
 ⠿ redis-server Pulled                                                                                                                                                 20.5s
   ⠿ 07aded7c29c6 Pull complete                                                                                                                                         7.4s
   ⠿ 1a5d64c027a4 Pull complete                                                                                                 
[+] Running 3/3
 ⠿ Network dockertest_demo-network      Created                                                                                                                         0.2s
 ⠿ Container dockertest-nginx-demo-1    Created                                                                                                                         0.5s
 ⠿ Container dockertest-redis-server-1  Created                                                                                                                         0.5s
```

docker compose 生成的容器名称会使用当前目录作为前缀

## 4. 服务更新

吧需要`build`的重新`build`,如果镜像发生了改变就会`build`

`docker copose up --build`

## 5. 网络

## 6. 水平扩展 scale

`web2`镜像信息:  [web镜像构建和代码](http://localhost:1313/docker3/#10-%E5%A4%9A%E9%98%B6%E6%AE%B5%E6%9E%84%E5%BB%BA)

目录

- web
  - nginx
    - nginx.conf
  - docker-compose.yml

`docker-compose.yml`

```dockerfile
version: "3"
services: 
  web:
    image: web2
    networks:
      - demo-network
  nginx:
    image: nginx
    ports:
      - 80:80
    depends_on:
      - web
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./var/log/nginx:/var/log/nginx
    networks:
      - demo-network
networks:
  demo-network:

```

`nginx.conf`

```
server {
  listen  80 default_server;
  location / {
    proxy_pass http://web:8080;
  }
}
```

### 运行

`-d`后台运行。

```
❯ docker compose up -d --scale web=3
[+] Running 4/4
 ⠿ Container web-web-1    Running                                                                                                                                       0.0s
 ⠿ Container web-web-3    Running                                                                                                                                       0.0s
 ⠿ Container web-web-2    Running                                                                                                                                       0.0s
 ⠿ Container web-nginx-1  Started 
```

使用`curl` 请求

```
❯ curl 127.0.0.1
351
yemo@yemo ~/dockerTest/web
❯ curl 127.0.0.1
760
yemo@yemo ~/dockerTest/web
❯ curl 127.0.0.1
519
yemo@yemo ~/dockerTest/web
❯ curl 127.0.0.1
351
yemo@yemo ~/dockerTest/web
❯ curl 127.0.0.1
760
```

## 7. 环境变量 environment

`environment`设置环境变量。你可以使用数组或字典两种格式。

```
environment:
  - REDIS_PASS=abc123
  - REDIS_NAME=${REDIS_NAME}
```

使用文件导入，在`docker-compose`文件目录下创建`.env`

`.env`

```
REDIS_NAME=myName
```

如果不想使用默认名字`.env`可以使用`env_file`命令指定文件

```\
docker-compose --env-file 文件
```

## 8. 服务依赖和健康检查

`healthcheck`通过命令检查容器是否健康运行

```yaml
 healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 40s
```

`docker compose`文件

```yaml
version: "3"
services: 
  web:
    image: web2
    build:
      context: ./
      # build那个dockerfile文件
      dockerfile: dockerfile
    networks:
      - demo-network
    # 通过命令检查容器是否健康运行
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 40s
  nginx:
    image: nginx
    ports:
      - 80:80
    # 启动顺序
    depends_on:
      # - wbe
      # 如果web服务不是healthy就不启动
      web:
        condition: service_healthy
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./var/log/nginx:/var/log/nginx
    networks:
      - demo-network
networks:
  demo-network:

```



## 9. 更多compose命令

[docker compose 模板](https://yeasy.gitbook.io/docker_practice/compose/compose_file)

[compose reference](https://docs.docker.com/compose/reference/)


