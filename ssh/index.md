# ssh免密登录


1. 生成公私钥
```
ssh-keygen -t rsa
```

2. 上次公钥到服务端
```
scp ./id_rsa.pub 服务端账号@服务端ip:/上传到服务端目录
// 创建文件 将公钥写进去
vim authorized_keys

// 也可以不上传，直接复制公钥到服务端 .ssh/authorized_keys文件里
```

## 客户端配置文件演示
`.ssh\config` 文件
```
Host ubuntu
  HostName 192.168.2.30
  User yemo
  IdentityFile C:\Users\test\.ssh\id_rsa
  Port 22
```

## 以前写的
[ssh免密登录](https://yemo0.gitee.io/Other/Linux/SSH.html#ssh-config)
