//управление отображением информации о пользователе на странице.

export class UserInfo{
  constructor(userNameSelector, userJobSelector){
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
  }

  getUserInfo(){
    // получение  данных, чтобы подставить в форму при открытии
    this._userName =  this._userNameElement.textContent;
    this._userJob = this._userJobElement.textContent;
    return ({username: this._userName, userjob: this._userJob})
  }

  setUserInfo({username: newUserName, userjob: newUserJob}){
    //получает новые данные с формы и добавляет на страницу
    this._userName.textContent = username;
    this._userJob.textContent =  userjob;
  }


}
