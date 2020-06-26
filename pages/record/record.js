 
const fetch=require('../../utils/fetch.js')
Page({
  data: {
  },
  onLoad: function (options) {
    wx.showLoading({
      title: "努力加载中"
    })
   
    wx.setNavigationBarTitle({ 
      title: '消费记录' 
    })
 
    fetch('food/record').then((res)=>{
 
      wx.hideLoading();
      this.setData({
        listData:res.data
      })
    }) 
  }
})