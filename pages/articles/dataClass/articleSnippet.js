class ArticleSnippet {
  constructor(articleId, title, bodySnippet, publishDate, highlightDrawerAvatars) {
    this.articleId = articleId;
    this.title = title;
    this.bodySnippet = bodySnippet;
    this.publishDate = publishDate;
    this.highlightDrawerAvatars = highlightDrawerAvatars;    
  }
}

module.exports = {
  ArticleSnippet
};