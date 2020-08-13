# offlineAPI

- 五车贝部分
```
  /***
     * 充值五车贝
     * path：/api/shellWeChatPay/payment
      {
          "userInfo": {},
          "shell":  "3",
          "deposit": "29",
          "totalMoney": "32",
          "event": "recharge"
      }
     * 
     */
```

```
  /***
     * 五车贝充值支付成功回调
     * path：/api/shellWeChatPay/updatePayment
      {
          "userInfo": {
            "id": "46"
          },
          "shell":  "3",
          "deposit": "29",
          "totalMoney": "32",
          "event": "recharge",
          "order_no": "shell1597044741229"
      }
     * 
     */
```

-智能书柜部分
```
  /***
     * 获取柜子商品
     * path：/api/docker/getDockerBook
     *{
          "docker_mac": "74EE2A542FBA",
          "pageSize":"2",
          "currentPage":"1",
          "filterItems":{
              "isbn13": "123456"
              "id":"1098",
              "title":"小王子",
              "idString":"'1009','1843'"
            }
      }
     */
```


-线下订单部分

```
  /****
     * 新增订单（线下业务下单）
     * path：/api/offlineOrder/buyOfflineBooks
      {	
        "customer_id":"46",
        "type":"shell/coin" shell:五车贝支付  coin：积分支付
        "goods_id":"1320,1055"
      }
     */
```
```
  /****
     * 查看订单情况
     * path：/api/offlineOrder/selOfflineOrder
      {
          "pageSize":"10",
          "currentPage":"1",
          "docker_mac":"74EE2A542FBA",
          "filterItems":{
            "order_no":"20200812120124689OF65",
            "custom_id":"65",
            "pay_type":"coin：积分/shell：五车贝",
            "get_book_code":"026752",
            "get_book_qrcoode":"279467663603167802675209261752",
            "order_type":"0:待取书  1：订单完成   2：取书完成   3：订单失效   4：待还书  5：逾期"
          }
      }
     */
```
```
  /****
     * 还书
     * path：/api/offlineOrder/returnOfflineBooks
      {	
        "order_no":"20200812113823466OF65",
        "uuid":"9787534293122000000"
      }
     */
```