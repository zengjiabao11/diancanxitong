const fetch = require('../../../utils/fetch.js')
Page({
  data: {
  },
  onLoad: function (options) {
   
    var note = wx.getStorageSync('note')
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    fetch('food/order', { order_id: options.order_id }).then((res) => {
      var foods = res.data.foods
    
      var sum = 0;
      for (var i in foods) {
        sum += foods[i].price * foods[i].num
      }
      if (res.data.promotion.length > 0 && sum > res.data.promotion.discount) {
        sum -= res.data.promotion.discount
      }
      this.setData({
        order: res.data,
        sumMonney: sum,
        note: note
      })
    })
  },
  onUnload: function () {
    var app = getApp();
  
    app.isReloadOrderList = true
    wx.switchTab({
      url: '/pages/order/list/list'
    })
  }
})