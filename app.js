// Lean Cloud Live Query
const AV = require('./libs/av-weapp-min');

const {
  APP_ID,
  APP_KEY,
  LEAN_CLOUD_APP_ID,
  LEAN_CLOUD_APP_KEY
} = require('./secrets.js');

AV.init({
  appId: LEAN_CLOUD_APP_ID,
  appKey: LEAN_CLOUD_APP_KEY
});

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    user: null
  },
  initLeanCloudUser: function (userInfo) {
    AV.Promise
      .resolve(AV.User.current())
      .then(currUser =>
        currUser ? (currUser.isAuthenticated().then(authed => authed ? currUser : null)) : null)
      .then(currUser => currUser ? currUser : AV.User.loginWithWeapp())
      .then(user => {
        user.set(userInfo)
          .save()
          .then(user => {
            // 成功，此时可在控制台中看到更新后的用户信息
            this.globalData.user = user.toJSON();
          })
          .catch(console.error);
      })
      .catch(error => console.error(error.message));
  }
})
