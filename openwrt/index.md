# docker安装openwrt


docker安装openwrt

<!--more-->
## 拉取镜像

```bash
docker pull piaoyizy/openwrt-aarch64
```

## 打开网卡混杂模式

```
sudo ip link set eth0 promisc on
```

### 创建网络

```
docker network create -d macvlan --subnet=192.168.2.0/24 --gateway=192.168.2.9 -o parent=eth0 macnet
```

### 开启容器

```
docker run --name openwrt --restart always -d --network macnet --privileged piaoyizy/openwrt-aarch64:latest
```

### 修改docker内的openwrt网络设置

```
docker exec -it openwrt /bin/bash

vi /etc/config/network
// 修改ipaddr默认地址 改为openwrt的地址
// 加入option gateway '网关'
// 加入option dns '网关'
```

### 重启容器

```
docker restart openwrt
```

### 国内访问慢

```
在防火墙加入自定义规则
iptables -t nat -I POSTROUTING -o eth0 -j MASQUERADE

关闭lan口桥接模式
```



### 参考文章

[参考文章](https://wherelse.cc/post/Install-openwrt-under-Docker-for-bypass-router/)

[参考文章2](https://snitxmhm.github.io/2020/05-01-arm64%E6%9E%B6%E6%9E%84openwrt-docker%E9%83%A8%E7%BD%B2/)


