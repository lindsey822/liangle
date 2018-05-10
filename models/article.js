const AV = require('../libs/av-weapp-min');

class Article extends AV.Object {
  get author() {
    return this.get('author');
  }
  set author(value) {
    this.set('author', value);
  }

  get title() {
    return this.get('title');
  }
  set title(value) {
    this.set('title', value);
  }

  get body() {
    return this.get('body');
  }
  set body(value) {
    this.set('body', value);
  }

  get publishDate() {
    return this.get('createdAt');
  }
}

AV.Object.register(Article, 'Article');

const getArticlesByAuthorQuery = function (author) {
  var query = new AV.Query('Article');
  query.equalTo('author', author);
  query.include(['title', 'body', 'createdAt', 'author']);
  query.descending('createdAt');
  return query;
}

module.exports = {
  Article,
  getArticlesByAuthorQuery
};
