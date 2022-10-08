export class API {

  constructor(configAPI) {
    this._configAPI = configAPI;
  }

  /** USER */

  /** {name, about, avatar, _id, cohort} */
  getUserData() {
    return fetch(`${this._configAPI.mestoUrl}/users/me`, {
      method: 'GET',
      headers: this._configAPI.headers,
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  // userInfo = {name: .., about: ...}
  // response => get new user-info
  setUserData(userData) {
    return fetch(`${this._configAPI.mestoUrl}/users/me`, {
      method: 'PATCH',
      headers: this._configAPI.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  changeUserAvatar(userData){
    return fetch(`${this._configAPI.mestoUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._configAPI.headers,
      body: JSON.stringify({
        avatar: userData.avatar,
      }),
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  /** CARDS */

  // get current cards data from server
  getGalleryData() {
    return fetch(`${this._configAPI.mestoUrl}/cards`, {
      method: 'GET',
      headers: this._configAPI.headers,
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  // response -> get data of created card
  addPhotoCard(cardData) {
    return fetch(`${this._configAPI.mestoUrl}/cards`, {
      method: 'POST',
      headers: this._configAPI.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  removePhotoCard(photoCardId){
    return fetch(`${this._configAPI.mestoUrl}/cards/${photoCardId}`, {
      method: 'DELETE',
      headers: this._configAPI.header,
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  addPhotoLike(photoCardId) {
    return fetch(`${this._configAPI.mestoUrl}/cards/${photoCardId}/likes`, {
      method: 'PUT',
      headers: this._configAPI.headers,
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  removePhotoLike(photoCardId){
    return fetch(`${this._configAPI.mestoUrl}/cards/${photoCardId}/likes`, {
      method: 'DELETE',
      headers: this._configAPI.headers,
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

}
