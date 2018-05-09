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
}

AV.Object.register(Article, 'Article');

const getArticlesByAuthor = function (author) {
  var query = new AV.Query('Article');
  query.equalTo('author', author);
  // find 方法是一个异步方法，会返回一个 Promise，之后可以使用 then 方法
  return query.find();
}

module.exports = {
  Article,
  getArticlesByAuthor
};