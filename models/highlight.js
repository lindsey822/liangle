const AV = require('../libs/av-weapp-min');

class Highlight extends AV.Object {
  get drawer() {
    return this.get('drawer');
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
    this.set('startPositiondy', value);
  }

  get endPosition() {
    return this.get('endPosition');
  }
  set endPosition(value) {
    this.set('endPosition', value);
  }
}

AV.Object.register(Highlight, 'Highlight');
module.exports = Highlight;