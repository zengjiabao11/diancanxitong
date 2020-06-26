 
const fetch = require('../../utils/fetch.js')
Page({
  data: {
 
    indicatorDots: true,
 
    autoplay: true,
 
    interval: 5000,
 
    duration: 1000
  },
  onLoad: function(options) {
 
    wx.showLoading({
      title: "努力加载中"
    })
  
    fetch('food/index').then((res) => {
 
      wx.hideLoading();
      
      this.setData({
        listData: res.data,
      })
    },() => {
      
      wx.hideLoading();
    });
  },
  gostart: function() {
    wx.navigateTo({
      url: "../list/list",
    })
  }
})