// const api = new Api({
//   baseUrl: 'https://nomoreparties.co/v1/cohort-51',
//   headers: {
//     authorization: '228cae98-cff9-4022-bb25-2678b613ba24',
//     'Content-Type': 'application/json'
//   }
// });


// authorization




class API {

  constructor(configAPI){
    this._configAPI = configAPI
  }

  /** user */

  getUserData(){

    fetch ('', {
      headers :  this._configAPI.authorization
    })

  }

  editUserData(){}

  changeUserAvatar(){}



  /** card data */
  getGalleryData(){}

  addPhotoCard(){}

  removePhotoCard(){}

  addPhotoLike(){}

  removePhotoLike(){}

}




// запрос к серверу
// При каждом запросе нужно передавать токен и идентификатор группы.
// fetch('https://mesto.nomoreparties.co/v1/cohort-51/cards', {
//   method: 'GET',
//   headers: {
//     authorization: '0aa0db8f-1663-456c-947a-270a3646c3a8'
//   }
// })

//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });




  // // Загрузка информации о пользователе с сервера
  // // Используйте свойства name, about и avatar в соответствующих
  // // элементах шапки страницы. Свойство _id — это идентификатор пользователя, в данном случае вашего.
  // fetch('https://nomoreparties.co/v1/cohort51/users/me', {
  //   method: 'GET',
  //   headers: {
  //     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
  //   }
  // })


  // // Загрузка карточек с сервера - переписать создание карточек из массива, есть свойства карточки name link
  // fetch('https://mesto.nomoreparties.co/v1/cohort51/cards', {
  //   method: 'GET',
  //   headers: {
  //     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
  //   }
  // })


  // // Редактирование профиля
  // fetch('https://mesto.nomoreparties.co/v1/cohort51/users/me', {
  //   method: 'PATCH',
  //   headers: {
  //     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     name: 'Marie Skłodowska Curie', /** переменная ${userName} */
  //     about: 'Physicist and Chemist' /** переменная  ${userJob}*/
  //   })
  // });


// Отображение количества лайков карточки
// У каждой карточки есть свойство likes — оно содержит массив пользователей, лайкнувших карточку:
// likes.length
// {
//   "likes": [],
//   ...другие данные карточки
// }
