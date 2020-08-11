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
