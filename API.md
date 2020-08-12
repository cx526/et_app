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
     * {
     *    docker_mac: 74EE2A542FBA
     *    "pageSize":2,
     *    "currentPage":1
     *    "filterItems"：{
     *      "isbn13": "123456"
     *    }
     * }
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