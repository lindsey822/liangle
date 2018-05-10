class ArticleSnippet {
  constructor(id, title, bodySnippet, publishDate, highlightDrawerAvatars) {
    this.id = id;
    this.title = title;
    this.bodySnippet = bodySnippet;
    this.publishDate = publishDate;
    this.highlightDrawerAvatars = highlightDrawerAvatars;    
  }
}

module.exports = {
  ArticleSnippet
};