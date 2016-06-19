#### User

|Key|type|Description|
|---|---|---|
|uid|int||
|username|||
|password|||

#### Meeting

|Key|type|description|
|---|---|---|
|mid|int||
|title|||
|note|||
|start_time|date||
|end_time|date||
|rid|int|room id|

#### Room

|key|type|description|
|---|---|---|
|rid|||
|name|||

#### MeetingUser

|key|type|description|
|---|---|---|
|muid|int||
|mid|int|meeting id|
|uid|int|user id|
|user_type|int|用户参加标准|

	int USER_TYPE_REQUIRED = 1;
	int USER_TYPE_SUGGESTED = 2;
	int USER_TYPE_NO_IMPORTANT = 0;

