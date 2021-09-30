# docker4 数据管理


- 数据卷（Volumes）

- 挂载主机目录 (Bind mounts)

<img src="https://s3.bmp.ovh/imgs/2021/09/32da72b743dc5c5d.png"  />

## 数据卷

`数据卷` 可供一个或多个容器使用的特殊目录

- `数据卷`可以在容器之间共享和重用
- 对`数据卷`的修改会立马生效
- 对`数据卷`的更新，不会影响镜像
- `数据卷`会一直存在

数据卷命令

```
> docker volume
  create      Create a volume
  inspect     Display detailed information on one or more volumes
  ls          List volumes
  prune       Remove all unused local volumes
  rm          Remove one or more volumes
```

### 创建数据卷

```
docker volume create my-volume
```

### 查看全部数据卷

```
docker volume ls
```

### 查看数据卷信息

```
❯ docker volume inspect my-volume
[
    {
        "CreatedAt": "2021-09-28T09:24:17Z",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/my-volume/_data",
        "Name": "my-volume",
        "Options": {},
        "Scope": "local"
    }
]
```

### 启动一个挂载数据卷的容器

在`docker run  `时使用 `--mount`标记来将 `数据卷` 挂载到容器里。在一次 `docker run` 中可以挂载多个 `数据卷`。

下面创建一个名为 `web` 的容器，并加载一个 `数据卷` 到容器的 `/usr/share/nginx/html` 目录。

```
docker run -d -P \
    --name web \
    # -v my-vol:/usr/share/nginx/html \
    --mount source=my-vol,target=/usr/share/nginx/html \
    nginx:alpine
```

### 移除无用数据卷

删除容器时同时移除数据卷

```
docker rm -v
```

删除无用的数据卷

```
docker volume prune
```

## 挂载主机目录作为数据卷

```
--mount type=bind,source=/src/webapp,target=/usr/share/nginx/html
```

挂载`/src/webapp`目录到容器的`/usr/share/nginx/html`目录。

本地目录的路径必须是绝对路径，本地路径不存在docker会报错。

docker挂载目录权限默认为`读写`，可以添加`readonly`为只读

```
--mount type=bind,source=/src/webapp,target=/usr/share/nginx/html,readonly
```

## dockerfile 数据卷

自动创建VOLUME 名字是随机的。

```
VOLUME ["/app"]
```

### 挂载目录

挂载当前目录到hello容器的app目录

```
docker container run -d -v $(pwd):/app hello
```

## 多机器之间容器共享数据


