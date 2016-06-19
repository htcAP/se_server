# Confluence

使用 Node.js 构建，使用 [restify](http://restify.com/#common-handlers-serveruse)、 [swagger](https://github.com/swagger-api/swagger-node) 中间件。

### 搭建开发环境

下载项目：

```shell
git clone https://github.com/htcAP/se_server.git
```

进入工作目录：

```shell
cd se_server
```

安装项目需要的依赖：

```shell
npm install
```

运行项目：

```shell
swagger project start
```

### 查看 API

API 层使用 [swagger](https://github.com/swagger-api/swagger-node) 中间件构建。代码变动后 node 会执行热更新，但 api 文档本身是静态的，需要手动重启更新。

使用 Swagger UI 查看 API 文档：

```rust
http://localhost:10010/apidoc/index.html
```

![image](https://cloud.githubusercontent.com/assets/7262715/16170784/15936520-3591-11e6-85f9-7b3d4081ea84.png)

在线调试 API：

![image](https://cloud.githubusercontent.com/assets/7262715/16170791/4382b04e-3591-11e6-880d-1e0f3688f5fe.png)

使用 Swagger 编辑器修改 API：

```shell
swagger project edit
```

![image](https://cloud.githubusercontent.com/assets/7262715/16170802/9fc206fc-3591-11e6-812b-6149c1436f67.png)

### 提交规范

- 使用新的分支工作，通过 Pull Request 和主分支合并。


- 使用 npm 全家桶，不要上传依赖的框架代码。

```shell
npm install <package_name> --save
```

- 使用 ES 6 语法，保证代码风格统一（`let`、箭头函数）。

