# docker搭建samba共享


使用`docker` `dperson/samba`镜像
[dperson/samba](https://hub.docker.com/r/dperson/samba)

```docker
sudo docker run -it --name samba -p 139:139 -p 445:445 \
 -v /root/samba-data:/mount \
 -d dperson/samba -ps
```

### 添加系统用户

**添加samba用户前系统用户必须存在，系统用户没有的不能添加**

```shell
useradd username //新增
passwd username // 设置用户密码
```

### 添加samba用户

```shell
 smbpasswd -a username
```

### 配置samba

```
vi /etc/samba/sms.conf

[share]
   path = /mount
   browsable = yes
   read only = no
   guest ok = no
   delete veto files = yes
   admin users = user01
   write list = user01
```

[参考文章 docker搭建samba服务smb网络磁盘共享](https://blog.csdn.net/flysnownet/article/details/112311200)
