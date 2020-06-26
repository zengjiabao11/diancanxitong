const fetch = require('../../utils/fetch.js')
Page({
  data: {
    activeIndex: 0,
    toView: "a0",
    cartList: [],
    currentType: 0,
    currentIndex: 0,
    sumMonney: 0, 
    cupNumber: 0, 
    showCart: false, 
    loading: false,
    containerH: '',
    heightArr: [] 
  },
  onLoad: function(options) {
   
    wx.showLoading({
      title: "努力加载中"
    })
    
    fetch('food/list').then((res) => {
      wx.hideLoading();
      this.setData({
        listData: res.data,
        loading: true
      })
    })
  },

  
  selectMenu: function(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      activeIndex: index,
      toView: "a" + index,
    })
  },
 
  addToCart: function(e) {
    console.log(e)
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentType: type,
      currentIndex: index,
    });
    var a = this.data
   
    var addItem = {
      "name": a.listData[a.currentType].foods[a.currentIndex].name,
      "price": a.listData[a.currentType].foods[a.currentIndex].specfoods[0].price,
      "number": 1,
      "sum": a.listData[a.currentType].foods[a.currentIndex].specfoods[0].price,
    }
    var sumMonney = a.sumMonney + a.listData[a.currentType].foods[a.currentIndex].specfoods[0].price;
   
    var cartList = this.data.cartList;
    cartList.push(addItem);
    this.setData({
      cartList: cartList,
      showModalStatus: false,
      sumMonney: sumMonney,
      cupNumber: a.cupNumber + 1
    });
  },
  
  showCartList: function() {
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }
  },
  
  addNumber: function(e) {
    var index = e.currentTarget.dataset.index;
    var cartList = this.data.cartList;
    cartList[index].number++;
    var sum = this.data.sumMonney + cartList[index].price;
    cartList[index].sum += cartList[index].price;
    this.setData({
      cartList: cartList,
      sumMonney: sum,
      cupNumber: this.data.cupNumber + 1
    })
  },
  
  decNumber: function(e) {
    var index = e.currentTarget.dataset.index;
    var cartList = this.data.cartList;
    var sum = this.data.sumMonney - cartList[index].price;
    cartList[index].sum -= cartList[index].price;
    cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--;
    this.setData({
      cartList: cartList,
      sumMonney: sum,
      showCart: cartList.length == 0 ? false : true,
      cupNumber: this.data.cupNumber - 1
    });
  },
  
  clearCartList: function() {
    this.setData({
      cartList: [],
      showCart: false,
      sumMonney: 0,
      cupNumber: 0
    });
  },
  
  goBalance: function(e) {
    if (this.data.sumMonney == 0) {
      return
    }
    
    var order_id = this.data.order_id
    var method = "POST"
    fetch("food/order", {id: 1,num: 1}, method).then(function(res) {
      if (res.data.error !== 0) {
        wx.showModal({
          title: '下单失败',
          content: '操作失败请重试',
        })
        return
      }
      
      wx.navigateTo({
        url: '../order/balance/balance?order_id=' + res.data.order_id
      })
    })
  }
})