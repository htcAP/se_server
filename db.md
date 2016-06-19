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