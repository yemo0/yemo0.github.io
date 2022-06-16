# vue 项目@没路径提示

vue 项目使用@路径提示。

<!--more-->
1. 在项目下面创建`jsconfig.json`

2. 写入内容
   
   ```json
   {
       "compilerOptions": {
           "baseUrl": ".",
           "paths": {
               "@/*": [
                   "./src/*"
               ]
           }
       },
       "exclude": [
           "node_modules",
           "dist"
       ]
   }
   ```

3. 

