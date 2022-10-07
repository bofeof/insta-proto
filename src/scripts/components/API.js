class API {

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
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка...${res.status}`));
  }

  // userInfo = {name: .., about: ...}
  // response => get new user-info
  editUserData(userData) {
    return fetch(`${this._configAPI.mestoUrl}/users/me`, {
      method: 'PATCH',
      headers: this._configAPI.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка...${res.status}`));
  }

  changeUserAvatar(){}

  /** CARDS */

  // get current cards data from server
  getGalleryData() {
    return fetch(`${this._configAPI.mestoUrl}/cards`, {
      method: 'GET',
      headers: this._configAPI.headers,
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка...${res.status}`));
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
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка...${res.status}`));
  }

  removePhotoCard(cardId){
    return fetch(`${this._configAPI.mestoUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._configAPI.header,
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка...${res.status}`));
  }

  addPhotoLike(cardId) {
    return fetch(`${this._configAPI.mestoUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._configAPI.headers,
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка...${res.status}`));
  }

  removePhotoLike(cardId){
    return fetch(`${this._configAPI.mestoUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._configAPI.headers,
    })
    .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка...${res.status}`));
  }

}
