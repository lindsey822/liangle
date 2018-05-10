// pages/home/home.js
const app = getApp();
const AV = require('../../libs/av-weapp-min');
const { Article, getArticlesByAuthorQuery } = require('../../models/article');
const { Highlight, getHighlightsForArticle, getHighlightsForArticlesByAuthorQuery } = require('../../models/highlight');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
          app.initLeanCloudUser(res.userInfo);
        }
      })
    }
  },

  getUserInfo: function (res) {
    const errorMessage = res.errMsg;
    const userInfoFromRes = res.detail.userInfo;
    if (!errorMessage && userInfoFromRes) {
      app.globalData.userInfo = userInfoFromRes;
      this.setData({
        userInfo: userInfoFromRes,
        hasUserInfo: true
      });
      app.initLeanCloudUser(userInfoFromRes);
    } else {
      console.log(errorMessage);
    }
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
  
  },

  /**
   * 自定义函数
   */
  testPublishArticle: function() {
    // assume user already logged in and initialized on LeanCloud
    AV.Promise
      .resolve(AV.User.current())
      .then(currUser => {
        const article = new Article();
        article.author = currUser.attributes.wechatUser;
        var rand = Math.floor(Math.random() * 20);
        article.title = "test title" + rand;
        article.body = "test body..."+ rand;

        const highlight = new Highlight();
        highlight.article = article;
        highlight.startPosition = 0;
        highlight.endPosition = 2;
        highlight.drawer = currUser.attributes.wechatUser;
        highlight.save()
        .then(highlight => {
          console.log(highlight);          
          console.log(highlight.article);
        }, e => {
          console.log(e);
        })
      })
      .catch(error => console.error(error.message));

  }
})