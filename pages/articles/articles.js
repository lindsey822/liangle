const app = getApp();
const AV = require('../../libs/av-weapp-min');
const { Article, getArticlesByAuthorQuery } = require('../../models/article');
const { Highlight, getHighlightsForArticle, getHighlightsForArticlesByAuthorQuery } = require('../../models/highlight');
const { ArticleSnippet } = require('./dataClass/articleSnippet');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    articleSnippets: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.user) {
      this.loadArticleSnippets(app.globalData.user);
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userReadyCallback = user => {
        this.loadArticleSnippets(app.globalData.user);
      }
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
    if (app.globalData.user) {
      this.loadArticleSnippets(app.globalData.user);
      wx.stopPullDownRefresh();
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userReadyCallback = user => {
        this.loadArticleSnippets(app.globalData.user);
        wx.stopPullDownRefresh();
      }
    }
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

  /**
   * return a Promise
   */
  loadArticleSnippets: function (author) {
    const highlightsForArticlesByAuthorPromise = getHighlightsForArticlesByAuthorQuery(author)
    .select(['drawer', 'article'])
    .find();
    const articlesByAuthorPromise = getArticlesByAuthorQuery(author).find();

    Promise.all([highlightsForArticlesByAuthorPromise, articlesByAuthorPromise])
      .then(values => {
        const highlights = values[0];
        const articles = values[1];

        const articleHighlightMap = new Map();// key = article id, value = ArticleHighlightsPair
        highlights.forEach(highlight => {
          const article = highlight.article;
          if (articleHighlightMap.get(article.id)) {
            articleHighlightMap.get(article.id).highlights.push(highlight);
          } else {
            articleHighlightMap.set(article.id, {
              article: article,
              highlights: [highlight]
            });
          }
        });

        articles.forEach(article => {
          if (!articleHighlightMap.has(article.id)) {
            articleHighlightMap.set(article.id, {
              article: article,
              highlights: []
            });
          }
        })
        console.log(articleHighlightMap);
        
        var snippets = [];
        articleHighlightMap.forEach((pairs, articleId, map) => {
          var highlightDrawerAvatars = [];
          const highlights = pairs.highlights;
          const article = pairs.article;
          if (highlights && highlights.length) {
            highlights.forEach(highlight => {
              highlightDrawerAvatars.push(highlight.drawerAvater);
              });
          }
          const articleSnippet = new ArticleSnippet(article.title, article.body.length > 200 ? article.body.substr(200) : article.body, article.createdAt, highlightDrawerAvatars);
        snippets.push(articleSnippet);
              });
        this.setData({
          articleSnippets: snippets
        });
        console.log(snippets);
        return new Promise(function (resolve, reject) {
          resolve(snippets);
        });
      })
      .catch(error => {
        console.error(error.message);
        // toast error message
      });



  }
});
