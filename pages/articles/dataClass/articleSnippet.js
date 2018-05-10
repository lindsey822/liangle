class ArticleSnippet {
  constructor(title, bodySnippet, publishDate, highlightDrawerAvatars) {
    this.title = title;
    this.bodySnippet = bodySnippet;
    let date = new Date(publishDate);
    this.publishDate = date.toLocaleDateString('cn-CN');
    this.highlightDrawerAvatars = highlightDrawerAvatars;    
  }
}

module.exports = {
  ArticleSnippet
};