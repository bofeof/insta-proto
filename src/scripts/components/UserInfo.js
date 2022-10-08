export class UserInfo {

  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);

  }

  getUserInfo() {
    this._name = this._nameElement.textContent;
    this._about = this._aboutElement.textContent;
    this._avatar = this._avatarElement.src;
    return { name: this._name, about: this._about, avatar: this._avatar };
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._aboutElement.textContent = userData.about;
  }

  setUserAvatar(userData){
    this._avatarElement.src = userData.avatar;
  }
}
