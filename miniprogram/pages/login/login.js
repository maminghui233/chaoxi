// pages/login/login.js
var app=getApp();
//const cloud = require('wx-server-sdk');

wx.cloud.init();
const db = wx.cloud.database();
const _ = db.command;
const config = require('../../config')
var util = require('../../utils/util.js')
var utilMd5 = require('../../utils/md5.js');
Page({
  data: {
    nameValue: "", //用户名
    pwdValue: ""   //密码
  },
  
  bindKeyInput: function (e) {
    if (e.currentTarget.dataset.type == "name") {
      this.setData({nameValue: e.detail.value })
      if (e.detail.value.length == 11) {
        wx.hideKeyboard()// 收起键盘
      }
    } else if (e.currentTarget.dataset.type == "pwd") { //密码
      this.setData({pwdValue: e.detail.value })
      } else {
      }
  },
  /**  点击登录按钮 */
  tapBtnLogin: function (e) { 
    db.collection('user').where({
      name:this.data.nameValue
    }).get({
      success:res=>{
       // console.log(res);
        if (res.data.length == 0) {
          console.log("数据库中无该用户记录，请核实name");
          return
        } else {
          console.log(this.data.pwdValue);
          console.log(res.data[0].pwd);
          if (res.data[0].pwd == this.data.pwdValue){
            
            wx.setStorage({
              key: "name",
              data: this.data.nameValue
            })
            wx.setStorage({
              key: "pwd",
              data: this.data.pwdValue
            }),
              res.success(wx.switchTab({
                url: '../myself/myself',
              }));
           // wx.switchTap({ url: "../index/index"});
            
          }
          else{
            console.log('error');
            wx.showToast({ title: '密码错误', icon: 'loading' });
            return
          }
        }
      },
      fail:err=>{
        wx.showToast({ title: '无效学号', icon: 'loading' });
        return
      }
    })
  },
    /*let url = config.loginUrl

    var userName = this.data.nameValue;
    var pwd = this.data.pwdValue;*/

    /*if (!util.verificationUserName(userName)) {
      //wx.showToast({ title: '无效手机号', icon: 'loading' })
      wx.showModal({
        title: '',
        content: '无效手机号',
        showCancel: false,
      })
      return;
    }

    if (!util.verificationPwd(pwd)) {
      wx.showModal({
        title: '',
        content: '密码不符合规则',
        showCancel: false,
      })
      return;
    }*/

    /**
     登录
     
     @param userName 用户名
     @param passWord 密码
     @param Type 用户名类型 0-手机号;1-普通用户名
     @param res 成功
     @param fail 失败
     */
    /* var para = {
      "system": "02",
      "password": utilMd5.hexMD5(pwd),
      "userName": userName,
      "imei": "C75C7019-29FA-4F2B-8311-BAA6F29D1845",
      "currentVersion": "3.1.81",
      "model": "iPhone 5s (A1457\/A1518\/A1528\/A1530)",
      "clientId": "HGP",
      "type": "0",
      "accessToken": "",
      "systemVersion": "10.3.2",
      "sig": ""
    }

   wx.showLoading({ title: '登录中...' })

    util.RequestManager(url, para, function (res, fail) {

      wx.hideLoading()

      if (res.code == "000000") {
        //成功 - 缓存用户信息
        //headImg token nickName userId userName
        wx.setStorage({
          key: "headImg",
          data: res.data.headImg
        })
        wx.setStorage({
          key: "token",
          data: res.data.token
        })
        wx.setStorage({
          key: "nickName",
          data: res.data.nickName
        })
        wx.setStorage({
          key: "userId",
          data: res.data.userId
        })

        wx.setStorage({
          key: "userName",
          data: res.data.userName
        })


        wx.navigateBack({
          delta: 1
        })
      } else {
        //失败
        wx.showModal({
          title: '',
          content: res.msg,
          showCancel: false,
        })
      }
    })

  },*/
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})