```
  /***
     * 创建话题
     * path：/api/reading/addReadingTopic
      {
          "custom_id": "61",
          "type": "vitality",   话题类型 vitality：活力打卡，chat：轻松畅聊，pk：阅读PK 
          "title": "话题名称",
          "description": "话题描述",
          "reward_shell": "5", 注：传零(et_app)
          "reward_free": "2", 注：传零(et_app)
          "reward_coin": "50", 注：传零(et_app)
          "reward_gift": "礼物",注：没有奖励传空(et_app)
          "reward_vitality": "1",注：没有目标活力值传零，默认每次打卡只能获得1活力值(et_app)
          "target_vitality": "30",注：没有目标活力值传零(et_app)
          "start_time": "2020-10-03 00:00:00",
          "end_time": "2020-10-09 00:00:00",
          "day_mark_count": "2",注：根据话题类型每天做多可以打卡几次传对应次数(et_app)
          "status": "1", 话题状态：0:未开始 1:进行中，2：已结束 注：传零，后台做处理(et_app)
          "show_status": "2",  0:不显示，1：显示， 2：审核中 3：违规 注：传零，后台做处理(et_app)
          "show_comment": "0" 0:不显示评论，1：显示评论
          "show_range":  "school", 范围：(school:学校，grade：年级，class：班，all：全站)
					注：根据选择范围传对应学校年级班级id，可以传空(et_app)
          "school_id": "2",
          "grade_id": "1",
          "class": "3"
      }
     * 
     */
```

```
  /***
     * 编辑话题
     * path：/api/reading/modReadingTopic
      {   
          "id": "1",
          "custom_id": "61",
          "type": "vitality",   话题类型 vitality：活力打卡，chat：轻松畅聊，pk：阅读PK 
          "title": "话题名称",
          "description": "话题描述",
          "reward_shell": "5",
          "reward_free": "2",
          "reward_coin": "50",
          "reward_gift": "礼物",
          "reward_vitality": "1",
          "target_vitality": "30",
          "start_time": "2020-10-03 00:00:00",
          "end_time": "2020-10-09 00:00:00",
          "day_mark_count": "2",
          "show_comment": "0" 0:不显示评论，1：显示评论
          "show_range":  "school", 范围：(school:学校，grade：年级，class：班，all：全站)
          "school_id": "2",
          "grade_id": "1",
          "class": "3"
      }
     * 
     */
```

```
  /***
     * 查看话题
     * path：/api/reading/selReadingTopic
      {
          "pageSize":"10",
          "currentPage":"1",
          "filterItems":{
            "id": "1"
            "custom_id": "61",
            "type": "vitality",   话题类型 vitality：活力打卡，chat：轻松畅聊，pk：阅读PK 
            "title": "话题名称",
            "show_comment": "0" 0:不显示评论，1：显示评论
            "show_range":  "school", 范围：(school:学校，grade：年级，class：班，all：全站)
            "school_id": "2",
            "grade_id": "1",
            "class": "3"
          }
      }
     * 
     */
```

```
  /***
     * 创建打卡
     * path：/api/reading/addReadingMark
      {
          "custom_id": "61",
          "content": "打卡内容",   话题类型 vitality：活力打卡，chat：轻松畅聊，pk：阅读PK 
          "topic_id": "1",
          "show_status": "2",  0:不显示，1：显示， 2：审核中 3：违规(et_app可以不传)
          "show_comment": "0" 0:不显示评论，1：显示评论(目前暂时跟话题同步)
      }
     * 
     */
```

```
  /***
     * 修改打卡
     * path：/api/reading/modReadingMark
      {
          "id": "1",
          "content": "打卡内容",   话题类型 vitality：活力打卡，chat：轻松畅聊，pk：阅读PK 
          "show_comment": "0" 0:不显示评论，1：显示评论
      }
     * 
     */
```

```
  /***
     * 删除打卡
     * path：/api/reading/delReadingMark
      {   
          "id": "7"
      }
     * 
     */
```

```
  /***
     * 查看打卡
     * path：/api/reading/selReadingMark
      {
          "pageSize":"10",
          "currentPage":"1",
          "filterItems":{
            "id": "1"
            "custom_id": "61",
            "topic_id": "2",
            "content": "test",
            "show_status": "0" 0:不显示，1：显示， 2：审核中 3：违规
            "show_comment":  "1" 0:不显示评论，1：显示评论
          }
      }
     * 
     */
```

```
/***
     * 创建评论
     * path：/api/reading/addReadingComment
      {
          "custom_id": "61",
          "content": "打卡内容",   话题类型 vitality：活力打卡，chat：轻松畅聊，pk：阅读PK 
          "topic_id": "1",
          "mark_id": "2",
          "show_status": "2",  0:不显示，1：显示， 2：审核中 3：违规
      }
     * 
     */
```

```
/***
     * 删除评论
     * path：/api/reading/delReadingComment
      {   
          "id": "7"
      }
     * 
     */
```

```
/***
     * 查看评论
     * path:/api/reading/selReadingComment
      {
          "pageSize":"10",
          "currentPage":"1",
          "filterItems":{
            "id": "1"
            "custom_id": "61",
            "topic_id": "2",
            "mark_id": "2",
            "content": "test",
            "show_status": "0" 0:不显示，1：显示， 2：审核中 3：违规
          }
      }
     * 
     */
```

```
/***
     * 创建或删除点赞
     * path:/api/reading/addOrDelReadingLike
      {
          "custom_id": "61",
          "topic_id": "1",
          "mark_id": "2"
      }
     * 
     */
```

```
/***
     * 查看点赞
     * path:/api/reading/selReadingLike
      {
          "pageSize":"10",
          "currentPage":"1",
          "filterItems":{
            "id": "1"
            "custom_id": "61",
            "topic_id": "2",
            "mark_id": "2"
          }
      }
     * 
     */
```

```
/***
     * 查看奖励
     * path:/api/reading/selReadingReward
      {
          "pageSize":"10",
          "currentPage":"1",
          "filterItems":{
            "id": "1"
            "custom_id": "61",
            "topic_id": "2",
            "status": "1" (0:已获得未领取，1：已获得已领取，2：已核销)
          }
      }
     * 
     */
```

```
/***
     * 创建举报
     * path:/api/reading/addReadingReport
      {
          "custom_id": "61",
          "type": "topic", 
          "content": "举报内容",  
          "topic_id": "1",
          "mark_id": "2",
          "comment_id": "3"
      }
     * 
     */
```

```
/***
     * 查看举报
     * path:/api/reading/selReadingReport
      {
          "pageSize":"10",
          "currentPage":"1",
          "filterItems":{
            "id": "1"
            "custom_id": "61",
            "type": "topic",
            "topic_id": "2",
            "mark_id": "1",
            "comment_id": "3",
            "content": "test",
            "show_status": "0" 0:不显示，1：显示， 2：审核中 3：违规
          }
      }
     * 
     */
```

```
/***
     * 查看活力值详细
     * path:/api/reading/selReadingVitalityDetail
      {
          "pageSize":"10",
          "currentPage":"1",
          "filterItems":{
            "id": "1"
            "custom_id": "46",
            "topic_id":  "3",
            "mark_id": "1",
            "event": "addReadingMark"
          }
      }
     * 
     */
```

```
/***
     * 查看周排名
     * path:/api/reading/selReadingVitalityCount
      {
          "pageSize":"10",
          "currentPage":"1",
          "filterItems":{
            "id": "1"
            "custom_id": "46",
            "sort":  "3"
          }
      }
     * 
     */
```

```
/***
     * 上传图片回调
     * path:/api/upload/addUploadPic
      {
          "targetId":"10",       //如果是话题传话题ID,如果是打卡传打卡ID，如果是评论传评论ID
          "usage":"reading_topic",     //话题：reading_topic， 打卡：reading_mark， 评论：reading_comment
          "res":"上传后的返回数据"
      }
     * 
     */
```

```
/***
     * 删除图片
     * path:/api/upload/delUploadPic
      {
          "url":"阿里云返回的url"，
          "name":"图片名称"
      }
     * 
     */
```