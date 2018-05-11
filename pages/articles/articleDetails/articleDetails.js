const app = getApp();
const AV = require('../../../libs/av-weapp-min');
const { Article, getArticleById, getArticlesByAuthorQuery } = require('../../../models/article');
const { Highlight, getHighlightsForArticle, getHighlightsForArticlesByAuthorQuery } = require('../../../models/highlight');
const { ArticleSnippet } = require('../dataClass/articleSnippet');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'title',
    body: 'body',
    author: 'Debby',
    date: '2013-09-08'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();

    const id = options.id;

    getArticleById(id)
    .then(article => {
      this.setData({
        title: article.title,
        body: article.body,
        author: article.author.nickName,
        date: article.publishDateForDisplay
      });
      const navBarTitle = article.title.length > 8 ? article.title.substr(0, 8) + "..." : article.title;
      wx.setNavigationBarTitle({
        title: navBarTitle
      });
      return getHighlightsForArticle(article);
    })
    .then(highlights => {
      console.log(highlights);
      wx.hideNavigationBarLoading();
    });
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
   * 用户点击分享
   */
  onShareAppMessage: function (options) {
    return {};
  },

  previewImage: function (e) {
  wx.previewImage({
    urls: "http://lc-gfg4xp03.cn-n1.lcfile.com/8f83522d8aace48afb26.png".split(',')
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报
  });
  }
})
