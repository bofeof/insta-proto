export class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    this._userName = this._userNameElement.textContent;
    this._jobInfo = this._userJobElement.textContent;
    return { userName: this._userName, jobInfo: this._jobInfo };
  }

  setUserInfo(userData) {
    this._userNameElement.textContent = userData.userName;
    this._userJobElement.textContent = userData.jobInfo;
  }
}
