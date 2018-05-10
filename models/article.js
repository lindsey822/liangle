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

  get publishDateForDisplay() {
    let date = new Date(this.get('createdAt'));
    return date.toLocaleDateString('cn-CN');
  }
}

AV.Object.register(Article, 'Article');

const getArticleById = function (id) {
  var query = new AV.Query('Article');
  query.include(['title', 'body', 'createdAt', 'author']);
  return query.get(id);
}

const getArticlesByAuthorQuery = function (author) {
  var query = new AV.Query('Article');
  query.equalTo('author', author);
  query.include(['title', 'body', 'createdAt', 'author']);
  query.descending('createdAt');
  return query;
}

module.exports = {
  Article,
  getArticleById,
  getArticlesByAuthorQuery
};
