# docker 基础使用1


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

### 镜像使用
