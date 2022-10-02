export class UserInfo{
  constructor(userNameSelector, userJobSelector){
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo(){
    this._userName =  this._userNameElement.textContent;
    this._userJob = this._userJobElement.textContent;
    return ({username: this._userName, userjob: this._userJob})
  }

  setUserInfo(formData){
    this._userNameElement.textContent = formData.username;
    this._userJobElement.textContent =  formData.jobinfo;
  }


}
