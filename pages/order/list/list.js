// 引入文件const fetch = require('../../../utils/fetch')
Page({
  data: {
    orderList: [],
  
    is_last: false
  },
 
  last_id: 0,
  
  loadData: function(data, success, fail) {
    
    data.row = 10
    fetch('food/orderlist', data).then((res) => {
      this.last_id = res.data.last_id
      this.setData({
        is_last: res.data.is_last
      }, () => {
        success(res.data)
      })
    }, fail)
  },

  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...'
    })
    this.loadData({
      last_id: 0
    }, (data) => {
      this.setData({
        orderList: data.list,
      }, () => {
        wx.hideLoading();
      })
    })
  },
  onShow: function() {
   
    var app = getApp();
    
    if (app.isReloadOrderList) {
      this.onLoad()
      app.isReloadOrderList = false
    }
  },
  orderdetail: function(e) {
    var index = e.currentTarget.dataset.postid
    wx.navigateTo({
      url: '../detail/detail?order_id=' + index
    })
  },
  
  onPullDownRefresh: function() {
   
    wx.showNavigationBarLoading();
    this.loadData({
      last_id: 0
    }, (data) => {
      this.setData({
        orderList: data.list,
      }, () => {
        
        wx.hideNavigationBarLoading();
      })
    })
  },
  
  onReachBottom: function() {
   
    if (this.data.is_last) {
      return
    }
    
    wx.showLoading({
      title: '玩命加载中',
    })
    this.loadData({
      last_id: this.last_id,
    }, (data) => {
      var orderList = this.data.orderList;
      for (var i = 0; i < data.list.length; i++) {
        orderList.push(data.list[i]);
      }
      
      this.setData({
        orderList: orderList
      }, () => {
       
        wx.hideLoading();
      })
    })
  }
})