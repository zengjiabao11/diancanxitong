const fetch = require('../../../utils/fetch.js')
Page({
  data: {
    sumMonney: 0,
    cutMonney: 0,
    note: '',
    max: '20',
    taken: '',
  },
  onLoad: function(options) {
    
    fetch('food/order', { order_id: options.order_id}).then((res) => {
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
        sumMonney: sum
      })
    })
  },
 
  listenerTextarea: function(e) {
    var note = e.detail.value;
    wx.setStorageSync('note', note)
  },
 
  gotopay: function(e) {
    var order_id = this.data.order_id
    
    var method = 'POST'
    fetch('food/pay', {order_id:order_id},method).then((res)=>{
      if(res.data.error !== 0){
        wx.showModal({
          title: '支付失败',
          content: '请您重新尝试',
        })
        return
      }
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000,
        success: function () {
          setTimeout(function () {
            wx.navigateTo({
              url: '../detail/detail?order_id=' + res.data.order_id
            })
          })
        }
      })
    });
  }
})