# 使用腾讯云部署一个 serverless web 应用


serverless 使用腾讯云部署一个web应用
<!--more-->

## 快速部署一个web应用
[serverless components](https://github.com/serverless/components)
```shell
npm i -g serverless
```

**配置账号权限** 

在项目目录下创建`.env`文件
```
# .env
TENCENT_SECRET_ID=xxxxxxxxxx #您账号的 SecretId
TENCENT_SECRET_KEY=xxxxxxxx #您账号的 SecretKey
```

**创建一个 scf 示例**
```
serverless init scf-golang
# sls 不知道怎么安装的...
sls init scf-golang
```

**修改 yarm 文件成类似下面这样**
```yarm
app: xxx-name
component: scf
name: scf-golang

inputs:
  src: ./
  # 指定 scf 类型为 web 类型
  # 默认 type 为事件型函数
  type: web
  runtime: Go1
  namespace: default
  region: ap-hongkong
  memorySize: 128
  timeout: 3
  triggers:
    - type: apigw
      name: SCF_API_SERVICE
      protocols:
      - http
      - https
      environment: release
      netTypes:
      - OUTER
      apis:
      - path: /
        method: ANY
```

**默认启动文件为 scf_bootstrap**<br>
**默认启动文件为 scf_bootstrap**<br>
**默认启动文件为 scf_bootstrap**<br>

**部署**
```shell
serverless deploy
```

## 其他
[腾讯云serverlss](https://cloud.tencent.com/document/product/1154/58184#web-.E6.A1.86.E6.9E.B6.E8.BF.81.E7.A7.BB)
