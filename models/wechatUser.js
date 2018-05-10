const AV = require('../libs/av-weapp-min');

class WechatUser extends AV.Object {
  get avatarUrl() {
    return this.get('avatarUrl');
  }
  set avatarUrl(value) {
    this.set('avatarUrl', value);
  }

  get nickName() {
    return this.get('nickName');
  }
  set nickName(value) {
    this.set('nickName', value);
  }
}

AV.Object.register(WechatUser, 'WechatUser');

module.exports = {
  WechatUser
};