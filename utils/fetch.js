module.exports = function(path, data, method) {
  
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'http://127.0.0.1:8081/api/' + path, 
      method: method, 
      data: data, 
      header: {
        'Content-Type': 'json'
      }, 
      success: resolve,
      fail: function() {
        reject()
        wx.showModal({
          showCancel: false,
          title: '失败'
        })
      }
    })
  })
}