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

### 数据库操作部分

所有从数据库操作返回的model在获取属性的时候统一使用get方法，具体示例请看测试文件（位于test/api/service目录下），
在传入数据做操作的时候不要直接将获取到的model传回去，请使用.操作符（属性访问操作符）可以直接访问到的js object

以下为数据库操作api

#### User

|方法|说明|
|---|---|
|register||
|login||
|getByUid||
|getByUidList||
|currentUser|自动缓存登录用户的数据。 例如，判断当前用户是否为空，为空就跳转到登录页面让用户登录，如果不为空就跳转到首页|
|logout||


#### Meeting

|方法|说明|
|---|---|
|createMeeting||
|deleteMeeting||
|deleteMeetingList||
|updateMeeting||
|getMeetings||
|getMeetingsByTime|放回规则，只要会议时间有一部分是在传入的时间段参数的范围内的，就会将其返回|
|getMeetingByMid||
|getByMidList||
|getMeetingsByRid||

#### Room

|方法|说明|
|---|---|
|createRoom||
|deleteRoom||
|updateRoom||
|getByRid||
|getRooms||
|getByRidList||

#### MeetingUser

|方法|说明|
|---|---|
|createMeetingUser||
|getListByMeetingAndUserType||
|getListByMid||
|getListByUid||
|getMeetings||
|getByMuid||
|deleteMeetingUser||