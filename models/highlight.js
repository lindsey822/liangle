const AV = require('../libs/av-weapp-min');
const { Article, getArticlesByAuthorQuery } = require('./article');

class Highlight extends AV.Object {
  get drawerAvater() {
    const drawer = this.get('drawer');
    const avatarUrl = drawer.get('avatarUrl');
    return avatarUrl;
  }
  set drawer(value) {
    this.set('drawer', value);
  }

  get article() {
    return this.get('article');
  }
  set article(value) {
    this.set('article', value);
  }

  get startPosition() {
    return this.get('startPosition');
  }
  set startPosition(value) {
    this.set('startPosition', value);
  }

  get endPosition() {
    return this.get('endPosition');
  }
  set endPosition(value) {
    this.set('endPosition', value);
  }
}

AV.Object.register(Highlight, 'Highlight');

const getHighlightsForArticle = function (article) {
  var query = new AV.Query('Highlight');
  query.equalTo('article', article);
  query.include(['drawer', 'startPosition', 'endPosition']);
  // find 方法是一个异步方法，会返回一个 Promise，之后可以使用 then 方法
  return query.find();
}

const getHighlightsForArticlesByAuthorQuery = function (author) {
  // 构建内嵌查询
  var articleByAuthorQuery = getArticlesByAuthorQuery(author);

  // 将内嵌查询赋予目标查询
  var highlightsQuery = new AV.Query('Highlight');
  highlightsQuery.include(['drawer', 'article']);
  highlightsQuery.descending('createdAt');

  // 执行内嵌操作
  highlightsQuery.matchesQuery('article', articleByAuthorQuery);
  return highlightsQuery;
}

module.exports = {
  Highlight,
  getHighlightsForArticle,
  getHighlightsForArticlesByAuthorQuery
};